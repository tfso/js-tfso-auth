import EventEmitter from 'eventemitter3'
import createWebAuth, {WebAuthPromisified, Auth0Token, Auth0Error} from './createWebAuth'
import defaultsDeep from 'lodash.defaultsdeep'

const defaultConfig = {
    optionsAuth0: {
        clientID: null,
        domain: 'login.24SevenOffice.com',
        configurationBaseUrl: 'tfso.eu.auth0.com'
    },
    identityApiUrl: 'https://identity.api.24sevenoffice.com',
    loginUrl: () => `/login/?returnUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
    callbackUrl: `${window.location.origin}/login/auth0/callback.html?isSilent=true`
}

export interface AuthenticatorConfig{
    optionsAuth0: {
        clientID: string
        domain: string
        configurationBaseUrl: string
    }
    identityApiUrl: string
    loginUrl: string | (() => string)
    callbackUrl: string
}

export type AuthorizerConfig = AuthenticatorConfig

export interface Logger{
    debug: Function
    info: Function
    error: Function
}

interface TokenSuccess{
    token: Auth0Token
    error: null
    audience: string
    scope: string
    license: string
}

interface TokenError{
    token: null
    error: Auth0Error
    audience: string
    scope: string
    license: string
}

type TokenResult = TokenSuccess | TokenError

export interface AccessSuccess{
    token: Auth0Token
    error: null
    audience: string
    scope: string
    license: string
    scopesAccepted: string[]
    scopesRequested: string[]
}

export interface AccessFailure{
    token: null
    error: Auth0Error
    audience: string
    scope: string
    license: string
    userInteractionRequired: boolean
    scopesRequested: string[]
}

export interface Api{
    request(method: string, url: string): Promise<any>
}

export class Authenticator{
    _api: Api
    _config: AuthenticatorConfig
    _webAuth: WebAuthPromisified

    constructor(config: Partial<AuthenticatorConfig>, api: Api){
        this._api = api
        this._config = defaultsDeep({}, config, defaultConfig)
        this._webAuth = createWebAuth(this._config.optionsAuth0)
    }

    async getCurrentlyLoggedInIdentityOrNull(){
        const token = await this._getIdentityApiTokenOrNulIfAuthRequired()
        if(token === null){
            return null
        }

        const identity = await this._getIdentityOrNullIfCookieRequired()
        if(identity === null){
            return null
        }

        return identity
    }

    async ensureLoggedIn(){
        const identity = await this.getCurrentlyLoggedInIdentityOrNull()
        if(identity === null){
            this.redirectToLogin()
            return
        }

        return identity
    }

    redirectToLogin(){
        window.location.href = typeof this._config.loginUrl === 'function'
            ? this._config.loginUrl()
            : this._config.loginUrl
    }

    async _getIdentityOrNullIfCookieRequired(){
        try{
            return await this._api.request('GET', this._config.identityApiUrl)
        }catch(err){
            if(err.status === 401){
                return null
            }

            throw err
        }
    }

    async _getIdentityApiTokenOrNulIfAuthRequired(){
        /*
        In the future this should be a token for the identity api,
        but since the identity api only supports cookie
        we just grab som other random token that everybody has
         */
        const opts = {
            audience: 'https://app.24sevenoffice.com',
            scope: 'NO_SCOPE',
            responseType: 'token',
            redirectUri: this._config.callbackUrl
        }

        try{
            return await this._webAuth.checkSession(opts)
        }catch(error){
            const authRequired =
                (error.error === 'login_required' ||
                    error.error === 'consent_required' ||
                    error.error === 'interaction_required')

            if(authRequired){
                return null
            }

            throw error
        }
    }
}

export class Authorizer extends EventEmitter{
    _config: AuthorizerConfig
    _logger: Logger
    _webAuth: WebAuthPromisified
    _accesses: {
        [key: string]: AccessSuccess | AccessFailure
    } = {}
    _accessesToRefresh: {
        [key: string]: boolean
    } = {}

    constructor(config: Partial<AuthorizerConfig>, logger: Logger){
        super()
        this._logger = logger
        this._config = Object.assign({}, defaultConfig, config)
        this._webAuth = createWebAuth(this._config.optionsAuth0)
    }

    _getKey(license: string, audience: string){
        return license + audience
    }

    /**
     * @param {string} license
     * @param {string} audience
     * @param {string} scope Empty-space separated list of scopes
     *
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'token-update' and 'error' to be informed when the token changes.
     */
    async authorize(license: string, audience: string, scope: string){
        await this._refreshToken(license, audience, scope)
        this._keepTokenFresh(license, audience, scope)
        return this.getAccess(license, audience)
    }

    async authorizeOnce(license: string, audience: string, scope: string){
        await this._refreshToken(license, audience, scope)
        return this.getAccess(license, audience)
    }

    async unauthorize(license: string, audience: string){
        const key = this._getKey(license, audience)
        delete this._accesses[key]
        delete this._accessesToRefresh[key]
    }

    getAccesses(){
        return Object.values(this._accesses)
    }

    hasAccess(license: string, audience: string){
        return !!this.getAccess(license, audience)
    }

    getAccess(license: string, audience: string){
        return this._accesses[this._getKey(license, audience)]
    }

    _keepTokenFresh(license: string, audience: string, scope: string){
        const key = this._getKey(license, audience)
        if(this._accessesToRefresh[key]){
            return
        }else{
            this._accessesToRefresh[key] = true
        }

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        const waitAndRefreshAgain = () => {
            if(!this._accessesToRefresh[key]){
                return
            }

            delay(15 * 60 * 1000)
                .then(() => this._refreshToken(license, audience, scope))
                .then(waitAndRefreshAgain)
        }

        waitAndRefreshAgain()
    }

    async _refreshToken(license: string, audience: string, scope: string){
        const result = await this._checkSession(license, audience, scope)
        if(result.error){
            this._onTokenFailure(<TokenError>result)
        }else{
            this._onTokenSuccess(<TokenSuccess>result)
        }
    }

    _onTokenSuccess({token, audience, scope, license}: TokenSuccess){
        const scopesAccepted = token.scope ? token.scope.split(' ') : []
        const scopesRequested = scope.split(' ')
        const data = {token, error: null, audience, scope, license, scopesAccepted, scopesRequested}
        this._accesses[this._getKey(license, audience)] = data
        this._logger.debug('Token success', data)
        this.emit('token-update', data)
    }

    _onTokenFailure({error, audience, scope, license}: TokenError){
        const userInteractionRequired =
            (error.error === 'login_required' ||
                error.error === 'consent_required' ||
                error.error === 'interaction_required')

        const scopesRequested = scope.split(' ')
        const data = {token: null, error, audience, scope, license, userInteractionRequired, scopesRequested}
        this._accesses[this._getKey(license, audience)] = data
        this._logger.error('Token failure', data)
        this.emit('error', data)
    }

    async _checkSession(license: string, audience: string, scope: string): Promise<TokenResult>{
        const [identityId, clientId, userId] = license.split(';')
        const opts = {
            audience,
            scope,
            state: `identityId:${identityId};clientId:${clientId};userId:${userId}`,
            responseType: 'token',
            redirectUri: this._config.callbackUrl
        }

        try{
            const token = await this._webAuth.checkSession(opts)
            return {token, error: null, audience, scope, license}
        }catch(error){
            return {token: null, error, audience, scope, license}
        }
    }
}