import React from "react";
import {
  Container,
  Table,
  Button,
  Pagination,
  Badge,
  Card,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

const MasterPaymentRecords = () => {
  // Assuming these variables are defined above
  const paymentRecords = [
    {
      id: 1,
      date: "2024-01-15",
      amount: 299.99,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 2,
      date: "2024-01-14",
      amount: 199.99,
      method: "PayPal",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-01-13",
      amount: 399.99,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: 4,
      date: "2024-01-12",
      amount: 149.99,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 5,
      date: "2024-01-11",
      amount: 249.99,
      method: "UPI",
      status: "Pending",
    },
  ];

  const recordsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(paymentRecords.length / recordsPerPage);

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = paymentRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container fluid className="p-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-primary mb-4">Payment Records</h2>

          <Table responsive hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>Record ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.date}</td>
                  <td>${record.amount}</td>
                  <td>{record.method}</td>
                  <td>{record.status}</td>

                  <td>
                    <Button variant="outline-primary" size="sm">
                      <FaEye className="me-1" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={currentPage === index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MasterPaymentRecords;
