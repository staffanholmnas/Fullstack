import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import commentService from '../services/comments'
import { initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ handleLike, handleRemove, owner }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, blog])

  if (!blog) return null

  const isOwner = owner === blog.user.username

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const newComment = {
      comments: comment
    }

    try {
      await commentService.create(newComment, id)
    }
    catch (exception) {
      console.log(exception)
    }
  
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div>{isOwner && <button onClick={() => handleRemove(blog.id)}>remove</button>}</div>
      <p></p>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((blog, index) => <li key={index}> {blog}</li>)}
      </ul>
    </div>
  )
}

export default Blog
