import { Auth0DecodedHash, WebAuth } from 'auth0-js'

import * as types from './types'
import defaultConfig from './defaultConfig'
import promisify from './promisify'

export class Authenticator{
    private _config: types.AuthenticatorConfig
    private _baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`

    constructor(config: Partial<types.AuthenticatorConfig>, private _webAuth: WebAuth) {
        this._config = { ...defaultConfig, ...config ?? {} }
    }

    async getCurrentlyLoggedInIdentityOrNull() {
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

    login() {
        const redirectUrl = new URL(this._config.callbackUrl ?? `/modules/auth/login-callback`, window.location.origin)

        if(window.location.search){
            for(let [key, value] of new URLSearchParams(window.location.search)){
                redirectUrl.searchParams.append(key, value)
            }
        }

        this._webAuth.authorize({
            audience: 'https://app.24sevenoffice.com',
            responseType: 'token',
            redirectUri: redirectUrl.toString()
        })
    }

    async logout(returnUrl?: string) {
        const returnTo = returnUrl ?? `${this._baseUrl}/login`

        await Promise.all([
            fetch(`${this._baseUrl}/script/client/login/logoff.asp?_dc=${Date.now()}`, { credentials: 'same-origin' }),
            fetch(`${this._baseUrl}/login/data/Logout.aspx`, { method: 'POST', credentials: 'same-origin' })
        ])

        this._webAuth.logout({ 
            returnTo
        })
    }

    /**
     * Verify callback from login provider
     * @returns The token if the user is logged in, otherwise null
     * @throws {{ error: string, errorDescription: string, state?: string }} If the user is not logged in
     */
    async callback(): Promise<Auth0DecodedHash | null> {
        const parseHarsh = promisify(this._webAuth.parseHash.bind(this._webAuth))
        const token = await parseHarsh()

        await this._setLegacyCookieIfPossible(token)

        return token
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

    private async _getIdentityOrNullIfCookieRequired(){
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

    private async _setLegacyCookieIfPossible(token: types.Auth0Token){
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

    private async _getIdentityApiTokenOrNulIfAuthRequired(){
        /*
        In the future this should be a token for the identity api,
        but since the identity api only supports cookie
        we just grab som other random token that everybody has
         */
        const opts = {
            audience: 'https://app.24sevenoffice.com',
            responseType: 'token',
            redirectUri: `${window.location.origin}/modules/auth/login-callback`
        }

        try{
            const checkSession = promisify(this._webAuth.checkSession.bind(this._webAuth))

            return await checkSession(opts)
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

    async changeActiveLicense(license: string){
        const [, ClientId, UserId] = license.split(';')

        try {
            await this._changePassportMap({ ClientId, UserId })
            await this._removeIdentity()
            return license
        } catch (err) {
            throw err
        }
    }

    private async _changePassportMap(data: { ClientId: string; UserId: string }){
        return await fetch('/login/data/ChangePassportMap.aspx', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: mapToWWWEncoded(data)
        })
    }

    private async _removeIdentity() {
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