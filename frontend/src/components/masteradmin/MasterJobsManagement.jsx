import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, Outlet } from 'react-router-dom';
import jobApi from '../../api/jobApi';
import '../../css/masteradmin/MasterJobsManagement.css';

const MasterJobsManagement = () => {
  const navigate = useNavigate();

  // All jobs fetched from backend
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Delete confirmation popup state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update error state (for navigation to edit page, errors show on edit screen)
  const [updateError, setUpdateError] = useState(null);

  // 1) Fetch all jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobApi.getAllJobs();
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setFetchError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 2) Calculate current jobs to display based on pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // 3) Calculate page numbers
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 4) Handlers
  const handleAddJob = () => {
    navigate('add-new-job');
  };

  // Navigate to separate edit page
  const handleEditJob = (job) => {
    navigate(`edit/${job.job_id}`);
  };

  const handleDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeletePopup(true);
    setDeleteError(null);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      setIsDeleting(true);
      await jobApi.deleteJob(jobToDelete.job_id);
      // Remove from local state
      setJobs((prev) => prev.filter((j) => j.job_id !== jobToDelete.job_id));
      setShowDeletePopup(false);
      setJobToDelete(null);

      // Adjust pagination if needed
      const newTotalPages = Math.ceil((jobs.length - 1) / jobsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
      }
    } catch (err) {
      console.error('Error deleting job:', err);
      setDeleteError('Could not delete job. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages));
  };

  return (
    <>
      <div className="jobs-management">
        <h1 className="jobs-management__title">Jobs Management</h1>

        {/* Top bar */}
        <div className="jobs-management__top-bar">
          <button
            className="jobs-management__btn"
            onClick={handleAddJob}
            disabled={loading || isDeleting}
          >
            Add New Job
          </button>
          <button className="jobs-management__btn" disabled>
            Export
          </button>
          <input
            className="jobs-management__search-input"
            type="text"
            placeholder="Search jobs by title or company"
            disabled={loading || isDeleting}
            // (You can wire up onChange here to filter locally if you like)
          />
          <select className="jobs-management__select" disabled={loading}>
            <option value="all">All Types</option>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>
        </div>

        {/* Loading or fetch error */}
        {loading && <p className="jobs-management__loading">Loading jobs...</p>}
        {fetchError && <p className="jobs-management__error">{fetchError}</p>}

        {/* Jobs table with pagination */}
        {!loading && !fetchError && (
          <>
            <table className="jobs-management__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Job Title</th>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="jobs-management__no-data">
                      No jobs available.
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job) => (
                    <tr key={job.job_id}>
                      <td>{job.job_id}</td>
                      <td>{job.jobtitle}</td>
                      <td>{job.job_company}</td>
                      <td>{job.jobLocation}</td>
                      <td>
                        <button
                          className="jobs-management__btn-edit"
                          onClick={() => handleEditJob(job)}
                          disabled={isDeleting}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="jobs-management__btn-delete"
                          onClick={() => handleDeleteJob(job)}
                          disabled={isDeleting}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="jobs-management__pagination">
                <button
                  className="jobs-management__page-btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ◀︎ Prev
                </button>

                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    className={`jobs-management__page-btn ${
                      num === currentPage ? 'jobs-management__page-btn--active' : ''
                    }`}
                    onClick={() => handlePageClick(num)}
                  >
                    {num}
                  </button>
                ))}

                <button
                  className="jobs-management__page-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next ▶︎
                </button>
              </div>
            )}
          </>
        )}

        {/* Delete confirmation popup */}
        {showDeletePopup && jobToDelete && (
          <div className="jobs-management__delete-popup">
            <p>
              Are you sure you want to delete{' '}
              <strong>{jobToDelete.jobtitle}</strong>?
            </p>

            {deleteError && (
              <p className="jobs-management__error">{deleteError}</p>
            )}

            <div className="jobs-management__delete-actions">
              <button
                className="jobs-management__btn-confirm"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </button>
              <button
                className="jobs-management__btn-cancel"
                onClick={() => {
                  setShowDeletePopup(false);
                  setJobToDelete(null);
                  setDeleteError(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested routes (Add New Job, Edit Job) */}
      <Outlet />
    </>
  );
};

export default MasterJobsManagement;
