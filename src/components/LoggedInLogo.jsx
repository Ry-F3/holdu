import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useProfileData } from "../contexts/ProfileContext";

const LoggedInLogo = () => {
  const profileData = useProfileData();

  return (
    <>
      {profileData && profileData.is_signup_completed ? (
        <NavLink to={"/"} className="d-flex align-items-center pointer">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="40" className="mr-2" />
            <span>holdu</span>
          </Navbar.Brand>
        </NavLink>
      ) : (
        <Navbar.Brand className="d-flex align-items-center pointer">
          <img src={logo} alt="logo" height="40" className="mr-2" />
          <span>holdu</span>
        </Navbar.Brand>
      )}
    </>
  );
};

export default LoggedInLogo;
