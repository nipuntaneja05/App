// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // Import the UserController

// POST route to handle Google Sign-In
router.post('/auth/google', UserController.handleGoogleSignIn);

module.exports = router;
