import React, { useState } from 'react';
import { Search, Star, MapPin, Phone } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import exportt from "../../assets/Icons/export.png";
import { useNavigate } from 'react-router-dom';

const CategoryPortfolio = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState('Bengaluru');
    const [activeTab, setActiveTab] = useState('Portfolio');
    const handleViewAll = () => {
        navigate('/view-all');
    };

    const vendorInfo = {
        name: 'Lens & Light Photography',
        status: 'Active',
        rating: 4.8,
        reviews: 165,
        address: '5 127, 4th T main road, near Adichika pillar, Jayanagar, Bengaluru, India27',
        phone: '+91 9876543210'
    };

    const tabs = ['Overview', 'Portfolio', 'Services', 'Leads', 'Reviews'];

    const portfolioCategories = [
        {
            title: 'Wedding Photography',
            count: 12,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'House warming Photography',
            count: 8,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Birthday Photography',
            count: 15,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Engagement Photography',
            count: 10,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Naming Ceremony (Namkaran) Photography',
            count: 6,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Baby Shower (seemantham) Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Baby Welcoming Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Upanayanam(ThreadCeremony) Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Puberty Ceremony Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Annaprashana( Rice Feeding) Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Christian Wedding Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Corporate Events Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        },
        {
            title: 'Muslim Wedding Photography',
            count: 9,
            images: [
                { id: 1, placeholder: true },
                { id: 2, placeholder: true },
                { id: 3, placeholder: true },
                { id: 4, placeholder: true }
            ]
        }
    ];

    const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex ml-64 flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center border border-gray-300 rounded px-3 py-2 flex-1 max-w-2xl">
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search anything here....."
                                className="text-sm w-full outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-900 font-medium">Alex</span>
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                A
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-semibold text-gray-900">
                                Photography Lead Management
                            </h1>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            {/* City Selector */}
                            {/* City Selector + Action Buttons in One Row */}
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                {/* Left: City Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select the City
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Search size={18} className="text-gray-400" />
                                        <select
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-gray-400 bg-white"
                                        >
                                            {cities.map((city, idx) => (
                                                <option key={idx} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Right: Action Buttons */}
                                <div className="flex items-center gap-3 mt-6">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-black bg-white hover:bg-gray-100 text-sm font-medium">
                                        <img src={exportt} alt="export" className="w-4 h-4" />
                                        Export Report
                                    </button>
                                    <button className="px-4 py-2 border border-black bg-white text-black hover:bg-gray-100 text-sm font-medium">
                                        + Add Vendor
                                    </button>
                                </div>
                            </div>


                            {/* Vendor Info Card */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-xl font-semibold text-gray-600">
                                                {vendorInfo.name}
                                            </h2>
                                            <span className="px-3 py-1 bg-gray-100 border border-black text-black text-sm font-medium">
                                                {vendorInfo.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm font-medium text-gray-600">{vendorInfo.rating}</span>
                                                <span className="text-sm text-gray-600">({vendorInfo.reviews} Reviews)</span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 mb-2">
                                            <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-600">{vendorInfo.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <div className="flex gap-1 px-6">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                                ? 'border-[#8A3FFC] text-[#8A3FFC]'
                                                : 'border-transparent text-black hover:text-gray-900'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Portfolio Content */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {portfolioCategories.map((category, idx) => (
                                        <div key={idx}>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {category.title}
                                                </h3>
                                                <button
                                                    onClick={handleViewAll}
                                                    className="text-sm text-black font-medium"
                                                >
                                                    View All
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-4 gap-4">
                                                {category.images.map((image) => (
                                                    <div
                                                        key={image.id}
                                                        className="aspect-video bg-white border border-black"
                                                    >
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPortfolio;