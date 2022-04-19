import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RegisterPage.module.css";
import Button from "../components/Button";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const url = "http://localhost:4000/api/users/register";
    axios
      .post(url, values)
      .then((data) => {
        navigate("/login");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className={styles.register_container}>
      <h1>Trello Clone</h1>
      <div className={styles.form_container}>
        <RegisterForm onSubmit={handleSubmit} />
        {error && <div className={styles.error_message}>{error}</div>}
        <div className={styles.bottom_form_link}>
          <h2 className={styles.bottom_form_link_title}>
            Already have an account?
          </h2>
          <Link to={"/login"} style={{ width: "100%" }}>
            <Button type="button" className={styles.login_button}>
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
