import React from "react";
// Bootstrap
import { Button } from "react-bootstrap";
// Styles
import connectStyles from "../../styles/ConnectionsPage.module.css";

const SentTab = ({ connections, handleUnsend }) => {
  return (
    <ul className="list-group">
      {/* Render connections */}
      {connections.map((connection) => {
        const isSent = !connection.accepted && connection.owner; // Check if connection is sent by the user
        if (isSent) {
          return (
            <li key={connection.id} className="list-group-item bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <span>{connection.connection_name}</span>
                <Button
                  size="sm"
                  className={` ${connectStyles.Button}`}
                  onClick={() => handleUnsend(connection.id)}
                >
                  &#10006;
                </Button>
              </div>
            </li>
          );
        }
        return null; // Skip rendering if not sent by the user
      })}
      {/* Render dummy items */}
      {Array.from({
        length: Math.max(5 - connections.filter((conn) => !conn.accepted).length, 0),
      }).map((_, index) => (
        <li key={`dummy-${index}`} className="list-group-item">
          <div className="bg-light p-3 rounded"></div>
        </li>
      ))}
      {/* Render message if no sent connections are found */}
      {connections.filter((conn) => !conn.accepted).length === 0 && (
        <p className="text-muted">No sent connections found.</p>
      )}
    </ul>
  );
};

export default SentTab;
