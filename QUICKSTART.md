# MedApp - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Open the App
**Option A - Double Click** (Easiest)
- Double-click `index.html` to open in your browser
- Note: Some features may be limited without a server

**Option B - Use Launch Script** (Windows)
- Double-click `launch.bat`
- Opens a local server automatically
- Navigate to `http://localhost:8000`

**Option C - Manual Server** (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser

### Step 2: Allow Location Access
- When prompted, click "Allow" to share your location
- This helps find hospitals near you
- You can skip this, but features will be limited

### Step 3: Explore!
- Browse hospitals on the map and grid
- Use filters to find specific types
- Click any hospital to see details
- Try the Emergency button for quick access

---

## 📱 Main Features

### Find Hospitals
1. **Search Bar**: Enter location, specialty, or keywords
2. **Filter Tags**: Click tags to filter by type
3. **Hospital Cards**: Click any card for details

### View Details
1. Click a hospital card
2. See full information, services, hours
3. Call, get directions, or book appointment

### Emergency Access
1. Click red "EMERGENCY" button
2. Quick access to 911, nearest ER, ambulance
3. View emergency guidelines

---

## 🎨 What You'll See

### Home Page
- **Top**: Navigation with emergency button
- **Hero**: Map showing hospital locations
- **Search**: Filters and search bar
- **Grid**: Hospital cards with images and ratings
- **Footer**: Contact info and newsletter

### Hospital Details
- **Header**: Large image with hospital name
- **Main**: About, services, operating hours
- **Sidebar**: Contact info and action buttons
- **Map**: Location view

### Emergency Page
- **Hero**: Red alert banner
- **Actions**: Quick emergency buttons
- **Facilities**: Nearest emergency rooms
- **Guidelines**: When to call 911
- **Contacts**: Important phone numbers

---

## 🎯 Try These Actions

### Basic Actions
- ✅ Search for "cardiology"
- ✅ Click "CARDIAC CENTER" filter tag
- ✅ Click a hospital card
- ✅ Click "Call Now" button
- ✅ Click "Get Directions"

### Emergency Actions
- ✅ Click "EMERGENCY" button
- ✅ View nearest emergency facilities
- ✅ Read emergency guidelines
- ✅ Try "Find Nearest ER"

### Navigation
- ✅ Use back button on details page
- ✅ Navigate between pages
- ✅ Try on mobile device
- ✅ Test responsive design

---

## 📊 Sample Data

The app includes 8 sample hospitals:
1. Calvary Hospital (Bronx, NY)
2. Duke Hospital (Durham, NC)
3. NYIT Medical Center (Old Westbury, NY)
4. Mount Sinai Hospital (New York, NY)
5. Cleveland Clinic (Cleveland, OH)
6. Johns Hopkins Hospital (Baltimore, MD)
7. Mayo Clinic (Rochester, MN)
8. UCSF Medical Center (San Francisco, CA)

All are cardiology/cardiac centers with ratings 4.3-5.0 stars.

---

## 🔧 Customization

### Add Your Own Hospitals
Edit `script.js` and modify the `hospitals` array:

```javascript
const hospitals = [
    {
        id: 1,
        name: "Your Hospital Name",
        specialty: "SPECIALTY",
        image: "image-url",
        rating: 4.5,
        address: "Full address",
        phone: "+1 (xxx) xxx-xxxx",
        type: "hospital",
        lat: 40.xxxx,
        lng: -73.xxxx
    },
    // Add more...
];
```

### Change Colors
Edit `styles.css` and modify CSS variables:

```css
:root {
    --primary-blue: #00a8e8;
    --dark-blue: #003d5c;
    --light-gray: #f5f5f5;
    /* etc. */
}
```

### Update Content
- **Logo**: Change text in header
- **Footer**: Update contact information
- **About**: Modify hospital descriptions in `hospital-details.js`

---

## 🐛 Troubleshooting

### Location Not Working
- **Issue**: Browser doesn't ask for location
- **Fix**: Check browser settings → Site permissions → Location

### Map Shows Placeholder
- **Issue**: Map doesn't load
- **Fix**: This is expected - integrate Google Maps API for real maps

### Phone Calls Don't Work
- **Issue**: Call buttons don't do anything
- **Fix**: This works on mobile devices, not desktop browsers

### Hospitals Not Showing
- **Issue**: Grid is empty
- **Fix**: Check browser console for errors, ensure JavaScript is enabled

### Styling Looks Broken
- **Issue**: CSS not loading
- **Fix**: Use a local server instead of opening file directly

---

## 📱 Mobile Testing

### On Your Phone
1. Start local server on computer
2. Find your computer's IP address
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. On phone, navigate to `http://YOUR-IP:8000`
4. Test all features

### Responsive Testing in Browser
1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Select device (iPhone, iPad, etc.)
4. Test different screen sizes

---

## 🚀 Next Steps

### For Development
1. ✅ Test all features
2. ✅ Customize hospital data
3. ✅ Integrate Google Maps API
4. ✅ Connect to real healthcare APIs
5. ✅ Add user authentication
6. ✅ Implement appointment booking

### For Production
1. ✅ Optimize images
2. ✅ Minify CSS/JS
3. ✅ Set up hosting
4. ✅ Configure domain
5. ✅ Add analytics
6. ✅ Set up monitoring

---

## 📚 Documentation

- **README.md**: Full project documentation
- **FEATURES.md**: Detailed feature guide
- **This file**: Quick start guide

---

## 💡 Tips

1. **Use a local server** for best experience
2. **Allow location access** for full functionality
3. **Test on mobile** for responsive design
4. **Check console** for any errors
5. **Read FEATURES.md** for detailed info

---

## 🆘 Need Help?

- Check browser console for errors
- Review FEATURES.md for detailed documentation
- Ensure all files are in the same directory
- Use a modern browser (Chrome, Firefox, Safari, Edge)

---

## ✨ Enjoy MedApp!

You're all set! Start exploring and finding healthcare facilities near you.

**Remember**: This is an MVP with sample data. For production use, integrate with real healthcare APIs and services.

---

**Questions?** Contact: info@medapp.com
