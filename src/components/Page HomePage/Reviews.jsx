import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Reviews = ({ reviewsData, onUpdate, disabled }) => {
  const [showAddForm, setShowAddForm] = useState(false); // Control form visibility
  const [activeForm, setActiveForm] = useState('add'); // 'add' or 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    reviewerName: '',
    reviewerContent: '',
    rating: 5,
    pageLocation: 'home',
    display: true
  });

  const [errors, setErrors] = useState({
    reviewerName: '',
    reviewerContent: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reviewerName.trim()) {
      newErrors.reviewerName = 'Reviewer name is required';
    }
    
    if (!formData.reviewerContent.trim()) {
      newErrors.reviewerContent = 'Review content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'reviewerName' && value.trim()) {
      setErrors(prev => ({ ...prev, reviewerName: '' }));
    }
    if (field === 'reviewerContent' && value.trim()) {
      setErrors(prev => ({ ...prev, reviewerContent: '' }));
    }
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleAddReview = () => {
    if (!validateForm()) {
      return;
    }

    const newReview = {
      reviewerName: formData.reviewerName.trim(),
      reviewerContent: formData.reviewerContent.trim(),
      rating: formData.rating,
      pageLocation: formData.pageLocation,
      display: formData.display
    };

    const updatedReviews = [...reviewsData, newReview];
    onUpdate(updatedReviews);
    
    // Reset form and hide it
    setFormData({
      reviewerName: '',
      reviewerContent: '',
      rating: 5,
      pageLocation: 'home',
      display: true
    });
    setShowAddForm(false);
    
    toast.success('Review added successfully');
  };

  const handleEditReview = (index) => {
    const review = reviewsData[index];
    setFormData({
      reviewerName: review.reviewerName,
      reviewerContent: review.reviewerContent,
      rating: review.rating || 5,
      pageLocation: review.pageLocation || 'home',
      display: review.display !== undefined ? review.display : true
    });
    setEditingIndex(index);
    setActiveForm('edit');
    setShowAddForm(true); // Show form when editing
  };

  const handleUpdateReview = () => {
    if (!validateForm()) {
      return;
    }

    const updatedReview = {
      reviewerName: formData.reviewerName.trim(),
      reviewerContent: formData.reviewerContent.trim(),
      rating: formData.rating,
      pageLocation: formData.pageLocation,
      display: formData.display
    };

    const updatedReviews = [...reviewsData];
    updatedReviews[editingIndex] = updatedReview;
    onUpdate(updatedReviews);
    
    // Reset form and hide it
    setFormData({
      reviewerName: '',
      reviewerContent: '',
      rating: 5,
      pageLocation: 'home',
      display: true
    });
    setEditingIndex(null);
    setActiveForm('add');
    setShowAddForm(false);
    
    toast.success('Review updated successfully');
  };

  const handleDeleteReview = (index) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviewsData.filter((_, i) => i !== index);
      onUpdate(updatedReviews);
      toast.success('Review deleted successfully');
    }
  };

  const handleToggleDisplay = (index) => {
    const updatedReviews = [...reviewsData];
    updatedReviews[index].display = !updatedReviews[index].display;
    onUpdate(updatedReviews);
    
    const action = updatedReviews[index].display ? 'shown' : 'hidden';
    toast.success(`Review ${action} successfully`);
  };

  const handleCancelEdit = () => {
    setFormData({
      reviewerName: '',
      reviewerContent: '',
      rating: 5,
      pageLocation: 'home',
      display: true
    });
    setEditingIndex(null);
    setActiveForm('add');
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setActiveForm('add');
    setFormData({
      reviewerName: '',
      reviewerContent: '',
      rating: 5,
      pageLocation: 'home',
      display: true
    });
  };

  const handleHideForm = () => {
    setShowAddForm(false);
    setActiveForm('add');
    setFormData({
      reviewerName: '',
      reviewerContent: '',
      rating: 5,
      pageLocation: 'home',
      display: true
    });
    setEditingIndex(null);
  };

  // Star Rating Component
  const StarRating = ({ rating, interactive = false, onRate = null, size = 'text-xl' }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "div"}
            onClick={interactive ? () => onRate(star) : undefined}
            className={`${size} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            disabled={!interactive || disabled}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  // Review Preview Component
  const ReviewPreview = ({ review }) => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} size="text-base" />
              <span className="text-sm text-gray-500">({review.rating}.0)</span>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            review.pageLocation === 'home' ? 'bg-blue-100 text-blue-800' :
            review.pageLocation === 'service' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {review.pageLocation === 'home' ? 'Home Page' :
             review.pageLocation === 'service' ? 'Service Page' : 'City Page'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">{review.reviewerContent}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded ${
              review.display ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {review.display ? 'Displayed' : 'Hidden'}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Preview
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with Add Review Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-black">Reviews Management</h3>
          <p className="text-sm text-gray-500">Manage reviews for this page</p>
        </div>
        <button
          type="button"
          onClick={handleShowAddForm}
          disabled={disabled || showAddForm}
          className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Review
        </button>
      </div>

      {/* Add/Edit Review Form (Conditionally Visible) */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">
              {activeForm === 'add' ? 'Add New Review' : 'Edit Review'}
            </h3>
            <button
              type="button"
              onClick={handleHideForm}
              disabled={disabled}
              className="text-gray-500 hover:text-gray-700 text-xl p-1"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Reviewer Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Reviewer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter reviewer name"
                value={formData.reviewerName}
                onChange={(e) => handleInputChange('reviewerName', e.target.value)}
                disabled={disabled}
                className={`w-full px-4 py-2.5 border ${
                  errors.reviewerName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm rounded disabled:bg-gray-50 disabled:cursor-not-allowed`}
              />
              {errors.reviewerName && (
                <p className="text-red-500 text-xs mt-1">{errors.reviewerName}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <StarRating 
                  rating={formData.rating} 
                  interactive={true}
                  onRate={handleStarClick}
                />
                <span className="text-gray-600 text-sm">
                  {formData.rating}.0 out of 5 stars
                </span>
              </div>
            </div>

            {/* Display Location */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Display Location <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.pageLocation}
                onChange={(e) => handleInputChange('pageLocation', e.target.value)}
                disabled={disabled}
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm rounded disabled:bg-gray-50 disabled:cursor-not-allowed bg-white"
              >
                <option value="home">Home Page</option>
                <option value="service">Service Page</option>
                <option value="city">City Page</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select where this review should be displayed
              </p>
            </div>

            {/* Review Content */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Review Content <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter review content"
                value={formData.reviewerContent}
                onChange={(e) => handleInputChange('reviewerContent', e.target.value)}
                disabled={disabled}
                rows={4}
                className={`w-full px-4 py-2.5 border ${
                  errors.reviewerContent ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm resize-none rounded disabled:bg-gray-50 disabled:cursor-not-allowed`}
              />
              {errors.reviewerContent && (
                <p className="text-red-500 text-xs mt-1">{errors.reviewerContent}</p>
              )}
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.reviewerContent.length}/500 characters
              </div>
            </div>

            {/* Display Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="displayReview"
                checked={formData.display}
                onChange={(e) => handleInputChange('display', e.target.checked)}
                disabled={disabled}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="displayReview" className="text-sm font-medium text-black">
                Display this review on the page
              </label>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Preview
              </label>
              <ReviewPreview review={formData} />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleHideForm}
                disabled={disabled}
                className="px-4 py-2 border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={activeForm === 'add' ? handleAddReview : handleUpdateReview}
                disabled={disabled}
                className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {disabled ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  activeForm === 'add' ? 'Add Review' : 'Update Review'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Reviews Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-black">
              Existing Reviews ({reviewsData.length})
            </h3>
            {reviewsData.length > 0 && (
              <span className="text-sm text-gray-500">
                Click on a review to edit or delete
              </span>
            )}
          </div>
        </div>

        {reviewsData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-600 mb-2">No reviews yet</h4>
            <p className="text-gray-500 mb-4">Add your first review to get started</p>
            <button
              type="button"
              onClick={handleShowAddForm}
              disabled={disabled}
              className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Your First Review
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reviewer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviewsData.map((review, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {review.reviewerName}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {review.reviewerContent.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StarRating rating={review.rating} size="text-base" />
                        <span className="ml-2 text-sm text-gray-600">
                          ({review.rating}.0)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        review.pageLocation === 'home' ? 'bg-blue-100 text-blue-800' :
                        review.pageLocation === 'service' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {review.pageLocation === 'home' ? 'Home' :
                         review.pageLocation === 'service' ? 'Service' : 'City'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleDisplay(index)}
                        disabled={disabled}
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          review.display 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } transition-colors disabled:opacity-50`}
                      >
                        {review.display ? 'Displayed' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          // Show modal preview
                          setFormData({
                            reviewerName: review.reviewerName,
                            reviewerContent: review.reviewerContent,
                            rating: review.rating || 5,
                            pageLocation: review.pageLocation || 'home',
                            display: review.display !== undefined ? review.display : true
                          });
                          setActiveForm('preview');
                        }}
                        disabled={disabled}
                        className="text-sm text-purple-600 hover:text-purple-900 disabled:opacity-50"
                      >
                        View Full
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditReview(index)}
                          disabled={disabled}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(index)}
                          disabled={disabled}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {activeForm === 'preview' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Review Preview</h3>
              <button
                type="button"
                onClick={() => {
                  setActiveForm('add');
                  setFormData({
                    reviewerName: '',
                    reviewerContent: '',
                    rating: 5,
                    pageLocation: 'home',
                    display: true
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ReviewPreview review={formData} />
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveForm('add');
                  setFormData({
                    reviewerName: '',
                    reviewerContent: '',
                    rating: 5,
                    pageLocation: 'home',
                    display: true
                  });
                }}
                className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm rounded"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;