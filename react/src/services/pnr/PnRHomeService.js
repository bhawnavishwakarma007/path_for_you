const API_URL = "http://localhost:5000/api";

export const getJobs = async () => {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    const data = await response.json();
    console.log("Fetched jobs:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    return [];
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const response = await fetch(`${API_URL}/jobs/${jobId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job details: ", error);
    return [];
  }
};

export const getJobDetailsByJobId = async (jobId) => {
  try {
    const response = await fetch(`${API_URL}/jobs/${jobId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job details: ", error);
    return [];
  }
};

export const getJobsByType = async (type) => {
  try {
    const response = await fetch(`${API_URL}/jobs?type=${type}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs by type: ", error);
    return [];
  }
};