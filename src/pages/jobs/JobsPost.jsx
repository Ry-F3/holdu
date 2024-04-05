import React, { useRef } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/JobsPost.module.css";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import JobPostHomeItem from "../../components/JobPostHomeItem";
import { useProfileData } from "../../contexts/ProfileContext";

const JobsPost = (props) => {
  const {
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
  } = props;

  // Ensure employer_profile exists in props before destructuring
  const employer_profile = props.employer_profile || {};

  const likes_count = likes ? likes.filter((like) => like.like_id).length : 0;

  const {
    average_rating,
    content,
    id,
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

  return (
    <Card className={`${styles.JobsPost} mb-3`}>
      <Card.Body  className={` ${styles.Background} d-flex justify-content-between align-items-center border-bottom rounded mb-2`}>
        <div>
          {image && (
            <div className="d-flex align-items-center">
              {owner_username && (
                <Link className="text-white font-weight-bold" to={`/profiles/${owner_id}/`}>
                  <Avatar src={image} height={55} />
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
      <Card.Body style={{ position: "relative" }} >
        <ul className="list-unstyled rounded">
          <JobPostHomeItem
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
      <div style={{ position: "absolute", bottom: 10, right: 15, display: 'flex', alignItems: 'center' }}>
          {/* Heart icon */}
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
            <span onClick={() => {}}>
              <i
                className={`${styles.Heart} ${styles.HeartSize} fas fa-heart mt-2`}></i>
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i
                className={`${styles.HeartOutline} ${styles.HeartSize} far fa-heart mt-2`}></i>
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
            <span className="mr-2 ml-1 mt-2" style={{ display: 'inline-block' }}>{likes_count}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobsPost;
