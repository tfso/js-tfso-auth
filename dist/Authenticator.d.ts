import * as types from './types';
export declare class Authenticator {
    _config: types.AuthenticatorConfig;
    _webAuth: types.WebAuthPromisified;
    constructor(config: Partial<types.AuthenticatorConfig>);
    getCurrentlyLoggedInIdentityOrNull(): Promise<any>;
    ensureLoggedIn(): Promise<any>;
    redirectToLogin(): void;
    redirectToLogout(): void;
    _getIdentityOrNullIfCookieRequired(): Promise<any>;
    _setLegacyCookieIfPossible(token: types.Auth0Token): Promise<void>;
    _getIdentityApiTokenOrNulIfAuthRequired(): Promise<import("auth0-js").Auth0DecodedHash | null>;
}
