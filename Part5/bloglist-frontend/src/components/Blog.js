import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [viewAll, setViewAll] = useState(false)

  const hideViewAll = { display: viewAll ? 'none' : '' }
  const showViewAll = { display: viewAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    const blogObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    updateBlog(id, blogObj)
  }

  return (
    <div style={blogStyle}>
      <div style={hideViewAll}>
        {blog.title} - {blog.author} <button onClick={() => setViewAll(true)}>view</button>
      </div>
      <div style={showViewAll}>
        {blog.title} - {blog.author} <button onClick={() => setViewAll(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => {handleClick()}}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
