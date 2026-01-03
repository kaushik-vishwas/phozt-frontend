import React, { useState, useRef } from 'react';
import { apiAddBlockToHomePage, apiUpdateBlockInHomePage } from '../../service/api';

const AddNewServiceCard = ({ onClose, onSave, initialData = null, editMode = false, homePageId, blockId }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        serviceName: initialData?.serviceName || '',
        serviceDescription: initialData?.serviceDescription || '',
        linkPage: initialData?.linkPage || '',
        imageUrl: initialData?.imageUrl || '',
        imageFile: null,
        imagePreview: initialData?.imageUrl || null
    });

    const [errors, setErrors] = useState({
        serviceName: '',
        image: '',
        linkPage: ''
    });

    const fileInputRef = useRef(null);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.serviceName.trim()) {
            newErrors.serviceName = 'Service name is required';
        }
        
        if (formData.linkPage && !isValidUrl(formData.linkPage)) {
            newErrors.linkPage = 'Please enter a valid URL (including http:// or https://)';
        }
        
        if (!editMode && !formData.imageUrl && !formData.imageFile) {
            newErrors.image = 'Please upload an image';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (field === 'serviceName' && value.trim()) {
            setErrors(prev => ({ ...prev, serviceName: '' }));
        }
        
        if (field === 'linkPage') {
            if (!value || isValidUrl(value)) {
                setErrors(prev => ({ ...prev, linkPage: '' }));
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Clear previous errors
        setErrors(prev => ({ ...prev, image: '' }));

        // Validate file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                image: 'Only JPG, PNG, GIF, or WebP images are allowed'
            }));
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({
                ...prev,
                image: 'Image size must be less than 5MB'
            }));
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                imagePreview: reader.result,
                imageFile: file,
                imageUrl: '' // Clear existing URL if uploading new file
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            imageUrl: '',
            imagePreview: null,
            imageFile: null
        }));
        setErrors(prev => ({ ...prev, image: '' }));
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Prepare FormData
            const formDataToSend = new FormData();
            
            // Add text fields
            formDataToSend.append('serviceName', formData.serviceName.trim());
            formDataToSend.append('serviceDescription', formData.serviceDescription.trim());
            formDataToSend.append('linkPage', formData.linkPage.trim());
            
            // If we have an existing image URL in edit mode, append it
            if (editMode && formData.imageUrl && !formData.imageFile) {
                formDataToSend.append('imageUrl', formData.imageUrl);
            }
            
            // If we have a new image file, append it
            if (formData.imageFile) {
                formDataToSend.append('image', formData.imageFile);
            }

            let response;
            
            if (editMode && homePageId && blockId) {
                // Update existing block
                response = await apiUpdateBlockInHomePage(homePageId, blockId, formDataToSend);
            } else if (homePageId) {
                // Add new block
                response = await apiAddBlockToHomePage(homePageId, formDataToSend);
            } else {
                // Local save (for immediate UI update)
                onSave({
                    serviceName: formData.serviceName.trim(),
                    serviceDescription: formData.serviceDescription.trim(),
                    linkPage: formData.linkPage.trim(),
                    imageUrl: formData.imageUrl || (formData.imageFile ? URL.createObjectURL(formData.imageFile) : '')
                });
                onClose();
                return;
            }

            // If API call was successful
            if (response.data.success) {
                // Get the HTTP URL from the response, not blob
                const imageUrl = response.data.data?.imageUrl || 
                               (formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl);
                
                onSave({
                    serviceName: formData.serviceName.trim(),
                    serviceDescription: formData.serviceDescription.trim(),
                    linkPage: formData.linkPage.trim(),
                    imageUrl: imageUrl
                });
                onClose();
            } else {
                throw new Error(response.data.message || 'Failed to save block');
            }
            
        } catch (error) {
            console.error('Error saving block:', error);
            alert(error.message || 'Failed to save block. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-1">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">
                    {editMode ? 'Edit Service Card' : 'Add New Service Card'}
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-xl p-1"
                    type="button"
                    disabled={loading}
                >
                    ✕
                </button>
            </div>

            {/* Service Name */}
            <div>
                <label className="block text-sm font-medium text-black mb-2">
                    Service Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter service name"
                    value={formData.serviceName}
                    onChange={(e) => handleInputChange('serviceName', e.target.value)}
                    disabled={loading}
                    className={`w-full px-4 py-2.5 border ${
                        errors.serviceName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm rounded disabled:bg-gray-50 disabled:cursor-not-allowed`}
                />
                {errors.serviceName && (
                    <p className="text-red-500 text-xs mt-1">{errors.serviceName}</p>
                )}
            </div>

            {/* Link Page */}
            <div>
                <label className="block text-sm font-medium text-black mb-2">
                    Link Page
                </label>
                <input
                    type="url"
                    placeholder="https://example.com/service"
                    value={formData.linkPage}
                    onChange={(e) => handleInputChange('linkPage', e.target.value)}
                    disabled={loading}
                    className={`w-full px-4 py-2.5 border ${
                        errors.linkPage ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm rounded disabled:bg-gray-50 disabled:cursor-not-allowed`}
                />
                {errors.linkPage && (
                    <p className="text-red-500 text-xs mt-1">{errors.linkPage}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                    Optional. URL to link this service card to a specific page. Must include http:// or https://
                </p>
            </div>

            {/* Service Description */}
            <div>
                <label className="block text-sm font-medium text-black mb-2">
                    Service Description
                </label>
                <textarea
                    placeholder="Enter service description"
                    value={formData.serviceDescription}
                    onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                    disabled={loading}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm resize-none rounded disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Optional. Describe what this service includes.
                </p>
            </div>

            {/* Image Upload Section */}
            <div>
                <label className="block text-sm font-medium text-black mb-2">
                    Service Image {!editMode && <span className="text-red-500">*</span>}
                </label>
                
                {errors.image && (
                    <p className="text-red-500 text-xs mb-3">{errors.image}</p>
                )}

                <div className="space-y-4">
                    {/* Image Preview */}
                    {(formData.imagePreview || formData.imageUrl) && (
                        <div className="relative inline-block">
                            <div className="w-48 h-48 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                <img 
                                    src={formData.imagePreview || formData.imageUrl} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                                    }}
                                />
                            </div>
                            {!loading && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    disabled={loading}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    )}

                    {/* Upload Controls */}
                    <div className="space-y-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                            disabled={loading}
                        />
                        <div className="flex items-center gap-3">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <div className={`
                                    px-4 py-2 border border-gray-300 bg-white text-gray-700 
                                    hover:bg-gray-50 hover:border-gray-400 text-sm rounded
                                    flex items-center gap-2 transition-colors duration-200
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                                `}>
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            {formData.imagePreview || formData.imageUrl ? 'Change Image' : 'Upload Image'}
                                        </>
                                    )}
                                </div>
                            </label>
                            
                            {(formData.imagePreview || formData.imageUrl) && !loading && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="px-3 py-2 text-sm text-gray-600 hover:text-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        
                        <p className="text-xs text-gray-500">
                            Recommended: 400x300px or similar aspect ratio. JPG, PNG, GIF or WebP. Max 5MB.
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                    onClick={onClose}
                    type="button"
                    disabled={loading}
                    className="px-6 py-2.5 border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {editMode ? 'Update Card' : 'Add Card'}
                </button>
            </div>
        </div>
    );
};

export default AddNewServiceCard;