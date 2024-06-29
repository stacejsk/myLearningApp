// models/Resource.js
const { query } = require('../database');

const Resource = {
    addResource: async (courseId, title, description, resourceLink) => {
        try {
            const sql = 'INSERT INTO resources (course_id, title, description, resource_link) VALUES (?, ?, ?, ?)';
            await query(sql, [courseId, title, description, resourceLink]);
        } catch (error) {
            console.error('Error adding resource:', error);
            throw error;
        }
    },

    getResourcesByCourse: async (courseId) => {
        try {
            const sql = 'SELECT * FROM resources WHERE course_id = ?';
            const [results] = await query(sql, [courseId]);
            return results;
        } catch (error) {
            console.error('Error fetching resources by course:', error);
            throw error;
        }
    }
};

module.exports = Resource;

