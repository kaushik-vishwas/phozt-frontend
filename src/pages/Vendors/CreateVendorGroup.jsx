import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Plus, X, Search, Users, AlertCircle } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import { createVendorGroup, fetchVendorsByService, clearError, clearVendorsList } from '../../redux/adminSlice';

const CreateVendorGroup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { 
        vendorsByService, 
        createGroupLoading, 
        createGroupError,
        vendorsLoading,
        vendorsError
    } = useSelector((state) => state.admin);

    const [formData, setFormData] = useState({
        groupName: '',
        mainService: '',
        city: '',
        memberIds: []
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [showVendorList, setShowVendorList] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const services = ['Photography', 'Decoration', 'Makeup', 'Catering'];
    const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

    // Debug: Log state changes
    useEffect(() => {
        console.log('🔍 VENDORS BY SERVICE STATE:', vendorsByService);
        console.log('🔍 VENDORS LOADING:', vendorsLoading);
        console.log('🔍 VENDORS ERROR:', vendorsError);
        console.log('🔍 SELECTED SERVICE:', formData.mainService);
    }, [vendorsByService, vendorsLoading, vendorsError, formData.mainService]);

    // Fetch vendors when service is selected
    useEffect(() => {
        if (formData.mainService) {
            console.log('🔄 FETCHING VENDORS FOR SERVICE:', formData.mainService);
            dispatch(fetchVendorsByService(formData.mainService));
        } else {
            console.log('🔄 CLEARING VENDORS LIST - NO SERVICE SELECTED');
            dispatch(clearVendorsList());
        }
    }, [formData.mainService, dispatch]);

    // Clear errors when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Filter vendors based on search term
    const filteredVendors = Array.isArray(vendorsByService) 
        ? vendorsByService.filter(vendor => {
            if (!vendor) return false;
            return (
                vendor.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.mobile?.includes(searchTerm)
            );
        })
        : [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Reset selected vendors when service changes
        if (name === 'mainService') {
            console.log('🔄 SERVICE CHANGED TO:', value);
            setSelectedVendors([]);
            setFormData(prev => ({ ...prev, memberIds: [] }));
            setSearchTerm('');
            setShowVendorList(false);
        }
    };

    const handleVendorSelect = (vendor) => {
        console.log('✅ SELECTING VENDOR:', vendor);
        if (!selectedVendors.find(v => v._id === vendor._id)) {
            const newSelectedVendors = [...selectedVendors, vendor];
            setSelectedVendors(newSelectedVendors);
            setFormData(prev => ({
                ...prev,
                memberIds: newSelectedVendors.map(v => v._id)
            }));
        }
        setSearchTerm('');
        setShowVendorList(false);
    };

    const handleRemoveVendor = (vendorId) => {
        console.log('❌ REMOVING VENDOR:', vendorId);
        const newSelectedVendors = selectedVendors.filter(v => v._id !== vendorId);
        setSelectedVendors(newSelectedVendors);
        setFormData(prev => ({
            ...prev,
            memberIds: newSelectedVendors.map(v => v._id)
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.groupName.trim()) {
            errors.groupName = 'Group name is required';
        } else if (formData.groupName.trim().length < 3) {
            errors.groupName = 'Group name must be at least 3 characters';
        }

        if (!formData.mainService) {
            errors.mainService = 'Please select a service';
        }

        if (!formData.city) {
            errors.city = 'Please select a city';
        }

        if (formData.memberIds.length === 0) {
            errors.memberIds = 'Please select at least one vendor';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        console.log('🚀 SUBMITTING FORM DATA:', formData);

        try {
            const result = await dispatch(createVendorGroup(formData)).unwrap();
            console.log('✅ GROUP CREATED SUCCESSFULLY:', result);
            
            alert('Vendor group created successfully!');
            navigate('/vendor-main');
            
        } catch (error) {
            console.error('❌ FAILED TO CREATE GROUP:', error);
        }
    };

    const handleBack = () => {
        navigate('/vendor-main');
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.vendor-search-container')) {
            setShowVendorList(false);
        }
    };

    // Add click outside listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex ml-64 flex-col">
                {/* Header */}
                <div className="bg-white border-b border-black px-6 py-4 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Vendor Groups
                        </button>
                        <h1 className="text-2xl font-semibold text-black">
                            Create Vendor Group
                        </h1>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border border-black rounded-lg p-6 shadow-sm">
                            {/* Error Messages */}
                            {createGroupError && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-800">
                                        <AlertCircle size={18} />
                                        <span className="font-medium">Error creating group:</span>
                                        <span>{createGroupError}</span>
                                    </div>
                                </div>
                            )}

                            {vendorsError && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-yellow-800">
                                        <AlertCircle size={18} />
                                        <span className="font-medium">Warning:</span>
                                        <span>{vendorsError}</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Group Name */}
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Group Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="groupName"
                                        value={formData.groupName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border outline-none focus:border-blue-500 rounded ${
                                            formErrors.groupName ? 'border-red-500' : 'border-black'
                                        }`}
                                        placeholder="Enter a descriptive group name"
                                        disabled={createGroupLoading}
                                    />
                                    {formErrors.groupName && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.groupName}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Main Service */}
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">
                                            Main Service *
                                        </label>
                                        <select
                                            name="mainService"
                                            value={formData.mainService}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border outline-none focus:border-blue-500 rounded bg-white ${
                                                formErrors.mainService ? 'border-red-500' : 'border-black'
                                            }`}
                                            disabled={createGroupLoading}
                                        >
                                            <option value="">Select a service</option>
                                            {services.map((service, index) => (
                                                <option key={index} value={service}>
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.mainService && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.mainService}</p>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">
                                            City *
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border outline-none focus:border-blue-500 rounded bg-white ${
                                                formErrors.city ? 'border-red-500' : 'border-black'
                                            }`}
                                            disabled={createGroupLoading}
                                        >
                                            <option value="">Select a city</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.city && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Vendor Selection */}
                                <div className="vendor-search-container">
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Select Vendors *
                                        {vendorsByService.length > 0 && (
                                            <span className="text-gray-500 ml-2">
                                                ({vendorsByService.length} vendors available)
                                            </span>
                                        )}
                                    </label>
                                    
                                    {/* Selected Vendors Display */}
                                    {selectedVendors.length > 0 && (
                                        <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Users size={18} className="text-gray-600" />
                                                <h4 className="text-sm font-medium text-black">
                                                    Selected Vendors ({selectedVendors.length})
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                {selectedVendors.map(vendor => (
                                                    <div 
                                                        key={vendor._id} 
                                                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                                                    >
                                                        <div className="flex-1">
                                                            <div className="font-medium text-black">
                                                                {vendor.businessName}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {vendor.email} • {vendor.mobile}
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveVendor(vendor._id)}
                                                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                                            disabled={createGroupLoading}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Vendor Search and Selection */}
                                    <div className="relative">
                                        <div className={`flex items-center border px-3 rounded ${
                                            formErrors.memberIds ? 'border-red-500' : 'border-black'
                                        }`}>
                                            <Search size={18} className="text-black mr-2" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setShowVendorList(true);
                                                }}
                                                onFocus={() => {
                                                    if (formData.mainService) {
                                                        setShowVendorList(true);
                                                    }
                                                }}
                                                placeholder={
                                                    formData.mainService 
                                                        ? "Search vendors by name, email, or mobile..." 
                                                        : "Please select a service first to see available vendors"
                                                }
                                                className="py-2 text-sm w-full outline-none bg-transparent"
                                                disabled={!formData.mainService || createGroupLoading}
                                            />
                                            {vendorsLoading && (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 ml-2"></div>
                                            )}
                                        </div>

                                        {formErrors.memberIds && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.memberIds}</p>
                                        )}

                                        {/* Debug Info */}
                                        <div className="mt-2 text-xs text-gray-500">
                                            Debug: Service: "{formData.mainService}", 
                                            Vendors loaded: {vendorsByService.length}, 
                                            Filtered: {filteredVendors.length}
                                        </div>

                                        {/* Vendor Dropdown List */}
                                        {showVendorList && formData.mainService && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                {filteredVendors.length > 0 ? (
                                                    filteredVendors.map(vendor => {
                                                        const isSelected = selectedVendors.find(v => v._id === vendor._id);
                                                        return (
                                                            <div
                                                                key={vendor._id}
                                                                onClick={() => !isSelected && handleVendorSelect(vendor)}
                                                                className={`p-3 cursor-pointer border-b border-gray-200 last:border-b-0 ${
                                                                    isSelected 
                                                                        ? 'bg-blue-50 text-blue-700' 
                                                                        : 'hover:bg-gray-100'
                                                                }`}
                                                            >
                                                                <div className="font-medium">
                                                                    {vendor.businessName || 'Unnamed Business'}
                                                                    {isSelected && (
                                                                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                                            Selected
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    {vendor.email || 'No email'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    Mobile: {vendor.mobile || 'No mobile'}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500">
                                                        {vendorsLoading 
                                                            ? 'Loading vendors...' 
                                                            : searchTerm 
                                                                ? 'No vendors match your search'
                                                                : 'No vendors found for this service'
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {!formData.mainService && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Please select a service first to see available vendors
                                        </p>
                                    )}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        disabled={createGroupLoading}
                                        className="px-6 py-2 border border-black text-black hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createGroupLoading}
                                        className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 rounded-lg"
                                    >
                                        {createGroupLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Creating Group...
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={18} />
                                                Create Vendor Group
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateVendorGroup;