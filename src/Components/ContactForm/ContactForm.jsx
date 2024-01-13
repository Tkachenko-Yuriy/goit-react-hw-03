import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Must be in 123-45-67 format")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

export default function ContactFotm({ onChange }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    onChange(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.wrapper}>
          <label htmlFor={nameFieldId}>Username</label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage name="name" as="span" />
        </div>

        <div className={css.wrapper}>
          <label htmlFor={numberFieldId}>Phone number</label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage name="number" as="span" />
        </div>
        <Button text="Submit" type="submit" />
      </Form>
    </Formik>
  );
}
