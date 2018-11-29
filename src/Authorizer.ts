import * as types from './types'
import EventEmitter from 'eventemitter3'
import createWebAuth from './createWebAuth'
import defaultConfig from './defaultConfig'

export class Authorizer extends EventEmitter{
    _config: types.AuthorizerConfig
    _logger: types.Logger
    _webAuth: types.WebAuthPromisified
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure
    } = {}
    _accessesToRefresh: {
        [key: string]: boolean
    } = {}

    constructor(config: Partial<types.AuthorizerConfig>, logger: types.Logger){
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
            this._onTokenFailure(<types.TokenError>result)
        }else{
            this._onTokenSuccess(<types.TokenSuccess>result)
        }
    }

    _onTokenSuccess({token, audience, scope, license}: types.TokenSuccess){
        const scopesAccepted = token.scope ? token.scope.split(' ') : []
        const scopesRequested = scope.split(' ')
        const data = {token, error: null, audience, scope, license, scopesAccepted, scopesRequested}
        this._accesses[this._getKey(license, audience)] = data
        this._logger.debug('Token success', data)
        this.emit('token-update', data)
    }

    _onTokenFailure({error, audience, scope, license}: types.TokenError){
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

    async _checkSession(license: string, audience: string, scope: string): Promise<types.TokenResult>{
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