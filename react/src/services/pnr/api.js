import axios from 'axios';

const JOBS_API_URL = 'http://localhost:5000/api/jobs';
const AUTH_API_URL = 'http://localhost:5000/api/auth';

// Job-related APIs
export const applyJob = async (formData) => {
  try {
    const response = await axios.post(`${JOBS_API_URL}/apply`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${JOBS_API_URL}/view`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${JOBS_API_URL}/view/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    throw error;
  }
};

export const updateJobStatus = async (id, status) => {
  try {
    const response = await axios.put(`${JOBS_API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating job status:', error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${JOBS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// Authentication APIs
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};