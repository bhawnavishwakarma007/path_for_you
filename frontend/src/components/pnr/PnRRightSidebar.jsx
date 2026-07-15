import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/pnr/PnRRightSidebar.css";

function PnRRightSidebar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="rgsidebar">
      {/* Login Section */}
      <div className="login-box">
        <h3>Login</h3>
        <label>Username</label>
        <input type="text" placeholder="Enter username" />
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
        <div className="captcha">
          <p>
            <strong>nsskE</strong>
          </p>
          <input type="text" placeholder="Enter Captcha" />
        </div>
        <button className="login-btn">LOGIN</button>
        <Link to="#">Forgot Password?</Link>
        <Link to="#">New User? Register Now</Link>
      </div>
    </div>
  );
}

export default PnRRightSidebar;
