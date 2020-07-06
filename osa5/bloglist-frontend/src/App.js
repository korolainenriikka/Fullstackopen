import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [okmessage, setOkmessage] = useState(null)
  const [errormessage, setErrormessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(sortBlogsByLikes({ blogsToSort: blogs }))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogForm = () => (
    <Togglable buttonLabel='new note'>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

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

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={errormessage} className={'error'}/>
      <Notification message={okmessage} className={'ok'}/>
      <p>{user.name} logged in <button
        onClick={handleLogout}>logout</button></p>
      {blogForm()}
      <Blogs blogs={blogs} addLike={addLike} deleteBlog={deleteBlog}/>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setOkmessage(
        `${user.name} logged in to application`
      )
      setTimeout(() => {
        setOkmessage(null)
      }, 5000)
    } catch (exception) {
      setUsername(null)
      setPassword(null)
      setErrormessage(
        'wrong username or password :('
      )
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
    setOkmessage(
      `${user.name} logged out`
    )
    setTimeout(() => {
      setOkmessage(null)
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))

    setOkmessage(
      `a new blog ${newBlog.title} by ${newBlog.author} added`
    )
    setTimeout(() => {
      setOkmessage(null)
    }, 5000)
  }

  const addLike = async ({ blog }) => {
    blog.likes += 1
    const returnedBlog = await blogService.modify(blog)
    setBlogs(sortBlogsByLikes({ blogsToSort:
      blogs.map((b) => b===blog ? returnedBlog : b) }))
  }

  const sortBlogsByLikes = ({ blogsToSort }) => {
    return blogsToSort.sort((first, second) => second.likes - first.likes)
  }

  const deleteBlog = async ({ blog }) => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)){
      await blogService.deleteObject(blog)
      setBlogs(sortBlogsByLikes({ blogsToSort:
        blogs.filter((b) => b !== blog) }))
    }
  }

  return (
    <>
      { user === null ?
        loginForm() : blogView()
      }
    </>
  )
}

export default App
