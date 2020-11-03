import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, not url and likes', () => {
  const user = {
    username: "Steve Green",
    password: "SG"
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "Martin Fowler",
    url: "www.partingflower.com",
    likes: 4,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.blog')
  
  expect(div).toHaveTextContent(blog.title)

  expect(div).toHaveTextContent(blog.author)

  expect(div).not.toHaveTextContent(blog.url)

  expect(div).not.toHaveTextContent(blog.likes)

})