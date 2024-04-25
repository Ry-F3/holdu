import React from "react";
// Bootstrap
import { NavLink} from "react-router-dom";
// Styles
import navStyles from "../../styles/NavBar.module.css";
import styles from "../../styles/BottomNav.module.css";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const LoggedInEmployerIconsBottom = () => {
  const currentUser = useCurrentUser();
  
  
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
          {/* Profile */}
          <NavLink to={`/profiles/${currentUser?.profile_id}/user/`} activeClassName={styles.Active}  className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
            <i className="fa-solid fa-circle-user mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Profile</span>
            </div>
          </NavLink>
        </div>
        <div className={`col text-center ${styles.NavLinkContainer}`}>
          {/* Notifications */}
          <NavLink to="/notifications" activeClassName={styles.Active}  className={`${navStyles.Pointer} text-muted`}>
            <div className="d-flex flex-column">
              <i className="fa-solid fa-bell mt-2"></i>
              <span className={`${navStyles.NavText} ${styles.IconText}`}>Alerts</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoggedInEmployerIconsBottom;
