import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import dataImage from "../../assets/dataImage.png";

import appStyles from "../../App.module.css";
import spinnerStyle from "../../styles/Spinner.module.css";
import formStyles from "../../styles/JobsCreateForm.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import JobsPost from "./JobsPost";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Spinner from "../../components/Spinner";

function JobsHomePage({ filter = "", searchQuery }) {
 
  const [query, setQuery] = useState("");
  const [jobsPost, setJobsPost] = useState({ results: [] });
  const [loadingPage, setLoadingPage] = useState(false);

  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchJobs = async () => {
      setQuery(searchQuery);
      try {
        setLoadingPage(true);
        const apiUrl = `/jobs/?search=${query}`;
        const { data } = await axiosReq.get(apiUrl);
        console.log("Fetched Jobs:", data.results);
        setJobsPost(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchJobs();
  }, [filter, pathname, searchQuery, currentUser, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  console.log("Posts before filtering:", jobsPost.results);

  // Filter out closed listings
  const filteredJobsPost = jobsPost.results.filter(job => !job.is_listing_closed);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-4" lg={8}>
        {/* <p>Popular profiles mobile</p> */}
        {loadingPage ? (
          <Container
            style={{ backgroundColor: "transparent", border: "none" }}
            className={`${appStyles.Content} ${formStyles.minHeightContent} d-flex flex-column justify-content-center position-relative`}>
            <div
              className={`${spinnerStyle.spinnerContain} align-items-center`}>
              <Spinner size="50px" />
            </div>
          </Container>
        ) : (
          <>
              {filteredJobsPost.length ? (
              [...filteredJobsPost]
                .reverse()
                .map((jobPost) => (
                  <JobsPost
                    key={jobPost.job_listing_id}
                    {...jobPost}
                    postJob
                    setJobsPost={setJobsPost}
                    like_id={jobPost.like_id}
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
        {/* <p>Popular profiles for desktop</p> */}
      </Col>
    </Row>
  );
}

export default JobsHomePage;
