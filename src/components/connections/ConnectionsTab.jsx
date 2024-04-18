import React from "react";
import { Link } from "react-router-dom";
// Bootstrap
import { Button } from "react-bootstrap";
// Styles
import connectStyles from "../../styles/ConnectionsPage.module.css";
import styles from "../../App.module.css"

const ConnectionsTab = ({ connections, handleDeleteConnection, profile }) => {
  console.log("connections", connections);

  return (
    <ul className="list-group">
      {/* Render connections */}
      {connections.map((connection) => {
        if (connection.accepted) {
          return (
            <li
              key={connection.id}
              className="list-group-item bg-white d-flex align-items-center justify-content-between">
              <Link to={`/profiles/${connection.connection}/user/`}>
                <div className="ml-2">
                  <h5 className="mt-0 mb-0 small">
                    {" "}
                    {connection.connection_name}
                  </h5>
                </div>
              </Link>
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
          Math.max(5 - connections.filter((conn) => conn.accepted).length, 0)
        ),
      ].map((_, index) => (
        <li key={`dummy-${index}`} className="list-group-item">
          <div className="bg-light p-3 rounded"></div>
        </li>
      ))}
      {/* Render message if no accepted connections are found */}
      {connections.filter((conn) => conn.accepted).length === 0 && (
        <div className="list-group-item">
          <p className={` ${styles.Background} text-white  p-2 rounded small mb-0`}>
            No connections found.
          </p>
        </div>
      )}
    </ul>
  );
};

export default ConnectionsTab;
