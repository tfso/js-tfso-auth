import { Auth0DecodedHash, Auth0Error, CheckSessionOptions, ParseHashOptions } from 'auth0-js';
export { Auth0Error };
export declare type Auth0Token = Auth0DecodedHash;
export interface WebAuthPromisified {
    checkSession(options: CheckSessionOptions): Promise<Auth0DecodedHash>;
    parseHash(options: ParseHashOptions): Promise<Auth0DecodedHash>;
}
export declare type LicenseChangeEvent = {
    newIdentity: any;
    prevIdentity: any;
};
export interface AuthManagerConfig {
    logoutHandler?: (defaultHandler: () => void) => any;
    licenseChangeHandler?: (event: LicenseChangeEvent, defaultHandler: () => void) => any;
    tokens: TokenConfig[];
    requireValidProfile: boolean;
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
    authenticateJwtUrl: string;
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
export declare type Supplier = {
    id: string;
    name: string;
    tfsoClientId: number;
    isOwner: boolean;
};
export declare type Identity = {
    license: string;
    identity: {
        id: string;
    };
    client: {
        id: string;
        name: string;
        clientType: {
            type: string;
            version: number;
        };
        deactivationDate: string;
        created: string;
        suppliers: Supplier[];
    };
    user: {
        id: string;
    };
    profile: {
        thumb: {
            data: string;
        };
        birthDate: string;
        country: string;
        created: string;
        culture: string;
        firstName: string;
        gender: string;
        id: string;
        identifier: string;
        language: string;
        lastName: string;
        location: string;
        locationCoordinates: string;
        modified: string;
        thumbBase64: string;
        thumbMediaType: string;
        timeZone: string;
        visibility: string;
    };
    locale: {
        country: string;
        culture: string;
        language: string;
        timeZone: string;
        timeZoneOffset: string;
    };
    currency: {
        baseSymbol: null | string;
    };
};
