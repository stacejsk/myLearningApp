const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.registerUser = async (req, res) => {
    const { email, username, password, full_name } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);


    try {
        const newUser = { email, username, password: hashedPassword, full_name };
        const userId = await User.createUser(newUser);
        res.status(201).json({ success: true, userId , message: 'User created' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email: User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: result.insertId}, process.env.JWT_SECRET);
        res.json({ message: 'Logged in successfully!', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};
// Logout Controller
exports.logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Session destruction failed:', err);
                return res.status(500).send('Logout failed');
            }
            res.status(204).send();
        });
    } else {
        res.status(204).send();
    }
};

// Update Profile Controller
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.user.userId; // Assuming userId is stored in JWT
    try {
        const result = await User.updateUser({ name, email }, userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile updated successfully!" });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: "Error updating user profile", error: error });
    }
};

// Fetch Profile Controller
exports.getUserProfile = async (req, res) => {
    const userId = req.user.userId; // Assuming userId is from the authentication token
    try {
        const profile = await User.getUserProfile(userId);
        if (!profile) {
            res.status(404).send('User not found');
        } else {
            res.json(profile);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Database error');
    }
};

// Fetch User Timetable Controller
exports.getUserTimetable = async (req, res) => {
    try {
        const timetable = await User.getUserTimetable(req.params.userId);
        res.json(timetable);
    } catch (error) {
        console.error('Error fetching user timetable:', error);
        res.status(500).send('Server error retrieving timetable');
    }
};

// Fetch User Events Controller
exports.getUserEvents = async (req, res) => {
    try {
        const events = await User.getUserEvents(req.params.userId);
        res.json(events);
    } catch (error) {
        res.status(500).send('Server error retrieving user events');
    }
};

// Leaderboard Controller
exports.getLeaderboard = async (req, res) => {
    const courseId = req.query.courseId;
    try {
        const leaderboard = await User.getLeaderboard(courseId);
        if (leaderboard.length === 0) {
            return res.status(404).send('No data found for leaderboard');
        }
        res.json(leaderboard);
    } catch (error) {
        res.status(500).send('Failed to retrieve leaderboard: ' + error.message);
    }
};

exports.getUserProgress = async (req, res) => {
    const userId = req.params.userId;  // Assuming userId is passed as a URL parameter

    try {
        const progress = await User.getUserProgress(userId);
        if (progress.length === 0) {
            return res.status(404).json({ message: "No progress found for the user." });
        }
        res.json( progress );
    } catch (error) {
        console.error('Error retrieving user progress:', error);
        res.status(500).json({ message: "Error retrieving user progress", error });
    }
};
// Implement other controllers similarly
