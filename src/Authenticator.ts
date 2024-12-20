import { WebAuth } from 'auth0-js'
import EventEmitter from 'eventemitter3'

import * as types from './types'
import defaultConfig from './defaultConfig'
import promisify from './promisify'

type Events = 'error'

class HttpError extends Error {
    constructor(public status: number, public statusText: string, public headers?: Response["headers"], public body?: Record<string, any>) {
        super(`${status} ${statusText}`)
    }
}

export class Authenticator extends EventEmitter<Events> {
    private _config: types.AuthenticatorConfig
    private _baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`

    private _identityIsBeingFetched = false
    private _identity: types.Identity | null = null

    constructor(config: Partial<types.AuthenticatorConfig>, private _webAuth: WebAuth) {
        super()

        this._config = { ...defaultConfig, ...config ?? {}, optionsAuth0: { ...defaultConfig.optionsAuth0, ...config.optionsAuth0 ?? {} } }
    }

    get webAuth() {
        return this._webAuth
    }

    private get loginUrl() {
        return typeof this._config.logoutUrl === 'function'
            ? this._config.logoutUrl()
            : this._config.logoutUrl
    }

    private get logoutUrl() {
        return typeof this._config.logoutUrl === 'function'
            ? this._config.logoutUrl()
            : this._config.logoutUrl
    }

    async getCurrentlyLoggedInIdentityOrNull(attemptedLicense?: string) {
        try {
            if(this._identityIsBeingFetched)
                await assert(() => !this._identityIsBeingFetched)
            
            this._identityIsBeingFetched = true

            if(attemptedLicense && this._identity?.license === attemptedLicense){
                return this._identity
            }

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
            
            this._identity = identity

            return identity
        }
        catch(err) {
            this.emit('error', 'Currently logged in identity not found', err)
            return null
        }
        finally {
            this._identityIsBeingFetched = false
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

    login(returnUrl?: string) {
        const redirectUrl = new URL(this._config.callbackUrl ?? `/modules/auth/login-callback`, window.location.origin)

        if(window.location.search){
            for(let [key, value] of new URLSearchParams(window.location.search)){
                redirectUrl.searchParams.append(key, value)
            }
        }

        if(returnUrl){
            redirectUrl.searchParams.set('returnUrl', returnUrl)
        }

        this._webAuth.authorize({
            audience: 'https://app.24sevenoffice.com',
            responseType: 'token',
            redirectUri: redirectUrl.toString()
        })
    }

    async logout(returnUrl?: string) {
        const returnTo = new URL(this.loginUrl ?? `${this._baseUrl}/modules/auth/login/`, window.location.origin)
        
        if(returnUrl){
            returnTo.searchParams.set('returnUrl', returnUrl)
        }

        await Promise.all([
            fetch(`${this._baseUrl}/script/client/login/logoff.asp?_dc=${Date.now()}`, { credentials: 'same-origin' }),
            fetch(`${this._baseUrl}/login/data/Logout.aspx`, { method: 'POST', credentials: 'same-origin' })
        ])

        this._webAuth.logout({
            returnTo: returnTo.toString()
        })
    }

    /**
     * Verify callback from login provider
     * @returns The identity if the user is logged in, otherwise null
     * @throws {{ error: string, errorDescription: string, state?: string }} If the user is not logged in
     */
    async callback(): Promise<Record<string, any> | null> {
        const parseHarsh = promisify(this._webAuth.parseHash.bind(this._webAuth))
        const token = await parseHarsh()

        await this._setLegacyCookieIfPossible(token)

        const identity = this._getIdentityOrNullIfCookieRequired()
        return identity
    }

    public redirectToLogin(){
        window.location.href = this.loginUrl
    }

    public redirectToLogout(){
        window.location.href = this.logoutUrl
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
            this.emit('error', 'Setting Legacy cookie failed', err)
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
            redirectUri: this._config.sessionCallbackUrl ?? this._config.callbackUrl,
            prompt: 'none'
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
            this.emit('error', 'Changing active license failed', err)
            throw err
        }
    }

    private async _changePassportMap(data: { ClientId: string; UserId: string }){
        const res = await fetch('/login/data/ChangePassportMap.aspx', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: mapToWWWEncoded(data)
        })
        if(!res.ok) {
            throw new HttpError(res.status, res.statusText, res.headers)
        }
        return res
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

async function assert(assertion: () => boolean, interval?: number, timeout = 30000): Promise<boolean> {
    const started = Date.now()

    let counter = 0
    do {
        if (assertion() == true)
            return true

        await sleep(typeof interval == 'number' ? interval : Math.floor(10 + Math.pow(counter++, 2))) // 10, 11, 14, 19, 26, 35, 46, 59, 74, 91...
    } while ((Date.now() - started) < timeout)
    
    return false
}

async function sleep(value = 1000): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, Number(value) || 1000)
        } catch (ex) {
            reject(ex)
        }
    })
}
