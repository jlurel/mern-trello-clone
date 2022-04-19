import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, children, type, className, testId }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default Button;
