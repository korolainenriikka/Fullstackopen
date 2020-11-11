import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { EntryType, OccupationalHealthcareEntry } from '../types';
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField"
import { useStateValue } from "../state";

export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry,"id">;

interface Props {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  visible: boolean
}

export const AddOccupationalEntryForm: React.FC<Props> = ({ onSubmit, visible }) => {
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
        employerName: ""
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
        if (!values.employerName) {
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
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
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

export default AddOccupationalEntryForm;
