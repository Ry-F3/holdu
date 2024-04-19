import React from "react";
// Styles
import appStyles from "../../App.module.css";
import topJobs from "../../styles/TopJobs.module.css";
import Pointer from "../../styles/Pointer.module.css";
// Bootstrap
import Container from "react-bootstrap/Container";

function TopJobs({
  popularJobs,
  handleJobClick,
  handleClearClick,
  showClearButton,

}) {
  const maxJobsToShow = 6;
  const displayedJobs = popularJobs.slice(0, maxJobsToShow);

  return (
    <Container className={`mt-3`}>
      <div
        className={`${appStyles.Background} list-group-item rounded d-flex justify-content-center align-items-center mb-2`}>
        <h3 className={`${topJobs.H3} p-3 mb-0`}>Top Jobs</h3>
        {showClearButton && (
          <button className="btn btn-danger" onClick={handleClearClick}>
            <i className="fa-solid fa-broom"></i> Clear
          </button>
        )}
      </div>

      {displayedJobs.length > 0 ? (
        <ul className={`list-group ${Pointer.Pointer}`}>
          {displayedJobs.map((job) => (
            <li
              key={job.job_listing_id}
              onClick={() => handleJobClick(job.job_listing_id)}
              className={`${topJobs.Item} ${topJobs.boldText} list-group-item d-flex justify-content-between align-items-center`}>
              <div>
                <span className="fw-bold">{job.title}</span>

                <span
                  className={`badge ${appStyles.Background} p-2 text-white rounded-pill ml-2`}>
                  <i className="fa-solid fa-location-dot"></i> {job.location}
                </span>

                <span
                  className={`ml-2 badge bg-secondary text-white p-2 rounded-pill mr-2 `}>
                  <i className="fa-solid fa-heart"></i>
                  <span
                    className={`badge ${appStyles.Background} ${topJobs.Icons} rounded-pill mx-1`}>
                    {job.likes_count}
                  </span>
                </span>
              </div>
              <span className={`badge bg-warning text-black p-2 rounded-pill `}>
                <i className="fa-solid fa-briefcase"></i>{" "}
                <span
                  className={`badge ${appStyles.Background} ${topJobs.Icons} rounded-pill`}>
                  {job.applicants.length}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No popular jobs found.</p>
      )}
    </Container>
  );
}

export default TopJobs;
