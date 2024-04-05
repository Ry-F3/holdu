import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/DummyBoxes.module.css"; 

const DummyBoxes = ({ widths }) => {
  return (
    <li   className={styles.DummyBoxes}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          {widths.map((width, index) => (
            <div
              key={index}
              className={styles.DummyBox}
              style={{ width: `${width}px` }}
            ></div>
          ))}
        </div>
      </div>
    </li>
  );
};

DummyBoxes.propTypes = {
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DummyBoxes;