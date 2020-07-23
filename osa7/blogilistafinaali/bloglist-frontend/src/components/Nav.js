import React from 'react'
import {
  Switch, Route, Link,
  useRouteMatch
} from "react-router-dom"
import Home from './Home'
import Users from './Users'
import Blog from './Blog'
import User from './User'
import '../App.css'
import { Button, Navigation } from '../Styles'

const Nav = ({blogs, user, handleLogout, users}) => {
  const matchBlog = useRouteMatch('/blogs/:id')
  const blogById = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  const matchUser = useRouteMatch('/users/:id')
  const userById = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null
  
  return (
    <div>
      <Navigation className='nav'>
        <Link to="/">blogs</Link>
        <Link to="/users"> users</Link> {user.name} logged in 
        <Button onClick={handleLogout}>logout</Button>
      </Navigation>

      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blogById}/>
        </Route>
        <Route path='/users/:id'>
          <User user={userById}/>
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/">
          <Home blogs={blogs}/>
        </Route>
      </Switch>
    </div>
  )
}

export default Nav