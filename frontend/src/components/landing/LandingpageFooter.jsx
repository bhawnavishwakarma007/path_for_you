import React from 'react';
import '../../css/landing/LandingpageFooter.css';
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const LandingpageFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>Path For You is dedicated to providing placement services, job-oriented training, corporate staffing, and much more to empower your career journey.</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li>Placement & Recruitment</li>
          <li>Job-Oriented Training</li>
          <li>Corporate Training</li>
          <li>Research Guidance</li>
          <li>Web Development</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: hrpathforyou@gmail.com</p>
        <p>Phone: +91-9424750311</p>
        <p>Website: <a href="http://www.pathforyou.in">www.pathforyou.in</a></p>
        <p>Kanadia Main Road, Indore, MP- 452016</p>
      </div>
      <div className="footer-section social">
        <h4>Follow Us</h4>
        <span><FaFacebook /> <FaInstagram /> <FaLinkedin /> <FaTwitter /></span>
      </div>
      <div className="copyright">
        © 2025 Path For You. All rights reserved.
      </div>
    </footer>
  );
};

export default LandingpageFooter;
