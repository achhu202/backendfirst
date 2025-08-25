import React, { useEffect, useState } from "react";
import axios from "axios";
import JobSearchBar from "../components/JobSearchBar";

const HomePage = () => {
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200 && Array.isArray(response.data.data)) {
          setJobs(response.data.data); // Update state with fetched jobs
          setError(null);
        } else {
          setJobs([]);
          setError("No jobs found");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Heading */}

      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
        Welcome to JobPortal
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Don't Wait For The Opportunity, Create It!
      </p>

    </div>
  );
};

export default HomePage;
