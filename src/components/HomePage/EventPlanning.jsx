import React from 'react';
import { Users, MapPin, UserCheck, Calendar } from 'lucide-react';

const EventPlanning = () => {
  const processes = [
    {
      id: 1,
      icon: Users,
      title: 'Introductory Meeting',
      description: 'We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event experience from start to finish'
    },
    {
      id: 2,
      icon: MapPin,
      title: 'Venue Selection',
      description: 'Leveraging our insider knowledge of venues, we offer a diverse selection tailored to your needs, ensuring your event is a resounding success'
    },
    {
      id: 3,
      icon: UserCheck,
      title: 'Vendor Coordination',
      description: 'We handle vendor management and all logistics directly, making the entire process smooth and stress-free so your event turns out perfectly every time'
    },
    {
      id: 4,
      icon: Calendar,
      title: 'Event day Coordination',
      description: 'We offer event day management to close communication gaps and handle any last-minute needs quickly, ensuring everything runs smoothly no matter what'
    }
  ];

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Our Seamless Process for Exceptional Engagement Event Planning
        </h2>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process) => {
            const IconComponent = process.icon;
            return (
              <div
                key={process.id}
                className="bg-white border border-black rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-gray-700" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {process.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventPlanning;