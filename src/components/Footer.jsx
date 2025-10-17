// src/components/Footer.jsx

import React from 'react';
// You might import a global or footer-specific CSS here

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Footer Section 1: Contact Info */}
        <div className="footer-section">
          <div className="logo">
            <i className="fas fa-heartbeat"></i>
            <div>
              <h3>MEDICAL</h3>
              <p>DIRECTORY</p>
            </div>
          </div>
          <p><i className="fas fa-map-marker-alt"></i> 3481 Fifth Avenue, New York</p>
          <p><i className="fas fa-phone"></i> +1 (0) 000 0000 001</p>
          <p><i className="fas fa-phone"></i> +44 (0)20 7123 4567</p>
          <p><i className="fas fa-envelope"></i> info@example.com</p>
        </div>
        
        {/* Footer Section 2: Latest Hospital */}
        <div className="footer-section">
          <h4>LATEST HOSPITAL</h4>
          <div className="footer-list">
            <div className="footer-item">
              {/* In React, you would import and use an image here: <img src={hospitalImg} alt="Hospital" /> */}
              <img src="https://via.placeholder.com/50" alt="Hospital" />
              <div>
                <h5>Calvary Hospital</h5>
                <p>Cardiology</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Section 3: Recently Joined */}
        <div className="footer-section">
          <h4>RECENTLY JOINED</h4>
          <div className="footer-list">
            <div className="footer-item">
              {/* In React, you would import and use an image here: <img src={doctorImg} alt="Doctor" /> */}
              <img src="https://via.placeholder.com/50" alt="Doctor" />
              <div>
                <h5>Dr. Magdy Sharek</h5>
                <p>Joined Dec 12, 2015</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Section 4: Newsletter */}
        <div className="footer-section">
          <h4>NEWSLETTER</h4>
          <p>Sign up to our newsletter to receive our latest news and updates. We do not spam.</p>
          {/* Add state handling for the input/button in a real component */}
          <input type="email" placeholder="info@example.com" className="newsletter-input" />
          <button className="subscribe-btn">SUBSCRIBE</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright 2024 Medical Directory. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;