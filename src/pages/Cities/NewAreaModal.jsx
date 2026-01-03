import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NewAreaModal = ({ isOpen, onClose, onSave, cityPinCode, editingArea }) => {
    const [formData, setFormData] = useState({
        areaName: '',
        pinCode: '', // Changed from pincode to pinCode
        status: 'active' // Changed to lowercase
    });
    const [errors, setErrors] = useState({});

    // Initialize form when editing or when modal opens
    useEffect(() => {
        if (editingArea) {
            setFormData({
                areaName: editingArea.areaName || '',
                pinCode: editingArea.pinCode || cityPinCode || '', // Use pinCode from area
                status: editingArea.status || 'active' // Use status from area
            });
        } else {
            setFormData({
                areaName: '',
                pinCode: cityPinCode || '',
                status: 'active'
            });
        }
        setErrors({});
    }, [editingArea, cityPinCode, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Convert status value to lowercase for backend
        if (name === 'status') {
            setFormData(prev => ({
                ...prev,
                [name]: value.toLowerCase()
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.areaName.trim()) {
            newErrors.areaName = 'Area name is required';
        } else if (formData.areaName.length < 2) {
            newErrors.areaName = 'Area name must be at least 2 characters';
        }
        
        if (!formData.pinCode.trim()) {
            newErrors.pinCode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pinCode)) {
            newErrors.pinCode = 'Pincode must be 6 digits';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }
        
        // Prepare data for API
        const dataToSend = {
            areaName: formData.areaName.trim(),
            pinCode: formData.pinCode.trim(), // Ensure pinCode (not pincode)
            status: formData.status // Should be 'active' or 'inactive'
        };
        
        onSave(dataToSend);
        setFormData({ areaName: '', pinCode: '', status: 'active' });
    };

    const handleCancel = () => {
        setFormData({ areaName: '', pinCode: '', status: 'active' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-2 border-black w-[700px] max-w-[90%]">
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-black px-6 py-4">
                    <h2 className="text-2xl font-semibold text-black">
                        {editingArea ? 'Edit Local Area' : 'Add New Local Area'}
                    </h2>
                    <button
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Area Name */}
                    <div>
                        <label className="block text-lg font-medium text-black mb-2">
                            Area Name *
                        </label>
                        <input
                            type="text"
                            name="areaName"
                            value={formData.areaName}
                            onChange={handleChange}
                            placeholder="Enter the local area name"
                            className={`w-[500px] px-4 py-3 border text-sm placeholder:text-gray-400 focus:outline-none focus:border-black ${errors.areaName ? 'border-red-500' : 'border-black'}`}
                        />
                        {errors.areaName && (
                            <p className="mt-1 text-sm text-red-600">{errors.areaName}</p>
                        )}
                    </div>

                    {/* Area Pincode */}
                    <div>
                        <label className="block text-lg font-medium text-black mb-2">
                            Area Pincode *
                        </label>
                        <input
                            type="text"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleChange}
                            placeholder="Enter 6-digit pincode"
                            maxLength="6"
                            className={`w-[500px] px-4 py-3 border text-sm placeholder:text-gray-400 focus:outline-none focus:border-black ${errors.pinCode ? 'border-red-500' : 'border-black'}`}
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            City default pincode: {cityPinCode || 'Not set'}
                        </p>
                        {errors.pinCode && (
                            <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-lg font-medium text-black mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-[500px] px-4 py-3 border border-black text-sm text-gray-900 appearance-none bg-white focus:outline-none focus:border-black cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '12px'
                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-black bg-white text-black font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 border border-black bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                        {editingArea ? 'Update Area' : 'Save Area'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewAreaModal;