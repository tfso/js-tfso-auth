import { WebAuth } from 'auth0-js';
import { Realtime } from 'ably';
import EventEmitter from 'eventemitter3';
import defaultsDeep from 'lodash.defaultsdeep';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var promisify = (function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            try {
                fn.apply(void 0, args.concat([function (err, result) {
                        if (err)
                            return reject(err);
                        return resolve(result);
                    }]));
            }
            catch (err) {
                reject(err);
            }
        });
    };
});

var promisifiyWebAuth = function (webAuth) {
    return {
        parseHash: promisify(webAuth.parseHash.bind(webAuth)),
        checkSession: promisify(webAuth.checkSession.bind(webAuth))
    };
};
var createWebAuth = (function (options) {
    return promisifiyWebAuth(new WebAuth(options));
});

var defaultConfig = {
    optionsAuth0: {
        clientID: 'INGoYuDZDgaxT8JOL64M7vnJcxEGxCi0',
        domain: 'login.24SevenOffice.com',
        configurationBaseUrl: 'tfso.eu.auth0.com'
    },
    identityApiUrl: 'https://identity.api.24sevenoffice.com',
    authenticateJwtUrl: '/login/data/AuthenticateJwt.aspx',
    loginUrl: function () { return "/modules/auth/login/?returnUrl=" + encodeURIComponent(window.location.origin + window.location.pathname); },
    logoutUrl: function () { return "/modules/auth/logout"; },
    callbackUrl: window.location.origin + "/modules/auth/login-callback?isSilent=true"
};

var Authenticator = /** @class */ (function () {
    function Authenticator(config) {
        this._config = defaultsDeep({}, config, defaultConfig);
        this._webAuth = createWebAuth(this._config.optionsAuth0);
    }
    Authenticator.prototype.getCurrentlyLoggedInIdentityOrNull = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getIdentityApiTokenOrNulIfAuthRequired()];
                    case 1:
                        token = _a.sent();
                        if (token === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this._getIdentityOrNullIfCookieRequired()];
                    case 2:
                        identity = _a.sent();
                        if (!(identity === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._setLegacyCookieIfPossible(token)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._getIdentityOrNullIfCookieRequired()];
                    case 4:
                        identity = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (identity === null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, identity];
                }
            });
        });
    };
    Authenticator.prototype.ensureLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentlyLoggedInIdentityOrNull()];
                    case 1:
                        identity = _a.sent();
                        if (identity === null) {
                            this.redirectToLogin();
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, identity];
                }
            });
        });
    };
    Authenticator.prototype.redirectToLogin = function () {
        window.location.href = typeof this._config.loginUrl === 'function'
            ? this._config.loginUrl()
            : this._config.loginUrl;
    };
    Authenticator.prototype.redirectToLogout = function () {
        window.location.href = typeof this._config.logoutUrl === 'function'
            ? this._config.logoutUrl()
            : this._config.logoutUrl;
    };
    Authenticator.prototype._getIdentityOrNullIfCookieRequired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err, body, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch(cacheBustUrl(this._config.identityApiUrl), {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'Accept': 'application/json'
                            }
                        })];
                    case 1:
                        res = _b.sent();
                        if (res.status === 401) {
                            return [2 /*return*/, null];
                        }
                        if (!(res.status < 200 || res.status >= 300)) return [3 /*break*/, 6];
                        err = new Error(res.statusText);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, res.json()];
                    case 3:
                        body = _b.sent();
                        err.message = (body.error && body.message) || err.message;
                        err.trackingId = body.trackingId;
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        err.status = res.status;
                        throw err;
                    case 6: return [2 /*return*/, res.json()];
                }
            });
        });
    };
    Authenticator.prototype._setLegacyCookieIfPossible = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(this._config.authenticateJwtUrl, {
                                method: 'POST',
                                headers: {
                                    'Authorization': 'Bearer ' + token.accessToken
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Authenticator.prototype._getIdentityApiTokenOrNulIfAuthRequired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opts, error_1, errorsWhereAuthIsRequired;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = {
                            audience: 'https://app.24sevenoffice.com',
                            responseType: 'token',
                            redirectUri: this._config.callbackUrl
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._webAuth.checkSession(opts)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        errorsWhereAuthIsRequired = [
                            'login_required',
                            'consent_required',
                            'interaction_required',
                            'unauthorized'
                        ];
                        if (errorsWhereAuthIsRequired.includes(error_1.error)) {
                            return [2 /*return*/, null];
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Authenticator;
}());
var cacheBustUrl = function (url) {
    url = new URL(url, window.location.origin);
    url.searchParams.set('_dc', Date.now());
    return url.toString();
};

var Authorizer = /** @class */ (function (_super) {
    __extends(Authorizer, _super);
    function Authorizer(config) {
        var _this = _super.call(this) || this;
        _this._checkSessionCount = 0;
        _this._accesses = {};
        _this._accessesToRefresh = {};
        _this._config = defaultsDeep({}, config, defaultConfig);
        _this._webAuth = createWebAuth(_this._config.optionsAuth0);
        return _this;
    }
    /**
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'access-success' and 'access-failure' to be informed when the token changes.
     */
    Authorizer.prototype.authorize = function (tokenConfig, license) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._refreshToken(tokenConfig, license)];
                    case 1:
                        _a.sent();
                        this._keepTokenFresh(tokenConfig, license);
                        return [2 /*return*/, this.getAccess(tokenConfig.key, license)];
                }
            });
        });
    };
    Authorizer.prototype.authorizeOnce = function (tokenConfig, license) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._refreshToken(tokenConfig, license)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getAccess(tokenConfig.key, license)];
                }
            });
        });
    };
    Authorizer.prototype.unauthorize = function (key, license) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete this._accesses[this._accessKey(key, license)];
                delete this._accessesToRefresh[this._accessKey(key, license)];
                return [2 /*return*/];
            });
        });
    };
    Authorizer.prototype.getAccesses = function () {
        return Object.values(this._accesses);
    };
    Authorizer.prototype.hasAccess = function (key, license) {
        return !!this.getAccess(key, license);
    };
    Authorizer.prototype.getAccess = function (key, license) {
        return this._accesses[this._accessKey(key, license)];
    };
    Authorizer.prototype.isRefreshing = function (key, license) {
        return this._accessesToRefresh[this._accessKey(key, license)];
    };
    Authorizer.prototype._accessKey = function (tokenKey, license) {
        return tokenKey + "-" + license;
    };
    Authorizer.prototype._setAccess = function (access) {
        this._accesses[this._accessKey(access.tokenConfig.key, access.license)] = access;
    };
    Authorizer.prototype._setRefresh = function (key, license) {
        this._accessesToRefresh[this._accessKey(key, license)] = true;
    };
    Authorizer.prototype._keepTokenFresh = function (tokenConfig, license) {
        var _this = this;
        if (this.isRefreshing(tokenConfig.key, license)) {
            return;
        }
        this._setRefresh(tokenConfig.key, license);
        var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
        var waitAndRefreshAgain = function () {
            if (!_this.isRefreshing(tokenConfig.key, license)) {
                return;
            }
            delay(15 * 60 * 1000)
                .then(function () { return _this._refreshToken(tokenConfig, license); })
                .then(waitAndRefreshAgain);
        };
        waitAndRefreshAgain();
    };
    Authorizer.prototype._refreshToken = function (tokenConfig, license) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._checkSession(tokenConfig, license)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            this._onTokenFailure(result);
                        }
                        else {
                            this._onTokenSuccess(result);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Authorizer.prototype._onTokenSuccess = function (_a) {
        var tokenConfig = _a.tokenConfig, token = _a.token, license = _a.license, expiresAt = _a.expiresAt;
        var access = {
            type: 'success',
            tokenConfig: tokenConfig,
            token: token,
            error: null,
            license: license,
            expiresAt: expiresAt,
            scopesAccepted: token.scope ? token.scope.split(' ') : []
        };
        this._setAccess(access);
        this.emit('access-success', access);
    };
    Authorizer.prototype._onTokenFailure = function (_a) {
        var tokenConfig = _a.tokenConfig, error = _a.error, license = _a.license;
        var errorsWhereAuthIsRequired = [
            'login_required',
            'consent_required',
            'interaction_required',
            'unauthorized'
        ];
        var access = {
            type: 'failure',
            tokenConfig: tokenConfig,
            token: null,
            error: error,
            license: license,
            userInteractionRequired: errorsWhereAuthIsRequired.includes(error.error),
            scopesAccepted: []
        };
        this._setAccess(access);
        this.emit('access-failure', access);
    };
    Authorizer.prototype._checkSession = function (tokenConfig, license) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, identityId, clientId, userId, opts, token, expiresAt, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = license.split(';'), identityId = _a[0], clientId = _a[1], userId = _a[2];
                        opts = {
                            audience: tokenConfig.audience,
                            scope: tokenConfig.scopes.join(' '),
                            state: "identityId:" + identityId + ";clientId:" + clientId + ";userId:" + userId + ";unique:" + ++this._checkSessionCount,
                            responseType: 'token',
                            redirectUri: this._config.callbackUrl
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._webAuth.checkSession(opts)];
                    case 2:
                        token = _b.sent();
                        expiresAt = token.expiresIn !== undefined ? token.expiresIn + Date.now() : null;
                        return [2 /*return*/, { type: 'success', tokenConfig: tokenConfig, token: token, error: null, license: license, expiresAt: expiresAt }];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, { type: 'error', tokenConfig: tokenConfig, token: null, error: error_1, license: license }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Authorizer;
}(EventEmitter));

var AblyConnectionState = {
    initialized: "initialized",
    connecting: "connecting",
    connected: "connected",
    disconnected: "disconnected",
    suspended: "suspended",
    closing: "closing",
    closed: "closed",
    failed: "failed",
};
var AuthChangeNotifier = /** @class */ (function (_super) {
    __extends(AuthChangeNotifier, _super);
    function AuthChangeNotifier(authenticator) {
        var _this = _super.call(this) || this;
        _this._authenticator = authenticator;
        _this._lastLoginCheck = Date.now();
        _this._ably = new Realtime({
            authUrl: 'https://ably.api.24sevenoffice.com/auth',
            authHeaders: { authorization: 'IGNORED' },
            autoConnect: false
        });
        _this._ably.connection.on(AblyConnectionState.initialized, function () { });
        _this._ably.connection.on(AblyConnectionState.connecting, function () { });
        _this._ably.connection.on(AblyConnectionState.connected, function () { });
        _this._ably.connection.on(AblyConnectionState.disconnected, function () { });
        _this._ably.connection.on(AblyConnectionState.suspended, function () { });
        _this._ably.connection.on(AblyConnectionState.closing, function () { });
        _this._ably.connection.on(AblyConnectionState.closed, function () { });
        _this._ably.connection.on(AblyConnectionState.failed, function () { return _this.emit('connection-failed'); });
        return _this;
    }
    AuthChangeNotifier.prototype.listen = function (license) {
        var _this = this;
        this._ably.close();
        this._ably.connect();
        var identityId = license.split(';')[0];
        var channel = this._ably.channels.get("identity:" + identityId);
        channel.subscribe('authentication', function (event) {
            var type = event.data.type;
            if (['login', 'logout', 'change'].includes(type)) {
                _this.emit(type);
            }
        });
        this._addUserActivityListener();
    };
    /**
     * Whenever there is activity on the page (a user clicks somewhere),
     * we check if the user is still logged in.
     * This only triggers once every 15 minutes.
     * When we get rid of the old session cookie, this can probably be removed since the auth0 session lasts much longer.
     */
    AuthChangeNotifier.prototype._addUserActivityListener = function () {
        var _this = this;
        document.body.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var currentTime, identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentTime = Date.now();
                        if (!(currentTime - 1000 * 900 > this._lastLoginCheck)) return [3 /*break*/, 2];
                        this._lastLoginCheck = currentTime;
                        return [4 /*yield*/, this._authenticator.getCurrentlyLoggedInIdentityOrNull()];
                    case 1:
                        identity = _a.sent();
                        if (identity === null) {
                            this.emit('logout');
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    return AuthChangeNotifier;
}(EventEmitter));

var AuthManager = /** @class */ (function (_super) {
    __extends(AuthManager, _super);
    function AuthManager(authenticator, authorizer, config) {
        var _this = _super.call(this) || this;
        _this.identity = null;
        _this._authenticator = authenticator;
        _this._authorizer = authorizer;
        _this._authChangeNotifier = new AuthChangeNotifier(authenticator);
        _this._config = defaultsDeep({}, config, {
            tokens: []
        });
        _this._authorizer.on('access-success', function (access) { return _this._handleAuthorizationSuccess(access); });
        _this._authorizer.on('access-failure', function (access) { return _this._handleAuthorizationFailure(access); });
        _this._authChangeNotifier.on('login', function () { return _this._handleAuthChange(); });
        _this._authChangeNotifier.on('change', function () { return _this._handleAuthChange(); });
        _this._authChangeNotifier.on('logout', function () { return _this._handleAuthChange(); });
        _this._authChangeNotifier.on('connection-failed', function () { return _this.emit('authentication-notifications-unavailable'); });
        return _this;
    }
    AuthManager.prototype.on = function (event, fn, context) {
        return _super.prototype.on.call(this, event, fn, context);
    };
    AuthManager.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var identity, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.emit('authentication-attempt');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._authenticator.ensureLoggedIn()];
                    case 2:
                        identity = _a.sent();
                        this.identity = identity; // Set before emitting so it's available when consumer is reacting to the event
                        this.emit('authentication-success', { identity: identity });
                        this._authChangeNotifier.listen(identity.license);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.identity = null;
                        this.emit('authentication-failure', { err: err_1 });
                        return [2 /*return*/];
                    case 4:
                        this.emit('authorization-start');
                        return [4 /*yield*/, Promise.all(this._config.tokens.map(function (tokenConfig) { return _this.authorize(tokenConfig, _this.identity.license); }))];
                    case 5:
                        _a.sent();
                        this.emit('authorization-complete');
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthManager.prototype.logout = function () {
        this._authenticator.redirectToLogout();
    };
    AuthManager.prototype.authorize = function (tokenConfig, license) {
        this.emit('authorization-attempt', { tokenConfig: tokenConfig, license: license });
        return this._authorizer.authorize(tokenConfig, license);
    };
    AuthManager.prototype.authorizeOnce = function (tokenConfig, license) {
        this.emit('authorization-attempt', { tokenConfig: tokenConfig, license: license });
        return this._authorizer.authorizeOnce(tokenConfig, license);
    };
    AuthManager.prototype.getAuthorizer = function () {
        return this._authorizer;
    };
    AuthManager.prototype.getAuthenticator = function () {
        return this._authenticator;
    };
    AuthManager.prototype._handleLoggedOut = function () {
        var _this = this;
        this.emit('authentication-logout');
        var defaultHandler = function () { return _this._authenticator.redirectToLogin(); };
        if (this._config.logoutHandler) {
            this._config.logoutHandler(defaultHandler);
        }
        else {
            defaultHandler();
        }
    };
    AuthManager.prototype._handleLicenseChanged = function (newIdentity) {
        var event = { newIdentity: newIdentity, prevIdentity: this.identity };
        this.emit('authentication-licensechange', event);
        var defaultHandler = function () { return window.location.reload(true); };
        if (this._config.licenseChangeHandler) {
            this._config.licenseChangeHandler(event, defaultHandler);
        }
        else {
            defaultHandler();
        }
    };
    AuthManager.prototype._handleAuthorizationSuccess = function (access) {
        this.emit('authorization-success', { access: access });
    };
    AuthManager.prototype._handleAuthorizationFailure = function (access) {
        this.emit('authorization-failure', { access: access });
    };
    AuthManager.prototype._handleAuthChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._authenticator.getCurrentlyLoggedInIdentityOrNull()];
                    case 1:
                        identity = _a.sent();
                        if (identity === null) {
                            return [2 /*return*/, this._handleLoggedOut()];
                        }
                        if (identity.license !== (this.identity !== null ? this.identity.license : '')) {
                            return [2 /*return*/, this._handleLicenseChanged(identity)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthManager;
}(EventEmitter));

var createAuthManager = function (authManagerConfig, authenticatorConfig) {
    var authenticator = new Authenticator(authenticatorConfig);
    var authorizer = new Authorizer(authenticatorConfig);
    var authManager = new AuthManager(authenticator, authorizer, authManagerConfig);
    return authManager;
};

export { createAuthManager, Authenticator, Authorizer, AuthChangeNotifier, AuthManager };
