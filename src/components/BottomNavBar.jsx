import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/NavBar.module.css";
import stylesBottom from "../styles/BottomNav.module.css";

import Spinner from "../components/Spinner";

import { useProfileData } from "../contexts/ProfileContext";
import LoggedInEmployerIconsBottom from "./LoggedInEmployerIconsBottom";
import LoggedInEmployeeIconsBottom from "./LoggedInEmployeeIconsBottom";
import LoggedOutIcons from "./LoggedOutIcons";

const BottomNavBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const currentUser = useCurrentUser();
  const profileData = useProfileData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Navbar
      bg="white"
      fixed="bottom"
      className={`border-top d-lg-none ${styles.NavHeight} ${
        styles.BottomNavBar
      } ${visible ? stylesBottom.Show : styles.Hide}`}>
      <Container className="justify-content-center">
        <Nav>
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              {!currentUser && (
                <div className="align-items-center d-flex">
                  <LoggedOutIcons />
                </div>
              )}
              {currentUser &&
                profileData &&
                profileData.is_signup_completed && (
                  <div className="text-center">
                    {profileData.profile_type === "employer" ? (
                      <LoggedInEmployerIconsBottom />
                    ) : (
                      <LoggedInEmployeeIconsBottom />
                    )}
                  </div>
                )}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BottomNavBar;
