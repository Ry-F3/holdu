import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// Bootstrap
import { Container, Row, Col } from "react-bootstrap";
// Styles
import styles from "../../App.module.css";
import profileStyles from "../../styles/ProfileView.module.css";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Components
import Spinner from "../../components/Spinner";
import ProfileBadges from "../../components/profile/ProfileBadges";
import ProfileHeader from "../../components/profile/ProfileHeader";
import RatingNavigationButtons from "../../components/profile/rating/RatingNavigationButtons";
import RatingContent from "../../components/profile/rating/RatingContent";
import Activity from "../../components/profile/activity/Activity";
import RatingForm from "../../components/profile/rating/RatingForm";
import ConnectionsTab from "../../components/connections/ConnectionsTab";
import HorizontalRatingList from "../../components/profile/rating/HorizontalRatingList";

const ProfileViewPage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexClick, setCurrentIndexClick] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [jobsPost, setJobsPost] = useState({ results: [] });
  const [connections, setConnections] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [showRatingContainer, setShowRatingContainer] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const isMounted = useRef(true);

  // Fetch data for profile id
  useEffect(() => {
    isMounted.current = true;

    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(`/profiles/${id}/`);
        const profileData = profileResponse.data;

        const connectionsResponse = await axios.get(
          `/connections/?owner=${profileData.owner_username}`
        );
        const connectionsData = connectionsResponse.data.results;

        let allRatings = [];
        let nextPage = `/profiles/${id}/ratings/`;
        while (nextPage && isMounted.current) {
          const ratingsResponse = await axios.get(nextPage);
          const ratingsData = ratingsResponse.data;
          allRatings = [...allRatings, ...ratingsData.results];
          nextPage = ratingsData.next;
        }

        if (isMounted.current) {
          const profileWithData = {
            ...profileData,
            connections_count: connectionsData.length,
          };

          setProfile(profileWithData);
          setRatings({ results: allRatings });
          setShowRatingContainer(allRatings.length > 3);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        if (isMounted.current) {
          setError("Failed to fetch profile data.");
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  // Fetch data for jobs and connections
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [jobsResponse, connectionsResponse] = await Promise.all([
        axios.get("/jobs/"),
        axios.get("/connections/"),
      ]);
      if (isMounted.current) {
        setJobsPost(jobsResponse.data);
        setConnections(connectionsResponse.data.results);
        const accepted = connectionsResponse.data.results.filter(
          (connection) => connection.accepted
        );
        setAcceptedConnections(accepted);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      if (isMounted.current) {
        setTimeout(() => {
          setIsLoading(false); // Set isLoading to false after 1000 milliseconds (1 second)
        }, 1000);
      }
    }
  };

  // Function to handle deleting a connection
  const handleDeleteConnection = async (connectionId) => {
    console.log("Deleting connection:", connectionId);
    try {
      await axios.delete(`/connections/${connectionId}/`);
      fetchData();
    } catch (error) {
      console.error("Error deleting connection:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleStarClick = (newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages after 3 seconds
    const clearError = () => setError(null);

    // Validation checks
    if (!rating || rating === 0) {
      setError("Please select a star rating.");
      setTimeout(clearError, 3000); // Clear error message after 3 seconds
      return;
    }

    if (!comment) {
      setError("Please enter a comment.");
      setTimeout(clearError, 3000); // Clear error message after 3 seconds
      return;
    }

    try {
      // If validation passes, proceed with submitting the rating
      await axios.post(`/profiles/${profile?.id}/rate-user/`, {
        rating,
        comment,
      });

      console.log("Rating submitted successfully");
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error("Error submitting rating:", error);
      setError("Failed to submit rating. Please try again later.");
    }
  };

  // Handler for moving to the next rating
  const nextRating = () => {
    setCurrentIndexClick((prevIndex) => {
      if (prevIndex === ratings.results.length - 1) {
        return 0; // If at the last rating, loop back to the first rating
      } else {
        return prevIndex + 1; // Otherwise, increment the index
      }
    });
  };

  // Handler for moving to the previous rating
  const prevRating = () => {
    setCurrentIndexClick((prevIndex) =>
      prevIndex === 0 ? ratings.results.length - 1 : prevIndex - 1
    );
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ratings.results.length);
    }, 3000); // Adjust the interval duration as needed

    return () => clearInterval(interval);
  }, [ratings.results]);

  const postCount = filteredJobsPost.length;

  const handleToggleRatingForm = () => {
    setShowRatingForm((prevShowRatingForm) => !prevShowRatingForm);
    // Scroll to the rating form container
    if (!showRatingForm) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <>
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
        <Row className="mb-0">
          <Col className="py-1 p-1 p-md-2 mt-1 mb-0" md={7} lg={3}>
            <>
              <Container className={`p-0 mb-2 ${styles.Content}`}>
                <ProfileHeader
                  profile={profile}
                  currentUser={currentUser}
                  showRatingForm={showRatingForm}
                  handleToggleRatingForm={handleToggleRatingForm}
                />

                {profile && (
                  <div className="mt-1 mb-0">
                    <div className="p-2 rounded">
                      <ProfileBadges
                        profile={profile}
                        acceptedConnections={acceptedConnections}
                      />
                    </div>
                    <div className=" p-3">
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            className="bg-light rounded mb-1 p-4 mt-1"
                            style={{
                              maxHeight: "220px",
                              minHeight: "185px",
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
                            {ratings.results.length > 0 ? (
                              <div
                                className="rounded border text-muted p-3 mt-1 d-flex flex-column align-items-center"
                                style={{
                                  maxHeight: "220px",
                                  minHeight: "185px",
                                  overflowY: "auto",
                                }}>
                                {/* Ratings Container */}
                                <div className="flex-grow-1 p-3 mt-0">
                                  {/* Ratings */}
                                  <RatingContent
                                    ratings={ratings}
                                    currentIndex={currentIndexClick}
                                  />
                                </div>
                                {/* Navigation buttons */}
                                <div className="mt-2">
                                  <RatingNavigationButtons
                                    prevRating={prevRating}
                                    nextRating={nextRating}
                                  />
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
              </Container>
            </>
          </Col>

          <Col md={5} lg={6}>
            {/* Additional Rating Form Container for mobile screens */}
            {currentUser &&
              profile &&
              currentUser.username !== profile.owner_username && (
                <Container className="p-0 mt-0">
                  {showRatingForm ? ( // Show rating form if toggled
                    <Container
                      className={`${styles.Content} ${profileStyles.triangleGradient} text-center d-lg-none p-3`}>
                      <RatingForm
                        rating={rating}
                        handleStarClick={handleStarClick}
                        comment={comment}
                        handleCommentChange={handleCommentChange}
                        handleSubmit={handleSubmit}
                        error={error}
                      />
                    </Container>
                  ) : (
                    // Otherwise, show the activity section
                    <Container className="p-0 border mt-2 bg-white">
                      {!showRatingForm && ( // Render Activity only if showRatingForm is false
                        <Activity
                          postCount={postCount}
                          filteredJobsPost={filteredJobsPost}
                        />
                      )}
                    </Container>
                  )}
                </Container>
              )}
            <Container className="p-0 border mt-2 bg-white">
              {currentUser &&
                currentUser.username === profile?.owner_username && (
                  // Render Activity only if the current user is viewing their own profile
                  <Activity
                    postCount={postCount}
                    filteredJobsPost={filteredJobsPost}
                  />
                )}
            </Container>
            {showRatingContainer && (
              <Container className="p-3 mt-2 bg-white border">
                <HorizontalRatingList
                  ratings={ratings}
                  currentIndex={currentIndex}
                />
              </Container>
            )}
          </Col>

          <Col
            md={5}
            lg={3}
            className="mr-0 d-none d-lg-block p-0 p-md-2 mb-0 text-center">
            {/* Rating Form Container */}
            {currentUser &&
              profile &&
              currentUser.username !== profile.owner_username && (
                <Container
                  className={`${styles.Content} ${profileStyles.triangleGradient} p-3`}>
                  <RatingForm
                    rating={rating}
                    handleStarClick={handleStarClick}
                    comment={comment}
                    handleCommentChange={handleCommentChange}
                    handleSubmit={handleSubmit}
                    error={error}
                  />
                </Container>
              )}

            {/* Connections Tab Container */}
            {!currentUser ||
              !profile ||
              (currentUser.username === profile.owner_username && (
                <Container>
                  <div className="mt-0">
                    <ConnectionsTab
                      connections={connections}
                      handleDeleteConnection={handleDeleteConnection}
                    />
                  </div>
                </Container>
              ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileViewPage;
