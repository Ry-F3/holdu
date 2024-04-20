import React from 'react';
import Avatar from '../../Avatar';

const HorizontalRatingList = ({ ratings, currentIndex }) => {
  // Check if there are less than three ratings
  const shouldRender = ratings.results && ratings.results.length >= 3;

  return shouldRender ? (
    <div className="p-1 mt-2" style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <div style={{ display: "flex", flexWrap: "nowrap", transition: "transform 0.5s", transform: `translateX(-${currentIndex * 155}px)` }}>
        {ratings.results.map((rating, index) => (
          <div key={index} className="card m-2 p-3 shadow bg-white" style={{ width: "150px", maxHeight: "250px", flexShrink: 0 }}>
            <div className="d-flex justify-content-center mt-2">
              <Avatar src={rating.created_by.image} alt={rating.created_by.owner_username} height={60} border />
            </div>
            <div className=" text-center small">
              <h3 className="mb-0 mt-1">{rating.created_by.owner_username}</h3>
              {/* Display stars based on the rating value */}
              <div>
                {[...Array(Math.floor(rating.rating))].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-warning mt-1"></i>
                ))}
              </div>
              <p className="mb-0"><small className="text-muted">{rating.created_at}</small></p>
              <p className="small">{rating.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null; // Render nothing if there are less than three ratings
};

export default HorizontalRatingList;
