import React from "react";
import { NavLink } from "react-router-dom";
import navStyles from "../styles/NavBar.module.css";
import styles from "../styles/BottomNav.module.css";

const LoggedInEmployeeIconsBottom = () => {
  return (
    <div className={`container-fluid ${styles.BottomNavBar}`}>
      <div className="row">
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Home */}
          <NavLink to="/" className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-house mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Home</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Connect */}
          <NavLink to="/connect" className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-user-group mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Connect</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Jobs */}
          <NavLink to="/" className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-heart mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Likes</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Chats */}
          <NavLink to="/chats" className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-message mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Chats</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Notifications */}
          <NavLink to="/notifications" className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-bell mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Notifications</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoggedInEmployeeIconsBottom;
