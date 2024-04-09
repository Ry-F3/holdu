import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import appStyles from "../App.module.css";
import styles from "../styles/JobAdListItem.module.css";
import axios from "axios";

const JobListItem = ({ ad, handleEdit, handleDelete }) => {
  const [showApplicants, setShowApplicants] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");
  const [updatedAd, setUpdatedAd] = useState(ad);
  const [approvedApplicants, setApprovedApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  const toggleApplicants = () => {
    setShowApplicants(!showApplicants);
    setArrowDirection(arrowDirection === "down" ? "up" : "down");
  };

  

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        `/jobs/post/${ad.job_listing_id}/applicants/`
      );
      const approvedApplicants = response.data.results.filter(
        (applicant) => applicant.employer_applicant_choice === "accepted"
      );
      const pendingApplicants = response.data.results.filter(
        (applicant) => applicant.employer_applicant_choice === "pending"
      );
      setApprovedApplicants(approvedApplicants);
      setFilteredApplicants(pendingApplicants);
      console.log("Approved Applicants:", approvedApplicants);
      console.log("Pending Applicants:", pendingApplicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [ad.job_listing_id]);

  const toggleApprovedApplicants = (applicantId) => {
    const updatedApplicants = updatedAd.applicants.filter(
      (applicant) => applicant.id !== applicantId
    );
    const approvedApplicant = updatedAd.applicants.find(
      (applicant) => applicant.id === applicantId
    );
    setUpdatedAd({ ...updatedAd, applicants: updatedApplicants });
    setApprovedApplicants([...approvedApplicants, approvedApplicant]);
  };

  const toggleAprovedApplicants = () => {
    setUpdatedAd([ ...approvedApplicants]);
    setApprovedApplicants([]);
  };

  // Check if the closing date has passed
  const currentDate = new Date();
  const closingDate = new Date(ad.closing_date);
  const isClosingDatePassed = currentDate > closingDate;

  // Automatically close the listing if the closing date has passed
  if (isClosingDatePassed) {
    ad.is_listing_closed = true;
  }

  const handleApplicantStatus = async (applicantId, status) => {
    if (!ad || !ad.job_listing_id) {
      console.error("Error: Job listing ID is undefined.");
      return;
    }

    const url = `/jobs/post/${ad.job_listing_id}/applicants/${applicantId}/`;
    console.log("URL:", url); // Log the URL before making the request
    try {
      let response;
      if (status === "binned") {
        // Send a DELETE request to remove the applicant
        response = await axios.delete(url);
        // Check if the applicant was successfully removed
        if (response.status === 204) {
          // Filter out the removed applicant from both updatedAd and filteredApplicants
          const updatedApplicants = updatedAd.applicants.filter(
            (applicant) => applicant.id !== applicantId
          );
          setUpdatedAd({ ...updatedAd, applicants: updatedApplicants });

          const updatedFilteredApplicants = filteredApplicants.filter(
            (applicant) => applicant.id !== applicantId
          );
          setFilteredApplicants(updatedFilteredApplicants);

          // If there are no applicants left, hide the applicants section
          if (updatedFilteredApplicants.length === 0) {
            setShowApplicants(false);
          }
          // Fetch applicants again to update the list
          fetchApplicants();
        }
      } else {
        // Send a PUT request to update the applicant status
        response = await axios.put(url, {
          employer_applicant_choice: status,
        });
        if (response.status === 200 && status === "accepted") {
          toggleApprovedApplicants(applicantId);
          // Fetch applicants again to update the list
          fetchApplicants();
        }
        // If the status is "accepted", remove the applicant from filteredApplicants
        if (status === "accepted") {
          const updatedFilteredApplicants = filteredApplicants.filter(
            (applicant) => applicant.id !== applicantId
          );
          setFilteredApplicants(updatedFilteredApplicants);
        }
      }
      if (response.status === 200) {
        console.log("Applicant status updated successfully");
      } else {
        console.error("Failed to update applicant status");
        console.log("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating applicant status:", error);
    }
  };

  return (
    <Card className={`${styles.jobCard}  mb-3`}>
      <Card.Body
        className={`${appStyles.jobCardBody} border-bottom align-items-center`}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className={`${appStyles.jobEnd} mr-auto small`}>
            {ad.is_listing_closed ? (
              <span className={styles.ListingClosed}>
                Listing Closed: {ad.closing_date}
              </span>
            ) : (
              <span className={styles.jobEnd}>
                Closing date: {ad.closing_date}
              </span>
            )}
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
            <Link className="text-dark" to={`${ad.job_listing_id}`}>
              <div className="d-flex align-items-center">
                <h3 className={`mb-2 ${styles.jobTitle}`}>{ad.title}</h3>
              </div>
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
              {ad.is_listing_closed ? (
                <span className={`${styles.ActiveCross} mb-0 small ml-0 mr-2 `}>
                  <p className="d-none d-sm-inline">Closed</p>{" "}
                  <i className="fas fa-times-circle"></i>
                </span>
              ) : (
                <span className={`${styles.ActiveTick} mb-0 small ml-0 mr-2 `}>
                  <p className="d-none d-sm-inline">Active</p>{" "}
                  <i className="fas fa-check-circle"></i>
                </span>
              )}
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
          {!ad.is_listing_closed && (
            <p
              className={`${appStyles.myPointer} mb-0 mr-5 ml-3`}
              onClick={() => handleEdit(ad.job_listing_id)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </p>
          )}
     
          {/* Toggle approved applicants */}
          {ad.is_listing_closed && approvedApplicants.length > 0 && (
            <span
              onClick={toggleApprovedApplicants}
              className={`mr-3 text-muted`}>
              Accepted <i className="fa-regular fa-folder-closed"></i>
            </span>
          )}
          {/* Applicants count */}
          <span className="mr-1">Applicants:</span>
          <span className="badge bg-secondary text-white">
            {ad.is_listing_closed
              ? filteredApplicants
                ? filteredApplicants.length
                : 0
              : updatedAd.applicants
              ? updatedAd.applicants.length
              : 0}
          </span>
          {/* Toggle applicants arrow */}
          {ad.is_listing_closed
            ? filteredApplicants.length > 0 && (
                <span onClick={toggleApplicants} className={styles.ArrowDown}>
                  <i
                    className={`ml-2 small text-muted fas fa-level-${arrowDirection}-alt`}></i>
                </span>
              )
            : updatedAd.applicants.length > 0 && (
                <span onClick={toggleApplicants} className={styles.ArrowDown}>
                  <i
                    className={`ml-2 small text-muted fas fa-level-${arrowDirection}-alt`}></i>
                </span>
              )}

          {console.log("Applicants filtered:", filteredApplicants)}
        </div>
      </Card.Body>
      {showApplicants && (
        <Card.Body className="border-top">
          <div>
            {/* List of applicants with name, ID, picture, and rating */}
            <div className="d-flex overflow-auto">
              {ad.is_listing_closed
                ? filteredApplicants.map((applicantData) => (
                    <div
                      key={applicantData.id}
                      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
                      style={{ minWidth: "150px" }}>
                      <img
                        src={applicantData.applicant.image}
                        alt={applicantData.applicant.owner_username}
                        className="rounded-circle mb-2"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <p className="mb-1">
                        {applicantData.applicant.owner_username}
                      </p>
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
                      {ad.is_listing_closed && (
                        <div className="d-flex justify-content-center mt-3">
                          <>
                            <Button
                              className="mr-3"
                              onClick={() =>
                                handleApplicantStatus(
                                  applicantData.applicant.id,
                                  "accepted"
                                )
                              }>
                              <i className="fas fa-check"></i>
                            </Button>
                            <Button
                              onClick={() =>
                                handleApplicantStatus(
                                  applicantData.applicant.id,
                                  "binned"
                                )
                              }>
                              <i className="fas fa-times"></i>
                            </Button>
                          </>
                        </div>
                      )}
                    </div>
                  ))
                : updatedAd.applicants.map((applicant) => (
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
                    </div>
                  ))}
              {/* Dummy boxes for updatedAd.applicants if listing is not closed */}
              {!ad.is_listing_closed &&
                updatedAd.applicants.length < 4 &&
                Array.from({ length: 4 - updatedAd.applicants.length }).map(
                  (_, index) => (
                    <div
                      key={`dummy-updatedAd-${index}`}
                      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
                      style={{ minWidth: "150px" }}>
                      <i className="fas fa-ban text-muted"></i>
                    </div>
                  )
                )}

              {/* Dummy boxes for filteredApplicants if listing is closed */}
              {ad.is_listing_closed &&
                filteredApplicants.length < 4 &&
                Array.from({ length: 4 - filteredApplicants.length }).map(
                  (_, index) => (
                    <div
                      key={`dummy-filtered-${index}`}
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
