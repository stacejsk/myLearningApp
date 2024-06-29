const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const {query} = require('./database');
const { check, validationResult } = require('express-validator');
const app = express();


const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

//more of import routes


//mount other api routesapp as well
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);


// Configure session middleware
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));



// Serve static files from the default directory
app.use(express.static(__dirname));

// Set up middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/users/:userId/dashboard', async (req, res) => {
    try {
            const userId = req.params.userId;
            const profile = await User.getUserProfile(userId);
            const courses = await User.getUserCourses(userId);
            const timetable = await User.getUserTimetable(userId);
            const events = await User.getUserEvents(userId);
            const progress = await User.getUserProgress(userId);
    
            res.json({ profile, courses, timetable, events, progress });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).json({ message: 'Failed to load dashboard data' });
        }
});

module.exports = app;