import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
    case 'LIKE': {
      const id = action.data.id
      const blogToChange = state.find(a => a.id === id)
      const changedblog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map(blog =>
        blog.id !== id ? blog : changedblog
      )
    }
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG': {
      return [...state, action.data]
    }
    case 'REMOVE': {
      const id = action.data
      return state.filter(blogs => blogs.id !== id)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const giveLike = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: newBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id,
    })
  }
}

export default blogReducer
