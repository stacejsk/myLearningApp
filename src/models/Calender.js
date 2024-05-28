// models/Calendar.js
const { query } = require('../database');

const Calendar = {
    addEvent: async (userId, title, description, eventDate, eventTime) => {
        try {
            const sql = 'INSERT INTO calendar_events (user_id, title, description, event_date, event_time) VALUES (?, ?, ?, ?, ?)';
            await query(sql, [userId, title, description, eventDate, eventTime]);
        } catch (error) {
            console.error('Error adding event to the calendar:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    },

    getUserEvents: async (userId) => {
        try {
            const sql = 'SELECT * FROM calendar_events WHERE user_id = ? ORDER BY event_date, event_time';
            const [results] = await query(sql, [userId]);
            return results;
        } catch (error) {
            console.error('Error fetching user events:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    }
};

module.exports = Calendar;
