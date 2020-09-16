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
  const buttons = <Buttons increaseGood={increaseGood} increaseNeutral={increaseNeutral}
    increaseBad={increaseBad} />

  let combinedFeedback = good + bad + neutral

  if (combinedFeedback === 0) {
    return (
      <>
        <h1>give feedback</h1>
        <>{buttons}</>
        <h1>statistics</h1>
        <h3>No feedback given</h3>
      </>
    )
  }
  else return (
    <>
      <h1>give feedback</h1>
      <>{buttons}</>
      <h1>statistics</h1>
      <>{statistics}</>
    </>
  )
}

const Buttons = ({ increaseGood, increaseNeutral, increaseBad }) => {
  return (
    <>
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral
  return (
    <>

      <Statistic text="good " value={good} />
      <Statistic text="neutral " value={neutral} />
      <Statistic text="bad " value={bad} />
      <Statistic text="all " value={all} />
      <Statistic text="average " value={(good - bad) / all} />
      <Statistic text="positive " value={good / all * 100 + " %"} />

    </>
  )
}

const Statistic = ({ text, value }) => (<Display text={text} value={value} />)

const Button = ({ handleClick, text }) => (<button onClick={handleClick}> {text} </button>)

const Display = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {text}
          </td>
          <td>
            ----
          </td>
          <td>
            {value}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
