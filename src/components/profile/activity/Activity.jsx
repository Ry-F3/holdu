import React from 'react';
// Bootstrap
import { Container } from "react-bootstrap";

const Activity = ({ postCount, filteredJobsPost }) => {
  return (
    <Container className={`mt-0 p-4`}>
      <h1>Activity</h1>
      {postCount > 0 ? (
        <ul className={`list-unstyled mb-3  p-0 mt-2`}>
          {filteredJobsPost.map((jobPost, index) => (
            <li
              key={index}
              className="border-bottom rounded p-3 m-2 small mt-2"
            >
              <p>
                <strong>{jobPost.owner}</strong> {jobPost.action}:
              </p>
              <span>{jobPost.title}</span>
              {/* Render details of each job post here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No activity to show.</p>
      )}
    </Container>
  );
};

export default Activity;