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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}