import React from 'react';

const ViewAll = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Wedding Photography Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Wedding Photography</h2>
          
          {/* Grid Layout - 4 columns, 3 rows */}
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 - All single items */}
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            
            {/* Row 2 - Single, two stacked, single */}
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="aspect-[2/1] bg-gray-300 rounded-lg"></div>
              <div className="aspect-[2/1] bg-gray-300 rounded-lg"></div>
            </div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            
            {/* Row 3 - Single, single, two stacked, single */}
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="aspect-[2/1] bg-gray-300 rounded-lg"></div>
              <div className="aspect-[2/1] bg-gray-300 rounded-lg"></div>
            </div>
            <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
          </div>
        </section>

        {/* Video Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Video</h2>
          
          {/* Grid Layout - 3 columns, 2 rows */}
          <div className="grid grid-cols-3 gap-4">
            {/* Row 1 */}
            <div className="aspect-video bg-gray-300 rounded-lg"></div>
            <div className="aspect-video bg-gray-300 rounded-lg"></div>
            <div className="aspect-video bg-gray-300 rounded-lg"></div>
            
            {/* Row 2 */}
            <div className="aspect-video bg-gray-300 rounded-lg"></div>
            <div className="aspect-video bg-gray-300 rounded-lg"></div>
            <div className="aspect-video bg-gray-300 rounded-lg"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewAll;