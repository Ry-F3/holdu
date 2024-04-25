import React from "react";
// Component
import Avatar from "../../Avatar";
// Styles
import horizontalStyles from "../../../styles/HorizontalRatingList.module.css";

const HorizontalRatingList = ({ ratings, currentIndex }) => {
  return (
    <div className={`${horizontalStyles.overflowHidden} p-1 mt-2`} >
      <div
      className={horizontalStyles.Transform}
        style={{
          transform: `translateX(-${currentIndex * 155}px)`,
        }}>
        {ratings.results.map((rating, index) => (
          <div
            key={index}
            className={`${horizontalStyles.horizontalContainer} card m-2 p-3 shadow bg-white`}
            >
            <div className="d-flex justify-content-center mt-2">
              <Avatar
                src={rating.created_by.image}
                alt={rating.created_by.owner_username}
                height={60}
                border
              />
            </div>
            <div className=" text-center small">
              <h3 className="mb-0 mt-1">{rating.created_by.owner_username}</h3>
              {/* Display stars based on the rating value */}
              <div>
                {[...Array(Math.floor(rating.rating))].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-warning mt-1"></i>
                ))}
              </div>
              <p className="mb-0">
                <small className="text-muted">{rating.created_at}</small>
              </p>
              <p className="small">{rating.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalRatingList;
