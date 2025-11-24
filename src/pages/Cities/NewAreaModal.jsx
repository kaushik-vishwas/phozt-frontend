import React, { useState } from 'react';

const NewAreaModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        areaName: '',
        pincode: '',
        status: 'Active'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData({ areaName: '', pincode: '', status: 'Active' });
    };

    const handleCancel = () => {
        setFormData({ areaName: '', pincode: '', status: 'Active' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-2 border-black w-[700px] max-w-[90%]">
                {/* Header */}
                <div className="border-b-2 border-black px-6 py-4">
                    <h2 className="text-2xl font-semibold text-black">Add New Local Area</h2>
                </div>

                {/* Form Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Area Name */}
                    <div>
                        <label className="block text-lg font-medium text-black mb-2">
                            Area Name
                        </label>
                        <input
                            type="text"
                            name="areaName"
                            value={formData.areaName}
                            onChange={handleChange}
                            placeholder="Enter The local Area Name"
                            className="w-[500px] px-4 py-3 border border-black text-sm placeholder:text-gray-400 focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Area Pincode */}
                    <div>
                        <label className="block text-lg font-medium text-black mb-2">
                            Area Pincode
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Enter The local Area Pincode"
                            className="w-[500px] px-4 py-3 border border-black text-sm placeholder:text-gray-400 focus:outline-none focus:border-black"
                        />
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
                            className="w-[500px] px-4 py-3 border border-black text-sm text-gray-400 appearance-none bg-white focus:outline-none focus:border-black cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '12px'
                            }}
                        >
                            <option value="Active">Active/inactive</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
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
                        className="px-6 py-2 border border-black bg-white text-black font-medium hover:bg-gray-50 transition-colors"
                    >
                        Save Area
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewAreaModal;