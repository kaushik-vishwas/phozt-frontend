import React from 'react';
import { Image } from 'lucide-react';

const HelpUs = () => {
  return (
    <div className="w-full bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-start">
          Help us personalize your experience
        </h2>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Image Placeholder */}
            <div className="flex-shrink-0 w-full md:w-80 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Image className="w-24 h-24 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
                <div className="w-32 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Wise Choice with vendors
              </h3>
              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Our Team will call you to understand your requirements to find suitable vendors
              </p>
              
              {/* Button Placeholder */}
              <div className="w-40 h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpUs;