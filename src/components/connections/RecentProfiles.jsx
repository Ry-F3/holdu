import React from "react";
import { Link } from "react-router-dom";
// Styles
import { Button } from "react-bootstrap";
import styles from '../../styles/ConnectionsPage.module.css'
// Components
import Avatar from "../Avatar";

const RecentProfiles = ({
  activeTabProfiles,
  searchQuery,
  filteredProfiles,
  profiles,
  connections,
  pendingConnections,
  profileData,
  handleConnect,
  limit,
 
}) => {
  return (
    <>
      {activeTabProfiles === "recentProfiles" && (
        <ul className="list-unstyled mt-2">
          {(searchQuery ? filteredProfiles : profiles)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, limit)
            .filter((profile) => {
              const hasAcceptedConnection = connections.some(
                (connection) =>
                  connection.connection_name === profile.owner_username &&
                  connection.accepted === true
              );

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
                    <Link to={`/profiles/${profile.id}/user/`}>
                    <div className="ml-2">
                      <h5 className="mt-0 mb-0 small">{profile.name}</h5>
                    </div>
                    </Link>
                  </div>
                  {pendingConnection ? (
                    <Button
                      className={`rounded `}
                      size="sm"
                      disabled>
                      Pending..
                    </Button>
                  ) : (
                    <Button
                      className={`rounded `}
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
    </>
  );
};

export default RecentProfiles;
