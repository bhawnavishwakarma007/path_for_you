import React from "react";
import PnRNavbar from "./PnRNavbar"; // Import Navbar component
import "../../css/pnr/PnRTrainings.css";

function PnRTrainings() {
  return (
    <div>
      <PnRNavbar /> {/* Navbar added here */}
      <div className="trainings">
        <h2>Training Programs</h2>
        <div className="training-card">
          <h3>Web Development Bootcamp</h3>
          <p>Duration: 3 months | Fee: ₹30,000</p>
          <button>Enroll Now</button>
        </div>
        <div className="training-card">
          <h3>Data Science with Python</h3>
          <p>Duration: 2 months | Fee: ₹25,000</p>
          <button>Enroll Now</button>
        </div>
        <div className="training-card">
          <h3>Machine Learning with TensorFlow</h3>
          <p>Duration: 3 months | Fee: ₹35,000</p>
          <button>Enroll Now</button>
        </div>
        <div className="training-card">
          <h3>Digital Marketing Fundamentals</h3>
          <p>Duration: 1.5 months | Fee: ₹18,000</p>
          <button>Enroll Now</button>
        </div>
        <div className="training-card">
          <h3>Cloud Computing with AWS</h3>
          <p>Duration: 2 months | Fee: ₹27,000</p>
          <button>Enroll Now</button>
        </div>
        <div className="training-card">
          <h3>UI/UX Design</h3>
          <p>Duration: 1.5 months | Fee: ₹20,000</p>
          <button>Enroll Now</button>
        </div>
      </div>
    </div>
  );
}

export default PnRTrainings;
