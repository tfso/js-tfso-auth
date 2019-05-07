import * as types from './types'
import createWebAuth from './createWebAuth'
import defaultsDeep from 'lodash.defaultsdeep'
import defaultConfig from './defaultConfig'

export class Authenticator{
    _config: types.AuthenticatorConfig
    _webAuth: types.WebAuthPromisified

    constructor(config: Partial<types.AuthenticatorConfig>){
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

    redirectToLogout(){
        window.location.href = typeof this._config.logoutUrl === 'function'
            ? this._config.logoutUrl()
            : this._config.logoutUrl
    }

    async _getIdentityOrNullIfCookieRequired(){
        const res = await fetch(cacheBustUrl(this._config.identityApiUrl), {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })

        if(res.status === 401){
            return null
        }

        if(res.status < 200 || res.status >= 300){
            const err:any = new Error(res.statusText)
            try{
                const body = await res.json()
                err.message = (body.error && body.message) || err.message
                err.trackingId = body.trackingId
            }catch{}
            err.status = res.status
            throw err
        }

        return res.json()
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

const cacheBustUrl = url => {
    url = new URL(url)
    url.searchParams.set('_dc', Date.now())
    return url.toString()
}