import { Container, Row, Col, Badge, Button, ListGroup } from 'react-bootstrap';
import { BsBell } from 'react-icons/bs';
import { useState } from 'react';

// Define initial notifications array
const initialNotifications = [
  { id: 1, message: 'You have a new message', read: false },
  { id: 2, message: 'Your profile was viewed', read: false },
  { id: 3, message: 'System maintenance scheduled', read: true },
];

const MasterNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Notifications Management</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12} lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <BsBell size={24} className="me-2" />
              {unreadCount > 0 && (
                <Badge bg="danger" pill>
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline-primary" size="sm" onClick={handleMarkAllAsRead}>
                Mark All as Read
              </Button>
            )}
          </div>

          <ListGroup>
            {notifications.map(notification => (
              <ListGroup.Item 
                key={notification.id}
                className={`d-flex justify-content-between align-items-center ${!notification.read ? 'bg-light' : ''}`}
              >
                <div className="me-3">
                  <p className="mb-1">{notification.message}</p>
                  <small className="text-muted">
                    {notification.read ? 'Read' : 'Unread'}
                  </small>
                </div>
                {!notification.read && (
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MasterNotifications;
