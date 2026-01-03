// frontend/components/Page HomePage/AddServiceVendorCard.jsx
import React, { useState, useEffect, useRef } from "react";

const AddServiceVendorCard = ({ onAdd, onClose, editMode = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    studioName: "",
    studioDescription: "",
    eventLocation: "",
    rating: "",
    pricing: "",
    area: "",
    services: ["", "", "", ""],
    portfolioImages: [], // Store File objects
    portfolioPreviews: [] // Store blob URLs for preview only
  });

  const fileInputRefs = useRef([]);

  // Initialize form with initialData when in edit mode
  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        studioName: initialData.studioName || "",
        studioDescription: initialData.studioDescription || "",
        eventLocation: initialData.eventLocation || "",
        rating: initialData.rating || "",
        pricing: initialData.pricing || "",
        area: initialData.area || "",
        services: initialData.services || ["", "", "", ""],
        portfolioImages: [], // Don't store File objects from initial data
        portfolioPreviews: initialData.portfolioImages || [] // Store URLs for preview
      });
    }
  }, [editMode, initialData]);

  const handleSubmit = () => {
    // Format the data to match the new schema
    const cardData = {
      studioName: formData.studioName || "Unnamed Studio",
      studioDescription: formData.studioDescription || "No description provided",
      eventLocation: formData.eventLocation || "",
      rating: formData.rating || "",
      pricing: formData.pricing || "",
      area: formData.area || "",
      services: formData.services.filter(s => s.trim()),
      portfolioImages: formData.portfolioImages, // Send File objects
      portfolioPreviews: formData.portfolioPreviews, // Keep previews for UI
      selected: false
    };
    
    if (onAdd) {
      onAdd(cardData);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData({
      ...formData,
      services: newServices,
    });
  };

  const handlePortfolioImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    
    const newPortfolioImages = [...formData.portfolioImages];
    const newPortfolioPreviews = [...formData.portfolioPreviews];
    
    // Store the actual File object
    newPortfolioImages[index] = file;
    // Store preview URL for display
    newPortfolioPreviews[index] = previewUrl;
    
    setFormData({
      ...formData,
      portfolioImages: newPortfolioImages,
      portfolioPreviews: newPortfolioPreviews
    });
  };

  const removePortfolioImage = (index) => {
    const newPortfolioImages = [...formData.portfolioImages];
    const newPortfolioPreviews = [...formData.portfolioPreviews];
    
    // Revoke blob URL to prevent memory leaks
    if (newPortfolioPreviews[index]) {
      URL.revokeObjectURL(newPortfolioPreviews[index]);
    }
    
    newPortfolioImages.splice(index, 1);
    newPortfolioPreviews.splice(index, 1);
    
    setFormData({
      ...formData,
      portfolioImages: newPortfolioImages,
      portfolioPreviews: newPortfolioPreviews
    });
    
    // Clear file input
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = '';
    }
  };

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      formData.portfolioPreviews.forEach(preview => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [formData.portfolioPreviews]);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded-md shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-6 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">
            {editMode ? "Edit Vendor" : "Add New Service Vendor"}
          </h2>
          <button 
            onClick={onClose}
            className="text-xl font-semibold hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Section Title */}
        <h3 className="text-base font-semibold mb-4 border-b pb-2">
          {editMode ? "Edit Vendor" : "Add a New Vendor"}
        </h3>

        {/* Form */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Studio Name *</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter studio name"
                value={formData.studioName}
                onChange={(e) => handleChange("studioName", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Studio Description</label>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm h-24"
                placeholder="Enter studio description"
                value={formData.studioDescription}
                onChange={(e) => handleChange("studioDescription", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Event Location (L1)
              </label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter event location"
                value={formData.eventLocation}
                onChange={(e) => handleChange("eventLocation", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Rating (L2)</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter rating (e.g., 4.6)"
                value={formData.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Pricing (I3)</label>
              <select 
                className="w-full border rounded px-3 py-2 text-sm"
                value={formData.pricing}
                onChange={(e) => handleChange("pricing", e.target.value)}
              >
                <option value="">Select pricing range</option>
                <option>0-3k</option>
                <option>3k-6k</option>
                <option>6k-10k</option>
                <option>10k-25k</option>
                <option>25k-50k</option>
                <option>50k above</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Area (I4)</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter service area"
                value={formData.area}
                onChange={(e) => handleChange("area", e.target.value)}
              />
            </div>

            {/* Services */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Services
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Candid photography",
                  "Drone services",
                  "Traditional photo and video",
                  "Editing and Album Design",
                ].map((placeholder, index) => (
                  <div key={index} className="space-y-1">
                    <input
                      className="w-full border rounded px-3 py-2 text-sm"
                      placeholder={placeholder}
                      value={formData.services[index] || ""}
                      onChange={(e) => handleServiceChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Images */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Portfolio Images (Max 5)
              </label>
              <div className="flex gap-3 flex-wrap">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative">
                    <label className="w-16 h-16 border rounded flex items-center justify-center text-gray-400 text-sm cursor-pointer hover:bg-gray-50">
                      {formData.portfolioPreviews[i] ? (
                        <>
                          <img 
                            src={formData.portfolioPreviews[i]} 
                            alt={`Portfolio ${i+1}`}
                            className="w-full h-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePortfolioImage(i);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <span>+</span>
                      )}
                      <input
                        ref={el => fileInputRefs.current[i] = el}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePortfolioImageUpload(e, i)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="border rounded px-5 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-black text-white rounded px-5 py-2 text-sm hover:bg-gray-800"
          >
            {editMode ? "Update Vendor" : "Add Vendor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceVendorCard;