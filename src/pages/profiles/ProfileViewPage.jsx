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
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Spinner from "../../components/Spinner";
import ProfileBadges from "../../components/profile/ProfileBadges";
import ProfileHeader from "../../components/profile/ProfileHeader";
import RatingNavigationButtons from "../../components/profile/rating/RatingNavigationButtons";
import RatingContent from "../../components/profile/rating/RatingContent";
import Activity from "../../components/profile/activity/Activity";
import RatingForm from "../../components/profile/rating/RatingForm";
import Avatar from "../../components/Avatar";
import Asset from "../../components/Asset";
import ConnectionsTab from "../../components/connections/ConnectionsTab";
import HorizontalRatingList from "../../components/profile/rating/HorizontalRatingList";

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [jobsPost, setJobsPost] = useState({ results: [] });
  const [connections, setConnections] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
 

  // Fetch data for profile id
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
          setTimeout(() => {
            setIsLoading(false); // Set isLoading to false after 1000 milliseconds (1 second)
          }, 1000);
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

  // Fetch data for jobs and connections
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [jobsResponse, connectionsResponse] = await Promise.all([
        axios.get("/jobs/"),
        axios.get("/connections/"),
      ]);
      setJobsPost(jobsResponse.data);
      setConnections(connectionsResponse.data.results);
      const accepted = connectionsResponse.data.results.filter(
        (connection) => connection.accepted
      );
      setAcceptedConnections(accepted);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false after 1000 milliseconds (1 second)
      }, 1000);
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
  }, []);

  const handleStarClick = (newValue) => {
    setRating(newValue);
  };

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
  console.log("filtered posts", filteredJobsPost);

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
          <Col className="py-1 p-0 p-md-2 mt-1 mb-0" md={7} lg={3}>
            <>
              <Container className={`p-0 mb-2 ${styles.Content}`}>
                <ProfileHeader profile={profile} />
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
                            {ratings.count > 0 ? (
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
                                    currentIndex={currentIndex}
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
            {" "}
            <Container className="p-0 border mt-2 bg-white">
              {/* Activity section */}
              <Activity
                postCount={postCount}
                filteredJobsPost={filteredJobsPost}
              />
            </Container>
            <Container className="p-3 mt-2 bg-white border">
              <HorizontalRatingList
                ratings={ratings}
                currentIndex={currentIndex}
              />
            </Container>
          </Col>
          <Col
            md={5}
            lg={3}
            className="mr-0 d-none d-md-block p-0 p-md-2 mb-0 text-center">
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

export default ProfilePage;
