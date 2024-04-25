import React from 'react';
// Bootstrap
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// Styles
import nav from "../../styles/NavBar.module.css";


const LoggedOutIcons = () => {
  return (
    <>
      <NavLink activeClassName={nav.Active} to="/signup" className="mr-2">
        <span>Join now</span>
      </NavLink>
      <NavLink to="/signin">
        <div className="mr-1 d-flex flex-column align-items-center rounded">
          <Button aria-label="sign in">Sign In</Button>
        </div>
      </NavLink>
    </>
  );
};

export default LoggedOutIcons;