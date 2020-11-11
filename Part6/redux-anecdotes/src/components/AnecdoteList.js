import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { giveVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const hide = () => dispatch(hideNotification())
  const vote = (id, content) => {
    dispatch(giveVote(id))
    dispatch(showNotification(`you voted '${content}'`))
    setTimeout(hide, 5000)
  }
  
  const sortedAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const getMatches = () => {

    let copyOfAnecdotes = [...anecdotes]
    let copyOfFilter = filter
    let filteredAnecdotes = copyOfAnecdotes.filter(a => a.content.toUpperCase()
      .includes(copyOfFilter.toUpperCase()))

    return filteredAnecdotes
  }


  return (
    <div>
      {sortedAnecdotes(getMatches()).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default AnecdoteList
