import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Progress.css';

function Progress() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        setCourses(response.data);
      });
  }, []);

  return (
    <section className="progress">
      <h2>Progress</h2>
      <div className="progress-list">
        {courses.map(course => (
          <div className="progress-item" key={course.id}>
            <h3>{course.title}</h3>
            <div className="progress-bar">
              <div className="progress-filled" style={{ width: `${course.progress}%` }}></div>
            </div>
            <p>{course.progress}% completed</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Progress;
