import React from "react";

const TopArticles = () => {
  const articles = [
    {
      title: "Best Photographers in all over india",
      desc: "We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event experience",
    },
    {
      title: "Best Photographers in all over india",
      desc: "We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event experience",
    },
    {
      title: "Best Photographers in all over india",
      desc: "We consult clients to understand their style and needs, ensuring a perfectly tailored, memorable, and seamless event experience",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-8">Top Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            {/* Image placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              Image
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopArticles;
