const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testing our blog app requires patience!',
    author: 'Ya master of blogs',
    url: 'www.bloggyblog.com',
    likes: 1
  },
  {
    title: 'This is another blog',
    author: 'Another smartish person',
    url: 'www.thisissmart.com',
    likes: 1
  },
]

const newBlog = 
  {
    title: 'The test put this in the db!',
    author: 'The blogtesting blog master',
    url: 'www.testingisfun.com',
    likes: 1
  }

const newUser =  {
  username: "testityybä",
  name:"tester boi",
  password: "topscrtr"
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  newUser,
  usersInDb,
  blogsInDb
}