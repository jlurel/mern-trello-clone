import React from "react";
import { useNavigate } from "react-router-dom";
import DownIcon from "./DownIcon";
import styles from "./NavBar.module.css";
import Button from "./Button";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Trello</div>
      <div className={styles.nav_links}>
        <button
          type="button"
          className={`${styles.button} ${styles.nav_link} `}
        >
          <span className={styles.nav_link_label}>Workspaces</span>
          <span className={styles.nav_link_icon}>
            <DownIcon />
          </span>
        </button>
      </div>
      <div className={styles.filling_div}></div>
      <div>
        <Button
          type="button"
          testId="logout"
          className={styles.logout_button}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
