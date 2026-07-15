// models/jobApplyModel.js
const db = require('../../config/db');

const JobApply = {
  create: async (jobData) => {
    const query = `INSERT INTO job_applications 
      (name, email, phone, dob, gender, qualification, specialization, passing_year, university, work_experience, skills, resume_path, aadhar_no, photo_path, state, district, city, application_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    // Ensure application_status has a value.
    if (!jobData.application_status) {
      jobData.application_status = "pending";
    }

    
    // Explicitly create an array of values in the order of the columns in the query.
    const values = [
      jobData.name,
      jobData.email,
      jobData.phone,
      jobData.dob,
      jobData.gender,
      jobData.qualification,
      jobData.specialization,
      jobData.passing_year,
      jobData.university,
      jobData.work_experience,
      jobData.skills,
      jobData.resume_path,
      jobData.aadhar_no,
      jobData.photo_path,
      jobData.state,
      jobData.district,
      jobData.city,
      jobData.application_status,
    ];

    try {
      console.log('Executing CREATE query with values:', values);
      const result = await db.execute(query, values);
      console.log('CREATE query successful:', result);
      return result;
    } catch (error) {
      console.error('Error in JobApply.create:', error);
      throw error;
    }
  },

  getAll: async () => {
    const query = 'SELECT * FROM job_applications ORDER BY created_at DESC';
    try {
      console.log('Executing GET ALL query:', query);
      const [rows] = await db.execute(query);
      console.log(`GET ALL query successful. Number of rows retrieved: ${rows.length}`);
      return rows;
    } catch (error) {
      console.error('Error in JobApply.getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const query = 'SELECT * FROM job_applications WHERE id = ?';
    try {
      console.log(`Executing GET BY ID query for id: ${id}`);
      const [rows] = await db.execute(query, [id]);
      console.log('GET BY ID query successful. Retrieved row:', rows[0]);
      return rows[0];
    } catch (error) {
      console.error('Error in JobApply.getById:', error);
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    const query = 'UPDATE job_applications SET application_status = ? WHERE id = ?';
    try {
      console.log(`Executing UPDATE STATUS query for id: ${id} with status: ${status}`);
      const result = await db.execute(query, [status, id]);
      console.log('UPDATE STATUS query successful:', result);
      return result;
    } catch (error) {
      console.error('Error in JobApply.updateStatus:', error);
      throw error;
    }
  },

  delete: async (id) => {
    const query = 'DELETE FROM job_applications WHERE id = ?';
    try {
      console.log(`Executing DELETE query for id: ${id}`);
      const result = await db.execute(query, [id]);
      console.log('DELETE query successful:', result);
      return result;
    } catch (error) {
      console.error('Error in JobApply.delete:', error);
      throw error;
    }
  }
};

module.exports = JobApply;
