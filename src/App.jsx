import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Landing'
import HospitalsPage from './pages/HospitalsPage'

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
