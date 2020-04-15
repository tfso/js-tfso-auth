import EventEmitter from 'eventemitter3';
import { Authenticator } from './Authenticator';
import { Authorizer } from './Authorizer';
import { AccessFailure, AccessSuccess, AuthManagerConfig, Identity, TokenConfig } from './types';
declare type Events = 'authentication-attempt' | 'authentication-success' | 'authentication-failure' | 'authentication-logout' | 'authentication-licensechange' | 'authentication-notifications-unavailable' | 'authorization-start' | 'authorization-complete' | 'authorization-attempt' | 'authorization-success' | 'authorization-failure';
export declare class AuthManager extends EventEmitter<Events> {
    private _authenticator;
    private _authorizer;
    private _authChangeNotifier;
    private _config;
    identity: Identity | null;
    constructor(authenticator: Authenticator, authorizer: Authorizer, config: Partial<AuthManagerConfig>);
    on(event: 'authentication-attempt', fn: () => void, context?: any): this;
    on(event: 'authentication-success', fn: (event: {
        identity: Identity;
    }) => void, context?: any): this;
    on(event: 'authentication-failure', fn: (event: {
        err: Error;
    }) => void, context?: any): this;
    on(event: 'authentication-logout', fn: () => void, context?: any): this;
    on(event: 'authentication-licensechange', fn: (event: {
        newIdentity: Identity;
        prevIdentity: Identity | null;
    }) => void, context?: any): this;
    on(event: 'authentication-notifications-unavailable', fn: () => void, context?: any): this;
    on(event: 'authorization-start', fn: () => void, context?: any): this;
    on(event: 'authorization-complete', fn: () => void, context?: any): this;
    on(event: 'authorization-attempt', fn: (event: {
        tokenConfig: TokenConfig;
        license: string;
    }) => void, context?: any): this;
    on(event: 'authorization-success', fn: (event: {
        access: AccessSuccess;
    }) => void, context?: any): this;
    on(event: 'authorization-failure', fn: (event: {
        access: AccessFailure;
    }) => void, context?: any): this;
    login(): Promise<void>;
    logout(): void;
    authorize(tokenConfig: TokenConfig, license: string): Promise<AccessSuccess | AccessFailure>;
    authorizeOnce(tokenConfig: TokenConfig, license: string): Promise<AccessSuccess | AccessFailure>;
    getAuthorizer(): Authorizer;
    getAuthenticator(): Authenticator;
    _handleLoggedOut(): void;
    _handleLicenseChanged(newIdentity: Identity): void;
    _handleAuthorizationSuccess(access: AccessSuccess): void;
    _handleAuthorizationFailure(access: AccessFailure): void;
    _handleAuthChange(): Promise<void>;
}
export {};
