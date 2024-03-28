import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../App.module.css";
import nav from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <Nav.Link to={`/profiles/${currentUser?.profile_id}`}>
        <div className="d-flex flex-column align-items-center">
          {/* <i className="fas fa-sign-out"></i> */}

          <img src={currentUser?.profile_image} alt="profile" />
          <span>{currentUser?.username}</span>
        </div>
      </Nav.Link>
      {/* {currentUser?.username} */}
      <Nav.Link onClick={handleSignOut}>
        <div className="d-flex flex-column align-items-center">
          <i className="fas fa-sign-out"></i>
          <span>Sign out</span>
        </div>
      </Nav.Link>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink activeClassName={nav.Active} to="/signup" className="mr-2">
        <span>Join now</span>
      </NavLink>
      <NavLink to="/signin">
        <div className="mr-1 d-flex flex-column align-items-center rounded">
          <Button>Sign In</Button>
        </div>
      </NavLink>
    </>
  );

  return (
    <Navbar bg="white" fixed="light" className="border-bottom">
      <Container className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="40" className="mr-2" />
              <span>holdu</span>
            </Navbar.Brand>
          </NavLink>
        </div>

        <Nav className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-3">
            <Form className="ml-1 d-flex">
              <FormControl
                type="search"
                placeholder="Search Jobs"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="white" className="btn-transparent">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form>
          </div>
          <div>
            <p className="mb-0 mr-2">Tagline for the app</p> {/* Tagline */}
          </div>
          <div className={styles.verticalLine}></div> {/* Vertical line */}
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
