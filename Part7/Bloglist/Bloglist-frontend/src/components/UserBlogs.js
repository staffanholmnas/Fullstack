import React from 'react'
import { useParams } from "react-router-dom"

const UserBlogs = ({ users }) => {

  const id = useParams().id
  const user = users.find(user => user.id === id)
  if (!user) return null
  
  return (
    <div>
      <br></br>
      <h2>{user.name}</h2>
      <br></br>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}> {blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserBlogs
