// src/components/p&r/PnRJobs.jsx

import React, { useEffect, useState } from "react";
import "../../css/pnr/PnRJobs.css";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineBookmarkBorder, MdClose } from "react-icons/md";
import PnRNavbar from "./PnRNavbar";
import jobApi from "../../api/jobApi";

function PnRJobs() {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("All");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      let response;
      if (jobType === "All") {
        response = await jobApi.getAllJobs();
      } else {
        response = await jobApi.getJobsByType(jobType);
      }
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobType]);

  const handleMoreDetails = (type, id) => {
    navigate(`/modulei/p&rjobdetails/${encodeURIComponent(type)}/${id}`);
  };

  return (
    <div>
      <PnRNavbar />
      <div className="job-listings-container">
        <div className="job-type-buttons">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
          <button className="bt" onClick={() => setJobType("All")}>
            All Jobs
          </button>
          <button className="bt" onClick={() => setJobType("Technical")}>
            Technical Jobs
          </button>
          <button className="bt" onClick={() => setJobType("Non-Technical")}>
            Non-Technical Jobs
          </button>
        </div>

        <div className="job-div">
          <div className="job-cont1">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.job_id} className="job-card">
                  <div className="job-header">
                    <p className="job-title">{job.jobtitle}</p>
                    <div className="job-icons">
                      <MdOutlineBookmarkBorder className="icon" />
                      <MdClose className="icon" />
                    </div>
                  </div>
                  <div className="job-info">
                    <p>
                      <FaBuilding /> {job.job_company}
                    </p>
                    <p>
                      <FaMapMarkerAlt /> {job.jobLocation}
                    </p>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-dates">
                    <div>📅 Posted: {new Date(job.createdAt).toLocaleDateString()}</div>
                    <div>
                      🟢 Apply Start: {new Date(job.applyStartDate).toLocaleDateString()}
                    </div>
                    <div>⏳ Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
                  </div>
                  <button
                    onClick={() => handleMoreDetails(job.jobType, job.job_id)}
                    className="apply-btn"
                  >
                    View More Details
                  </button>
                </div>
              ))
            ) : (
              <p className="no-jobs">No jobs available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PnRJobs;
