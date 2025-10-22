# MedApp - Quick Reference Guide

## 🚀 Quick Start

### To Launch:
```bash
# Option 1: Double-click
launch.bat

# Option 2: Python
python -m http.server 8000

# Option 3: Node.js
npx http-server
```

Then open: `http://localhost:8000`

---

## 📄 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Main landing page with hospital finder |
| Hospitals | `hospitals.html` | Repository with advanced search |
| Hospital Details | `hospital-details.html?id=X` | Individual hospital page |
| Emergency | `emergency.html` | Emergency services access |
| Login | `login.html` | User authentication |
| My Account | `my-account.html` | User dashboard (protected) |

---

## 🔐 Authentication

### Test Login:
- **Email**: Any email (e.g., `test@example.com`)
- **Password**: Any password
- System uses localStorage (no backend required)

### Login Flow:
1. Click **LOGIN** button → Redirects to login page
2. Enter credentials → Click Login
3. Profile avatar appears → Click for dropdown
4. Dropdown shows: My Account | Sign Out

### Logout:
1. Click profile avatar
2. Click "Sign Out"
3. Confirm logout
4. Returns to home page

---

## 🔍 Search Hospitals

### Filters Available:
- **Location**: City or zip code
- **State**: 10 US states
- **Specialization**: 7 medical specializations
- **Keyword**: Hospital name or keyword

### How to Search:
1. Go to `hospitals.html`
2. Fill in desired filters
3. Click "Search Hospitals"
4. Results update instantly

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | > 1024px | Full multi-column |
| Tablet | 768px - 1024px | Adjusted columns |
| Mobile | < 768px | Single column |
| Small Mobile | < 480px | Optimized small |

---

## 🎨 Design Tokens

```css
/* Colors */
--primary-blue: #00a8e8
--dark-blue: #003d5c
--light-gray: #f5f5f5
--white: #ffffff
--emergency-red: #ff4444

/* Spacing */
--border-width: 2px
--border-radius: 9px

/* Font */
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif
```

---

## 📂 File Structure

```
medapp/
├── HTML Pages
│   ├── index.html              (Home)
│   ├── hospitals.html          (Repository)
│   ├── hospital-details.html   (Details)
│   ├── emergency.html          (Emergency)
│   ├── login.html              (Login)
│   └── my-account.html         (Dashboard)
│
├── CSS Files
│   ├── styles.css              (Global)
│   ├── details.css             (Details page)
│   ├── emergency.css           (Emergency page)
│   ├── hospitals.css           (Repository page)
│   ├── auth.css                (Login page)
│   └── account.css             (Dashboard)
│
└── JavaScript Files
    ├── script.js               (Home page)
    ├── hospital-details.js     (Details page)
    ├── emergency.js            (Emergency page)
    ├── hospitals.js            (Repository page)
    ├── auth.js                 (Authentication)
    └── account.js              (Dashboard)
```

---

## 🧪 Testing Scenarios

### 1. Test Authentication
```
1. Open index.html
2. Click LOGIN button
3. Enter: test@example.com / password123
4. Click Login
5. ✓ Profile avatar should appear
6. Click avatar
7. ✓ Dropdown should show
8. Click Sign Out
9. ✓ LOGIN button should reappear
```

### 2. Test Hospital Search
```
1. Go to hospitals.html
2. Select State: New York
3. Select Specialization: Cardiology
4. Click Search
5. ✓ Results should filter
6. Click a hospital card
7. ✓ Should navigate to details page
```

### 3. Test Responsive Design
```
1. Open DevTools (F12)
2. Toggle device toolbar
3. Test sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1440px)
4. ✓ Layout should adapt
5. ✓ Navigation should stack on mobile
6. ✓ Buttons should be touch-friendly
```

### 4. Test My Account
```
1. Login first
2. Click profile avatar
3. Click "My Account"
4. ✓ Dashboard should load
5. Click sidebar tabs
6. ✓ Content should switch
7. Check Overview, Appointments, Favorites
8. ✓ All tabs should work
```

---

## 🐛 Common Issues

### Issue: Login button not showing
**Fix**: Clear localStorage and refresh
```javascript
localStorage.clear();
location.reload();
```

### Issue: Profile dropdown not working
**Fix**: Check if auth.js is loaded
```html
<script src="auth.js"></script>
```

### Issue: Hospitals not loading
**Fix**: Check if hospitalsData exists
```javascript
localStorage.setItem('hospitalsData', JSON.stringify(hospitals));
```

### Issue: Responsive layout broken
**Fix**: Check viewport meta tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 💡 Quick Tips

### Add New Hospital:
Edit `script.js` and add to `hospitals` array:
```javascript
{
    id: 9,
    name: "New Hospital",
    specialty: "CARDIOLOGY",
    image: "image-url",
    rating: 4.5,
    address: "Address",
    phone: "+1 (xxx) xxx-xxxx",
    type: "hospital",
    lat: 40.xxxx,
    lng: -73.xxxx
}
```

### Change Colors:
Edit `styles.css` CSS variables:
```css
:root {
    --primary-blue: #YOUR_COLOR;
    --dark-blue: #YOUR_COLOR;
}
```

### Add New State:
Edit `hospitals.html` state dropdown:
```html
<option value="XX">State Name</option>
```

### Add New Specialization:
Edit `hospitals.html` specialization dropdown:
```html
<option value="specialty">Specialty Name</option>
```

---

## 📊 Sample Data

### Test User:
```javascript
{
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, New York, NY 10001'
}
```

### Sample Hospitals: 8 included
- Calvary Hospital (Bronx, NY)
- Duke Hospital (Durham, NC)
- NYIT Medical Center (NY)
- Mount Sinai Hospital (NY)
- Cleveland Clinic (OH)
- Johns Hopkins (MD)
- Mayo Clinic (MN)
- UCSF Medical Center (CA)

---

## 🎯 Key Features

### ✅ Implemented:
- [x] Dynamic authentication
- [x] Profile avatar with dropdown
- [x] Hospital search & filter
- [x] Responsive design
- [x] User dashboard
- [x] Protected routes
- [x] Emergency access
- [x] Hospital details
- [x] Favorites system
- [x] Appointments (UI)

### 🔜 Future Enhancements:
- [ ] Backend API integration
- [ ] Real authentication
- [ ] Google Maps integration
- [ ] Appointment booking
- [ ] Reviews system
- [ ] Email notifications
- [ ] Payment integration

---

## 📞 Support

### Documentation:
- `README.md` - Full documentation
- `FEATURES.md` - Feature details
- `UPDATE-SUMMARY.md` - Recent updates
- `DEPLOYMENT.md` - Deployment guide

### Quick Links:
- Home: `index.html`
- Hospitals: `hospitals.html`
- Login: `login.html`
- Account: `my-account.html`

---

## ✨ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open DevTools | F12 |
| Refresh Page | Ctrl+R / Cmd+R |
| Hard Refresh | Ctrl+Shift+R |
| Toggle Device Toolbar | Ctrl+Shift+M |
| Open Console | Ctrl+Shift+J |

---

**Last Updated**: December 2024
**Version**: 2.0 (With Authentication)
**Status**: ✅ Production Ready
