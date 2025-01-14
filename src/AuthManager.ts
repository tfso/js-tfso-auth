import EventEmitter from 'eventemitter3'
import {Authenticator} from './Authenticator'
import {Authorizer} from './Authorizer'
import {AuthChangeNotifier} from './AuthChangeNotifier'
import {AccessFailure, AccessSuccess, AuthManagerConfig, Identity, TokenConfig} from './types'

type LoginOptions = {    
    /**
     * Redirect to login page if not logged in
     * @default true
     */
    redirectToLogin?: boolean 

    /**
     * Authorize tokens after login
     * @default true
     */
    authorize?: boolean 
}

type Events =
    'authentication-attempt' |
    'authentication-success' |
    'authentication-failure' |
    'authentication-logout' |
    'authentication-licensechange' |
    'authentication-notifications-unavailable' |
    'authentication-error' |
    'authorization-start' |
    'authorization-complete' |
    'authorization-attempt' |
    'authorization-success' |
    'authorization-failure' | 
    'debug'

const userHasAllRequiredProfileInfo = (identity: Identity) => {
    const hasClient = identity?.client?.id != null && Number(identity?.client?.id) > 0
    const hasRequiredLocale = identity?.locale?.country && identity?.locale?.culture && identity?.locale?.language
    return hasClient && hasRequiredLocale
}

export class AuthManager extends EventEmitter<Events>{
    private _authenticator: Authenticator
    private _authorizer: Authorizer
    private _authChangeNotifier: AuthChangeNotifier | undefined
    private _config: AuthManagerConfig

    identity: Identity | null = null

    constructor(authenticator: Authenticator, authorizer: Authorizer, config: Partial<AuthManagerConfig>){
        super()
        this._authenticator = authenticator
        this._authorizer = authorizer

        if(config.disableNotifier !== true) {
            this._authChangeNotifier = new AuthChangeNotifier(authenticator)

            this._authChangeNotifier.on('login', () => this._handleAuthChange())
            this._authChangeNotifier.on('change', (license?: string) => this._handleAuthChange(license))
            this._authChangeNotifier.on('logout', () => this.logout(window.location.href))
            this._authChangeNotifier.on('connection-failed', () => this.emit('authentication-notifications-unavailable'))
        }

        this._config = { ...{
            tokens: [],
            requireValidProfile: true
        }, ...config }

        this._authorizer.on('access-success', access => this._handleAuthorizationSuccess(access))
        this._authorizer.on('access-failure', access => this._handleAuthorizationFailure(access))
        this._authorizer.on('debug', message => this.emit('debug', message))
        this._authenticator.on('error', (message, err) => { 
            if(this.listenerCount('authentication-error') > 0) {
                this.emit('authentication-error', message, err)
            } 
            else {
                console.log(message)
                console.error(err) 
            }
        })
        this._authenticator.on('debug', message => this.emit('debug', message))
    }

    /*
    Override .on to get better typescript help
     */
    on(event: 'authentication-error', fn: (message: string, err: Error) => void, context?: any): this
    on(event: 'authentication-attempt', fn: () => void, context?: any): this
    on(event: 'authentication-success', fn: (event: {identity: Identity}) => void, context?: any): this
    on(event: 'authentication-failure', fn: (event: {err: Error}) => void, context?: any): this
    on(event: 'authentication-logout', fn: () => void, context?: any): this
    on(event: 'authentication-licensechange', fn: (event: {newIdentity: Identity, prevIdentity: Identity|null}) => void, context?: any): this
    on(event: 'authentication-notifications-unavailable', fn: () => void, context?: any): this
    on(event: 'authorization-start', fn: () => void, context?: any): this
    on(event: 'authorization-complete', fn: () => void, context?: any): this
    on(event: 'authorization-attempt', fn: (event: {tokenConfig: TokenConfig, license: string}) => void, context?: any): this
    on(event: 'authorization-success', fn: (event: {access: AccessSuccess}) => void, context?: any): this
    on(event: 'authorization-failure', fn: (event: {access: AccessFailure}) => void, context?: any): this
    on(event: 'debug', fn: (message: string) => void, context?: any): this
    on(event: Events, fn: EventEmitter.ListenerFn, context?: any): this{
        return super.on(event, fn, context)
    }

    /**
     * Login to the system and authorize tokens if successful, otherwise redirect to login page
     */
    async login(options: LoginOptions = { redirectToLogin: true, authorize: true }){
        const { redirectToLogin, authorize } = options
        this.emit('authentication-attempt')
        try{
            this._authChangeNotifier?.disable()

            const identity = await this._authenticator.getCurrentlyLoggedInIdentityOrNull()

            this.emit('debug', `AuthManager: Login and currently identity ${identity?.license}`)
            if(identity === null) {
                if(redirectToLogin !== false)
                    this._authenticator.login()

                return false
            }

            this.identity = identity // Set before emitting so it's available when consumer is reacting to the event
            if(this._config.requireValidProfile){
                this.requireValidProfile(identity)
            }
            this.emit('authentication-success', {identity})
            this._authChangeNotifier?.listen(identity.license)
        }catch(err){
            this.identity = null
            this.emit('authentication-failure', {err})
            
            if(redirectToLogin !== false)
                this._authenticator.login()

            return false
        }
        finally {
            this._authChangeNotifier?.enable()
        }

        if(authorize !== false) {
            this.emit('authorization-start')
            await Promise.all(this._config.tokens.map(tokenConfig => this.authorize(tokenConfig, this.identity!.license)))
            this.emit('authorization-complete')
        }

        return true
    }

    async changeActiveLicense(newLicense: string){
        await this._authenticator.changeActiveLicense(newLicense)
        await this._handleAuthChange(newLicense)
    }

    hasValidProfile(identity: Identity){
        return userHasAllRequiredProfileInfo(identity)
    }

    requireValidProfile(identity: Identity){
        if(!this.hasValidProfile(identity)){
            document.location.href = '/modules/profile2/#profile'
        }
    }

    async logout(returnUrl?: string){
        this.emit('debug', `AuthManager: Logging out`)
        try{
            this._authChangeNotifier?.disable()

            this._handleLoggedOut()
            await this._authenticator.logout(returnUrl)
        }
        catch(err){
            this.emit('authentication-error', 'Error when logging out', err)
        }
        finally{
            this._authChangeNotifier?.enable()
        }
    }

    async callback(){
        return this._authenticator.callback()
    }

    authorize(tokenConfig: TokenConfig, license: string){
        this.emit('authorization-attempt', {tokenConfig, license})
        return this._authorizer.authorize(tokenConfig, license)
    }

    authorizeOnce(tokenConfig: TokenConfig, license: string){
        this.emit('authorization-attempt', {tokenConfig, license})
        return this._authorizer.authorizeOnce(tokenConfig, license)
    }

    getAuthorizer(){
        return this._authorizer
    }

    getAuthenticator(){
        return this._authenticator
    }

    getTokenConfig() {
        return this._config.tokens
    }

    private _handleLoggedOut(){
        this.emit('authentication-logout')

        const defaultHandler = () => { }

        if(this._config.logoutHandler){
            this.emit('debug', `AuthManager: Using custom logout handler`)

            this._config.logoutHandler(defaultHandler)
        }
    }

    private _handleLicenseChanged(newIdentity: Identity){
        const event = {newIdentity, prevIdentity: this.identity }

        this.identity = newIdentity

        this.emit('authentication-licensechange', event)

        const defaultHandler = () => window.location.reload()

        if(this._config.licenseChangeHandler){
            this.emit('debug', `AuthManager: Using custom license change handler`)
            this._config.licenseChangeHandler(event, defaultHandler)
        }else{
            defaultHandler()
        }
    }

    private _handleAuthorizationSuccess(access: AccessSuccess){
        this.emit('authorization-success', {access})
    }

    private _handleAuthorizationFailure(access: AccessFailure){
        this.emit('authorization-failure', {access})
    }

    private async _handleAuthChange(attemptedLicense?: string){
        const identity = await this._authenticator.getCurrentlyLoggedInIdentityOrNull(attemptedLicense)
        if(!identity){
            return this.logout(window.location.href)
        }

        this.emit('debug', `AuthManager: Handling auth change to ${attemptedLicense}`)

        if(identity.license !== (this.identity?.license ?? '')){
            return this._handleLicenseChanged(identity)
        }
    }
}