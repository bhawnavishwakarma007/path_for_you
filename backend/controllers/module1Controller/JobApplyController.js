// controllers/jobApplyController.js
const JobApplyService = require('../../services/module1Services//jobApplyService');


const JobApplyController = {
  createJobApply: async (req, res) => {
    try {
      console.log('JobApplyController.createJobApply: Received job application request');
      // Copy only the needed fields from req.body
      const jobData = { ...req.body };

      // Set a default application_status if not provided.
      if (!jobData.application_status) {
        jobData.application_status = "pending";
      }

      // If file uploads exist, assign the file paths.
      if (req.files) {
        if (req.files.resume && req.files.resume.length > 0) {
          jobData.resume_path = req.files.resume[0].path;
        } else {
          jobData.resume_path = null;
        }
        if (req.files.photo && req.files.photo.length > 0) {
          jobData.photo_path = req.files.photo[0].path;
        } else {
          jobData.photo_path = null;
        }
      }

      console.log('JobApplyController.createJobApply: Prepared jobData:', jobData);
      await JobApplyService.createJobApply(jobData);
      console.log('JobApplyController.createJobApply: Job application created successfully');
      res.status(201).json({ message: 'Job application submitted successfully!' });
    } catch (error) {
      console.error('JobApplyController.createJobApply: Error creating job application:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getAllJobApplies: async (req, res) => {
    try {
      console.log('JobApplyController.getAllJobApplies: Fetching all job applications');
      const jobs = await JobApplyService.getAllJobApplies();
      console.log(`JobApplyController.getAllJobApplies: Retrieved ${jobs.length} job applications`);
      res.json(jobs);
    } catch (error) {
      console.error('JobApplyController.getAllJobApplies: Error fetching job applications:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getJobApplyById: async (req, res) => {
    try {
      console.log(`JobApplyController.getJobApplyById: Fetching job application with id: ${req.params.id}`);
      const job = await JobApplyService.getJobApplyById(req.params.id);
      if (!job) {
        console.log(`JobApplyController.getJobApplyById: No job application found with id: ${req.params.id}`);
        return res.status(404).json({ message: 'Job application not found' });
      }
      console.log('JobApplyController.getJobApplyById: Retrieved job application:', job);
      res.json(job);
    } catch (error) {
      console.error('JobApplyController.getJobApplyById: Error fetching job application:', error);
      res.status(500).json({ error: error.message });
    }
  },

  updateJobApplyStatus: async (req, res) => {
    try {
      console.log(`JobApplyController.updateJobApplyStatus: Updating status for job application with id: ${req.params.id}`);
      await JobApplyService.updateJobApplyStatus(req.params.id, req.body.status);
      console.log('JobApplyController.updateJobApplyStatus: Status updated successfully');
      res.json({ message: 'Application status updated!' });
    } catch (error) {
      console.error('JobApplyController.updateJobApplyStatus: Error updating status:', error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteJobApply: async (req, res) => {
    try {
      console.log(`JobApplyController.deleteJobApply: Deleting job application with id: ${req.params.id}`);
      await JobApplyService.deleteJobApply(req.params.id);
      console.log('JobApplyController.deleteJobApply: Job application deleted successfully');
      res.json({ message: 'Application deleted!' });
    } catch (error) {
      console.error('JobApplyController.deleteJobApply: Error deleting job application:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = JobApplyController;
