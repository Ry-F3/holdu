import React from 'react';
// Bootstrap
import Button from "react-bootstrap/Button";

const RatingNavigationButtons = ({ prevRating, nextRating }) => {
  return (
    <div className="mt-2">
      <Button className="btn btn-secondary rounded-circle mr-3" onClick={prevRating}>
        <i className="fas fa-chevron-left"></i>
      </Button>
      <Button className="btn btn-secondary rounded-circle" onClick={nextRating}>
        <i className="fas fa-chevron-right"></i>
      </Button>
    </div>
  );
};

export default RatingNavigationButtons;
