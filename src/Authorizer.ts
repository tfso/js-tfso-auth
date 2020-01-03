import * as types from './types'
import EventEmitter from 'eventemitter3'
import createWebAuth from './createWebAuth'
import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './defaultConfig'
import {AccessFailure, AccessSuccess, TokenConfig} from './types'

type Events = 'access-success' | 'access-failure'

export class Authorizer extends EventEmitter<Events>{
    _config: types.AuthorizerConfig
    _webAuth: types.WebAuthPromisified
    _checkSessionCount = 0
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure
    } = {}
    _accessesToRefresh: {
        [key: string]: boolean
    } = {}

    constructor(config: Partial<types.AuthorizerConfig>){
        super()
        this._config = defaultsDeep({}, config, defaultConfig)
        this._webAuth = createWebAuth(this._config.optionsAuth0)
    }

    /**
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'access-success' and 'access-failure' to be informed when the token changes.
     */
    async authorize(tokenConfig: TokenConfig, license: string){
        await this._refreshToken(tokenConfig, license)
        this._keepTokenFresh(tokenConfig, license)
        return this.getAccess(tokenConfig.key, license)
    }

    async authorizeOnce(tokenConfig: TokenConfig, license: string){
        await this._refreshToken(tokenConfig, license)
        return this.getAccess(tokenConfig.key, license)
    }

    async unauthorize(key: string, license: string){
        delete this._accesses[this._accessKey(key, license)]
        delete this._accessesToRefresh[this._accessKey(key, license)]
    }

    getAccesses(){
        return Object.values(this._accesses)
    }

    hasAccess(key: string, license: string){
        return !!this.getAccess(key, license)
    }

    getAccess(key: string, license: string){
        return this._accesses[this._accessKey(key, license)]
    }

    isRefreshing(key: string, license: string){
        return this._accessesToRefresh[this._accessKey(key, license)]
    }

    _accessKey(tokenKey: string, license: string){
        return `${tokenKey}-${license}`
    }

    _setAccess(access: AccessSuccess | AccessFailure){
        this._accesses[this._accessKey(access.tokenConfig.key, access.license)] = access
    }

    _setRefresh(key: string, license: string){
        this._accessesToRefresh[this._accessKey(key, license)] = true
    }

    _keepTokenFresh(tokenConfig: TokenConfig, license: string){
        if(this.isRefreshing(tokenConfig.key, license)){
            return
        }

        this._setRefresh(tokenConfig.key, license)

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        const waitAndRefreshAgain = () => {
            if(!this.isRefreshing(tokenConfig.key, license)){
                return
            }

            delay(15 * 60 * 1000)
                .then(() => this._refreshToken(tokenConfig, license))
                .then(waitAndRefreshAgain)
        }

        waitAndRefreshAgain()
    }

    async _refreshToken(tokenConfig: TokenConfig, license: string){
        const result = await this._checkSession(tokenConfig, license)
        if(result.error){
            this._onTokenFailure(<types.TokenError>result)
        }else{
            this._onTokenSuccess(<types.TokenSuccess>result)
        }
    }

    _onTokenSuccess({tokenConfig, token, license, expiresAt}: types.TokenSuccess){
        const access: AccessSuccess = {
            type: 'success',
            tokenConfig,
            token,
            error: null,
            license,
            expiresAt,
            scopesAccepted: token.scope ? token.scope.split(' ') : []
        }

        this._setAccess(access)
        this.emit('access-success', access)
    }

    _onTokenFailure({tokenConfig, error, license}: types.TokenError){
        const errorsWhereAuthIsRequired = [
            'login_required',
            'consent_required',
            'interaction_required',
            'unauthorized'
        ]

        const access: AccessFailure = {
            type: 'failure',
            tokenConfig,
            token: null,
            error,
            license,
            userInteractionRequired: errorsWhereAuthIsRequired.includes(error.error),
            scopesAccepted: []
        }

        this._setAccess(access)
        this.emit('access-failure', access)
    }

    async _checkSession(tokenConfig: TokenConfig, license: string): Promise<types.TokenResult>{
        const [identityId, clientId, userId] = license.split(';')

        // NB: We add a serial number to keep each state unique. checkSession needs this when called several times in parallel
        const opts = {
            audience: tokenConfig.audience,
            scope: tokenConfig.scopes.join(' '),
            state: `identityId:${identityId};clientId:${clientId};userId:${userId};unique:${++this._checkSessionCount}`,
            responseType: 'token',
            redirectUri: this._config.callbackUrl
        }

        try{
            const token = await this._webAuth.checkSession(opts)
            const expiresAt = token.expiresIn !== undefined ? token.expiresIn + Date.now() : null
            return {type: 'success', tokenConfig, token, error: null, license, expiresAt}
        }catch(error){
            return {type: 'error', tokenConfig, token: null, error, license}
        }
    }
}