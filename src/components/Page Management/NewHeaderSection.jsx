import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createNavigation, 
  updateNavigation,
  fetchAllNavigations 
} from '../../redux/navigationSlice';

const NewHeaderSection = ({ onClose, editingNavigation }) => {
  const dispatch = useDispatch();
  const { navigations, loading } = useSelector(state => state.navigation);
  
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionInfo, setSectionInfo] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState({});

  // Load navigations for dropdown
  useEffect(() => {
    dispatch(fetchAllNavigations());
  }, [dispatch]);

  // Populate form if editing
  useEffect(() => {
    if (editingNavigation) {
      setSectionTitle(editingNavigation.title);
      setSectionInfo(editingNavigation.info || '');
      setIsActive(editingNavigation.active);
    }
  }, [editingNavigation]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!sectionTitle.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!sectionInfo.trim() && !editingNavigation) {
      newErrors.info = 'Information is required for navigation services';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setSectionTitle('');
    setSectionInfo('');
    setIsActive(true);
    setErrors({});
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Handle navigation service create/update
      const navigationData = {
        title: sectionTitle,
        info: sectionInfo,
        active: isActive
      };

      if (editingNavigation) {
        // Update navigation
        await dispatch(updateNavigation({
          id: editingNavigation._id,
          data: navigationData
        })).unwrap();
      } else {
        // Create navigation
        await dispatch(createNavigation(navigationData)).unwrap();
      }
      
      handleCancel();
    } catch (error) {
      console.error('Error saving service:', error);
      alert(error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 shadow-xl w-full">
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h2 className="text-[32px] font-medium text-gray-900">
          {editingNavigation ? 'Edit Navigation Service' : 'Add New Navigation Service'}
        </h2>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Section Title */}
        <div>
          <label className="block text-[22px] font-medium text-gray-900 mb-2">
            Service Title *
          </label>
          <input
            type="text"
            placeholder="Eg: Photography"
            value={sectionTitle}
            onChange={(e) => {
              setSectionTitle(e.target.value);
              if (errors.title) setErrors({...errors, title: ''});
            }}
            className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-black'} placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Service Information */}
        <div>
          <label className="block text-[22px] font-medium text-gray-900 mb-2">
            Service Information {!editingNavigation && '*'}
          </label>
          <textarea
            placeholder="Eg: Professional photography services for all occasions"
            value={sectionInfo}
            onChange={(e) => {
              setSectionInfo(e.target.value);
              if (errors.info) setErrors({...errors, info: ''});
            }}
            className={`w-full px-4 py-3 border ${errors.info ? 'border-red-500' : 'border-black'} placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            rows="3"
          />
          {errors.info && <p className="text-red-500 text-sm mt-1">{errors.info}</p>}
        </div>

        {/* Active/Inactive Toggle */}
        <div>
          <label className="block text-[22px] font-medium text-gray-900 mb-2">
            Status
          </label>
          <div className="flex gap-3">
            <button
              type="button"
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
              type="button"
              onClick={() => setIsActive(false)}
              className={`px-6 py-2 font-medium transition-colors ${
                !isActive
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-black border border-black hover:bg-gray-50'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t px-6 py-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-black font-medium text-black hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Saving...' : (editingNavigation ? 'Update Navigation Service' : 'Add Navigation Service')}
        </button>
      </div>
    </div>
  );
};

export default NewHeaderSection;