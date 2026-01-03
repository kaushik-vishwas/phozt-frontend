// pages/Cities/LocalAreaDetails.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import city1 from '../../assets/Icons/city1.png';
import edit1 from '../../assets/Icons/edit1.png';
import delete1 from '../../assets/Icons/delete1.png';
import NewAreaModal from './NewAreaModal';
import {
  fetchAreasByCity,
  addAreaToCity,
  updateAreaInCity,
  deleteAreaFromCity,
  clearError,
  clearSuccess
} from '../../redux/citiesSlice';

const LocalAreaDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get city data from navigation state
    const { 
        cityId, 
        cityName, 
        cityPinCode, 
        cityIsActive,
        cityTotalAreas 
    } = location.state || {};
    
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArea, setEditingArea] = useState(null);
    const [localSuccess, setLocalSuccess] = useState(false);
    const [localError, setLocalError] = useState(null);

    // Get state from Redux store
    const {
        areas,
        loading
    } = useSelector((state) => state.cities);

    // Fetch areas on component mount
    useEffect(() => {
        if (cityId) {
            dispatch(fetchAreasByCity(cityId));
        } else {
            // If no city data in state, redirect back
            navigate('/city-management');
        }
    }, [cityId, dispatch, navigate]);

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingArea(null);
        setLocalError(null);
    };

    // Handle Save Area (Add or Update)
    const handleSaveArea = async (areaData) => {
        if (!cityId) return;
        
        try {
            setLocalError(null);
            
            if (editingArea) {
                // Update existing area
                await dispatch(updateAreaInCity({
                    cityId,
                    areaId: editingArea._id,
                    areaData
                })).unwrap();
            } else {
                // Add new area
                await dispatch(addAreaToCity({
                    cityId,
                    areaData
                })).unwrap();
            }
            
            // Refresh areas list
            await dispatch(fetchAreasByCity(cityId)).unwrap();
            
            // Close modal
            setIsModalOpen(false);
            setEditingArea(null);
            setLocalSuccess(true);
            
            // Clear success message after 3 seconds
            setTimeout(() => setLocalSuccess(false), 3000);
            
        } catch (err) {
            console.error('Failed to save area:', err);
            setLocalError(err || 'Failed to save area');
        }
    };

    // Handle Edit Area
    const handleEditArea = (area) => {
        setEditingArea(area);
        setIsModalOpen(true);
        setLocalError(null);
    };

    // Handle Delete Area
    const handleDeleteArea = async (areaId) => {
        if (!cityId) return;
        
        if (window.confirm('Are you sure you want to delete this area?')) {
            try {
                await dispatch(deleteAreaFromCity({
                    cityId,
                    areaId
                })).unwrap();
                
                // Refresh areas list
                await dispatch(fetchAreasByCity(cityId)).unwrap();
                
                setLocalSuccess(true);
                setTimeout(() => setLocalSuccess(false), 3000);
                
            } catch (err) {
                console.error('Failed to delete area:', err);
                setLocalError(err || 'Failed to delete area');
            }
        }
    };

// Handle Toggle Area Status - FIXED VERSION
const handleToggleAreaStatus = async (areaId, areaData) => {
    if (!cityId) return;
    
    try {
        // Toggle the status
        const newStatus = areaData.status === 'active' ? 'inactive' : 'active';
        
        await dispatch(updateAreaInCity({
            cityId,
            areaId,
            areaData: { 
                ...areaData, 
                status: newStatus 
            }
        })).unwrap();
        
        // Refresh areas list
        await dispatch(fetchAreasByCity(cityId)).unwrap();
        
    } catch (err) {
        console.error('Failed to toggle status:', err);
        setLocalError(err || 'Failed to update status');
    }
};

    // Filter areas locally based on search term
    const filteredAreas = Array.isArray(areas) ? areas.filter((area) =>
        area.areaName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.pincode?.includes(searchTerm)
    ) : [];

    // Handle back to cities
    const handleBackToCities = () => {
        navigate('/city-management');
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

                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-600">
                            <button
                                onClick={handleBackToCities}
                                className="flex items-center hover:text-black transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Cities
                            </button>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <span className="text-black font-medium">
                                {cityName || 'City Details'}
                            </span>
                        </div>

                        <h1 className="text-[32px] font-semibold text-black">
                            {cityName ? `${cityName} - Local Areas` : 'Local Area Management'}
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white shadow-sm border border-black p-6">
                        {/* Missing City Data Warning */}
                        {!cityId && (
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
                                <p>No city data found. Redirecting back to cities page...</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {localSuccess && (
                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4">
                                Operation completed successfully!
                            </div>
                        )}

                        {/* Error Message */}
                        {localError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                                Error: {localError}
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-black" />
                                <span className="ml-2 text-black">Loading areas...</span>
                            </div>
                        )}

                        {/* City Details and Stats */}
                        {!loading && cityId && (
                            <>
                                {/* City Info Header */}
                                <div className="mb-6 p-4 border border-black bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-bold text-black">{cityName}</h2>
                                            <div className="flex items-center gap-4 mt-2">
                                                <p className="text-gray-600">
                                                    Pin Code: <span className="font-semibold">{cityPinCode}</span>
                                                </p>
                                                <span className={`px-2 py-1 text-xs rounded ${cityIsActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {cityIsActive ? 'Active' : 'Inactive'} City
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Total Areas</p>
                                            <p className="text-2xl font-bold">{filteredAreas.length}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 border border-black">
                                        <div className="text-2xl font-bold text-black mb-1">1</div>
                                        <div className="text-[20px] text-black flex items-center justify-between">
                                            <span>City</span>
                                            <img src={city1} alt="city icon" className="w-10 h-10 object-contain" />
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 border border-black">
                                        <div className="text-2xl font-bold text-black mb-1">
                                            {filteredAreas.length}
                                        </div>
                                        <div className="text-[20px] text-black flex items-center justify-between">
                                            <span>Local Areas</span>
                                            <img src={city1} alt="city icon" className="w-10 h-10 object-contain" />
                                        </div>
                                    </div>
                                </div>

                                {/* Search + Add Button */}
                                <div className="flex gap-3 mb-4">
                                    <div className="flex-1 relative">
                                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                                        <input
                                            type="text"
                                            placeholder="Search areas by name or pincode"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-[450px] pl-10 pr-4 py-2 border placeholder:text-black border-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setEditingArea(null);
                                            setIsModalOpen(true);
                                            setLocalError(null);
                                        }}
                                        className="px-4 py-2 bg-white border border-black text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New Area
                                    </button>
                                </div>

                                {/* Table */}
                                <div className="border border-black bg-white">
                                    <div className="px-4 py-3 border-b border-black bg-gray-50">
                                        <h2 className="text-base font-semibold text-black">
                                            Local Areas in {cityName}
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Showing {filteredAreas.length} area{filteredAreas.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>

                                    {filteredAreas.length === 0 ? (
                                        <div className="px-4 py-8 text-center">
                                            {searchTerm ? (
                                                <div className="text-gray-500">
                                                    No areas found matching "{searchTerm}"
                                                </div>
                                            ) : loading ? (
                                                <div className="flex justify-center items-center">
                                                    <Loader2 className="w-6 h-6 animate-spin text-black mr-2" />
                                                    <span className="text-gray-600">Loading areas...</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-gray-500 mb-3">No areas added yet</p>
                                                    <button
                                                        onClick={() => {
                                                            setEditingArea(null);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                                                    >
                                                        Add Your First Area
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-black">
                                                    <th className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-black">Area Name</th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-black">Pincode</th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-black">Status</th>
                                                    <th className="px-4 py-3 text-center text-sm font-semibold text-black">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAreas.map((area, index) => (
                                                    <tr
                                                        key={area._id || area.id || index}
                                                        className={`${index !== filteredAreas.length - 1 ? 'border-b border-black' : ''} hover:bg-gray-50`}
                                                    >
                                                        <td className="px-4 py-3 text-center text-sm text-black border-r border-black">
                                                            {area.areaName}
                                                        </td>
                                                        <td className="px-4 py-3 text-center text-sm text-black border-r border-black">
                                                            {area.pincode || cityPinCode}
                                                        </td>
<td className="px-4 py-3 text-center border-r border-black">
    <button
        onClick={() => handleToggleAreaStatus(area._id, area)}
        className={`px-3 py-1 text-xs rounded border ${area.status === 'active' ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
    >
        {area.status === 'active' ? 'Active' : 'Inactive'}
    </button>
</td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <button 
                                                                    onClick={() => handleEditArea(area)}
                                                                    className="hover:opacity-80 p-1 hover:bg-gray-100 rounded transition-colors"
                                                                    title="Edit Area"
                                                                >
                                                                    <img src={edit1} alt="Edit" className="w-4 h-4 object-contain" />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleDeleteArea(area._id)}
                                                                    className="hover:opacity-80 p-1 hover:bg-gray-100 rounded transition-colors"
                                                                    title="Delete Area"
                                                                >
                                                                    <img src={delete1} alt="Delete" className="w-4 h-4 object-contain" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Modal Component */}
                <NewAreaModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveArea}
                    cityPinCode={cityPinCode}
                    editingArea={editingArea}
                />
            </div>
        </div>
    );
};

export default LocalAreaDetails;