import React, { useState } from 'react';
import '../../css/masteradmin/MasterSubadminManagement.css';

const initialSubAdmins = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', modules: ['Users', 'Payments'], role: 'SubAdmin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', modules: ['Courses'], role: 'MasterAdmin' },
];

const MasterSubadminManagement = () => {
  const [subAdmins, setSubAdmins] = useState(initialSubAdmins);
  const [showModal, setShowModal] = useState(false);
  const [editSubAdmin, setEditSubAdmin] = useState(null);

  const handleAddSubAdmin = () => {
    setEditSubAdmin(null);
    setShowModal(true);
  };

  const handleEditSubAdmin = (subAdmin) => {
    setEditSubAdmin(subAdmin);
    setShowModal(true);
  };

  const handleSave = (subAdminData) => {
    if (editSubAdmin) {
      setSubAdmins(subAdmins.map((s) => (s.id === editSubAdmin.id ? subAdminData : s)));
    } else {
      const newSubAdmin = { ...subAdminData, id: subAdmins.length + 1 };
      setSubAdmins([...subAdmins, newSubAdmin]);
    }
    setShowModal(false);
  };

  return (
    <div className="subadmin-management">
      <h1 className="subadmin-title">SubAdmin Management</h1>
      <div className="subadmin-top-bar">
        <button className="subadmin-add-button" onClick={handleAddSubAdmin}>
          Add New SubAdmin
        </button>
      </div>
      <table className="subadmin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Assigned Modules</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subAdmins.map((subAdmin) => (
            <tr key={subAdmin.id}>
              <td>{subAdmin.id}</td>
              <td>{subAdmin.name}</td>
              <td>{subAdmin.email}</td>
              <td>{subAdmin.modules.join(', ')}</td>
              <td>{subAdmin.role}</td>
              <td>
                <button
                  className="subadmin-edit-button"
                  onClick={() => handleEditSubAdmin(subAdmin)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <SubAdminModal
          subAdmin={editSubAdmin}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const SubAdminModal = ({ subAdmin, onSave, onClose }) => {
  const [name, setName] = useState(subAdmin?.name || '');
  const [email, setEmail] = useState(subAdmin?.email || '');
  const [password, setPassword] = useState('');
  const [modules, setModules] = useState(subAdmin?.modules || []);
  const [role, setRole] = useState(subAdmin?.role || 'SubAdmin');

  const handleSubmit = () => {
    onSave({ ...subAdmin, name, email, password, modules, role });
  };

  return (
    <div className="modal subadmin-modal">
      <h2 className="modal-title">{subAdmin ? 'Edit SubAdmin' : 'Add New SubAdmin'}</h2>
      <label className="modal-label">Name</label>
      <input
        className="modal-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="modal-label">Email</label>
      <input
        className="modal-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="modal-label">Password</label>
      <input
        className="modal-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="modal-label">Assigned Modules</label>
      <select
        className="modal-select"
        multiple
        value={modules}
        onChange={(e) => setModules([...e.target.selectedOptions].map((o) => o.value))}
      >
        <option value="Users">Users</option>
        <option value="Payments">Payments</option>
        <option value="Courses">Courses</option>
      </select>
      <label className="modal-label">Role</label>
      <select
        className="modal-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="MasterAdmin">MasterAdmin</option>
        <option value="SubAdmin">SubAdmin</option>
      </select>
      <div className="modal-actions">
        <button className="modal-save-button" onClick={handleSubmit}>
          Save
        </button>
        <button className="modal-cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MasterSubadminManagement;



