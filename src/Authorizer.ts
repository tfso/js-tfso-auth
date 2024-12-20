import { CheckSessionOptions, WebAuth } from 'auth0-js'

import EventEmitter from 'eventemitter3'
import * as types from './types'
import defaultConfig from './defaultConfig'
import {AccessFailure, AccessSuccess, TokenConfig} from './types'
import promisify from './promisify'

type Events = 'access-success' | 'access-failure'

export class Authorizer extends EventEmitter<Events>{
    _config: types.AuthorizerConfig
    _checkSessionCount = 0
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure
    } = {}
    _accessesToRefresh: {
        [key: string]: boolean
    } = {}

    constructor(config: Partial<types.AuthorizerConfig>, private _webAuth: WebAuth){
        super()

        this._config = { ...defaultConfig, ...config ?? {}, optionsAuth0: { ...defaultConfig.optionsAuth0, ...config.optionsAuth0 ?? {} } }
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

    private _accessKey(tokenKey: string, license: string){
        return `${tokenKey}-${license}`
    }

    private _setAccess(access: AccessSuccess | AccessFailure){
        this._accesses[this._accessKey(access.tokenConfig.key, access.license)] = access
    }

    private _setRefresh(key: string, license: string){
        this._accessesToRefresh[this._accessKey(key, license)] = true
    }

    private _keepTokenFresh(tokenConfig: TokenConfig, license: string){
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

    private async _refreshToken(tokenConfig: TokenConfig, license: string){
        const result = await this._checkSession(tokenConfig, license)
        if(result.error){
            this._onTokenFailure(<types.TokenError>result)
        }else{
            this._onTokenSuccess(<types.TokenSuccess>result)
        }
    }

    private _onTokenSuccess({tokenConfig, token, license, expiresAt}: types.TokenSuccess){
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

    private _onTokenFailure({tokenConfig, error, license}: types.TokenError){
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

    private async _checkSession(tokenConfig: TokenConfig, license: string): Promise<types.TokenResult>{
        const [identityId, clientId, userId] = license.split(';')

        // NB: We add a serial number to keep each state unique. checkSession needs this when called several times in parallel
        const opts: CheckSessionOptions = {
            audience: tokenConfig.audience,
            scope: tokenConfig.scopes.join(' '),
            state: `identityId:${identityId};clientId:${clientId};userId:${userId};unique:${++this._checkSessionCount}`,
            //login_hint: `${identityId};${clientId};${userId}`,
            responseType: 'token',
            redirectUri: this._config.sessionCallbackUrl ?? this._config.callbackUrl,
            prompt: 'none'
        }

        const checkSession = promisify<any>(this._webAuth.checkSession.bind(this._webAuth))
        try{
            const token = await checkSession(opts)
            const expiresAt = token.expiresIn !== undefined ? token.expiresIn + Date.now() : null

            return {type: 'success', tokenConfig, token, error: null, license, expiresAt}
        }catch(error) {
            return {type: 'error', tokenConfig, token: null, error, license}
        }finally {
            this._removeAuth0TemporaryCookies()
        }
    }

    private _removeAuth0TemporaryCookies() {
        for(const cookie of document.cookie.split(';')) {
            const name = cookie.trim().split('=')[0]
            
            if (name.startsWith('_com.auth0.auth.') || name.startsWith('com.auth0.auth.')) {
                document.cookie = `${name}=; Domain=${location.hostname}; Path=/; Secure; SameSite=None; Expires=${new Date(0).toUTCString()}`
            }
        }
    }
}