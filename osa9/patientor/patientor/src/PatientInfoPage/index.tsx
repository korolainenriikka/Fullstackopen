import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { setPatientToShow, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Button, Icon } from 'semantic-ui-react';
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from '../AddEntryModal';

enum iconType {
  male = 'mars', female = 'venus', other ='genderless'
}

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  const [iconName, setIconName] = useState('');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatientToShow = async () => {
      if (!state.patientToShow || state.patientToShow.id !== id) {
        try {
          const { data: patientToShowFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatientToShow(patientToShowFromApi));
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchPatientToShow();

    const updateIconType = () => {
      switch(state.patientToShow?.gender){
        case('male'):
          setIconName('mars');
          break;
        case('female'):
          setIconName('venus');
          break;
        case('other'):
          setIconName('genderless');
          break;
        default:
          setIconName('');
      }
    }
    updateIconType();
  },[dispatch, id, state.patientToShow]);

  if (!state.patientToShow){
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="App">
      <h1>
        {state.patientToShow.name}
        <Icon name={iconName as iconType}/>
      </h1>
      <p>ssn: {state.patientToShow.ssn}</p>
      <p>occupation: {state.patientToShow.occupation}</p>
      <h3>entries</h3>
      {state.patientToShow.entries.map(e => {
        return <EntryDetails 
          key={state.patientToShow?.entries.findIndex(entry => entry.id === e.id)}
          entry={e}/>
        })}
      <AddEntryModal 
        modalOpen={modalOpen}
        setError={setError}
        error={error}
        closeModal={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfoPage;