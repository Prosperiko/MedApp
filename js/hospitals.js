// Get hospitals data
const hospitalsData = JSON.parse(localStorage.getItem('hospitalsData')) || [];

// State mapping
const stateMapping = {
    'NY': 'New York',
    'CA': 'California',
    'NC': 'North Carolina',
    'OH': 'Ohio',
    'MD': 'Maryland',
    'MN': 'Minnesota'
};

// Load results on page load
document.addEventListener('DOMContentLoaded', function() {
    loadResults(hospitalsData);
});

// Perform search
function performSearch() {
    const location = document.getElementById('searchLocation').value.toLowerCase();
    const state = document.getElementById('searchState').value;
    const specialization = document.getElementById('searchSpecialization').value.toLowerCase();
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    
    let filtered = hospitalsData;
    
    // Filter by location
    if (location) {
        filtered = filtered.filter(h => 
            h.address.toLowerCase().includes(location)
        );
    }
    
    // Filter by state
    if (state) {
        filtered = filtered.filter(h => 
            h.address.includes(state) || h.address.includes(stateMapping[state])
        );
    }
    
    // Filter by specialization
    if (specialization) {
        filtered = filtered.filter(h => 
            h.specialty.toLowerCase().includes(specialization) ||
            h.type.toLowerCase().includes(specialization)
        );
    }
    
    // Filter by keyword
    if (keyword) {
        filtered = filtered.filter(h => 
            h.name.toLowerCase().includes(keyword) ||
            h.specialty.toLowerCase().includes(keyword) ||
            h.address.toLowerCase().includes(keyword)
        );
    }
    
    loadResults(filtered);
}

// Load results
function loadResults(hospitals) {
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsCount.textContent = hospitals.length;
    
    if (hospitals.length === 0) {
        resultsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-dark); margin-bottom: 10px;">No hospitals found</h3>
                <p style="color: var(--text-light);">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    resultsGrid.innerHTML = hospitals.map(hospital => `
        <div class="result-card" onclick="viewHospitalDetails(${hospital.id})">
            <img src="${hospital.image}" alt="${hospital.name}" class="result-card-image">
            <div class="result-card-content">
                <h3 class="result-card-title">${hospital.name}</h3>
                <span class="result-card-specialty">${hospital.specialty}</span>
                
                <div class="result-card-info">
                    <div class="result-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hospital.address}</span>
                    </div>
                    <div class="result-info-item">
                        <i class="fas fa-phone"></i>
                        <span>${hospital.phone}</span>
                    </div>
                </div>
                
                <div class="result-card-rating">
                    ${generateStars(hospital.rating)}
                    <span style="color: var(--text-light); margin-left: 5px;">${hospital.rating}/5.0</span>
                </div>
                
                <div class="result-card-actions">
                    <button class="result-action-btn primary" onclick="event.stopPropagation(); viewHospitalDetails(${hospital.id})">
                        View Details
                    </button>
                    <button class="result-action-btn" onclick="event.stopPropagation(); callHospital('${hospital.phone}')">
                        <i class="fas fa-phone"></i> Call
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

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
    
    return stars;
}

// View hospital details
function viewHospitalDetails(hospitalId) {
    window.location.href = `hospital-details.html?id=${hospitalId}`;
}

// Call hospital
function callHospital(phone) {
    window.location.href = `tel:${phone}`;
}

// Handle emergency
function handleEmergency() {
    if (confirm('This will redirect you to emergency services. Continue?')) {
        window.location.href = 'emergency.html';
    }
}
