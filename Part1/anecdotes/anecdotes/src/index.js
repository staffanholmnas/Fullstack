import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const stateArray = new Array(7 + 1).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(stateArray)

  let random = Math.floor(Math.random() * 6)
  
  const randomizeState = () => {
    while (random === selected[0]) {
      random = Math.floor(Math.random() * 6)
    }
    const copyOfStateArray = [...selected]
    copyOfStateArray[0] = random
    setSelected(copyOfStateArray)
  }

  console.log(random, selected)

  const storeVote = () => {
    const copyOfStateArray = [...selected]
    copyOfStateArray[selected[0] + 1]++
    setSelected(copyOfStateArray)
    console.log(copyOfStateArray[selected[0] + 1])
  }

  return (
    <div>
      {props.anecdotes[selected[0]]}
      <p>has {selected[selected[0] + 1]} votes</p>
      <Button handleClick={storeVote} text="vote" />
      <Button handleClick={randomizeState} text="next anecdote" />
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
