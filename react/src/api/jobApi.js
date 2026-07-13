// src/api/jobApi.js

import axios from 'axios';

// Use your VITE_API_URL (e.g. http://localhost:5000/api)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const jobApi = {
  // 1. Get all jobs: GET /api/getjobs
  getAllJobs: () => axios.get(`${API_BASE_URL}/getjobs`),

  // 2. Get all jobs of a given type: GET /api/getjobs/type/:type
  getJobsByType: (type) => axios.get(`${API_BASE_URL}/getjobs/type/${encodeURIComponent(type)}`),

  // 3. Get a single job by type & ID: GET /api/getjobs/type/:type/:id
  getJobByTypeAndId: (type, id) => axios.get(`${API_BASE_URL}/getjobs/type/${encodeURIComponent(type)}/${id}`),

  // 4. Get a single job by its ID (ignore type): GET /api/getjobs/id/:id
  getJobById: (id) => axios.get(`${API_BASE_URL}/getjobs/id/${id}`),

  // 5. Create a new job: POST /api/createjobs
  createJob: (jobData) => axios.post(`${API_BASE_URL}/createjobs`, jobData),

  // 6. Create a new job by specifying type: POST /api/createjobs/type/:type
  createJobByType: (type, jobData) => axios.post(`${API_BASE_URL}/createjobs/type/${encodeURIComponent(type)}`, jobData),

  // 7. Update an existing job by ID: PUT /api/updatejobs/:id
  updateJob: (id, updatedFields) => axios.put(`${API_BASE_URL}/updatejobs/${id}`, updatedFields),

  // 8. Delete a job by ID: DELETE /api/deletejobs/:id
  deleteJob: (id) => axios.delete(`${API_BASE_URL}/deletejobs/${id}`)
};

export default jobApi;
