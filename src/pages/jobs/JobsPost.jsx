import React, { useRef, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/JobsPost.module.css";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import JobPostHomeItem from "../../components/JobPostHomeItem";
import { useProfileData } from "../../contexts/ProfileContext";
import { axiosRes } from "../../api/axiosDefaults";

const JobsPost = (props) => {
  const {
    job_listing_id,
    title,
    description,
    location,
    salary,
    closing_date,
    created_at,
    is_applied,
    is_listing_closed,
    positions_available,
    updated_at,
    like_id,
    likes,
    postJob,
    likes_count,
    setJobsPost,
  } = props;

  // Ensure employer_profile exists in props before destructuring
  const employer_profile = props.employer_profile || {};

  const {
    average_rating,
    content,
    image,
    is_signup_completed,
    name,
    owner_id,
    owner_username,
    profile_type,
    ratings,
  } = employer_profile;

  const currentUser = useCurrentUser();
  const profileData = useProfileData();
  // Access handleLike and handleUnlike from the useLikeContext hook

  const is_owner = currentUser && currentUser.username === owner_username;
  const profile = currentUser && profileData && profileData.profile_type;

  const CustomOverlayTrigger = ({ children, ...props }) => {
    const targetRef = useRef(null);

    return (
      <div ref={targetRef}>
        <OverlayTrigger {...props} target={targetRef.current}>
          {children}
        </OverlayTrigger>
      </div>
    );
  };

  const handleLike = async (job_listing_id, setJobsPost) => {
    try {
      console.log("Liking job post with ID:", job_listing_id);
      const { data } = await axiosRes.post("/likes/", { job: job_listing_id });
      console.log("Like response data:", data);

      // Update job post in setJobsPost
      setJobsPost((prevJobsPost) => {
        const updatedResults = prevJobsPost.results.map((jobPost) =>
          jobPost.id === job_listing_id
            ? {
                ...jobPost,
                likes_count: jobPost.likes_count + 1,
                like_id: data.id,
              }
            : jobPost
        );
        return { ...prevJobsPost, results: updatedResults };
      });
    } catch (err) {
      console.error(
        "Error liking job post:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleUnlike = async (like_id, setJobsPost) => {
    try {
      console.log("Unliking job post with ID:", like_id);

      // Delete like
      await axiosRes.delete(`/likes/${like_id}/`);

      // Update job post in setJobsPost
      setJobsPost((prevJobsPost) => {
        const updatedResults = prevJobsPost.results.map((jobPost) =>
          jobPost.id === like_id
            ? {
                ...jobPost,
                likes_count: jobPost.likes_count - 1,
                like_id: null,
              }
            : jobPost
        );
        return { ...prevJobsPost, results: updatedResults };
      });
    } catch (err) {
      console.error(
        "Error Unliking job post:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <Card className={`${styles.JobsPost} mb-3`}>
      <Card.Body
        className={` ${styles.Background} d-flex justify-content-between align-items-center border-bottom rounded mb-2`}>
        <div>
          {image && (
            <div className="d-flex align-items-center">
              {owner_username && (
                <Link
                  className="text-white font-weight-bold"
                  to={`/profiles/${owner_id}/`}>
                  <Avatar src={image} height={35} />
                  {name}
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="d-flex align-items-center text-white">
          <span>{updated_at}</span>
          {is_owner && postJob && "..."}
        </div>
      </Card.Body>
      <Card.Body style={{ position: "relative" }}>
        <ul className="list-unstyled rounded">
          <JobPostHomeItem
            key={job_listing_id}
            title={title}
            description={description}
            location={location}
            salary={salary}
            closing_date={closing_date}
            created_at={created_at}
          />
        </ul>
      </Card.Body>
      <Card.Body className="border-top m-1">
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 15,
            display: "flex",
            alignItems: "center",
          }}>
          {/* Display appropriate heart icon based on profile type and like status */}
          {profile === "employer" ? (
            <CustomOverlayTrigger
              placement="top"
              overlay={
                <Tooltip>Only profiles looking for work can like jobs</Tooltip>
              }>
              <span>
                <i className={`${styles.HeartSize} far fa-heart mt-2`}></i>
              </span>
            </CustomOverlayTrigger>
          ) : like_id ? (
            <span onClick={() => handleUnlike(like_id)}>
              <i
                className={`${styles.Heart} ${
                  (styles.HeartSize, likes_count)
                } fas fa-heart mt-2`}></i>
              {console.log("unlike")}
            </span>
          ) : currentUser ? (
            <span onClick={() => handleLike(job_listing_id, likes_count)}>
              {console.log("like")}
              <i
                className={`${styles.HeartSize} ${
                  like_id ? styles.Heart : styles.HeartOutline
                } far fa-heart mt-2`}></i>
            </span>
          ) : (
            <CustomOverlayTrigger
              placement="top"
              overlay={<Tooltip>Look for work save jobs. Join now!</Tooltip>}>
              <span>
                <i className={`${styles.HeartSize} far fa-heart mt-2`}></i>
              </span>
            </CustomOverlayTrigger>
          )}
          {/* Display likes count */}
          <span className="mr-2 ml-2 mt-2" style={{ display: "inline-block" }}>
            {likes_count}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobsPost;
