import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { EntryType, HospitalEntry } from '../types';
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField"
import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry,"id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  visible: boolean
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, visible }) => {
  const [{ diagnoses }] = useStateValue()

  if (!visible) {
    return <></>
  }

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck as never,
        description: "",
        date: "",
        specialist: "",
        discharge: {
          criteria: "",
          date: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!values.specialist) {
          errors.name = requiredError;
        }
        if (!values.discharge.date) {
          errors.name = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.name = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!dirty || !isValid}
          >
            Add
          </Button>
        </Form>
      );
    }}
    </Formik>
  );
};

export default AddHospitalEntryForm;