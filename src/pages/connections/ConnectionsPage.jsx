import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Nav } from "react-bootstrap";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileContext";
import axios from "axios";
import styles from "../../App.module.css";
import Avatar from "../../components/Avatar";

import connectStyles from "../../styles/ConnectionsPage.module.css";

const ConnectionsPage = () => {
  const setProfileData = useSetProfileData();
  const profileData = useProfileData();
  const [profileType, setProfileType] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeTab, setActiveTab] = useState("connections"); // Track active tab
  const [activeTabProfiles, setActiveTabProfiles] = useState("recentProfiles"); // Track active tab
  const [pendingConnections, setPendingConnections] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (profileData && profileData.profile_type) {
      setProfileType(profileData.profile_type);
    }
  }, [profileData]);

  console.log("My profile data:", profileData);
  console.log("My profile type:", profileType);

  console.log("my profile data", profileData);
  console.log("my profile data profile type", profileData?.profile_type);

  const fetchConnections = async () => {
    try {
      const response = await axios.get("/connections/");
      setConnections(response.data.results);
      console.log("Connections:", response.data.results);
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`/profiles/`);
        const filteredProfiles = response.data.filter(
          (profile) => !profile.is_owner
        );
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          results: filteredProfiles,
        }));
        setProfiles(filteredProfiles);
        fetchConnections(); // Fetch connections after fetching profiles
      } catch (error) {
        console.error(error);
        // Handle error, show error message, etc.
      }
    };

    fetchProfiles();
  }, [setProfileData]);

  // Function to fetch pending connections
  const fetchPendingConnections = async () => {
    try {
      const response = await axios.get("/pending-connections/");
      setPendingConnections(response.data.results);
      console.log("Pending Connections:", response.data.results); // Log pending connections
    } catch (error) {
      console.error("Error fetching pending connections:", error);
      // Handle error, show error message, etc.
    }
  };

  // useEffect to fetch pending connections on component mount
  useEffect(() => {
    fetchPendingConnections();
  }, []);

  console.log("Profiles outer:", profiles); // Log profiles state variable
  console.log("Connections:", connections); // Log connections state variable

  const handleConnect = async (profileId) => {
    try {
      // Make a POST request to the connections endpoint with the profileId
      await axios.post(`/connections/`, { connection: profileId });
      // Fetch connections after the POST request is successful
      fetchConnections();
    } catch (error) {
      console.error("Error connecting:", error.message);
      // Handle error, show error message, etc.
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      await axios.put(`/pending-connections/${connectionId}/accept/`);
      fetchPendingConnections(); // Refresh pending connections after accepting
      fetchConnections();
    } catch (error) {
      console.error("Error accepting connection:", error.message);
      // Handle error, show error message, etc.
    }
  };

  const handleDecline = async (connectionId) => {
    try {
      await axios.delete(`/pending-connections/${connectionId}/decline/`);
      fetchPendingConnections(); // Refresh pending connections after declining
      fetchConnections();
    } catch (error) {
      console.error("Error declining connection:", error.message);
      // Handle error, show error message, etc.
    }
  };

  const handleUnsend = async (connectionId) => {
    try {
      await axios.delete(`/connections/${connectionId}/`);
      // Refresh connections after successful deletion
      fetchConnections();
    } catch (error) {
      console.error("Error while unsending connection:", error.message);
      // Handle error, show error message, etc.
    }
  };

  const handleDeleteConnection = async (connectionId) => {
    try {
      await axios.delete(`/connections/${connectionId}/`);
      fetchConnections();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Filter profiles based on the search query
    const filteredProfiles = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProfiles(filteredProfiles);
  }, [profiles, searchQuery]);

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-4" lg={8}>
      <Container className={`${styles.Content} bg-white border-bottom-none mb-3 d-block d-lg-none`}>
          <Container className={`bg-white border-none`}>
            <Nav
              variant="tabs"
              className="mb-2 mt-2"
              activeKey={activeTabProfiles}
              onSelect={setActiveTabProfiles}>
              <Nav.Item>
                <Nav.Link eventKey="recentProfiles">Recent Profiles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
          <Container className={`p-3 bg-white `}>
            {/* Search Bar */}
            <div className="mb-3 border-bottom-none p-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTabProfiles === "recentProfiles" && (
              <ul className="list-unstyled mt-2">
                {(searchQuery ? filteredProfiles : profiles)
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 3)
                  .filter((profile) => {
                    const hasAcceptedConnection = connections.some(
                      (connection) =>
                        connection.connection_name === profile.owner_username &&
                        connection.accepted === true
                    );
                    // Other filtering conditions...

                    const isPendingConnection = pendingConnections.some(
                      (pendingConnection) =>
                        pendingConnection.owner === profile.owner_username
                    );
                    return (
                      profile.name.trim() !== "" && // Filter out empty strings
                      profile.owner_username !== profileData.owner_username && // Filter out current user's profile
                      !hasAcceptedConnection &&
                      !isPendingConnection
                    );
                  })
                  .map((profile) => {
                    const pendingConnection = connections.find(
                      (conn) =>
                        conn.connection_name === profile.owner_username &&
                        conn.accepted === false
                    );
                    return (
                      <li
                        key={profile.id}
                        className={`mb-2 rounded-lg shadow-sm p-2 m-0 d-flex align-items-center justify-content-between`}>
                        <div className="d-flex align-items-center">
                          <Avatar
                            src={profile.image}
                            alt="User"
                            height={40}
                            border={true}
                          />
                          <div className="ml-2">
                            <h5 className="mt-0 mb-0 small">{profile.name}</h5>
                          </div>
                        </div>
                        {pendingConnection ? (
                          <Button
                            className={`rounded ${styles.Button}`}
                            size="sm"
                            disabled>
                            Pending..
                          </Button>
                        ) : (
                          <Button
                            className={`rounded ${styles.Button}`}
                            size="sm"
                            onClick={() => handleConnect(profile.id)}>
                            Connect
                          </Button>
                        )}
                      </li>
                    );
                  })}
                {profiles.length === 0 && <li>No profiles found.</li>}
              </ul>
            )}
          </Container>
        </Container>
        <Container className={styles.Content}>
          <Nav
            variant="tabs"
            className="mb-4"
            activeKey={activeTab}
            onSelect={setActiveTab}>
            <Nav.Item>
              <Nav.Link eventKey="connections">Connections</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pending">Pending</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sent">Sent</Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === "connections" && (
            <ul className="list-group">
              {/* Render connections */}
              {connections.map((connection) => {
                if (connection.accepted) {
                  return (
                    <li
                      key={connection.id}
                      className="list-group-item bg-light d-flex align-items-center justify-content-between">
                      {connection.connection_name}
                      <div>
                        <Button
                          className={` ${connectStyles.Button}`}
                          onClick={() => handleDeleteConnection(connection.id)}>
                          &#10006;
                        </Button>
                      </div>
                    </li>
                  );
                }
                return null; // Skip rendering if not accepted
              })}
              {/* Render dummy items */}
              {[
                ...Array(
                  Math.max(
                    5 - connections.filter((conn) => conn.accepted).length,
                    0
                  )
                ),
              ].map((_, index) => (
                <li key={`dummy-${index}`} className="list-group-item">
                  <div className="bg-light p-3 rounded"></div>
                </li>
              ))}
              {/* Render message if no accepted connections are found */}
              {connections.filter((conn) => conn.accepted).length === 0 && (
                <p className="text-muted">No connections found.</p>
              )}
            </ul>
          )}
          {activeTab === "pending" && (
            <ul className="list-group">
              {pendingConnections.map((pendingConnection) => (
                <li
                  key={pendingConnection.id}
                  className="list-group-item bg-light d-flex align-items-center justify-content-between">
                  <span>{pendingConnection.owner}</span>
                  <div>
                    <Button
                      className={`rounded mr-2 ${styles.AcceptButton}`}
                      onClick={() => handleAccept(pendingConnection.id)}>
                      Accept
                    </Button>
                    <Button
                      className={`rounded ${styles.DeclineButton}`}
                      onClick={() => handleDecline(pendingConnection.id)}>
                      Decline
                    </Button>
                  </div>
                </li>
              ))}

              {/* Dummy items */}
              {Array.from({
                length: Math.max(5 - pendingConnections.length, 0),
              }).map((_, index) => (
                <li key={`dummy-${index}`} className="list-group-item">
                  <div className="bg-light p-3 rounded"></div>
                </li>
              ))}
              {/* Render message if no pending connections are found */}
              {pendingConnections.filter((conn) => !conn.accepted).length ===
                0 && (
                <p className="text-muted">No pending connections found.</p>
              )}
            </ul>
          )}

          {activeTab === "sent" && (
            <ul className="list-group">
              {/* Render connections */}
              {connections.map((connection) => {
                const isSent = !connection.accepted && connection.owner; // Check if connection is sent by the user
                if (isSent) {
                  return (
                    <li
                      key={connection.id}
                      className="list-group-item bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{connection.connection_name}</span>
                        <Button
                          size="sm"
                          className={` ${connectStyles.Button}`}
                          onClick={() => handleUnsend(connection.id)}>
                          &#10006;
                        </Button>
                      </div>
                    </li>
                  );
                }
                return null; // Skip rendering if not sent by the user
              })}
              {/* Render dummy items */}
              {[
                ...Array(
                  Math.max(
                    5 - connections.filter((conn) => !conn.accepted).length,
                    0
                  )
                ),
              ].map((_, index) => (
                <li key={`dummy-${index}`} className="list-group-item">
                  <div className="bg-light p-3 rounded"></div>
                </li>
              ))}
              {/* Render message if no sent connections are found */}
              {connections.filter((conn) => !conn.accepted).length === 0 && (
                <p className="text-muted">No sent connections found.</p>
              )}
            </ul>
          )}
        </Container>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2 mt-3">
        <Container className={`${styles.Content} bg-white border-bottom-none`}>
          <Container className={`bg-white border-none`}>
            <Nav
              variant="tabs"
              className="mb-2 mt-2"
              activeKey={activeTabProfiles}
              onSelect={setActiveTabProfiles}>
              <Nav.Item>
                <Nav.Link eventKey="recentProfiles">Recent Profiles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
          <Container className={`p-3 bg-white `}>
            {/* Search Bar */}
            <div className="mb-3 border-bottom-none p-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTabProfiles === "recentProfiles" && (
              <ul className="list-unstyled mt-2">
                {(searchQuery ? filteredProfiles : profiles)
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 8)
                  .filter((profile) => {
                    const hasAcceptedConnection = connections.some(
                      (connection) =>
                        connection.connection_name === profile.owner_username &&
                        connection.accepted === true
                    );
                    // Other filtering conditions...

                    const isPendingConnection = pendingConnections.some(
                      (pendingConnection) =>
                        pendingConnection.owner === profile.owner_username
                    );
                    return (
                      profile.name.trim() !== "" && // Filter out empty strings
                      profile.owner_username !== profileData.owner_username && // Filter out current user's profile
                      !hasAcceptedConnection &&
                      !isPendingConnection
                    );
                  })
                  .map((profile) => {
                    const pendingConnection = connections.find(
                      (conn) =>
                        conn.connection_name === profile.owner_username &&
                        conn.accepted === false
                    );
                    return (
                      <li
                        key={profile.id}
                        className={`bg-white  mb-2 rounded-lg shadow-sm p-2 m-0 d-flex align-items-center justify-content-between`}>
                        <div className="d-flex align-items-center">
                          <Avatar
                            src={profile.image}
                            alt="User"
                            height={40}
                            border={true}
                          />
                          <div className="ml-2">
                            <h5 className="mt-0 mb-0 small">{profile.name}</h5>
                          </div>
                        </div>
                        {pendingConnection ? (
                          <Button
                            className={`rounded ${styles.Button}`}
                            size="sm"
                            disabled>
                            Pending..
                          </Button>
                        ) : (
                          <Button
                            className={`rounded ${styles.Button}`}
                            size="sm"
                            onClick={() => handleConnect(profile.id)}>
                            Connect
                          </Button>
                        )}
                      </li>
                    );
                  })}
                {profiles.length === 0 && <li>No profiles found.</li>}
              </ul>
            )}
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default ConnectionsPage;
