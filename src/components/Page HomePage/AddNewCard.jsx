import React, { useState } from 'react';
import imgUpload from '../../assets/Icons/imgUpload.png';

const AddNewCard = ({ onClose }) => {
    const [formData, setFormData] = useState({
        serviceImage: null,
        serviceTitle: '',
        serviceDescription: '',
        linkPage: ''
    });
    const [dragActive, setDragActive] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!validTypes.includes(file.type)) {
            alert('Please upload only JPG or PNG images');
            return;
        }

        if (file.size > maxSize) {
            alert('File size must be less than 2MB');
            return;
        }

        setFormData(prev => ({
            ...prev,
            serviceImage: file
        }));
    };

    const handleCancel = () => {
        if (onClose) onClose();
    };

    const handlePublish = () => {
        console.log('Publishing card:', formData);
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-black">
                        Add A New Service Card
                    </h2>
                    <button onClick={handleCancel} className="text-black hover:text-black">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* Service Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Service Image
                        </label>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-black'
                                } p-12 text-center`}
                        >
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleFileInput}
                                className="hidden"
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer flex flex-col items-center"
                            >
                                <img
                                    src={imgUpload}
                                    alt="Upload"
                                    className="w-10 h-10 mb-3"
                                />
                                <p className="text-sm text-black">
                                    Click to upload service image or drag and drop
                                </p>
                                <p className="text-xs text-black mt-1">
                                    PNG, JPG up to 2MB
                                </p>
                            </label>
                            {formData.serviceImage && (
                                <p className="text-sm text-green-600 mt-2">
                                    {formData.serviceImage.name}
                                </p>
                            )}
                        </div>
                    </div>


                    {/* Service Title */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Service Title
                        </label>
                        <input
                            type="text"
                            placeholder="Eg: Birthday"
                            value={formData.serviceTitle}
                            onChange={(e) => handleInputChange('serviceTitle', e.target.value)}
                            className="w-full px-4 py-2.5 border placeholder:text-black border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        />
                    </div>

                    {/* Service Description */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Service Description
                        </label>
                        <textarea
                            placeholder="Eg: Birthday"
                            value={formData.serviceDescription}
                            onChange={(e) => handleInputChange('serviceDescription', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none "
                        />
                        <div className="text-right text-xs text-black mt-1">
                            {formData.serviceDescription.length}/250
                        </div>
                    </div>

                    {/* Link Page */}
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Link Page
                        </label>
                        <input
                            type="text"
                            placeholder="Eg: Birthday photography bengaluru"
                            value={formData.linkPage}
                            onChange={(e) => handleInputChange('linkPage', e.target.value)}
                            className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm "
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-end gap-3 flex-shrink-0">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 border border-black font-medium text-black hover:bg-gray-50 text-sm "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePublish}
                        className="px-6 py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800 text-sm flex items-center gap-2 "
                    >
                        Publish
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewCard;
