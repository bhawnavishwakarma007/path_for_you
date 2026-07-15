import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCubes, FaClock, FaSync, FaChartLine, FaUsers, FaClipboardCheck } from 'react-icons/fa';

const MasterModulesOverview = () => {
  return (
    <Container fluid className="py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-primary">Modules Overview</h2>
          <p className="text-muted">Monitor and manage your learning modules</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary">
            <FaClipboardCheck className="me-2" />
            Create New Module
          </Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Active Modules</h6>
                  <h2 className="mb-0 fw-bold">12</h2>
                  <small className="text-success">
                    <FaChartLine className="me-1" />
                    +2.5% from last month
                  </small>
                </div>
                <div className="p-3 bg-primary bg-opacity-10 rounded">
                  <FaCubes className="text-primary fs-1" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Modules</h6>
                  <h2 className="mb-0 fw-bold">3</h2>
                  <small className="text-warning">
                    <FaClock className="me-1" />
                    Awaiting Review
                  </small>
                </div>
                <div className="p-3 bg-warning bg-opacity-10 rounded">
                  <FaClock className="text-warning fs-1" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Recent Updates</h6>
                  <h2 className="mb-0 fw-bold">5</h2>
                  <small className="text-success">
                    <FaSync className="me-1" />
                    Last 7 Days
                  </small>
                </div>
                <div className="p-3 bg-success bg-opacity-10 rounded">
                  <FaSync className="text-success fs-1" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Module Engagement</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="p-2 bg-info bg-opacity-10 rounded me-3">
                  <FaUsers className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0">Active Users</h6>
                  <small className="text-muted">1,234 users this month</small>
                </div>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-info" style={{ width: '75%' }}></div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-4">Completion Rate</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="p-2 bg-success bg-opacity-10 rounded me-3">
                  <FaClipboardCheck className="text-success" />
                </div>
                <div>
                  <h6 className="mb-0">Module Completion</h6>
                  <small className="text-muted">85% average completion rate</small>
                </div>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-success" style={{ width: '85%' }}></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MasterModulesOverview;







