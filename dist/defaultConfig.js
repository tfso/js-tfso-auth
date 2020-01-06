export default {
    optionsAuth0: {
        clientID: 'INGoYuDZDgaxT8JOL64M7vnJcxEGxCi0',
        domain: 'login.24SevenOffice.com',
        configurationBaseUrl: 'tfso.eu.auth0.com'
    },
    identityApiUrl: 'https://identity.api.24sevenoffice.com',
    authenticateJwtUrl: '/login/data/AuthenticateJwt.aspx',
    loginUrl: () => `/modules/auth/login/?returnUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
    logoutUrl: () => `/modules/auth/logout`,
    callbackUrl: `${window.location.origin}/modules/auth/login-callback?isSilent=true`
};
//# sourceMappingURL=defaultConfig.js.map