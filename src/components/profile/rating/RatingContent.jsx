import React from 'react';

const RatingContent = ({ ratings, currentIndex, handleStarClick }) => {
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
    
            </p>
            <div className="text-warning text-center">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <i
                  key={starIndex}
                  className={starIndex <= rating.rating ? "fas fa-star" : "far fa-star"}
                  onClick={() => handleStarClick(starIndex)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
              ))}
            </div>
          </span>
        </div>
      ))}
    </>
  );
};

export default RatingContent;
