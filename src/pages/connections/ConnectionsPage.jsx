import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Nav, Tab } from "react-bootstrap";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileContext";
import axios from "axios";
import styles from "../../App.module.css";
import Avatar from "../../components/Avatar";

const ConnectionsPage = () => {
  const setProfileData = useSetProfileData();
  const profileData = useProfileData();
  const [profileType, setProfileType] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeTab, setActiveTab] = useState("connections"); // Track active tab

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
          const filteredProfiles = response.data.filter(profile => !profile.is_owner);
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

  return (
    <Row >
      <Col className="py-2 p-0 p-lg-4" lg={8}>
      <Container className={styles.Content}>
      <Nav variant="tabs" className="mb-4" activeKey={activeTab} onSelect={setActiveTab}>
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
          {connections.length === 0 ? (
            <p className="text-muted">No connections found.</p>
          ) : (
            connections.map((connection) => (
              <li key={connection.id} className="list-group-item bg-light">
                {connection.connection_name}
              </li>
            ))
          )}
        </ul>
      )}
      {activeTab === "pending" && (
        <p>Pending connections content goes here</p>
      )}
      {activeTab === "sent" && (
        <p>Sent connections content goes here</p>
      )}
    </Container>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2 mt-3">
        <Container className={styles.Content}>
       
          {profiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            <div className="list-unstyled mt-2">
              {profiles.map((profile) => {
                console.log("Profile owner username:", profile.owner_username);
                const pendingConnection = connections.find(
                  (conn) =>
                    conn.connection_name === profile.owner_username &&
                    conn.accepted === false
                );
                return (
                  profile.name.trim() !== "" && ( // Filter out empty names
                    <div
                      key={profile.id}
                      className="media mb-3 bg-light rounded p-3 d-flex align-items-center justify-content-between">
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
                          Pending
                        </Button>
                      ) : (
                        <Button
                          className={`rounded ${styles.Button}`}
                          size="sm"
                          onClick={() => handleConnect(profile.id)}>
                          Connect
                        </Button>
                      )}
                    </div>
                  )
                );
              })}
            </div>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default ConnectionsPage;
