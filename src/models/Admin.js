const { query } = require('../database');

const Admin = {
    getAllUsers: async () => {
        try {
            const sql = 'SELECT * FROM users';
            const [results] = await query(sql);
            return results;
        } catch (error) {
            throw error;  // Throwing the error to be handled further up the call stack
        }
    },

    getUserById: async (userId) => {
        try {
            const sql = 'SELECT * FROM users WHERE id = ?';
            const [results] = await query(sql, [userId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },

    updateUserRole: async (userId, newRole) => {
        try {
            const sql = 'UPDATE users SET role = ? WHERE id = ?';
            await query(sql, [newRole, userId]);
            return userId;  // Confirming the update by returning the user ID
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            const sql = 'DELETE FROM users WHERE id = ?';
            await query(sql, [userId]);
            return userId;  // Confirm deletion by returning the user ID
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Admin;

