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

module.exports = {
    dummy, totalLikes, favoriteBlog
}
