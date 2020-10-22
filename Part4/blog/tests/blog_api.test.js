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

describe('Test that blogs are returned correctly:', () => {
    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('There are a correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('The id is named id, not _id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('Test that blogs can be added correctly:', () => {
    test('A valid blog can be added ', async () => {
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

    test('If likes property is missing, default to 0', async () => {
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

    test('Cannot create blog without title or url', async () => {
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
})

describe('Deletion of a note...', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogs = await Blog.find({})
        const blogToDelete = blogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfterDelete = await Blog.find({})

        expect(blogsAfterDelete).toHaveLength(
            initialBlogs.length - 1
        )

        const blog = blogsAfterDelete.map(b => b.title)

        expect(blog).not.toContain(blogToDelete.title)
    })
})

describe('Updating number of likes in a blog...', () => {
    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .put(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
