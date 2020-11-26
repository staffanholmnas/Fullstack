import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Users from './components/Users'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import loginService from './services/login'
import blogService from './services/blogs'
import storage from './utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, giveLike, removeBlog } from './reducers/blogReducer'
import { userSet, userNull } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Table, Button, Form, Nav, Navbar } from 'react-bootstrap'


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
      notifyWith('Wrong username or password', 'error')
    }
  }

  const createBlog = async (blog) => {

      blogFormRef.current.toggleVisibility()
      try {
      const newBlog = await blogService.create(blog)
      dispatch(addBlog(newBlog))
      } catch (error) {
       return notifyWith(error.response.data.error, 'error')
      }
      
      notifyWith(`A new blog '${blog.title}' by ${blog.author} added!`)
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
      <div className="container">
        <h2>Log-in to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <div>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                name='username'
                id='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                id='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <br></br>
            <Button variant="primary" type="submit" id='login'>Log in</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const padding = {
    padding: 5,
    color: 'white'
  }


  return (
    <Router>
      <div className="container">
        <Navbar collapseOnSelect expand="md" bg="info" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
            </Nav>
            <div style={padding}>
              {user.name} is logged in <Button variant="secondary" onClick={handleLogout}>Log out</Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Notification />
        <br></br>
        <h2>BLOG APP</h2>
        <br></br>
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
            <p></p>
            <Table striped>
              <tbody>
                {blogs.sort(byLikes).map(blog =>
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`} key={blog.id}>
                        <div>{blog.title}</div>
                      </Link>
                    </td>
                    <td>
                      {blog.user.name}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
