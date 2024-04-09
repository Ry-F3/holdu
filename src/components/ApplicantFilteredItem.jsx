import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const ApplicantFilteredItem = ({ applicantData, handleApplicantStatus }) => {
  return (
    <div
      key={applicantData.id}
      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
      style={{ minWidth: "150px" }}
    >
      <img
        src={applicantData.applicant.image}
        alt={applicantData.applicant.owner_username}
        className="rounded-circle mb-2"
        style={{ width: "100px", height: "100px" }}
      />
      <p className="mb-1">{applicantData.applicant.owner_username}</p>
      <div className="d-flex align-items-center">
        {applicantData.applicant.average_rating ? (
          <>
            <span className="mr-1">Rating:</span>
            <span className="badge bg-secondary text-white">
              {applicantData.applicant.average_rating}
            </span>
          </>
        ) : (
          <span>No Ratings</span>
        )}
      </div>

      {/* Employer applicant decision */}
      <div className="d-flex justify-content-center mt-3">
        <Button
          className="mr-3"
          onClick={() =>
            handleApplicantStatus(applicantData.applicant.id, "accepted")
          }
        >
          <i className="fas fa-check"></i>
        </Button>
        <Button
          onClick={() =>
            handleApplicantStatus(applicantData.applicant.id, "binned")
          }
        >
          <i className="fas fa-times"></i>
        </Button>
      </div>
    </div>
  );
};

ApplicantFilteredItem.propTypes = {
  applicantData: PropTypes.object.isRequired,
  handleApplicantStatus: PropTypes.func.isRequired,
};

export default ApplicantFilteredItem;