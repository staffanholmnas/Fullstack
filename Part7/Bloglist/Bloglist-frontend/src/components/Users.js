import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import UserBlogs from './UserBlogs'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { Table } from 'react-bootstrap'

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
            <Table striped>
              <tbody>
                <tr><td></td>
                  <td><b>Blogs created</b></td>
                </tr>
                {users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td >
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td >
                        {user.blogs.length}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default Users
