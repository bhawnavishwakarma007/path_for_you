// src/components/p&r/PnRHome.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./PnRLeftSidebar";
import Footer from "./PnRFooter";
import PnRNavbar from "./PnRNavbar";
import { useNavigate } from "react-router-dom";
import "../../css/pnr/PnRHome.css";
import jobApi from "../../api/jobApi"; // ← import jobApi directly

function PnRHome() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Directly use jobApi.getAllJobs() to hit GET /api/getjobs
        const response = await jobApi.getAllJobs();
        console.log("Fetched jobs:", response.data);
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]); // fallback to empty array
      }
    };
    fetchJobs();
  }, []);

  const handleViewMore = (jobType, jobId) => {
    navigate(`/modulei/p&rjobdetails/${encodeURIComponent(jobType)}/${jobId}`);
  };

  return (
    <div className="page-container1">
      <PnRNavbar />
      <div className="content-container1">
        <Sidebar />
        <div className="main-content1">
          <div className="section1">
            <h2>🌟 Latest Jobs</h2>
            <h6>Explore the latest job opportunities available for you.</h6>
            <div className="card-list1">
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <div key={job.job_id || index} className="card1">
                    <p>
                      <strong>Title:</strong> {job.jobtitle || "Unknown Title"}
                    </p>
                    <p>
                      <strong>Company:</strong> {job.job_company || "Unknown Company"}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.jobLocation || "Unknown Location"}
                    </p>
                    <p>
                      <strong>Type:</strong> {job.jobType || "Unknown Type"}
                    </p>
                    <button onClick={() => handleViewMore(job.jobType, job.job_id)}>
                      View More
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading jobs...</p>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PnRHome;
