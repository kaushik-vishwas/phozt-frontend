import React, { useState } from 'react';

const OtherVendors = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Select 1st Sub Service',
      selectedService: '',
      searchQuery: '',
      vendors: [
        { id: 1, name: 'Studd Decoration', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 2, name: 'Studio 19 Decoration', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 3, name: 'Studio varada Decoration', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 4, name: 'Buggy Decoration', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 5, name: 'Studio 16 Decoration', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 6, name: 'hari digital Decoration', description: 'Best Wedding photography services in bangalore.', selected: false }
      ]
    },
    {
      id: 2,
      title: 'Select 2nd Sub Service',
      selectedService: 'makeup',
      searchQuery: '',
      vendors: [
        { id: 1, name: 'Studio19 makeup', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 2, name: 'Studio vendors makeup', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 3, name: 'Studio19 makeup', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 4, name: 'Ruggy makeup', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 5, name: 'Studio 19 makeup', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 6, name: 'hari digital makeup', description: 'Best Wedding photography services in bangalore.', selected: false }
      ]
    },
    {
      id: 3,
      title: 'Select 3rd Sub Service',
      selectedService: 'Catering',
      searchQuery: '',
      vendors: [
        { id: 1, name: 'Studio Catering', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 2, name: 'Studio vendors Catering', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 3, name: 'Studio19 Catering', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 4, name: 'Ruggy Catering', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 5, name: 'Studio 19 Catering', description: 'Best Wedding photography services in bangalore.', selected: false },
        { id: 6, name: 'hari digital Catering', description: 'Best Wedding photography services in bangalore.', selected: false }
      ]
    }
  ]);

  const serviceOptions = [
    'Photography Decoration',
    'makeup',
    'Catering'
  ];

  const updateSection = (sectionId, field, value) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
  };

  const toggleVendor = (sectionId, vendorId) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            vendors: section.vendors.map(vendor =>
              vendor.id === vendorId ? { ...vendor, selected: !vendor.selected } : vendor
            )
          }
        : section
    ));
  };

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id} className="space-y-4">
          {/* Section Header */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-1">
              {section.title}
            </h3>
            <p className="text-sm text-black">
              Add upto 10 Internal Service vendors that shows in the page on our website
            </p>
          </div>

          {/* Service Selector and Dropdown */}
          <div className="flex gap-4">
            <div className="w-[400px]">
              <label className="block text-sm font-medium text-black mb-2">
                Decoration
              </label>
              <select
                value={section.selectedService}
                onChange={(e) => updateSection(section.id, 'selectedService', e.target.value)}
                className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
              >
                <option value="">Select service</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-2 opacity-0">
                Placeholder
              </label>
              <select
                className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
              >
                <option>Photography Decoration</option>
                <option>makeup</option>
                <option>Catering</option>
              </select>
            </div> */}
          </div>

          {/* Vendor Search */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Choose the Vendors from list of vendors
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search pages"
                value={section.searchQuery}
                onChange={(e) => updateSection(section.id, 'searchQuery', e.target.value)}
                className="w-[300px] px-4 py-2.5 pl-10 placeholder:text-black border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <svg
                className="w-4 h-4 text-black absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Vendor Cards Grid */}
          <div className="grid grid-cols-3 gap-4">
            {section.vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border border-black bg-white p-4 relative"
              >
                <h4 className="text-sm font-semibold text-black mb-1">
                  {vendor.name}
                </h4>
                <p className="text-xs text-black mb-3">
                  {vendor.description}
                </p>
                <button
                  onClick={() => toggleVendor(section.id, vendor.id)}
                  className="absolute bottom-4 right-4 w-6 h-6 flex items-center justify-center border border-black bg-white hover:bg-gray-50"
                >
                  {vendor.selected ? (
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-black text-lg">+</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherVendors;