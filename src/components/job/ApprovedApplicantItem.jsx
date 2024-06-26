import React from "react";
// Components
import Avatar from "../Avatar";
// Styles
import styles from "../../styles/ApplicantItem.module.css"

const ApprovedApplicantItem = ({ applicant }) => {
  return (
    <div
      className={` ${styles.Profiles} mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center`}
      >
      <Avatar
        src={applicant.applicant.image}
        alt={applicant.applicant.owner_username}
        className="rounded-circle mb-2"
        height={85}
      />
      <p className="mb-1">{applicant.applicant.owner_username}</p>

      {applicant.employee_acceptance_response === null ? (
        <div className="rounded border small p-2 m-1 mt-1">
          <p className="m-0">Awaiting job offer response</p>
        </div>
      ) : (
        <div className="rounded small p-2 mt-2">
          <p className="m-0">{applicant.employee_acceptance_response}</p>
        </div>
      )}
    </div>
  );
};

export default ApprovedApplicantItem;
