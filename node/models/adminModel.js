// models/adminModel.js
const db = require('../config/db');

class Admin {
  // Create a new admin
  static async create({ email, passwordHash, name }) {
    const [result] = await db.execute(
      'INSERT INTO mad_admin (mad_email, mad_password_hash, mad_name) VALUES (?, ?, ?)',
      [email, passwordHash, name]
    );
    return result.insertId;
  }

  // Fetch admin by email
  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM mad_admin WHERE mad_email = ?',
      [email]
    );
    return rows[0];
  }

  // Fetch admin by ID
  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM mad_admin WHERE mad_admin_id = ?',
      [id]
    );
    return rows[0];
  }

  // Update admin details
  static async update(id, { email, passwordHash, name }) {
    const [result] = await db.execute(
      'UPDATE mad_admin SET mad_email = ?, mad_password_hash = ?, mad_name = ? WHERE mad_admin_id = ?',
      [email, passwordHash, name, id]
    );
    return result.affectedRows;
  }
}

module.exports = Admin;


