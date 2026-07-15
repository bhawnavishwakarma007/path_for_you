import React from 'react';
import '../../css/RnP/RP_U_Login.css'; // Importing the CSS file

function RP_U_Login() {
  return (
    <div className="rp-login-container">
      <div className="rp-login-card">
        <div className="rp-login-header">
          <div className="rp-login-icon">🔒</div>
          <h2>Sign in to your account</h2>
          <p>
            Don't have an account? <a href="/moduleii/rp_u_registrationform">Register here</a>
          </p>
        </div>
        <form className="rp-login-form">
          <div className="rp-form-group">
            <label htmlFor="username">
              <i className="fa fa-user"></i>
              Username
            </label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div className="rp-form-group">
            <label htmlFor="password">
              <i className="fa fa-lock"></i>
              Password
            </label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <div className="rp-form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="rp-btn rp-btn-primary">
            <i className="fa fa-sign-in-alt"></i> Sign in
          </button>
        </form>
        <div className="rp-or-container">
          <span>Or continue with</span>
        </div>
        <div className="rp-social-buttons">
          <button className="rp-btn rp-google-btn">
            <i className="fa fa-google"></i> Google
          </button>
          <button className="rp-btn rp-github-btn">
            <i className="fa fa-github"></i> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default RP_U_Login;
