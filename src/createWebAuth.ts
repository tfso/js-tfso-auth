import * as types from './types'
import {WebAuth, AuthOptions} from 'auth0-js'
import promisify from './promisify'

const promisifiyWebAuth = (webAuth: WebAuth): types.WebAuthPromisified => {
    return <any>{
        parseHash: promisify(webAuth.parseHash.bind(webAuth)),
        checkSession: promisify(webAuth.checkSession.bind(webAuth))
    }
}

export default (options: AuthOptions) => {
    return promisifiyWebAuth(new WebAuth(options))
}