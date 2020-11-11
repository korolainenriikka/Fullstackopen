import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Entry } from '../types';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Segment>
      <b>{entry.date}</b>
      <Icon size='big' name='hospital outline'/><br/>
      <em>{entry.description}</em>
    </Segment>
  )
};

export default HospitalEntry;