const Rp_u_registerService = require("../../services/module2Services/rp_u_registerService");

class Rp_u_registerController {
  // User registration
  static async register(req, res) {
    try {
      const {
        rp_fullname,
        rp_email,
        rp_contact,
        rp_password,
        rp_confirmPassword,
        rp_category_type,
        rp_qualification,
        rp_branch,
        rp_specialization,
        rp_passingyear,
        rp_university,
        rp_lastUniversity,
        rp_researcharea,
        rp_requirementtype,
        rp_synopsis,
        rp_researchpapers,
        rp_researchpresentation,
        rp_profilepic,
      } = req.body;
  
      const userId = await Rp_u_registerService.register({
        fullname: rp_fullname,
        email: rp_email,
        contact: rp_contact,
        password: rp_password,
        confirm_password: rp_confirmPassword,
        category_type: rp_category_type,
        qualification: rp_qualification,
        branch: rp_branch,
        specialization: rp_specialization,
        passingyear: rp_passingyear,
        university: rp_university,
        lastUniversity: rp_lastUniversity,
        researcharea: rp_researcharea,
        requirementtype: rp_requirementtype,
        synopsis: rp_synopsis,
        researchpapers: rp_researchpapers,
        researchpresentation: rp_researchpresentation,
        profilepic: rp_profilepic,
      });  

      console.log(`User registered successfully with ID: ${userId}`);
      res.status(201).json({ message: "User registered successfully", userId });
    } catch (err) {
      console.error("Error during user registration:", err.message);
      res.status(400).json({ error: err.message });
    }
  }

  // User login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await Rp_u_registerService.login({ email, password });

      console.log(`User logged in successfully. Token issued for email: ${email}`);
      res.status(200).json({ token, user });
    } catch (err) {
      console.error("Error during user login:", err.message);
      res.status(400).json({ error: err.message });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await Rp_u_registerService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
        const user = await Rp_u_registerService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedUser = await Rp_u_registerService.updateUser(id, updatedData);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
      console.error("Error updating user:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Rp_u_registerService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("Error deleting user:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = Rp_u_registerController;
