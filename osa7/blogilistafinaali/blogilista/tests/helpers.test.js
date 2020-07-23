const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const coolBloggy = {
  title: "this is a cool blog post",
  author: "the cool dude making cool blog posts",
  url: "www.coolblog.cool",
  likes: 100
}

const anotherByCool = {
  title: "more cool stuff!",
  author: "the cool dude making cool blog posts",
  url: "www.coolblog.cool",
  likes: 1000
}

const sadLonelyBloggy = {
  title: "this is a sad lonely blog post",
  author: "the noncool dude making noncool blog posts",
  url: "www.sadsad.com",
  likes: 1
}

const theNonCoolGotSumFameAfterAll = {
  title: "the noncool yet pretty damn banger of a post",
  author: "the noncool dude making noncool blog posts",
  url: "www.sadsad.com",
  likes: 1099
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

describe('mostBlogs', () => {
  test('of empty array returns null', () => {
    const blogs = []
    expect(mostBlogs(blogs)).toBe(null)
  })
  
  test('of an array with many blogs returns right author', () => {
    const blogs = [coolBloggy, anotherByCool, sadLonelyBloggy]
    expect(mostBlogs(blogs).author).toBe('the cool dude making cool blog posts')
  })
  const mostBlogs = require('../utils/list_helper').mostBlogs
  test('sum of blogs written calculated right', () => {
    const blogs = [coolBloggy, anotherByCool, sadLonelyBloggy]
    expect(mostBlogs(blogs).blogs).toBe(2)
  })

  test('equal amount of blogs returns any author in array', () => {
    const blogs = [coolBloggy, sadLonelyBloggy]
    expect(mostBlogs(blogs).author === coolBloggy.author
      || mostBlogs(blogs).author === sadLonelyBloggy.author).toBe(true)
  })
})

describe('mostLikes', () => {
  test('of empty array returns null', () => {
    const blogs = []
    expect(mostLikes(blogs)).toBe(null)
  })
  
  test('of an array with many blogs returns right author', () => {
    const blogs = [coolBloggy, sadLonelyBloggy]
    expect(mostLikes(blogs).author).toBe('the cool dude making cool blog posts')
  })

  test('sum of likes calculated right', () => {
    console.log('summatesti soss')
    const blogs = [coolBloggy, anotherByCool, sadLonelyBloggy]
    expect(mostLikes(blogs).likes).toBe(1100)
  })

  test('equal amount of likes returns any author in array', () => {
    const blogs = [coolBloggy, anotherByCool, sadLonelyBloggy, theNonCoolGotSumFameAfterAll]
    expect(mostLikes(blogs).author === coolBloggy.author
      || mostLikes(blogs).author === sadLonelyBloggy.author).toBe(true)
  })
})

/*
describe('dummy', () => {
  
})*/