import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      label: 'Photography',
      hasDropdown: true,
      subItems: ['Wedding Photography', 'Event Photography', 'Portrait Photography', 'Product Photography']
    },
    {
      label: 'Decoration',
      hasDropdown: true,
      subItems: ['Wedding Decoration', 'Birthday Decoration', 'Corporate Events', 'Custom Themes']
    },
    {
      label: 'Makeup',
      hasDropdown: true,
      subItems: ['Bridal Makeup', 'Party Makeup', 'Professional Makeup', 'Hair Styling']
    },
    {
      label: 'Catering',
      hasDropdown: true,
      subItems: ['Wedding Catering', 'Corporate Catering', 'Party Catering', 'Custom Menu']
    }
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Company Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">
              PHOZT
            </h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-black  font-medium transition-colors py-2">
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown size={16} className="text-gray-600" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Login Button */}
          <div className="flex-shrink-0">
            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors">
              Log In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Hidden by default */}
        <div className="md:hidden pb-4 hidden">
          {navItems.map((item, index) => (
            <div key={index} className="py-2">
              <button className="w-full text-left text-gray-700 font-medium py-2">
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;