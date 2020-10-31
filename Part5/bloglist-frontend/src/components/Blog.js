import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideViewAll}>
        {blog.title} - {blog.author} <button onClick={() => setViewAll(true)}>view</button>
      </div>
      <div style={showViewAll}>
        {blog.title} - {blog.author} <button onClick={() => setViewAll(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => console.log("This button does nothing yet!")}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
