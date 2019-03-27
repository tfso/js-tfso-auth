import EventEmitter from 'eventemitter3';
declare type Events = 'connection-failed' | 'login' | 'logout' | 'change';
export declare class AuthChangeNotifier extends EventEmitter<Events> {
    private _ably;
    constructor();
    listen(license: string): void;
}
export {};
