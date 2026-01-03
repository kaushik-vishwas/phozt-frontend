import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit, Trash2, Plus, X, Save, Search, ExternalLink } from "lucide-react";
import Sidebar from "../../components/Sidebar";

// Import actions from your navigation slice
import {
  createSubService,
  fetchAllSubServices,
  updateSubService,
  deleteSubService,
  fetchAllNavigations,
  clearError,
  clearSuccess
} from "../../redux/navigationSlice";

const DropdownManagement = () => {
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const {
    navigations,
    subServices,
    loading,
    error,
    success
  } = useSelector((state) => state.navigation);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const emptyForm = {
    navigationServiceId: "",
    title: "",
    description: "",
    buttonTitle: "",
    buttonUrl: "",
    active: true,
  };

  const [formData, setFormData] = useState(emptyForm);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllNavigations());
    dispatch(fetchAllSubServices());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      // Show success message (you can use a toast notification here)
      console.log("Operation successful!");
      dispatch(clearSuccess());
    }
    
    if (error) {
      // Show error message (you can use a toast notification here)
      console.error("Error:", error);
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  /* ---------------- IMAGE HANDLING ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      // Don't set image in formData - it will be handled by FormData in API
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  /* ---------------- MODAL FUNCTIONS ---------------- */
  const openAddModal = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service._id);
    setFormData({
      navigationServiceId: service.navigationService,
      title: service.title,
      description: service.description || "",
      buttonTitle: service.buttonTitle || "",
      buttonUrl: service.buttonUrl || "",
      active: service.active !== undefined ? service.active : true,
    });
    setImagePreview(service.image || null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData(emptyForm);
    setImagePreview(null);
    setImageFile(null);
    setIsProcessing(false);
  };

  /* ---------------- SAVE FUNCTION ---------------- */
  const handleSave = async () => {
    if (!formData.navigationServiceId) {
      alert("Please select a parent navigation service");
      return;
    }
    if (!formData.title.trim()) {
      alert("Sub-service title is required");
      return;
    }

    setIsProcessing(true);

    // Prepare form data
    const subServiceData = {
      navigationService: formData.navigationServiceId,
      title: formData.title,
      description: formData.description,
      buttonTitle: formData.buttonTitle,
      buttonUrl: formData.buttonUrl,
      active: formData.active,
    };

    try {
      if (editingService) {
        // Update existing sub-service
        await dispatch(updateSubService({
          id: editingService,
          data: subServiceData,
          imageFile: imageFile
        })).unwrap();
      } else {
        // Create new sub-service
        await dispatch(createSubService({
          data: subServiceData,
          imageFile: imageFile
        })).unwrap();
      }
      
      closeModal();
    } catch (err) {
      console.error("Failed to save sub-service:", err);
      setIsProcessing(false);
    }
  };

  /* ---------------- DELETE FUNCTION ---------------- */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sub-service?")) {
      try {
        await dispatch(deleteSubService(id)).unwrap();
      } catch (err) {
        console.error("Failed to delete sub-service:", err);
      }
    }
  };

  /* ---------------- FILTER ---------------- */
const getNavigationTitle = (navigationService) => {
  console.log('NavigationService data:', navigationService); // Debug log
  
  if (!navigationService) {
    return "Unknown Service";
  }
  
  // Check if it's an object with title (API response shows it is!)
  if (navigationService && typeof navigationService === 'object') {
    return navigationService.title || "Unknown Service";
  }
  
  // Fallback: if it's a string (shouldn't happen with current API)
  if (typeof navigationService === 'string') {
    // Check if it's an ObjectId
    if (navigationService.length === 24) {
      const nav = navigations.find(n => n._id === navigationService);
      return nav ? nav.title : "Unknown Service";
    }
    // If it's already a title string
    return navigationService;
  }
  
  return "Unknown Service";
};

  const filteredServices = subServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      getNavigationTitle(s.navigationService).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter only active navigation services for dropdown
  const activeNavigations = navigations.filter(nav => nav.active);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Sub-Service Management
              </h1>
              <p className="text-gray-600 mt-1">Manage sub-services under navigation services</p>
            </div>
            <button
              onClick={openAddModal}
              disabled={loading}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={18} /> Add Sub-Service
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Search sub-services by title, description, or parent service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State for initial load */}
        {loading && subServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <p className="text-gray-600 mt-2">Loading sub-services...</p>
          </div>
        ) : (
          <>
            {/* Sub-Services Grid - Minimalistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  {/* Image */}
                  {service.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-5 ${!service.image ? 'pt-6' : ''}`}>
                    {/* Title and Edit/Delete Icons */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Parent Service Badge */}
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-3">
                      {getNavigationTitle(service.navigationService)}
                    </span>

                    {/* Description */}
                    {service.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>
                    )}

                    {/* Button Link */}
                    {service.buttonTitle && service.buttonUrl && (
                      <a
                        href={service.buttonUrl}
                        className="inline-flex items-center gap-1 text-sm font-medium text-black hover:text-gray-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {service.buttonTitle}
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {/* Active Status */}
                    <div className="mt-4 flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${service.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-gray-500">
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No sub-services found" : "No sub-services yet"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? "Try a different search term" : "Add your first sub-service"}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl border border-gray-200 shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingService ? "Edit Sub-Service" : "Add Sub-Service"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded"
                disabled={isProcessing}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {/* Parent Navigation Service Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Navigation Service *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50"
                    value={formData.navigationServiceId}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      navigationServiceId: e.target.value 
                    })}
                    disabled={isProcessing}
                    required
                  >
                    <option value="">Select a navigation service</option>
                    {loading ? (
                      <option value="" disabled>Loading navigation services...</option>
                    ) : activeNavigations.length === 0 ? (
                      <option value="" disabled>No active navigation services found</option>
                    ) : (
                      activeNavigations.map((nav) => (
                        <option key={nav._id} value={nav._id}>
                          {nav.title}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Sub-Service Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-Service Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter sub-service title"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    disabled={isProcessing}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the sub-service..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    disabled={isProcessing}
                  />
                </div>

                {/* Button Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Learn More, Book Now"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50"
                    value={formData.buttonTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, buttonTitle: e.target.value })
                    }
                    disabled={isProcessing}
                  />
                </div>

                {/* Button URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/service"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50"
                    value={formData.buttonUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, buttonUrl: e.target.value })
                    }
                    disabled={isProcessing}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (Optional)
                  </label>
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        disabled={isProcessing}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                        disabled={isProcessing}
                      />
                      <label
                        htmlFor="image-upload"
                        className={`cursor-pointer flex flex-col items-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Plus size={24} className="text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Upload Image</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="activeStatus"
                    className="w-4 h-4 text-black rounded focus:ring-black disabled:opacity-50"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    disabled={isProcessing}
                  />
                  <label htmlFor="activeStatus" className="ml-2 text-sm text-gray-700">
                    Active Sub-Service
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing || !formData.navigationServiceId || !formData.title}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : editingService ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownManagement;