import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'; // Import Link

import {
  faLightbulb,
  faHeadset,
  faCheckCircle,
  faBook,
  faFileAlt,
  faNewspaper,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import '../../css/RnP/ResearchLandingPage.css';
import "bootstrap/dist/css/bootstrap.min.css";

const ResearchLandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar bg-light">
        <div className="container">
          <h1 className="navbar-brand">Research & Publication Guidance</h1>
          <div>
          <Link to="/">
            <button className="btn btn-outline-primary mx-2">Back</button>
            </Link>
          <Link to="/moduleii/rp_u_login">
            <button className="btn btn-outline-primary mx-2">Login</button>
            </Link>
            <Link to="/moduleii/rp_u_registrationform">
            <button className="btn btn-primary">Register</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-light text-center py-5">
        <div className="container">
          <h2>Your Research Journey Starts Here</h2>
          <p className="lead">
            Get expert guidance for thesis writing, synopsis creation, paper
            publications, and research presentations.
          </p>
          <div>
          <Link to="/moduleii/rp_u_registrationform">
            <button className="btn btn-primary mx-2">Register Now</button>
            </Link>
            <Link to="/moduleii/research-guidance">
            <button className="btn btn-outline-primary">Explore Services</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-5">
        <div className="container text-center">
          <h3>Our Services</h3>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <FontAwesomeIcon icon={faBook} size="2x" className="mb-3 text-primary" />
                  <h5>Thesis Guidance</h5>
                  <p>Step-by-step guidance for writing your thesis with expert support.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <FontAwesomeIcon icon={faFileAlt} size="2x" className="mb-3 text-primary" />
                  <h5>Synopsis Creation</h5>
                  <p>Learn to create compelling research synopses that stand out.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <FontAwesomeIcon icon={faNewspaper} size="2x" className="mb-3 text-primary" />
                  <h5>Paper Publications</h5>
                  <p>Get your research papers published in renowned journals.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-3 text-primary" />
                  <h5>Presentation Support</h5>
                  <p>Create impactful presentations for your research.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us bg-light py-5">
        <div className="container text-center">
          <h3>Why Choose Us</h3>
          <div className="row mt-4">
            <div className="col-md-4">
              <FontAwesomeIcon icon={faLightbulb} size="3x" className="mb-3 text-success" />
              <h5>Expert Guidance</h5>
              <p>Get support from experienced researchers and academicians.</p>
            </div>
            <div className="col-md-4">
              <FontAwesomeIcon icon={faHeadset} size="3x" className="mb-3 text-success" />
              <h5>24/7 Support</h5>
              <p>Round-the-clock assistance for all your research needs.</p>
            </div>
            <div className="col-md-4">
              <FontAwesomeIcon icon={faCheckCircle} size="3x" className="mb-3 text-success" />
              <h5>Guaranteed Results</h5>
              <p>Proven track record of successful publications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>
                Leading platform for research guidance and publication support.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>Services</li>
                <li>Helpdesk</li>
                <li>Login</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>Email: ahirwallaxmi51@gmail.com</p>
              <p>Phone: +91 6265495149</p>
            </div>
          </div>
          <div className="text-center mt-3">
            © 2025 Research & Publication Guidance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResearchLandingPage;
