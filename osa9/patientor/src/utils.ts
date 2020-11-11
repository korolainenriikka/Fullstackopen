/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, EntryType, Discharge, NewEntry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseToString = (paramName: string, param: any): string => {
  if (!param || !isString(param)){
    throw new Error(`Incorrect or missing ${paramName}: ${String(param)}`);
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)){
    throw new Error(`Incorrect or missing date: ${String(date)}`);
  }

  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender ||!isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${String(gender)}`);
  }

  return gender;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType: any): EntryType => {
  if (isEntryType(entryType)) {
    return entryType;
  } else {
    throw new Error(`All entries should be of type health check, hospital or occupational: ${String(entryType)}`);
  }
};

const parseEntryTypes = (entries: Array<any>): Array<Entry> => {
  return entries.map(e => {
    if (isEntryType(e.type)){
      return e as Entry;
    } else {
      throw new Error(`All entries should be of type health check, hospital or occupational: ${String(e.type)}`);
    }
  });
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating == undefined ||!isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing healthcheck rating: ${String(healthCheckRating)}`);
  }

  return healthCheckRating;
};

const parseDischarge = (discharge: any): Discharge => {
  return {
    date: parseDate(discharge.date),
    criteria: parseToString('criteria', discharge.criteria)
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toPatient = (object: any): NewPatient => {
  return {
    name: parseToString('name', object.name),
    ssn: parseToString('ssn', object.ssn),
    occupation: parseToString('occupation', object.occupation),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries: parseEntryTypes(object.entries),
  };
};

export const generateId = (): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 36; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toEntry = (object: any): NewEntry | undefined => {
  const base = {
    description: parseToString('description', object.description),
    date: parseDate(object.date),
    specialist: parseToString('specialist', object.specialist),
    type: parseEntryType(object.type)
  };

  const entryType = parseEntryType(object.type);

  switch (entryType){
    case "HealthCheck":
      return {
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        ...base
      };
    case "Hospital":
      return {
        discharge: parseDischarge(object.discharge),
        ...base
      };
    case "OccupationalHealthcare":
      return {
        employerName: parseToString('employerName', object.employerName),
        ...base
      };
    default:
      return undefined;
  }
};
