// src/components/Header.jsx

import React from 'react';
// Assuming global styles and font-awesome are handled in App.js or public/index.html

function Header() {
  const handleEmergency = () => {
    // In a real React app, you'd use useNavigate from react-router-dom here
    // navigate('/emergency'); 
    console.log('Navigating to Emergency Page');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <i className="fas fa-heartbeat"></i>
          <div>
            <h1>MEDICAL</h1>
            <p>DIRECTORY</p>
          </div>
        </div>
        <nav className="nav">
          {/* Replace 'href' with react-router's Link or NavLink for SPA navigation */}
          <a href="/home">HOME</a>
          <a href="/hospitals" className="active">HOSPITALS</a>
          <a href="#contact">CONTACT US</a>
        </nav>
        <div className="header-actions">
          <button className="login-btn" onClick={() => console.log('Navigating to Login')}>
            <i className="fas fa-user"></i> LOGIN
          </button>
          <button className="emergency-btn" onClick={handleEmergency}>
            <i className="fas fa-ambulance"></i> EMERGENCY
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;