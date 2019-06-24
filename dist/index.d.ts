import { AuthenticatorConfig, AuthManagerConfig } from './types';
import { AuthManager } from './AuthManager';
export { Authenticator } from './Authenticator';
export { Authorizer } from './Authorizer';
export { AuthChangeNotifier } from './AuthChangeNotifier';
export { AuthManager } from './AuthManager';
export declare const createAuthManager: (authManagerConfig: Partial<AuthManagerConfig>, authenticatorConfig: Partial<AuthenticatorConfig>) => AuthManager;
