import React, { useEffect, useState } from "react";
import axios from "axios";
// Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
// Styles
import styles from "../../App.module.css";
// Components
import RecentProfiles from "../../components/connections/RecentProfiles";
import ConnectionsTab from "../../components/connections/ConnectionsTab";
import PendingTab from "../../components/connections/PendingTab";
import SentTab from "../../components/connections/SentTab";
import Spinner from "../../components/Spinner";
// Contexts
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileContext";

const ConnectionsPage = () => {
  const setProfileData = useSetProfileData();
  const profileData = useProfileData();
  const [profileType, setProfileType] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeTab, setActiveTab] = useState("connections"); // Track active tab
  const [activeTabProfiles, setActiveTabProfiles] = useState("recentProfiles");
  const [pendingConnections, setPendingConnections] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading indicator
  const [initialLoad, setInitialLoad] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    if (profileData && profileData.profile_type) {
      setProfileType(profileData.profile_type);
    }
  }, [profileData, profileType]);

  const fetchConnections = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/connections/");
      setConnections(response.data.results);
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
      // Handle error, show error message, etc.
    }
    delay(100).then(() => setIsLoading(false));
    setInitialLoad(true);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      // Set loading state to true
      setIsLoading(true);

      try {
        // Simulate delay of 1 second before fetching profiles
        setTimeout(async () => {
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
        }); // 1000 milliseconds delay
      } catch (error) {
        console.error(error);
        // setIsLoading(false);
        // Handle error, show error message, etc.
      }
      // setIsLoading(false);
    };

    fetchProfiles();
  }, [setProfileData]);

  // Function to fetch pending connections
  const fetchPendingConnections = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/pending-connections/");
      setPendingConnections(response.data.results);
    } catch (error) {
      console.error("Error fetching pending connections:", error);
      // setIsLoading(false);
      // Handle error, show error message, etc.
    }
    // setIsLoading(false);
  };

  // useEffect to fetch pending connections on component mount
  useEffect(() => {
    fetchPendingConnections();
  }, []);

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
      <>
        <Col className="py-2 p-0 p-lg-4" lg={8}>
          <Container
            className={`bg-transparent border-none border-bottom-none`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}></Container>

          <Container
            className={`${styles.Content} bg-white border-bottom-none mb-3 d-block d-lg-none`}>
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
              {/* RecentProfiles mobile */}
              <RecentProfiles
                activeTabProfiles={activeTabProfiles}
                searchQuery={searchQuery}
                filteredProfiles={filteredProfiles}
                profiles={profiles}
                connections={connections}
                pendingConnections={pendingConnections}
                profileData={profileData}
                handleConnect={handleConnect}
                limit={4}
              />
            </Container>
          </Container>

          {isLoading && !initialLoad ? (
            <Container
              className={`bg-transparent border-none border-bottom-none`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "430px",
              }}>
              <Spinner size={60} />
            </Container>
          ) : (
            <Container
              className={`${styles.Content} bg-white border-bottom-none`}>
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
                <ConnectionsTab
                  connections={connections}
                  handleDeleteConnection={handleDeleteConnection}
                />
              )}
              {activeTab === "pending" && (
                <PendingTab
                  pendingConnections={pendingConnections}
                  handleAccept={handleAccept}
                  handleDecline={handleDecline}
                />
              )}
              {activeTab === "sent" && (
                <SentTab
                  connections={connections}
                  handleUnsend={handleUnsend}
                />
              )}
            </Container>
          )}
        </Col>

        <Col md={4} className="d-none d-lg-block p-0 p-lg-2 mt-3">
          <Container
            className={`${styles.Content} bg-white border-bottom-none`}>
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

              <RecentProfiles
                activeTabProfiles={activeTabProfiles}
                searchQuery={searchQuery}
                filteredProfiles={filteredProfiles}
                profiles={profiles}
                connections={connections}
                pendingConnections={pendingConnections}
                profileData={profileData}
                handleConnect={handleConnect}
                limit={8}
              />
            </Container>
          </Container>
        </Col>
      </>
    </Row>
  );
};

export default ConnectionsPage;
