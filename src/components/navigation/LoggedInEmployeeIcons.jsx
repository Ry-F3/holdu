import React from "react";
import { NavLink } from "react-router-dom";
// Styles
import navStyles from "../../styles/NavBar.module.css";

const LoggedInEmployeeIcons = () => {
  return (
    <>
      <NavLink
        to="/"
        activeClassName={navStyles.Active}
        exact
        className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-house mt-2"></i>
          <span className={navStyles.NavText}>Home</span>
        </div>
      </NavLink>
      <NavLink
        to="/connect"
        activeClassName={navStyles.Active}
        className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-user-group mt-2"></i>
          <span className={navStyles.NavText}>Connect</span>
        </div>
      </NavLink>
      <NavLink
        to="/notifications"
        activeClassName={navStyles.Active}
        className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-bell mt-2"></i>
          <span className={navStyles.NavText}>Alerts</span>
        </div>
      </NavLink>
    </>
  );
};

export default LoggedInEmployeeIcons;
