const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('blog testing', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await api.post('/api/users').send(helper.newUser)
  })
  
  test('right number of blogs in the test database', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length)
  }) 
  
  test('identifier column named id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
  
  test('a new blog can be added', async () => {
    const login = await api.post('/api/login').send(helper.newUser)
    const token = login.body.token

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    newBlogs = await helper.blogsInDb()
    expect(newBlogs.length).toBe(helper.initialBlogs.length + 1)
    expect(newBlogs[helper.initialBlogs.length].content)
      .toBe(helper.newBlog.content)
  })
  
  test('a blog without likes will be added with 0 likes', async () => {
    const login = await api.post('/api/login').send(helper.newUser)
    const token = login.body.token
    
    const blog = {
      title: "I need likes!",
      author: "Bob",
      url: "pleaselikeme.org"
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(blog)
      .expect(200)
  
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs[helper.initialBlogs.length].likes)
    .toBe(0)
  })
  
  test('a blog without title and url wont be added', async () => {
    const login = await api.post('/api/login').send(helper.newUser)
    const token = login.body.token

    const blog = {
      author: "the blog person",
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(blog)
      .expect(400)
  })
  
  test('a blog can be deleted', async () => {
    await api.post('/api/blogs').send(helper.newBlog)

    const login = await api.post('/api/login').send(helper.newUser)
    const token = login.body.token

    const thirdBlogWithUser = {
      title: 'This blog has a real writer!',
      author: 'Ya king of blogs',
      url: 'www.bloggyblog.com',
      likes: 1
    }

    await api.post('/api/blogs')
      .set('Authorization', 'bearer ' + token).send(thirdBlogWithUser)

    const blogs = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogs[2].id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)
  
    const blogsAfterDeleting = await helper.blogsInDb()
    expect(blogsAfterDeleting.length).toBe(blogs.length - 1)
  })
  
  test('likes in blog can be updated', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[1]
    const updated = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 10
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updated)
      .expect(200)
  
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs[1].likes).toBe(10)
  })
})

describe('user testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  //ehdot: on username ja password löytyy, ei saa olla liian pieni password, username ei saa olla sama
  test('a valid user can be added', async () => {
    const newUser = helper.newUser

    await api.post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(1)
  })

  test('a user with username already in db wont add', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = helper.newUser
    
    await api.post('/api/users').send(newUser)
    const userWithNameTaken = {
      username: 'testityybä',
      name: 'another',
      password: '123'
    }

    const result = await api
      .post('/api/users')
      .send(userWithNameTaken)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  })

  test('post request without username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithoutUsername = {
      name: 'bob',
      password: '123'
    }

    const error = await api.post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)


      expect(error.body.error).toBe('username and password required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('post request with a less than 3 character password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const tinyPassword = {
      username: 'bobby',
      name: 'bob',
      password: '12'
    }

    const error = await api.post('/api/users')
      .send(tinyPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(error.body.error).toBe('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
