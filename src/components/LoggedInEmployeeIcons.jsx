import React from 'react';
import { NavLink } from 'react-router-dom';
import navStyles from '../styles/NavBar.module.css'

const LoggedInEmployeeIcons = () => {
  return (
    <>
      <NavLink to="/" className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-house mt-2"></i>
          <span className={navStyles.NavText}>Home</span>
        </div>
      </NavLink>
      <NavLink to="/connect" className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-user-group mt-2"></i>
          <span className={navStyles.NavText}>Connect</span>
        </div>
      </NavLink>
      <NavLink to="/chats" className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-message mt-2"></i>
          <span className={navStyles.NavText}>Chats</span>
        </div>
      </NavLink>
      <NavLink to="/notifications" className={`${navStyles.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-bell mt-2"></i>
          <span className={navStyles.NavText}>Notifications</span>
        </div>
      </NavLink>
    </>
  );
};

export default LoggedInEmployeeIcons;