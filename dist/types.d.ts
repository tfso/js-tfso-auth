import * as auth0 from 'auth0-js';
export declare type Auth0Token = auth0.Auth0DecodedHash;
export declare type Auth0Error = auth0.Auth0Error;
export interface WebAuthPromisified {
    checkSession(options: auth0.CheckSessionOptions): Promise<auth0.Auth0DecodedHash>;
    parseHash(options: auth0.ParseHashOptions): Promise<auth0.Auth0DecodedHash>;
}
export interface AuthenticatorConfig {
    optionsAuth0: {
        clientID: string;
        domain: string;
        configurationBaseUrl: string;
    };
    identityApiUrl: string;
    loginUrl: string | (() => string);
    callbackUrl: string;
}
export declare type AuthorizerConfig = AuthenticatorConfig;
export interface Logger {
    debug: Function;
    info: Function;
    error: Function;
}
export interface TokenSuccess {
    key: string;
    token: Auth0Token;
    error: null;
    audience: string;
    scope: string;
    license: string;
}
export interface TokenError {
    key: string;
    token: null;
    error: Auth0Error;
    audience: string;
    scope: string;
    license: string;
}
export declare type TokenResult = TokenSuccess | TokenError;
export interface AccessSuccess {
    key: string;
    token: Auth0Token;
    error: null;
    audience: string;
    scope: string;
    license: string;
    scopesAccepted: string[];
    scopesRequested: string[];
}
export interface AccessFailure {
    key: string;
    token: null;
    error: Auth0Error;
    audience: string;
    scope: string;
    license: string;
    userInteractionRequired: boolean;
    scopesRequested: string[];
}
