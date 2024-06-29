// Ensure this points to your actual database configuration module
const { query } = require('../database');

const Lesson = {
    getLessonsByCourse: async (courseId) => {
        try {
            const sql = 'SELECT * FROM lessons WHERE course_id = ?';
            const [results] = await query(sql, [courseId]);
            return results;
        } catch (error) {
            throw error;  // Rethrow the error to be caught by the controller
        }
    },

    getLessonById: async (lessonId) => {
        try {
            const sql = 'SELECT * FROM lessons WHERE lesson_id = ?';
            const [results] = await query(sql, [lessonId]);
            return results[0];
        } catch (error) {
            console.error('Error fetching lesson by ID:', error);
            throw error;
        }
    },

    createLessonWithAssessment: async (lessonData, assessmentData) => {
        try {
            const lessonSql = 'INSERT INTO lessons (course_id, title, content) VALUES (?, ?, ?)';
            const { courseId, title, content } = lessonData;
            const lessonResult = await query(lessonSql, [courseId, title, content]);

            if (lessonResult.insertId) {
                const assessmentSql = 'INSERT INTO assessments (lesson_id, questions, duration) VALUES (?, ?, ?)';
                const { questions, duration } = assessmentData;
                const assessmentResult = await query(assessmentSql, [lessonResult.insertId, JSON.stringify(questions), duration]);
                return {
                    lessonId: lessonResult.insertId,
                    assessmentId: assessmentResult.insertId
                };
            } else {
                throw new Error('Failed to create lesson');
            }
        } catch (error) {
            console.error('Error creating lesson and associated assessment:', error);
            throw error;
        }
    },

    updateLesson: async (lessonId, lessonData) => {
        try {
            const sql = 'UPDATE lessons SET title = ?, content = ? WHERE lesson_id = ?';
            const { title, content } = lessonData;
            await query(sql, [title, content, lessonId]);
            return lessonId;
        } catch (error) {
            console.error('Error updating lesson:', error);
            throw error;
        }
    },

    deleteLesson: async (lessonId) => {
        try {
            const sql = 'DELETE FROM lessons WHERE lesson_id = ?';
            await query(sql, [lessonId]);
            return lessonId;
        } catch (error) {
            console.error('Error deleting lesson:', error);
            throw error;
        }
    },

    getAssessmentsByLesson: async (lessonId) => {
        try {
            const sql = 'SELECT * FROM assessments WHERE lesson_id = ?';
            const [results] = await query(sql, [lessonId]);
            return results;
        } catch (error) {
            console.error('Error fetching assessments by lesson:', error);
            throw error;
        }
    }
};

module.exports = Lesson;
