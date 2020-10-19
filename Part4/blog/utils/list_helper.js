const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return (
        blogs
            .map(blog => blog.likes)
            .reduce((total, current) => total + current, 0)
    )
}

const favoriteBlog = (blogs) => {

    let likes = blogs.map(blog => blog.likes)
    let obj = blogs.find(blog => blog.likes === Math.max(...likes))

    if (typeof obj === 'undefined') return 0

    delete obj.__v
    delete obj._id
    delete obj.url

    return obj
}

const mostBlogs = (blogs) => {

    let authors = blogs.map(blog => blog.author)

    const mostFrequent = (array) => {
        if (array.length === 0)
            return null
        let modeObj = {}
        let maxEl = array[0], maxCount = 1
        for (let i = 0; i < array.length; i++) {
            let el = array[i]
            if (modeObj[el] == null)
                modeObj[el] = 1
            else
                modeObj[el]++
            if (modeObj[el] > maxCount) {
                maxEl = el
                maxCount = modeObj[el]
            }
        }
        return [maxEl, maxCount];
    }

    const mostBlogsArray = mostFrequent(authors)

    return mostBlogsArray === null ? 0 : { author: mostBlogsArray[0], blogs: mostBlogsArray[1] }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) return 0

    const getMostLikesByAuthor = (arrayOfBlogs) => {
        return (
            arrayOfBlogs
                .reduce(({ total, most }, { likes, author }) => {
                    total[author] = likes = (total[author] || 0) + likes
                    if (likes > most.likes) most = { author, likes }
                    return { total, most }
                }, 
                { total: {}, most: { likes: 0 } })
                .most
        )
    }

    return getMostLikesByAuthor(blogs)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
