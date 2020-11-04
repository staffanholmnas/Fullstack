import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm calls the createBlog event handler and with the right content ', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'testing form title field' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'author input is correct' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'testing of url input works' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("testing form title field")
  expect(createBlog.mock.calls[0][0].author).toBe("author input is correct")
  expect(createBlog.mock.calls[0][0].url).toBe("testing of url input works")
  
})
