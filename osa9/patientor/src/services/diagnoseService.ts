import diagnoseData from '../../data/diagnose_data';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};