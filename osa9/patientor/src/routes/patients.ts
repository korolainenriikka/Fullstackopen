import express from 'express';
import patientService from '../services/patientService';
import { toPatient, toEntry }from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.send(404).end();
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toPatient({...req.body, entries: []});
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    if (toEntry(req.body)){
      const newEntry = toEntry(req.body);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const addedEntry = patientService.addEntry(newEntry, req.params.id);
      res.json(addedEntry);
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;