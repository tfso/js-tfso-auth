import { Authenticator } from './Authenticator';
import { Authorizer } from './Authorizer';
import { AuthManager } from './AuthManager';
export { Authenticator } from './Authenticator';
export { Authorizer } from './Authorizer';
export { AuthChangeNotifier } from './AuthChangeNotifier';
export { AuthManager } from './AuthManager';
export const createAuthManager = (authManagerConfig, authenticatorConfig) => {
    const authenticator = new Authenticator(authenticatorConfig);
    const authorizer = new Authorizer(authenticatorConfig);
    const authManager = new AuthManager(authenticator, authorizer, authManagerConfig);
    return authManager;
};
//# sourceMappingURL=index.js.map