import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        const message = {
          message: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
          error: false
        }
        setNewMessage(message)
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
      }).catch(error => {
        console.log(error.response.data.error)
        const message = {
          message: `${error.response.data.error}`,
          error: true
        }
        setNewMessage(message)
        setTimeout(() => {
          setNewMessage(null)
        }, 4000)
      })
  }

  const updateBlog = (id, blogObj) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)

    blogService
      .update(id, blogObj)
      .then(returnedBlog => {
        returnedBlog.user = blogToUpdate.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log('Something went wrong! Blog cannot be found in database.', error)
      })
  }

  const deleteBlog = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author} ?`)) {
      let index = blogs.map(blog => blog.id).indexOf(id)
      blogService
        .deleteObject(id)
        .catch(() => {
          const messageObject = {
            message: `${title} has already been deleted from server`,
            error: true
          }
          setNewMessage(messageObject)
          setTimeout(() => {
            setNewMessage(null)
          }, 4000)
        })
      const copyOfBlogs = [...blogs]
      copyOfBlogs.splice(index, 1)
      setBlogs(copyOfBlogs)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = {
        message: 'wrong username or password',
        error: true
      }
      setNewMessage(message)
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const sortedBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={newMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={newMessage} />

      <p>{user.name} logged-in

        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogAppUser')
          setUser(null)
        }}>logout</button></p>

      <div>

        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Toggleable>

      </div>
      {sortedBlogs(blogs).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App
