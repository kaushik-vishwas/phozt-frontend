import React, { useState } from 'react';
import { Search, Plus, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import city1 from '../../assets/Icons/city1.png';
import edit1 from '../../assets/Icons/edit1.png';
import delete1 from '../../assets/Icons/delete1.png';
import NewAreaModal from '../../pages/Cities/NewAreaModal';

const LocalAreaDetails = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [localAreas, setLocalAreas] = useState([
        { id: 1, areaName: 'Marathahalli', pincode: '560043', status: 'Active' },
        { id: 2, areaName: 'JP Nagar', pincode: '560043', status: 'Active' },
        { id: 3, areaName: 'Jayanagar', pincode: '560043', status: 'Inactive' },
        { id: 4, areaName: 'Pradesh Nagar', pincode: '560043', status: 'Active' },
    ]);

    // 🔹 Handle Save (called from modal)
    const handleSaveArea = (newArea) => {
        const areaWithId = {
            ...newArea,
            id: localAreas.length + 1,
        };
        setLocalAreas((prev) => [...prev, areaWithId]);
        setIsModalOpen(false);
    };

    const filteredAreas = localAreas.filter((area) =>
        area.areaName.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                        <p className="flex items-center text-gray-600 text-sm">
                            <span>Dashboard</span>
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span>Cities</span>
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="text-black font-medium">Bengaluru</span>
                        </p>

                        <h1 className="text-[32px] font-semibold text-black">
                            City & Local Area Management
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white shadow-sm border border-black p-6">
                        {/* Stats */}
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

                        {/* Search + Add Button */}
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
                            <button
                                onClick={() => setIsModalOpen(true)}
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
                                    Local Areas in Bengaluru
                                </h2>
                            </div>

                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-black">
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-black">Area Name</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-black">Pincode</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-black">Status</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-black">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAreas.map((area, index) => (
                                        <tr
                                            key={area.id}
                                            className={`${index !== filteredAreas.length - 1 ? 'border-b border-black' : ''}`}
                                        >
                                            <td className="px-4 py-3 text-center text-sm text-black border-r border-black">{area.areaName}</td>
                                            <td className="px-4 py-3 text-center text-sm text-black border-r border-black">{area.pincode}</td>
                                            <td className="px-4 py-3 text-center text-sm text-black border-r border-black">{area.status}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button className="hover:opacity-80">
                                                        <img src={edit1} alt="Edit" className="w-4 h-4 object-contain" />
                                                    </button>
                                                    <button className="hover:opacity-80">
                                                        <img src={delete1} alt="Delete" className="w-4 h-4 object-contain" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 🔹 Modal Component */}
                <NewAreaModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveArea}
                />
            </div>
        </div>
    );
};

export default LocalAreaDetails;
