import React from "react";
import { NavLink} from "react-router-dom";
import navStyles from "../styles/NavBar.module.css";
import styles from "../styles/BottomNav.module.css";

const LoggedInEmployerIconsBottom = () => {
  
  return (
    <div className={`container-fluid ${styles.BottomNavBar}`}>
      <div className="row">
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Home */}
          <NavLink to="/" activeClassName={styles.Active} exact className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-house mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Home</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Connect */}
          <NavLink to="/connect" activeClassName={styles.Active}  className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-user-group mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Connect</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Jobs */}
          <NavLink to="/jobs/post/" activeClassName={styles.Active}  className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-briefcase mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Jobs</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Chats */}
          <NavLink to="/chats" activeClassName={styles.Active}  className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-message mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Chats</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Notifications */}
          <NavLink to="/notifications" activeClassName={styles.Active}  className={`${navStyles.Pointer} text-muted`}>
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

export default LoggedInEmployerIconsBottom;
