import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation, useHistory } from "react-router-dom";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileContext";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// Styles
import appStyles from "../../App.module.css";
import formStyles from "../../styles/JobsCreateForm.module.css";
import spinnerStyle from "../../styles/Spinner.module.css";
// Image
import dataImage from "../../assets/dataImage.png";
// Components
import Asset from "../../components/Asset";
import Spinner from "../../components/Spinner";
import JobAdListItem from "../../components/job/JobAdListItem";
import DummyBoxes from "../../components/miscellaneous/DummyBoxes";
import Avatar from "../../components/Avatar";

function JobsCreateForm({ searchQuery, fetchApplicants }) {
  const [error, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPostAdForm, setShowPostAdForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showImageAndMessage, setShowImageAndMessage] = useState(true);
  // eslint-disable-next-line
  const [filterIsActive, setIsFilterActive] = useState(false);

  const [toggleState, setToggleState] = useState(null);

  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editListingId, setEditListingId] = useState(null); // State to store the ID of the listing being edited
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    closingDate: "",
  });
  const { title, description, location, salary, closingDate } = editFormData;

  const [recentAds, setRecentAds] = useState([]);
  const [currentUserAds, setCurrentUserAds] = useState([]);
  // eslint-disable-next-line
  const [notUserAds, setNotUserAds] = useState([]);
  const [isListingClosed, setIsListingClosed] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    closingDate: "",
    created_at: "",
  });
  const {
    title: newTitle,
    description: newDescription,
    location: newLocation,
    salary: newSalary,
    closingDate: newClosingDate,
  } = formData;

  const currentUser = useCurrentUser();
  const profileData = useProfileData();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        let apiUrl;
        if (searchQuery) {
          apiUrl = `/jobs/?search=${searchQuery}`;
        } else {
          apiUrl = "/jobs/";
        }
        const { data } = await axiosReq.get(apiUrl);
        if (isMounted) {
          setCurrentUserAds(
            data.results.filter(
              (ad) =>
                ad.employer_profile.owner_username === currentUser.username
            )
          );
          setNotUserAds(
            data.results.filter(
              (ad) =>
                ad.employer_profile.owner_username !== currentUser.username
            )
          );
          setRecentAds(data);

          // Close the job ad post if in mobile view and user is searching
          if (window.innerWidth <= 993 && searchQuery) {
            setShowPostAdForm(false);
          }
        }
      } catch (error) {
        // Do nothing
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [pathname, searchQuery, currentUser, setShowPostAdForm, setNotUserAds]);

  const filterJobsByListingClosed = (currentUserAds, isListingClosed) => {
    if (isListingClosed === true) {
      // Show only closed listings and corresponding applicants
      const filteredJobs = currentUserAds.filter(
        (ad) => ad.is_listing_closed === true
      );
      return filteredJobs.map((job) => ({
        ...job,
        applicants: job.applicants.filter(
          (applicant) => applicant.is_listing_closed === true
        ),
      }));
    } else if (isListingClosed === false) {
      // Show only open listings and corresponding applicants
      const filteredJobs = currentUserAds.filter(
        (ad) => ad.is_listing_closed === false
      );
      return filteredJobs.map((job) => ({
        ...job,
        applicants: job.applicants.filter(
          (applicant) => applicant.is_listing_closed === false
        ),
      }));
    } else {
      // Show all listings when isListingClosed is not explicitly set
      // Sort by closing date in descending order
      return currentUserAds
        .slice()
        .sort((b, a) => new Date(b.closingDate) - new Date(a.closingDate))
        .map((job) => ({
          ...job,
          applicants: job.applicants
            .slice()
            .sort((a, b) => new Date(b.closingDate) - new Date(a.closingDate)),
        }));
    }
  };

  // Define the toggle handler
  const handleToggleFilter = () => {
    // Ensure sortedCurrentUserAds is an array before using some method
    if (!Array.isArray(sortedCurrentUserAds)) {
      // Do nothing
      return;
    }

    // Check if there are both open and closed ads available
    const hasOpenAds = sortedCurrentUserAds.some((ad) => !ad.is_listing_closed);
    const hasClosedAds = sortedCurrentUserAds.some(
      (ad) => ad.is_listing_closed
    );

    if (toggleState === null) {
      setIsFilterActive(false);
      if (hasClosedAds === false) {
        // If there are no closed ads, exit the condition block
        return;
      }
      if (hasOpenAds) {
        setIsFilterActive(true);
        setIsListingClosed(false); // Show only open ads initially
        setToggleState(true);
      } else if (hasClosedAds) {
        setIsFilterActive(true);
        setIsListingClosed(true); // Show only closed ads if no open ads available
        setToggleState(false);
      } else {
        setIsFilterActive(false);
        setIsListingClosed(null); // Revert to default if no open or closed ads available
        setToggleState(null);
      }
    } else if (toggleState === true) {
      // Toggle from open to closed
      setIsFilterActive(true);
      setIsListingClosed(true); // Show only closed ads
      setToggleState(false);
    } else {
      // Toggle from closed to default
      setIsFilterActive(false);
      setIsListingClosed(null); // Revert to default
      setToggleState(null);
    }

    setShowPostAdForm(false);
  };

  const sortedCurrentUserAds = filterJobsByListingClosed(
    currentUserAds,
    isListingClosed
  );

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
        closingDate: listingToEdit.closingDate,
      });

      // Check if the device is a mobile
      if (window.innerWidth <= 993) {
        setShowPostAdForm(true);
        // Scroll to the form section
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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
      editMode ? editFormData.closingDate : newClosingDate
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
      // Do nothing
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleDelete = async (jobListingId) => {
    try {
      // Send a request to delete the job listing from the database
      await axiosReq.delete(`/jobs/post/${jobListingId}/`);

      // Remove the job listing from the UI only if the deletion was successful
      setCurrentUserAds((prevAds) =>
        prevAds.filter((ad) => ad.job_listing_id !== jobListingId)
      );

      // Update the state to null and the toggle to null
      setIsFilterActive(false);
      setIsListingClosed(null);
      setToggleState(null);
    } catch (error) {
      // Do nothing
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
      closingDate: "",
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

  const handleProfileClick = () => {
    // Use history.push to navigate programmatically
    history.push(`/profiles/${currentUser?.profile_id}/user/`);
  };

  const textFields = (
    <div>
      <h1 className="text-center mt-1 p-2 mb-3 text-muted">
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
          placeholder="Hourly wage"
          onChange={handleChange}
          name="salary"
          required
        />
        {error && (
          <Alert variant="warning" className="mt-3">
            {error}
          </Alert>
        )}
      </Form.Group>

      <Form.Group className="pr-1 pl-1" controlId="formClosingDate">
        <Form.Label className="">Closing Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={editMode ? closingDate : newClosingDate}
          onChange={handleChange}
          name="closingDate"
          required
        />
      </Form.Group>

      <Button
        aria-label="submit"
        className={`${appStyles.Button}`}
        type="submit">
        {editMode ? "Edit Ad" : "Post Ad"}
      </Button>
      {editMode && (
        <Button
          aria-label="accept connection"
          className={`${appStyles.Button} ml-2`}
          onClick={handleCancel}>
          Cancel
        </Button>
      )}
    </div>
  );

  const handlePostAdClick = () => {
    setShowImageAndMessage(false); // Hide the image and message when the button is clicked
    setShowPostAdForm((prevShowPostAdForm) => !prevShowPostAdForm); // Toggle the state variable
  };

  const handleCloseAdClick = async () => {
    try {
      // Hide the "Close a job listing" option after it's clicked
      setShowPostAdForm(false);
    } catch (error) {
      // Do nothing
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12} lg={8} className={`${formStyles.Col} py-2 p-md-2`}>
          <Container
            style={{ backgroundColor: "transparent", border: "none" }}
            className={`${appStyles.Content} ${formStyles.minHeightContent} d-flex flex-column justify-content-center position-relative`}>
            <Form.Group className="align-items-center`">
              {loading ? (
                <Container className={`${spinnerStyle.spinnerContain}`}>
                  <Spinner size={50} />
                </Container>
              ) : (
                <Container className={formStyles.Container}>
                  {sortedCurrentUserAds.length > 0 ? (
                    <>
                      <div className="d-flex justify-content-between bg-white p-3 rounded border align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          {/* Add user's image */}
                          <Avatar
                            src={profileData.image}
                            alt="User"
                            className="mr-2"
                            size={"17"}
                          />
                          {/* Heading */}
                          <h2 className="mb-0 mr-2 ">
                            <span
                              className={formStyles.Pointer}
                              onClick={handleProfileClick}>
                              {profileData.name}
                            </span>
                            's activity:
                          </h2>
                        </div>
                        {/* Toggle button */}
                        <div
                          className="d-lg-none mr-2"
                          onClick={() => setShowDropdown(!showDropdown)}>
                          {showDropdown ? (
                            <i
                              onClick={() => {
                                setShowPostAdForm(false);
                              }}
                              className="text-muted fas fa-toggle-on mr-1"></i>
                          ) : (
                            <i className="text-muted fas fa-toggle-off mr-1"></i>
                          )}
                        </div>

                        {/* Dropdown or arrows */}
                        {showDropdown ? (
                          <>
                            <Button
                              aria-label="post"
                              className={formStyles.Button}>
                              <i
                                onClick={
                                  showDropdown
                                    ? handlePostAdClick
                                    : handleCloseAdClick
                                }
                                className="fa-solid fa-plus"></i>
                            </Button>
                          </>
                        ) : (
                          <Button
                            aria-label="filter"
                            className={formStyles.Button}
                            onClick={handleToggleFilter}>
                            <i className="fa-solid fa-arrow-down-wide-short"></i>
                          </Button>
                        )}
                      </div>
                      {/* Show post job ad div  */}
                      {showPostAdForm && (
                        <>
                          <div
                            className={`${appStyles.Content} ${formStyles.Form} ${formStyles.triangleGradient} mb-2 d-lg-none d-flex flex-column justify-content-center`}>
                            <Container className="p-4">{textFields}</Container>
                          </div>
                          <div className="text-center mb-3 d-lg-none">
                            <hr
                              className="w-25 mx-auto border-top border-muted"
                              style={{ opacity: "0.5" }}
                            />
                            <span className="mx-2 text-muted">
                              Your recent ads
                            </span>
                            <hr
                              className="w-25 mx-auto border-top border-muted"
                              style={{ opacity: "0.5" }}
                            />
                          </div>
                        </>
                      )}

                      <ul className={`list-unstyled p-2 `}>
                        {sortedCurrentUserAds.slice(0, 4).map((ad, index) => (
                          <JobAdListItem
                            key={index}
                            ad={ad}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            fetchApplicants={fetchApplicants}
                          />
                        ))}

                        {/* Add dummy boxes for remaining listings */}
                        {Array.from({
                          length: Math.max(4 - sortedCurrentUserAds.length, 0),
                        }).map((_, index) => (
                          <DummyBoxes
                            key={`dummy-${index}`}
                            widths={[200, 150, 100, 120, 130, 150, 180, 190]}
                          />
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Container>
                      {showImageAndMessage && (
                        <div className="text-center">
                          <Asset
                            src={dataImage}
                            message="Oops, your job listings are empty"
                          />
                          <div>
                            <Button
                              aria-label="post"
                              className="d-lg-none"
                              onClick={handlePostAdClick}>
                              List Job Ad Now
                            </Button>
                          </div>
                        </div>
                      )}

                      {showPostAdForm && (
                        <div className="text-center">
                          <div
                            className={`${appStyles.Content} ${formStyles.Form} ${formStyles.triangleGradient} mb-2 d-lg-none d-flex`}>
                            <Container className="p-4">{textFields}</Container>
                          </div>
                        </div>
                      )}
                    </Container>
                  )}
                </Container>
              )}
            </Form.Group>
          </Container>
        </Col>
        <Col md={12} lg={4} className="p-0 p-md-2 d-none d-lg-flex">
          <Container className="mt-2">
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
