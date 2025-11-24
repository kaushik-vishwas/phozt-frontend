import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageCircle, Share2, Camera, Video, Image, Users } from 'lucide-react';

const FinestPhotographers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photographers = [
    {
      id: 1,
      name: 'United wedding photography',
      description: 'Pre-Wedding Consultation | All-day or half-day documentation of the ceremony, candid moments, and formal portraits, often with multiple photographers to ensure nothing is missed.',
      eventLocation: 'Home To partyhall',
      pricing: '5k - 50k( custom)',
      area: 'All over Bengaluru',
      rating: 4.3,
      services: [
        { icon: Camera, text: 'Candid photo and cinematography' },
        { icon: Users, text: 'Drone services' },
        { icon: Video, text: 'Traditional photo and video' },
        { icon: Image, text: 'Editing and Album Design' }
      ]
    },
    {
      id: 2,
      name: 'United wedding photography',
      description: 'Pre-Wedding Consultation | All-day or half-day documentation of the ceremony, candid moments, and formal portraits, often with multiple photographers to ensure nothing is missed.',
      eventLocation: 'Home To partyhall',
      pricing: '5k - 50k( custom)',
      area: 'All over Bengaluru',
      rating: 4.3,
      services: [
        { icon: Camera, text: 'Candid photo and cinematography' },
        { icon: Users, text: 'Drone services' },
        { icon: Video, text: 'Traditional photo and video' },
        { icon: Image, text: 'Editing and Album Design' }
      ]
    },
    {
      id: 3,
      name: 'United wedding photography',
      description: 'Pre-Wedding Consultation | All-day or half-day documentation of the ceremony, candid moments, and formal portraits, often with multiple photographers to ensure nothing is missed.',
      eventLocation: 'Home To partyhall',
      pricing: '5k - 50k( custom)',
      area: 'All over Bengaluru',
      rating: 4.3,
      services: [
        { icon: Camera, text: 'Candid photo and cinematography' },
        { icon: Users, text: 'Drone services' },
        { icon: Video, text: 'Traditional photo and video' },
        { icon: Image, text: 'Editing and Album Design' }
      ]
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photographers.length - 2 ? prev + 1 : prev));
  };

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Finest Photographers
        </h2>

        {/* Cards Container */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {photographers.slice(currentIndex, currentIndex + 2).map((photographer) => (
              <div
                key={photographer.id}
                className="border border-gray-300 rounded-lg overflow-hidden bg-white"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {photographer.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {photographer.description}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-4 border-b border-gray-200">
                  <div className="p-4 border-r border-gray-200">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Event location</div>
                    <div className="text-sm text-gray-800">{photographer.eventLocation}</div>
                  </div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Pricing</div>
                    <div className="text-sm text-gray-800">{photographer.pricing}</div>
                  </div>
                  <div className="p-4 border-r border-gray-200">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Area</div>
                    <div className="text-sm text-gray-800">{photographer.area}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Rating</div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-800">{photographer.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <div className="flex gap-4">
                    {/* Image Carousel */}
                    <div className="w-64 h-48 bg-gray-100 rounded flex items-center justify-center relative flex-shrink-0">
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="text-gray-400">Image Gallery</div>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50"
                        onClick={handleNext}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Services Grid */}
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      {photographer.services.map((service, idx) => {
                        const ServiceIcon = service.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-3 border border-gray-200 rounded"
                          >
                            <ServiceIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{service.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-white border border-gray-800 text-gray-800 py-2.5 px-4 rounded font-medium hover:bg-gray-50 transition-colors">
                      Request pricing
                    </button>
                    <button className="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinestPhotographers;