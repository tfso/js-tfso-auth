import {Auth0DecodedHash, Auth0Error, CheckSessionOptions, ParseHashOptions} from 'auth0-js'

export type Auth0Token = Auth0DecodedHash
export type Auth0Error = Auth0Error

export interface WebAuthPromisified{
    checkSession(options: CheckSessionOptions): Promise<Auth0DecodedHash>
    parseHash(options: ParseHashOptions): Promise<Auth0DecodedHash>
}

export type LicenseChangeEvent = {
    newIdentity: any
    prevIdentity: any
}

export interface AuthManagerConfig{
    logoutHandler?: (defaultHandler: () => void) => any
    licenseChangeHandler?: (event: LicenseChangeEvent, defaultHandler: () => void) => any
    tokens: TokenConfig[]
}

export interface TokenConfig{
    key: string // A unique identifier for this combination of audience / scopes
    audience: string
    scopes: string[]
}

export interface AuthenticatorConfig{
    optionsAuth0: {
        clientID: string
        domain: string
        configurationBaseUrl: string
    }
    identityApiUrl: string
    authenticateJwtUrl: string
    loginUrl: string | (() => string)
    logoutUrl: string | (() => string)
    callbackUrl: string
}

export type AuthorizerConfig = AuthenticatorConfig

export interface TokenSuccess{
    type: 'success'
    tokenConfig: TokenConfig
    token: Auth0Token
    error: null
    license: string
    expiresAt: number | null
}

export interface TokenError{
    type: 'error'
    tokenConfig: TokenConfig
    token: null
    error: Auth0Error
    license: string
}

export type TokenResult = TokenSuccess | TokenError

export interface AccessSuccess{
    type: 'success'
    tokenConfig: TokenConfig
    token: Auth0Token
    error: null
    license: string
    expiresAt: number | null // Null if no expiry
    scopesAccepted: string[]
}

export interface AccessFailure{
    type: 'failure'
    tokenConfig: TokenConfig
    token: null
    error: Auth0Error
    license: string
    userInteractionRequired: boolean
    scopesAccepted: string[]
}

export type Identity = {
    license: string
    identity: {
        id: string
    }
    client: {
        id: string
        name: string
    }
    user: {
        id: string
    }
    profile: {
        thumb: {
            data: string
        }
    }
    locale: {
        country: string
        culture: string
        language: string
        timeZone: string
        timeZoneOffset: string
    }
    currency: {
        baseSymbol: null | string
    }
}