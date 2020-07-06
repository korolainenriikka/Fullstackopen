import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideDetails = { display: detailsVisible ? 'none' : '' }
  const showDetails = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} {blog.author}<button
          onClick={() => setDetailsVisible(true)}>view</button>
      </div>

      <div style={showDetails} className='details'>
        <p>
          {blog.title} <button
            onClick={() => setDetailsVisible(false)}>hide</button><br/>
          {blog.url}<br/>
          likes {blog.likes} <button
            onClick={() => {addLike({ blog: blog })
            }}>like</button><br/>
          {blog.author}<br/>
          <button onClick={() => deleteBlog({ blog: blog })}>remove</button>
        </p>
      </div>
    </div>
  )
}

export default Blog
