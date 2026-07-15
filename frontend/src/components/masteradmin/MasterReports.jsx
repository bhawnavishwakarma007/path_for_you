import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const MasterReports = () => {
  const [reportType, setReportType] = useState('Users');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([
    { id: 1, name: 'Report 1', date: '2024-01-01', status: 'Complete' },
    { id: 2, name: 'Report 2', date: '2024-01-02', status: 'Pending' }
  ]);

  const handleGenerateReport = () => {
    // Report generation logic here
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Reports Management</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12} lg={6}>
          <Form className="p-4 bg-white rounded shadow-sm">
            <Form.Group className="mb-3">
              <Form.Label>Report Type</Form.Label>
              <Form.Select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="Users">Users</option>
                <option value="Courses">Courses</option>
                <option value="Payments">Payments</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date Range</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Button 
              variant="primary"
              onClick={handleGenerateReport}
              className="w-100"
            >
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="bg-white rounded shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Report Preview</h3>
              <div>
                <Button variant="secondary" className="me-2">
                  Export as PDF
                </Button>
                <Button variant="secondary">
                  Export as Excel
                </Button>
              </div>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.name}</td>
                    <td>{report.date}</td>
                    <td>
                      <span className={`badge bg-${report.status === 'Complete' ? 'success' : 'warning'}`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MasterReports;
