import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/poster/logo.jpg";

const LandingpageNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar" 
    style={{ borderBottom: "0.2px solid #c2c2c2" }}>
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src={Logo}
            alt="Logo"
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/auth/adminlogin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LandingpageNavbar;
