import React, { useState, useEffect } from 'react';
import { Search, Users, Phone, Mail, Building } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "../../components/Sidebar";
import user from "../../assets/Icons/user.png";
import photography from "../../assets/Icons/photography.png";
import profile from "../../assets/Icons/profile.png";
import edit1 from "../../assets/Icons/edit1.png";
import exportt from "../../assets/Icons/export.png";
import EditCategoryDetails from "../../pages/Vendors/EditCategoryDeatails";
import { fetchVendorGroups } from '../../redux/adminSlice';

const CategoryDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { vendorGroups, vendorGroupsLoading, vendorGroupsError } = useSelector((state) => state.admin);

    // Get service and city from navigation state or use defaults
    const { service: routeService, city: routeCity } = location.state || {};
    
    const [selectedCity, setSelectedCity] = useState(routeCity || '');
    const [selectedService, setSelectedService] = useState(routeService || 'Photography');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const services = ['Photography', 'Decoration', 'Makeup', 'Catering'];
    const cities = ['All', 'Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

    // Filter vendor groups based on selected service and city
    const filteredGroups = vendorGroups.filter(group => {
        const serviceMatch = group.mainService === selectedService;
        const cityMatch = !selectedCity || selectedCity === 'All' || group.city === selectedCity;
        return serviceMatch && cityMatch;
    });

    // Extract all vendors from filtered groups
    const allVendors = filteredGroups.flatMap(group => 
        group.members?.map(member => ({
            ...member,
            groupName: group.groupName,
            groupId: group._id,
            city: group.city
        })) || []
    );

    // Calculate statistics
    const totalVendors = allVendors.length;
    const totalGroups = filteredGroups.length;
    const uniqueCities = [...new Set(filteredGroups.map(group => group.city))];

    // Service cards with dynamic data
    const serviceCards = [
        { 
            id: 1, 
            title: `Total ${selectedService} Vendors`, 
            count: totalVendors, 
            image: photography 
        },
        { 
            id: 2, 
            title: `${selectedService} Vendor Groups`, 
            count: totalGroups, 
            image: user,
            description: 'Active vendor groups in selected location'
        },
        { 
            id: 3, 
            title: 'Cities Coverage', 
            count: uniqueCities.length, 
            image: user,
            description: 'Number of cities with vendor groups'
        },
        { 
            id: 4, 
            title: 'Active Groups', 
            count: filteredGroups.filter(group => group.members?.length > 0).length, 
            image: photography,
            description: 'Groups with active vendors'
        },
    ];

    const getStatusStyle = (status) => {
        return 'text-black bg-gray-50 border border-black-300';
    };

    const handleEditClick = (vendor) => {
        setSelectedVendor(vendor);
        setIsEditModalOpen(true);
    };

    const handleProfileClick = (vendor) => {
        navigate('/category-portfolio', { state: { vendor } });
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
    };

    const handleServiceChange = (service) => {
        setSelectedService(service);
    };

    const handleExportReport = () => {
        // Implement export functionality
        console.log('Exporting report for:', { selectedService, selectedCity, vendors: allVendors });
    };

    const handleAddVendor = () => {
        navigate('/create-vendor-group', { 
            state: { 
                prefillService: selectedService,
                prefillCity: selectedCity !== 'All' ? selectedCity : '' 
            } 
        });
    };

    useEffect(() => {
        // Fetch vendor groups when component mounts or filters change
        dispatch(fetchVendorGroups(selectedCity !== 'All' ? selectedCity : ''));
    }, [dispatch, selectedCity]);

    return (
        <div className="flex h-screen bg-gray-50">
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
                                    placeholder="Search vendors by name, business, or email..."
                                    className="py-2 text-sm w-full outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <span className="text-black font-medium">Alex</span>
                                <div className="w-10 h-10 bg-gray-300 flex items-center rounded-full justify-center text-white font-semibold">A</div>
                            </div>
                        </div>
                        <h1 className="text-[36px] font-semibold text-black">
                            {selectedService} Lead Management
                        </h1>
                        <p className="text-[18px] font-normal text-gray-700">
                            Manage {selectedService.toLowerCase()} vendors and lead distribution
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Filters Row */}
                        <div className="mb-6 flex items-end gap-6">
                            {/* Service Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-black mb-2">
                                    Service Category
                                </label>
                                <select
                                    value={selectedService}
                                    onChange={(e) => handleServiceChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-black outline-none bg-white"
                                >
                                    {services.map((service, idx) => (
                                        <option key={idx} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-black mb-2">
                                    Filter by City
                                </label>
                                <div className="flex items-center gap-2">
                                    <Search size={18} className="text-gray-400" />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => handleCityChange(e.target.value)}
                                        className="w-full px-4 py-2 border border-black outline-none bg-white"
                                    >
                                        {cities.map((city, idx) => (
                                            <option key={idx} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handleExportReport}
                                    className="flex items-center gap-2 px-4 py-2 border border-black bg-white hover:bg-gray-100 text-sm font-medium"
                                >
                                    <img src={exportt} alt="export" className="w-4 h-4" />
                                    Export Report
                                </button>
                                <button 
                                    onClick={handleAddVendor}
                                    className="px-4 py-2 border border-black bg-white text-black hover:bg-gray-100 text-sm font-medium"
                                >
                                    + Add Vendor to Group
                                </button>
                            </div>
                        </div>

                        {/* Loading State */}
                        {vendorGroupsLoading && (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-gray-600">Loading vendor data...</span>
                            </div>
                        )}

                        {/* Error State */}
                        {vendorGroupsError && (
                            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                                Error loading vendor groups: {vendorGroupsError}
                            </div>
                        )}

                        {/* Service Cards */}
                        {!vendorGroupsLoading && (
                            <>
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {serviceCards.map((card) => (
                                        <div key={card.id} className="border border-black p-4 relative bg-white flex flex-col">
                                            <div className="w-6 h-6 mb-3 flex items-center justify-center">
                                                <img src={card.image} alt="icon" className="w-5 h-5 object-contain" />
                                            </div>
                                            <h3 className="text-sm font-medium text-black mb-2 min-h-10">{card.title}</h3>
                                            {card.description && (
                                                <p className="text-xs text-black mb-3">{card.description}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-auto pt-3">
                                                <span className="text-sm text-black font-semibold">
                                                    {card.count} {card.count === 1 ? 'Item' : 'Items'}
                                                </span>
                                                <button className="px-3 py-1 text-xs border border-black hover:bg-gray-50">
                                                    View More
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Vendors Table */}
                                <div className="bg-white border border-black">
                                    <div className="px-6 py-4 border-b border-black flex justify-between items-center">
                                        <h2 className="text-xl font-semibold text-black">
                                            {selectedService} Vendors ({totalVendors})
                                        </h2>
                                        <span className="text-sm text-gray-600">
                                            Showing vendors from {totalGroups} groups
                                            {selectedCity && selectedCity !== 'All' && ` in ${selectedCity}`}
                                        </span>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-black">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border border-black px-6 py-3 text-left text-xs font-semibold text-black">
                                                        Vendor Details
                                                    </th>
                                                    <th className="border border-black px-6 py-3 text-left text-xs font-semibold text-black">
                                                        Business Info
                                                    </th>
                                                    <th className="border border-black px-6 py-3 text-left text-xs font-semibold text-black">
                                                        Group & Location
                                                    </th>
                                                    <th className="border border-black px-6 py-3 text-left text-xs font-semibold text-black">
                                                        Contact
                                                    </th>
                                                    <th className="border border-black px-6 py-3 text-left text-xs font-semibold text-black">
                                                        Status
                                                    </th>
                                                    <th className="border border-black px-6 py-3 text-left text-xs font-semibold text-black">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allVendors.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6" className="border border-black px-6 py-8 text-center text-gray-500">
                                                            <Users size={48} className="mx-auto mb-3 text-gray-400" />
                                                            <p className="text-lg font-medium">No vendors found</p>
                                                            <p className="text-sm mt-1">
                                                                {selectedCity && selectedCity !== 'All' 
                                                                    ? `No ${selectedService.toLowerCase()} vendors found in ${selectedCity}`
                                                                    : `No ${selectedService.toLowerCase()} vendors found`
                                                                }
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    allVendors.map((vendor, idx) => (
                                                        <tr key={`${vendor._id}-${idx}`} className="hover:bg-gray-50">
                                                            <td className="border border-black px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                        <Users size={16} className="text-blue-600" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-medium text-black">
                                                                            {vendor.contactPersonName || 'No Name'}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">
                                                                            {vendor.email}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="border border-black px-6 py-4">
                                                                <div className="flex items-center gap-2 text-sm text-black">
                                                                    <Building size={14} />
                                                                    {vendor.businessName || 'No Business Name'}
                                                                </div>
                                                            </td>
                                                            <td className="border border-black px-6 py-4">
                                                                <div className="text-sm text-black">
                                                                    <div className="font-medium">{vendor.groupName}</div>
                                                                    <div className="text-xs text-gray-500">{vendor.city}</div>
                                                                </div>
                                                            </td>
                                                            <td className="border border-black px-6 py-4">
                                                                <div className="flex items-center gap-2 text-sm text-black">
                                                                    <Phone size={14} />
                                                                    {vendor.mobile || 'No Phone'}
                                                                </div>
                                                            </td>
                                                            <td className="border border-black px-6 py-4">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusStyle('Active')}`}>
                                                                    Active
                                                                </span>
                                                            </td>
                                                            <td className="border border-black px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => handleEditClick(vendor)}
                                                                        className="p-1 hover:bg-gray-100 rounded"
                                                                        title="Edit Vendor"
                                                                    >
                                                                        <img src={edit1} alt="Edit" className="w-4 h-4 object-contain" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleProfileClick(vendor)}
                                                                        className="p-1 hover:bg-gray-100 rounded"
                                                                        title="View Profile"
                                                                    >
                                                                        <img src={profile} alt="Profile" className="w-4 h-4 object-contain" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <EditCategoryDetails
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                vendorData={selectedVendor}
            />
        </div>
    );
};

export default CategoryDetail;