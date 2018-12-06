import * as types from './types';
import EventEmitter from 'eventemitter3';
export declare class Authorizer extends EventEmitter {
    _config: types.AuthorizerConfig;
    _logger: types.Logger;
    _webAuth: types.WebAuthPromisified;
    _checkSessionCount: number;
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure;
    };
    _accessesToRefresh: {
        [key: string]: boolean;
    };
    constructor(config: Partial<types.AuthorizerConfig>, logger: types.Logger);
    /**
     * @param {string} key Some unique key to identify this token
     * @param {string} license
     * @param {string} audience
     * @param {string} scope Empty-space separated list of scopes
     *
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'token-update' and 'error' to be informed when the token changes.
     */
    authorize(key: string, license: string, audience: string, scope: string): Promise<types.AccessSuccess | types.AccessFailure>;
    authorizeOnce(key: string, license: string, audience: string, scope: string): Promise<types.AccessSuccess | types.AccessFailure>;
    unauthorize(key: string): Promise<void>;
    getAccesses(): (types.AccessSuccess | types.AccessFailure)[];
    hasAccess(key: string): boolean;
    getAccess(key: string): types.AccessSuccess | types.AccessFailure;
    _keepTokenFresh(key: string, license: string, audience: string, scope: string): void;
    _refreshToken(key: string, license: string, audience: string, scope: string): Promise<void>;
    _onTokenSuccess({ key, token, audience, scope, license }: types.TokenSuccess): void;
    _onTokenFailure({ key, error, audience, scope, license }: types.TokenError): void;
    _checkSession(key: string, license: string, audience: string, scope: string): Promise<types.TokenResult>;
}
