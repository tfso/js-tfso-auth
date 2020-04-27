import * as Ably from 'ably';
import EventEmitter from 'eventemitter3';
const AblyConnectionState = {
    initialized: "initialized",
    connecting: "connecting",
    connected: "connected",
    disconnected: "disconnected",
    suspended: "suspended",
    closing: "closing",
    closed: "closed",
    failed: "failed",
};
export class AuthChangeNotifier extends EventEmitter {
    constructor(authenticator) {
        super();
        this._authenticator = authenticator;
        this._lastLoginCheck = Date.now();
        this._ably = new Ably.Realtime({
            authUrl: 'https://ably.api.24sevenoffice.com/auth',
            authHeaders: { authorization: 'IGNORED' },
            autoConnect: false
        });
        this._ably.connection.on(AblyConnectionState.initialized, () => { });
        this._ably.connection.on(AblyConnectionState.connecting, () => { });
        this._ably.connection.on(AblyConnectionState.connected, () => { });
        this._ably.connection.on(AblyConnectionState.disconnected, () => { });
        this._ably.connection.on(AblyConnectionState.suspended, () => { });
        this._ably.connection.on(AblyConnectionState.closing, () => { });
        this._ably.connection.on(AblyConnectionState.closed, () => { });
        this._ably.connection.on(AblyConnectionState.failed, () => this.emit('connection-failed'));
    }
    listen(license) {
        this._ably.close();
        this._ably.connect();
        const identityId = license.split(';')[0];
        const channel = this._ably.channels.get(`identity:${identityId}`);
        channel.subscribe('authentication', event => {
            const type = event.data.type;
            if (['login', 'logout', 'change'].includes(type)) {
                this.emit(type);
            }
        });
        this._addUserActivityListener();
    }
    /**
     * Whenever there is activity on the page (a user clicks somewhere),
     * we check if the user is still logged in.
     * This only triggers once every 15 minutes.
     * When we get rid of the old session cookie, this can probably be removed since the auth0 session lasts much longer.
     */
    _addUserActivityListener() {
        document.body.addEventListener('click', async () => {
            const currentTime = Date.now();
            if (currentTime - 1000 * 900 > this._lastLoginCheck) {
                this._lastLoginCheck = currentTime;
                const identity = await this._authenticator.getCurrentlyLoggedInIdentityOrNull();
                if (identity === null) {
                    this.emit('logout');
                }
            }
        });
    }
}
//# sourceMappingURL=AuthChangeNotifier.js.map