// src/pages/HospitalsPage.jsx

import React, { useState } from 'react';
// Import the necessary CSS files.
// Note: You must update the paths based on your actual React project structure.
import '../styles/global.css'; 
import '../styles/Hospitals.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

function HospitalsPage() {
  // Use React state for input values instead of direct DOM manipulation
  const [searchParams, setSearchParams] = useState({
    location: '',
    state: '',
    specialization: '',
    keyword: ''
  });
  
  // This is where the logic from hospitals.js would be integrated
  const performSearch = () => {
    console.log('Performing Search with parameters:', searchParams);
    // Add API call or filtering logic here
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [id.replace('search', '').toLowerCase()]: value // Maps searchLocation to location
    }));
  };
  
  // Dummy results count, this would typically be dynamic state data
  const resultsCount = 8;
  
  // Dummy data for mapping (representing what JavaScript would generate)
  const dummyResults = [
    { id: 1, name: "City General Hospital", city: "New York", specialty: "Cardiology" },
    // More hospital data here...
  ];

  // The main JSX structure
  return (
    <>
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Hospitals Directory</h1>
          <p>Find the best healthcare facilities near you</p>
        </div>
      </section>

      {/* Advanced Search Section */}
      <section className="advanced-search-section">
        <div className="container">
          <div className="search-card">
            <h2>Search Hospitals</h2>
            <div className="advanced-search-grid">
              
              {/* Search Group 1: Location */}
              <div className="search-group">
                <label htmlFor="searchLocation">Location</label>
                <input 
                  type="text" 
                  id="searchLocation" 
                  placeholder="Enter city or zip code" 
                  className="search-input"
                  value={searchParams.location}
                  onChange={handleChange}
                />
              </div>
              
              {/* Search Group 2: State */}
              <div className="search-group">
                <label htmlFor="searchState">State</label>
                <select 
                  id="searchState" 
                  className="search-input"
                  value={searchParams.state}
                  onChange={handleChange}
                >
                  <option value="">All States</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="OH">Ohio</option>
                  <option value="NC">North Carolina</option>
                  <option value="MD">Maryland</option>
                  <option value="MN">Minnesota</option>
                </select>
              </div>
              
              {/* Search Group 3: Specialization */}
              <div className="search-group">
                <label htmlFor="searchSpecialization">Specialization</label>
                <select 
                  id="searchSpecialization" 
                  className="search-input"
                  value={searchParams.specialization}
                  onChange={handleChange}
                >
                  <option value="">All Specializations</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="oncology">Oncology</option>
                  <option value="emergency">Emergency Medicine</option>
                  <option value="surgery">General Surgery</option>
                </select>
              </div>
              
              {/* Search Group 4: Keyword */}
              <div className="search-group">
                <label htmlFor="searchKeyword">Keyword</label>
                <input 
                  type="text" 
                  id="searchKeyword" 
                  placeholder="Hospital name or keyword" 
                  className="search-input"
                  value={searchParams.keyword}
                  onChange={handleChange}
                />
              </div>

            </div>
            
            {/* Search Button */}
            <button className="search-submit-btn" onClick={performSearch}>
              <i className="fas fa-search"></i> Search Hospitals
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <h2>Search Results</h2>
            <div className="results-count">
              <span id="resultsCount">{resultsCount}</span> hospitals found
            </div>
          </div>

          <div className="results-grid" id="resultsGrid">
            {/* In a real React app, you would map over your hospital data state to render components: */}
            {dummyResults.map(hospital => (
              <div key={hospital.id} className="hospital-card">
                {/* A simplified example of the card structure */}
                <h3>{hospital.name}</h3>
                <p>{hospital.city} | {hospital.specialty}</p>
                <a href={`/hospitals/${hospital.id}`}>View Details</a>
              </div>
            ))}
            {/* Placeholder to mimic the empty grid for now */}
            {dummyResults.length === 0 && <p>No results found.</p>}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {/* The logic for disabling/activating buttons would be handled by state */}
            <button className="page-btn" disabled><i className="fas fa-chevron-left"></i></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HospitalsPage;