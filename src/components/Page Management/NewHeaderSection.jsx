import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createNavigation, 
  updateNavigation, 
  createSubService,
  updateSubService,
  fetchAllNavigations 
} from '../../redux/navigationSlice';

const NewHeaderSection = ({ onClose, editingNavigation, editingSubService }) => {
  const dispatch = useDispatch();
  const { navigations, loading } = useSelector(state => state.navigation);
  
  const [isSubService, setIsSubService] = useState(!!editingSubService);
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionInfo, setSectionInfo] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [selectedNavigation, setSelectedNavigation] = useState('');
  const [errors, setErrors] = useState({});

  // Load navigations for dropdown
  useEffect(() => {
    dispatch(fetchAllNavigations());
  }, [dispatch]);

  // Populate form if editing
  useEffect(() => {
    if (editingNavigation) {
      setIsSubService(false);
      setSectionTitle(editingNavigation.title);
      setSectionInfo(editingNavigation.info || '');
      setIsActive(editingNavigation.active);
    } else if (editingSubService) {
      setIsSubService(true);
      setSectionTitle(editingSubService.title);
      setDescription(editingSubService.description || '');
      setSelectedNavigation(editingSubService.navigationService?._id || editingSubService.navigationService || '');
      setIsActive(editingSubService.active);
      if (editingSubService.image) {
        setImagePreview(editingSubService.image);
      }
    }
  }, [editingNavigation, editingSubService]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!sectionTitle.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (isSubService && !selectedNavigation) {
      newErrors.navigation = 'Please select a parent navigation service';
    }
    
    if (!isSubService && !sectionInfo.trim() && !editingNavigation) {
      newErrors.info = 'Information is required for navigation services';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleCancel = () => {
    setSectionTitle('');
    setSectionInfo('');
    setDescription('');
    setSelectedNavigation('');
    setIsActive(true);
    setImageFile(null);
    setImagePreview('');
    setErrors({});
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isSubService) {
        // Handle sub-service create/update
        const subServiceData = {
          title: sectionTitle,
          description,
          navigationService: selectedNavigation,
          active: isActive
        };

        if (editingSubService) {
          // Update sub-service
          await dispatch(updateSubService({
            id: editingSubService._id,
            data: subServiceData,
            imageFile: imageFile || undefined
          })).unwrap();
        } else {
          // Create sub-service
          await dispatch(createSubService({
            data: subServiceData,
            imageFile
          })).unwrap();
        }
      } else {
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
          {editingNavigation || editingSubService ? 'Edit Service' : 'Add New Header Section'}
        </h2>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Toggle between Navigation and Sub-Service */}
        {!editingNavigation && !editingSubService && (
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setIsSubService(false)}
              className={`px-6 py-2 font-medium transition-colors ${
                !isSubService
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-black hover:bg-gray-50'
              }`}
            >
              Navigation Service
            </button>
            <button
              type="button"
              onClick={() => setIsSubService(true)}
              className={`px-6 py-2 font-medium transition-colors ${
                isSubService
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-black border border-black hover:bg-gray-50'
              }`}
            >
              Sub-Service
            </button>
          </div>
        )}

        {/* Section Title */}
        <div>
          <label className="block text-[22px] font-medium text-gray-900 mb-2">
            {isSubService ? 'Sub-Service Title' : 'Service Title'} *
          </label>
          <input
            type="text"
            placeholder={isSubService ? "Eg: Wedding Photography" : "Eg: Photography"}
            value={sectionTitle}
            onChange={(e) => {
              setSectionTitle(e.target.value);
              if (errors.title) setErrors({...errors, title: ''});
            }}
            className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-black'} placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* For Sub-Service: Description */}
        {isSubService && (
          <div>
            <label className="block text-[22px] font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter description for the sub-service"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>
        )}

        {/* For Navigation Service: Info */}
        {!isSubService && (
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
        )}

        {/* For Sub-Service: Image Upload */}
        {isSubService && (
          <div>
            <label className="block text-[22px] font-medium text-gray-900 mb-2">
              Image {!editingSubService && '(Optional)'}
            </label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
                  <p className="text-gray-500 mb-2">Click to upload image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer inline-block"
                  >
                    Choose File
                  </label>
                </div>
              )}
              {imageFile && !imagePreview && (
                <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>
              )}
            </div>
          </div>
        )}

        {/* For Sub-Service: Select Parent Navigation */}
        {isSubService && (
          <div>
            <label className="block text-[22px] font-medium text-gray-900 mb-2">
              Parent Navigation Service *
            </label>
            <select
              value={selectedNavigation}
              onChange={(e) => {
                setSelectedNavigation(e.target.value);
                if (errors.navigation) setErrors({...errors, navigation: ''});
              }}
              className={`w-full px-4 py-3 border ${errors.navigation ? 'border-red-500' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Select a navigation service</option>
              {navigations
                .filter(nav => nav.active) // Show only active navigations
                .map(nav => (
                  <option key={nav._id} value={nav._id}>
                    {nav.title}
                  </option>
                ))}
            </select>
            {errors.navigation && <p className="text-red-500 text-sm mt-1">{errors.navigation}</p>}
          </div>
        )}

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
          {loading ? 'Saving...' : (editingNavigation || editingSubService ? 'Update' : 'Add Section')}
        </button>
      </div>
    </div>
  );
};

export default NewHeaderSection;