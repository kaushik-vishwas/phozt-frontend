import React from 'react';

const PopularEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Wedding',
      description: 'Mark this unforgettable milestone make your Wedding celebration an intimate and trusted vendors',
      image: '/api/placeholder/280/200'
    },
    {
      id: 2,
      title: 'House warming',
      description: 'Begin the first day to the New Dwelling, create your housewarming with our vendors',
      image: '/api/placeholder/280/200'
    },
    {
      id: 3,
      title: 'Birthday',
      description: 'From sweet sixteen to grand eighties, make your baby\'s birthday with joy and trusted vendors.',
      image: '/api/placeholder/280/200'
    },
    {
      id: 4,
      title: 'Engagement',
      description: 'Mark the beginning of forever make your engagement unforgettable with our trusted vendors',
      image: '/api/placeholder/280/200'
    },
    {
      id: 5,
      title: 'Naming Ceremony(Namkaran)',
      description: 'Every name carries a blessing, create your baby\'s naming ceremony sacred and special with our trusted vendors',
      image: '/api/placeholder/280/200'
    },
    {
      id: 6,
      title: 'Baby Shower (seemantham)',
      description: 'embrace the joy of motherhood with a baby shower that honors rituals, elegance with our trusted vendors',
      image: '/api/placeholder/280/200'
    },
    {
      id: 7,
      title: 'Baby Welcoming',
      description: 'Every new baby is first delight with a beautiful welcome event from our trusted vendors with',
      image: '/api/placeholder/280/200'
    },
    {
      id: 8,
      title: 'Upcnayanam(ThreadCeremony)',
      description: 'A timeless rites to the new thread, celebrate your son\'s thread ceremony with our trusted vendors',
      image: '/api/placeholder/280/200'
    },
    {
      id: 9,
      title: 'Puberty Ceremony',
      description: 'Celebrate her graceful transition with blessings, make the puberty ceremony memorable with our trusted vendors',
      image: '/api/placeholder/280/200'
    }
  ];

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Popular Events
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularEvents;