# MedApp - Healthcare Facility Finder

A responsive web application that helps users find nearby hospitals and clinics quickly and easily. Built with HTML, CSS, and vanilla JavaScript.

## Features

### Core Features (MVP)
- **Location-Based Hospital Finder**: Displays nearby hospitals and clinics based on user location
- **Emergency Access**: One-tap emergency button for quick access to emergency services
- **Facility Details**: Comprehensive information about each healthcare facility
- **Filter & Search**: Dynamic filtering by hospital type, specialization, and keywords
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Pages
1. **Home/Hospital Finder** (`index.html`)
   - Interactive map view
   - Search filters (location, specialty, distance, keyword)
   - Filter tags (Show All, Cardiac Center, Cardiology, Hospital, Pharmacy)
   - Hospital cards grid with images and ratings

2. **Hospital Details** (`hospital-details.html`)
   - Detailed facility information
   - Services offered
   - Operating hours
   - Contact information
   - Action buttons (Call, Directions, Book Appointment)
   - Location map

3. **Emergency Services** (`emergency.html`)
   - Quick emergency actions (Call 911, Find ER, Request Ambulance)
   - Nearest emergency facilities list
   - Emergency guidelines (when to call 911)
   - Important emergency contacts

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JS for interactivity
- **Font Awesome**: Icons
- **LocalStorage**: Data persistence between pages

## Project Structure

```
medapp/
├── index.html              # Main hospital finder page
├── hospital-details.html   # Individual hospital details
├── emergency.html          # Emergency services page
├── styles.css             # Global styles
├── details.css            # Hospital details page styles
├── emergency.css          # Emergency page styles
├── script.js              # Main page functionality
├── hospital-details.js    # Details page functionality
├── emergency.js           # Emergency page functionality
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone or download this repository
2. Open the project folder
3. Launch `index.html` in your browser

**Recommended**: Use a local server to avoid CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## Usage

### Finding Hospitals
1. Open the app - it will request your location
2. Browse hospitals on the map and in the grid
3. Use filters to narrow down results
4. Click on any hospital card to view details

### Emergency Access
1. Click the red "EMERGENCY" button in the header
2. Choose from quick actions (Call 911, Find ER, etc.)
3. View nearest emergency facilities
4. Get directions or call directly

### Hospital Details
1. Click any hospital card from the main page
2. View comprehensive information
3. Call, get directions, or book an appointment
4. See operating hours and services

## Features in Detail

### Accessibility
- WCAG 2.1 compliant design
- High contrast colors
- Large tap targets for elderly users
- Readable fonts and clear hierarchy
- Keyboard navigation support

### Performance
- Lightweight vanilla JavaScript (no frameworks)
- Optimized images
- Fast load times (< 3 seconds)
- Efficient DOM manipulation

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface
- Adaptive layouts

## Future Enhancements

### Planned Features
- User authentication and profiles
- User ratings and reviews
- AI-powered hospital recommendations
- Real appointment booking system
- Integration with real healthcare APIs
- Push notifications for appointments
- Telemedicine integration
- Health records management

### Technical Improvements
- Integration with Google Maps API
- Real-time availability data
- Backend API development
- Database integration
- Progressive Web App (PWA) features
- Offline functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact: info@medapp.com

## Acknowledgments

- Design inspiration from modern healthcare platforms
- Icons by Font Awesome
- Images from Unsplash

---

**Note**: This is an MVP version. The map functionality uses placeholders and would require Google Maps API or similar service for production use. Hospital data is currently mock data stored in JavaScript - a real implementation would connect to healthcare provider APIs.
