import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HospitalsPage from './pages/HospitalsPage';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import EmergencyPage from './pages/EmergencyPage';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/hospitals" element={<HospitalsPage/>} />
      </Routes>
     
    </Router>
  )
}

export default App
