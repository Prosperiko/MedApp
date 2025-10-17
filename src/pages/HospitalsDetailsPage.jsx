// src/pages/HospitalDetailsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
// These hooks replace direct DOM/URL manipulation and history
import { useParams, useNavigate } from 'react-router-dom';

// Import the specific styles for this page
import '../styles/global.css';
import '../styles/Details.css'; 
import Header from '../components/Header'; // Assuming you put Header/Footer in src/components
import Footer from '../components/Footer';

// --- Start of Mock Data (Replace with API Call in a real app) ---

// Dummy data structure for demonstration
const mockHospitalsData = [
    { id: 1, name: "Calvary Hospital", specialty: "Cardiology", rating: 4.5, image: "https://via.placeholder.com/600x300?text=Calvary+Hospital", address: "123 Heartbeat Blvd, New York, NY 10001", phone: "1-800-CALVARY" },
    { id: 2, name: "City General Hospital", specialty: "General Medicine", rating: 3.8, image: "https://via.placeholder.com/600x300?text=City+General", address: "456 Main St, Anytown, CA 90210", phone: "1-800-555-1212" },
    // Add more mock hospitals as needed
];

const hospitalExtendedDetails = {
    1: {
        about: "Calvary Hospital is a leading healthcare facility specializing in cardiac care and cardiology services. With state-of-the-art equipment and experienced medical professionals, we provide comprehensive heart care to our patients.",
        services: ["Emergency Care", "Cardiac Surgery", "Cardiology", "ICU", "Diagnostic Imaging", "Laboratory Services", "Pharmacy", "Physical Therapy"],
        hours: [
            { day: "Monday", hours: "Open 24 Hours", isToday: false },
            { day: "Tuesday", hours: "Open 24 Hours", isToday: false },
            { day: "Wednesday", hours: "Open 24 Hours", isToday: false },
            { day: "Thursday", hours: "Open 24 Hours", isToday: true },
            { day: "Friday", hours: "Open 24 Hours", isToday: false },
            { day: "Saturday", hours: "Open 24 Hours", isToday: false },
            { day: "Sunday", hours: "Open 24 Hours", isToday: false }
        ],
        email: "info@calvaryhospital.com"
    }
};

const defaultDetails = {
    about: "A premier healthcare facility dedicated to providing exceptional medical care with state-of-the-art technology and compassionate service. Our team of experienced healthcare professionals is committed to your health and wellbeing.",
    services: ["Emergency Care", "Outpatient Services", "Diagnostic Imaging", "Laboratory Services", "Pharmacy", "Physical Therapy", "Specialized Care", "24/7 Support"],
    hours: [
        { day: "Monday", hours: "9:00 AM - 5:00 PM", isToday: false },
        { day: "Tuesday", hours: "9:00 AM - 5:00 PM", isToday: false },
        { day: "Wednesday", hours: "9:00 AM - 5:00 PM", isToday: false },
        { day: "Thursday", hours: "9:00 AM - 5:00 PM", isToday: true },
        { day: "Friday", hours: "9:00 AM - 5:00 PM", isToday: false },
        { day: "Saturday", hours: "Closed", isToday: false },
        { day: "Sunday", hours: "Closed", isToday: false }
    ],
    email: "info@hospital.com"
};
// --- End of Mock Data ---


// Helper function, moved from hospital-details.js
const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return (
        <>
            {stars} 
            <span style={{ color: 'var(--text-light)', marginLeft: '10px' }}>{rating}/5.0</span>
        </>
    );
};


function HospitalDetailsPage() {
    // 1. Get ID from URL parameter using React Router's useParams hook
    const { id } = useParams();
    const navigate = useNavigate();
    const hospitalId = parseInt(id);

    // 2. State to hold the hospital data
    const [hospital, setHospital] = useState(null);
    const [details, setDetails] = useState(defaultDetails);
    const [isLoading, setIsLoading] = useState(true);

    // 3. Effect hook to fetch/load data when the component mounts or ID changes
    useEffect(() => {
        // In a real app, this would be an async API call to fetch hospital data
        const foundHospital = mockHospitalsData.find(h => h.id === hospitalId);

        if (!foundHospital) {
            alert('Hospital not found!');
            // Use navigate for history/redirect
            navigate('/hospitals'); 
            return;
        }

        // Combine base and extended details
        const extendedDetails = hospitalExtendedDetails[hospitalId] || defaultDetails;
        
        setHospital(foundHospital);
        setDetails(extendedDetails);
        setIsLoading(false);
        
        // Update document title (the equivalent of document.title = ...)
        document.title = `${foundHospital.name} - MedApp`;

    }, [hospitalId, navigate]); // Dependency array ensures this runs when ID or navigate changes

    // 4. Function handlers (replacing the global JS functions)
    const handleBackClick = useCallback(() => {
        // In React Router, navigate(-1) simulates history.back()
        navigate(-1);
    }, [navigate]);

    const callHospital = () => {
        if (hospital?.phone) {
            window.location.href = `tel:${hospital.phone}`;
        }
    };

    const getDirections = () => {
        if (hospital?.address) {
            const address = encodeURIComponent(hospital.address);
            // Note: I've corrected the template literal for Google Maps link.
            window.open(`https://maps.google.com/?q=${address}`, '_blank');
        }
    };

    const bookAppointment = () => {
        alert('Appointment booking feature coming soon! Please call the hospital directly.');
    };
    
    // Show a loading/error state if data isn't ready
    if (isLoading || !hospital) {
        return (
            <>
                <Header />
                <div className="container" style={{padding: '50px', textAlign: 'center'}}>
                    <p>{isLoading ? 'Loading Hospital Details...' : 'Error: Hospital data is missing.'}</p>
                </div>
                <Footer />
            </>
        );
    }

    // Main render function using JSX
    return (
        <>
            <Header />

            {/* Hospital Details Section */}
            <section className="details-section">
                <div className="container">
                    {/* Back Button */}
                    <button className="back-btn" onClick={handleBackClick}>
                        <i className="fas fa-arrow-left"></i> Back to Search
                    </button>
                    
                    {/* Hospital Header Card */}
                    <div className="hospital-header-card">
                        <div className="hospital-image-wrapper">
                            {/* The src and alt are dynamically set from state */}
                            <img 
                                src={hospital.image} 
                                alt={hospital.name} 
                                className="hospital-main-image"
                            />
                        </div>
                        <div className="hospital-info-header">
                            <div className="hospital-title-section">
                                <h1 className="hospital-main-title">{hospital.name}</h1>
                                <div className="hospital-meta">
                                    <span className="specialty-tag">{hospital.specialty}</span>
                                    {/* Star rating component generated dynamically */}
                                    <div className="rating-display">
                                        {generateStars(hospital.rating)}
                                    </div>
                                </div>
                            </div>
                            <div className="quick-actions">
                                {/* Handlers replace inline JavaScript `onclick` */}
                                <button className="quick-action-btn call" onClick={callHospital}>
                                    <i className="fas fa-phone"></i>
                                    <span>Call</span>
                                </button>
                                <button className="quick-action-btn directions" onClick={getDirections}>
                                    <i className="fas fa-directions"></i>
                                    <span>Directions</span>
                                </button>
                                <button className="quick-action-btn book" onClick={bookAppointment}>
                                    <i className="fas fa-calendar-check"></i>
                                    <span>Book</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="details-content-grid">
                        
                        {/* Left Column */}
                        <div className="left-column">
                            {/* About Section */}
                            <div className="content-card">
                                <h2 className="card-title">About</h2>
                                <p className="about-text">{details.about}</p>
                            </div>

                            {/* Services Section - Uses map() for dynamic list */}
                            <div className="content-card">
                                <h2 className="card-title">Services Offered</h2>
                                <div className="services-grid">
                                    {details.services.map((service, index) => (
                                        <div key={index} className="service-item">
                                            <i className="fas fa-check-circle"></i>
                                            <span>{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hours Section - Uses map() for dynamic list */}
                            <div className="content-card">
                                <h2 className="card-title">Operating Hours</h2>
                                <div className="hours-table">
                                    {details.hours.map((item, index) => (
                                        <div key={index} className={`hours-row ${item.isToday ? 'today' : ''}`}>
                                            <span className="hours-day">{item.day}</span>
                                            <span className="hours-time">{item.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="right-column">
                            {/* Contact Card */}
                            <div className="content-card sticky-card">
                                <h2 className="card-title">Contact Information</h2>
                                <div className="contact-list">
                                    {/* Address */}
                                    <div className="contact-row">
                                        <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                                        <div className="contact-details">
                                            <span className="contact-label">Address</span>
                                            <p className="contact-value">{hospital.address}</p>
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div className="contact-row">
                                        <div className="contact-icon"><i className="fas fa-phone"></i></div>
                                        <div className="contact-details">
                                            <span className="contact-label">Phone</span>
                                            <p className="contact-value">{hospital.phone}</p>
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className="contact-row">
                                        <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                                        <div className="contact-details">
                                            <span className="contact-label">Email</span>
                                            <p className="contact-value">{details.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Card */}
                            <div className="content-card">
                                <h2 className="card-title">Location</h2>
                                <div className="map-wrapper">
                                    <div className="map-placeholder">
                                        <i className="fas fa-map-marked-alt"></i>
                                        <p>Map View for {hospital.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default HospitalDetailsPage;