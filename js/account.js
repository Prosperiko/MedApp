// Account Dashboard Management

// Load user data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupTabNavigation();
    loadFavorites();
});

// Load user data
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
    }
}

// Setup tab navigation
function setupTabNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Load favorites
function loadFavorites() {
    const hospitalsData = JSON.parse(localStorage.getItem('hospitalsData')) || [];
    const favorites = hospitalsData.slice(0, 5); // Get first 5 as favorites
    
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (favoritesGrid) {
        favoritesGrid.innerHTML = favorites.map(hospital => `
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
                    </div>
                    
                    <div class="result-card-rating">
                        ${generateStars(hospital.rating)}
                    </div>
                    
                    <button class="result-action-btn primary" onclick="event.stopPropagation(); viewHospitalDetails(${hospital.id})">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
    }
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
