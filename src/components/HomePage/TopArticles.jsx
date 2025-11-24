import React from 'react';

const TopArticles = () => {
  const articles = [
    {
      id: 1,
      title: 'Best Photographers in all over India',
      description: 'We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Best Photographers in all over India',
      description: 'We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Best Photographers in all over India',
      description: 'We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event',
      image: '/api/placeholder/400/250'
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Top Articles
        </h2>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border-2 border-black overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="w-full h-48 bg-white border-b-2 border-gray-800">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopArticles;