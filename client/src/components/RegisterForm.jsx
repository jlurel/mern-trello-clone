import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import Button from "./Button";
import Input from "./Input";
import styles from "./RegisterForm.module.css";

YupPassword(Yup);

const RegisterForm = ({ onSubmit }) => {
  return (
    <>
      <h1>Create an account</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().password().required("Password is required"),
          confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            data-testid="firstName"
            type="text"
          />
          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            data-testid="lastName"
            type="text"
          />
          <Input
            label="Email"
            id="email"
            name="email"
            data-testid="email"
            type="email"
          />
          <Input
            label="Password"
            id="password"
            name="password"
            data-testid="password"
            type="password"
          />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            data-testid="confirmPassword"
            type="password"
          />
          <Button
            type="submit"
            className={styles.submit_button}
            testId="register"
          >
            Register
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
