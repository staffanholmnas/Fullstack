import React from 'react'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

const Blog = ({ handleLike, handleRemove, owner }) => {

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)

  if (!blog) return null

  const isOwner = owner === blog.user.username

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div>{isOwner && <button onClick={() => handleRemove(blog.id)}>remove</button>}</div>
      <p></p>
      <h4>Comments</h4>
      <ul>
        {blog.comments.map(blog => <li key={blog}> {blog}</li>)}
      </ul>
    </div>
  )
}

export default Blog
