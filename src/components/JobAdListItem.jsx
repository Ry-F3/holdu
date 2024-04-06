import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import appStyles from "../App.module.css";
import styles from "../styles/JobAdListItem.module.css";

const JobListItem = ({ ad, handleEdit, handleDelete }) => {
  return (
    <Card className={`${styles.jobCard}  mb-3`}>
    
    <Card.Body className={`${appStyles.jobCardBody} border-bottom align-items-center`}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className={`${appStyles.jobEnd} mr-auto small`}>
            Closing Date: {ad.closing_date}
          </span>
          <div className={`${appStyles.myPointer}`}>
            <Button
              className={`${appStyles.Button} mb-0 d-flex align-items-center justify-content-center`}
              onClick={() => handleDelete(ad.job_listing_id)}
            >
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

          <span className="mr-1">Aplicants:</span>
          <span className="badge bg-secondary text-white">
            {ad.applicants ? ad.applicants.length : 0}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobListItem;
