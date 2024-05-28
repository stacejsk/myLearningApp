const { query } = require('../database');

const Assessment = {
    getAllAssessments: async () => {
        try {
            const sql = 'SELECT * FROM assessments';
            const [results] = await query(sql);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getAssessmentById: async (assessmentId) => {
        try {
            const sql = 'SELECT * FROM assessments WHERE id = ?';
            const [results] = await query(sql, [assessmentId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },

    updateAssessment: async (assessmentId, assessmentData) => {
        try {
            const sql = 'UPDATE assessments SET questions = ?, duration = ? WHERE id = ?';
            const { questions, duration } = assessmentData;
            await query(sql, [JSON.stringify(questions), duration, assessmentId]);
            return assessmentId;
        } catch (error) {
            throw error;
        }
    },

    deleteAssessment: async (assessmentId) => {
        try {
            const sql = 'DELETE FROM assessments WHERE id = ?';
            await query(sql, [assessmentId]);
            return assessmentId; // Confirm deletion by returning the assessment ID
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Assessment;



