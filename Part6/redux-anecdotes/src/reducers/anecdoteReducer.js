const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange }
      changedAnecdote.votes++
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content 
  }
}

export const giveVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer
