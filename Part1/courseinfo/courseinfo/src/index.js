import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <>
      <Part parts={course.parts[0]} />
      <Part parts={course.parts[1]} />
      <Part parts={course.parts[2]} />
    </>
  )
}

const Total = ({ course }) => {
  return (
    <>
      <p>
        Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
      </p>
    </>
  )
}

const Part = ({ parts }) => {
  return (
    <>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
