import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const parts =[{name:'Fundamentals of React',
   exercises: 10},
  {name:'Using props to pass data',
  exercises: 7},
  {name:'State of a component',
   exercises: 14}]

  return (
    <>
      <Header course={course} />
      <Content part1={parts[0].name} exercises1={parts[0].exercises} />
      <Content part2={parts[1].name} exercises2={parts[1].exercises} />
      <Content part3={parts[2].name} exercises3={parts[2].exercises} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </>
  )
}

const Header = (props) => {
  return (
    <>
        <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {props.total}
      </p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
