import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import dataImage from "../../assets/dataImage.png";

import appStyles from "../../App.module.css";
import spinnerStyle from "../../styles/Spinner.module.css";
import formStyles from "../../styles/JobsCreateForm.module.css";

import { axiosReq } from "../../api/axiosDefaults";

import JobsPost from "./JobsPost";
import Asset from "../../components/Asset";

import Spinner from "../../components/Spinner";
import TopJobs from "../../components/job/TopJobs";

function JobsHomePage({ searchQuery }) {
  const [jobsPost, setJobsPost] = useState({ results: [] });

  const [loadingPage, setLoadingPage] = useState(false);
  const [filteredJobsPost, setFilteredJobsPost] = useState([]);
  const [previouslyClickedJob, setPreviouslyClickedJob] = useState(null);
  const [showClearButton, setShowClearButton] = useState(false);

  // Determine the most popular jobs based on the number of applicants
  const popularJobs = filteredJobsPost.sort(
    (a, b) => b.applicants.length - a.applicants.length
  );
    // Define a callback function to refetch jobs data only on larger screens
    const refetchJobsData = async () => {
      if (window.innerWidth >= 868) {
        fetchJobs(searchQuery);
      }
    };

  // Define fetchJobs function
  const fetchJobs = async (query) => {
    try {
      setLoadingPage(true);
      const apiUrl = `/jobs/?search=${query}`;
      const { data } = await axiosReq.get(apiUrl);
      console.log("Fetched Jobs:", data.results);
      setJobsPost({ results: data.results.filter((job) => !job.is_listing_closed) });
      setFilteredJobsPost(data.results.filter((job) => !job.is_listing_closed));
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoadingPage(false);
      }, 2500); 
    }
  };

  useEffect(() => {
    // Fetch jobs when searchQuery changes
    if (searchQuery !== "") {
      fetchJobs(searchQuery);
    } else {
      fetchJobs("");
    }
    console.log("The value of searchQuery is:", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleJobClick = (jobId) => {
    console.log("Job click");
    console.log("Clicked job ID:", jobId);
    console.log("Current jobs post:", jobsPost);
    console.log("Previously clicked job:", previouslyClickedJob);

    // Clear previously clicked job if exists
    if (previouslyClickedJob === jobId) {
      setPreviouslyClickedJob(null);
      // Refetch jobsPost
      fetchJobs(searchQuery);
    } else {
      // Set the clicked job as previously clicked
      setPreviouslyClickedJob(jobId);
      // Filter out the selected job from the current list
      const updatedJobs = filteredJobsPost.filter(
        (job) => job.job_listing_id === jobId
      );
      console.log("Updated jobs after filtering:", updatedJobs);
      setJobsPost({ results: updatedJobs });
      setShowClearButton(true);
    }
  };

  const handleClearClick = () => {
    // Clear the clicked job and refetch jobs
    setPreviouslyClickedJob(null);
    fetchJobs(searchQuery);
    setShowClearButton(false); // Hide the clear button
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-4" lg={8}>
        {loadingPage ? (
          <Container
            style={{ backgroundColor: "transparent", border: "none" }}
            className={`${appStyles.Content} ${formStyles.minHeightContent} d-flex flex-column justify-content-center position-relative`}
          >
            <div className={`${spinnerStyle.spinnerContain} align-items-center`}>
              <Spinner size="50px" />
            </div>
          </Container>
        ) : (
          <>
            {jobsPost.results.length ? (
              [...jobsPost.results]
                .reverse()
                .map((jobPost) => (
                  <JobsPost
                    key={jobPost.job_listing_id}
                    {...jobPost}
                    postJob
                    setJobsPost={setJobsPost}
                    like_id={jobPost.like_id}
                    refetchJobsData={refetchJobsData}
                  />
                ))
            ) : (
              <Container>
                <Asset src={dataImage} message="No results found." />
              </Container>
            )}
          </>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <TopJobs
          popularJobs={popularJobs}
          handleJobClick={handleJobClick}
          handleClearClick={handleClearClick}
          showClearButton={showClearButton}
        />
      </Col>
    </Row>
  );
}

export default JobsHomePage;