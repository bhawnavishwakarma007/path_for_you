import React, { useState } from 'react';
import '../../css/masteradmin/MasterCoursesManagement.css';

const initialCourses = [
  { id: 1, name: 'React Development', category: 'Technical', duration: '3 Months', fees: 500, status: 'Active' },
  { id: 2, name: 'Digital Marketing', category: 'Non-Technical', duration: '2 Months', fees: 300, status: 'Inactive' },
];

const MasterCoursesManagement = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleAddCourse = () => {
    setEditCourse(null);
    setShowModal(true);
  };

  const handleEditCourse = (course) => {
    setEditCourse(course);
    setShowModal(true);
  };

  const handleDeleteCourse = (course) => {
    setCourseToDelete(course);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setCourses(courses.filter((c) => c.id !== courseToDelete.id));
    setShowDeletePopup(false);
    setCourseToDelete(null);
  };

  const handleSave = (courseData) => {
    if (editCourse) {
      setCourses(courses.map(c => c.id === editCourse.id ? courseData : c));
    } else {
      const newCourse = { ...courseData, id: courses.length + 1 };
      setCourses([...courses, newCourse]);
    }
    setShowModal(false);
  };

  return (
    <div className="master-courses-management">
      <h1>Courses Management</h1>
      <div className="master-courses-top-bar">
        <button onClick={handleAddCourse}>Add New Course</button>
        <button>Export</button>
        <input type="text" placeholder="Search courses by name or category" />
        <select>
          <option value="all">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Non-Technical">Non-Technical</option>
        </select>
      </div>
      <table className="master-courses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.category}</td>
              <td>{course.duration}</td>
              <td>${course.fees}</td>
              <td>
                <button onClick={() => handleEditCourse(course)}>Edit</button>
                <button onClick={() => handleDeleteCourse(course)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <CourseModal
          course={editCourse}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showDeletePopup && (
        <div className="master-courses-delete-popup">
          <p>Are you sure you want to delete {courseToDelete.name}?</p>
          <button onClick={confirmDelete}>Confirm</button>
          <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

const CourseModal = ({ course, onSave, onClose }) => {
  const [name, setName] = useState(course?.name || '');
  const [category, setCategory] = useState(course?.category || 'Technical');
  const [duration, setDuration] = useState(course?.duration || '');
  const [fees, setFees] = useState(course?.fees || '');
  const [status, setStatus] = useState(course?.status || 'Active');

  const handleSubmit = () => {
    onSave({ ...course, name, category, duration, fees, status });
  };

  return (
    <div className="master-courses-modal">
      <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>
      <label>Course Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Technical">Technical</option>
        <option value="Non-Technical">Non-Technical</option>
      </select>
      <label>Duration</label>
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <label>Fees</label>
      <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} />
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="master-courses-modal-actions">
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default MasterCoursesManagement;
