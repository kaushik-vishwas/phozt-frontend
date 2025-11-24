

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import city1 from '../../assets/Icons/city1.png';

const CityManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [cities] = useState([
        {
            id: 1,
            name: 'Bangalore',
            area: '741 km²',
            totalLocalAreas: 5,
            pinCodes: '560001',
            areas: 'Marathahalli, Jayanagar, JP Nagar, Yeshwanthpur, Indiranagar',
        },
        {
            id: 2,
            name: 'Mumbai',
            area: '603 km²',
            totalLocalAreas: 5,
            pinCodes: '400001',
            areas: 'Andheri, Bandra, Dadar, Borivali, Powai',
        },
        {
            id: 3,
            name: 'Delhi',
            area: '1,484 km²',
            totalLocalAreas: 5,
            pinCodes: '110001',
            areas: 'Connaught Place, Saket, Rohini, Lajpat Nagar, Dwarka',
        },
        {
            id: 4,
            name: 'Jaipur',
            area: '467 km²',
            totalLocalAreas: 5,
            pinCodes: '302001',
            areas: 'Vaishali Nagar, Malviya Nagar, C-Scheme, Mansarovar, Amer',
        },
    ]);

    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    <div className="text-2xl font-bold text-black mb-1">20</div>
                                    <div className="text-[20px] text-black flex items-center justify-between">
                                        <span>Cities</span>
                                        <img src={city1} alt="city icon" className="w-10 h-10 object-contain" />
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 border border-black">
                                    <div className="text-2xl font-bold text-black mb-1">80</div>
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
                                        placeholder="Search pages"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-[450px] pl-10 pr-4 py-2 border placeholder:text-black border-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="px-4 py-2 bg-white border border-black text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New City
                                </button>
                            </div>

                            {/* City Cards */}
                            <div className="grid grid-cols-3 gap-4">
                                {filteredCities.map((city) => (
                                    <div
                                        // key={city.id}
                                        className="bg-white border border-black p-4 cursor-pointer hover:shadow-md"
                                        onClick={() => navigate(`/local-area-details`)}
                                    >
                                        {/* City Header with Active/Inactive */}
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-black text-lg">{city.name}</h3>
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1 text-xs border bg-white border-black text-black">Active</button>
                                                <button className="px-3 py-1 text-xs border bg-white border-black text-black">Inactive</button>
                                            </div>
                                        </div>

                                        {/* City Details */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center py-2 border-b border-black">
                                                <span className="text-sm text-black">Total Local Areas:</span>
                                                <span className="text-sm font-medium text-gray-900">{city.totalLocalAreas}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-black">
                                                <span className="text-sm text-black">Pin Codes:</span>
                                                <span className="text-sm font-medium text-gray-900">{city.pinCodes}</span>
                                            </div>
                                            <div className="py-2">
                                                <span className="text-sm text-black block mb-1">Areas:</span>
                                                <span className="text-sm text-gray-900">{city.areas}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityManagement;
