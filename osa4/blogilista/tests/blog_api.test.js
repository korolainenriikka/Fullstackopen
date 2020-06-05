const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  console.log('heimoiii')
  await app
})

test('right number of blogs in the test database', async () => {
  console.log('testataan testiä.')
  await api
    .get('api/blogs')
    .expect(200)
}) 

afterAll(() => {
  console.log('suljetaan tietokantayhteys.')
  mongoose.connection.close()
})

console.log('testien lopussa!')

//ongelma: käy test suitet läpi ennen kuin yhdistää mongoon
