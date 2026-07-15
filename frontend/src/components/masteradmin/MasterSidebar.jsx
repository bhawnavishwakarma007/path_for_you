import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  FaTasks,
  FaBriefcase,
  FaBook,
  FaDollarSign,
  FaUserShield,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

const MasterSidebar = () => {
  return (
    <div
      className="bg-light shadow-sm"
      style={{
        width: "250px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: "60px", // Adjust to align with header height
      }}
    >
      <Nav className="flex-column p-3">
        <Nav.Item>
          <Nav.Link as={Link} to="/master/modulesmanagement" className="d-flex align-items-center gap-2 text-dark">
            <FaTasks /> Modules Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/master/jobsmanagement" className="d-flex align-items-center gap-2 text-dark">
            <FaBriefcase /> Jobs Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/master/coursesmanagement" className="d-flex align-items-center gap-2 text-dark">
            <FaBook /> Courses Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/master/paymentsmanagement" className="d-flex align-items-center gap-2 text-dark">
            <FaDollarSign /> Payments Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/master/subadminmanagement" className="d-flex align-items-center gap-2 text-dark">
            <FaUserShield /> Subadmin Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/master/reports" className="d-flex align-items-center gap-2 text-dark">
            <FaChartBar /> Reports
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/master/notifications" className="d-flex align-items-center gap-2 text-dark">
            <FaBell /> Notifications
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default MasterSidebar;





