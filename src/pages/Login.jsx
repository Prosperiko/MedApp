import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmergency = () => {
    alert('Emergency services: Call 911 immediately!');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call - Replace with your actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (formData.email && formData.password) {
        // Store user data in memory
        const userData = {
          email: formData.email,
          name: formData.email.split('@')[0],
          loggedIn: true
        };

        // In a real app, you'd call your authentication API here
        console.log('Login successful:', userData);
        
        // Navigate to home page (replace with your routing solution)
        window.location.href = '/';
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    alert('Google login will be implemented with OAuth');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    alert('Facebook login will be implemented with OAuth');
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
              <a href="#contact" className="text-gray-600 hover:text-blue-500 font-semibold">CONTACT US</a>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
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

      {/* Login Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <i className="fas fa-user-circle text-6xl text-blue-500 mb-4"></i>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Login to access your account</p>
              </div>

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
                    Forgot Password?
                  </a>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Logging in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt"></i> Login
                    </>
                  )}
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-semibold">OR</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-white border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-3 transition"
                >
                  <i className="fab fa-google text-red-500 text-lg"></i> Continue with Google
                </button>
                <button
                  onClick={handleFacebookLogin}
                  className="w-full py-3 bg-white border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-3 transition"
                >
                  <i className="fab fa-facebook-f text-blue-600 text-lg"></i> Continue with Facebook
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">
                    Sign Up
                  </a>
                </p>
              </div>
            </div>

            {/* Info Section */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <h2 className="text-3xl font-bold mb-6">Access Your Healthcare</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-2xl text-green-300 mt-1"></i>
                    <span className="text-lg">View your medical history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-2xl text-green-300 mt-1"></i>
                    <span className="text-lg">Book appointments easily</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-2xl text-green-300 mt-1"></i>
                    <span className="text-lg">Save favorite hospitals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-2xl text-green-300 mt-1"></i>
                    <span className="text-lg">Get personalized recommendations</span>
                  </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-blue-400">
                  <p className="text-sm text-blue-100">
                    Join thousands of users who trust our platform for their healthcare needs.
                  </p>
                </div>
              </div>
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

export default Login;