import React from "react";
import { Link } from "react-router-dom";
import "../../css/pnr/PnRNavbar.css";

function PnRNavbar() {
  return (
    <nav className="navbar1">
      <div className="logo">Path For You</div>
      <div className="menu">
        <Link to="/">Home  |</Link>
        <Link to="/modulei/p&rhome">Jobs |</Link> {/* New button added */}
        <Link to="/modulei/p&rjobs">Jobs List  |</Link>
        <Link to="/modulei/p&rtraining">Trainings  |</Link>
        <Link to="/modulei/p&rnotification">Notifications</Link>
        
      </div>
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </nav>
  );
}

export default PnRNavbar;
