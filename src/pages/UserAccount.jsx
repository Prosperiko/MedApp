import React, { useState } from 'react';

const UserAccount = () => {
  const [userData] = useState({
    name: 'John Doe',
    accountType: 'Patient Account',
    memberSince: 'January 2024',
    avatar: 'https://via.placeholder.com/80',
    stats: {
      appointments: 12,
      favoriteHospitals: 3,
      medicalRecords: 8
    },
    recentActivity: [
      {
        id: 1,
        type: 'appointment',
        icon: 'fas fa-calendar-plus',
        title: 'Appointment booked',
        description: 'Calvary Hospital - Dr. Smith',
        time: '2 days ago'
      },
      {
        id: 2,
        type: 'review',
        icon: 'fas fa-star',
        title: 'Review submitted',
        description: 'Mount Sinai Hospital - 5 stars',
        time: '1 week ago'
      }
    ]
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear any stored user data (in memory, not localStorage)
      console.log('User logged out');
      // Redirect to home page
      window.location.href = '/';
    }
  };

  const handleEmergency = () => {
    window.location.href = '/emergency';
  };

  const handleEditProfile = () => {
    alert('Edit profile feature coming soon!');
  };

  const handleFindHospitals = () => {
    window.location.href = '/';
  };

  const handleBookAppointment = () => {
    alert('Booking feature coming soon!');
  };

  const handleViewRecords = () => {
    alert('Medical records feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
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
              <a href="/" className="text-gray-600 hover:text-blue-500 font-semibold">HOME</a>
              <a href="/hospitals" className="text-gray-600 hover:text-blue-500 font-semibold">HOSPITALS</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-500 font-semibold">CONTACT US</a>
              <a href="/my-account" className="text-blue-500 font-semibold border-b-2 border-blue-500 pb-1">MY ACCOUNT</a>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i> LOGOUT
              </button>
              <button 
                onClick={handleEmergency}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
              >
                <i className="fas fa-ambulance"></i> EMERGENCY
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Account Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Account Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={userData.avatar} 
                alt="User" 
                className="w-20 h-20 rounded-full border-4 border-blue-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-600">{userData.accountType}</p>
                <span className="text-sm text-gray-500">Member since {userData.memberSince}</span>
              </div>
            </div>
            <button 
              onClick={handleEditProfile}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <i className="fas fa-calendar-check text-3xl text-blue-500 mb-2"></i>
                  <h3 className="text-2xl font-bold text-gray-800">{userData.stats.appointments}</h3>
                  <p className="text-sm text-gray-600">Appointments</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <i className="fas fa-heart text-3xl text-red-500 mb-2"></i>
                  <h3 className="text-2xl font-bold text-gray-800">{userData.stats.favoriteHospitals}</h3>
                  <p className="text-sm text-gray-600">Favorite Hospitals</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <i className="fas fa-file-medical text-3xl text-green-500 mb-2"></i>
                  <h3 className="text-2xl font-bold text-gray-800">{userData.stats.medicalRecords}</h3>
                  <p className="text-sm text-gray-600">Medical Records</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {userData.recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <i className={`${activity.icon} text-2xl text-blue-500 mt-1`}></i>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.title}</p>
                      <span className="text-gray-600 text-sm">{activity.description}</span>
                      <small className="block text-gray-500 text-xs mt-1">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
              <i className="fas fa-search text-5xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Find Hospitals</h3>
              <p className="text-gray-600 mb-4">Search for hospitals and clinics near you</p>
              <button 
                onClick={handleFindHospitals}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
              >
                Search Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
              <i className="fas fa-calendar-alt text-5xl text-green-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Book Appointment</h3>
              <p className="text-gray-600 mb-4">Schedule your next medical appointment</p>
              <button 
                onClick={handleBookAppointment}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
              >
                Book Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
              <i className="fas fa-file-medical-alt text-5xl text-purple-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Medical Records</h3>
              <p className="text-gray-600 mb-4">View and manage your health records</p>
              <button 
                onClick={handleViewRecords}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold"
              >
                View Records
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
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

export default UserAccount;