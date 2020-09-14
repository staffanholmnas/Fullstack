import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const score = good - bad

  const avg = () => {
    if (all === 0) {
      return 0
    } else return score / all
  }
  
  const percentage = () => {
    if (all === 0) {
      return 0
    } else return good / all * 100
  }

  return (
    <>
      <h1>give feedback</h1>
      <>
        <Button
          handleClick={increaseGood}
          text="Good"
        />
        <Button
          handleClick={increaseNeutral}
          text="Neutral"
        />
        <Button
          handleClick={increaseBad}
          text="Bad"
        />
      </>
      <h1>statistics</h1>
      <Display show={"good " + good} />
      <Display show={"neutral " + neutral} />
      <Display show={"bad " + bad} />
      <Display show={"all " + all} />
      <Display show={"average " + avg()} />
      <Display show={"positive " + percentage() + " %"} />
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ show }) => <div>{show}</div>

ReactDOM.render(<App />,
  document.getElementById('root')
)