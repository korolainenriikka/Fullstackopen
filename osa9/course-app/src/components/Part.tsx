import React from 'react';
import { CoursePart } from '../index';

interface CoursePartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<CoursePartProps> = (props) => {
  switch (props.part.name) {
    case "Fundamentals":
      return (
        <p>{props.part.name} {props.part.exerciseCount}<br/>
        {props.part.description}</p>
      )
    case "Using props to pass data":
      return (
        <p>{props.part.name} {props.part.exerciseCount}<br/>
        gourp projects: {props.part.groupProjectCount}</p>
      )
    case "Deeper type usage":
      return (
        <p>{props.part.name} {props.part.exerciseCount}<br/>
        {props.part.description}<br/>
        {props.part.exerciseSubmissionLink}</p>
      )
    case "Self-added exxtrafun part":
        return (
          <p>{props.part.name} {props.part.exerciseCount}<br/>
          {props.part.description}</p>
        )
    default:
      return(
        <>{assertNever(props.part)}</>
      )
  }
};

export default Part;