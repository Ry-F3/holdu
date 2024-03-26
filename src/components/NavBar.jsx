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

const NavBar = () => {
  return (
    <Navbar bg="white" fixed="light" className="border-bottom">
      <Container className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="40" className="mr-2" />
            <span>holdu</span>
          </Navbar.Brand>
        </div>

        <Nav className="d-flex align-items-center">
          {/* <Nav.Link>
            <div className="d-flex flex-column align-items-center">
              <i className="fa-solid fa-briefcase"></i>
              <span>Jobs</span>
            </div>
          </Nav.Link> */}
          <div className="d-flex align-items-center mr-3">
            <Form className="ml-1 d-flex">
              <FormControl
                type="search"
                placeholder="Search Jobs"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="white" className="btn-transparent">
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form>
          </div>
          <div>
            <p className="mb-0 mr-2">Tagline for the app</p> {/* Tagline */}
          </div>
          <div className={styles.verticalLine}></div> {/* Vertical line */}
          <Nav.Link>
            <div className="mr-1">
              <span>Join now</span>
            </div>
          </Nav.Link>
          <Nav.Link>
            <div className="mr-1 d-flex flex-column align-items-center">
              <Button variant="outline-primary" className="rounded">
                Sign In
              </Button>
            </div>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
