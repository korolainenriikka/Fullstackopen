import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Nav from './components/Nav'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { 
  setOkmessage,
  setErrormessage,
  resetOkmessage,
  resetErrormessage,
} from './reducers/notificationReducer'
import {
  setUser,
  nullUser
} from './reducers/loggedUserReducer'
import { initBlogs } from './reducers/blogReducer'
import { setUsers } from './reducers/userReducer'
import { BrowserRouter as Router} from 'react-router-dom'
import { Page } from './Styles'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)
  const okmessage = useSelector(state => state.notification.okmessage)  
  const errormessage = useSelector(state => state.notification.errormessage)  
  const users = useSelector(state => state.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initBlogs(sortBlogsByLikes({ blogsToSort: blogs })))
    })
    userService.getAll().then(users => {
      dispatch(setUsers(users))
    })
  }, [dispatch])

  const sortBlogsByLikes = ({ blogsToSort }) => {
    return blogsToSort.sort((first, second) => second.likes - first.likes)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(nullUser())
    window.localStorage.clear()
    dispatch(setOkmessage(`${user.name} logged out`))
    setTimeout(() => {
      dispatch(resetOkmessage(null))
    }, 5000)
  }

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        okmessage={okmessage}
        errormessage={errormessage}
      />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(setOkmessage(
        `${user.name} logged in to application`
      ))
      setTimeout(() => {
        dispatch(resetOkmessage())
      }, 5000)
    } catch (exception) {
      setUsername(null)
      setPassword(null)
      dispatch(setErrormessage('wrong username or password :('))
      setTimeout(() => {
        dispatch(resetErrormessage())
      }, 5000)
    }
  }

  return (
    <Page>
      { user === null ?
        loginForm() 
        : 
        <Router>
          <Nav 
            blogs={blogs}
            handleLogout={handleLogout}
            user={user}
            users={users}
          />
        </Router>
      }
    </Page>
  )
}

export default App
