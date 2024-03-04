import { WebAuth } from 'auth0-js'

import {AuthenticatorConfig, AuthManagerConfig} from './types'
import {Authenticator} from './Authenticator'
import {Authorizer} from './Authorizer'
import {AuthManager} from './AuthManager'

import defaultConfig from './defaultConfig'

export {Authenticator} from './Authenticator'
export {Authorizer} from './Authorizer'
export {AuthChangeNotifier} from './AuthChangeNotifier'
export {AuthManager} from './AuthManager'

export const createAuthManager = (authManagerConfig: Partial<AuthManagerConfig>, authenticatorConfig: Partial<AuthenticatorConfig>) => {
    const webAuth = new WebAuth(authenticatorConfig.optionsAuth0 ?? defaultConfig.optionsAuth0 )

    const authenticator = new Authenticator(authenticatorConfig, webAuth)
    const authorizer = new Authorizer(authenticatorConfig, webAuth)
    const authManager = new AuthManager(authenticator, authorizer, authManagerConfig)

    return authManager
}