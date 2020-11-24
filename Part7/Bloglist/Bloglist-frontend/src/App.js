import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Users from './components/Users'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import loginService from './services/login'
import storage from './utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, giveLike, removeBlog } from './reducers/blogReducer'
import { userSet, userNull } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(userSet(user))
  }, [dispatch])

  const notifyWith = (message, type = 'success') => {
    const msg = { message, type }
    dispatch(showNotification(msg, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(userSet(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(giveLike(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(blogToRemove.id))
      notifyWith(`Deleted blog ${blogToRemove.title} by ${blogToRemove.author}`)
    }
  }

  const handleLogout = () => {
    dispatch(userNull())
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>Log-in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>Log in</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>
          {user.name} is logged in <button onClick={handleLogout}>Logout</button>
        </p>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog handleLike={handleLike}
              handleRemove={handleRemove}
              owner={user.username} />
          </Route>
          <Route path="/">
            <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            {blogs.sort(byLikes).map(blog =>
              <Link to={`/blogs/${blog.id}`} key={blog.id}>
                <div style={blogStyle}>{blog.title}</div>
              </Link>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
