import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

  const div = component.container.querySelector('.hidden')

  expect(div).toHaveTextContent(blog.title)

  expect(div).toHaveTextContent(blog.author)

  expect(div).not.toHaveTextContent(blog.url)

  expect(div).not.toHaveTextContent(blog.likes)

})


test('clicking the view button shows element containing url and likes', () => {
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

  let div = component.container.querySelector('.hidden')
  let div2 = component.container.querySelector('.visible')
  
  expect(div).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)

  const button = component.getByText('view')
  fireEvent.click(button)
  
  expect(div).toHaveStyle('display: none')
  expect(div2).not.toHaveStyle('display: none')
  expect(div2).toHaveTextContent(blog.url)
  expect(div2).toHaveTextContent(blog.likes)

})
