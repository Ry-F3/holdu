import React from "react";
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
            <div className="ml-2">
              <h5 className="mt-0 mb-0 small"> {pendingConnection.owner}</h5>
            </div>
          <div>
            <Button
              variant="sm"
              aria-label="accept connection"
              className={`rounded mr-2 ${styles.AcceptButton}`}
              onClick={() => handleAccept(pendingConnection.id)}>
                
              Accept
            </Button>
            <Button
              variant="sm"
              aria-label="decline connection"
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
