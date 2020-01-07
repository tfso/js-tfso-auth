import EventEmitter from 'eventemitter3';
import { AuthChangeNotifier } from './AuthChangeNotifier';
import defaultsDeep from 'lodash/defaultsDeep';
const userHasAllRequiredProfileInfo = (identity) => {
    const hasClient = identity.client.id !== null && Number(identity.client.id) > 0;
    const hasRequiredLocale = identity.locale.country && identity.locale.culture && identity.locale.language;
    return hasClient && hasRequiredLocale;
};
export class AuthManager extends EventEmitter {
    constructor(authenticator, authorizer, config) {
        super();
        this.identity = null;
        this._authenticator = authenticator;
        this._authorizer = authorizer;
        this._authChangeNotifier = new AuthChangeNotifier(authenticator);
        this._config = defaultsDeep({}, config, {
            tokens: [],
            requireValidProfile: true
        });
        this._authorizer.on('access-success', access => this._handleAuthorizationSuccess(access));
        this._authorizer.on('access-failure', access => this._handleAuthorizationFailure(access));
        this._authChangeNotifier.on('login', () => this._handleAuthChange());
        this._authChangeNotifier.on('change', () => this._handleAuthChange());
        this._authChangeNotifier.on('logout', () => this._handleAuthChange());
        this._authChangeNotifier.on('connection-failed', () => this.emit('authentication-notifications-unavailable'));
    }
    on(event, fn, context) {
        return super.on(event, fn, context);
    }
    async login() {
        this.emit('authentication-attempt');
        try {
            const identity = await this._authenticator.ensureLoggedIn();
            this.identity = identity; // Set before emitting so it's available when consumer is reacting to the event
            if (this._config.requireValidProfile) {
                this.requireValidProfile(identity);
            }
            this.emit('authentication-success', { identity });
            this._authChangeNotifier.listen(identity.license);
        }
        catch (err) {
            this.identity = null;
            this.emit('authentication-failure', { err });
            return;
        }
        this.emit('authorization-start');
        await Promise.all(this._config.tokens.map(tokenConfig => this.authorize(tokenConfig, this.identity.license)));
        this.emit('authorization-complete');
    }
    hasValidProfile(identity) {
        return userHasAllRequiredProfileInfo(identity);
    }
    requireValidProfile(identity) {
        if (!userHasAllRequiredProfileInfo(identity)) {
            document.location.href = 'https://app.24sevenoffice.com/modules/profile2/#profile';
        }
    }
    logout() {
        this._authenticator.redirectToLogout();
    }
    authorize(tokenConfig, license) {
        this.emit('authorization-attempt', { tokenConfig, license });
        return this._authorizer.authorize(tokenConfig, license);
    }
    authorizeOnce(tokenConfig, license) {
        this.emit('authorization-attempt', { tokenConfig, license });
        return this._authorizer.authorizeOnce(tokenConfig, license);
    }
    getAuthorizer() {
        return this._authorizer;
    }
    getAuthenticator() {
        return this._authenticator;
    }
    _handleLoggedOut() {
        this.emit('authentication-logout');
        const defaultHandler = () => this._authenticator.redirectToLogin();
        if (this._config.logoutHandler) {
            this._config.logoutHandler(defaultHandler);
        }
        else {
            defaultHandler();
        }
    }
    _handleLicenseChanged(newIdentity) {
        const event = { newIdentity, prevIdentity: this.identity };
        this.emit('authentication-licensechange', event);
        const defaultHandler = () => window.location.reload(true);
        if (this._config.licenseChangeHandler) {
            this._config.licenseChangeHandler(event, defaultHandler);
        }
        else {
            defaultHandler();
        }
    }
    _handleAuthorizationSuccess(access) {
        this.emit('authorization-success', { access });
    }
    _handleAuthorizationFailure(access) {
        this.emit('authorization-failure', { access });
    }
    async _handleAuthChange() {
        const identity = await this._authenticator.getCurrentlyLoggedInIdentityOrNull();
        if (identity === null) {
            return this._handleLoggedOut();
        }
        if (identity.license !== (this.identity !== null ? this.identity.license : '')) {
            return this._handleLicenseChanged(identity);
        }
    }
}
//# sourceMappingURL=AuthManager.js.map