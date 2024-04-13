import React from 'react';

const ApprovedApplicantItem = ({ applicant }) => {
  console.log("Approved Applicant component:", applicant); // Log the entire applicant object
  
  // Log specific properties
  console.log("Applicant ID:", applicant.applicant.id);
  console.log("Applicant Image:", applicant.image);
  console.log("Applicant Owner Username:", applicant.owner_username);
  console.log("Applicant Average Rating:", applicant.average_rating);

  return (
    <div
   
      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
      style={{ minWidth: "150px" }}
    >
      <img
        src={applicant.applicant.image}
        alt={applicant.applicant.owner_username}
        className="rounded-circle mb-2"
        style={{ width: "100px", height: "100px" }}
      />
      <p className="mb-1">{applicant.applicant.owner_username}</p>
      {/* <div className="d-flex align-items-center">
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
      </div> */}
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
