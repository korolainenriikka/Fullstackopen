import React from 'react';

const Course = (props) => (
  <div>
    <Header name={props.course.name}/>
    <Content parts={props.course.parts}/>
  </div>
)

const Header = ({ name }) =>(
  <>
    <h1>{name}</h1>
  </>
)

const Content = (props) =>(
  <div>
    {props.parts.map((part) => (
      <Part key={part.id} part={part}/>)
    )}
    <strong>
      total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </strong>
  </div>
)

const Part = (props) =>(
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

export default Course