import React, { useState } from 'react';
import '../../css/masteradmin/MasterPaymentsManagement.css';

const initialPayments = [
  { id: 1, userName: 'John Doe', amount: 200, method: 'Credit Card', status: 'Paid' },
  { id: 2, userName: 'Jane Smith', amount: 150, method: 'UPI', status: 'Pending' },
];

const MasterPaymentsManagement = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [showModal, setShowModal] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  const handleAddPayment = () => {
    setEditPayment(null);
    setShowModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setShowModal(true);
  };

  const handleSave = (paymentData) => {
    if (editPayment) {
      setPayments(payments.map((p) => (p.id === editPayment.id ? paymentData : p)));
    } else {
      const newPayment = { ...paymentData, id: payments.length + 1 };
      setPayments([...payments, newPayment]);
    }
    setShowModal(false);
  };

  return (
    <div className="master-payments-management">
      <h1 className="master-payments-title">Payments Management</h1>
      <div className="master-payments-top-bar">
        <button className="master-payments-button" onClick={handleAddPayment}>
          Add Payment Record
        </button>
        <button className="master-payments-button">Export Payments</button>
        <input
          className="master-payments-search"
          type="text"
          placeholder="Search payments by user or date"
        />
        <select className="master-payments-status-filter">
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <table className="master-payments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.userName}</td>
              <td>${payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.status}</td>
              <td>
                <button
                  className="master-payments-edit-button"
                  onClick={() => handleEditPayment(payment)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <PaymentModal
          payment={editPayment}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const PaymentModal = ({ payment, onSave, onClose }) => {
  const [userName, setUserName] = useState(payment?.userName || '');
  const [amount, setAmount] = useState(payment?.amount || '');
  const [method, setMethod] = useState(payment?.method || 'Credit Card');
  const [status, setStatus] = useState(payment?.status || 'Pending');

  const handleSubmit = () => {
    onSave({ ...payment, userName, amount, method, status });
  };

  return (
    <div className="master-payments-modal">
      <h2>{payment ? 'Edit Payment' : 'Add New Payment'}</h2>
      <label>User Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="master-payments-input"
      />
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="master-payments-input"
      />
      <label>Payment Method</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="master-payments-select"
      >
        <option value="Credit Card">Credit Card</option>
        <option value="UPI">UPI</option>
      </select>
      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="master-payments-select"
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      </select>
      <div className="master-payments-modal-actions">
        <button onClick={handleSubmit} className="master-payments-save-button">
          Save
        </button>
        <button onClick={onClose} className="master-payments-cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MasterPaymentsManagement;
