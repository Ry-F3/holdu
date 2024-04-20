import React from "react";
// Styles
import styles from "../../styles/JobPostHomeItem.module.css";

const JobPostHomeItem = ({
  title,
  description,
  location,
  salary,
  closing_date,
  numApplicants,
}) => {
  return (
    <li className="py-3 mb-3 rounded p-3 position-relative">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-1"><strong>{title} </strong></h3>

          <div className="d-flex align-items-center mb-2">
            <p className="mb-0 mr-3 small">
              {location} <i className="fas fa-map-marker-alt text-muted"></i>
            </p>

            <p className="mb-0 mr-2 small">£{salary}/hr</p>
          </div>
        </div>
        <div>
          <div className="position-relative"></div>
        </div>
      </div>

      <div>
        <p className="mb-1 mb-2 small">Job Description: {description}</p>
        <div className="d-flex align-items-center">
          <p className={`${styles.ClosingBox} mb-0 mt-1 small`}>
            Closing Date: {closing_date}
          </p>

          <span className="mr-1 ml-3">Applicants:</span>
          <span className="badge bg-secondary text-white">
            {" "}
            {numApplicants !== undefined ? numApplicants : 0}
          </span>
        </div>
      </div>
    </li>
  );
};

export default JobPostHomeItem;
