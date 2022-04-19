import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import Button from "./Button";
import Input from "./Input";
import styles from "./LoginForm.module.css";

YupPassword(Yup);

const LoginForm = ({ onSubmit }) => {
  return (
    <>
      <h1>Log in to Trello</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().password().required("Password is required"),
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <Input label="Email" id="email" name="email" type="email" />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
          />
          <Button type="submit" className={styles.submit_button} testId="login">
            Log in
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
