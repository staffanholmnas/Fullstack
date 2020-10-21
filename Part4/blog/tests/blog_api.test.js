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

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Something bloggy blog',
        author: "I can code too",
        url: "www.weneedmorecoders.com",
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})

    expect(blogs).toHaveLength(initialBlogs.length + 1)

    const title = blogs.map(b => b.title)
    expect(title).toContain('Something bloggy blog')
})

test('if likes property is missing, default to 0', async () => {
    const newBlog = {
        title: 'This blog cannot be liked',
        author: "Steve Jobs",
        url: "www.stevejobscult.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})

    expect(blogs[initialBlogs.length].likes).toBe(0)
})

test('cannot create blog without title or url', async () => {
    const newBlog = {
        author: "Bill Gates"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogs = await Blog.find({})
    
    expect(blogs).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
