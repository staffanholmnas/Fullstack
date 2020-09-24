import React from 'react'

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

export default Course
