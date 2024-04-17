import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
// Styles
import styles from "../../App.module.css";
import profileStyles from "../../styles/ProfileView.module.css";
// Components
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Spinner from "../../components/Spinner";
import JobsPost from "../jobs/JobsPost";
import JobPostHomeItem from "../../components/job/JobPostHomeItem";

const ProfilePage = ({ searchQuery }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [jobsPost, setJobsPost] = useState({ results: [] });

  // Define fetchJobs function
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `/jobs/`;
      const { data } = await axiosReq.get(apiUrl);
      console.log("Fetched Jobs:", data.results);
      setJobsPost(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(searchQuery);
  }, [searchQuery]);

  const currentUser = useCurrentUser();

  const handleStarClick = (newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
    let isMounted = true; // Variable to track if the component is mounted

    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const profileResponse = await axios.get(`/profiles/${id}/`);
        const profileData = profileResponse.data;

        // Fetch connections data for the specific profile
        const connectionsResponse = await axios.get(
          `/connections/?owner=${profileData.owner_username}`
        );
        const connectionsData = connectionsResponse.data.results;

        // Fetch ratings for the profile
        const ratingsResponse = await axios.get(`/profiles/${id}/ratings/`);
        const ratingsData = ratingsResponse.data;

        if (isMounted) {
          // Update profile data with connections count
          const profileWithData = {
            ...profileData,
            connections_count: connectionsData.length,
          };

          // Set profile state
          setProfile(profileWithData);
          setRatings(ratingsData);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to fetch profile data.");
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post(`/profiles/${profile?.id}/rate-user/`, {
        rating,
        comment,
      });

      console.log("Rating submitted successfully");
    } catch (error) {
      // Handle error
      console.error("Error submitting rating:", error);
    }
  };

  console.log("view profiles", profile);
  console.log("currentUser", currentUser);

  const renderStars = (averageRating) => {
    // If averageRating is 0, return "No ratings"
    if (averageRating === 0) {
      return "No ratings";
    }

    // Extract the integer and fractional parts of the average rating
    const integerPart = Math.floor(averageRating);
    const fractionalPart = averageRating - integerPart;

    // Initialize an array to hold the star elements
    const stars = [];

    // Render full stars based on the integer part
    for (let i = 0; i < integerPart; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    // Render a half star if the fractional part is greater than 0
    if (fractionalPart > 0) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    // Return the array of star elements or "No ratings"
    return stars.length > 0 ? stars : "No ratings";
  };

  // Handler for moving to the next rating
  const nextRating = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ratings.results.length);
  };

  // Handler for moving to the previous rating
  const prevRating = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ratings.results.length - 1 : prevIndex - 1
    );
  };
  console.log("ratings", ratings);

  const filteredJobsPost = jobsPost.results
    .filter(
      (job) =>
        !job.is_listing_closed && job.employer_profile.owner_id === profile?.id
    )
    .map((job) => ({
      ...job,
      owner: profile.name, // Add owner's name
      action: "listed a job", // Add action
    }));

  {
    console.log("currentUser:", currentUser);
  }
  {
    console.log("profile:", profile);
  }

  const postCount = filteredJobsPost.length;
  console.log("filtered posts", filteredJobsPost);
  return (
    <>
      <Row className="mb-0">
        <Col className="py-1 p-0 p-md-2 mt-1 mb-0" md={7} lg={3}>
          {isLoading ? (
            <Container
              className={`bg-none border-none border-bottom-none`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "430px",
              }}>
              <Spinner size={60} />
            </Container>
          ) : (
            <>
              <Container className={`p-0 mb-2 ${styles.Content}`}>
                {profile && (
                  <div
                    className={` ${styles.Background} p-3 d-flex align-items-center justify-content-start`}>
                    <div className="p-0 rounded mr-3">
                      <Avatar
                        src={profile.image}
                        height={50}
                        border
                        rounded
                        fluid
                      />
                    </div>
                    <div className="text-left">
                      <h1 className="mb-0">{profile.name}</h1>
                    </div>
                    {currentUser &&
                      profile &&
                      currentUser.username === profile.owner_username && (
                        <div className="ml-auto">
                          <Link to={`/profiles/${currentUser?.profile_id}/`}>
                            <Button className={profileStyles.Button}>
                              <i className=" text-white fas fa-ellipsis-v"></i>
                            </Button>
                          </Link>
                        </div>
                      )}
                  </div>
                )}
                {profile && (
                  <div className="mt-1 mb-0">
                    <div className="p-2 rounded">
                      <Badge
                        className={`badge p-2 mt-3 text-white badge-${
                          profile.profile_type === "employer"
                            ? "warning"
                            : "info"
                        } ml-2`}>
                        {profile.profile_type === "employer"
                          ? "I'm looking to hire!"
                          : "I'm looking to work!"}
                      </Badge>
                      <Badge className="p-2 bg-secondary text-white ml-2">
                        {renderStars(profile.average_rating)}
                      </Badge>
                      <Badge variant="primary" className="p-2 ml-2">
                        {" "}
                        {profile.connections_count !== undefined
                          ? profile.connections_count
                          : 0}
                        + connections
                      </Badge>
                    </div>
                    <div className=" p-3">
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            className="bg-light rounded  p-4 mt-1"
                            style={{
                              maxHeight: "190px",
                              minHeight: "175px",
                              overflowY: "auto",
                            }}>
                            <h2>About</h2>
                            <span className="text-muted small">
                              {profile.content}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12 ">
                          <>
                            {ratings.count > 0 ? (
                              <div
                                className="rounded border text-muted p-3 mt-1 d-flex flex-column align-items-center"
                                style={{
                                  maxHeight: "190px",
                                  minHeight: "175px",
                                  overflowY: "auto",
                                }}>
                                {/* Ratings Container */}
                                <div className="flex-grow-1 p-3 mt-0">
                                  {/* Ratings */}
                                  {ratings.results.map((rating, index) => (
                                    <div
                                      key={index}
                                      className="mb-2"
                                      style={{
                                        display:
                                          index === currentIndex
                                            ? "block"
                                            : "none",
                                      }}>
                                      <span>
                                        <p>
                                          {rating.comment}{" "}
                                          <Badge variant="secondary">
                                            {rating.rating}
                                          </Badge>
                                        </p>
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                {/* Navigation buttons */}
                                <div className="mt-2">
                                  <button
                                    className="btn btn-secondary rounded-circle mr-3"
                                    onClick={prevRating}>
                                    <i className="fas fa-chevron-left"></i>
                                  </button>
                                  <button
                                    className="btn btn-secondary rounded-circle"
                                    onClick={nextRating}>
                                    <i className="fas fa-chevron-right"></i>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="p-1 mt-1 mb-0 border text-left rounded justify-content-start">
                                <p className="mt-2 ml-2">No ratings to show.</p>
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* {error && <p>{error}</p>} */}
              </Container>
            </>
          )}
        </Col>

        <Col md={5} lg={6}>
          {" "}
          <Container className="p-0 border mt-2 bg-white">
            {/* Activity section */}
            <Container className={`mt-0 p-4`}>
              <h1>Activity</h1>
              {postCount > 0 ? (
                <ul className={`list-unstyled mb-3  p-0 mt-2`}>
                  {filteredJobsPost.map((jobPost, index) => (
                    <li
                      key={index}
                      className="border-bottom rounded p-3 m-2 small mt-2">
                      <p>
                        <strong>{jobPost.owner}</strong> {jobPost.action}:
                      </p>
                      <span>{jobPost.title}</span>
                      {/* Render details of each job post here */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activity to show.</p>
              )}
            </Container>
          </Container>
        </Col>
        <Col
          md={5}
          lg={3}
          className="mr-0 d-none d-md-block p-0 p-md-2 mb-0 text-center">
          {/* Rating Form */}
          <Container
            className={`${styles.Content} ${profileStyles.triangleGradient}  p-3`}>
            {currentUser &&
            profile &&
            currentUser.username !== profile.owner_username ? (
              <>
                <h2 className="mt-3">Leave a rating</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group p-3">
                    <label className="d-none" htmlFor="rating">
                      Rating:
                    </label>
                    <div className={profileStyles.Stars}>
                      {[1, 2, 3, 4, 5].map((index) => (
                        <i
                          key={index}
                          className={
                            index <= rating ? "fas fa-star" : "far fa-star"
                          }
                          onClick={() => handleStarClick(index)}
                          style={{ cursor: "pointer", marginRight: "5px" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="d-none" htmlFor="comment">
                      Comment:
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      name="comment"
                      rows="3"
                      value={comment}
                      onChange={handleCommentChange}></textarea>
                  </div>
                  <button
                    type="submit"
                    className={`p-2 rounded ${profileStyles.buttonForm} `}>
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div>
                {ratings.results && ratings.results.length > 0 ? (
                  <div className="mt-3">
                    <h4>Ratings:</h4>
                    <ul className="list-unstyled">
                      {ratings.results.map((rating, index) => (
                        <li key={index} className="mb-2">
                          <p>
                            <strong>Rating:</strong> {rating.rating}
                          </p>
                          <p>
                            <strong>Comment:</strong> {rating.comment}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No ratings yet.</p>
                )}
              </div>
            )}
          </Container>
        </Col>
      </Row>
      <Row className="mt-0">
        <Col className="py-1 p-0 p-md-2 mt-0" md={8}></Col>
      </Row>
    </>
  );
};

export default ProfilePage;
