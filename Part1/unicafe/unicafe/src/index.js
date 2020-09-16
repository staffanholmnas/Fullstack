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
      <table>
        <tbody>
          <tr>
            <td><Statistic text="good " /></td><td><Statistic value={good} /></td>
          </tr>
          <tr>
            <td><Statistic text="neutral " /></td><td><Statistic value={neutral} /></td>
          </tr>
          <tr>
            <td><Statistic text="bad " /></td><td><Statistic value={bad} /></td>
          </tr>
          <tr>
            <td><Statistic text="all " /></td><td><Statistic value={all} /></td>
          </tr>
          <tr>
            <td><Statistic text="average " /></td><td><Statistic value={(good - bad) / all} /></td>
          </tr>
          <tr>
            <td><Statistic text="positive " /></td><td><Statistic value={good / all * 100 + " %"} /></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Statistic = ({ text, value }) => (<Display text={text} value={value} />)

const Button = ({ handleClick, text }) => (<button onClick={handleClick}> {text} </button>)

const Display = (props) => <div> {props.text} {props.value} </div>

ReactDOM.render(<App />,
  document.getElementById('root')
)
