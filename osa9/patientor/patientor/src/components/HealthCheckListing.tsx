import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';

enum healthCheckRatingColor {
  green = 'green',
  yellow = 'yellow',
  orange = 'orange',
  red = 'red',
};

const HealthCheckListing: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthRatingColors = ['green', 'yellow', 'orange', 'red'];

  return (
    <Segment>
      <b>{entry.date}</b>
      <Icon size='big' name='user md'/><br/>
      <em>{entry.description}</em><br/>
      <Icon 
        name='heart'
        color={healthRatingColors[entry.healthCheckRating] as healthCheckRatingColor} />
    </Segment>
  )
};

export default HealthCheckListing;