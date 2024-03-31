import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import formStyles from "../../styles/JobsCreateForm.module.css"

function JobsCreateForm() {
  //   const [errors, setErrors] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [closingDate, setClosingDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title,
      description,
      location,
      salary,
      closingDate,
    };
    // Handle form submission
    console.log(formData);
    // Reset form fields
    setTitle("");
    setDescription("");
    setLocation("");
    setSalary("");
    setClosingDate("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${formStyles.triangleGradient} d-flex flex-column justify-content-center`}>
                  <Image src={"https://res.cloudinary.com/dwkn0vexk/image/upload/v1711924204/together2_govkoe.png"} fluid />

          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container>
          <Container
            className={`${appStyles.Content} ${formStyles.triangleGradient} d-flex flex-column justify-content-center`}>
            <Container className="p-3">
              <h1 className="text-center mt-2 p-2 mb-5">Post <i class="far fa-address-card"></i> <br /> Job Advert </h1>

            
              <Form.Group className="pr-1 pl-1" controlId="formTitle">
                <Form.Label className="d-none">Title:</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job title"
                  required
                />
              </Form.Group>

              <Form.Group className="pr-1 pl-1" controlId="formDescription p-1">
                <Form.Label className="d-none">Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Job description"
                  required
                />
              </Form.Group>

              <Form.Group className="pr-1 pl-1" controlId="formLocation">
                <Form.Label className="d-none">Location:</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  required
                />
              </Form.Group>

              <Form.Group className="pr-1 pl-1" controlId="formSalary">
                <Form.Label className="d-none">Salary:</Form.Label>
                <Form.Control
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Salary"
                />
              </Form.Group>

              <Form.Group className="pr-1 pl-1" controlId="formClosingDate">
                <Form.Label className="">Closing Date:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                  placeholder="Closing date"
                  required
                />
              </Form.Group>
            </Container>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div className="d-md-none"></div>
          </Container>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default JobsCreateForm;
