import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Course courses={courses} />
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        )
      }
      )}
    </>
  )
}

const Header = ({ course }) => <><h2>{course.name}</h2></>

const Content = ({ course }) =>
  <>
    {course.parts.map(line =>
      <Part key={line.id} name={line.name} exercises={line.exercises}
      />
    )}
  </>

const Total = ({ course }) => {
  let sum = course.parts.reduce((total, currentValue) => {
    return total + currentValue.exercises;
  }, 0)

  return (
    <div style={{ fontWeight: "bold" }}>
      <p>
        total of {sum} exercises
      </p>
    </div>
  )
}

const Part = (props) => <><p>{props.name} {props.exercises}</p></>

ReactDOM.render(<App />, document.getElementById('root'))
