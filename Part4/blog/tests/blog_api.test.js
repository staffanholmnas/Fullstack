const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: "Ada Lovelace",
        url: "www.ada-html-lovelace.com",
        likes: 35
    },
    {
        title: 'Babel is a funny name',
        author: "Bjarne Stroustrup",
        url: "www.bjarnebabelstrupstrup.com",
        likes: 6
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are a correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the id is named id, not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})
