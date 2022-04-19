import React from "react";
import styles from "./HomePage.module.css";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className={styles.home_container}>
      <NavBar />
      <h1>Trello Clone</h1>
    </div>
  );
};

export default Home;
