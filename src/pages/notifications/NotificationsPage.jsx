import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
// Styles
import styles from "../../App.module.css";
import notifyStyles from "../../styles/Notification.module.css";
import {
  Row,
  Col,
  Container,
  Card,
  Badge,
  Form,
  Button,
  Image,
} from "react-bootstrap"; // Assuming you're using Bootstrap


// Contexts
import { useProfileData } from "../../contexts/ProfileContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
//Image
import World from "../../assets/world.png";
// Components
import Avatar from "../../components/Avatar";


const NotificationPage = () => {
  const [notifications, setNotifications] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [sendersProfileData, setSendersProfileData] = useState({});
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const currentUser = useCurrentUser(); // Assuming you have a hook to get the current user
  const profileData = useProfileData();
  const [deleteClickedWithoutSelection, setDeleteClickedWithoutSelection] =
    useState(false);
  const [alignClass, setAlignClass] = useState("justify-content-start");
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axiosReq.get("/notifications/");
        setNotifications(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching notifications:", error);
      } finally {
        delay(1000).then(() => setHasLoaded(true));
      }
    };

    fetchNotifications();
  }, []);

  // Function to map category keys to human-readable names
  const getCategoryName = (categoryKey) => {
    switch (categoryKey) {
      case "connection":
      case "connection_accepted":
        return "Connection";
      case "new_job":
        return "New Job";
      case "accepted_application":
        return "Accepted Application";
      case "message_alert":
        return "Message Alert";
      case "connection_request":
        return "Connection Request";
      case "new_rating":
        return "New Rating";
      default:
        return categoryKey;
    }
  };

  const getVariant = (category) => {
    switch (category) {
      case "connection_accepted":
        return "primary"; // Primary variant for connection requests
      case "new_job":
        return "info"; // Success variant for new job notifications
      default:
        return "warning"; // Default variant
    }
  };

  useEffect(() => {
    const fetchSendersProfileData = async () => {
      // Fetch sender's profile data for each notification
      const senderProfileData = {};
      try {
        for (const notification of notifications.results) {
          const response = await axios.get(`/profiles/${notification.sender}/`);
          senderProfileData[notification.sender] = response.data;
        }
        setSendersProfileData(senderProfileData);
      } catch (error) {
        // Handle error
        console.error("Error fetching sender profiles:", error);
      }
    };

    if (notifications.results.length > 0) {
      fetchSendersProfileData();
    }
  }, [notifications]);

  const getTimeDifference = (sentAt) => {
    const now = new Date();
    const sentTime = new Date(sentAt);
    const difference = now - sentTime;

    // Convert milliseconds to minutes
    const minutes = Math.floor(difference / 60000);

    // Return the time difference in a human-readable format
    if (minutes < 1) {
      return "Just now";
    } else if (minutes === 1) {
      return "1 minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handleCheckboxChange = (notificationId) => {
    setSelectedNotifications((prevSelected) => {
      if (prevSelected.includes(notificationId)) {
        // If the notification is already selected, remove it from the selected list
        return prevSelected.filter((id) => id !== notificationId);
      } else {
        // If the notification is not selected, add it to the selected list
        return [...prevSelected, notificationId];
      }
    });
  };

  const handleSelectAll = () => {
    const allNotificationIds = notifications.results.map(
      (notification) => notification.id
    );
    setSelectedNotifications(allNotificationIds);
    handleAlignmentToggle();
  };

  const handleDeselectAll = () => {
    setSelectedNotifications([]);
    handleAlignmentToggle();
  };

  const handleDeleteSelected = async () => {
    console.log("click");
    if (selectedNotifications.length === 0) {
      setDeleteClickedWithoutSelection(true);
      setTimeout(() => setDeleteClickedWithoutSelection(false), 3000);
      return;
    }
    try {
      // Send a request to delete the selected notifications from the database
      await Promise.all(
        selectedNotifications.map(async (notificationId) => {
          await axiosReq.delete(`/notifications/${notificationId}/`);
        })
      );

      // Update the notifications state to remove the deleted notifications
      setNotifications((prevNotifications) => ({
        results: prevNotifications.results.filter(
          (notification) => !selectedNotifications.includes(notification.id)
        ),
      }));

      // Clear the selected notifications
      setSelectedNotifications([]);
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const handleAlignmentToggle = () => {
    setAlignClass((prevAlignClass) =>
      prevAlignClass === "justify-content-start"
        ? "justify-content-end"
        : "justify-content-start"
    );
  };

  const countUserNotifications = () => {
    let count = 0;
    notifications.results.forEach((notification) => {
      // Check if the notification is for the current user
      if (notification.recipient === currentUser.id) {
        count++;
      }
    });
    return count;
  };

  const renderNotifications = () => {
    if (!hasLoaded) {
      // Dummy notifications while loading
      return Array.from({ length: 5 }, (_, index) => (
        <Card
          key={index}
          className={`border-bottom border-top-0 border-right-0 border-left-0 rounded-0 ${notifyStyles.Background}`}>
          <Card.Body className="border-0">
            <div
              className="border-0"
              style={{ display: "flex", alignItems: "center", opacity: 0.5 }}>
              <div className="mr-3">
                <div
                  className="rounded-circle"
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#ccc",
                  }}></div>
              </div>
              <div>
                <h2
                  style={{
                    backgroundColor: "#ccc",
                    width: 150,
                    height: 25,
                  }}></h2>
                <Card.Text
                  style={{
                    backgroundColor: "#ccc",
                    width: 150,
                    height: 20,
                  }}></Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
      ));
    }

    // Actual notifications
    return notifications.results.map((notification) => (
      <Card
        key={notification.id}
        className={`border-bottom border-top-0 border-right-0 border-left-0 rounded-0 ${notifyStyles.Background}`}>
        <Card.Body className="border-0">
          <div
            className="border-0"
            style={{ display: "flex", alignItems: "center" }}>
            <Form.Check
              type="checkbox"
              id={`checkbox-${notification.id}`}
              className="mr-3"
              checked={selectedNotifications.includes(notification.id)}
              onChange={() => handleCheckboxChange(notification.id)}
            />
            {sendersProfileData[notification.sender] && (
              <>
                {/* Sender's Avatar */}
                {sendersProfileData[notification.sender].image && (
                  <Avatar
                    src={sendersProfileData[notification.sender].image}
                    alt="Sender"
                    height={60}
                    className="mr-3"
                    border
                  />
                )}
                {/* Sender's Name */}
                <div>
                  <Card.Text className={notifyStyles.textSize}>
                    {sendersProfileData[notification.sender].name}
                    <Badge
                      className="ml-3 text-black"
                      variant={getVariant(notification.category)}>
                      {getCategoryName(notification.category)}
                    </Badge>
                    <Badge className={`${notifyStyles.Badge} small ml-3`}>
                      {getTimeDifference(notification.sent_at)}
                    </Badge>
                    <br></br>
                    <span>{notification.title}</span>
                  </Card.Text>
                </div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-4" lg={8}>
        {!currentUser ? (
          <div className="text-center mt-3">
            Please log in to view notifications.
          </div>
        ) : (
          <>
            {hasLoaded ? (
              notifications.results.length ? (
                <>
                  <Container
                    className={` ${styles.Content} rounded border p-2 mb-3 bg-white justify-content-start d-flex`}>
                    <Row>
                      {" "}
                      <Col>
                        {" "}
                        <div className="p-2 d-flex justify-content-between align-items-center ml-5">
                          <div>
                            <Badge
                              className={`${notifyStyles.Icon} mr-2`}
                              style={{ position: "relative" }}>
                              <i className="text-muted fa-solid fa-bell large"></i>
                              <Badge
                                pill
                                variant="danger"
                                className="position-absolute top-0 start-100 translate-middle">
                                {countUserNotifications()}
                              </Badge>
                            </Badge>
                            <Badge className="mr-2 ml-3" variant="primary">
                              Connection
                            </Badge>
                            <Badge className="mr-2" variant="warning">
                              Connection Request
                            </Badge>
                            <Badge className="mr-2" variant="info">
                              New Job
                            </Badge>
                            <Badge className="mr-2" variant="warning">
                              New Rating
                            </Badge>
                            <Badge
                              className={`${notifyStyles.Badge} mr-5`}
                              variant="warning">
                              Time
                            </Badge>
                          </div>
                          <div className="d-lg-flex">
                            <Button
                              onClick={
                                selectedNotifications.length ===
                                notifications.results.length
                                  ? handleDeselectAll
                                  : handleSelectAll
                              }
                              disabled={notifications.results.length === 0}
                              className="mb-0 ml-0 mr-3 d-lg-none">
                              {selectedNotifications.length ===
                              notifications.results.length ? (
                                <i className="fa-solid fa-xmark"></i>
                              ) : (
                                <i className="fa-solid fa-check"></i>
                              )}
                            </Button>
                            <Button
                              className={`${notifyStyles.buttonSize} mb-0 d-lg-none`}
                              onClick={handleDeleteSelected}>
                              <i className="fa-solid fa-trash-can"></i>
                            </Button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          {deleteClickedWithoutSelection && (
                            <div
                              className="alert alert-warning mt-3"
                              role="alert">
                              Please select at least one notification.
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <Container
                    className={` ${styles.Content} rounded border p-0 bg-white`}>
                    {renderNotifications()}
                  </Container>
                </>
              ) : (
                <p>No new notifications</p>
              )
            ) : (
              <>
                <div>{renderNotifications()}</div>
              </>
            )}
          </>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2 mt-3">
        <Container className={`${styles.Content}`}>
          <div className="rounded p-3 d-flex flex-column align-items-center bg-light">
            <div className="mb-1 ">
              <Image className={`${notifyStyles.Image}`} src={World} />
              <div
                className={`mb-0 border bg-white p-2 d-flex ${notifyStyles.Transition} ${alignClass}`}>
                <Button
                  onClick={
                    selectedNotifications.length ===
                    notifications.results.length
                      ? handleDeselectAll
                      : handleSelectAll
                  }
                  disabled={notifications.results.length === 0}
                  className="mb-0 mr-1">
                  {selectedNotifications.length ===
                  notifications.results.length ? (
                    <i className="fa-solid fa-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-check"></i>
                  )}
                </Button>
                <Button className="mb-0" onClick={handleDeleteSelected}>
                  <i className="fa-solid fa-trash-can"></i>
                </Button>
              </div>
            </div>
            {deleteClickedWithoutSelection && (
              <div className="alert alert-warning mt-3" role="alert">
                Please select at least one notification.
              </div>
            )}
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default NotificationPage;
