import React from "react";
import { Link } from "react-router-dom";
import "../../css/pnr/PnRFooter.css";

function PnRFooter() {
  return (
    <footer className="footer1">
      <div className="footer-container1">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Path For You is dedicated to providing career opportunities and
            professional training programs to help you excel in your journey.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:http://www.pathforyou.in">
            www.pathforyou.in
            </a>
          </p>
          <p>Phone:+91 94247 50311</p>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section newsletter">
          <h3>Subscribe to our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2024 Path For You. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy Policy</Link> |{" "}
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default PnRFooter;
