import React, { useEffect, useState } from 'react';
import CalendarComponent from './Calendar';
import Event from './Event';
import './RightSideBar.css';

function RightSideBar({ userId }) {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        return fetch(`/api/courses/${data.courseId}`);
      })
      .then(response => response.json())
      .then(data => setCourses([data])); // Assuming only one course per user for simplicity
  }, [userId]);

  useEffect(() => {
    if (user) {
      fetch(`/api/events/${user.courseId}`)
        .then(response => response.json())
        .then(data => setEvents(data));
    }
  }, [user]);

  return (
    <aside className="sidebar" id="right-sidebar">
      {user && (
        <>
          <div className="calendar-section">
            <CalendarComponent courses={courses} />
          </div>
          <div className="events-section">
            <Event events={events} />
          </div>
        </>
      )}
    </aside>
  );
}

export default RightSideBar;
