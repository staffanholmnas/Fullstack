import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
   const getUsers = async () => {
    await userService.getAll().then(u =>
      setUsers(u)
    )}
    getUsers()
  }, [])

  const getUserName = () => {
    return users.map(user => {
       return (
      <div key = {user.id}>
       {user.name}
      </div>
      )})
  }

  const getBlogCount = () => {
    return users.map(user => {
       return (
      <div key = {user.id}>
       {user.blogs.length} 
      </div>
      )})
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td></td><td><b>Blogs created</b></td></tr>
          <tr>
          <td>{getUserName()}</td>
          <td>{getBlogCount()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users
