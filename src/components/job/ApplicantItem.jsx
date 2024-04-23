import React from "react";
import Avatar from "../Avatar";
// Styles
import styles from "../../styles/ApplicantItem.module.css";

const ApplicantItem = ({ applicant }) => {
  
  return (
    <div
      className={`${styles.Profile} mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center`}
    >
      <Avatar
        src={applicant.image}
        alt={applicant.owner_username}
        className="rounded-circle mb-3"
        height={85}

      />
      <p className="mb-1 mt-2">{applicant.owner_username}</p>
      <div className="d-flex align-items-center">
        {applicant.average_rating ? (
          <>
            <span className="badge bg-secondary text-white">
              {[
                  ...Array(parseInt(applicant.average_rating)),
                ].map((_, index) => (
                  <i
                    key={index}
                    className="fas fa-star"
                  />
                ))}
            </span>
          </>
        ) : (
          <span>No Ratings</span>
        )}
      </div>
    </div>
  );
};

export default ApplicantItem;