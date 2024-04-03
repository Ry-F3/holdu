import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileContext";
// import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import formStyles from "../../styles/JobsCreateForm.module.css";
import spinnerStyle from "../../styles/Spinner.module.css";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

import dataImage from "../../assets/dataImage.png";
import Asset from "../../components/Asset";
import Spinner from "../../components/Spinner";
import { useHistory } from "react-router-dom";

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
  const profileData = useProfileData();

  useEffect(() => {
    // Fetch recent ads data from the backend API
    const fetchRecentAds = async () => {
      try {
        // Check if current user data is available
        if (currentUser) {
          let nextPage = "/jobs/";
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
    formData.append("applicants", null);

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

  const handleDelete = async (jobListingId) => {
    try {
      console.log("Deleting job listing...");
      // Send a request to delete the job listing from the database
      await axiosReq.delete(`/jobs/post/${jobListingId}/`);
      console.log("Job listing deleted successfully.");
  
      // Remove the job listing from the UI only if the deletion was successful
      setRecentAds((prevAds) => ({
        ...prevAds,
        results: prevAds.results.filter(
          (ad) => ad.job_listing_id !== jobListingId
        ),
      }));
    } catch (error) {
      console.error("Error deleting job listing:", error);
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
        Post <i className="far fa-address-card"></i> <br /> Job Advert{" "}
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
            className={`${appStyles.Content} ${formStyles.minHeightContent} d-flex flex-column justify-content-center position-relative`}>
            <Form.Group className="align-items-center`">
              {loading ? (
                <div className={`${spinnerStyle.spinnerContain}`}>
                  <Spinner size="50px" />
                </div>
              ) : (
                <Container className="">
                  {console.log("Recent Ads:", recentAds)} {/* Log recentAds */}
                  {recentAds.results &&
                  recentAds.results.some(
                    (ad) =>
                      ad.employer_profile.owner_username ===
                      currentUser.username
                  ) ? (
                    <>
                      <h2 className="mr-5 mb-2 mt-3 p-2">
                        {profileData.name}'s recent listings:
                      </h2>
                      {/* Conditionally render the "View More" button */}
                      {recentAds.results.length > 4 && (
                        <Button
                          className="btn btn-primary mb-2 mt-1 ml-2"
                          onClick={() => {}}>
                          View More
                        </Button>
                      )}
                      <ul className={`list-unstyled   p-2 `}>
                        {recentAds.results
                          .slice(0, 4)
                          .filter(
                            (ad) =>
                              ad.employer_profile.owner_username ===
                              currentUser.username
                          )
                          .map((ad, index) => (
                            <li
                              key={ad.job_listing_id}
                              className="py-3 mb-3 rounded bg-light p-3 position-relative">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h3 className="mb-1">{ad.title} </h3>
                                  <div className="d-flex align-items-center">
                                    <p className="mb-0 mr-3 small">
                                      {ad.location}{" "}
                                      <i className="fas fa-map-marker-alt text-muted"></i>
                                    </p>

                                    <p className="mb-0 small mr-2">
                                      £{ad.salary}/hr
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="position-relative">
                                    <div
                                      className={`${appStyles.myPointer} d-flex align-items-center justify-content-end`}>
                                      <Button
                                        className="mb-5 d-flex align-items-center justify-content-center"
                                        onClick={() =>
                                          handleDelete(ad.job_listing_id)
                                        }>
                                        <i className="fas fa-times"></i>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <p className="mb-1 mb-2 small">
                                  Job Description: {ad.description}
                                </p>
                                <div className="d-flex align-items-center">
                                  <p
                                    className="mb-0 mt-1 small"
                                    style={{
                                      width: "200px",
                                      height: "28px",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                      padding: "4px",
                                      paddingLeft: "16px",
                                    }}>
                                    Closing Date: {ad.closing_date}
                                  </p>
                                  <p
                                    className={`${appStyles.myPointer} mb-0 mr-5 ml-3`}
                                    onClick={() => {}}>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                  </p>

                                  <span className="mr-1">Aplicants:</span>
                                  <span className="badge bg-secondary text-white">
                                    {ad.applicants ? ad.applicants.length : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="position-relative mr-5">
                                {/* Font Awesome icons for delete and edit */}
                              </div>
                            </li>
                          ))}
                        {/* Add dummy boxes for remaining listings */}
                        {[...Array(4 - recentAds.results.length)].map(
                          (_, index) => (
                            <li
                              key={`dummy-${index}`}
                              className=" py-3 mb-3 rounded bg-light p-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column">
                                  <div
                                    className="mb-1 small"
                                    style={{
                                      width: "200px",
                                      height: "16px",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                    }}></div>
                                  <div
                                    className="mb-1 small"
                                    style={{
                                      width: "150px",
                                      height: "16px",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                    }}></div>
                                  <div
                                    className="mb-1 small"
                                    style={{
                                      width: "100px",
                                      height: "16px",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                    }}></div>
                                  <div
                                    className="mb-1 small"
                                    style={{
                                      width: "130px",
                                      height: "16px",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                    }}></div>
                                  <div
                                    className="small"
                                    style={{
                                      width: "180px",
                                      height: "16px",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "5px",
                                    }}></div>
                                </div>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <Asset
                      src={dataImage}
                      message="Your recent job listings are mpty"
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
              className={`${appStyles.Content} ${formStyles.triangleGradient} d-flex flex-column justify-content-center`}>
              <Container className="p-3">{textFields}</Container>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default JobsCreateForm;
