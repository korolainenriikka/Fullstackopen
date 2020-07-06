import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  okmessage,
  errormessage
}) => (
  <div>
    <h1>log in to application</h1>
    <Notification message={errormessage} className={'error'}/>
    <Notification message={okmessage} className={'ok'}/>
    <form onSubmit={handleSubmit}>
      <div>
        <p>
          username <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </p>
        <p>
          password <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </p>
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  okmessage: PropTypes.string,
  errormessage: PropTypes.string
}

export default LoginForm