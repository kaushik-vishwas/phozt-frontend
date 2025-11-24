import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/phozt-logo.png";
import { MdLogout } from "react-icons/md";
import { adminLogout } from "../redux/adminSlice"; // Import the logout action

const menuItems = [
  "LEADS MANAGEMENT",
  "PAGES",
  "VENDORS",
  "CITIES",
  "ARTICLES",
];

export default function Sidebar({ collapsed = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("LEADS MANAGEMENT");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Route mapping for menu items
  const routeMap = {
    "LEADS MANAGEMENT": "/",
    "PAGES": "/pages-management-dashboard",
    "VENDORS": "/vendor",
    "CITIES": "/city-management",
    "ARTICLES": "/articles",
  };

  const handleLogout = () => {
    // Dispatch admin logout action to clear Redux state
    dispatch(adminLogout());
    
    // Clear any additional localStorage items if needed
    localStorage.removeItem('adminToken');
    
    // Redirect to admin login page
    navigate('/');
    
    // Close sidebar on mobile
    setSidebarOpen(false);
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    setSidebarOpen(false);
    if (routeMap[item]) {
      navigate(routeMap[item]);
    }
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
              onClick={() => handleMenuItemClick(item)}
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
                }
              }}
              onMouseLeave={(e) => {
                if (item !== activeItem) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {!collapsed && (
                <span className="text-xs tracking-wide">{item}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium hover:text-white px-4 py-3 rounded-md transition w-full group"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#8A3FFC";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <MdLogout 
              size={18} 
              className="text-[#FF7752] group-hover:text-white transition-colors" 
            />
            {!collapsed && (
              <span className="text-xs tracking-wide text-[#FF7752] group-hover:text-white transition-colors">
                LOG OUT
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}