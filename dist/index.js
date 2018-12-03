import { WebAuth } from 'auth0-js';
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
    loginUrl: function () { return "/login/?returnUrl=" + encodeURIComponent(window.location.origin + window.location.pathname); },
    callbackUrl: window.location.origin + "/login/auth0/callback.html?isSilent=true"
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
    Authenticator.prototype._getIdentityOrNullIfCookieRequired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err, body, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch(this._config.identityApiUrl, {
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
    Authenticator.prototype._getIdentityApiTokenOrNulIfAuthRequired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opts, error_1, authRequired;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = {
                            audience: 'https://app.24sevenoffice.com',
                            scope: 'NO_SCOPE',
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
                        authRequired = (error_1.error === 'login_required' ||
                            error_1.error === 'consent_required' ||
                            error_1.error === 'interaction_required');
                        if (authRequired) {
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

var Authorizer = /** @class */ (function (_super) {
    __extends(Authorizer, _super);
    function Authorizer(config, logger) {
        var _this = _super.call(this) || this;
        _this._checkSessionCount = 0;
        _this._accesses = {};
        _this._accessesToRefresh = {};
        _this._logger = logger;
        _this._config = defaultsDeep({}, config, defaultConfig);
        _this._webAuth = createWebAuth(_this._config.optionsAuth0);
        return _this;
    }
    Authorizer.prototype._getKey = function (license, audience) {
        return license + audience;
    };
    /**
     * @param {string} license
     * @param {string} audience
     * @param {string} scope Empty-space separated list of scopes
     *
     * This function returns after the first token has been retrieved (or failed).
     * It will also periodically refresh the token, so you need to listen for
     * 'token-update' and 'error' to be informed when the token changes.
     */
    Authorizer.prototype.authorize = function (license, audience, scope) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._refreshToken(license, audience, scope)];
                    case 1:
                        _a.sent();
                        this._keepTokenFresh(license, audience, scope);
                        return [2 /*return*/, this.getAccess(license, audience)];
                }
            });
        });
    };
    Authorizer.prototype.authorizeOnce = function (license, audience, scope) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._refreshToken(license, audience, scope)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getAccess(license, audience)];
                }
            });
        });
    };
    Authorizer.prototype.unauthorize = function (license, audience) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = this._getKey(license, audience);
                delete this._accesses[key];
                delete this._accessesToRefresh[key];
                return [2 /*return*/];
            });
        });
    };
    Authorizer.prototype.getAccesses = function () {
        return Object.values(this._accesses);
    };
    Authorizer.prototype.hasAccess = function (license, audience) {
        return !!this.getAccess(license, audience);
    };
    Authorizer.prototype.getAccess = function (license, audience) {
        return this._accesses[this._getKey(license, audience)];
    };
    Authorizer.prototype._keepTokenFresh = function (license, audience, scope) {
        var _this = this;
        var key = this._getKey(license, audience);
        if (this._accessesToRefresh[key]) {
            return;
        }
        else {
            this._accessesToRefresh[key] = true;
        }
        var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
        var waitAndRefreshAgain = function () {
            if (!_this._accessesToRefresh[key]) {
                return;
            }
            delay(15 * 60 * 1000)
                .then(function () { return _this._refreshToken(license, audience, scope); })
                .then(waitAndRefreshAgain);
        };
        waitAndRefreshAgain();
    };
    Authorizer.prototype._refreshToken = function (license, audience, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._checkSession(license, audience, scope)];
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
        var token = _a.token, audience = _a.audience, scope = _a.scope, license = _a.license;
        var scopesAccepted = token.scope ? token.scope.split(' ') : [];
        var scopesRequested = scope.split(' ');
        var data = { token: token, error: null, audience: audience, scope: scope, license: license, scopesAccepted: scopesAccepted, scopesRequested: scopesRequested };
        this._accesses[this._getKey(license, audience)] = data;
        this._logger.debug('Token success', data);
        this.emit('token-update', data);
    };
    Authorizer.prototype._onTokenFailure = function (_a) {
        var error = _a.error, audience = _a.audience, scope = _a.scope, license = _a.license;
        var userInteractionRequired = (error.error === 'login_required' ||
            error.error === 'consent_required' ||
            error.error === 'interaction_required');
        var scopesRequested = scope.split(' ');
        var data = { token: null, error: error, audience: audience, scope: scope, license: license, userInteractionRequired: userInteractionRequired, scopesRequested: scopesRequested };
        this._accesses[this._getKey(license, audience)] = data;
        this._logger.error('Token failure', data);
        this.emit('error', data);
    };
    Authorizer.prototype._checkSession = function (license, audience, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, identityId, clientId, userId, opts, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = license.split(';'), identityId = _a[0], clientId = _a[1], userId = _a[2];
                        opts = {
                            audience: audience,
                            scope: scope,
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
                        return [2 /*return*/, { token: token, error: null, audience: audience, scope: scope, license: license }];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, { token: null, error: error_1, audience: audience, scope: scope, license: license }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Authorizer;
}(EventEmitter));

export { Authenticator, Authorizer };
