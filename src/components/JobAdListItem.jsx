import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"; // Import Card component
import { Link } from "react-router-dom";
import appStyles from "../App.module.css";

const JobListItem = ({ ad, handleEdit, handleDelete }) => {
  return (
    <Card className="mb-3"> {/* Wrap each job list item inside a Card component */}
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link className="text-dark" to={`post/${ad.job_listing_id}`}>
              <h3 className="mb-1">{ad.title} </h3>
            </Link>

            <div className="d-flex align-items-center">
              <p className="mb-0 mr-3 small">
                {ad.location}{" "}
                <i className="fas fa-map-marker-alt text-muted"></i>
              </p>

              <p className="mb-0 small mr-2">£{ad.salary}/hr</p>
              <p className="mb-0 small mr-2">{ad.created_at}</p>
            </div>
          </div>
          <div>
            <div className="position-relative">
              <div
                className={`${appStyles.myPointer} d-flex align-items-center justify-content-end`}
              >
                <Button
                  className="mb-5 d-flex align-items-center justify-content-center"
                  onClick={() => handleDelete(ad.job_listing_id)}
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1 mb-2 small">Job Description: {ad.description}</p>
          <div className="d-flex align-items-center">
            <p
              className="mb-0 mt-1 small"
              style={{
                width: "200px",
                height: "28px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                padding: "4px",
                paddingLeft: "16px",
              }}
            >
              Closing Date: {ad.closing_date}
            </p>
            <p
              className={`${appStyles.myPointer} mb-0 mr-5 ml-3`}
              onClick={() => handleEdit(ad.job_listing_id)}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </p>

            <span className="mr-1">Aplicants:</span>
            <span className="badge bg-secondary text-white">
              {ad.applicants ? ad.applicants.length : 0}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobListItem;
