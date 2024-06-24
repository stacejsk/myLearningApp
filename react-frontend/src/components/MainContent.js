import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import CourseSelection from './CourseSelection';
import Progress from './Progress';
import Course from './Course';
import './MainContent.css';

function MainContent({ courses, progress }) {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<HomeLayout courses={courses} progress={progress} />} />
        <Route path="/course/:id" element={<Course />} />
      </Routes>
    </main>
  );
}

function HomeLayout({ courses, progress }) {
  return (
    <div>
      <Overview />
      <CourseSelection courses={courses} />
      <Progress progress={progress} />
    </div>
  );
}

export default MainContent;


