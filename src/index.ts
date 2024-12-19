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
    const webAuth = new WebAuth({ ...defaultConfig.optionsAuth0, ...cleanConfig(authenticatorConfig.optionsAuth0 ?? {}) })

    const authenticator = new Authenticator(cleanConfig(authenticatorConfig), webAuth)
    const authorizer = new Authorizer(cleanConfig(authenticatorConfig), webAuth)
    const authManager = new AuthManager(authenticator, authorizer, authManagerConfig)

    return authManager
}

function cleanConfig(config?: Record<string, any>) {
    if(config && typeof config == 'object') {   
        return Object
            .entries(config ?? {})
            .filter(([, value]) => value !== undefined)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: cleanConfig(value) }), {})
    }

    return config
}
