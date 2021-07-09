import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import {createAuthManager} from '@tfso/js-auth'

const authenticatorConfig = {
    loginUrl: `https://beta.24sevenoffice.com/modules/auth/login/?returnUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
    callbackUrl: `${window.location.origin}/dummyCallback` // localhost.24sevenoffice.com:3000/dummyCallback is approved in auth0 management
}
const authManagerConfig = {
    tokens: [
        {
            key: '1',
            audience: 'https://privacy.24sevenoffice.com',
            scopes: ['privacyadmin']
        },
        {
            key: '2',
            audience: 'http://bank.24sevenoffice.com',
            scopes: ['bank', 'bankagreement']
        },
        {
            key: '3',
            audience: 'https://skriveleif.24sevenoffice.com',
            scopes: ['feilscope']
        }
    ]
}

const authManager = createAuthManager(authManagerConfig, authenticatorConfig)

class App extends React.Component{
    state = {
        isAuthenticating: false,
        isAuthenticated: false,
        isAuthorizing: false,
        isAuthorized: false,
        accessErrors: [],
        accesses: [],
        identity: null
    }
    async componentDidMount(){
        authManager.on('authentication-attempt', (event) => {
            console.log('authentication-attempt', event)
            this.setState({isAuthenticating: true, isAuthenticated: false})
        })
        authManager.on('authentication-success', (event) => {
            console.log('authentication-success', event)
            this.setState({isAuthenticating: false, isAuthenticated: true, identity: event.identity})
        })
        authManager.on('authentication-failure', (event) => {
            console.log('authentication-failure', event)
            this.setState({isAuthenticating: false, isAuthenticated: false, identity: null})
        })

        authManager.on('authentication-logout', (event) => {
            console.log('authentication-logout', event)
            this.setState({isAuthenticating: false, isAuthenticated: false, identity: null})
        })
        authManager.on('authentication-licensechange', (event) =>
            console.log('authentication-licensechange', event)
        )

        authManager.on('authentication-notifications-unavailable', (event) => {
            console.log('authentication-notifications-unavailable', event)
        })

        authManager.on('authorization-start', (event) => {
            console.log('authorization-start', event)
            this.setState({isAuthorizing: true, isAuthorized: false})
        })
        authManager.on('authorization-complete', (event) => {
            console.log('authorization-complete', event)
            this.setState({isAuthorizing: false, isAuthorized: true})
        })

        authManager.on('authorization-attempt', (event) => {
            console.log('authorization-attempt', event)
        })
        authManager.on('authorization-success', (event) => {
            console.log('authorization-success', event)
            this.setState(state => ({accesses: [...state.accesses, event.access]}))
        })
        authManager.on('authorization-failure', (event) => {
            console.log('authorization-failure', event)
            this.setState(state => ({accessErrors: [...state.accessErrors, event.access]}))
        })

        authManager.login()
    }
    render(){
        return (
            <>
                isAuthenticating: {this.state.isAuthenticating.toString()} <br />
                isAuthenticated: {this.state.isAuthenticated.toString()} <br />
                isAuthorizing: {this.state.isAuthorizing.toString()} <br />
                isAuthorized: {this.state.isAuthorized.toString()} <br />

                <div style={{display: 'flex'}}>
                    <div style={{flex: 1, height: '100%'}}>
                        Identity
                        <JsonArea value={this.state.identity} />
                    </div>
                    <div style={{flex: 1}}>
                        Successes
                        <JsonArea value={this.state.accesses} />
                    </div>
                    <div style={{flex: 1}}>
                        Errors
                        <JsonArea value={this.state.accessErrors} />
                    </div>
                </div>
            </>
        )
    }
}

function JsonArea(props){
    return <textarea style={{width: '100%', minHeight: 10000}} value={JSON.stringify(props.value, null, 2)} />
}

ReactDOM.render(<App />, document.getElementById('root'))