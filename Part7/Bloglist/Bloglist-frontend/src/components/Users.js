import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import UserBlogs from './UserBlogs'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      await userService.getAll().then(user =>
        setUsers(user)
      )
    }
    getUsers()
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/users/:id">
          <UserBlogs users={users} />
        </Route>
        <Route path="/">
          <div>
            <h2>Users</h2>
            <table>
              <tbody>
                <tr><td></td>
                  <td><b>Blogs created</b></td>
                </tr>
                <tr>
                  <td>{users.map(user => {
                    return (
                      <div key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </div>
                    )
                  })}</td>
                  <td>{users.map(user => {
                    return (
                      <div key={user.id}>
                        {user.blogs.length}
                      </div>
                    )
                  })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default Users
