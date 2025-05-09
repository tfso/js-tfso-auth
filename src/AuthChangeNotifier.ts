import { Realtime, ConnectionState } from 'ably'
import EventEmitter from 'eventemitter3'
import {Authenticator} from './Authenticator'

const AblyConnectionState: {[key: string]: ConnectionState} = {
    initialized: "initialized", // Not yet started to connect
    connecting: "connecting", // Connecting
    connected: "connected", // Connected
    disconnected: "disconnected", // Temporary disconnect. Will retry
    suspended: "suspended", // No connection for 2 min. Will still retry every 30 sec
    closing: "closing", // Starting to close, initiated by us
    closed: "closed", // Manually closed by us
    failed: "failed", // Permanent failure. No reconnects
}

type Events =
    'connection-failed' |
    'login' |
    'logout' |
    'change'

const environment: Record<string, any> = window && window['__env__'] && typeof window['__env__'] == 'object' ? window['__env__'] : {}

export class AuthChangeNotifier extends EventEmitter<Events>{
    private _ably: Realtime
    private _lastLoginCheck: number
    private _authenticator: Authenticator
    private _enabled = true

    constructor(authenticator: Authenticator){
        super()

        this._authenticator = authenticator
        this._lastLoginCheck = Date.now()

        const authUrl = `https://${environment['ably.api'] ?? 'ably.api.24sevenoffice.com'}/auth`

        this._ably = new Realtime({
            authUrl,
            authHeaders: {authorization: 'IGNORED'},
            autoConnect: false
        })

        this._ably.connection.on(AblyConnectionState.initialized, () => {})
        this._ably.connection.on(AblyConnectionState.connecting, () => {})
        this._ably.connection.on(AblyConnectionState.connected, () => {})
        this._ably.connection.on(AblyConnectionState.disconnected, () => {})
        this._ably.connection.on(AblyConnectionState.suspended, () => {})
        this._ably.connection.on(AblyConnectionState.closing, () => {})
        this._ably.connection.on(AblyConnectionState.closed, () => {})
        this._ably.connection.on(AblyConnectionState.failed, () => this.emit('connection-failed'))
    }

    enable() { 
        this._enabled = true
    }

    disable() {
        this._enabled = false
    }

    listen(license: string){
        this._ably.close()
        this._ably.connect()

        const identityId = license.split(';')[0]
        const channel = this._ably.channels.get(`identity:${identityId}`)

        channel.subscribe('authentication', event => {
            const type = event.data.type
            const license = event.data.license

            if(!this._enabled)
                return

            switch (type) {
                case 'login': 
                case 'logout':
                    this.emit(type)
                    break

                case 'change': 
                    this.emit(type, license)
                    break;
            }
        })

        this._addUserActivityListener()
    }

    /**
     * Whenever there is activity on the page (a user clicks somewhere),
     * we check if the user is still logged in.
     * This only triggers once every 15 minutes.
     * When we get rid of the old session cookie, this can probably be removed since the auth0 session lasts much longer.
     */
    _addUserActivityListener(){
        document.body.addEventListener('click', async () => {
            const currentTime = Date.now()
            if(currentTime - 1000 * 900 > this._lastLoginCheck){
                this._lastLoginCheck = currentTime

                const identity = await this._authenticator.getCurrentlyLoggedInIdentityOrNull()
                if(!identity){
                    if(!this._enabled)
                        return

                    this.emit('logout')
                }
            }
        })
    }
}