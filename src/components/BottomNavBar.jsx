import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  useCurrentUser,
  useSetCurrentUser,
  useSetLoginCount,
} from "../contexts/CurrentUserContext";
import styles from "../styles/NavBar.module.css";
import stylesBottom from "../styles/BottomNav.module.css"
import LoggedInEmployeeIcons from "./LoggedInEmployeeIcons";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";
import { useProfileData } from "../contexts/ProfileContext";
import LoggedInEmployerIconsBottom from "./LoggedInEmployerIconsBottom";

const BottomNavBar = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  }, [prevScrollPos, visible]);

  const currentUser = useCurrentUser();
  const profileData = useProfileData();

  useEffect(() => {
    setIsLoading(true);
    if (profileData) {
      setIsLoading(false);
    }
  }, [profileData, setIsLoading]);

  return (
    <Navbar
      bg="white"
      fixed="bottom"
      className={`border-top d-lg-none ${styles.NavHeight} ${
        styles.BottomNavBar
      } ${visible ? stylesBottom.Show : styles.Hide}`}
    >
      <Container className="justify-content-center">
        <Nav>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {currentUser && profileData && profileData.is_signup_completed ? (
                profileData.profile_type === "employer" ? (
                  <div className="text-center">
                    <LoggedInEmployerIconsBottom />
                  </div>
                ) : (
                  <LoggedInEmployeeIcons />
                )
              ) : null}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BottomNavBar;
