const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likeSum, blog) => {
    return likeSum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return null
  } 
  return blogs.reduce((prevFav, blog) => {
    return (prevFav.likes > blog.likes) ? prevFav : blog
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return null
  } 
  const authorsWithSumOfBlogs = blogs.reduce((authorArray, blog) => {
    const authorEntry = authorArray.find( item => item.author === blog.author )
    if (authorEntry) {
      authorEntry.blogCount += 1
      return authorArray
    } else {
      const newAuthor = {
        author: blog.author,
        blogCount: 1
      }
      return authorArray.concat(newAuthor)
    }
  }, [])

  const authorWMost = authorsWithSumOfBlogs.reduce((prevMost, blog) => {
    return (prevMost.blogCount > blog.blogCount) ? prevMost : blog
  }).author

  return {
    author: authorWMost,
    blogs: authorsWithSumOfBlogs.find(blog => blog.author === authorWMost).blogCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return null
  } 
  const authorsWithSumOfLikes = blogs.reduce((authorArray, blog) => {
    const authorEntry = authorArray.find( item => item.author === blog.author )
    if (authorEntry) {
      authorEntry.likeCount += blog.likes
      return authorArray
    } else {
      const newAuthor = {
        author: blog.author,
        likeCount: blog.likes
      }
      return authorArray.concat(newAuthor)
    }
  }, [])

  const authorWMost = authorsWithSumOfLikes.reduce((prevMost, blog) => {
    return (prevMost.likeCount > blog.likeCount) ? prevMost : blog
  })

  return {
    author: authorWMost.author,
    likes: authorWMost.likeCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}