import { WebAuth } from 'auth0-js';
import promisify from './promisify';
const promisifiyWebAuth = (webAuth) => {
    return {
        parseHash: promisify(webAuth.parseHash.bind(webAuth)),
        checkSession: promisify(webAuth.checkSession.bind(webAuth))
    };
};
export default (options) => {
    return promisifiyWebAuth(new WebAuth(options));
};
//# sourceMappingURL=createWebAuth.js.map