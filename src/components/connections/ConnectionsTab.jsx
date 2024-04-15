import React from "react";
// Bootstrap
import { Button } from "react-bootstrap";
// Styles
import connectStyles from "../../styles/ConnectionsPage.module.css";

const ConnectionsTab = ({ connections, handleDeleteConnection }) => {
  return (
    <ul className="list-group">
      {/* Render connections */}
      {connections.map((connection) => {
        if (connection.accepted) {
          return (
            <li
              key={connection.id}
              className="list-group-item bg-light d-flex align-items-center justify-content-between"
            >
              {connection.connection_name}
              <div>
                <Button
                  className={` ${connectStyles.Button}`}
                  onClick={() => handleDeleteConnection(connection.id)}
                >
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
  );
};

export default ConnectionsTab;
