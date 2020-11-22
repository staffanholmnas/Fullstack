const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'NULLIFY_USER':
      return initialState
    default:
      return state
  }
}

export const userSet = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const userNull = () => {
  return {
    type: 'NULLIFY_USER'
  }
}

export default userReducer
