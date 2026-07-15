import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEdit, FaBriefcase, FaGraduationCap, FaMoneyBill, FaUserPlus, FaChartBar } from 'react-icons/fa';

const MasterSubadminAccess = () => {
  return (
    <Container fluid className="p-4">
      <h2 className="text-primary mb-4">Subadmin Access Management</h2>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-4">
              <FaEdit className="text-primary mb-3" size={40} />
              <Card.Title>Modules Management</Card.Title>
              <Card.Text className="text-muted">
                Add, edit, or delete modules in the system
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-4">
              <FaBriefcase className="text-success mb-3" size={40} />
              <Card.Title>Jobs Management</Card.Title>
              <Card.Text className="text-muted">
                Manage job listings and applications
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-4">
              <FaGraduationCap className="text-info mb-3" size={40} />
              <Card.Title>Courses Management</Card.Title>
              <Card.Text className="text-muted">
                Control course content and structure
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-4">
              <FaMoneyBill className="text-warning mb-3" size={40} />
              <Card.Title>Payment Records</Card.Title>
              <Card.Text className="text-muted">
                View and manage payment transactions
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-4">
              <FaUserPlus className="text-danger mb-3" size={40} />
              <Card.Title>Subadmin Management</Card.Title>
              <Card.Text className="text-muted">
                Add and manage subadmin accounts
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center p-4">
              <FaChartBar className="text-secondary mb-3" size={40} />
              <Card.Title>Reports</Card.Title>
              <Card.Text className="text-muted">
                Generate and view system reports
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MasterSubadminAccess;