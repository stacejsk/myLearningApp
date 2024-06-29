// models/Discussion.js
const { query } = require('../database');

const Discussion = {
    createThread: async (title, content, courseId, userId) => {
        try {
            const sql = 'INSERT INTO discussions (title, content, course_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
            await query(sql, [title, content, courseId, userId]);
        } catch (error) {
            console.error('Error creating discussion thread:', error);
            throw error;
        }
    },

    getCourseThreads: async (courseId) => {
        try {
            const sql = 'SELECT * FROM discussions WHERE course_id = ? ORDER BY updated_at DESC';
            const [results] = await query(sql, [courseId]);
            return results;
        } catch (error) {
            console.error('Error fetching course threads:', error);
            throw error;
        }
    }
};

module.exports = Discussion;

