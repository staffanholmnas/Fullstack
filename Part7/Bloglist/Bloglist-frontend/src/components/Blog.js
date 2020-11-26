import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import commentService from '../services/comments'
import { initializeBlogs } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

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

    if (comment !== '') {

      const newComment = {
        comments: comment
      }

      try {
        await commentService.create(newComment, id)
      }
      catch (error) {
        console.log(error.response.data.error)
      }
    }
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <br></br>
      <div><h4>{blog.url}</h4></div>
      <br></br>
      <div>{blog.likes} likes <Button variant="info" onClick={() => handleLike(blog.id)}>Like</Button></div>
      <div>Added by {blog.user.name} &nbsp;
      {isOwner && <Button variant="danger" onClick={() => handleRemove(blog.id)}>Remove</Button>}</div>
      <br></br>
      <h4>Comments</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="Write a comment..."
            type="text"
            name="username"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <p></p>
          <Button variant="primary" type="submit">Add comment</Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.map((blog, index) => <li key={index}> {blog}</li>)}
      </ul>
    </div>
  )
}

export default Blog
