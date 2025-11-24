import React, { useState } from 'react';

const Seo = () => {
  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    focusedKeyword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Meta Title */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Meta Title
        </label>
        <input
          type="text"
          placeholder="Enter Meta Title"
          value={formData.metaTitle}
          onChange={(e) => handleInputChange('metaTitle', e.target.value)}
          className="w-[400px] px-4 py-2.5 placeholder:text-black border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <div className="text-xs text-black mt-1">
          {formData.metaTitle.length}/60 characters
        </div>
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Meta Description
        </label>
        <textarea
          placeholder="Enter Meta Description"
          value={formData.metaDescription}
          onChange={(e) => handleInputChange('metaDescription', e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
        />
        <div className="text-xs text-black mt-1">
          {formData.metaDescription.length}/160 characters
        </div>
      </div>

      {/* Focused Keyword */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Focused Keyword
        </label>
        <input
          type="text"
          placeholder="Enter Meta Description"
          value={formData.focusedKeyword}
          onChange={(e) => handleInputChange('focusedKeyword', e.target.value)}
          className="w-[400px] px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
      </div>
    </div>
  );
};

export default Seo;