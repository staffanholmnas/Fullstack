import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // Create an array with 7 elements filled with zeroes when starting app.
  const stateArray = new Array(7 + 1).join('0').split('').map(parseFloat)

  const [selected, setSelected] = useState(stateArray)

  const randomizeState = () => {
    let random = Math.floor(Math.random() * 6)
    // Make sure that we update to a different state everytime.
    while (random === selected[0]) {
      random = Math.floor(Math.random() * 6)
    }
    const copyOfStateArray = [...selected]  // Copy the array of the current state.
    copyOfStateArray[0] = random
    setSelected(copyOfStateArray) // Update the state.
  }

  // Debug the behavior
  // console.log(selected)

  const storeVote = () => {
    const copyOfStateArray = [...selected]  // Copy the state array.
    copyOfStateArray[selected[0] + 1]++ // Add 1 to the element that corresponds to the current state.
    setSelected(copyOfStateArray)
    // console.log(copyOfStateArray[selected[0] + 1])
  }

  const getMaxVotedAnecdote = () => {
    const copyOfStateArray = [...selected]
    copyOfStateArray.shift()  // Remove the first element of the copied array, i.e. the element that contains the states.
    let mostVotes = copyOfStateArray.indexOf(Math.max(...copyOfStateArray)) // Gets the index of the element with the highest value.
    return props.anecdotes[mostVotes]
  }

  return (
    <div style={{ fontSize: '120%' }}>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected[0]]}
      <div>has {selected[selected[0] + 1]} votes</div>
      <Button handleClick={storeVote} text="vote" />
      <Button handleClick={randomizeState} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      {getMaxVotedAnecdote()}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => (<button onClick={props.handleClick}> {props.text} </button>)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
