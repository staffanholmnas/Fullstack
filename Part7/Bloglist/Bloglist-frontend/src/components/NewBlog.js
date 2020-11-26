import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleNewBlog}>
      <Form.Group>
        <div>
        <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        <Form.Label>Title:</Form.Label>
          <Form.Control
            id='title'
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <p></p>
        <Button variant="primary" type="submit" id="create">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog
