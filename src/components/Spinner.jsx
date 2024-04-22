import React from 'react';
import navStyles from '../styles/NavBar.module.css';

function Spinner({ size }) {
  const spinnerStyle = {
    width: size,
    height: size,
  };

  return <div className={`${navStyles.spinner} text-center mr-0`} style={spinnerStyle} />;
}

export default Spinner;
