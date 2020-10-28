import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: error => {
      props.setErrorMessage(error.message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('libraryapp-user-token', token)
    }
  }, [result.data, props])

  const submit = (event) => {
    event.preventDefault()
    
    login({variables: {username, password}})
  }

  if (!props.show) {
    return null
  }

  return (
    <form onSubmit={submit}>
      <div>name
        <input
          value = {username}
          onChange = {({ target }) => setUsername(target.value)}
        />
      </div>
      <div>password
        <input
          value = {password}
          onChange = {({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login