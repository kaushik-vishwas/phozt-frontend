import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyVendorOtp, sendVendorOtp } from "../../redux/vendorSlice";
import { useNavigate, useLocation } from "react-router-dom";

const VendorOtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.vendor);

  // Email from previous screen
  const email = location?.state?.email;

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      alert("Enter full 4-digit OTP");
      return;
    }

    dispatch(verifyVendorOtp({ email, otp: enteredOtp })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        navigate("/vendor-dashboard");
      }
    });
  };

  const handleResend = () => {
    dispatch(sendVendorOtp(email));
    alert("OTP sent again!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">

          {/* Left Section */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center p-8">
            <div className="w-full h-full bg-white/30 rounded-lg"></div>
          </div>

          {/* OTP Section */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                Grow Your Business with Phozt
              </h1>

              <p className="text-gray-600 text-center mb-8">
                Enter the 4-digit OTP sent to <span className="font-medium">{email}</span>
              </p>

              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              {/* OTP Inputs */}
              <div className="flex justify-between mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-gray-800 text-white font-semibold py-3.5 rounded-lg hover:bg-gray-700 transition-colors mb-6"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>

              {/* Resend */}
              <p className="text-center text-gray-600">
                Didn’t receive OTP?{" "}
                <button
                  onClick={handleResend}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Resend
                </button>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOtpVerify;
