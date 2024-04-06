import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/CustomTooltp.module.css"; // Import CSS module

const CustomTooltip = ({ text, color, children }) => {
  const tooltipStyle = {
    backgroundColor: color,
  };

  return (
    <div className={styles.customTooltip}>
      <span className={styles.tooltipText} style={tooltipStyle}>
        {text}
      </span>
      <div className={styles.tooltipContent}>{children}</div>
    </div>
  );
};

CustomTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomTooltip;
