// models/Course.js
const { query } = require('../database'); // Link to your database configuration

const Course = {
    getAllCourses: async () => {
        try {
            const sql = 'SELECT * FROM courses';
            const [results] = await query(sql);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getCourseById: async (courseId) => {
        try {
            const sql = 'SELECT * FROM courses WHERE id = ?';
            const [results] = await query(sql, [courseId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },

    createCourse: async (courseData) => {
        try {
            const sql = 'INSERT INTO courses (title, description, syllabus) VALUES (?, ?, ?)';
            const { title, description, syllabus } = courseData;
            const [result] = await query(sql, [title, description, syllabus]);
            return result.insertId; // Return the ID of the newly created course
        } catch (error) {
            throw error;
        }
    },

    updateCourse: async (courseId, courseData) => {
        try {
            const sql = 'UPDATE courses SET title = ?, description = ?, syllabus = ? WHERE id = ?';
            const { title, description, syllabus } = courseData;
            await query(sql, [title, description, syllabus, courseId]);
            return courseId; // Return the ID of the updated course
        } catch (error) {
            throw error;
        }
    },

    deleteCourse: async (courseId) => {
        try {
            const sql = 'DELETE FROM courses WHERE id = ?';
            await query(sql, [courseId]);
            return courseId; // Confirm deletion by returning the course ID
        } catch (error) {
            throw error;
        }
    },

    getLessonsByCourse: async (courseId) => {
        try {
            const sql = 'SELECT * FROM lessons WHERE course_id = ?';
            const [results] = await query(sql, [courseId]);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Course;
