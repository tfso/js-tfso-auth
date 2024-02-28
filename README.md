# js-auth

## config

The config object looks like this:

````typescript
export interface AuthenticatorConfig{
    optionsAuth0: {
        clientID: string              // Default: 'INGoYuDZDgaxT8JOL64M7vnJcxEGxCi0',
        domain: string                // Default: 'login.24SevenOffice.com',
        configurationBaseUrl: string  // Default: 'tfso.eu.auth0.com'
    }
    identityApiUrl: string            // Default: 'https://identity.api.24sevenoffice.com',
    loginUrl: string | (() => string) // Default: () => `/login/?returnUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
    callbackUrl: string               // Default: `${window.location.origin}/login/auth0/callback.html?isSilent=true`
}
````

See src/defaultConfig.js for defaults. The defaults will work in prod.

Notes:

- callbackUrl must be on the same origin as the application. 
  This is because the callback page is opened inside an iframe, which will contain url parameters with authz data.
  The url parameters are only available on the same origin.
- loginUrl can be a string or a function. The reason to use a function is if you want to dynamically set the returnUrl.
  
About login:
- When logging in, the page is redirected to the prod login page.
  After login, this page redirects to the prod callback page. This page is setup to read url params, and setup a backwards compatible session cookie.
  However, the same callback page can also be used with the isSilent url param to skip all the extra work.
  This is used when doing silent authentication, which is what the authorizer in this package does.

## Publishing Development/Prerelease Package for testing
To publish a development or prerelease package, follow these steps:

1. Include #deploy_branch in your commit message.
2. Once the [workflow](https://github.com/tfso/js-tfso-auth/actions/workflows/prerelease.yml) is complete, navigate to [GitHub Packages for js-auth](https://github.com/tfso/js-tfso-auth/pkgs/npm/js-auth).
3. In the "_Recent Versions_" section, select the latest version.
4. Identify the version number associated with the latest release; this is the version you can use for testing the package.

Now you're ready to test the prerelease package with the specified version number.