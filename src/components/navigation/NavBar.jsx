import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
// Bootstrap
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
  useSetLoginCount,
} from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileContext";
// Styles
import styles from "../../App.module.css";
import nav from "../../styles/NavBar.module.css";
import navBottom from "../../styles/BottomNav.module.css";
// Components
import LoggedInEmployeeIcons from "./LoggedInEmployeeIcons";
import LoggedInEmployerIcons from "./LoggedInEmployerIcons";
import Spinner from "../Spinner";
import Avatar from "../Avatar";
import LoggedInLogo from "./LoggedInLogo";
import LoggedOutLogo from "./LoggedOutLogo";

const NavBar = ({ handleSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const profileData = useProfileData();
  const setLoginCount = useSetLoginCount();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);
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
      // profileData(null);
      setIsLoading(false);
      // Redirect to home page after signing out
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
      <NavLink
        className="text-muted mr-2"
        to={`/profiles/${currentUser?.profile_id}/user/`}>
        <div className="d-flex align-items-center">
          <Avatar src={currentUser?.profile_image} height={40} border={false} />
          <span className="d-none d-lg-flex align-items-center">
            {currentUser?.username}
          </span>
        </div>
      </NavLink>

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
    setIsSearchActive(!!e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmptySearch = searchValue.trim() === "";

    if (isEmptySearch) {
      // Clear the search value and deactivate search
      setSearchValue("");
      handleSearch("");
    } else {
      // Perform search based on the search value
      history.push(`/`);
      handleSearch(searchValue);
      setIsSearchActive(!!searchValue);
    }

    // Update the search state based on whether search is active or not
    setIsSearchActive(!isEmptySearch);
    isHomePageOrJobsPage();
    determineSearchIcon();
    setIsButtonVisible(false);
    setIsClearButtonVisible(true);
  };

  const isHomePageOrJobsPage = () => {
    const { pathname } = history.location;
    return pathname === "/" || pathname === "/jobs/post";
  };

  const handleClearSearch = () => {
    setSearchValue("");
    handleSearch("");

    // Update the visibility of the clear button and search icon using functional setState
    setIsClearButtonVisible((prevState) => {
  
      return false;
    });

    setIsButtonVisible((prevState) => {
    
      return true;
    });
  };

  const determineSearchIcon = () => {
    if (searchValue.trim() === "") {
     
      return <i className="fa-solid fa-magnifying-glass"></i>;
    } else {
   
      return <i onClick={handleClearSearch} className="fas fa-times"></i>;
    }
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
              <div className="d-none d-lg-flex align-items-center">
                {" "}
                <Button
                  type={searchValue.trim() !== "" ? "submit" : "button"}
                  className="btn-transparent"
                  style={{ display: isButtonVisible ? "block" : "none" }}>
                  {isHomePageOrJobsPage() ? (
                    determineSearchIcon()
                  ) : (
                    <i className="fa-solid fa-magnifying-glass"></i>
                  )}
                </Button>
                <Button
                  type="button"
                  className="btn-transparent"
                  style={{ display: isClearButtonVisible ? "block" : "none" }}
                  onClick={handleClearSearch}>
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </Form>
          </div>
          {isLoading ? (
            <div className="d-none d-xl-flex">
              <Spinner />
            </div>
          ) : (
            <>
              {currentUser && profileData && profileData.is_signup_completed ? (
                // If the user has completed signup, render icons based on profile type
                profileData.profile_type === "employer" ? (
                  <>
                    <div className="d-none d-xl-flex">
                      <LoggedInEmployerIcons />
                    </div>
                    <div>
                      <Nav.Link
                        className={navBottom.HideSignOut}
                        onClick={handleSignOut}>
                        <div className="d-flex d-xl-none  align-items-center">
                          <i className="fas fa-sign-out mr-2"></i>
                          {/* <span>Sign out</span> */}
                        </div>
                      </Nav.Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-none d-xl-flex">
                      <LoggedInEmployeeIcons />
                    </div>
                    <div>
                      <Nav.Link
                        className={navBottom.HideSignOut}
                        onClick={handleSignOut}>
                        <div className="d-flex d-xl-none align-items-center">
                          <i className="fas fa-sign-out mr-2"></i>
                          {/* <span>Sign out</span> */}
                        </div>
                      </Nav.Link>
                    </div>
                  </>
                )
              ) : (
                // If currentUser doesn't exist or signup is not completed, render nothing
                console.log("Rendering nothing...")
              )}

              {/* Conditional rendering of div */}
              {currentUser && profileData && profileData.is_signup_completed ? (
                <div
                  className={`${styles.verticalLine} d-none d-sm-flex align-items-center mr-3`}></div>
              ) : null}
            </>
          )}
          <div className="d-none d-lg-flex">
            <p className="mb-0 mr-2">Tagline</p> {/* Tagline */}
          </div>
          <div className={`${styles.verticalLine}  d-none d-lg-flex`}></div>{" "}
          {/* Vertical line */}
          {/* Render icons based on currentUser */}
          <div className="d-none d-sm-flex align-items-center">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
