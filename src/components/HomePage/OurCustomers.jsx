import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OurCustomers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "LOREM IPSUM",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
    },
    {
      id: 2,
      name: "JANE DOE",
      text: "Exceptional service and quality! The attention to detail exceeded all our expectations. Would highly recommend to anyone looking for professional results."
    },
    {
      id: 3,
      name: "JOHN SMITH",
      text: "Outstanding experience from start to finish. The team was responsive, professional, and delivered beyond what we imagined possible."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-left">
          Our Customers Loves us
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Testimonial Cards Container */}
          <div className="flex items-center justify-center gap-8 w-full px-16">
            {/* Left Card (Previous) */}
            <div className="hidden md:block w-1/4 opacity-40">
              <div className="bg-gray-200 rounded-lg p-6 h-48">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].text.substring(0, 100)}...
                </p>
              </div>
            </div>

            {/* Center Card (Active) - With Avatar */}
            <div className="w-full md:w-2/4 relative">
              {/* Avatar Circle */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-16 h-16 rounded-full bg-gray-400 border-4 border-white shadow-lg"></div>
              </div>

              <div className="bg-gray-300 rounded-lg p-8 pt-12 shadow-xl">
                <h3 className="text-center font-bold text-gray-900 text-lg mb-4">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-black w-8' : 'bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Card (Next) */}
            <div className="hidden md:block w-1/4 opacity-40">
              <div className="bg-gray-200 rounded-lg p-6 h-48">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {testimonials[(currentIndex + 1) % testimonials.length].text.substring(0, 100)}...
                </p>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurCustomers;