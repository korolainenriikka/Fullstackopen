import React, { useState } from 'react'
import '../App.css'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { Button, Heading, ListItem } from '../Styles'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const addLike = async () => {
    blog.likes += 1
    const returnedBlog = await blogService.modify(blog)
    dispatch(updateBlog(returnedBlog))
  }

  const addComment = async () => {
    blog.comments.concat(comment)
    const returnedBlog = await blogService.addComment(blog.id, comment)
    setComment('')
    dispatch(updateBlog(returnedBlog))
  }

  return (
    <div>
      <Heading>{blog.title}</Heading>
      <div>
        {blog.url}<br/>
        {blog.likes} likes <Button onClick={addLike}>like</Button><br/>
        added by {blog.author}
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input onChange={({ target })=>setComment(target.value)} />
          <Button type='submit'>add comment</Button>
        </form>
        <ul>
          {blog.comments.map(c =>{
            return (
              <ListItem key={c.id}>{c}</ListItem>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
