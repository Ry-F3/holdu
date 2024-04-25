import React from "react";
import { Link } from "react-router-dom";
// Bootstrap
import { Button } from "react-bootstrap";
// Styles
import styles from "../../styles/ConnectionsPage.module.css";
import appStyles from "../../App.module.css";

const PendingTab = ({ pendingConnections, handleAccept, handleDecline }) => {
  return (
    <ul className="list-group">
      {pendingConnections.map((pendingConnection) => (
        <li
          key={pendingConnection.id}
          className="list-group-item d-flex align-items-center justify-content-between">
          {/* <span>{pendingConnection.owner}</span> */}
          <Link to={`/profiles/${pendingConnection.owner}/user`}>
            <div className="ml-2">
              <h5 className="mt-0 mb-0 small"> {pendingConnection.owner}</h5>
            </div>
          </Link>
          <div>
            <Button
              variant="sm"
              className={`rounded mr-2 ${styles.AcceptButton}`}
              onClick={() => handleAccept(pendingConnection.id)}>
              Accept
            </Button>
            <Button
              variant="sm"
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
      {pendingConnections.filter((conn) => !conn.accepted).length === 0 && (
        <div className="list-group-item">
          <p
            className={` ${appStyles.Background} text-white  p-2 rounded small mb-0`}>
            No pending connections found.
          </p>
        </div>
      )}
    </ul>
  );
};

export default PendingTab;
