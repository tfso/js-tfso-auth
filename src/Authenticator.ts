import * as types from './types'
import createWebAuth from './createWebAuth'
import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './defaultConfig'

export class Authenticator{
    _config: types.AuthenticatorConfig
    _webAuth: types.WebAuthPromisified

    constructor(config: Partial<types.AuthenticatorConfig>){
        this._config = defaultsDeep({}, config, defaultConfig)
        this._webAuth = createWebAuth(this._config.optionsAuth0)
    }

    async getCurrentlyLoggedInIdentityOrNull(){
        try {
            const token = await this._getIdentityApiTokenOrNulIfAuthRequired()
            if(!token){
                return null
            }

            let identity = await this._getIdentityOrNullIfCookieRequired()

            if(!identity){
                await this._setLegacyCookieIfPossible(token)
                identity = await this._getIdentityOrNullIfCookieRequired()
            }

            if(!identity){
                return null
            }

            return identity
        }
        catch(err) {
            console.error(err)

            return null
        }
    }

    async ensureLoggedIn(){
        const identity = await this.getCurrentlyLoggedInIdentityOrNull()
        if(!identity){
            this.redirectToLogin()
            return null
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

    async _setLegacyCookieIfPossible(token: types.Auth0Token){
        try{
            await fetch(this._config.authenticateJwtUrl, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'Bearer ' + token.accessToken
                }
            })
        }catch(err){
            // Ignore any errors. This function is best effort, and will not work in local dev for example.
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
            responseType: 'token',
            redirectUri: this._config.callbackUrl
        }

        try{
            return await this._webAuth.checkSession(opts)
        }catch(error){
            const errorsWhereAuthIsRequired = [
                'login_required',
                'consent_required',
                'interaction_required',
                'unauthorized'
            ]

            if(errorsWhereAuthIsRequired.includes(error.error)){
                return null
            }

            throw error
        }
    }

    async changeActiveLicense(license: types.License){
        const data = {
            ClientId: license.clientId,
            UserId: license.userId
        }

        return await Promise.all([this._changePassportMap(data), this._removeIdentity()])
            .then(() => {
                return license
            })
            .catch((err) => {
                const error: any = new Error(err)
                throw error
            })
    }

    async _changePassportMap(data: { ClientId: number; UserId: number }){
        return await fetch('/login/data/ChangePassportMap.aspx', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: mapToWWWEncoded(data)
        })
    }

    async _removeIdentity() {
        return await fetch('/script/system/session/removeidentity.asp',
            {
                method: 'GET',
                credentials: 'include'
            }
        )
    }

}

const cacheBustUrl = url => {
    url = new URL(url, window.location.origin)
    url.searchParams.set('_dc', Date.now())
    return url.toString()
}

const mapToWWWEncoded = (
    data: Record<string, string | number>
): string => {
    return Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
}