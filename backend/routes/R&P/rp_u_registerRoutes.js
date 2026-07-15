const express = require("express");
const Rp_u_registerController = require("../../controllers/module2Controller/rp_u_registerController");

const router = express.Router();

// User Registration (CREATE)
router.post("/rp_registration", Rp_u_registerController.register);

// User Login
router.post("/login", Rp_u_registerController.login);

// Get all users (READ)
router.get("/rp_users", Rp_u_registerController.getAllUsers);

// Get a specific user by ID (READ)
router.get("/rp_users/:id", Rp_u_registerController.getUserById);

// Update user details (UPDATE)
router.put("/rp_users/:id", Rp_u_registerController.updateUser);

// Delete user (DELETE)
router.delete("/rp_users/:id", Rp_u_registerController.deleteUser);

module.exports = router;
