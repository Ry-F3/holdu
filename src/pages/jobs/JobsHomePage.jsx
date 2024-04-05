import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
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
  const [jobsPost, setJobsPost] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const { pathname } = useLocation();

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchJobs = async () => {
      setQuery(searchQuery);
      try {
        setLoading(true); // Set loading to true before fetching data
        const apiUrl = `/jobs/?search=${query}`;
        console.log("Request URL:", apiUrl);
        const { data } = await axiosReq.get(apiUrl);
        setJobsPost(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching data (whether success or error)
      }
    };

    fetchJobs();
  }, [filter, pathname, searchQuery, currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2.5 seconds
    }, 2500); // 2500 milliseconds = 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {loading ? (
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
            {jobsPost.results.length ? (
              jobsPost.results.map((jobPost) => (
                <JobsPost key={jobPost.id} {...jobPost} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={dataImage} message="No results found." />
              </Container>
            )}
          </>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default JobsHomePage;
