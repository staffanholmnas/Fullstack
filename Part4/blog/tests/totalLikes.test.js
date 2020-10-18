const listHelper = require('../utils/list_helper')

const listWithManyBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const emptyListOfBlogs = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const blogsWithEqualLikes = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b66a676234d1666',
        title: 'Super duper blog',
        author: 'Pelle-olle Z. Belafonte',
        url: 'http://www.superduperblog233331.html',
        likes: 5,
        __v: 0
    }
]

describe('total likes', () => {

    test('of empty list is 0', () => {
        const result = listHelper.totalLikes(emptyListOfBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list with many blogs', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {

    test('is the one with the most likes', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })

    test('is the only blog on the list', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('is 0 when the blog list is empty', () => {
        const result = listHelper.favoriteBlog(emptyListOfBlogs)
        expect(result).toBe(0)
    })

    test('is either if there is two with the most likes', () => {
        const result = listHelper.favoriteBlog(blogsWithEqualLikes)
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })
})

describe('Author with the most blogs', () => {
    test('from a list of many blogs', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('from a list of one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test('from an empty list returns 0', () => {
        const result = listHelper.mostBlogs(emptyListOfBlogs)
        expect(result).toBe(0)
    })

    test('is either if there is two with the most blogs', () => {
        const result = listHelper.mostBlogs(blogsWithEqualLikes)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })
})
