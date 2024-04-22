import React from "react";
import PropTypes from "prop-types";
// Styles
import styles from "../../styles/DummyBoxes.module.css";

const DummyBoxes = ({ widths }) => {
  return (
    <>
      <div className={`bg-white border-bottom-0 border p-4`}></div>
      <li className={`${styles.DummyBoxes}`}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            {widths.map((width, index) => (
              <div
                key={index}
                className={`${styles.DummyBox} ${styles.Pulsate}`}
                style={{ width: `${width}px` }}></div>
            ))}
          </div>
        </div>
      </li>
      <div className={`border border-top-0 bg-white p-4 mb-3`}></div>
    </>
  );
};

DummyBoxes.propTypes = {
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DummyBoxes;
