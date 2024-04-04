import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileContext";

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
import JobAdListItem from "../../components/JobAdListItem";
import DummyBoxes from "../../components/DummyBoxes";

function JobsCreateForm() {
  const [setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editListingId, setEditListingId] = useState(null); // State to store the ID of the listing being edited
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    closing_date: "",
  });
  const { title, description, location, salary, closing_date } = editFormData;

  const [recentAds, setRecentAds] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    closing_date: "",
    created_at: "",
  });
  const {
    title: newTitle,
    description: newDescription,
    location: newLocation,
    salary: newSalary,
    closing_date: newClosingDate,
  } = formData;

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

  // Function to handle edit button click
  const handleEdit = (listingId) => {
    const listingToEdit = recentAds.results.find(
      (ad) => ad.job_listing_id === listingId
    );
    if (listingToEdit) {
      // Set edit mode to true
      setEditMode(true);
      // Set the ID of the listing being edited
      setEditListingId(listingId);
      // Populate the editFormData with the information of the listing being edited
      setEditFormData({
        title: listingToEdit.title,
        description: listingToEdit.description,
        location: listingToEdit.location,
        salary: listingToEdit.salary,
        closing_date: listingToEdit.closing_date,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("title", editMode ? editFormData.title : newTitle);
    data.append(
      "description",
      editMode ? editFormData.description : newDescription
    );
    data.append("location", editMode ? editFormData.location : newLocation);
    data.append("salary", editMode ? editFormData.salary : newSalary);
    data.append(
      "closing_date",
      editMode ? editFormData.closing_date : newClosingDate
    );
    data.append("applicants", null);

    try {
      if (editMode) {
        // Send a request to edit the job listing
        await axiosReq.put(`/jobs/post/${editListingId}/`, data);
      } else {
        // Send a request to create a new job listing
        await axiosReq.post("/jobs/post/", data);
      }
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

  // Function to handle cancel button click
  const handleCancel = () => {
    // Reset edit mode and editFormData
    setEditMode(false);
    setEditListingId(null);
    setEditFormData({
      title: "",
      description: "",
      location: "",
      salary: "",
      closing_date: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (editMode) {
      // Update editFormData when in edit mode
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // Update formData when not in edit mode
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const textFields = (
    <div>
      <h1 className="text-center mt-2 p-2 mb-5">
        {editMode ? "Edit" : "Post"} <i className="far fa-address-card"></i>{" "}
        <br /> Job Advert{" "}
      </h1>

      <Form.Group className="pr-1 pl-1" controlId="formTitle">
        <Form.Label className="d-none">Title:</Form.Label>
        <Form.Control
          name="title"
          type="text"
          value={editMode ? title : newTitle}
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
          value={editMode ? description : newDescription}
          placeholder="Job description"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formLocation">
        <Form.Label className="d-none">Location:</Form.Label>
        <Form.Control
          type="text"
          value={editMode ? location : newLocation}
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
          value={editMode ? salary : newSalary}
          placeholder="Salary"
          onChange={handleChange}
          name="salary"
        />
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formClosingDate">
        <Form.Label className="">Closing Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={editMode ? closing_date : newClosingDate}
          onChange={handleChange}
          name="closing_date"
          required
        />
      </Form.Group>

      <Button type="submit">{editMode ? "Edit Ad" : "Post Ad"}</Button>
      {editMode && (
        <Button className="ml-2" onClick={handleCancel}>
          Cancel
        </Button>
      )}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12} lg={8} className="py-2 p-md-2">
          <Container
            style={{ backgroundColor: "transparent", border: "none" }}
            className={`${appStyles.Content} ${formStyles.minHeightContent} d-flex flex-column justify-content-center position-relative`}>
            <Form.Group className="align-items-center`">
              {loading ? (
                <div className={`${spinnerStyle.spinnerContain}`}>
                  <Spinner size="50px" />
                </div>
              ) : (
                <Container className="">
                  {recentAds.results &&
                  recentAds.results.some(
                    (ad) =>
                      ad.employer_profile.owner_username ===
                      currentUser.username
                  ) ? (
                    <>
                      <div className="d-flex justify-content-between bg-white p-3 rounded border align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          {/* Add user's image */}
                          <img
                            src={profileData.image}
                            alt="User"
                            className="mr-2"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          {/* Heading */}
                          <h2 className="mb-0 mr-2 small">
                            {profileData.name}'s recent listings:
                          </h2>
                        </div>
                        {/* Conditionally render the "View More" button */}
                        {recentAds.results.length > 4 && (
                          <Button
                            className="btn btn-primary"
                            onClick={() => {}}>
                            View More
                          </Button>
                        )}
                      </div>
                      <ul className={`list-unstyled p-2 `}>
                        {recentAds.results
                          .slice(0, 4)
                          .filter(
                            (ad) =>
                              ad.employer_profile.owner_username ===
                              currentUser.username
                          )
                          .map((ad, index) => (
                            <JobAdListItem
                              key={index}
                              ad={ad}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                            />
                          ))}
                        {/* Add dummy boxes for remaining listings */}
                        {[...Array(4 - recentAds.results.length)].map(
                          (_, index) => (
                            <DummyBoxes key={`dummy-${index}`} widths={[200, 150, 100, 120, 130, 150, 180, 190]} />
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <Asset
                      src={dataImage}
                      message="Opps your job listings are empty"
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
