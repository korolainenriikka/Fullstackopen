
const blogReducer = (state=[], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'UPDATE_BLOG':
      return state.map((blog) => {
        return blog.id === action.id ? blog : action.data
      })
    case 'REMOVE_BLOG':
      return state.filter((blog) => 
        blog.id !== action.id
      )
    default:
    return state
  }
}

export const createBlog = ({ title, author, url, id }) => {
  return {
    type: 'NEW_BLOG',
    data: {
      title: title,
      author: author,
      url: url,
      id: id
    }
  }
}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    id
  }
}

export default blogReducer