// components/CityManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import city1 from '../../assets/Icons/city1.png';
import {
    fetchCities,
    fetchCityStatistics,
    toggleCityStatus,
    deleteCity,
    clearError,
    clearSuccess,
    fetchCitiesWithPagination,
    createNewCity
} from '../../redux/citiesSlice';

const CityManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [showAddCityModal, setShowAddCityModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        cityName: '',
        pinCode: '',
        isActive: true,
        areas: []
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get state from Redux store
    const {
        cities,
        statistics,
        loading,
        error,
        success,
        pagination
    } = useSelector((state) => state.cities);

    // Fetch cities and statistics on component mount
    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchCityStatistics());
    }, [dispatch]);

    // Handle success/error messages
    useEffect(() => {
        if (success) {
            // Close modal and refresh data on successful city creation
            if (showAddCityModal) {
                setShowAddCityModal(false);
                resetForm();
                dispatch(fetchCities());
                dispatch(fetchCityStatistics());
            }
            dispatch(clearSuccess());
        }
        if (error) {
            console.error('Error:', error);
            dispatch(clearError());
        }
    }, [success, error, dispatch, showAddCityModal]);

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.cityName.trim()) {
            newErrors.cityName = 'City name is required';
        } else if (formData.cityName.length < 2) {
            newErrors.cityName = 'City name must be at least 2 characters';
        }

        if (!formData.pinCode.trim()) {
            newErrors.pinCode = 'Pin code is required';
        } else if (!/^\d{6}$/.test(formData.pinCode)) {
            newErrors.pinCode = 'Pin code must be 6 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await dispatch(createNewCity(formData)).unwrap();
            // Success is handled in useEffect
        } catch (err) {
            console.error('Failed to create city:', err);
            setErrors(prev => ({
                ...prev,
                submit: err || 'Failed to create city'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            cityName: '',
            pinCode: '',
            isActive: true,
            areas: []
        });
        setErrors({});
    };

    // Handle modal open/close
    const handleOpenAddCityModal = () => {
        resetForm();
        setShowAddCityModal(true);
    };

    const handleCloseAddCityModal = () => {
        setShowAddCityModal(false);
        resetForm();
    };

    // Handle status toggle
    const handleToggleStatus = async (cityId, currentStatus) => {
        await dispatch(toggleCityStatus(cityId));
        dispatch(fetchCities());
    };

    // Handle city deletion
    const handleDeleteCity = async (cityId) => {
        if (window.confirm('Are you sure you want to delete this city?')) {
            await dispatch(deleteCity(cityId));
            dispatch(fetchCityStatistics());
        }
    };

    // Handle pagination
    const handlePageChange = useCallback((newPage) => {
        setPage(newPage);
        dispatch(fetchCitiesWithPagination({ page: newPage, limit: 10 }));
    }, [dispatch]);

    // Filter cities locally based on search term
    const filteredCities = cities.filter((city) =>
        city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.pinCode.includes(searchTerm)
    );

    // Format areas for display
    const formatAreas = (areas) => {
        if (!areas || areas.length === 0) return 'No areas added';
        return areas.slice(0, 5).map(area => area.areaName).join(', ') +
            (areas.length > 5 ? `... +${areas.length - 5} more` : '');
    };

    // Calculate total areas from all cities
    const totalAreas = cities.reduce((sum, city) => sum + (city.totalLocalAreas || 0), 0);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex ml-64 flex-col">
                {/* Header */}
                <div className="bg-white border-b border-black px-6 py-4 flex justify-between items-start flex-shrink-0">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center mt-2 w-full">
                            <div className="flex items-center border border-black px-2 w-[70%]">
                                <Search size={18} className="text-black mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search anything here....."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="py-2 text-sm w-full outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                                <span className="text-gray-900 font-medium">Alex</span>
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                            </div>
                        </div>
                        <h1 className="text-[32px] font-semibold text-black">
                            City & Local Area Management
                        </h1>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white shadow-sm border border-black p-6">
                        {/* Stats Cards */}
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 border border-black">
                                    <div className="text-2xl font-bold text-black mb-1">
                                        {loading ? '...' : statistics?.totalCities || cities.length}
                                    </div>
                                    <div className="text-[20px] text-black flex items-center justify-between">
                                        <span>Cities</span>
                                        <img src={city1} alt="city icon" className="w-10 h-10 object-contain" />
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 border border-black">
                                    <div className="text-2xl font-bold text-black mb-1">
                                        {loading ? '...' : statistics?.totalAreas || totalAreas}
                                    </div>
                                    <div className="text-[20px] text-black flex items-center justify-between">
                                        <span>Local Areas</span>
                                        <img src={city1} alt="city icon" className="w-10 h-10 object-contain" />
                                    </div>
                                </div>
                            </div>

                            {/* Search and Add */}
                            <div className="flex gap-3 mb-4">
                                <div className="flex-1 relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                                    <input
                                        type="text"
                                        placeholder="Search cities by name or pincode"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-[450px] pl-10 pr-4 py-2 border placeholder:text-black border-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    className="px-4 py-2 bg-white border border-black text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    onClick={handleOpenAddCityModal}
                                >
                                    <Plus className="w-4 h-4" />
                                    Add New City
                                </button>
                            </div>

                            {/* Loading State */}
                            {loading && (
                                <div className="flex justify-center items-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-black" />
                                    <span className="ml-2 text-black">Loading cities...</span>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !loading && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                                    Error: {error}
                                </div>
                            )}

                            {/* City Cards */}
                            {!loading && !error && (
                                <>
                                    <div className="grid grid-cols-3 gap-4">
                                        {filteredCities.map((city) => (
                                            <div
                                                key={city._id}
                                                className="bg-white border border-black p-4 cursor-pointer hover:shadow-md"
                                                onClick={() => navigate('/local-area-details', {
                                                    state: {
                                                        cityId: city._id,
                                                        cityName: city.cityName,
                                                        cityPinCode: city.pinCode,
                                                        cityIsActive: city.isActive,
                                                        cityTotalAreas: city.totalLocalAreas || 0
                                                    }
                                                })}
                                            >
                                                {/* City Header with Active/Inactive */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-black text-lg">{city.cityName}</h3>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleToggleStatus(city._id, city.isActive);
                                                            }}
                                                            className={`px-3 py-1 text-xs border ${city.isActive ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                                                        >
                                                            {city.isActive ? 'Active' : 'Inactive'}
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteCity(city._id);
                                                            }}
                                                            className="px-3 py-1 text-xs border bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* City Details */}
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center py-2 border-b border-black">
                                                        <span className="text-sm text-black">Total Local Areas:</span>
                                                        <span className="text-sm font-medium text-gray-900">{city.totalLocalAreas || 0}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-2 border-b border-black">
                                                        <span className="text-sm text-black">Pin Code:</span>
                                                        <span className="text-sm font-medium text-gray-900">{city.pinCode}</span>
                                                    </div>
                                                    <div className="py-2">
                                                        <span className="text-sm text-black block mb-1">Areas:</span>
                                                        <span className="text-sm text-gray-900">
                                                            {formatAreas(city.areas)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {pagination.totalPages > 1 && (
                                        <div className="flex justify-center items-center mt-6 space-x-2">
                                            <button
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page === 1}
                                                className="px-3 py-1 border border-black disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Previous
                                            </button>
                                            <span className="text-sm text-black">
                                                Page {page} of {pagination.totalPages}
                                            </span>
                                            <button
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page === pagination.totalPages}
                                                className="px-3 py-1 border border-black disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}

                                    {/* No Results */}
                                    {filteredCities.length === 0 && searchTerm && !loading && (
                                        <div className="text-center py-8 text-gray-500">
                                            No cities found matching "{searchTerm}"
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add City Modal */}
            {showAddCityModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-black">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-black">
                            <h2 className="text-xl font-semibold text-black">Add New City</h2>
                            <button
                                onClick={handleCloseAddCityModal}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                disabled={isSubmitting}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* City Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black mb-1">
                                    City Name *
                                </label>
                                <input
                                    type="text"
                                    name="cityName"
                                    value={formData.cityName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border text-sm ${errors.cityName ? 'border-red-500' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    placeholder="Enter city name"
                                    disabled={isSubmitting}
                                />
                                {errors.cityName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.cityName}</p>
                                )}
                            </div>

                            {/* Pin Code */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black mb-1">
                                    Pin Code *
                                </label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border text-sm ${errors.pinCode ? 'border-red-500' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    placeholder="Enter 6-digit pin code"
                                    maxLength="6"
                                    disabled={isSubmitting}
                                />
                                {errors.pinCode && (
                                    <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>
                                )}
                            </div>

                            {/* Active Status */}
                            <div className="mb-6">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-purple-600 border-black rounded focus:ring-purple-500"
                                        disabled={isSubmitting}
                                    />
                                    <span className="text-sm text-black">Set as Active City</span>
                                </label>
                            </div>

                            {/* Submit Error */}
                            {errors.submit && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                                    {errors.submit}
                                </div>
                            )}

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-3 pt-4 border-t border-black">
                                <button
                                    type="button"
                                    onClick={handleCloseAddCityModal}
                                    className="px-4 py-2 border border-black text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        'Add City'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CityManagement;