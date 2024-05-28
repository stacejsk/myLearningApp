
// File: routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware
const { validateRegistration} = require('../middleware/validateRegistration');
const { validateProfileUpdate } = require ('../middleware/validateProfileUpdate');
const authenticate= require('../middleware/authenticate');

require('dotenv').config();

// User registration
router.post('/register', validateRegistration, userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// User logout
router.post('/logout', userController.logoutUser);

// Update user profile
router.put('/profile', authenticate, validateProfileUpdate, userController.updateUserProfile);

// Get user profile
router.get('/profile', authenticate, userController.getUserProfile);

// Get user-specific events
router.get('/users/:userId/events', authenticate, userController.getUserEvents);

// Get user-specific timetable
router.get('/users/:userId/timetable', authenticate, userController.getUserTimetable);

// Leaderboard
router.get('/leaderboard', userController.getLeaderboard);

// Route to get user progress
router.get('/users/:userId/progress', userController.getUserProgress);

module.exports = router;
