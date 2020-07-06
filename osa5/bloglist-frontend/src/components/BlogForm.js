import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
        <div>
          <p>
            title: <input
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </p>
          <p>
            author: <input
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </p>
          <p>
            url: <input
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </p>
          <button id='create-button' type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm