import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MainContent from './MainContent';
import './Dashboard.css';

function Dashboard({ userId }) {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <LeftSideBar profile={dashboardData.profile} />
      <MainContent 
        courses={dashboardData.courses} 
        progress={dashboardData.progress}
      />
      <RightSideBar 
        timetable={dashboardData.timetable} 
        events={dashboardData.events} 
      />
    </div>
  );
}

export default Dashboard;

