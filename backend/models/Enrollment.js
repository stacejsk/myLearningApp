// models/Enrollment.js
const { query } = require('../database');

const Enrollment = {
    enrollUser: async (userId, courseId) => {
        try {
            const sql = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
            await query(sql, [userId, courseId]);
        } catch (error) {
            console.error('Error enrolling user:', error);
            throw error;
        }
    },

    unenrollUser: async (userId, courseId) => {
        try {
            const sql = 'DELETE FROM enrollments WHERE user_id = ? AND course_id = ?';
            await query(sql, [userId, courseId]);
        } catch (error) {
            console.error('Error unenrolling user:', error);
            throw error;
        }
    },

    getUserCourses: async (userId) => {
        try {
            const sql = 'SELECT course_id FROM enrollments WHERE user_id = ?';
            const [results] = await query(sql, [userId]);
            return results.map(result => result.course_id);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            throw error;
        }
    }
};

module.exports = Enrollment;

