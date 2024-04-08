import React from "react";

const JobPostHomeItem = ({
  title,
  description,
  location,
  salary,
  closing_date,
  applicants,
  created_at,
}) => {
  return (
    <li className="py-3 mb-3 rounded p-3 position-relative">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-1">{title} </h3>

          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3 small">
              {location} <i className="fas fa-map-marker-alt text-muted"></i>
            </p>

            <p className="mb-0 small mr-2">£{salary}/hr</p>
            {/* <p className="mb-0 small mr-2">{created_at}</p> */}
          </div>
        </div>
        <div>
          <div className="position-relative">
            {/* <div
              className={`${appStyles.myPointer} d-flex align-items-center justify-content-end`}
            >
              <Button
                className="mb-5 d-flex align-items-center justify-content-center"
                onClick={handleDelete}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1 mb-2 small">Job Description: {description}</p>
        <div className="d-flex align-items-center">
          <p
            className="mb-0 mt-1 small"
            style={{
              width: "200px",
              height: "28px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              padding: "4px",
              paddingLeft: "16px",
            }}>
            Closing Date: {closing_date}
          </p>
          {/* <p
            className={`${appStyles.myPointer} mb-0 mr-5 ml-3`}
            onClick={handleEdit}
          >
            <i className="far fa-edit"></i>
          </p> */}

          <span className="mr-1 ml-3">Applicants:</span>
          <span className="badge bg-secondary text-white">
            {applicants ? applicants.length : 0}
          </span>
        </div>
      </div>
    </li>
  );
};

export default JobPostHomeItem;
