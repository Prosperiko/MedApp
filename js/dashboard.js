// Hospital Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupNavigation();
    setupQuickActions();
});

function initializeDashboard() {
    // Show overview section by default
    showSection('overview');
    
    // Initialize any charts or dynamic content
    updateStats();
    loadRecentActivity();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            if (href === '#logout') {
                handleLogout();
                return;
            }
            
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        // If section doesn't exist, create placeholder
        createPlaceholderSection(sectionId);
    }
}

function createPlaceholderSection(sectionId) {
    const main = document.querySelector('.dashboard-main');
    
    // Remove existing placeholder if any
    const existingPlaceholder = document.querySelector('.placeholder-section');
    if (existingPlaceholder) {
        existingPlaceholder.remove();
    }
    
    // Create new placeholder
    const placeholder = document.createElement('section');
    placeholder.className = 'dashboard-section active placeholder-section';
    placeholder.innerHTML = `
        <div class="section-header">
            <h2>${formatSectionTitle(sectionId)}</h2>
            <p>This section is under development</p>
        </div>
        <div class="placeholder-content">
            <div class="placeholder-card">
                <i class="fas fa-tools"></i>
                <h3>Coming Soon</h3>
                <p>The ${formatSectionTitle(sectionId)} section is currently being developed. Check back soon for updates!</p>
            </div>
        </div>
    `;
    
    main.appendChild(placeholder);
}

function formatSectionTitle(sectionId) {
    return sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/([A-Z])/g, ' $1');
}

function setupQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                // Execute the onclick function
                eval(onclick);
            }
        });
    });
}

function updateStats() {
    // Simulate real-time stats updates
    const stats = [
        { selector: '.stat-card:nth-child(1) h3', value: Math.floor(Math.random() * 50) + 200 },
        { selector: '.stat-card:nth-child(2) h3', value: Math.floor(Math.random() * 200) + 1700 },
        { selector: '.stat-card:nth-child(3) h3', value: '$' + (Math.floor(Math.random() * 10000) + 40000).toLocaleString() },
        { selector: '.stat-card:nth-child(4) h3', value: (4.5 + Math.random() * 0.5).toFixed(1) }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) {
            element.textContent = stat.value;
        }
    });
}

function loadRecentActivity() {
    const activities = [
        {
            icon: 'fas fa-user-plus',
            title: 'New patient registered',
            subtitle: 'John Smith - 2 hours ago'
        },
        {
            icon: 'fas fa-calendar',
            title: 'Appointment scheduled',
            subtitle: 'Dr. Johnson - 4 hours ago'
        },
        {
            icon: 'fas fa-star',
            title: 'New 5-star review',
            subtitle: 'Sarah Wilson - 6 hours ago'
        },
        {
            icon: 'fas fa-user-md',
            title: 'Staff member added',
            subtitle: 'Dr. Emily Davis - 1 day ago'
        }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${activity.title}</strong></p>
                    <span>${activity.subtitle}</span>
                </div>
            </div>
        `).join('');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real application, you would clear session/tokens
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Setup completion functions
function completeSetupStep(stepNumber) {
    const step = document.querySelector(`.setup-step:nth-child(${stepNumber})`);
    if (step) {
        step.classList.remove('active');
        step.classList.add('completed');
        
        const icon = step.querySelector('.step-icon i');
        icon.className = 'fas fa-check';
        
        const button = step.querySelector('.step-action');
        button.textContent = 'Edit';
        button.classList.remove('primary');
        
        // Update progress
        updateSetupProgress();
    }
}

function updateSetupProgress() {
    const completedSteps = document.querySelectorAll('.setup-step.completed').length;
    const totalSteps = document.querySelectorAll('.setup-step').length;
    const progress = (completedSteps / totalSteps) * 100;
    
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '% Complete';
    }
}

// Notification handling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Sample data for development
const sampleData = {
    appointments: [
        { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '10:00 AM', status: 'confirmed' },
        { id: 2, patient: 'Jane Wilson', doctor: 'Dr. Johnson', time: '2:30 PM', status: 'pending' },
        { id: 3, patient: 'Mike Brown', doctor: 'Dr. Davis', time: '4:00 PM', status: 'completed' }
    ],
    patients: [
        { id: 1, name: 'John Doe', age: 35, lastVisit: '2024-01-15' },
        { id: 2, name: 'Jane Wilson', age: 28, lastVisit: '2024-01-10' },
        { id: 3, name: 'Mike Brown', age: 42, lastVisit: '2024-01-08' }
    ],
    staff: [
        { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', status: 'active' },
        { id: 2, name: 'Dr. Johnson', specialty: 'Neurology', status: 'active' },
        { id: 3, name: 'Dr. Davis', specialty: 'Pediatrics', status: 'active' }
    ]
};

// Auto-refresh stats every 30 seconds
setInterval(updateStats, 30000);