import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (id) => {
    setUserId(id);
  };

  const handleRegister = (id) => {
    setUserId(id);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Router>
      <div className="app-container">
        {userId ? (
          <Dashboard userId={userId} />
        ) : (
          isRegistering ? (
            <Register onRegister={handleRegister} />
          ) : (
            <Login onLogin={handleLogin} />
          )
        )}
        {!userId && (
          <button onClick={toggleForm}>
            {isRegistering ? 'Already have an account? Log In' : 'Don\'t have an account? Register'}
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;


