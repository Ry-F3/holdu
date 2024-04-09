import React from 'react';

const ApprovedApplicantItem = ({ applicant }) => {
  return (
    <div
      key={`approved-applicant-${applicant.id}`}
      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
      style={{ minWidth: "150px" }}
    >
      <img
        src={applicant.image}
        alt={applicant.owner_username}
        className="rounded-circle mb-2"
        style={{ width: "100px", height: "100px" }}
      />
      <p className="mb-1">{applicant.owner_username}</p>
      <div className="d-flex align-items-center">
        {applicant.average_rating ? (
          <>
            <span className="mr-1">Rating:</span>
            <span className="badge bg-secondary text-white">
              {applicant.average_rating}
            </span>
          </>
        ) : (
          <span>No Ratings</span>
        )}
      </div>
    </div>
  );
};

export default ApprovedApplicantItem;