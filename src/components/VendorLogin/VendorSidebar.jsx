import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/phozt-logo.png";
import { MdLogout } from "react-icons/md";
import { logoutVendor } from "../../redux/vendorSlice"; // Import the logout action

const menuItems = [
  "DASHBOARD",
  "INFORMATION",
  "PORTFOLIO",
  "MEMBERSHIP PLAN",
];

export default function VendorSidebar({ collapsed = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("DASHBOARD");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Route mapping for menu items
  const routeMap = {
    "DASHBOARD": "/vendor-dashboard",
    "INFORMATION": "/vendor-info",
    "PORTFOLIO": "/vendor-portfolio",
    "MEMBERSHIP PLAN": "/vendor-dashboard",
  };

  // Handle logout
  const handleLogout = () => {
    // Dispatch logout action to clear Redux state
    dispatch(logoutVendor());
    
    // Clear localStorage
    localStorage.removeItem("vendorToken");
    
    // Close sidebar if open
    setSidebarOpen(false);
    
    // Redirect to signin page
    navigate("/vendor-login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r shadow-md h-screen transition-all duration-300 
          ${collapsed ? "w-16" : "w-64"}
          fixed z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          font-poppins
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Phozt Logo"
              className="w-8 h-8 object-contain"
            />
            {!collapsed && (
              <h1 className="font-medium text-gray-800 text-lg tracking-wide">
                PHOZT
              </h1>
            )}
          </div>
          {!collapsed && (
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="p-2 space-y-0.5 overflow-y-auto h-[calc(100vh-120px)]">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveItem(item);
                setSidebarOpen(false);
                if (routeMap[item]) navigate(routeMap[item]);
              }}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left transition-colors ${
                item === activeItem
                  ? "text-white font-medium"
                  : "text-gray-700 font-medium hover:text-white"
              }`}
              style={{
                backgroundColor: item === activeItem ? "#8A3FFC" : "transparent",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                if (item !== activeItem) {
                  e.currentTarget.style.backgroundColor = "#8A3FFC";
                  e.currentTarget.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                if (item !== activeItem) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#374151";
                }
              }}
            >
              {!collapsed && (
                <span className="text-xs tracking-wide">{item}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium hover:text-white px-4 py-3 rounded-md transition w-full group"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#8A3FFC";
              // Change text color to white on hover
              const textElement = e.currentTarget.querySelector('span');
              if (textElement) {
                textElement.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              // Revert text color to original on mouse leave
              const textElement = e.currentTarget.querySelector('span');
              if (textElement) {
                textElement.style.color = "#FF7752";
              }
            }}
          >
            <MdLogout 
              size={18} 
              className="group-hover:text-white transition-colors" 
              style={{ color: "#FF7752" }}
            />
            {!collapsed && (
              <span 
                className="text-xs tracking-wide transition-colors"
                style={{ color: "#FF7752" }}
              >
                LOG OUT
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}