import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import profileStyles from "../../styles/ProfileView.module.css";
import styles from "../../App.module.css";

const ProfileHeader = ({
  profile,
  currentUser,
  showRatingForm,
  handleToggleRatingForm,
}) => {
  return (
    <div
      className={` ${styles.Background} p-3 d-flex align-items-center justify-content-start`}>
      <div className="p-0 rounded mr-3">
        {profile && profile.image && (
          <Avatar src={profile.image} height={45} border rounded fluid />
        )}
      </div>
      <div className="text-left">
        <h1 className="mb-0">{profile && profile.name}</h1>
      </div>
      <div className={`${profileStyles.showButton} ml-5 d-md-none `}>
        {currentUser &&
          profile &&
          currentUser.username !== profile.owner_username && (
            <Button variant="sm" onClick={handleToggleRatingForm}>
            {showRatingForm ? (
              <>
                <i className="fa-solid fa-eye-slash"></i> 
              </>
            ) : (
              <>Review User</>
            )}
          </Button>
          )}
      </div>
      {currentUser &&
        profile &&
        currentUser.username === profile.owner_username && (
          <div className="ml-auto">
            <Link to={`/profiles/${currentUser?.profile_id}/`}>
              <Button className={profileStyles.Button}>
                <i className=" text-white fas fa-ellipsis-v" ></i>
              </Button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default ProfileHeader;
