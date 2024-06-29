// models/Notification.js
const { query } = require('../database');

const Notification = {
    sendNotification: async (userId, title, message) => {
        try {
            const sql = 'INSERT INTO notifications (user_id, title, message, sent_at) VALUES (?, ?, ?, NOW())';
            await query(sql, [userId, title, message]);
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    },

    getUserNotifications: async (userId) => {
        try {
            const sql = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY sent_at DESC';
            const [results] = await query(sql, [userId]);
            return results;
        } catch (error) {
            console.error('Error fetching user notifications:', error);
            throw error;
        }
    }
};

module.exports = Notification;

