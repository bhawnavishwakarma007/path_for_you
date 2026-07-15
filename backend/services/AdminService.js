// services/AdminService.js
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

class AdminService {
  // Register a new admin
  static async register({ name, email, password }) {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const adminId = await Admin.create({ email, passwordHash: hashedPassword, name });
    return adminId;
  }

  // Login an admin
  static async login({ email, password }) {
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      console.log("Admin not found");
      throw new Error("Admin not found");
    }

    console.log("Admin found, checking password");

    const isMatch = await bcryptjs.compare(password, admin.mad_password_hash);

    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Invalid Password");
      throw new Error("Invalid Password");
    }
  
    const token = jwt.sign({ id: admin.mad_admin_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  }
}

module.exports = AdminService;


