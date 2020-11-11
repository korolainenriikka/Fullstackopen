import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Radio, Segment } from 'semantic-ui-react';
import { addEntry, useStateValue } from '../state';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthcheckEntryForm';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';
import AddOccupationalEntryForm, { OccupationalEntryFormValues } from './AddOccupationalEntryForm';
import { Entry } from '../types';
import { apiBaseUrl } from '../constants';

interface Props {
  modalOpen: boolean;
  closeModal: () => void;
  setError: (error: string) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, closeModal, setError, error }: Props) => {
  const [state, dispatch] = useStateValue();
  const [formVisible, setFormVisible] = useState('healthCheck')

  const submitNewHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
    submitEntry(values, 'HealthCheck')
  }

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    submitEntry(values, 'Hospital')
  }

  const submitNewOccupationalEntry = async (values: OccupationalEntryFormValues) => {
    submitEntry(values, 'OccupationalHealthcare')
  }

  const submitEntry = async (values: HealthCheckEntryFormValues | HospitalEntryFormValues | OccupationalEntryFormValues, type: string) => {
    try {
      if (state.patientToShow) {
        const entryToSave = {
          ...values,
          type: type
        }

        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${state.patientToShow.id}/entries`,
          entryToSave
        );
        dispatch(addEntry(newEntry));
        closeModal()
      }
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  }

  return (
  <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <Radio 
        name='selectForm'
        label='Health check'
        checked={formVisible === 'healthCheck'}
        onChange={() => setFormVisible('healthCheck')}
      /><br/>
      <Radio 
        name='selectForm'
        label='Hospital'
        checked={formVisible === 'hospital'}
        onChange={() => setFormVisible('hospital')}
      /><br/>
      <Radio 
        name='selectForm'
        label='Occupational'
        checked={formVisible === 'occupational'}
        onChange={() => setFormVisible('occupational')}
      />
      <AddHealthCheckEntryForm visible={formVisible === 'healthCheck'} onSubmit={submitNewHealthCheckEntry}/>
      <AddHospitalEntryForm visible={formVisible === 'hospital'} onSubmit={submitNewHospitalEntry}/>
      <AddOccupationalEntryForm visible={formVisible === 'occupational'} onSubmit={submitNewOccupationalEntry}/>
      <Button type="button" onClick={closeModal} color="red">
        Cancel
      </Button>
    </Modal.Content>
  </Modal>
)};

export default AddPatientModal;