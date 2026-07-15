// src/components/p&r/PnRJobDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaLaptopHouse,
  FaCheckCircle,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import "../../css/pnr/PnRJobDetails.css";
import PnRNavbar from "./PnRNavbar";
import jobApi from "../../api/jobApi";

const PnRJobDetails = () => {
  const { jobType, jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobApi.getJobByTypeAndId(jobType, jobId);
        if (response.data) {
          setJob(response.data);
        } else {
          setError("Job not found.");
        }
      } catch {
        setError("Failed to fetch job details.");
      }
    };
    fetchJob();
  }, [jobType, jobId]);

  if (error) return <p className="error">{error}</p>;
  if (!job) return <p className="loading">Loading job details...</p>;

  return (
    <div>
      <PnRNavbar />
      <div className="job-container">
        <h1 className="job-title">{job.jobtitle}</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>

        <section className="job-overview">
          <h2>Job Overview</h2>
          <div className="overview-grid">
            <div>
              <FaBuilding /> <strong>Company:</strong> {job.job_company}
            </div>
            <div>
              <FaMapMarkerAlt /> <strong>Location:</strong> {job.jobLocation}
            </div>
            <div>
              <FaMoneyBillWave /> <strong>Salary (LPA):</strong> {job.salary_LPA}
            </div>
            <div>
              <FaBriefcase /> <strong>Experience:</strong> {job.experience}
            </div>
            <div>
              <FaLaptopHouse /> <strong>Work from Home:</strong> {job.working_home}
            </div>
          </div>
        </section>

        <section className="job-description">
          <h2>Job Description</h2>
          <p>{job.description}</p>
          <h3>Key Responsibilities:</h3>
          <p>{job.responsibility}</p>
          <h3>Requirements:</h3>
          <p>{job.requirements}</p>
          <h3>Qualification:</h3>
          <p>{job.qualification}</p>
        </section>

        <section className="benefits">
          <h2>Benefits & Perks</h2>
          <div className="benefits-grid">
            <div>
              <FaCheckCircle /> <strong>HRA:</strong> {job.hra}
            </div>
            <div>
              <FaCheckCircle /> <strong>PF:</strong> {job.pf}
            </div>
            <div>
              <FaCheckCircle /> <strong>ESIC:</strong> {job.esic}
            </div>
            <div>
              <FaCheckCircle /> <strong>Insurance:</strong> {job.insurance}
            </div>
            <div>
              <FaCheckCircle /> <strong>Accommodation:</strong> {job.accommodation}
            </div>
            <div>
              <FaCheckCircle /> <strong>Other Facilities:</strong> {job.other_facility}
            </div>
          </div>
        </section>

        {jobId && (
          <div className="apply-container">
            <button
              className="apply-btn"
              onClick={() => navigate(`/modulei/p&rJobForm`)}
            >
              Apply Now
            </button>
          </div>
        )}

        <section className="contact-info">
          <h2>Contact Information</h2>
          <p>
            <FaEnvelope /> <strong>Email:</strong> {job.contactEmail || "N/A"}
          </p>
          <p>
            <FaPhone /> <strong>Phone:</strong> {job.contactPhone || "N/A"}
          </p>
        </section>
      </div>
    </div>
  );
};

export default PnRJobDetails;
