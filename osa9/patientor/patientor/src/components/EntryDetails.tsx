import React from 'react';
import { Entry } from '../types';
import HealthCheckListing from './HealthCheckListing';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareListing from './OccupationalHealthcareListing';

const EntryDetails : React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckListing entry={entry} />
    case 'Hospital':
      return <HospitalEntry entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareListing entry={entry} />
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;