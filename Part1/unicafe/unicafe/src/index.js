import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

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
      <Display good={"good " + good} />
      <Display neutral={"neutral " + neutral} />
      <Display bad={"bad " + bad} />
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ good, neutral, bad }) => <div>  {good}  {neutral}  {bad}</div>

ReactDOM.render(<App />,
  document.getElementById('root')
)