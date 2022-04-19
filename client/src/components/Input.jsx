import React from "react";
import { useField } from "formik";
import styles from "./Input.module.css";

const Input = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={styles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
