import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
// Contexts
import { useProfileData } from "../../contexts/ProfileContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Bootstrap
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
// Styles
import styles from "../../styles/JobsPost.module.css";
import pointerStyle from "../../styles/Pointer.module.css";
// Components
import JobPostHomeItem from "../../components/job/JobPostHomeItem";

import axios from "axios";

const JobsPost = ({
  job_listing_id,
  title,
  description,
  location,
  salary,
  closing_date,
  created_at,
  employer_profile,
  likes_count,
  applicants,
  is_applied,
  like_id,
  setJobsPost,
  refetchJobsData, // Receive the callback function as a prop
}) => {
  const currentUser = useCurrentUser();
  const profileData = useProfileData();
  const [isApplying, setIsApplying] = useState(false);
  const [has_applied, setHasApplied] = useState(is_applied);
  const [applicantsCount, setApplicantsCount] = useState(
    applicants ? applicants.length : 0
  );

  const isOwner = currentUser?.username === employer_profile?.owner_username;
  const isEmployee = currentUser && profileData?.profile_type === "employee";

  useEffect(() => {
    setApplicantsCount(applicants ? applicants.length : 0);
  }, [applicants]);

  const handleLike = async () => {
    try {
      if (!currentUser) return;

      const { data } = await axiosRes.post("/likes/", { job: job_listing_id });

      // Update job post in setJobsPost
      setJobsPost((prevJobsPost) => ({
        ...prevJobsPost,
        results: prevJobsPost.results.map((jobPost) =>
          jobPost.job_listing_id === job_listing_id
            ? {
                ...jobPost,
                likes_count: jobPost.likes_count + 1,
                like_id: data.id,
              }
            : jobPost
        ),
      }));
    } catch (err) {
      // Do nothing
    }
  };

  const handleUnlike = async () => {
    try {
      // Delete like
      await axiosRes.delete(`/likes/${like_id}/`);

      // Update job post in setJobsPost
      setJobsPost((prevJobsPost) => ({
        ...prevJobsPost,
        results: prevJobsPost.results.map((jobPost) =>
          jobPost.job_listing_id === job_listing_id
            ? {
                ...jobPost,
                likes_count: jobPost.likes_count - 1,
                like_id: null,
              }
            : jobPost
        ),
      }));
    } catch (err) {
      // Do nothing
    }
  };

  const handleLikeUnlike = async () => {
    if (!currentUser) return;
    if (like_id) {
      await handleUnlike();
      refetchJobsData();
    } else {
      await handleLike();
      refetchJobsData();
    }
  };

  const handleApply = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      setIsApplying(true);

      // Make API call to apply for the job
      await axios.post(`/jobs/post/${job_listing_id}/apply/`, {
        applied: true, // Include the value of "applied" in the request body
        job: job_listing_id, // Include the job ID in the request body
      });

      // Update UI or handle any response from the server
      setHasApplied(true);
      setIsApplying(false);
      // Update the local applicants count and pass it to JobsHomePage
      setApplicantsCount((prevCount) => prevCount + 1);
      refetchJobsData();
    } catch (err) {
      setIsApplying(false);
    }
  };

  const handleUnapply = async (event) => {
    event.preventDefault();
    try {
      // Make API call to unapply for the job
      await axiosRes.delete(`/jobs/post/${job_listing_id}/unapply/`);
      // Update UI or handle any response from the server
      setHasApplied(false);
      setApplicantsCount((prevCount) => prevCount - 1);
      refetchJobsData();
    } catch (err) {
      // Do nothing
    }
  };

  return (
    <Card className={`${styles.JobsPost} mb-3`}>
      <Card.Body
        className={` ${styles.Background} d-flex justify-content-between align-items-center border-bottom rounded mb-2`}>
        <div>
          {employer_profile && (
            <div className="d-flex align-items-center">
              {employer_profile.owner_username && (
                <Link
                  className="text-white font-weight-bold"
                  to={`/profiles/${employer_profile.owner_id}/user`}>
                  <Avatar
                    src={employer_profile.image}
                    height={35}
                    border={true}
                  />
                  {employer_profile.name}
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="d-flex align-items-center text-white">
          <span>{created_at}</span>
        </div>
      </Card.Body>
      <Card.Body>
        <ul className="list-unstyled rounded">
          <JobPostHomeItem
            key={job_listing_id}
            title={title}
            description={description}
            location={location}
            salary={salary}
            closing_date={closing_date}
            numApplicants={applicantsCount}
          />
        </ul>
      </Card.Body>
      <Card.Body className="border-top m-1">
        <div className="d-flex justify-content-between">
          {isEmployee && currentUser ? (
            <form onSubmit={has_applied ? handleUnapply : handleApply}>
              <div>
                {/* Hidden input field with default value "applied" */}
                <input
                  className="d-none"
                  name="employee_status"
                  defaultValue="applied"
                />
                <Button aria-label="apply and unapply" disabled={isApplying} type="submit">
                  {isApplying
                    ? has_applied
                      ? "Unapplying..."
                      : "Applying..."
                    : has_applied
                    ? "Unapply"
                    : "Easy Apply"}
                </Button>
              </div>
            </form>
          ) : null}
          <div className={`${pointerStyle.Pointer} d-flex align-items-center`}>
            {currentUser ? (
              !isOwner ? (
                <span onClick={handleLikeUnlike}>
                  <i
                    className={`${styles.HeartSize} ${
                      like_id ? styles.Heart : styles.HeartOutline
                    }  mt-2 ${like_id ? "fas fa-heart" : "far fa-heart"}`}></i>
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own job post</Tooltip>}>
                  <span>
                    <i
                      className={`${styles.HeartSize} ${styles.HeartOutline} text-muted fas fa-heart mt-2`}></i>
                  </span>
                </OverlayTrigger>
              )
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Please log in to like this post</Tooltip>}>
                <span>
                  <i
                    className={`${styles.HeartSize} ${styles.HeartOutline}  text-muted far fa-heart mt-2`}></i>
                </span>
              </OverlayTrigger>
            )}
            <span className="mr-2 ml-2 mt-2">{likes_count}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobsPost;
