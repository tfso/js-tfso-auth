import * as auth0 from 'auth0-js';
export declare type Auth0Token = auth0.Auth0DecodedHash;
export declare type Auth0Error = auth0.Auth0Error;
export interface WebAuthPromisified {
    checkSession(options: auth0.CheckSessionOptions): Promise<auth0.Auth0DecodedHash>;
    parseHash(options: auth0.ParseHashOptions): Promise<auth0.Auth0DecodedHash>;
}
export declare type LicenseChangeEvent = {
    newIdentity: any;
    prevIdentity: any;
};
export interface AuthManagerConfig {
    logoutHandler?: (defaultHandler: () => void) => any;
    licenseChangeHandler?: (event: LicenseChangeEvent, defaultHandler: () => void) => any;
    tokens: TokenConfig[];
}
export interface TokenConfig {
    key: string;
    audience: string;
    scopes: string[];
}
export interface AuthenticatorConfig {
    optionsAuth0: {
        clientID: string;
        domain: string;
        configurationBaseUrl: string;
    };
    identityApiUrl: string;
    loginUrl: string | (() => string);
    logoutUrl: string | (() => string);
    callbackUrl: string;
}
export declare type AuthorizerConfig = AuthenticatorConfig;
export interface TokenSuccess {
    type: 'success';
    tokenConfig: TokenConfig;
    token: Auth0Token;
    error: null;
    license: string;
    expiresAt: number | null;
}
export interface TokenError {
    type: 'error';
    tokenConfig: TokenConfig;
    token: null;
    error: Auth0Error;
    license: string;
}
export declare type TokenResult = TokenSuccess | TokenError;
export interface AccessSuccess {
    type: 'success';
    tokenConfig: TokenConfig;
    token: Auth0Token;
    error: null;
    license: string;
    expiresAt: number | null;
    scopesAccepted: string[];
}
export interface AccessFailure {
    type: 'failure';
    tokenConfig: TokenConfig;
    token: null;
    error: Auth0Error;
    license: string;
    userInteractionRequired: boolean;
    scopesAccepted: string[];
}
export declare type Identity = {
    license: string;
    identity: {
        id: string;
    };
    client: {
        id: string;
        name: string;
    };
    user: {
        id: string;
    };
    profile: {
        thumb: {
            data: string;
        };
    };
    locale: {
        country: string;
        cultureInfo: string;
        timeZoneOffset: string;
        language: string;
    };
    currency: {
        baseSymbol: null | string;
    };
};
