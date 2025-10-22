// Sample hospital data
const hospitals = [
    {
        id: 1,
        name: "Calvary Hospital",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
        rating: 4.5,
        address: "1740 Eastchester Rd, Bronx, NY 10461",
        phone: "+1 (718) 518-2000",
        type: "cardiac",
        lat: 40.8448,
        lng: -73.8448
    },
    {
        id: 2,
        name: "Duke Hospital",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400",
        rating: 4.8,
        address: "2301 Erwin Rd, Durham, NC 27710",
        phone: "+1 (919) 684-8111",
        type: "cardiology",
        lat: 36.0103,
        lng: -78.9389
    },
    {
        id: 3,
        name: "NYIT Medical Center",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400",
        rating: 4.3,
        address: "Northern Blvd, Old Westbury, NY 11568",
        phone: "+1 (516) 686-7516",
        type: "hospital",
        lat: 40.7891,
        lng: -73.6025
    },
    {
        id: 4,
        name: "Mount Sinai Hospital",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
        rating: 4.7,
        address: "One Gustave L. Levy Place, New York, NY 10029",
        phone: "+1 (212) 241-6500",
        type: "cardiac",
        lat: 40.7903,
        lng: -73.9527
    },
    {
        id: 5,
        name: "Cleveland Clinic",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
        rating: 4.9,
        address: "9500 Euclid Ave, Cleveland, OH 44195",
        phone: "+1 (216) 444-2200",
        type: "cardiology",
        lat: 41.5034,
        lng: -81.6218
    },
    {
        id: 6,
        name: "Johns Hopkins Hospital",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
        rating: 5.0,
        address: "1800 Orleans St, Baltimore, MD 21287",
        phone: "+1 (410) 955-5000",
        type: "hospital",
        lat: 39.2971,
        lng: -76.5930
    },
    {
        id: 7,
        name: "Mayo Clinic",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400",
        rating: 4.9,
        address: "200 First St SW, Rochester, MN 55905",
        phone: "+1 (507) 284-2511",
        type: "cardiac",
        lat: 44.0225,
        lng: -92.4662
    },
    {
        id: 8,
        name: "UCSF Medical Center",
        specialty: "CARDIOLOGY",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400",
        rating: 4.6,
        address: "505 Parnassus Ave, San Francisco, CA 94143",
        phone: "+1 (415) 476-1000",
        type: "hospital",
        lat: 37.7625,
        lng: -122.4580
    }
];

let currentFilter = 'all';
let userLocation = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadHospitals();
    setupFilterTags();
    getUserLocation();
});

// Get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                initMap();
            },
            (error) => {
                console.log('Location access denied:', error);
                // Default to New York
                userLocation = { lat: 40.7128, lng: -74.0060 };
                initMap();
            }
        );
    } else {
        // Default to New York
        userLocation = { lat: 40.7128, lng: -74.0060 };
        initMap();
    }
}

// Initialize map (placeholder - would use Google Maps API or Leaflet in production)
function initMap() {
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-map-marked-alt"></i>
            <p>Map showing ${hospitals.length} hospitals near you</p>
            <p style="font-size: 0.9rem; margin-top: 10px;">
                <i class="fas fa-location-arrow"></i> 
                Your location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}
            </p>
        </div>
    `;
}

// Load hospitals into grid
function loadHospitals(filter = 'all') {
    const grid = document.getElementById('hospitalsGrid');
    const filteredHospitals = filter === 'all' 
        ? hospitals 
        : hospitals.filter(h => h.type === filter);
    
    grid.innerHTML = filteredHospitals.map(hospital => `
        <div class="hospital-card" onclick="viewHospitalDetails(${hospital.id})">
            <img src="${hospital.image}" alt="${hospital.name}" class="hospital-image">
            <div class="hospital-info">
                <h3 class="hospital-name">${hospital.name}</h3>
                <p class="hospital-specialty">${hospital.specialty}</p>
                <div class="hospital-rating">
                    ${generateStars(hospital.rating)}
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

// Setup filter tag buttons
function setupFilterTags() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            tags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            loadHospitals(filter);
        });
    });
}

// Search hospitals
function searchHospitals() {
    const location = document.getElementById('location').value.toLowerCase();
    const specialty = document.getElementById('specialty').value.toLowerCase();
    const keyword = document.getElementById('keyword').value.toLowerCase();
    
    const filtered = hospitals.filter(hospital => {
        const matchesLocation = !location || hospital.address.toLowerCase().includes(location);
        const matchesSpecialty = !specialty || hospital.specialty.toLowerCase().includes(specialty);
        const matchesKeyword = !keyword || 
            hospital.name.toLowerCase().includes(keyword) ||
            hospital.specialty.toLowerCase().includes(keyword);
        
        return matchesLocation && matchesSpecialty && matchesKeyword;
    });
    
    const grid = document.getElementById('hospitalsGrid');
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 40px; grid-column: 1/-1;">No hospitals found matching your criteria.</p>';
    } else {
        grid.innerHTML = filtered.map(hospital => `
            <div class="hospital-card" onclick="viewHospitalDetails(${hospital.id})">
                <img src="${hospital.image}" alt="${hospital.name}" class="hospital-image">
                <div class="hospital-info">
                    <h3 class="hospital-name">${hospital.name}</h3>
                    <p class="hospital-specialty">${hospital.specialty}</p>
                    <div class="hospital-rating">
                        ${generateStars(hospital.rating)}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// View hospital details
function viewHospitalDetails(hospitalId) {
    window.location.href = `hospital-details.html?id=${hospitalId}`;
}

// Handle emergency button
function handleEmergency() {
    if (confirm('This will redirect you to emergency services. Continue?')) {
        window.location.href = 'emergency.html';
    }
}

// Store hospitals data in localStorage for other pages
localStorage.setItem('hospitalsData', JSON.stringify(hospitals));
