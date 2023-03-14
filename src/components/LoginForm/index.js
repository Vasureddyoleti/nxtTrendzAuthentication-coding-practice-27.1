// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.setState({errorMsg: `* ${data.error_msg}`})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <img
          className="login-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt=" website login"
        />
        <form className="form-cont" onSubmit={this.submitForm}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <div className="label-cont">
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              onChange={this.onChangeUsername}
              value={username}
              type="text"
              placeholder="Username"
              id="username"
              className="input-el"
            />
          </div>
          <div className="label-cont">
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              onChange={this.onChangePassword}
              value={password}
              type="password"
              id="password"
              placeholder="Password"
              className="input-el"
            />
          </div>
          <p className="error-msg">{errorMsg}</p>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
