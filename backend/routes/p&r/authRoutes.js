const express = require('express');
const AuthController = require('../../controllers/module1Controller/authController');


const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
