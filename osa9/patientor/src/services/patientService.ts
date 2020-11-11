/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patient_data';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';
import { generateId } from '../utils';

const getPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const newId = generateId();
    const addedPatient = {
      id: newId,
      ...newPatient
    } as Patient;

    patientData.push(addedPatient);
    return addedPatient;
};

const addEntry = (newEntry: NewEntry | undefined, id : string): Entry => {
  const newId = generateId();
  const addedEntry = {
    id: newId,
    ...newEntry
  } as Entry;

  patientData.map(p => {
    if (p.id === id) {
      p.entries.push(addedEntry);
      return p;
    } else {
      return p;
    }
  });

  return addedEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient, 
  addEntry,
  findById
};