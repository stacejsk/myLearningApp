import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSideBar.css';

function LeftSideBar({ profile }) {
  return (
    <aside className="sidebar" id="left-sidebar">
      {profile && (
        <section id="profile-container">
          <img src={profile.avatar} alt="User Profile" className="profile-pic" id="profile-image" />
          <div className="profile-info">
            <div className="profile-name" id="profile-name">{profile.name}</div>
            <div className="profile-title" id="profile-title">{profile.title}</div>
          </div>
        </section>
      )}
      <nav className="navigation">
        <ul>
          <li>
            <img src="/images/dashboard.svg" alt="Dashboard" />
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <img src="/images/courses-icon.svg" alt="Courses" />
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <img src="/images/settings-icon.svg" alt="Progress" />
            <Link to="/progress">Progress</Link>
          </li>
        </ul>
      </nav>
      <section className="animation">
        <img src="/images/groupclass-animation.png" alt="animation" />
        <p>Stay on track with your courses and view all the progress you've made so far</p>
      </section>
    </aside>
  );
}

export default LeftSideBar;
