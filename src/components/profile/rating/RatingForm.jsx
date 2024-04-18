import React from "react";
// styles
import profileStyles from "../../../styles/ProfileView.module.css"

const RatingForm = ({
  rating,
  handleStarClick,
  comment,
  handleCommentChange,
  handleSubmit,

}) => {
  return (
    <div>
      <h2 className="mt-3">Leave a rating</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group p-3">
          <label className="d-none">Rating:</label>
          <div className={profileStyles.Stars}>
            {[1, 2, 3, 4, 5].map((index) => (
              <i
                key={index}
                className={index <= rating ? "fas fa-star" : "far fa-star"}
                onClick={() => handleStarClick(index)}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="d-none">Comment:</label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            rows="3"
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className={`btn btn-primary`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
