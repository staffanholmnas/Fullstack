import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)

  let showRemove = { display: 'none' }
  if (user.name === blog.user.name) {
    showRemove = { display: '' }
  }

  const hideViewAll = { display: viewAll ? 'none' : '' }
  const showViewAll = { display: viewAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = () => {
    const blogObj = {
      title: blog.title,
      id: blog.id,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(blogObj.id, blogObj)
  }

  const handleRemoveClick = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideViewAll} className='hidden'>
        {blog.title} - {blog.author} <button id='view-button' onClick={() => setViewAll(true)}>view</button>
      </div>
      <div style={showViewAll} className='visible'>
        {blog.title} - {blog.author} <button id='hide-button' onClick={() => setViewAll(false)}>hide</button>
        <div>{blog.url}</div>
        <div id='likes'>likes {blog.likes} <button id='like-button' onClick={() => {handleLikeClick()}}>like</button></div>
        <div>{blog.user.name}</div>
        <div style = {showRemove}><button id='remove-button' style = {{ backgroundColor: 'lightblue' }} onClick={() => {handleRemoveClick()}}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog
