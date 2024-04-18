import React from 'react';
import { Badge } from 'react-bootstrap';

const RatingContent = ({ ratings, currentIndex }) => {
  return (
    <>
      {ratings.results.map((rating, index) => (
        <div
          key={index}
          className="mb-2"
          style={{
            display: index === currentIndex ? "block" : "none",
          }}
        >
          <span>
            <p>
              {rating.comment}{" "}
              <Badge variant="secondary">
                {rating.rating}
              </Badge>
            </p>
          </span>
        </div>
      ))}
    </>
  );
};

export default RatingContent;