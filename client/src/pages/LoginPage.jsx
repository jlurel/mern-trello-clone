import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Button from "../components/Button";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const url = "http://localhost:4000/api/users/login";
    axios
      .post(url, values)
      .then(({ data: results }) => {
        localStorage.setItem("token", results.data);
        navigate("/");
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
    <div className={styles.login_container}>
      <h1>Trello Clone</h1>
      <div className={styles.form_container}>
        <LoginForm onSubmit={handleSubmit} />
        {error && <div className={styles.error_message}>{error}</div>}
        <div className={styles.bottom_form_link}>
          <h2 className={styles.bottom_form_link_title}>
            Don't have an account?
          </h2>
          <Link to={"/register"} style={{ width: "100%" }}>
            <Button className={styles.register_button} type="button">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
