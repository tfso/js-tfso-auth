import * as types from './types';
import EventEmitter from 'eventemitter3';
import { TokenConfig } from './types';
declare type Events = 'access-success' | 'access-failure';
export declare class Authorizer extends EventEmitter<Events> {
    _config: types.AuthorizerConfig;
    _webAuth: types.WebAuthPromisified;
    _checkSessionCount: number;
    _accesses: {
        [key: string]: types.AccessSuccess | types.AccessFailure;
    };
    _accessesToRefresh: {
        [key: string]: boolean;
    };
    constructor(config: Partial<types.AuthorizerConfig>);
    /**
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'token-update' and 'error' to be informed when the token changes.
     */
    authorize(tokenConfig: TokenConfig, license: string): Promise<types.AccessSuccess | types.AccessFailure>;
    authorizeOnce(tokenConfig: TokenConfig, license: string): Promise<types.AccessSuccess | types.AccessFailure>;
    unauthorize(key: string): Promise<void>;
    getAccesses(): (types.AccessSuccess | types.AccessFailure)[];
    hasAccess(key: string): boolean;
    getAccess(key: string): types.AccessSuccess | types.AccessFailure;
    _keepTokenFresh(tokenConfig: TokenConfig, license: string): void;
    _refreshToken(tokenConfig: TokenConfig, license: string): Promise<void>;
    _onTokenSuccess({ tokenConfig, token, license, expiresAt }: types.TokenSuccess): void;
    _onTokenFailure({ tokenConfig, error, license }: types.TokenError): void;
    _checkSession(tokenConfig: TokenConfig, license: string): Promise<types.TokenResult>;
}
export {};
