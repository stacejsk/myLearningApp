const express = require('express');
const router = express.Router();
const { query } = require('../database');
const {authorizeAdmin} = require('../middleware/authenticate');


//define admin homepage
router.get('/', (req, res) => {
    res.send('Admin Dashboard');
  });

//view all users
app.get('/users', authorizeAdmin, async (req, res) => {
    try{
    sql= 'SELECT id, name, email, role FROM users'; 
    results= await query(sql );
    res.json(results);

    } catch (error){
        res.status(500).send('Failed to retrieve users: ' + error.message);

    }
});

//create a course
router.post('/courses/:courseId/lessons', authorizeAdmin, (req, res) => {
    const { title, content } = req.body;
    const courseId = req.params.courseId;
    try{
    const sql = 'INSERT INTO lessons (course_id, title, content) VALUES (?, ?, ?)';
    query(sql, [courseId, title, content]); 
    res.status(201).json({ message: 'Lesson added successfully', lessonId: results.insertId });
    }catch (error) {
        res.status(500).send( 'Error adding lesson' + error.message );
    }
    
});

//update a course 
router.put('/courses/:courseId/lessons/:lessonId', authorizeAdmin, async (req, res) => {
    const { title, content } = req.body;
    const { courseId, lessonId } = req.params;
    try {
        const sql = 'UPDATE lessons SET title = ?, content = ? WHERE id = ? AND course_id = ?';
        const results = await query(sql, [title, content, lessonId, courseId]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Lesson not found or no change made" });
        }
        res.status(200).json({ message: 'Lesson updated successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Error updating lesson', error });

    }
});


// to remove a lesson from a course
router.delete('/admin/courses/:courseId/lessons/:lessonId', authorizeAdmin, async (req, res) => {
    const { courseId, lessonId } = req.params;
    try{
        const query = 'DELETE FROM lessons WHERE id = ? AND course_id = ?';
        results = await query(query, [lessonId, courseId]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Lesson not found or already deleted" });
        }
        res.status(200).json({ message: "Lesson deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Database error", error });

    }
});



module.exports = router;