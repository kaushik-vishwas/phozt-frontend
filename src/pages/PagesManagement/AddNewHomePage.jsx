import React, { useState } from 'react';
import Content from '../../components/Page HomePage/Content';
import Seo from '../../components/Page HomePage/Seo';
import Blocks from '../../components/Page HomePage/Blocks';
import InternalLinks from '../../components/Page HomePage/InternalLinks';
import OtherVendors from '../../components/Page HomePage/OtherVendors';
// import AddNewCard from '../../components/Page HomePage/AddNewCard';

const AddNewHomePage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('Basic Info');
  const [formData, setFormData] = useState({
    pageTitle: '',
    slugUrl: '',
    descriptionForH1: '',
    pageType: '',
    parentPage: '',
    status: 'Published'
  });

  const tabs = [
    'Basic Info',
    'Content',
    'SEO',
    'Blocks',
    'Internal Links',
    'Other Vendors',
    'Top Searches'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Proper cancel handler that closes modal
  const handleCancel = () => {
    if (onClose) onClose();
  };

  const handleContinue = () => {
    console.log('Form data:', formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal container */}
      <div
        className="bg-white  shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-black">
            Add New Page
          </h2>
        </div>

        {/* Tabs: always visible (not scrollable, no overflow-x) */}
        <div className="border-b bg-white">
          <div className="flex px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium ${activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-black hover:text-black'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'Basic Info' && (
            <div className="space-y-6">
              {/* Page Title */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    Page Title ( H1 ) <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter page title"
                    value={formData.pageTitle}
                    onChange={(e) => handleInputChange('pageTitle', e.target.value)}
                    className="w-full px-4 py-2.5 border border-black focus:outline-none placeholder:text-black focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <div className="text-right text-xs text-black mt-1">19/100</div>
                </div>

                <div className="w-64">
                  <label className="block text-sm font-medium text-black mb-2">
                    Page Type
                  </label>
                  <select
                    value={formData.pageType}
                    onChange={(e) => handleInputChange('pageType', e.target.value)}
                    className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                  >
                    <option value="">Select page type</option>
                    <option value="home">Home Page</option>
                    <option value="service">Service Page</option>
                    <option value="city">City Page</option>
                  </select>
                </div>
              </div>

              {/* Slug/URL */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    Slug / URL
                  </label>
                  <input
                    type="text"
                    placeholder="/best-photographer-marathalli"
                    value={formData.slugUrl}
                    onChange={(e) => handleInputChange('slugUrl', e.target.value)}
                    className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                <div className="w-64">
                  <label className="block text-sm font-medium text-black mb-2">
                    Parent Page (optional)
                  </label>
                  <select
                    value={formData.parentPage}
                    onChange={(e) => handleInputChange('parentPage', e.target.value)}
                    className="w-full px-4 py-2.5 border border-black  focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                  >
                    <option value=""></option>
                    <option value="parent1">Parent Page 1</option>
                    <option value="parent2">Parent Page 2</option>
                  </select>
                </div>
              </div>

              {/* Description For H1 */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Description For H1
                </label>
                <textarea
                  value={formData.descriptionForH1}
                  onChange={(e) => handleInputChange('descriptionForH1', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                />
                <div className="text-right text-xs text-gray-500 mt-1">1/300</div>
              </div>

              {/* Status */}
              <div className="flex items-center  gap-4 w-full">
                <label className="block text-sm font-medium text-black">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-96 px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>
          )}
          {activeTab === 'Content' ? (
            <Content />
          ) : activeTab === 'SEO' ? (
            <Seo />
          ) : activeTab === 'Blocks' ? (
            <Blocks />
          ) : activeTab === 'Internal Links' ? (
            <InternalLinks />
          ) : activeTab === 'Other Vendors' ? (
            <OtherVendors />

          ) : activeTab !== 'Basic Info' && (
            <div className="flex items-center justify-center h-64 text-gray-500">
              {activeTab} content will appear here
            </div>
          )}


        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 border border-black font-medium text-black hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="px-6 py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm flex items-center gap-2"
          >
            Continue
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewHomePage;
