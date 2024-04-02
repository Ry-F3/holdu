import React from 'react';
import { NavLink } from 'react-router-dom';
import nav from '../styles/NavBar.module.css'

const LoggedInEmployerIcons = () => {
  return (
    <>
      <NavLink to="/" className={`${nav.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-house mt-2"></i>
          <span className={nav.NavText}>Home</span>
        </div>
      </NavLink>
      <NavLink to="/connect" className={`${nav.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-user-group mt-2"></i>
          <span className={nav.NavText}>Connect</span>
        </div>
      </NavLink>
      <NavLink to="/chats" className={`${nav.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-message mt-2"></i>
          <span className={nav.NavText}>Chats</span>
        </div>
      </NavLink>
      <NavLink to="/jobs/post" className={`${nav.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-briefcase mt-2"></i>
          <span className={nav.NavText}>Jobs</span>
        </div>
      </NavLink>
      <NavLink to="/notifications" className={`${nav.Pointer} mr-3 text-muted`}>
        <div className="d-flex flex-column align-items-center">
          <i className="fa-solid fa-bell mt-2"></i>
          <span className={nav.NavText}>Notifications</span>
        </div>
      </NavLink>
    </>
  );
};

export default LoggedInEmployerIcons;