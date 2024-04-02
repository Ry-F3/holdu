import React from "react";
import navStyles from "../styles/NavBar.module.css";

const Spinner = ({ size }) => {
  const spinnerStyle = {
    width: size,
    height: size,
  };

  return <div className={`${navStyles.spinner} text-center mr-5`} style={spinnerStyle}></div>;
};

export default Spinner;