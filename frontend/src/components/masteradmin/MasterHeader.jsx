
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../../css/masteradmin/MasterHeader.css';

const MasterHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here - clear tokens/session etc
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold">MasterAdmin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/master/admin-dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            <Nav.Link as={Link} to="/help">Help</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <FaBell className="text-secondary fs-5" style={{ cursor: 'pointer' }} />
              <FaUser className="text-secondary fs-5" style={{ cursor: 'pointer' }} />
              <Button 
                variant="outline-danger" 
                className="d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MasterHeader;
