const express = require('express');
const router = express.Router();
const { query } = require('../database');
const {authenticate, authorizeAdmin}= require('../middleware/authenticate'); 

//Create a lesson
router.post('/courses/:id/lessons', authenticate, authorizeAdmin, async(req, res) => {
    const { title, content } = req.body;

    // Validation checks
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }
    if (title.length > 10 || content.length > 650) {
        return res.status(400).json({ message: 'Name or description too long.' });
    }
    try {
        const [rows] = await query(
            `INSERT INTO lessons (title, content, course_id) VALUES (?, ?, ?)`,
            [title, content, courseId]
        );
        res.status(201).json({ id: rows.insertId, title, content, courseId });
    } catch (error) {
        res.status(500).send('Failed to create lesson: ' + error.message);
    }

});

// Update an existing lesson
router.put('/lessons/:id', authenticate, authorizeAdmin, async (req, res) => {
    const { title, content } = req.body;
    try {
        const [results] = await query(
            `UPDATE lessons SET title = ?, content = ? WHERE id = ?`,
            [title, content, req.params.id]
        );
        if (results.affectedRows === 0) {
            return res.status(404).send('No lesson found with the given ID');
        }
        res.send('Lesson updated successfully');
    } catch (error) {
        res.status(500).send('Failed to update lesson: ' + error.message);
    }
});

// Retrieve details of a specific course
router.get('/courses/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const [rows] = await query(
            'SELECT title, content FROM courses WHERE id = ?',
            [courseId]
        );
        if (rows.length === 0) {
            return res.status(404).send('Course not found');
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send('Failed to retrieve course: ' + error.message);
    }
});
// Route to list all lessons in a specific course
router.get('/courses/:id/lessons', async (req, res) => {
    const { courseId } = req.params;
    try {
        const [lessons] = await query(
            `SELECT id, title, description 
            FROM lessons 
            WHERE course_id = ?
            ORDER BY id`, // You can order the results by id or any other column like 'created_at'
            [courseId]
        );

        if (lessons.length === 0) {
            return res.status(404).send('No lessons found for this course');
        }

        res.json(lessons);
    } catch (error) {
        res.status(500).send('Failed to retrieve lessons: ' + error.message);
    }
});

//retrieves lesson details
router.get('/courses/:id/lessons', async (req, res) => {
    const courseId = req.params.id;
    try {
        const [lessons] = await query(
            `SELECT id AS lessonId, title AS lessonTitle, content AS lessonContent 
            FROM lessons 
            WHERE course_id = ?
            ORDER BY lessonId`,  // You can order by title, created_at or any other column that makes sense
            [courseId]
        );

        if (lessons.length === 0) {
            return res.status(404).send('No lessons found for this course');
        }

        res.json({
            courseId: courseId,
            lessons: lessons
        });
    } catch (error) {
        res.status(500).send('Failed to retrieve lessons: ' + error.message);
    }
});
// Route to enroll a user in a specific course
router.post('/courses/:id/enroll', authenticate, async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user.id;  // Assuming `req.user` is populated by the authentication middleware

    try {
        // Check if the course exists
        const [course] = await query('SELECT id FROM courses WHERE id = ?', [courseId]);
        if (course.length === 0) {
            return res.status(404).send('Course not found');
        }

        // Check if the user is already enrolled
        const [existingEnrollment] = await query(
            'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );
        if (existingEnrollment.length > 0) {
            return res.status(409).send('User already enrolled in this course');
        }

        // Insert the new enrollment record
        const [enrollment] = await query(
            'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
            [userId, courseId]
        );

        res.status(201).send('Enrollment successful');
    } catch (error) {
        res.status(500).send('Failed to enroll in course: ' + error.message);
    }
});
// Route to get the course progress for a logged-in student
router.get('/courses/:id/progress', authenticate, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id; // Assuming `req.user` is populated by the authentication middleware

    try {
        // Check if the user is enrolled in the course
        const [enrollment] = await query(
            'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );
        if (enrollment.length === 0) {
            return res.status(404).send('User not enrolled in this course');
        }

        // Calculate total number of lessons
        const [totalLessons] = await query(
            'SELECT COUNT(*) AS total FROM lessons WHERE course_id = ?',
            [courseId]
        );

        // Calculate completed lessons
        const [completedLessons] = await query(
            'SELECT COUNT(*) AS completed FROM lesson_completions WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );

        // Calculate progress as a percentage
        const progress = totalLessons[0].total > 0 ? (completedLessons[0].completed / totalLessons[0].total * 100).toFixed(2) : 0;

        res.json({
            courseId: courseId,
            totalLessons: totalLessons[0].total,
            completedLessons: completedLessons[0].completed,
            progressPercentage: progress
        });
    } catch (error) {
        res.status(500).send('Failed to retrieve course progress: ' + error.message);
    }
});


module.exports = router;