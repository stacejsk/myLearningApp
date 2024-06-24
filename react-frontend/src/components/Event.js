import React from 'react';

function Event({ events }) {
  return (
    <div>
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <h4>{event.name}</h4>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Event;

