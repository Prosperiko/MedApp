// src/pages/EmergencyPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header'; // Assuming Header is a separate component
import Footer from '../components/Footer'; // Assuming Footer is a separate component

// Import the specific styles for this page (Note: In a real React app, CSS imports might vary)
import '../styles/global.css'; 
import '../styles/Emergency.css'; // Assuming you named your CSS file Emergency.css

// --- Mock Data Setup (Replaces localStorage access for demonstration) ---
const mockHospitalsData = [
    // Mock data based on the filtering logic in emergency.js
    { id: 1, name: "Calvary Hospital ER", specialty: "Cardiology", type: "hospital", address: "123 Heartbeat Blvd, New York, NY 10001", phone: "1-800-CALVARY" },
    { id: 2, name: "City General Hospital", specialty: "General Medicine", type: "hospital", address: "456 Main St, Anytown, CA 90210", phone: "1-800-555-1212" },
    { id: 3, name: "Local Urgent Care", specialty: "Urgent Care", type: "clinic", address: "789 Health Ave, Anytown, CA 90210", phone: "1-800-777-3333" },
    { id: 4, name: "St. Jude Trauma Center", specialty: "Trauma/ER", type: "hospital", address: "101 Emergency Way, New York, NY 10002", phone: "1-800-TRAUMA" },
    { id: 5, name: "Cardiac Institute", specialty: "Cardiology", type: "clinic", address: "202 Pulse Lane, New York, NY 10003", phone: "1-800-PULSE-1" },
    // Add more mock data as needed
];

// --- Component Definition ---

function EmergencyPage() {
    const navigate = useNavigate();
    const [emergencyFacilities, setEmergencyFacilities] = useState([]);
    
    // Simulates the logic from emergency.js (data loading/filtering)
    useEffect(() => {
        // In a real application, you'd fetch this from an API or central state manager
        // Here, we use the mock data to simulate localStorage/API fetching.
        
        const facilities = mockHospitalsData
            .filter(h => 
                h.specialty.toLowerCase().includes('cardiology') || 
                h.type === 'hospital'
            )
            .slice(0, 5); // Limit to the top 5
            
        setEmergencyFacilities(facilities);
        document.title = "Emergency Services - MedApp"; // Set page title
    }, []);

    // --- Action Handlers (replacing global JS functions) ---

    const call911 = useCallback(() => {
        if (window.confirm('This will call 911 emergency services. Only call if this is a real emergency. Continue?')) {
            window.location.href = 'tel:911';
        }
    }, []);

    const callFacility = useCallback((phone) => {
        window.location.href = `tel:${phone}`;
    }, []);

    const getDirections = useCallback((address) => {
        const encodedAddress = encodeURIComponent(address);
        // Corrected Google Maps URL template.
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }, []);

    const findNearestER = useCallback(() => {
        if (emergencyFacilities.length > 0) {
            const nearest = emergencyFacilities[0];
            if (window.confirm(`Nearest ER: ${nearest.name}\n${nearest.address}\n\nGet directions?`)) {
                getDirections(nearest.address);
            }
        } else {
            alert('Unable to find nearby emergency rooms. Please call 911.');
        }
    }, [emergencyFacilities, getDirections]);

    const callAmbulance = useCallback(() => {
        if (window.confirm('This will call emergency ambulance services (911). Continue?')) {
            window.location.href = 'tel:911';
        }
    }, []);

    const poisonControl = useCallback(() => {
        if (window.confirm('This will call Poison Control at 1-800-222-1222. Continue?')) {
            window.location.href = 'tel:18002221222';
        }
    }, []);

    // Helper for rendering facility items
    const renderFacilities = () => {
        if (emergencyFacilities.length === 0) {
            return (
                <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-dark)' }}>
                    No emergency facilities found nearby.
                </p>
            );
        }

        return emergencyFacilities.map((facility, index) => (
            <div key={facility.id} className="facility-item">
                <div className="facility-number">{index + 1}</div>
                <div className="facility-info">
                    <h3>{facility.name}</h3>
                    <p><i className="fas fa-map-marker-alt"></i> {facility.address}</p>
                    <p><i className="fas fa-phone"></i> {facility.phone}</p>
                    <div className="facility-distance">
                        <i className="fas fa-route"></i> {(Math.random() * 5 + 0.5).toFixed(1)} miles away
                    </div>
                </div>
                <div className="facility-actions">
                    <button className="facility-btn call" onClick={() => callFacility(facility.phone)}>
                        <i className="fas fa-phone"></i> Call
                    </button>
                    <button className="facility-btn directions" onClick={() => getDirections(facility.address)}>
                        <i className="fas fa-directions"></i> Directions
                    </button>
                </div>
            </div>
        ));
    };


    return (
        <>
            <Header />

            {/* Emergency Hero */}
            <section className="emergency-hero">
                <div className="container">
                    <div className="emergency-alert">
                        <i className="fas fa-exclamation-triangle"></i>
                        <h1>Emergency Services</h1>
                        <p>Get immediate help when you need it most</p>
                    </div>
                </div>
            </section>
            
            {/* --- */}

            {/* Quick Actions */}
            <section className="quick-actions">
                <div className="container">
                    <h2>Quick Emergency Actions</h2>
                    <div className="actions-grid">
                        {/* Call 911 */}
                        <div className="action-card urgent" onClick={call911}>
                            <i className="fas fa-phone-volume"></i>
                            <h3>Call 911</h3>
                            <p>For life-threatening emergencies</p>
                            <button className="action-button">Call Now</button>
                        </div>
                        
                        {/* Nearest ER */}
                        <div className="action-card" onClick={findNearestER}>
                            <i className="fas fa-hospital"></i>
                            <h3>Nearest ER</h3>
                            <p>Find closest emergency room</p>
                            <button className="action-button">Find ER</button>
                        </div>
                        
                        {/* Request Ambulance */}
                        <div className="action-card" onClick={callAmbulance}>
                            <i className="fas fa-ambulance"></i>
                            <h3>Request Ambulance</h3>
                            <p>Emergency transport service</p>
                            <button className="action-button">Request</button>
                        </div>
                        
                        {/* Poison Control */}
                        <div className="action-card" onClick={poisonControl}>
                            <i className="fas fa-flask"></i>
                            <h3>Poison Control</h3>
                            <p>1-800-222-1222</p>
                            <button className="action-button">Call</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* Nearest Emergency Facilities */}
            <section className="nearest-facilities">
                <div className="container">
                    <h2><i className="fas fa-map-marker-alt"></i> Nearest Emergency Facilities</h2>
                    <div className="facilities-list">
                        {renderFacilities()}
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* Emergency Guidelines */}
            <section className="emergency-guidelines">
                <div className="container">
                    <h2><i className="fas fa-info-circle"></i> When to Call 911</h2>
                    <div className="guidelines-grid">
                        {/* Card 1: Cardiac Emergency */}
                        <div className="guideline-card">
                            <i className="fas fa-heart-broken"></i>
                            <h3>Cardiac Emergency</h3>
                            <ul>
                                <li>Chest pain or pressure</li>
                                <li>Difficulty breathing</li>
                                <li>Irregular heartbeat</li>
                                <li>Loss of consciousness</li>
                            </ul>
                        </div>
                        
                        {/* Card 2: Stroke Symptoms */}
                        <div className="guideline-card">
                            <i className="fas fa-brain"></i>
                            <h3>Stroke Symptoms</h3>
                            <ul>
                                <li>Face drooping</li>
                                <li>Arm weakness</li>
                                <li>Speech difficulty</li>
                                <li>Sudden confusion</li>
                            </ul>
                        </div>
                        
                        {/* Card 3: Severe Injury */}
                        <div className="guideline-card">
                            <i className="fas fa-user-injured"></i>
                            <h3>Severe Injury</h3>
                            <ul>
                                <li>Heavy bleeding</li>
                                <li>Broken bones</li>
                                <li>Head trauma</li>
                                <li>Severe burns</li>
                            </ul>
                        </div>
                        
                        {/* Card 4: Allergic Reaction */}
                        <div className="guideline-card">
                            <i className="fas fa-allergies"></i>
                            <h3>Allergic Reaction</h3>
                            <ul>
                                <li>Difficulty breathing</li>
                                <li>Swelling of face/throat</li>
                                <li>Rapid pulse</li>
                                <li>Dizziness or fainting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* Emergency Contacts */}
            <section className="emergency-contacts">
                <div className="container">
                    <h2><i className="fas fa-address-book"></i> Important Emergency Contacts</h2>
                    <div className="contacts-grid">
                        
                        <div className="contact-box">
                            <i className="fas fa-phone-alt"></i>
                            <h4>Emergency Services</h4>
                            <a href="tel:911" className="contact-number">911</a>
                        </div>
                        
                        <div className="contact-box">
                            <i className="fas fa-flask"></i>
                            <h4>Poison Control</h4>
                            <a href="tel:18002221222" className="contact-number">1-800-222-1222</a>
                        </div>
                        
                        <div className="contact-box">
                            <i className="fas fa-comment-medical"></i>
                            <h4>Crisis Hotline</h4>
                            <a href="tel:988" className="contact-number">988</a>
                        </div>
                        
                        <div className="contact-box">
                            <i className="fas fa-hospital-user"></i>
                            <h4>Non-Emergency</h4>
                            <a href="tel:311" className="contact-number">311</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default EmergencyPage;