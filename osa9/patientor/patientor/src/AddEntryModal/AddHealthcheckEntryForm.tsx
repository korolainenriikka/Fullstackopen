import React from "react";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { EntryType, HealthCheckEntry } from '../types';
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField"
import { useStateValue } from "../state";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry,"id">;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  visible: boolean
}

export const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit, visible }) => {
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
        healthCheckRating: 0
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
            label="Healthcheck rating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
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

export default AddHealthCheckEntryForm;
