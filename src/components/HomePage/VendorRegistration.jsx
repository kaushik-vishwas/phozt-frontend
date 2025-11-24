import React, { useState } from 'react';

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    mainBusiness: '',
    sideBusiness: '',
    location: ''
  });

  const mainBusinessOptions = [
    'Catering Services',
    'Photography',
    'Videography',
    'Decoration',
    'Venue',
    'Makeup Artist',
    'DJ & Music',
    'Event Planning'
  ];

  const sideBusinessOptions = [
    'None',
    'Catering',
    'Photography',
    'Decoration',
    'Other Services'
  ];

  const locationOptions = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad'
  ];

  const handleRegister = () => {
    console.log('Registration Data:', formData);
    // Handle registration logic here
  };

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Vendor registration
        </h2>
        
        {/* Form Container */}
        <div className="bg-gray-100 rounded-lg p-8">
          {/* Subheading */}
          <p className="text-gray-800 font-medium mb-6">
            Become a vendor in Phozt.com Multiple your business
          </p>
          
          {/* Form Fields */}
          <div className="flex flex-wrap gap-4 items-end">
            {/* Select Main Business */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={formData.mainBusiness}
                onChange={(e) => setFormData({...formData, mainBusiness: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[#B0B0B0] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select main Business</option>
                {mainBusinessOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Side Business */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={formData.sideBusiness}
                onChange={(e) => setFormData({...formData, sideBusiness: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[#B0B0B0] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Side Bussiness( if any)</option>
                {sideBusinessOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Select Location */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[#B0B0B0] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select Location</option>
                {locationOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Register Button */}
            <div className="flex-1 min-w-[200px]">
              <button
                onClick={handleRegister}
                className="w-full px-6 py-3 bg-[#949494] text-white font-medium rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;