import React from 'react';
import Part from './Part';
import { CoursePart } from '../index'

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <>
      {props.courseParts.map((part) => 
      <Part key={props.courseParts.indexOf(part)} part={part} />
      )}
    </>
  );
};

export default Content;