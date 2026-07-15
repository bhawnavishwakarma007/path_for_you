import React, { useState } from 'react';
import '../../css/masteradmin/MasterModulesManagement.css';
import { FaEdit, FaTrash } from "react-icons/fa";


const initialModules = [
  { id: 1, name: 'User Management', status: 'Active', createdOn: '2024-01-01' },
  { id: 2, name: 'Booking System', status: 'Inactive', createdOn: '2023-12-15' },
];

const MasterModulesManagement = () => {
  const [modules, setModules] = useState(initialModules);
  const [showModal, setShowModal] = useState(false);
  const [editModule, setEditModule] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  const handleAddModule = () => {
    setEditModule(null);
    setShowModal(true);
  };

  const handleEditModule = (module) => {
    setEditModule(module);
    setShowModal(true);
  };

  const handleDeleteModule = (module) => {
    setModuleToDelete(module);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setModules(modules.filter((mod) => mod.id !== moduleToDelete.id));
    setShowDeletePopup(false);
    setModuleToDelete(null);
  };

  const handleSave = (moduleData) => {
    if (editModule) {
      setModules(modules.map((mod) => (mod.id === editModule.id ? moduleData : mod)));
    } else {
      const newModule = {
        ...moduleData,
        id: modules.length + 1,
        createdOn: new Date().toISOString().split('T')[0],
      };
      setModules([...modules, newModule]);
    }
    setShowModal(false);
  };

  return (
    <div className="master-modules-management">
      <h1 className="master-modules-management__title">Modules Management</h1>
      <div className="master-modules-management__top-bar">
        <button onClick={handleAddModule} className="master-modules-management__button">
          Add New Module
        </button>
        <button className="master-modules-management__button">Export</button>
        <input
          type="text"
          placeholder="Search modules"
          className="master-modules-management__search-input"
        />
        <select className="master-modules-management__filter-select">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="master-modules-management__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Module Name</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.id}</td>
              <td>{module.name}</td>
              <td>{module.status}</td>
              <td>{module.createdOn}</td>
              <td>
                <button
                  onClick={() => handleEditModule(module)}
                  className="master-modules-management__action-button"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteModule(module)}
                  className="master-modules-management__action-button"
                >
                   <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          module={editModule}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showDeletePopup && (
        <div className="master-modules-management__delete-popup">
          <p>Are you sure you want to delete {moduleToDelete.name}?</p>
          <button onClick={confirmDelete} className="master-modules-management__popup-button">
            Confirm
          </button>
          <button
            onClick={() => setShowDeletePopup(false)}
            className="master-modules-management__popup-button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const Modal = ({ module, onSave, onClose }) => {
  const [name, setName] = useState(module?.name || '');
  const [status, setStatus] = useState(module?.status || 'Active');

  const handleSubmit = () => {
    onSave({ ...module, name, status });
  };

  return (
    <div className="master-modules-management__modal">
      <h2>{module ? 'Edit Module' : 'Add New Module'}</h2>
      <label>Module Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="master-modules-management__modal-input"
      />
      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="master-modules-management__modal-select"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="master-modules-management__modal-actions">
        <button onClick={handleSubmit} className="master-modules-management__modal-button">
          Save
        </button>
        <button onClick={onClose} className="master-modules-management__modal-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MasterModulesManagement;






