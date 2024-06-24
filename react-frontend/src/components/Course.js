import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Course.css';

function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        setCourse(response.data);
      });
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <section className="course-details">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div className="course-content">
        <h3>Course Content</h3>
        <ul>
          {course.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="course-progress">
        <h3>Progress</h3>
        <div className="progress-bar">
          <div className="progress-filled" style={{ width: `${course.progress}%` }}></div>
        </div>
        <p>{course.progress}% completed</p>
      </div>
    </section>
  );
}

export default Course;

