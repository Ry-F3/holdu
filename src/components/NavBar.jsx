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
import { useProfileData } from "../contexts/ProfileContext";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const profileData = useProfileData();
 

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

  // const loggedInEmployeeIcons = (
  //   <>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-house"></i>
  //         <span>Home</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-user-group"></i>
  //         <span>Connect</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-message"></i>
  //         <span>Chats</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-briefcase"></i>
  //         <span>Jobs</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-bell"></i>
  //         <span>Notifications</span>
  //       </div>
  //     </Nav.Link>
  //   </>
  // );

  // const loggedInEmployerIcons = (
  //   <>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-house"></i>
  //         <span>Home</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-user-group"></i>
  //         <span>Connect</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-message"></i>
  //         <span>Chats</span>
  //       </div>
  //     </Nav.Link>
  //     <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-briefcase"></i>
  //         <span>Jobs</span>
  //       </div>
  //     </Nav.Link>
  //     {/* <Nav.Link>
  //       <div className="d-flex flex-column align-items-center">
  //         <i className="fa-solid fa-bell"></i>
  //         <span>Notifications</span>
  //       </div>
  //     </Nav.Link> */}
  //   </>
  // );

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
        {profileData && profileData.is_signup_completed ? (
          <NavLink
            to={"/"}
            className="d-flex align-items-center pointer"
            >
            <Navbar.Brand>
              <img src={logo} alt="logo" height="40" className="mr-2" />
              <span>holdu</span>
            </Navbar.Brand>
          </NavLink>
        ) : (
          <Navbar.Brand
            
            className="d-flex align-items-center pointer">
            <img src={logo} alt="logo" height="40" className="mr-2" />
            <span>holdu</span>
          </Navbar.Brand>
        )}

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
          <div className="d-flex">
            {/* {currentUser.isEmployer ? loggedInEmployerIcons : loggedInEmployeeIcons} */}
          </div>
          <div>
            <p className="mb-0 mr-2">Tagline</p> {/* Tagline */}
          </div>
          <div className={styles.verticalLine}></div> {/* Vertical line */}
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
