const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      let stateClone = { ...state }
      stateClone = action.content
      return stateClone
    default:
      return state
  }
}

export const filterAnecdotes = content => {
  return {
    type: 'FILTER',
    content,
  }
}

export default filterReducer
