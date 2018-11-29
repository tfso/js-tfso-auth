import * as types from './types'
import * as auth0 from 'auth0-js'
import promisify from './promisify'

const promisifiyWebAuth = (webAuth: auth0.WebAuth): types.WebAuthPromisified => {
    return <any>{
        parseHash: promisify(webAuth.parseHash.bind(webAuth)),
        checkSession: promisify(webAuth.checkSession.bind(webAuth))
    }
}

export default (options: auth0.AuthOptions) => {
    return promisifiyWebAuth(new auth0.WebAuth(options))
}