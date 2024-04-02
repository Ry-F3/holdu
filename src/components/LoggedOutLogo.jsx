import { NavLink } from 'react-router-dom';
import {
    Navbar,
  } from "react-bootstrap";
import logo from "../assets/logo.png";

const LoggedOutLogo = () => {
  return (
    <>
      <NavLink to={"/"} className="d-flex align-items-center pointer">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="40" className="mr-2" />
          <span>holdu</span>
        </Navbar.Brand>
      </NavLink>
    </>
  )
}

export default LoggedOutLogo