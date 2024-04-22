import React from "react";

const DummyApplicantBox = ({ index }) => {
  return (
    <div
      key={`dummy-applicant-${index}`}
      className="mr-3 bg-light p-4 rounded d-flex flex-column justify-content-center align-items-center"
      style={{ minWidth: "150px" }}>
      <i className="fas fa-ban text-muted"></i>
    </div>
  );
};

export default DummyApplicantBox;
