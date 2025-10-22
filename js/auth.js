// Authentication JavaScript

let selectedAccountType = null;

document.addEventListener('DOMContentLoaded', function() {
    setupAuthForms();
    setupFormValidation();
});

function selectAccountType(type) {
    selectedAccountType = type;
    
    // Hide account type selector
    document.getElementById('accountTypeSelector').style.display = 'none';
    
    // Show auth forms
    document.getElementById('authFormsContainer').style.display = 'block';
    
    // Update form titles and content based on account type
    updateFormContent(type);
    
    // Show hospital-specific fields if hospital account
    const hospitalFields = document.getElementById('hospitalFields');
    if (type === 'hospital') {
        hospitalFields.style.display = 'block';
        // Make hospital fields required
        document.getElementById('hospitalName').required = true;
        document.getElementById('hospitalAddress').required = true;
        document.getElementById('specialty').required = true;
    } else {
        hospitalFields.style.display = 'none';
        // Remove required attribute from hospital fields
        document.getElementById('hospitalName').required = false;
        document.getElementById('hospitalAddress').required = false;
        document.getElementById('specialty').required = false;
    }
}

function updateFormContent(type) {
    const isHospital = type === 'hospital';
    
    // Update login form
    document.getElementById('loginTitle').textContent = isHospital ? 'Hospital Login' : 'Patient Login';
    document.getElementById('loginBtn').innerHTML = isHospital ? 
        '<i class="fas fa-hospital"></i> Sign In to Dashboard' : 
        '<i class="fas fa-sign-in-alt"></i> Sign In';
    
    // Update signup form
    document.getElementById('signupTitle').textContent = isHospital ? 'Create Hospital Account' : 'Create Patient Account';
    document.getElementById('signupBtn').innerHTML = isHospital ? 
        '<i class="fas fa-hospital"></i> Create Hospital Account' : 
        '<i class="fas fa-user-plus"></i> Create Account';
}

function showAccountTypeSelector() {
    document.getElementById('accountTypeSelector').style.display = 'block';
    document.getElementById('authFormsContainer').style.display = 'none';
    selectedAccountType = null;
}

function showAuthForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    // Update tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide forms
    if (formType === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

function setupAuthForms() {
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignup();
    });
    
    // Social auth buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            handleSocialAuth(provider);
        });
    });
}

function setupFormValidation() {
    // Password confirmation validation
    const confirmPassword = document.getElementById('confirmPassword');
    const password = document.getElementById('signupPassword');
    
    confirmPassword.addEventListener('input', function() {
        if (this.value !== password.value) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

function handleLogin() {
    const formData = new FormData(document.getElementById('loginForm'));
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Show loading state
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, you would validate credentials with your backend
        console.log('Login attempt:', { email, accountType: selectedAccountType });
        
        // Simulate successful login
        showNotification('Login successful!', 'success');
        
        // Redirect based on account type
        setTimeout(() => {
            if (selectedAccountType === 'hospital') {
                window.location.href = 'hospital-dashboard.html';
            } else {
                window.location.href = 'my-account.html'; // We'll create this
            }
        }, 1000);
        
    }, 2000);
}

function handleSignup() {
    const formData = new FormData(document.getElementById('signupForm'));
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        accountType: selectedAccountType
    };
    
    // Add hospital-specific data if applicable
    if (selectedAccountType === 'hospital') {
        userData.hospitalName = formData.get('hospitalName');
        userData.hospitalAddress = formData.get('hospitalAddress');
        userData.specialty = formData.get('specialty');
    }
    
    // Show loading state
    const signupBtn = document.getElementById('signupBtn');
    const originalText = signupBtn.innerHTML;
    signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    signupBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Signup attempt:', userData);
        
        // Simulate successful signup
        showNotification('Account created successfully!', 'success');
        
        // Redirect based on account type
        setTimeout(() => {
            if (selectedAccountType === 'hospital') {
                window.location.href = 'hospital-dashboard.html';
            } else {
                window.location.href = 'my-account.html';
            }
        }, 1000);
        
    }, 2000);
}

function handleSocialAuth(provider) {
    showNotification(`${provider} authentication coming soon!`, 'info');
}

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

// Add notification styles to the page
const notificationStyles = `
.notification {
    position: fixed;
    top: 100px;
    right: 30px;
    background: var(--white);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 2000;
    min-width: 300px;
    animation: slideIn 0.3s ease-out;
}

.notification.success {
    border-color: #4CAF50;
    background: #f8fff8;
}

.notification.error {
    border-color: #f44336;
    background: #fff8f8;
}

.notification.info {
    border-color: var(--primary-blue);
    background: #f0f8ff;
}

.notification i {
    font-size: 1.2rem;
}

.notification.success i {
    color: #4CAF50;
}

.notification.error i {
    color: #f44336;
}

.notification.info i {
    color: var(--primary-blue);
}

.notification button {
    background: none;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    padding: 5px;
    margin-left: auto;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);