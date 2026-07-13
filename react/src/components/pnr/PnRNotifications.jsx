import React from "react";
import PnRNavbar from "./PnRNavbar"; // Import Navbar component
import "../../css/pnr/PnRNotifications.css";

function PnRNotifications() {
  return (
    <div>
      <PnRNavbar /> {/* Navbar added here */}
      <div className="notifications">
        <h2>Notifications</h2>
        <div className="notification-card">
          <p>New training session on Web Development starts next week!</p>
        </div>
        <div className="notification-card">
          <p>Last date to apply for the Data Analyst job is tomorrow!</p>
        </div>
      </div>
    </div>
  );
}

export default PnRNotifications;
