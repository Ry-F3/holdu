import React from "react";
import { Button } from "react-bootstrap";
import styles from "../../styles/ConnectionsPage.module.css";

const PendingTab = ({ pendingConnections, handleAccept, handleDecline }) => {
  return (
    <ul className="list-group">
      {pendingConnections.map((pendingConnection) => (
        <li
          key={pendingConnection.id}
          className="list-group-item bg-light d-flex align-items-center justify-content-between"
        >
          <span>{pendingConnection.owner}</span>
          <div>
            <Button
              className={`rounded mr-2 ${styles.AcceptButton}`}
              onClick={() => handleAccept(pendingConnection.id)}
            >
              Accept
            </Button>
            <Button
              className={`rounded ${styles.DeclineButton}`}
              onClick={() => handleDecline(pendingConnection.id)}
            >
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
        <p className="text-muted">No pending connections found.</p>
      )}
    </ul>
  );
};

export default PendingTab;