import React, { useState, useEffect } from 'react';

const ServiceSeo = ({ seoData, onUpdate, disabled = false }) => {
  const [formData, setFormData] = useState({
    metaTitle: seoData?.metaTitle || '',
    metaDescription: seoData?.metaDescription || '',
    focusedKeyword: seoData?.focusedKeyword || ''
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

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
          placeholder="Enter Meta Title (max 60 characters)"
          value={formData.metaTitle}
          onChange={(e) => handleInputChange('metaTitle', e.target.value)}
          className="w-full px-4 py-2.5 placeholder:text-gray-400 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
          disabled={disabled}
        />
        <div className={`text-xs mt-1 ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-black'}`}>
          {formData.metaTitle.length}/60 characters
        </div>
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Meta Description
        </label>
        <textarea
          placeholder="Enter Meta Description (max 160 characters)"
          value={formData.metaDescription}
          onChange={(e) => handleInputChange('metaDescription', e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none disabled:opacity-50"
          disabled={disabled}
        />
        <div className={`text-xs mt-1 ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-black'}`}>
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
          placeholder="Enter main keyword for SEO"
          value={formData.focusedKeyword}
          onChange={(e) => handleInputChange('focusedKeyword', e.target.value)}
          className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
          disabled={disabled}
        />
        <div className="text-xs text-gray-500 mt-1">
          Primary keyword for search engine optimization
        </div>
      </div>
    </div>
  );
};

export default ServiceSeo;