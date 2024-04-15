import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

// Bootstrap
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
// Styles
import styles from "../../App.module.css";
import profileStyles from "../../styles/ProfileView.module.css";
// Components
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUser = useCurrentUser();

  const handleStarClick = (newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
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
        setRatings(ratingsData);

        // Update profile data with connections count
        const profileWithData = {
          ...profileData,
          connections_count: connectionsData.length,
        };

        // Set profile state
        setProfile(profileWithData);
      } catch (error) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfile();
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

  return (
    <>
      <Row className="mb-0">
        <Col className="py-1 p-0 p-md-2 mt-1 mb-0" md={7} lg={8}>
          <Container className={`p-0 ${styles.Content}`}>
            {profile && (
              <div
                className={` ${styles.Background} p-3 d-flex align-items-center justify-content-start`}>
                <div className="p-0 rounded mr-3">
                  <Avatar
                    src={profile.image}
                    height={80}
                    border
                    rounded
                    fluid
                  />
                </div>
                <div className="text-left">
                  <h1 className="mb-0">{profile.name}</h1>
                  <p className="small">
                    {profile.connections_count !== undefined
                      ? profile.connections_count
                      : 0}
                    + connections
                  </p>
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
                        : "primary"
                    } ml-2`}>
                    {profile.profile_type === "employer"
                      ? "I'm looking to hire!"
                      : "I'm looking to work!"}
                  </Badge>
                  <Badge className="p-2 bg-secondary text-white ml-2">
                    {renderStars(profile.average_rating)}
                  </Badge>
                </div>
                <div className="row p-3">
                  <div className="col-md-6">
                    <div className="bg-light rounded  p-4 mt-1"   style={{
                            maxHeight: "190px",
                            minHeight: "175px",
                            overflowY: "auto",
                          }}>
                      <h2>About</h2>
                      <span className="text-muted small">{profile.content}</span>
                    </div>
                  </div>
                  <div className="col-md-6 ">
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
                                    index === currentIndex ? "block" : "none",
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
            )}
            {/* {error && <p>{error}</p>} */}
          </Container>
          <Container className={`mt-3 ${styles.Content}`}>
            <div className="mt-3">
              <div className="p-3">
                <div className={profileStyles.profileTimeline}>
                  <div className={profileStyles.profileTimelineItem}>
                    <div className={profileStyles.profileTimelineItemLabel}>
                      Label 1
                    </div>
                    <div
                      className={
                        profileStyles.profileTimelineItemConnector
                      }></div>
                    <div className={profileStyles.profileTimelineItemContent}>
                      Content 1
                    </div>
                  </div>
                  <div className={profileStyles.profileTimelineItem}>
                    <div className={profileStyles.profileTimelineItemLabel}>
                      Label 2
                    </div>
                    <div
                      className={
                        profileStyles.profileTimelineItemConnector
                      }></div>
                    <div className={profileStyles.profileTimelineItemContent}>
                      Content 2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Col>
        <Col
          md={5}
          lg={4}
          className="mr-0 d-none d-md-block p-0 p-md-2 mb-0 text-center">
          {/* Rating Form */}
          <Container className={`${styles.Content} ${profileStyles.triangleGradient}  p-3`}>
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
              <button type="submit" className={`p-2 rounded ${profileStyles.buttonForm} `}>
                Submit
              </button>
            </form>
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
