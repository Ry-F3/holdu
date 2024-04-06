// JobDataContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults"; // Import your axios request utility or API module

// Create a context for job data
const JobDataContext = createContext();

// Custom hook to consume the job data context
export const useJobDataContext = () => useContext(JobDataContext);

// Job data context provider component
export const JobDataProvider = ({ children }) => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch job data from API
  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosReq.get("/jobs/"); // Adjust the API endpoint as per your backend
        setJobData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    console.log("job data", jobData);
    fetchJobData();
  }, []);

  // Provide values to the context
  const contextValue = {
    jobData,
    loading,
    error,
  };

  return (
    <JobDataContext.Provider value={contextValue}>
      {children}
    </JobDataContext.Provider>
  );
};
