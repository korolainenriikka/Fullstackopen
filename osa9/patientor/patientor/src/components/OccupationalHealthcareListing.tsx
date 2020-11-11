import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareListing: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <b>{entry.date}</b>
      <Icon size='big' name='stethoscope'/>
      <b>{entry.employerName}</b><br/>
      <em>{entry.description}</em>
    </Segment>
  )
};

export default OccupationalHealthcareListing;