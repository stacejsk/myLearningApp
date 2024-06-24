import React, { useEffect, useState } from 'react';
import './CourseSelection.css';

function CourseSelection({ courses, selectedCourses, setSelectedCourses }) {
  const handleSelectionChange = (courseId) => {
    setSelectedCourses(prevState => {
      if (prevState.includes(courseId)) {
        return prevState.filter(id => id !== courseId);
      } else {
        return [...prevState, courseId];
      }
    });
  };

  return (
    <div className="course-selection">
      <h3>Select Courses</h3>
      {courses.map(course => (
        <div key={course.id} className="course-item">
          <input
            type="checkbox"
            checked={selectedCourses.includes(course.id)}
            onChange={() => handleSelectionChange(course.id)}
          />
          {course.name}
        </div>
      ))}
    </div>
  );
}

export default CourseSelection;
