import React, { useState } from "react";
import "../../css/pnr/PnRLeftSidebar.css";
import {
  FaFilter,
  FaBriefcase,
  FaMapMarkerAlt,
  FaFileAlt,
  FaChartLine,
  FaChevronDown,
} from "react-icons/fa";

function PnRLeftSidebar() {
  const [showJobType, setShowJobType] = useState(true);
  const [showLocation, setShowLocation] = useState(true);

  return (
    <div className="sidebar">
      {/* Filters Section */}
      <h3 className="sidebar-title">
        <FaFilter /> Filters
      </h3>

      {/* Job Type Filter */}
      <div className="filter-section">
        <h4 onClick={() => setShowJobType(!showJobType)}>
          <FaBriefcase /> Job Type{" "}
          <FaChevronDown className={`chevron ${showJobType ? "rotate" : ""}`} />
        </h4>
        {showJobType && (
          <ul>
            <li>
              <input type="checkbox" id="fulltime" />{" "}
              <label htmlFor="fulltime">FullTime</label>
            </li>
            <li>
              <input type="checkbox" id="parttime" />{" "}
              <label htmlFor="parttime">PartTime</label>
            </li>
          </ul>
        )}
      </div>

      {/* Location Filter */}
      <div className="filter-section">
        <h4 onClick={() => setShowLocation(!showLocation)}>
          <FaMapMarkerAlt /> Location{" "}
          <FaChevronDown
            className={`chevron ${showLocation ? "rotate" : ""}`}
          />
        </h4>
        {showLocation && (
          <ul>
            <li>
              <input type="checkbox" id="remote" />{" "}
              <label htmlFor="remote">Remote</label>
            </li>
            <li>
              <input type="checkbox" id="onsite" />{" "}
              <label htmlFor="onsite">OnSite</label>
            </li>
          </ul>
        )}
      </div>

      {/* Quick Links Section */}
      <h3 className="sidebar-title">
        <FaChartLine /> Quick Links
      </h3>
      <ul className="quick-links">
        <li>
          <FaFileAlt /> Application Status
        </li>
        <li>
          <FaChartLine /> Results
        </li>
      </ul>
    </div>
  );
}

export default PnRLeftSidebar;
