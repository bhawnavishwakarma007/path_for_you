// services/module1Services/jobService.js

const Job = require('../../models/module1Models/Job');

const jobService = {
  getAllJobs: async () => {
    try {
      return await Job.getAllJobs();
    } catch (err) {
      throw err;
    }
  },

  createJob: async (jobData) => {
    try {
      return await Job.createJob(jobData);
    } catch (err) {
      throw err;
    }
  },

  getJobById: async (id) => {
    try {
      return await Job.getJobById(id);
    } catch (err) {
      throw err;
    }
  },

  getJobByType: async (type) => {
    try {
      return await Job.getJobByType(type);
    } catch (err) {
      throw err;
    }
  },

  getJobByTypeById: async (type, id) => {
    try {
      return await Job.getJobByTypeById(type, id);
    } catch (err) {
      throw err;
    }
  },

  createJobByType: async (type, jobData) => {
    try {
      return await Job.createJobByType(type, jobData);
    } catch (err) {
      throw err;
    }
  },

  updateJob: async (id, jobData) => {
    try {
      return await Job.updateJob(id, jobData);
    } catch (err) {
      throw err;
    }
  },

  deleteJob: async (id) => {
    try {
      return await Job.deleteJob(id);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = jobService;
