import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { vendorLogin } from '../../redux/vendorSlice';

const VendorSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.vendor);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const result = await dispatch(vendorLogin(formData)).unwrap();
      console.log('Login successful:', result);
      
      // Redirect to dashboard after successful login
      navigate('/vendor-dashboard');
      
    } catch (error) {
      console.error('Login failed:', error);
      // Error is already handled by Redux and will be in the error state
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/vendor-register');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* Left Side - Image/Placeholder */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center p-8">
            <div className="w-full h-full bg-white/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">Vendor Portal</h2>
                <p className="text-gray-600 mt-2">Sign in to manage your business</p>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              {/* Heading */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                Vendor Sign In
              </h1>
              
              {/* Subheading */}
              <p className="text-gray-600 text-center mb-8">
                Access your vendor dashboard
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your registered email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:bg-gray-100"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:bg-gray-100"
                      required
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white border-2 border-gray-800 text-gray-800 font-semibold py-3.5 rounded-lg hover:bg-gray-50 transition-colors mb-6 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <a
                  href=""
                  onClick={handleSignUpClick}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Register as Vendor
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignIn;