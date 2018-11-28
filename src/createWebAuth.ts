import {AuthOptions, CheckSessionOptions, ParseHashOptions, Auth0DecodedHash, Auth0Error, WebAuth} from 'auth0-js'
import promisify from './promisify'

export type Auth0Token = Auth0DecodedHash
export type Auth0Error = Auth0Error

export interface WebAuthPromisified{
    checkSession(options: CheckSessionOptions): Promise<Auth0DecodedHash>
    parseHash(options: ParseHashOptions): Promise<Auth0DecodedHash>
}

const promisifiyWebAuth = (webAuth:WebAuth):WebAuthPromisified => {
    return <any>{
        parseHash: promisify(webAuth.parseHash.bind(webAuth)),
        checkSession: promisify(webAuth.checkSession.bind(webAuth))
    }
}

export default (options: AuthOptions) => {
    return promisifiyWebAuth(new WebAuth(options))
}