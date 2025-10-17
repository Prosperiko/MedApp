import React, { useState, useEffect } from 'react';

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hospitals, setHospitals] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    distance: '',
    keyword: ''
  });

  // Sample hospital data
  const hospitalData = [
    {
      id: 1,
      name: 'Calvary Hospital',
      category: 'cardiac',
      specialty: 'Cardiology',
      location: 'New York',
      rating: 4.5,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      name: 'City Medical Center',
      category: 'hospital',
      specialty: 'General Medicine',
      location: 'Manhattan',
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      name: 'Heart Care Clinic',
      category: 'cardiology',
      specialty: 'Cardiology',
      location: 'Brooklyn',
      rating: 4.6,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      name: 'HealthPlus Pharmacy',
      category: 'pharmacy',
      specialty: 'Pharmacy',
      location: 'Queens',
      rating: 4.3,
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  useEffect(() => {
    // Load hospitals on mount
    setHospitals(hospitalData);
    
    // Check if user is logged in (from localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleEmergency = () => {
    alert('Emergency services: Call 911 immediately!');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const searchHospitals = () => {
    let filtered = hospitalData;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(h => h.category === activeFilter);
    }

    if (filters.location) {
      filtered = filtered.filter(h => 
        h.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.specialty) {
      filtered = filtered.filter(h => 
        h.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
      );
    }

    if (filters.keyword) {
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    setHospitals(filtered);
  };

  const handleFilterTag = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setHospitals(hospitalData);
    } else {
      setHospitals(hospitalData.filter(h => h.category === filter));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <i className="fas fa-heartbeat text-4xl text-blue-500"></i>
              <div className="leading-tight">
                <h1 className="text-xl font-bold text-gray-800">MEDICAL</h1>
                <p className="text-xs text-gray-600">DIRECTORY</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-blue-500 font-semibold border-b-2 border-blue-500 pb-1">HOME</a>
              <a href="/hospitals" className="text-gray-600 hover:text-blue-500 font-semibold">HOSPITALS</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-500 font-semibold">CONTACT US</a>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <button 
                    onClick={() => window.location.href = '/auth'}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-user"></i> LOGIN
                  </button>
                  <button 
                    onClick={handleEmergency}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-ambulance"></i> EMERGENCY
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleEmergency}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-ambulance"></i> EMERGENCY
                  </button>
                  <div className="relative">
                    <div 
                      onClick={toggleProfileMenu}
                      className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-blue-500"
                    >
                      <img 
                        src="https://ui-avatars.com/api/?name=John+Doe&background=00a8e8&color=fff" 
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                        <a href="/my-account" className="block px-4 py-2 hover:bg-gray-100">
                          <i className="fas fa-user mr-2"></i> My Account
                        </a>
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); logout(); }}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Map */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-5xl font-bold">Hospital</h2>
        </div>
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <i className="fas fa-map-marked-alt text-6xl mb-4"></i>
              <p className="text-xl">Map will load here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Location"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="specialty"
              value={filters.specialty}
              onChange={handleFilterChange}
              placeholder="Any specialty"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="distance"
              value={filters.distance}
              onChange={handleFilterChange}
              placeholder="Distance"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Keyword"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={searchHospitals}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <i className="fas fa-search"></i> SEARCH
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterTag('all')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                activeFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              SHOW ALL
            </button>
            <button
              onClick={() => handleFilterTag('cardiac')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                activeFilter === 'cardiac' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              CARDIAC CENTER
            </button>
            <button
              onClick={() => handleFilterTag('cardiology')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                activeFilter === 'cardiology' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              CARDIOLOGY
            </button>
            <button
              onClick={() => handleFilterTag('hospital')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                activeFilter === 'hospital' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              HOSPITAL
            </button>
            <button
              onClick={() => handleFilterTag('pharmacy')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                activeFilter === 'pharmacy' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              PHARMACY
            </button>
          </div>
        </div>
      </section>

      {/* Hospital Cards Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hospitals.map(hospital => (
              <div key={hospital.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img 
                  src={hospital.image} 
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{hospital.specialty}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {hospital.location}
                    </span>
                    <span className="text-yellow-500">
                      <i className="fas fa-star"></i> {hospital.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hospitals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hospitals found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-heartbeat text-3xl text-blue-400"></i>
                <div className="leading-tight">
                  <h3 className="text-lg font-bold">MEDICAL</h3>
                  <p className="text-xs text-gray-400">DIRECTORY</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><i className="fas fa-map-marker-alt mr-2"></i> 3481 Fifth Avenue, New York</p>
                <p><i className="fas fa-phone mr-2"></i> +1 (0) 000 0000 001</p>
                <p><i className="fas fa-phone mr-2"></i> +44 (0)20 7123 4567</p>
                <p><i className="fas fa-envelope mr-2"></i> info@example.com</p>
              </div>
            </div>

            {/* Latest Hospital */}
            <div>
              <h4 className="text-lg font-bold mb-4">LATEST HOSPITAL</h4>
              <div className="flex gap-3">
                <img 
                  src="https://via.placeholder.com/50" 
                  alt="Hospital"
                  className="w-12 h-12 rounded"
                />
                <div>
                  <h5 className="font-semibold">Calvary Hospital</h5>
                  <p className="text-sm text-gray-400">Cardiology</p>
                </div>
              </div>
            </div>

            {/* Recently Joined */}
            <div>
              <h4 className="text-lg font-bold mb-4">RECENTLY JOINED</h4>
              <div className="flex gap-3">
                <img 
                  src="https://via.placeholder.com/50" 
                  alt="Doctor"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h5 className="font-semibold">Dr. Magdy Sharek</h5>
                  <p className="text-sm text-gray-400">Joined Dec 12, 2015</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-4">NEWSLETTER</h4>
              <p className="text-sm text-gray-400 mb-4">
                Sign up to our newsletter to receive our latest news and updates. We do not spam.
              </p>
              <input
                type="email"
                placeholder="info@example.com"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; Copyright 2024 Medical Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;