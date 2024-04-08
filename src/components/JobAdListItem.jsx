import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import appStyles from "../App.module.css";
import styles from "../styles/JobAdListItem.module.css";

const JobListItem = ({ ad, handleEdit, handleDelete }) => {
  const [showApplicants, setShowApplicants] = useState(false);

  const toggleApplicants = () => {
    setShowApplicants(!showApplicants);
  };

  ad.applicants.forEach((applicant) => {
    console.log("Owner Username:", applicant.owner_username);
  });

  console.log("ad", ad);

  return (
    <Card className={`${styles.jobCard}  mb-3`}>
      <Card.Body
        className={`${appStyles.jobCardBody} border-bottom align-items-center`}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className={`${appStyles.jobEnd} mr-auto small`}>
            Closing Date: {ad.closing_date}
          </span>
          <div className={`${appStyles.myPointer}`}>
            <Button
              className={`${appStyles.Button} mb-0 d-flex align-items-center justify-content-center`}
              onClick={() => handleDelete(ad.job_listing_id)}>
              <i className="fa fa-trash"></i>
            </Button>
          </div>
        </div>
      </Card.Body>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link className="text-dark" to={`post/${ad.job_listing_id}`}>
              <h3 className={`mb-2 ${styles.jobTitle}`}>{ad.title} </h3>
            </Link>

            <div className="d-flex align-items-center">
              <p className={`${styles.jobLocation} mb-0 mr-3 small`}>
                {ad.location}{" "}
                <i className="fas fa-map-marker-alt text-muted"></i>
              </p>

              <p className={` ${styles.jobSalary} mb-0 small mr-2`}>
                £{ad.salary}/hr
              </p>
              <p className={` ${styles.jobCreated} mb-0 small mr-2`}>
                {ad.created_at}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className={`${styles.jobDescription} mb-1 mb-2 small`}>
            Job Description: {ad.description}
          </p>
        </div>
      </Card.Body>
      <Card.Body className="border-top">
        <div className={`d-flex align-items-center`}>
          {/* <div className={`${styles.jobEndBox}`}>
            <p
              className={`${styles.jobEnd} mb-0 mt-0 small`}
            >
              Closing Date: {ad.closing_date}
            </p>
            </div> */}
          <p
            className={`${appStyles.myPointer} mb-0 mr-5 ml-3`}
            onClick={() => handleEdit(ad.job_listing_id)}>
            <i className="fa-regular fa-pen-to-square"></i>
          </p>

          <span className="mr-1">Applicants:</span>
          <span className="badge bg-secondary text-white">
            {ad.applicants ? ad.applicants.length : 0}
          </span>
          {ad.applicants.length > 0 && (
            <span onClick={toggleApplicants} className={styles.ArrowDown}>
              <i className="ml-2 small text-muted fas fa-level-down-alt"></i>
            </span>
          )}
          {console.log("Applicants:", ad.applicants)}
        </div>
      </Card.Body>
      {showApplicants && (
        <Card.Body className="border-top">
          <div>
            {/* List of applicants with name, ID, picture, and rating */}
            <div className="d-flex overflow-auto">
              {ad.applicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
                  style={{ minWidth: "150px" }}>
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
                  {!ad.is_listing_closed && (
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="success" className="mr-3">
                        <i className="fas fa-check"></i>
                      </Button>
                      <Button variant="danger">
                        <i className="fas fa-times"></i>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              {/* Dummy boxes */}
              {ad.applicants.length < 4 &&
                Array.from({ length: 4 - ad.applicants.length }).map(
                  (_, index) => (
                    <div
                      key={`dummy-${index}`}
                      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
                      style={{ minWidth: "150px" }}>
                      <i className="fas fa-ban text-muted"></i>
                    
                    </div>
                  )
                )}
            </div>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default JobListItem;
