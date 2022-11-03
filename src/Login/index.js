import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
    isLogin: false,
  }

  loginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})

    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({errorMsg, isLogin: true})
  }

  verifyCredentials = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    if (pin === '') {
      this.setState({errorMsg: 'Invalid PIN'})
    } else if (userId === 142420 && pin !== 231225) {
      this.setState({errorMsg: "User ID And Pin does'nt match"})
    }

    const userDetails = {
      user_id: userId,
      pin,
    }

    const loginUrl = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)

    const token = await response.json()

    if (response.ok === true) {
      this.loginSuccess(token.jwt_token)
    } else {
      this.loginFailure(token.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, errorMsg, isLogin} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <div className="login-card-container">
          <div className="bank-wallet-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt=" website login"
              className="bank-image"
            />
          </div>
          <div className="credentials-container">
            <h1 className="greeting-text">Welcome Back!</h1>
            <form onSubmit={this.verifyCredentials}>
              <div className="input-container">
                <label className="label-text" htmlFor="userid">
                  User Id
                </label>
                <input
                  placeholder="Enter  User ID"
                  className="user-input"
                  id="userid"
                  value={userId}
                  type="text"
                  onChange={this.onChangeUserId}
                />
              </div>

              <div className="input-container">
                <label className="label-text" htmlFor="pin">
                  PIN
                </label>
                <input
                  placeholder="Enter PIN"
                  className="user-input"
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {isLogin && <p className="error-text">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
