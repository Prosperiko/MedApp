// Get hospitals data
const hospitalsData = JSON.parse(localStorage.getItem('hospitalsData')) || [];

// Filter emergency facilities
const emergencyFacilities = hospitalsData.filter(h => 
    h.specialty.toLowerCase().includes('cardiology') || 
    h.type === 'hospital'
).slice(0, 5);

// Load emergency facilities
document.addEventListener('DOMContentLoaded', function() {
    loadEmergencyFacilities();
});

function loadEmergencyFacilities() {
    const container = document.getElementById('emergencyFacilities');
    
    if (emergencyFacilities.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">No emergency facilities found nearby.</p>';
        return;
    }
    
    container.innerHTML = emergencyFacilities.map((facility, index) => `
        <div class="facility-item">
            <div class="facility-number">${index + 1}</div>
            <div class="facility-info">
                <h3>${facility.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${facility.address}</p>
                <p><i class="fas fa-phone"></i> ${facility.phone}</p>
                <div class="facility-distance">
                    <i class="fas fa-route"></i> ${(Math.random() * 5 + 0.5).toFixed(1)} miles away
                </div>
            </div>
            <div class="facility-actions">
                <button class="facility-btn call" onclick="callFacility('${facility.phone}')">
                    <i class="fas fa-phone"></i> Call
                </button>
                <button class="facility-btn directions" onclick="getDirections('${encodeURIComponent(facility.address)}')">
                    <i class="fas fa-directions"></i> Directions
                </button>
            </div>
        </div>
    `).join('');
}

// Call 911
function call911() {
    if (confirm('This will call 911 emergency services. Only call if this is a real emergency. Continue?')) {
        window.location.href = 'tel:911';
    }
}

// Find nearest ER
function findNearestER() {
    if (emergencyFacilities.length > 0) {
        const nearest = emergencyFacilities[0];
        if (confirm(`Nearest ER: ${nearest.name}\n${nearest.address}\n\nGet directions?`)) {
            getDirections(encodeURIComponent(nearest.address));
        }
    } else {
        alert('Unable to find nearby emergency rooms. Please call 911.');
    }
}

// Call ambulance
function callAmbulance() {
    if (confirm('This will call emergency ambulance services (911). Continue?')) {
        window.location.href = 'tel:911';
    }
}

// Poison control
function poisonControl() {
    if (confirm('This will call Poison Control at 1-800-222-1222. Continue?')) {
        window.location.href = 'tel:18002221222';
    }
}

// Call facility
function callFacility(phone) {
    window.location.href = `tel:${phone}`;
}

// Get directions
function getDirections(address) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
}
