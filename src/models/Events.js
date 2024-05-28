// models/Events.js
const { query } = require('../database');

const Events = {
    getAllEvents: async () => {
        try {
            const sql = 'SELECT * FROM events ORDER BY date, time';
            const [results] = await query(sql);
            return results;
        } catch (error) {
            console.error('Error fetching all events:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    },

    getEventById: async (eventId) => {
        try {
            const sql = 'SELECT * FROM events WHERE id = ?';
            const [results] = await query(sql, [eventId]);
            return results[0];
        } catch (error) {
            console.error('Error fetching event by ID:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    },

    createEvent: async (eventData) => {
        try {
            const { title, description, date, time } = eventData;
            const sql = 'INSERT INTO events (title, description, date, time) VALUES (?, ?, ?, ?)';
            const [result] = await query(sql, [title, description, date, time]);
            return this.getEventById(result.insertId);  // Returning the newly created event
        } catch (error) {
            console.error('Error creating an event:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    },

    updateEvent: async (eventId, eventData) => {
        try {
            const { title, description, date, time } = eventData;
            const sql = 'UPDATE events SET title = ?, description = ?, date = ?, time = ? WHERE id = ?';
            await query(sql, [title, description, date, time, eventId]);
            return this.getEventById(eventId);  // Returning the updated event
        } catch (error) {
            console.error('Error updating an event:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    },

    deleteEvent: async (eventId) => {
        try {
            const sql = 'DELETE FROM events WHERE id = ?';
            await query(sql, [eventId]);
            return eventId;  // Confirming deletion by returning the event ID
        } catch (error) {
            console.error('Error deleting an event:', error);
            throw error;  // Re-throwing error to be handled by caller if necessary
        }
    }
};

module.exports = Events;
