import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerVendor, sendVendorOtp } from "../../redux/vendorSlice";

const VendorSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((s) => s.vendor);

  const [formData, setFormData] = useState({
    businessName: "",
    city: "",
    vendorType: "",
    mobileNumber: "",
    emailAddress: "",
    password: "",
  });

  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isVendorTypeOpen, setIsVendorTypeOpen] = useState(false);

  const cities = [
    "Bengaluru",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
  ];

  const vendorTypes = ["Photography", "Decoration", "Makeup", "Catering"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCitySelect = (city) => {
    setFormData((prev) => ({ ...prev, city }));
    setIsCityOpen(false);
  };

  const handleVendorTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, vendorType: type }));
    setIsVendorTypeOpen(false);
  };

const handleSubmit = () => {
  const dataToSend = {
    businessName: formData.businessName,
    city: formData.city,
    vendorType: formData.vendorType,
    mobile: formData.mobileNumber,       // ✅ FIXED
    email: formData.emailAddress,        // ✅ FIXED
    password: formData.password
  };

  dispatch(registerVendor(dataToSend)).then((res) => {
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(sendVendorOtp(formData.emailAddress));
      navigate("/vendor-verify", { state: { email: formData.emailAddress } });
    }
  });
};


  const handleSignInClick = () => {
    navigate("/vendor-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px]">

          {/* Left Side */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center p-8">
            <div className="w-full h-full bg-white/30 rounded-lg"></div>
          </div>

          {/* Right Form */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                Grow Your Business with Phozt
              </h1>

              <p className="text-gray-600 text-center mb-8">
                Sign up to access your dashboard
              </p>

              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              <div className="space-y-5">

                {/* Business Name */}
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name*"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2.5 border-b border-gray-300 focus:border-gray-800"
                />

                {/* City Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCityOpen(!isCityOpen);
                      setIsVendorTypeOpen(false);
                    }}
                    className="w-full py-2.5 border-b border-gray-300 text-left flex items-center justify-between"
                  >
                    <span className={formData.city ? "text-gray-700" : "text-gray-500"}>
                      {formData.city || "Select Your City*"}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>

                  {isCityOpen && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                      {cities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vendor Type Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVendorTypeOpen(!isVendorTypeOpen);
                      setIsCityOpen(false);
                    }}
                    className="w-full py-2.5 border-b border-gray-300 text-left flex items-center justify-between"
                  >
                    <span
                      className={
                        formData.vendorType ? "text-gray-700" : "text-gray-500"
                      }
                    >
                      {formData.vendorType || "Select Vendor Type*"}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>

                  {isVendorTypeOpen && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                      {vendorTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleVendorTypeSelect(type)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Number */}
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number*"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2.5 border-b border-gray-300 focus:border-gray-800"
                />

                {/* Email */}
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address*"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2.5 border-b border-gray-300 focus:border-gray-800"
                />

                {/* Password */}
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password*"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2.5 border-b border-gray-300 focus:border-gray-800"
                />

                {/* Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gray-800 text-white font-semibold py-3.5 rounded-lg hover:bg-gray-700 mt-6"
                >
                  {loading ? "Processing..." : "Continue"}
                </button>

                {/* Sign In */}
                <p className="text-center text-gray-600 mt-4">
                  Already a Vendor?{" "}
                  <button onClick={handleSignInClick} className="text-blue-600">
                    Sign in
                  </button>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp;
