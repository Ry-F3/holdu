import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// Component
import JobsPost from "./JobsPost";

function JobsPostPage() {
  const { id } = useParams();
  const [jobsPost, setJobsPost] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/jobs/post/${id}/`);
        setJobsPost(response.data);
      } catch (err) {
        // Do nothing
      }
    };

    fetchData();
  }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
       
        {/* Pass necessary data as props to JobsPost component */}
        <JobsPost
          key={jobsPost.id}
          employer_profile={jobsPost.employer_profile}
          job_listing_id={jobsPost.job_listing_id}
          updated_at={jobsPost.updated_at}
          title={jobsPost.title}
          description={jobsPost.description}
          location={jobsPost.location}
          salary={jobsPost.salary}
          closing_date={jobsPost.closing_date}
          created_at={jobsPost.created_at}
          likesCount={jobsPost.likes_count}
          applicants={jobsPost.applicants}
          postJob
        />

      </Col>
      
    </Row>
  );
}

export default JobsPostPage;
