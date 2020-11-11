import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_TO_SHOW";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_TO_SHOW":
      return {
        ...state,
        patientToShow: action.payload
      }
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: action.payload
      }
    case "ADD_ENTRY":
      if (state.patientToShow){
        return {
          ...state,
          patientToShow: {
            ...state.patientToShow,
            entries: state.patientToShow.entries.concat(action.payload)
          }
        }
      }
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  }
}

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  }
}

export const setPatientToShow = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT_TO_SHOW',
    payload: patient
  }
}

export const setDiagnoseList = (diagnoseList: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSE_LIST',
    payload: diagnoseList
  }
}

export const addEntry = (newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry
  }
}