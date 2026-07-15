// models/module1Models/Job.js

const db = require('../../config/db');

class Job {
  static async getAllJobs() {
    const query = 'SELECT * FROM Jobs';
    try {
      const [results] = await db.query(query);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async getJobByType(type) {
    const query = 'SELECT * FROM Jobs WHERE jobType = ?';
    try {
      const [results] = await db.query(query, [type]);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async getJobByTypeById(type, id) {
    const query = 'SELECT * FROM Jobs WHERE jobType = ? AND job_id = ?';
    try {
      const [results] = await db.query(query, [type, id]);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async createJob(data) {
    const query = 'INSERT INTO Jobs SET ?';
    try {
      const [results] = await db.query(query, data);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async getJobById(id) {
    const query = 'SELECT * FROM Jobs WHERE job_id = ?';
    try {
      const [results] = await db.query(query, [id]);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async createJobByType(type, data) {
    data.jobType = type;
    const query = 'INSERT INTO Jobs SET ?';
    try {
      const [results] = await db.query(query, data);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async updateJob(id, data) {
    const query = 'UPDATE Jobs SET ? WHERE job_id = ?';
    try {
      const [results] = await db.query(query, [data, id]);
      return results;
    } catch (err) {
      throw err;
    }
  }

  static async deleteJob(id) {
    const query = 'DELETE FROM Jobs WHERE job_id = ?';
    try {
      const [results] = await db.query(query, [id]);
      return results;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Job;
