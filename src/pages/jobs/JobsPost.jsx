import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/JobsPost.module.css";
import { Card } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import JobPostHomeItem from "../../components/JobPostHomeItem";

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
  } = props;

  // Ensure employer_profile exists in props before destructuring
  const employer_profile = props.employer_profile || {};

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

  const is_owner = currentUser && currentUser.username === owner_username;
  return (
    <Card className={`${styles.JobsPost} mb-3`}>
      <Card.Body className="d-flex justify-content-between align-items-center border-bottom rounded mb-2">
        <div>
          {image && (
            <div className="d-flex align-items-center">
              {owner_username && (
                <Link to={`/profiles/${owner_id}/`}>
                  <Avatar src={image} height={55} />
                  {name}
                </Link>
              )}
            </div>
          )}
        </div>

        <span>{updated_at}</span>
      </Card.Body>
      <Card.Body>
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
    </Card>
  );
};

export default JobsPost;
