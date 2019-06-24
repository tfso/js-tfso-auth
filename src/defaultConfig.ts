export default {
    optionsAuth0: {
        clientID: 'INGoYuDZDgaxT8JOL64M7vnJcxEGxCi0',
        domain: 'login.24SevenOffice.com',
        configurationBaseUrl: 'tfso.eu.auth0.com'
    },
    identityApiUrl: 'https://identity.api.24sevenoffice.com',
    authenticateJwtUrl: '/login/data/AuthenticateJwt.aspx',
    loginUrl: () => `/login/?returnUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
    logoutUrl: () => `/login/auth0/logout.html`,
    callbackUrl: `${window.location.origin}/login/auth0/callback.html?isSilent=true`
}