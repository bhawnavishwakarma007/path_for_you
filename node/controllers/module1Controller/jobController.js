// controllers/module1Controller/jobController.js

const jobService = require('../../services/module1Services/jobService');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJob = async (req, res) => {
  const newJob = req.body;
  try {
    const result = await jobService.createJob(newJob);
    res.status(201).json({
      message: 'Job created successfully',
      jobId: result.insertId
    });
  } catch (err) {
    console.error('[createJob] MySQL error message:', err.sqlMessage || err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  const jobId = req.params.id;
  try {
    const jobArray = await jobService.getJobById(jobId);
    if (!jobArray.length) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(jobArray[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobByType = async (req, res) => {
  const jobType = req.params.type;
  try {
    const jobs = await jobService.getJobByType(jobType);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobByTypeById = async (req, res) => {
  const { type, id } = req.params;
  try {
    const jobArray = await jobService.getJobByTypeById(type, id);
    if (!jobArray.length) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(jobArray[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJobByType = async (req, res) => {
  const { type } = req.params;
  const newJob = req.body;
  try {
    newJob.jobType = type;
    const result = await jobService.createJobByType(type, newJob);
    res.status(201).json({
      message: 'Job created successfully',
      jobId: result.insertId
    });
  } catch (err) {
    console.error('[createJobByType] MySQL error message:', err.sqlMessage || err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  const jobId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await jobService.updateJob(jobId, updatedData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    const result = await jobService.deleteJob(jobId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
