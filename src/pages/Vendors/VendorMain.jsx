import React, { useState, useEffect } from 'react';
import { Search, Plus, Users, MapPin, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "../../components/Sidebar";
import photography from "../../assets/Icons/photography.png";
import makeup1 from "../../assets/Icons/makeup1.png";
import decoration from "../../assets/Icons/decoration.png";
import categoring from "../../assets/Icons/categoring.png";
import { fetchVendorGroups } from '../../redux/adminSlice';

const VendorMain = () => {
    const [selectedCity, setSelectedCity] = useState(''); // Empty string for "All"
    const [activeTab, setActiveTab] = useState('services'); // 'services' or 'groups'
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { vendorGroups, vendorGroupsLoading, vendorGroupsError } = useSelector((state) => state.admin);

    const cities = ['All', 'Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

    // Service icons mapping
    const serviceIcons = {
        'Photography': photography,
        'Makeup Artist': makeup1,
        'Catering Services': categoring,
        'Decoration': decoration,
    };

    // Default services data (fallback)
    const defaultServices = [
        {
            id: 1,
            title: 'Photography',
            description: 'Wedding, birthday and parties photography services',
            vendors: 0
        },
        {
            id: 2,
            title: 'Makeup Artist',
            description: 'Bridal makeup and beauty services',
            vendors: 0
        },
        {
            id: 3,
            title: 'Catering Services',
            description: 'Food and beverage services for events',
            vendors: 0
        },
        {
            id: 4,
            title: 'Decoration',
            description: 'Event decoration and floral arrangements',
            vendors: 0
        }
    ];

    // Transform vendor groups to services format - FILTER OUT SERVICES WITH 0 VENDORS
    const transformGroupsToServices = (groups) => {
        const serviceCounts = {};
        
        groups.forEach(group => {
            const service = group.mainService;
            if (!serviceCounts[service]) {
                serviceCounts[service] = {
                    count: 0,
                    description: getServiceDescription(service)
                };
            }
            serviceCounts[service].count += group.members?.length || 0;
        });

        // Filter out services with 0 vendors and map to result
        return Object.keys(serviceCounts)
            .filter(service => serviceCounts[service].count > 0) // Only include services with vendors
            .map((service, index) => ({
                id: index + 1,
                title: service,
                description: serviceCounts[service].description,
                vendors: serviceCounts[service].count
            }));
    };

    const getServiceDescription = (service) => {
        const descriptions = {
            'Photography': 'Wedding, birthday and parties photography services',
            'Makeup Artist': 'Bridal makeup and beauty services',
            'Catering Services': 'Food and beverage services for events',
            'Decoration': 'Event decoration and floral arrangements'
        };
        return descriptions[service] || `${service} services`;
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get services data - only show services that have vendors
    const services = vendorGroups.length > 0 
        ? transformGroupsToServices(vendorGroups)
        : []; // Show empty array instead of defaultServices when no groups

    // Filter vendor groups by selected city - show all if "All" or empty
    const filteredVendorGroups = selectedCity && selectedCity !== 'All' 
        ? vendorGroups.filter(group => group.city === selectedCity)
        : vendorGroups;

    useEffect(() => {
        // Fetch all vendor groups when component mounts
        dispatch(fetchVendorGroups('')); // Empty string to get all groups
    }, [dispatch]);

    const handleCityChange = (city) => {
        setSelectedCity(city);
        // Fetch groups based on city selection
        if (city && city !== 'All') {
            dispatch(fetchVendorGroups(city));
        } else {
            // Fetch all groups when "All" is selected
            dispatch(fetchVendorGroups(''));
        }
    };

    const handleCreateVendorGroup = () => {
        navigate('/create-vendor-group');
    };

    const handleViewGroupDetails = (groupId) => {
        navigate(`/vendor-group-details/${groupId}`);
    };

    const handleEditGroup = (groupId) => {
        navigate(`/edit-vendor-group/${groupId}`);
    };

    const handleDeleteGroup = (groupId) => {
        if (window.confirm('Are you sure you want to delete this vendor group?')) {
            // Dispatch delete action here
            console.log('Delete group:', groupId);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex ml-64 flex-col">
                {/* Header */}
                <div className="bg-white border-b border-black px-6 py-4 flex justify-between items-start flex-shrink-0">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center mt-2 w-full">
                            <div className="flex items-center border border-black px-2 w-[70%]">
                                <Search size={18} className="text-black mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search vendor groups..."
                                    className="py-2 text-sm w-full outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                {/* Create Vendor Group Button */}
                                <button
                                    onClick={handleCreateVendorGroup}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    <Plus size={18} />
                                    Create Vendor Group
                                </button>
                                
                                <div className="flex items-center gap-3 ml-4">
                                    <span className="text-black font-medium">Alex</span>
                                    <div className="w-10 h-10 bg-gray-300 flex items-center rounded-full justify-center text-white font-semibold">A</div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-[36px] font-semibold text-black">
                            Vendor Management
                        </h1>
                        <p className="text-[18px] font-normal text-gray-700">
                            Manage vendor groups and services for lead distribution
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Error Message */}
                        {vendorGroupsError && (
                            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                                {vendorGroupsError}
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab('services')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'services'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Services Overview ({services.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('groups')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'groups'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Vendor Groups ({vendorGroups.length})
                                    </button>
                                </nav>
                            </div>
                        </div>

                        <div className="bg-white border border-black p-6 rounded-lg">
                            {/* City Dropdown */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-black mb-2">
                                    Filter by City
                                </label>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-black" />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => handleCityChange(e.target.value)}
                                        className="px-4 py-2 border border-black outline-none focus:border-gray-400 bg-white rounded"
                                        disabled={vendorGroupsLoading}
                                    >
                                        {cities.map((city, idx) => (
                                            <option key={idx} value={city === 'All' ? '' : city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedCity && selectedCity !== 'All' && (
                                        <span className="text-sm text-gray-600">
                                            Showing groups from {selectedCity}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Loading State */}
                            {vendorGroupsLoading && (
                                <div className="flex justify-center items-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <span className="ml-3 text-gray-600">Loading vendor groups...</span>
                                </div>
                            )}

                            {/* Services Tab Content */}
                            {!vendorGroupsLoading && activeTab === 'services' && (
                                <div>
                                    <div className="mb-4 flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Services Overview
                                        </h3>
                                        <span className="text-sm text-gray-600">
                                            {services.length} active services • {filteredVendorGroups.length} groups total
                                        </span>
                                    </div>
                                    
                                    {services.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users size={64} className="mx-auto text-gray-400 mb-4" />
                                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                                No active services found
                                            </h3>
                                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                                {vendorGroups.length === 0 
                                                    ? 'No vendor groups created yet. Create your first vendor group to see services.'
                                                    : 'No services have vendors assigned. Add vendors to groups to see services here.'
                                                }
                                            </p>
                                            <button
                                                onClick={handleCreateVendorGroup}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                                            >
                                                <Plus size={20} />
                                                Create Vendor Group
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-6">
                                            {services.map((service) => {
                                                const serviceImage = serviceIcons[service.title] || photography;

                                                return (
                                                    <div
                                                        key={service.id}
                                                        className="border border-black p-4 hover:shadow-md transition-shadow rounded-lg"
                                                    >
                                                        <div className="w-6 h-6 mb-3">
                                                            <img
                                                                src={serviceImage}
                                                                alt={service.title}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>

                                                        <h3 className="text-lg font-semibold text-black mb-2">
                                                            {service.title}
                                                        </h3>

                                                        <p className="text-sm text-black mb-4">
                                                            {service.description}
                                                        </p>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-black font-medium">
                                                                {service.vendors} {service.vendors === 1 ? 'Vendor' : 'Vendors'}
                                                            </span>
                                                            <button
                                                                onClick={() => navigate('/category-detail', { 
                                                                    state: { 
                                                                        service: service.title,
                                                                        city: selectedCity 
                                                                    } 
                                                                })}
                                                                className="px-3 py-1 text-sm border border-black hover:bg-gray-50 transition-colors rounded"
                                                            >
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Vendor Groups Tab Content */}
                            {!vendorGroupsLoading && activeTab === 'groups' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            All Vendor Groups
                                        </h3>
                                        <span className="text-sm text-gray-600">
                                            {filteredVendorGroups.length} groups found
                                        </span>
                                    </div>

                                    {filteredVendorGroups.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users size={64} className="mx-auto text-gray-400 mb-4" />
                                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                                No vendor groups found
                                            </h3>
                                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                                {selectedCity 
                                                    ? `No vendor groups found in ${selectedCity}. Create your first vendor group to get started.`
                                                    : 'No vendor groups found. Create your first vendor group to get started.'
                                                }
                                            </p>
                                            <button
                                                onClick={handleCreateVendorGroup}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                                            >
                                                <Plus size={20} />
                                                Create Your First Vendor Group
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {filteredVendorGroups.map((group) => (
                                                <div
                                                    key={group._id}
                                                    className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-all bg-white"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <h3 className="text-xl font-bold text-gray-900">
                                                                    {group.groupName}
                                                                </h3>
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                    {group.mainService}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin size={16} className="text-gray-400" />
                                                                    <span className="font-medium">{group.city}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Users size={16} className="text-gray-400" />
                                                                    <span>{group.members?.length || 0} vendors</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar size={16} className="text-gray-400" />
                                                                    <span>Created {formatDate(group.createdAt)}</span>
                                                                </div>
                                                            </div>

                                                            {/* Vendor Members List */}
                                                            {group.members && group.members.length > 0 && (
                                                                <div className="mt-4">
                                                                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                                        Group Members:
                                                                    </h4>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {group.members.map((member, index) => (
                                                                            <span
                                                                                key={member._id || index}
                                                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200"
                                                                            >
                                                                                {member.businessName || member.contactPersonName || 'Unnamed Vendor'}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2 ml-6">
                                                            <button
                                                                onClick={() => handleViewGroupDetails(group._id)}
                                                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-300"
                                                                title="View Details"
                                                            >
                                                                <Eye size={16} />
                                                                <span className="text-sm">View</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditGroup(group._id)}
                                                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-300"
                                                                title="Edit Group"
                                                            >
                                                                <Edit size={16} />
                                                                <span className="text-sm">Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteGroup(group._id)}
                                                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-300"
                                                                title="Delete Group"
                                                            >
                                                                <Trash2 size={16} />
                                                                <span className="text-sm">Delete</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorMain;