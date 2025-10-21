// Get hospital ID from URL
const urlParams = new URLSearchParams(window.location.search);
const hospitalId = parseInt(urlParams.get('id'));

// Get hospitals data from localStorage
const hospitalsData = JSON.parse(localStorage.getItem('hospitalsData')) || [];

// Find the hospital
const hospital = hospitalsData.find(h => h.id === hospitalId);

// Sample extended data
const hospitalDetails = {
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

// Default details for all hospitals
const defaultDetails = {
    about: "A premier healthcare facility dedicated to providing exceptional medical care with state-of-the-art technology and compassionate service. Our team of experienced healthcare professionals is committed to your health and wellbeing.",
    services: ["Emergency Care", "Outpatient Services", "Diagnostic Imaging", "Laboratory Services", "Pharmacy", "Physical Therapy", "Specialized Care", "24/7 Support"],
    hours: [
        { day: "Monday", hours: "Open 24 Hours", isToday: false },
        { day: "Tuesday", hours: "Open 24 Hours", isToday: false },
        { day: "Wednesday", hours: "Open 24 Hours", isToday: false },
        { day: "Thursday", hours: "Open 24 Hours", isToday: true },
        { day: "Friday", hours: "Open 24 Hours", isToday: false },
        { day: "Saturday", hours: "Open 24 Hours", isToday: false },
        { day: "Sunday", hours: "Open 24 Hours", isToday: false }
    ],
    email: "info@hospital.com"
};

// Load hospital details
document.addEventListener('DOMContentLoaded', function() {
    if (!hospital) {
        alert('Hospital not found!');
        window.location.href = 'index.html';
        return;
    }
    
    const details = hospitalDetails[hospitalId] || defaultDetails;
    
    // Update page title
    document.title = `${hospital.name} - MedApp`;
    
    // Populate hospital information
    document.getElementById('hospitalImage').src = hospital.image;
    document.getElementById('hospitalImage').alt = hospital.name;
    document.getElementById('hospitalName').textContent = hospital.name;
    document.getElementById('hospitalSpecialty').textContent = hospital.specialty;
    document.getElementById('hospitalRating').innerHTML = generateStars(hospital.rating);
    document.getElementById('hospitalAbout').textContent = details.about;
    document.getElementById('hospitalAddress').textContent = hospital.address;
    document.getElementById('hospitalPhone').textContent = hospital.phone;
    document.getElementById('hospitalEmail').textContent = details.email;
    
    // Populate services
    const servicesList = document.getElementById('hospitalServices');
    servicesList.innerHTML = details.services.map(service => 
        `<div class="service-item">
            <i class="fas fa-check-circle"></i>
            <span>${service}</span>
        </div>`
    ).join('');
    
    // Populate hours
    const hoursList = document.getElementById('hospitalHours');
    hoursList.innerHTML = details.hours.map(item => 
        `<div class="hours-row ${item.isToday ? 'today' : ''}">
            <span class="hours-day">${item.day}</span>
            <span class="hours-time">${item.hours}</span>
        </div>`
    ).join('');
});

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars + ` <span style="color: var(--text-light); margin-left: 10px;">${rating}/5.0</span>`;
}

// Call hospital
function callHospital() {
    if (hospital && hospital.phone) {
        window.location.href = `tel:${hospital.phone}`;
    }
}

// Get directions
function getDirections() {
    if (hospital && hospital.address) {
        const address = encodeURIComponent(hospital.address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }
}

// Book appointment
function bookAppointment() {
    alert('Appointment booking feature coming soon! Please call the hospital directly.');
}

// Handle emergency
function handleEmergency() {
    if (confirm('This will redirect you to emergency services. Continue?')) {
        window.location.href = 'emergency.html';
    }
}
