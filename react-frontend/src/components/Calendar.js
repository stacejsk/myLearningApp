
// Calendar.jsx

import React from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'; // Import your calendar component CSS and JS library

function CalendarComponent({ courses }) {
  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then(response => response.json())
      .then(data => setCourse(data));
  }, [courseId]);

  return (
    <div>
      <Calendar
        tileClassName={({ date }) => {
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          const course = courses.find(course => course.dayOfWeek === dayOfWeek);

          if (course) {
            return `highlight ${course.name.toLowerCase().replace(' ', '-')}-course`;
          }
        }}
      />
    </div>
  );
}

export default CalendarComponent;
