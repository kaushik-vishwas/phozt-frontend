import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import VendorSidebar from "../../components/VendorLogin/VendorSidebar";
import VendorHeader from "../../components/VendorLogin/VendorHeader";
import eye from "../../assets/Icons/vendor-eye.png";
import rating from "../../assets/Icons/vendor-rating.png";
import enq from "../../assets/Icons/vendor-enq.png";
import upld from "../../assets/Icons/vendor-upld.png";

const VendorDashboard = () => {
    const stats = [
        { icon: eye, value: '1247', label: 'TOTAL PROFILE VIEW' },
        { icon: enq, value: '140', label: 'INQUIRIES' },
        { icon: rating, value: '4.6', label: 'AVERAGE RATING' },
        { icon: upld, value: '1579', label: 'TOTAL IMAGES UPLOADED' }
    ];

    const leads = [
        { name: 'Nagarajuna Bheemanamd', id: '0957746kJY', service: 'Photography Services', date: '24-12-2025', amount: '₹ 5000' },
        { name: 'Nagarajuna Bheemanamd', id: '0957746kJY', service: 'Photography Services', date: '24-12-2025', amount: '₹ 5000' },
        { name: 'Nagarajuna Bheemanamd', id: '0957746kJY', service: 'Photography Services', date: '24-12-2025', amount: '₹ 5000' },
        { name: 'Nagarajuna Bheemanamd', id: '0957746kJY', service: 'Photography Services', date: '24-12-2025', amount: '₹ 5000' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <VendorSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 overflow-auto">
                {/* Common Header */}
                <VendorHeader />

                {/* Dashboard Content */}
                <div className="p-8">
                    {/* Stats Cards */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4 border border-black p-3">
                            <h2 className="text-[25px] font-semibold text-black">AVAILABLE LEADS</h2>
                            <span className="text-[25px] font-medium text-black">39/80</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white border border-black p-6 text-center">
                                    <img src={stat.icon} alt={stat.label} className="w-8 h-8 mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                    <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leads Table */}
                    <div className="bg-white border border-black">
                        <div className="px-6 py-4 border-b border-black">
                            <h2 className="text-sm font-semibold text-gray-700">AVAILABLE LEADS</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody className="divide-y divide-gray-200">
                                    {leads.map((lead, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-800">{lead.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{lead.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{lead.service}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{lead.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800 font-medium">{lead.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-black flex items-center justify-between">
                            <span className="text-sm text-gray-600">Page 1 of 4</span>
                            <button className="p-2 hover:bg-gray-100 rounded">
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;