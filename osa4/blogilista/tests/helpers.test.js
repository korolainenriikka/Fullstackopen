const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog

const coolBloggy = {
  title: "this is a cool blog post",
  author: "the cool dude making cool blog posts",
  url: "www.coolblog.cool",
  likes: 100
}

const sadLonelyBloggy = {
  title: "this is a sad lonely blog post",
  author: "the noncool dude making noncool blog posts",
  url: "www.sadsad.com",
  likes: 1
}

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    expect(dummy(blogs)).toBe(1)
  })
})


describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    expect(totalLikes(blogs)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [coolBloggy]
    expect(totalLikes(blogs)).toBe(100)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [coolBloggy, sadLonelyBloggy]
    expect(totalLikes(blogs)).toBe(101)
  })
})

describe('favoriteBlog', () => {
  test('of empty list returns null', () => {
    const blogs = []
    expect(favoriteBlog(blogs)).toBe(null)
  })

  test('when list has one blog returns the blog', () => {
    const blogs = [coolBloggy]
    expect(favoriteBlog(blogs)).toBe(coolBloggy)
  })

  test('of a list with multiple blogs is the one with most likes', () => {
    const blogs = [coolBloggy, sadLonelyBloggy]
    expect(favoriteBlog(blogs)).toBe(coolBloggy)
  })
})

/*
describe('dummy', () => {
  
})*/