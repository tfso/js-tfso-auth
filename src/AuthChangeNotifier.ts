import * as Ably from 'ably'
import EventEmitter from 'eventemitter3'

const AblyConnectionState: {[key: string]: Ably.Types.ConnectionState} = {
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

export class AuthChangeNotifier extends EventEmitter<Events>{
    private _ably: Ably.Realtime

    constructor(){
        super()

        this._ably = new Ably.Realtime({
            authUrl: 'https://ably.api.24sevenoffice.com/auth',
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

    listen(license: string){
        this._ably.close()
        this._ably.connect()

        const identityId = license.split(';')[0]
        const channel = this._ably.channels.get(`identity:${identityId}`)

        channel.subscribe('authentication', event => {
            const type = event.data.type
            if(['login', 'logout', 'change'].includes(type)){
                this.emit(type)
            }
        })
    }
}