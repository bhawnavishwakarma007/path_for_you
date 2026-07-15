// services/jobApplyService.js
const JobApply = require('../../models/module1Models/jobApplyModel');

const JobApplyService = {
  createJobApply: async (jobData) => {
    try {
      console.log('JobApplyService.createJobApply called with data:', jobData);
      const result = await JobApply.create(jobData);
      console.log('JobApplyService.createJobApply result:', result);
      return result;
    } catch (error) {
      console.error('Error in JobApplyService.createJobApply:', error);
      throw error;
    }
  },

  getAllJobApplies: async () => {
    try {
      console.log('JobApplyService.getAllJobApplies called');
      const jobApplies = await JobApply.getAll();
      console.log('JobApplyService.getAllJobApplies result:', jobApplies);
      return jobApplies;
    } catch (error) {
      console.error('Error in JobApplyService.getAllJobApplies:', error);
      throw error;
    }
  },

  getJobApplyById: async (id) => {
    try {
      console.log(`JobApplyService.getJobApplyById called with id: ${id}`);
      const jobApply = await JobApply.getById(id);
      console.log('JobApplyService.getJobApplyById result:', jobApply);
      return jobApply;
    } catch (error) {
      console.error('Error in JobApplyService.getJobApplyById:', error);
      throw error;
    }
  },

  updateJobApplyStatus: async (id, status) => {
    try {
      console.log(`JobApplyService.updateJobApplyStatus called with id: ${id} and status: ${status}`);
      const result = await JobApply.updateStatus(id, status);
      console.log('JobApplyService.updateJobApplyStatus result:', result);
      return result;
    } catch (error) {
      console.error('Error in JobApplyService.updateJobApplyStatus:', error);
      throw error;
    }
  },

  deleteJobApply: async (id) => {
    try {
      console.log(`JobApplyService.deleteJobApply called with id: ${id}`);
      const result = await JobApply.delete(id);
      console.log('JobApplyService.deleteJobApply result:', result);
      return result;
    } catch (error) {
      console.error('Error in JobApplyService.deleteJobApply:', error);
      throw error;
    }
  }
};

module.exports = JobApplyService;
