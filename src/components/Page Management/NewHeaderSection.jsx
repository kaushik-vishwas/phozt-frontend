import React, { useState } from 'react';

const NewHeaderSection = ({ onClose }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionInfo, setSectionInfo] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleCancel = () => {
    setSectionTitle('');
    setSectionInfo('');
    setIsActive(true);
    onClose();
  };

  const handleAddSection = () => {
    if (sectionTitle && sectionInfo) {
      console.log({
        title: sectionTitle,
        info: sectionInfo,
        active: isActive
      });
      handleCancel();
    }
  };

  return (
    <div className="bg-gray-50 shadow-xl w-full">
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h2 className="text-[32px] font-medium text-gray-900">
          Add New Header Section
        </h2>
        {/* <button
          className="text-black font-bold text-xl hover:text-gray-700"
          onClick={handleCancel}
        >
          ×
        </button> */}
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Section Title */}
        <div>
          <label className="block text-[22px] font-medium text-gray-900 mb-2">
            Section Title
          </label>
          <input
            type="text"
            placeholder="Eg: photography"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="w-full px-4 py-3 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Section Info */}
        <div>
          <label className="block text-[22px] font-medium text-gray-900 mb-2">
            Section info
          </label>
          <input
            type="text"
            placeholder="Eg: professional photography services"
            value={sectionInfo}
            onChange={(e) => setSectionInfo(e.target.value)}
            className="w-full px-4 py-3 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Active/Inactive Toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsActive(true)}
            className={`px-6 py-2 font-medium transition-colors ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-black hover:bg-gray-50'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setIsActive(false)}
            className={`px-6 py-2 font-medium transition-colors ${
              !isActive
                ? 'bg-gray-900 text-white'
                : 'bg-white text-black border border-black hover:bg-gray-50'
            }`}
          >
            IN-Active
          </button>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t px-6 py-4 flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="px-6 py-2 border border-black font-medium text-black hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAddSection}
          className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
        >
          Add section
        </button>
      </div>
    </div>
  );
};

export default NewHeaderSection;