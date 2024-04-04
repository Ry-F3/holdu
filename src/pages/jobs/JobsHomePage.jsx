import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css"
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import JobsPost from "./JobsPost";


function JobsHomePage(message, filter="") {
  
const [jobsPost, setJobsPost] = useState({ results: [] });
const [loading, setLoading] = useState(false);
const {pathname} = useLocation();

useEffect(() => {
    const fetchJobs = async () => {
        try {
            const {data} = await axiosReq.get(`jobs/?${filter}`)
            setJobsPost(data)
            setLoading(true)
        } catch(err){
            console.log(err)
        }

    }  
    setLoading(false)
    fetchJobs();
}, [filter, pathname])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {loading? (
            <>
             {jobsPost.results.length ? (
                jobsPost.results.map(jobPost => (
                    <JobsPost key={jobPost.id} {...jobPost} />
                ))
             ) : (
                console.log("no results message")
             ) }
            </>
        ):(
            console.log('show spinner')
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default JobsHomePage;