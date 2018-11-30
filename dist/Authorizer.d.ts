import * as types from './types';
import EventEmitter from 'eventemitter3';
export declare class Authorizer extends EventEmitter {
    _config: types.AuthorizerConfig;
    _logger: types.Logger;
    _webAuth: types.WebAuthPromisified;
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure;
    };
    _accessesToRefresh: {
        [key: string]: boolean;
    };
    constructor(config: Partial<types.AuthorizerConfig>, logger: types.Logger);
    _getKey(license: string, audience: string): string;
    /**
     * @param {string} license
     * @param {string} audience
     * @param {string} scope Empty-space separated list of scopes
     *
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'token-update' and 'error' to be informed when the token changes.
     */
    authorize(license: string, audience: string, scope: string): Promise<types.AccessSuccess | types.AccessFailure>;
    authorizeOnce(license: string, audience: string, scope: string): Promise<types.AccessSuccess | types.AccessFailure>;
    unauthorize(license: string, audience: string): Promise<void>;
    getAccesses(): (types.AccessSuccess | types.AccessFailure)[];
    hasAccess(license: string, audience: string): boolean;
    getAccess(license: string, audience: string): types.AccessSuccess | types.AccessFailure;
    _keepTokenFresh(license: string, audience: string, scope: string): void;
    _refreshToken(license: string, audience: string, scope: string): Promise<void>;
    _onTokenSuccess({ token, audience, scope, license }: types.TokenSuccess): void;
    _onTokenFailure({ error, audience, scope, license }: types.TokenError): void;
    _checkSession(license: string, audience: string, scope: string): Promise<types.TokenResult>;
}
