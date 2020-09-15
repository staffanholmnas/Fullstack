import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const statistics = <Statistics good={good} bad={bad} neutral={neutral} />

  let combinedFeedback = good + bad + neutral

  if (combinedFeedback === 0) {

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
        <h3>No feedback given</h3>
      </>
    )
  }
  else return (
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
        <>{statistics}</>
      </>
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral
  return (
    <>
      <h1>statistics</h1>
      <Display show={"good " + good} />
      <Display show={"neutral " + neutral} />
      <Display show={"bad " + bad} />
      <Display show={"all " + all} />
      <Display show={"average " + (good - bad) / all} />
      <Display show={"positive " + good / all * 100 + " %"} />
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
