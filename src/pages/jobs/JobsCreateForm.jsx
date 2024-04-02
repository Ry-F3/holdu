import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import formStyles from "../../styles/JobsCreateForm.module.css";
import spinnerStyle from "../../styles/Spinner.module.css"
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";

import dataImage from "../../assets/dataImage.png";
import Asset from "../../components/Asset";
import Spinner from "../../components/Spinner";

function JobsCreateForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [recentAds, setRecentAds] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    closing_date: "",
  });
  const { title, description, location, salary, closing_date } = formData;

  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    // Fetch recent ads data from the backend API
    const fetchRecentAds = async () => {
      try {
        // Check if current user data is available
        if (currentUser) {
          let nextPage = '/jobs/';
          const allResults = [];
          
          // Fetch data recursively until there's no next page
          while (nextPage) {
            const response = await axios.get(nextPage);
            const data = response.data;
            
            // Concatenate the results to the allResults array
            allResults.push(...data.results);
            
            // Update nextPage with the URL of the next page
            nextPage = data.next;
          }
  
          // Set the concatenated results to the state
          setRecentAds({ count: allResults.length, results: allResults });
        }
      } catch (error) {
        console.error("Error fetching recent ads:", error);
      }
    };
  
    fetchRecentAds();
  }, [currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); 
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("salary", salary);
    formData.append("closing_date", closing_date);

    try {
      await axiosReq.post("/jobs/post/", formData);
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    // Declare handleChange as a function
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <div>
      <h1 className="text-center mt-2 p-2 mb-5">
        Post <i class="far fa-address-card"></i> <br /> Job Advert{" "}
      </h1>

      <Form.Group className="pr-1 pl-1" controlId="formTitle">
        <Form.Label className="d-none">Title:</Form.Label>
        <Form.Control
          name="title"
          type="text"
          value={title}
          placeholder="Job title"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formDescription p-1">
        <Form.Label className="d-none">Description:</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          value={description}
          placeholder="Job description"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formLocation">
        <Form.Label className="d-none">Location:</Form.Label>
        <Form.Control
          type="text"
          value={location}
          placeholder="Location"
          onChange={handleChange}
          name="location"
          required
        />
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formSalary">
        <Form.Label className="d-none">Salary:</Form.Label>
        <Form.Control
          type="number"
          value={salary}
          placeholder="Salary"
          onChange={handleChange}
          name="salary"
        />
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formClosingDate">
        <Form.Label className="">Closing Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={closing_date}
          onChange={handleChange}
          name="closing_date"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12} lg={8} className="py-2 p-md-2">
        <Container
          className={`${appStyles.Content} ${formStyles.minHeightContent} d-flex flex-column justify-content-center position-relative`}
        >
          <Form.Group className="align-items-center`">
            {loading ? (
              <div className={`${spinnerStyle.spinnerContain}`}>
                <Spinner size="50px" />
              </div>
            ) : (
              <Container>
                {console.log("Recent Ads:", recentAds)} {/* Log recentAds */}
                {recentAds.results &&
                recentAds.results.some(
                  (ad) =>
                    ad.employer_profile.owner_username ===
                    currentUser.username

                ) ? (
                  <ul>
                    {recentAds.results
                      .filter(
                        (ad) =>
                          ad.employer_profile.owner_username ===
                          currentUser.username
                      )
                      .map((ad) => (
                        <li key={ad.job_listing_id}>
                          <h3>{ad.title}</h3>
                          <p>{ad.description}</p>
                          <p>Location: {ad.location}</p>
                          <p>Salary: {ad.salary}</p>
                          <p>Closing Date: {ad.closing_date}</p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <Asset
                    src={dataImage}
                    message="Your Recent Advert Posts is Empty"
                  />
                )}
              </Container>
            )}
          </Form.Group>
        </Container>
      </Col>
      <Col md={12} lg={4} className="p-0 p-md-2">
        <Container>
          <div
            className={`${appStyles.Content} ${formStyles.triangleGradient} d-flex flex-column justify-content-center`}
          >
            <Container className="p-3">{textFields}</Container>
          </div>
        </Container>
      </Col>
    </Row>
  </Form>
  );
}

export default JobsCreateForm;
