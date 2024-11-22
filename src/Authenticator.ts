import { Auth0DecodedHash, WebAuth } from 'auth0-js'
import EventEmitter from 'eventemitter3'

import * as types from './types'
import defaultConfig from './defaultConfig'
import promisify from './promisify'

type Events = 'debug'

export class Authenticator extends EventEmitter<Events> {
    private _config: types.AuthenticatorConfig
    private _baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`

    private _identityIsBeingFetched = false
    private _identity: types.Identity | null = null

    constructor(config: Partial<types.AuthenticatorConfig>, private _webAuth: WebAuth) {
        super()

        this._config = { ...defaultConfig, ...config ?? {} }
    }

    async getCurrentlyLoggedInIdentityOrNull(attemptedLicense?: string) {
        if(await assert(() => !this._identityIsBeingFetched)) {
            if(this._identity?.license === attemptedLicense){
                this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull:Using cached identity', this._identity)
                return this._identity
            }

            this._identityIsBeingFetched = true
            
            try {
                this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull')

                const token = await this._getIdentityApiTokenOrNulIfAuthRequired()
                if(!token){
                    this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull:No token')
                    return null
                }

                let identity = await this._getIdentityOrNullIfCookieRequired()
                if(!identity){
                    this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull:No identity')
                    await this._setLegacyCookieIfPossible(token)
                    identity = await this._getIdentityOrNullIfCookieRequired()
                }

                if(!identity){
                    this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull:No identity after legacy cookie')
                    return null
                }

                this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull:Identity', identity)
                
                this._identity = identity

                return identity
            }
            catch(err) {
                this.emit('debug', 'Authenticator:getCurrentlyLoggedInIdentityOrNull:Error', err)
                console.error(err)

                return null
            }
            finally {
                this._identityIsBeingFetched = false
            }
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
        this.emit('debug', 'Authenticator:getIdentityOrNullIfCookieRequired', cacheBustUrl(this._config.identityApiUrl))

        const res = await fetch(cacheBustUrl(this._config.identityApiUrl), {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })

        this.emit('debug', 'Authenticator:getIdentityOrNullIfCookieRequired:Response', res)

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
            this.emit('debug', 'Authenticator:_setLegacyCookieIfPossible', { token, url: this._config.authenticateJwtUrl })
            await fetch(this._config.authenticateJwtUrl, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'Bearer ' + token.accessToken
                }
            })
        }catch(err){
            this.emit('debug', 'Authenticator:_setLegacyCookieIfPossible:Failed', err)
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
            this.emit('debug', `Auth0:checkSession`)
            const checkSession = promisify(this._webAuth.checkSession.bind(this._webAuth))

            return await checkSession(opts)
        }catch(error){
            this.emit('debug', `Auth0:checkSession failed`, error)

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
            console.log(err)
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
