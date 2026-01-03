import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from '../../components/Page HomePage/ServiceContent';
import Seo from '../../components/Page HomePage/ServiceSeo';
import InternalLinks from '../../components/Page HomePage/ServiceInternalLinks';
import MainVendors from '../../components/Page HomePage/MainVendor';
import Reviews from '../../components/Page HomePage/ServiceReviews';
import { 
  createServicePage, 
  updateServicePage,
  clearServicePagesError,
  clearServicePagesSuccess,
  fetchServicePageById
} from '../../redux/servicePageSlice';
import { fetchCities } from '../../redux/citiesSlice';
import { toast } from 'react-toastify';

const AddNewServicePage = ({ onClose, editMode = false, servicePageId = null }) => {
  const dispatch = useDispatch();
  
  const { loading, error, success, message, currentServicePage } = useSelector((state) => state.servicepages);
  const { cities, loading: citiesLoading } = useSelector((state) => state.cities);

  const [activeTab, setActiveTab] = useState('Basic Info');
  const [formData, setFormData] = useState({
    basicInfo: {
      pageTitle: '',
      slugUrl: '',
      h1Description: '',
      location: '', // This will store the city ObjectId
      status: 'Published',
      bannerImage: ''
    },
    content: {
      mainContent: '',
      h2Headings: [],
      h3Headings: []
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      focusedKeyword: ''
    },
    internalLinks: {
      blockName: '',
      urls: [],
      linkBlocks: []
    },
    mainVendors: [], // Only mainVendors, no subVendors or blocks
    reviews: [],
    topSearches: []
  });

  const tabs = [
    'Basic Info',
    'Content',
    'SEO',
    'Internal Links',
    'Main Vendors', // Only Main Vendors tab
    'Reviews',
    'Top Searches'
  ];

  // Fetch cities on component mount
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // Load data for edit mode
// Load data for edit mode
useEffect(() => {
  if (editMode && servicePageId) {
    if (!currentServicePage || currentServicePage._id !== servicePageId) {
      dispatch(fetchServicePageById(servicePageId));
    } else if (currentServicePage._id === servicePageId) {
      // Map backend's otherVendors to frontend's mainVendors
      setFormData({
        basicInfo: {
          pageTitle: currentServicePage.basicInfo?.pageTitle || '',
          slugUrl: currentServicePage.basicInfo?.slugUrl || '',
          h1Description: currentServicePage.basicInfo?.h1Description || '',
          location: currentServicePage.basicInfo?.location || '',
          status: currentServicePage.basicInfo?.status || 'Published',
          bannerImage: currentServicePage.basicInfo?.bannerImage || ''
        },
        content: currentServicePage.content || {
          mainContent: '',
          h2Headings: [],
          h3Headings: []
        },
        seo: currentServicePage.seo || {
          metaTitle: '',
          metaDescription: '',
          focusedKeyword: ''
        },
        internalLinks: currentServicePage.internalLinks || {
          blockName: '',
          urls: [],
          linkBlocks: []
        },
        // Map from backend's otherVendors to frontend's mainVendors
        mainVendors: currentServicePage.otherVendors?.map(section => ({
          title: section.title || '',
          selectedService: section.selectedService || '',
          searchQuery: section.searchQuery || '',
          isMain: section.isMain || false, // Add this line
          vendors: section.vendors?.map(vendor => ({
            studioName: vendor.studioName || '',
            studioDescription: vendor.studioDescription || '',
            eventLocation: vendor.eventLocation || '',
            rating: vendor.rating || '',
            pricing: vendor.pricing || '',
            area: vendor.area || '',
            services: Array.isArray(vendor.services) ? vendor.services : [],
            portfolioImages: vendor.portfolioImages || [],
            selected: vendor.selected || false
          })) || []
        })) || [],
        reviews: currentServicePage.reviews || [],
        topSearches: currentServicePage.topSearches || []
      });
    }
  }
}, [editMode, servicePageId, currentServicePage, dispatch]);

  // Handle success and error messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearServicePagesError());
    }
    
    if (success && message) {
      toast.success(message);
      dispatch(clearServicePagesSuccess());
      
      // Close modal after successful creation/update
      if (onClose) {
        setTimeout(() => onClose(), 1000);
      }
    }
  }, [error, success, message, dispatch, onClose]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleContentUpdate = (contentData) => {
    setFormData(prev => ({
      ...prev,
      content: contentData
    }));
  };

  const handleSeoUpdate = (seoData) => {
    setFormData(prev => ({
      ...prev,
      seo: seoData
    }));
  };

  const handleInternalLinksUpdate = (internalLinksData) => {
    setFormData(prev => ({
      ...prev,
      internalLinks: internalLinksData
    }));
  };

  const handleMainVendorsUpdate = (mainVendorsData) => {
    setFormData(prev => ({
      ...prev,
      mainVendors: mainVendorsData
    }));
  };

  // Handle banner image upload
  const handleBannerImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      // Create a preview URL for display
      const previewUrl = URL.createObjectURL(file);
      
      // Store the file object for later upload
      setFormData(prev => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          bannerImage: previewUrl, // For preview
          bannerImageFile: file    // Store the actual file
        }
      }));

      toast.success('Banner image ready for upload');
    } catch (error) {
      toast.error('Failed to process banner image');
      console.error('Banner upload error:', error);
    }
  };

const handleSubmit = () => {
  if (!formData.basicInfo.pageTitle.trim()) {
    toast.error('Page title is required');
    return;
  }

  // Create FormData
  const formDataToSend = new FormData();

  // Clean mainVendors data - separate files from URLs
  const otherVendorsWithoutFiles = formData.mainVendors.map((section, sectionIndex) => ({
    title: section.title || '',
    selectedService: section.selectedService || '',
    searchQuery: section.searchQuery || '',
    isMain: section.isMain || false, // Add this line
    vendors: section.vendors ? section.vendors.map((vendor, vendorIndex) => ({
      studioName: vendor.studioName || '',
      studioDescription: vendor.studioDescription || '',
      eventLocation: vendor.eventLocation || '',
      rating: vendor.rating || '',
      pricing: vendor.pricing || '',
      area: vendor.area || '',
      services: Array.isArray(vendor.services) ? vendor.services : [],
      // Remove portfolioImages field - we'll handle it separately
      portfolioImages: vendor.portfolioImages 
        ? vendor.portfolioImages.filter(img => typeof img === 'string') 
        : [], // Keep only URLs, not File objects
      selected: vendor.selected || false
    })) : []
  }));

  const dataToSend = {
    basicInfo: {
      pageTitle: formData.basicInfo.pageTitle?.trim() || '',
      slugUrl: formData.basicInfo.slugUrl?.trim() || '',
      h1Description: formData.basicInfo.h1Description?.trim() || '',
      status: formData.basicInfo.status || 'Published',
      location: formData.basicInfo.location || '',
      bannerImage: formData.basicInfo.bannerImageFile ? '' : formData.basicInfo.bannerImage
    },
    content: formData.content,
    seo: formData.seo,
    internalLinks: formData.internalLinks,
    // Send as otherVendors (backend expects this name)
    otherVendors: otherVendorsWithoutFiles,
    reviews: formData.reviews,
    topSearches: formData.topSearches
  };

  // Add all form data as JSON string in 'data' field
  formDataToSend.append('data', JSON.stringify(dataToSend));

  // Add banner image file if exists
  if (formData.basicInfo.bannerImageFile) {
    formDataToSend.append('bannerImage', formData.basicInfo.bannerImageFile);
  }

  // Add portfolio images from mainVendors
  formData.mainVendors.forEach((section, sectionIndex) => {
    if (section.vendors && Array.isArray(section.vendors)) {
      section.vendors.forEach((vendor, vendorIndex) => {
        // Check if vendor has portfolio image files
        if (vendor.portfolioImages && Array.isArray(vendor.portfolioImages)) {
          // Separate Files from strings (URLs)
          const portfolioFiles = vendor.portfolioImages.filter(img => img instanceof File);
          
          // Add each portfolio image file
          portfolioFiles.forEach((file, fileIndex) => {
            formDataToSend.append(`otherVendor${sectionIndex}_vendor${vendorIndex}_portfolio${fileIndex}`, file);
          });
        }
      });
    }
  });

  console.log('FormData being sent:', {
    hasData: formDataToSend.has('data'),
    hasBannerImage: formDataToSend.has('bannerImage'),
    mainVendorsCount: formData.mainVendors.length
  });

  // Log FormData contents for debugging
  for (let [key, value] of formDataToSend.entries()) {
    console.log(`${key}:`, value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : 
                value.length > 100 ? `${value.substring(0, 100)}...` : value);
  }

  if (editMode && servicePageId) {
    // Update existing service page
    dispatch(updateServicePage({
      servicePageId,
      servicePageData: formDataToSend
    }));
  } else {
    // Create new service page
    dispatch(createServicePage(formDataToSend));
  }
};

  const handleCancel = () => {
    if (onClose) onClose();
  };

  // Filter only active cities for the dropdown
  const activeCities = cities.filter(city => city.isActive !== false);

  // Get the selected city name for display
  const selectedCity = activeCities.find(city => city._id === formData.basicInfo.location);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal container */}
      <div
        className="bg-white shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-black">
            {editMode ? 'Edit Service Page' : 'Add New Service Page'}
          </h2>
          {loading && (
            <span className="text-sm text-gray-500">Saving...</span>
          )}
        </div>

        {/* Tabs: always visible (not scrollable, no overflow-x) */}
        <div className="border-b bg-white">
          <div className="flex px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === tab
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
                    Page Title (H1) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter page title"
                    value={formData.basicInfo.pageTitle}
                    onChange={(e) => handleInputChange('basicInfo', 'pageTitle', e.target.value)}
                    className="w-full px-4 py-2.5 border border-black focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 text-sm"
                    disabled={loading}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.basicInfo.pageTitle.length}/100
                  </div>
                </div>

                <div className="w-64">
                  <label className="block text-sm font-medium text-black mb-2">
                    Location
                  </label>
                  {citiesLoading ? (
                    <div className="w-full px-4 py-2.5 border border-black bg-gray-100 animate-pulse">
                      Loading cities...
                    </div>
                  ) : (
                    <select
                      value={formData.basicInfo.location}
                      onChange={(e) => handleInputChange('basicInfo', 'location', e.target.value)}
                      className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                      disabled={loading}
                    >
                      <option value="">Select location</option>
                      {activeCities.length === 0 ? (
                        <option value="" disabled>No active cities found</option>
                      ) : (
                        activeCities.map((city) => (
                          <option key={city._id} value={city._id}>
                            {city.cityName || city.name || 'Unnamed City'}
                          </option>
                        ))
                      )}
                    </select>
                  )}
                  {!citiesLoading && activeCities.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      No active cities found. Please add cities in the admin panel.
                    </p>
                  )}
                  {selectedCity && (
                    <div className="text-xs text-gray-500 mt-1">
                      Selected: {selectedCity.cityName}
                      {selectedCity.state && `, ${selectedCity.state}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Banner Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageUpload}
                      className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 1920x600px, Max size: 5MB
                    </p>
                  </div>
                  {formData.basicInfo.bannerImage && (
                    <div className="relative w-24 h-16">
                      <img
                        src={formData.basicInfo.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            basicInfo: {
                              ...prev.basicInfo,
                              bannerImage: '',
                              bannerImageFile: null
                            }
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
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
                    value={formData.basicInfo.slugUrl}
                    onChange={(e) => handleInputChange('basicInfo', 'slugUrl', e.target.value)}
                    className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    disabled={loading}
                  />
                  {/* Display the URL that will be used for location API */}
                  {selectedCity && formData.basicInfo.slugUrl && (
                    <div className="text-xs text-gray-500 mt-1">
                      Service Page URL: /api/pages/service/slug/{formData.basicInfo.slugUrl}
                    </div>
                  )}
                </div>
              </div>

              {/* Description For H1 */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Description For H1
                </label>
                <textarea
                  value={formData.basicInfo.h1Description}
                  onChange={(e) => handleInputChange('basicInfo', 'h1Description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                  disabled={loading}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.basicInfo.h1Description.length}/300
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 w-full">
                <label className="block text-sm font-medium text-black">
                  Status
                </label>
                <select
                  value={formData.basicInfo.status}
                  onChange={(e) => handleInputChange('basicInfo', 'status', e.target.value)}
                  className="w-96 px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                  disabled={loading}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'Content' && (
            <Content 
              contentData={formData.content}
              onUpdate={handleContentUpdate}
              disabled={loading}
            />
          )}

          {activeTab === 'SEO' && (
            <Seo 
              seoData={formData.seo}
              onUpdate={handleSeoUpdate}
              disabled={loading}
            />
          )}

          {activeTab === 'Internal Links' && (
            <InternalLinks 
              internalLinksData={formData.internalLinks}
              onUpdate={handleInternalLinksUpdate}
              disabled={loading}
            />
          )}

          {activeTab === 'Main Vendors' && (
            <MainVendors 
              otherVendorsData={formData.mainVendors}
              onUpdate={handleMainVendorsUpdate}
              disabled={loading}
            />
          )}

          {activeTab === 'Reviews' && (
            <Reviews 
              reviewsData={formData.reviews}
              onUpdate={(reviewsData) => {
                setFormData(prev => ({
                  ...prev,
                  reviews: reviewsData
                }));
              }}
              disabled={loading}
            />
          )}

          {activeTab === 'Top Searches' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Top Searches (Seperate with Comma)
                </label>
                <textarea
                  value={formData.topSearches.join('\n')}
                  onChange={(e) => {
                    const searches = e.target.value.split('\n').filter(s => s.trim());
                    setFormData(prev => ({
                      ...prev,
                      topSearches: searches
                    }));
                  }}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                  disabled={loading}
                  placeholder="Enter top searches, one per line"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.topSearches.length} searches added
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-2.5 border border-black font-medium text-black hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                {editMode ? 'Update Service Page' : 'Create Service Page'}
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
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewServicePage;