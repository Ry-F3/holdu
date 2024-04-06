import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/JobsPost.module.css";
import { useProfileData } from "../../contexts/ProfileContext";
import JobPostHomeItem from "../../components/JobPostHomeItem";

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
  like_id,
  setJobsPost,
}) => {
  const currentUser = useCurrentUser();
  const profileData = useProfileData();

  console.log("profileData", profileData && profileData.profile_type);

  const handleLike = async () => {
    try {
      if (!currentUser) return;
      console.log("Liking job post with ID:", job_listing_id);
      const { data } = await axiosRes.post("/likes/", { job: job_listing_id });
      console.log("Like response data:", data);

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
      console.error(
        "Error liking job post:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleUnlike = async () => {
    try {
      console.log("Unliking job post with ID:", like_id);

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
      console.error(
        "Error Unliking job post:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleLikeUnlike = async () => {
    if (!currentUser) return;
    if (like_id) {
      await handleUnlike();
    } else {
      await handleLike();
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
                  to={`/profiles/${employer_profile.owner_id}/`}>
                  <Avatar src={employer_profile.image} height={35} />
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
      <Card.Body style={{ position: "relative" }}>
        <ul className="list-unstyled rounded">
          <JobPostHomeItem
            key={job_listing_id}
            title={title}
            description={description}
            location={location}
            salary={salary}
            closing_date={closing_date}
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
          {currentUser ? (
            <span onClick={handleLikeUnlike}>
              <i
                className={`${styles.HeartSize} ${
                  like_id ? styles.Heart : styles.HeartOutline
                }  mt-2 ${like_id ? "fas fa-heart" : "far fa-heart"}`}></i>
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Please log in to like this post</Tooltip>}>
              <span>
                <i
                  className={`${styles.HeartSize} ${styles.HeartOutline} fas fa-heart mt-2`}></i>
              </span>
            </OverlayTrigger>
          )}
          <span className="mr-2 ml-2 mt-2" style={{ display: "inline-block" }}>
            {likes_count}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobsPost;
