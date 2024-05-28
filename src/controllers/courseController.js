const Course = require('../models/Course');
const Lessons = require('../models/Lessons');  // Assuming you have a Lessons model

const courseController = {
    // Existing methods...

    // Method to get a course and its lessons
    getCourseWithLessons: async (req, res) => {
        try {
            const course = await Course.getCourseById(req.params.id);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            const lessons = await Lessons.getLessonsByCourse(req.params.id);
            res.json({ course, lessons });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Method to add a lesson to a course
    addLessonToCourse: async (req, res) => {
        try {
            const { courseId } = req.params;
            const lessonData = req.body;
            const newLessonId = await Lessons.createLessonWithAssessment(courseId, lessonData);
            res.status(201).json({ message: 'Lesson added to course', id: newLessonId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = courseController;
