// controllers/adminController.js
const AdminService = require("../services/AdminService");

class AdminController {
  // Register a new admin
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const adminId = await AdminService.register({ name, email, password });
      res.status(201).json({ message: "Admin registered successfully", adminId });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Login an admin
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AdminService.login({ email, password });
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = AdminController;







