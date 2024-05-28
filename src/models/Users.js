// models/User.js
const { query } = require('../database'); // Assuming you have a database configuration file

const User = {
    getUserProfile: async (userId) => {
        try {
            const sql = 'SELECT name, email FROM users WHERE id = ?';
            const [results] = await query(sql, [userId]);
            return results[0];
        } catch (error) {
            console.error('Error retrieving user profile:', error);
            throw error;
        }
    },

    getUserEmail: async (userId) => {
        try {
            const sql = 'SELECT email FROM users WHERE id = ?';
            const [results] = await query(sql, [userId]);
            return results[0] ? results[0].email : null;
        } catch (error) {
            console.error('Error retrieving user email:', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            const { name, email, password } = userData; // Assuming password is already hashed if necessary
            const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
            const [result] = await query(sql, [name, email, password, role]);
            return result.insertId; // Return the ID of the newly created user
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    getUserCourses: async (userId) => {
        try {
            const sql = 'SELECT courses.id, courses.title, enrollment.status FROM courses ' +
                        'JOIN enrollment ON courses.id = enrollment.course_id ' +
                        'WHERE enrollment.user_id = ?';
            const [results] = await query(sql, [userId]);
            return results;
        } catch (error) {
            console.error('Error retrieving user courses:', error);
            throw error;
        }
    },

    getUserTimetable: async (userId) => {
        try {
            const sql = `
                SELECT t.class_id, c.title as class_title, t.start_time, t.end_time, t.day
                FROM timetable t
                JOIN classes c ON t.class_id = c.id
                WHERE t.user_id = ?`;
            const [results] = await query(sql, [userId]);
            return results;
        } catch (error) {
            console.error('Error retrieving user timetable:', error);
            throw error;
        }
    },

    getUserEvents: async (userId) => {
        try {
            const sql = `
                SELECT e.id, e.title, e.description, e.event_date, e.start_time, e.end_time
                FROM events e
                JOIN user_events ue ON e.id = ue.event_id
                WHERE ue.user_id = ?`;
            const [results] = await query(sql, [userId]);
            return results;
        } catch (error) {
            console.error('Error retrieving user events:', error);
            throw error;
        }
    },
    getUserProgress: async (userId) => {
        try {
            const sql = `
                SELECT
                    c.id AS course_id,
                    c.title AS course_title,
                    COUNT(l.id) AS total_lessons,
                    COUNT(lc.lesson_id) AS lessons_completed,
                    CASE 
                        WHEN COUNT(l.id) > 0 THEN ROUND((COUNT(lc.lesson_id) / COUNT(l.id) * 100), 2)
                        ELSE 0
                    END AS completion_percentage
                FROM
                    courses c
                JOIN
                    lessons l ON c.id = l.course_id
                LEFT JOIN
                    lesson_completions lc ON lc.lesson_id = l.id AND lc.user_id = ?
                GROUP BY
                    c.id`;
            const [results] = await query(sql, [userId]);  // userId is used in the SQL to filter lesson completions
            return results;
        } catch (error) {
            console.error('Error retrieving user progress:', error);
            throw error;
        }
    },
    getLeaderboard: async (courseId) => {
        try {
            let sql;
            let params = [];

            if (courseId) {
                // Query for leaderboard specific to a course
                sql = `
                    SELECT u.id, u.username, SUM(lc.score) AS total_score
                    FROM users u
                    JOIN lesson_completions lc ON u.id = lc.user_id
                    JOIN lessons l ON lc.lesson_id = l.id
                    WHERE l.course_id = ?
                    GROUP BY u.id
                    ORDER BY total_score DESC`;
                params.push(courseId);
            } else {
                // Query for global leaderboard
                sql = `
                    SELECT u.id, u.username, SUM(lc.score) AS total_score
                    FROM users u
                    JOIN lesson_completions lc ON u.id = lc.user_id
                    GROUP BY u.id
                    ORDER BY total_score DESC`;
            }

            const [results] = await query(sql, params);
            return results;
        } catch (error) {
            console.error('Error retrieving leaderboard:', error);
            throw error;
        }
    }
};

module.exports = User;
