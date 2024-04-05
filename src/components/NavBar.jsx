import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import styles from "../App.module.css";
import nav from "../styles/NavBar.module.css";
import LoggedInEmployeeIcons from "./LoggedInEmployeeIcons";
import LoggedInEmployerIcons from "./LoggedInEmployerIcons";
import { NavLink } from "react-router-dom";
import { useProfileData } from "../contexts/ProfileContext";
import Spinner from "../components/Spinner";

import {
  useCurrentUser,
  useSetCurrentUser,
  useSetLoginCount,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import { useHistory } from "react-router-dom";
import LoggedInLogo from "./LoggedInLogo";
import LoggedOutLogo from "./LoggedOutLogo";

const NavBar = ({ handleSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const profileData = useProfileData();
  const setLoginCount = useSetLoginCount();
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Set isLoading to true initially
    setIsLoading(true);

    if (profileData) {
      // If profileData exists, set isLoading to false
      setIsLoading(false);
    }
  }, [profileData, setIsLoading]);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setLoginCount(0);
      localStorage.removeItem("loginCount");
      setCurrentUser(null);
      setIsLoading(false);
      // Redirect to home page after signing out
      console.log("Redirecting to home page...");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

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

  const loggedInIcons = (
    <>
      <Nav.Link to={`/profiles/${currentUser?.profile_id}`}>
        <div className="d-flex align-items-center">
          <Avatar src={currentUser?.profile_image} height={40} />
          <span>{currentUser?.username}</span>
        </div>
      </Nav.Link>

      <Nav.Link onClick={handleSignOut}>
        <div className="d-flex align-items-center">
          <i className="fas fa-sign-out mr-2"></i>
          <span>Sign out</span>
        </div>
      </Nav.Link>
    </>
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };

  // Function to handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Navbar
      bg="white"
      fixed="light"
      className={`border-bottom ${nav.NavHeight}`}>
      <Container className="d-flex align-items-center justify-content-between">
        {/* Render loading indicator only if isLoading is true */}
        {currentUser ? <LoggedInLogo /> : <LoggedOutLogo />}
        <Nav className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-5">
            <Form inline onSubmit={handleSubmit}>
              <FormControl
                type="text"
                placeholder="Search Jobs"
                className="mr-sm-2"
                name="search"
                value={searchValue}
                onChange={handleChange} // Use onChange event for search input
              />

              <Button variant="white" className="btn-transparent" type="sumbit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {currentUser && profileData && profileData.is_signup_completed ? (
                // If the user has completed signup, render icons based on profile type
                profileData.profile_type === "employer" ? (
                  <LoggedInEmployerIcons />
                ) : (
                  <LoggedInEmployeeIcons />
                )
              ) : (
                // If currentUser doesn't exist or signup is not completed, render nothing
                console.log("Rendering nothing...")
              )}

              {/* Conditional rendering of div */}
              {currentUser && profileData && profileData.is_signup_completed ? (
                <div className={`${styles.verticalLine} mr-3`}></div>
              ) : null}
            </>
          )}
          <div>
            <p className="mb-0 mr-2">Tagline</p> {/* Tagline */}
          </div>
          <div className={styles.verticalLine}></div> {/* Vertical line */}
          {/* Render icons based on currentUser */}
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
