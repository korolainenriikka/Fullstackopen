import React, { useEffect } from 'react'
import Blogs from './Blogs'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { 
  setOkmessage,
  resetOkmessage,
} from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import {
  setUser
} from '../reducers/loggedUserReducer'
import { Heading } from '../Styles'

const Home = ({blogs}) => {
  const dispatch = useDispatch()

  const okmessage = useSelector(state => state.notification.okmessage)  
  const errormessage = useSelector(state => state.notification.errormessage)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const blogForm = () => (
    <Togglable buttonLabel='new note'>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const addBlog = async (newBlog) => {
    const returnedBlog = await blogService.create(newBlog)
    dispatch(createBlog(returnedBlog))

    dispatch(setOkmessage(
      `a new blog ${newBlog.title} by ${newBlog.author} added`
    ))
    setTimeout(() => {
      dispatch(resetOkmessage())
    }, 5000)
  }
  
  return (
    <div>
      <Heading>blog app</Heading>
      <Notification message={errormessage} className={'error'}/>
      <Notification message={okmessage} className={'ok'}/>
      {blogForm()}
      <Blogs blogs={blogs}/>
    </div>
  )
}
export default Home