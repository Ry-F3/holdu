import React from "react";
import { Link } from "react-router-dom";
// Bootstrap
import { Button } from "react-bootstrap";
// Styles
import connectStyles from "../../styles/ConnectionsPage.module.css";
import appStyles from "../../App.module.css";

const SentTab = ({ connections, handleUnsend }) => {
  return (
    <ul className="list-group">
      {/* Render connections */}
      {connections.map((connection) => {
        const isSent = !connection.accepted && connection.owner; // Check if connection is sent by the user
        if (isSent) {
          return (
            <li key={connection.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
              <Link to={`/profiles/${connection.connection}/user`}>
                <div className="ml-2">
                  <h5 className="mt-0 mb-0 small">
                    {" "}
                    {connection.connection_name}
                  </h5>
                </div>
              </Link>
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
      
        <div className="list-group-item">
        <p
          className={` ${appStyles.Background} text-white  p-2 rounded small mb-0`}>
          No sent connections found.
        </p>
      </div>
      )}
    </ul>
  );
};

export default SentTab;
