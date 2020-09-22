import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({ course }) => <><h1>{course.name}</h1></>

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(line =>
        <Part key={line.id} name={line.name} exercises={line.exercises} id={line.id} />
      )}
    </>
  )
}

const Total = ({ course }) => {
  let sum = course.parts.reduce((total, currentValue) => {
    return total + currentValue.exercises;
}, 0)

  return (
    <div style ={{fontWeight: "bold"}}>
      <p>
        total of {sum} exercises
      </p>
    </div>
  )
}

const Part = (props) => <><p>{props.name} {props.exercises}</p></>

ReactDOM.render(<App />, document.getElementById('root'))
