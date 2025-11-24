import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const MainSection = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const events = [
    'Wedding',
    'Birthday Party',
    'Corporate Event',
    'Anniversary',
    'Engagement',
    'Conference',
    'Baby Shower',
    'Other'
  ];

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Celebrate Moments, Create Memories!!
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-black mb-12 max-w-3xl mx-auto">
          start planning Your Event of your dreams with confidence with Our trusted Vendors
        </p>

        {/* Search Form */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-3xl mx-auto">
          {/* Event Dropdown */}
          <div className="relative w-full md:w-64">
            <button
              onClick={() => {
                setIsEventOpen(!isEventOpen);
                setIsLocationOpen(false);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-500 hover:border-gray-400 transition-colors flex items-center justify-between shadow-sm"
            >
              <span className={selectedEvent || 'text-gray-400'}>
                {selectedEvent || 'Select Event'}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            
            {isEventOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                {events.map((event) => (
                  <button
                    key={event}
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEventOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    {event}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="relative w-full md:w-64">
            <button
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsEventOpen(false);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-500 hover:border-gray-400 transition-colors flex items-center justify-between shadow-sm"
            >
              <span className={selectedLocation || 'text-gray-400'}>
                {selectedLocation || 'Select Location'}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            
            {isLocationOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="w-full md:w-48 bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;