import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import {Authenticator, Authorizer} from 'js-tfso-auth'

const config = {
    loginUrl: `https://beta.24sevenoffice.com/login/?returnUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
    callbackUrl: `${window.location.origin}/dummyCallback` // localhost.24sevenoffice.com:3000/dummyCallback is approved in auth0 management
}

const logger = {
    debug: (...args) => console.log(...args),
    info: (...args) => console.log(...args),
    error: (...args) => console.log(...args)
}

const authenticator = new Authenticator(config)
const authorizer = new Authorizer(config, logger)

class App extends React.Component{
    state = {
        errors: [],
        tokenUpdates: [],
        identity: null
    }
    async componentDidMount(){
        const identity = await authenticator.ensureLoggedIn()
        this.setState({identity})

        authorizer.on('token-update', e => {
            this.setState(state => {
                return {
                    ...state,
                    tokenUpdates: [...state.tokenUpdates, e]
                }
            })
        })

        authorizer.on('error', e => {
            this.setState(state => {
                return {
                    ...state,
                    errors: [...state.errors, e]
                }
            })
        })

        authorizer.authorize('2947b4ae-0d40-447b-886f-dcd3aa11648b;693081080913543;1198', 'https://privacy.24sevenoffice.com', 'privacyadmin')
        authorizer.authorize('2947b4ae-0d40-447b-886f-dcd3aa11648b;693081080913543;1198', 'http://bank.24sevenoffice.com', 'bank bankagreement')
        authorizer.authorize('2947b4ae-0d40-447b-886f-dcd3aa11648b;693081080913543;1198', 'https://skriveleif.24sevenoffice.com', 'feilscope')
    }
    render(){
        return (
            <div style={{display: 'flex'}}>
                <div style={{flex: 1, height: '100%'}}>
                    Identity
                    <JsonArea value={this.state.identity} />
                </div>
                <div style={{flex: 1}}>
                    Successes
                    <JsonArea value={this.state.tokenUpdates} />
                </div>
                <div style={{flex: 1}}>
                    Errors
                    <JsonArea value={this.state.errors} />
                </div>
            </div>
        )
    }
}

function JsonArea(props){
    return <textarea style={{width: '100%', minHeight: 10000}} value={JSON.stringify(props.value, null, 2)} />
}

ReactDOM.render(<App />, document.getElementById('root'))