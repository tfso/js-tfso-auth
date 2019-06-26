import * as types from './types';
import EventEmitter from 'eventemitter3';
import { AccessFailure, AccessSuccess, TokenConfig } from './types';
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
     * 'access-success' and 'access-failure' to be informed when the token changes.
     */
    authorize(tokenConfig: TokenConfig, license: string): Promise<types.AccessSuccess | types.AccessFailure>;
    authorizeOnce(tokenConfig: TokenConfig, license: string): Promise<types.AccessSuccess | types.AccessFailure>;
    unauthorize(key: string, license: string): Promise<void>;
    getAccesses(): (types.AccessSuccess | types.AccessFailure)[];
    hasAccess(key: string, license: string): boolean;
    getAccess(key: string, license: string): types.AccessSuccess | types.AccessFailure;
    isRefreshing(key: string, license: string): boolean;
    _accessKey(tokenKey: string, license: string): string;
    _setAccess(access: AccessSuccess | AccessFailure): void;
    _setRefresh(key: string, license: string): void;
    _keepTokenFresh(tokenConfig: TokenConfig, license: string): void;
    _refreshToken(tokenConfig: TokenConfig, license: string): Promise<void>;
    _onTokenSuccess({ tokenConfig, token, license, expiresAt }: types.TokenSuccess): void;
    _onTokenFailure({ tokenConfig, error, license }: types.TokenError): void;
    _checkSession(tokenConfig: TokenConfig, license: string): Promise<types.TokenResult>;
}
export {};
