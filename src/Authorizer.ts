import * as types from './types'
import EventEmitter from 'eventemitter3'
import createWebAuth from './createWebAuth'
import defaultsDeep from 'lodash.defaultsdeep'
import defaultConfig from './defaultConfig'

export class Authorizer extends EventEmitter{
    _config: types.AuthorizerConfig
    _logger: types.Logger
    _webAuth: types.WebAuthPromisified
    _checkSessionCount = 0
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure
    } = {}
    _accessesToRefresh: {
        [key: string]: boolean
    } = {}

    constructor(config: Partial<types.AuthorizerConfig>, logger: types.Logger){
        super()
        this._logger = logger
        this._config = defaultsDeep({}, config, defaultConfig)
        this._webAuth = createWebAuth(this._config.optionsAuth0)
    }

    /**
     * @param {string} key Some unique key to identify this token
     * @param {string} license
     * @param {string} audience
     * @param {string} scope Empty-space separated list of scopes
     *
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'token-update' and 'error' to be informed when the token changes.
     */
    async authorize(key: string, license: string, audience: string, scope: string){
        await this._refreshToken(key, license, audience, scope)
        this._keepTokenFresh(key, license, audience, scope)
        return this.getAccess(key)
    }

    async authorizeOnce(key: string, license: string, audience: string, scope: string){
        await this._refreshToken(key, license, audience, scope)
        return this.getAccess(key)
    }

    async unauthorize(key: string){
        delete this._accesses[key]
        delete this._accessesToRefresh[key]
    }

    getAccesses(){
        return Object.values(this._accesses)
    }

    hasAccess(key: string){
        return !!this.getAccess(key)
    }

    getAccess(key: string){
        return this._accesses[key]
    }

    _keepTokenFresh(key: string, license: string, audience: string, scope: string){
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
                .then(() => this._refreshToken(key, license, audience, scope))
                .then(waitAndRefreshAgain)
        }

        waitAndRefreshAgain()
    }

    async _refreshToken(key: string, license: string, audience: string, scope: string){
        const result = await this._checkSession(key, license, audience, scope)
        if(result.error){
            this._onTokenFailure(<types.TokenError>result)
        }else{
            this._onTokenSuccess(<types.TokenSuccess>result)
        }
    }

    _onTokenSuccess({key, token, audience, scope, license}: types.TokenSuccess){
        const scopesAccepted = token.scope ? token.scope.split(' ') : []
        const scopesRequested = scope.split(' ')
        const data = {key, token, error: null, audience, scope, license, scopesAccepted, scopesRequested}
        this._accesses[key] = data
        this._logger.debug('Token success', data)
        this.emit('token-update', data)
    }

    _onTokenFailure({key, error, audience, scope, license}: types.TokenError){
        const userInteractionRequired =
            (error.error === 'login_required' ||
                error.error === 'consent_required' ||
                error.error === 'interaction_required')

        const scopesRequested = scope.split(' ')
        const data = {key, token: null, error, audience, scope, license, userInteractionRequired, scopesRequested}
        this._accesses[key] = data
        this._logger.error('Token failure', data)
        this.emit('error', data)
    }

    async _checkSession(key: string, license: string, audience: string, scope: string): Promise<types.TokenResult>{
        const [identityId, clientId, userId] = license.split(';')

        // NB: We add a serial number to keep each state unique. checkSession needs this when called several times in parallel
        const opts = {
            audience,
            scope,
            state: `identityId:${identityId};clientId:${clientId};userId:${userId};unique:${++this._checkSessionCount}`,
            responseType: 'token',
            redirectUri: this._config.callbackUrl
        }

        try{
            const token = await this._webAuth.checkSession(opts)
            return {key, token, error: null, audience, scope, license}
        }catch(error){
            return {key, token: null, error, audience, scope, license}
        }
    }
}