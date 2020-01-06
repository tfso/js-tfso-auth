import EventEmitter from 'eventemitter3';
import { Authenticator } from './Authenticator';
declare type Events = 'connection-failed' | 'login' | 'logout' | 'change';
export declare class AuthChangeNotifier extends EventEmitter<Events> {
    private _ably;
    private _lastLoginCheck;
    private _authenticator;
    constructor(authenticator: Authenticator);
    listen(license: string): void;
    /**
     * Whenever there is activity on the page (a user clicks somewhere),
     * we check if the user is still logged in.
     * This only triggers once every 15 minutes.
     * When we get rid of the old session cookie, this can probably be removed since the auth0 session lasts much longer.
     */
    _addUserActivityListener(): void;
}
export {};
