import React from 'react';
import { Instagram, Facebook, Linkedin, Twitter, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t-2 border-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Know us Section */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Know us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Contact US
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Privacy policy
                </a>
              </li>
            </ul>
            
            {/* Disclaimer */}
            <div className="mt-6">
              <a href="#" className="text-black hover:text-gray-900 transition-colors">
                Disclaimer
              </a>
            </div>
          </div>

          {/* Our Services Section */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Photography Services
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Decoration Services
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Makeup artist services
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-900 transition-colors">
                  Catering Services
                </a>
              </li>
            </ul>
          </div>

          {/* For Professionals Section */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">For Professionals</h3>
          </div>

          {/* Stay Connected Section */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Stay Connected</h3>
            
            {/* Phone Number */}
            <div className="flex items-center gap-2 mb-4">
              <Phone size={16} className="text-black" />
              <a href="tel:+919148721299" className="text-black hover:text-gray-900 transition-colors">
                +91-9148721299
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-black hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-black hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="#" 
                className="text-black hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-black hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;