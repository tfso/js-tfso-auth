import * as auth0  from 'auth0-js'

export type Auth0Token = auth0.Auth0DecodedHash
export type Auth0Error = auth0.Auth0Error

export interface WebAuthPromisified{
    checkSession(options: auth0.CheckSessionOptions): Promise<auth0.Auth0DecodedHash>
    parseHash(options: auth0.ParseHashOptions): Promise<auth0.Auth0DecodedHash>
}

export interface AuthenticatorConfig{
    optionsAuth0: {
        clientID: string
        domain: string
        configurationBaseUrl: string
    }
    identityApiUrl: string
    loginUrl: string | (() => string)
    callbackUrl: string
}

export type AuthorizerConfig = AuthenticatorConfig

export interface Logger{
    debug: Function
    info: Function
    error: Function
}

export interface TokenSuccess{
    token: Auth0Token
    error: null
    audience: string
    scope: string
    license: string
}

export interface TokenError{
    token: null
    error: Auth0Error
    audience: string
    scope: string
    license: string
}

export type TokenResult = TokenSuccess | TokenError

export interface AccessSuccess{
    token: Auth0Token
    error: null
    audience: string
    scope: string
    license: string
    scopesAccepted: string[]
    scopesRequested: string[]
}

export interface AccessFailure{
    token: null
    error: Auth0Error
    audience: string
    scope: string
    license: string
    userInteractionRequired: boolean
    scopesRequested: string[]
}