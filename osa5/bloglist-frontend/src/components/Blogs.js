import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, addLike, deleteBlog }) => (
  <div>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        addLike={addLike}
        deleteBlog={deleteBlog}
      />
    )}
  </div>
)

export default Blogs
