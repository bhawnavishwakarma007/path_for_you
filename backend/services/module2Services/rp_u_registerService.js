const Rp_u_register = require("../../models/module2Models/rp_u_register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

class Rp_u_registerService {
  // Create a new user
  static async register({
    fullname,
    email,
    contact,
    password,
    gender,
    category_type,
    qualification,
    branch,
    specialization,
    passingyear,
    university,
    lastUniversity,
    researcharea,
    requirementtype,
    synopsis,
    researchpapers,
    researchpresentation,
    profilepic,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await Rp_u_register.create({
      fullname,
      email,
      contact,
      password: hashedPassword,
      gender,
      category_type,
      qualification,
      branch,
      specialization,
      passingyear,
      university,
      lastUniversity,
      researcharea,
      requirementtype,
      synopsis,
      researchpapers,
      researchpresentation,
      profilepic,
    });
    return userId;
  }

  // User login
  static async login({ email, password }) {
    const user = await Rp_u_register.findByEmail(email);
    if (!user) {
      console.error("Login failed: Invalid email.");
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.rp_password); // Database column name fix
    if (!isMatch) {
      console.error("Login failed: Incorrect password for email:", email);
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user.rp_uid }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Fixed user ID reference
    return { token, user };
  }

  // Get all users
  static async getAllUsers() {
    return await Rp_u_register.getAllUsers();
  }

  // Get user by ID
  static async getUserById(id) {
    const user = await Rp_u_register.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  // Update user
  static async updateUser(id, updateData) {
    const updatedRows = await Rp_u_register.updateUser(id, updateData);
    if (updatedRows === 0) {
      throw new Error("User not found or no changes made");
    }
    return "User updated successfully";
  }

  // Delete user
  static async deleteUser(id) {
    const deletedRows = await Rp_u_register.deleteUser(id);
    if (deletedRows === 0) {
      throw new Error("User not found");
    }
    return "User deleted successfully";
  }
}

module.exports = Rp_u_registerService;
