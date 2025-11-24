import React, { useState } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import totalLeads from "../../assets/Icons/totalLeads.png";
import Cities from "../../assets/Icons/Cities.png";
import vendos from "../../assets/Icons/vendos.png";
import articles from "../../assets/Icons/articles.png";
import plus from "../../assets/Icons/plus.png";
import leadDistribution from "../../assets/Icons/leadDistribution.png";
import { useNavigate } from "react-router-dom";

const LeadsTable = ({ leads }) => {
    const navigate = useNavigate();
    const [selectedLeads, setSelectedLeads] = useState([]);

    const handleNavigate = () => {
        navigate("/vendor-group");
    };

    const handleSelectLead = (id) => {
        if (selectedLeads.includes(id)) {
            setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
        } else {
            setSelectedLeads([...selectedLeads, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedLeads.length === leads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(leads.map((lead) => lead.id));
        }
    };

    return (
        <div className="bg-white  border border-black shadow-sm flex flex-col h-[500px]">
            {/* Table Header Tabs */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 flex-shrink-0">
                <div className="flex gap-4 text-sm">
                    <button className="text-blue-600 text-[18px] font-medium hover:text-blue-700">Total Leads</button>
                    <button className="text-gray-600 text-[18px] hover:text-gray-900">New Leads</button>
                    <button className="text-gray-600 text-[18px] hover:text-gray-900">Assigned Leads</button>
                    <button className="text-gray-600 text-[18px] hover:text-gray-900">Rejected Leads</button>
                </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex gap-2 items-center flex-shrink-0">
                <span className="text-sm text-gray-600">Last 30 days</span>
                <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                    Filter by
                </button>
                <div className="ml-auto text-xs text-gray-500">
                    Page 1 of 4
                </div>
            </div>

            {/* Scrollable Table Body */}
            <div className="overflow-auto flex-1">
                <table className="w-full text-sm min-w-max">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                        <tr>
                            {/* Select All Checkbox */}
                            <th className="px-6 py-3">
                                <input
                                    type="checkbox"
                                    checked={selectedLeads.length === leads.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Customer Name</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Mobile Number</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Request Service</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Service by Vendor</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Event Date</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Status</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Delete</th>
                            <th className="px-6 py-3 text-left text-[18px] font-inter whitespace-nowrap">Assign Vendor Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                                {/* Row Checkbox */}
                                <td className="px-6 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedLeads.includes(lead.id)}
                                        onChange={() => handleSelectLead(lead.id)}
                                    />
                                </td>
                                <td className="px-6 py-3 text-black font-normal text-[18px] whitespace-nowrap">{lead.customer}</td>
                                <td className="px-6 py-3 text-[#413F3F] font-normal text-[18px] whitespace-nowrap">{lead.mobile}</td>
                                <td className="px-6 py-3 text-[#413F3F] font-normal text-[18px] whitespace-nowrap">{lead.service}</td>
                                <td className="px-6 py-3 text-[#413F3F] font-normal text-[18px] whitespace-nowrap">{lead.vendor}</td>
                                <td className="px-6 py-3 text-[#413F3F] font-normal text-[18px] whitespace-nowrap">{lead.eventDate}</td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded text-xs font-medium ${lead.status === 'New Lead'
                                        ? 'bg-[#FBF5C4] text-[#8B5401]'
                                        : lead.status === 'Assigned'
                                            ? 'bg-[#828DFF] text-[#8B5401]'
                                            : lead.status === 'Rejected'
                                                ? 'bg-[#FF2024] text-[#8B5401]'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <button className="text-gray-600 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    {lead.vendorGroup ? (
                                        <span className="text-[#0C0A0A] font-inter font-medium text-[14px]">{lead.vendorGroup}</span>
                                    ) : (
                                        <button
                                            onClick={handleNavigate}
                                            className="text-gray-600 hover:text-gray-900 border border-gray-300 rounded p-1">
                                            <Plus size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const LeadsManagement = () => {
    const navigate = useNavigate();
    const [leads] = useState([
        { id: '1', customer: 'Nagararjuna Bheemanand', mobile: '9876543210', service: 'Photography Services', vendor: 'Studio B - Photography', eventDate: '04-07-2025', status: 'New Lead', vendorGroup: null },
        { id: '2', customer: 'Rajesh Kumar', mobile: '9876543211', service: 'Catering Services', vendor: 'Royal Caterers', eventDate: '15-07-2025', status: 'Assigned', vendorGroup: 'Baby shower Makeup' },
        { id: '3', customer: 'Priya Sharma', mobile: '9876543212', service: 'Decoration Services', vendor: 'Elegant Decorators', eventDate: '20-07-2025', status: 'Rejected', vendorGroup: 'HW Catering' },
        { id: '4', customer: 'Amit Patel', mobile: '9876543213', service: 'DJ Services', vendor: 'Sound Masters', eventDate: '25-07-2025', status: 'New Lead', vendorGroup: 'Birthday Catering' },
        { id: '5', customer: 'Sunita Reddy', mobile: '9876543214', service: 'Photography Services', vendor: 'Click Studios', eventDate: '30-07-2025', status: 'Assigned', vendorGroup: 'Birthday Decoration' },
        { id: '6', customer: 'Vikram Singh', mobile: '9876543215', service: 'Catering Services', vendor: 'Tasty Bites', eventDate: '05-08-2025', status: 'Rejected', vendorGroup: 'HW Catering' },
        { id: '7', customer: 'Anita Desai', mobile: '9876543216', service: 'Photography Services', vendor: 'Perfect Moments', eventDate: '10-08-2025', status: 'New Lead', vendorGroup: null },
        { id: '8', customer: 'Ramesh Gupta', mobile: '9876543217', service: 'Decoration Services', vendor: 'Dream Decorators', eventDate: '15-08-2025', status: 'Assigned', vendorGroup: 'Photography birthday' },
    ]);

    const stats = [
        { label: 'Total Leads', value: '158', icon: totalLeads, change: '+12% from last month' },
        { label: 'Cities', value: '12', icon: Cities, change: '+3 cities from last month' },
        { label: 'Active Vendors', value: '325', icon: vendos, change: '+15% from last month' },
        { label: 'Active Service', value: '1,205', icon: articles, change: '+42% from last month' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col ml-64 overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start flex-shrink-0">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center mt-2 w-full">
                            <div className="flex items-center border border-gray-300 rounded px-2 w-[70%]">
                                <Search size={18} className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search anything here....."
                                    className="py-2 text-sm w-full outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <span className="text-gray-900 font-medium">Alex</span>
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">A</div>
                            </div>
                        </div>
                        <h1 className="text-[36px] font-semibold text-black">
                            Lead Management <span className="font-semibold">Dashboard</span>
                        </h1>
                    </div>
                </div>

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {/* Stats Section */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white  p-4 border border-black shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-black text-[20px] font-medium font-poppins mb-1">{stat.label}</p>
                                        <p className="text-[20px] font-medium text-black">{stat.value}</p>
                                        <p className="text-[16px] font-medium text-black mt-2">{stat.change}</p>
                                    </div>
                                    <img src={stat.icon} alt={`${stat.label} icon`} className="w-8 h-8 object-contain" />
                                </div>
                            ))}
                        </div>
                        {/* Lead Distribution Chart */}
                        <div className="bg-white  border border-black p-6 mb-6 shadow-sm">
                            <h2 className="text-[28px] font-bold text-black mb-4">Lead Distribution with Vendor Groups</h2>
                            <div className="bg-gray-50 h-10 rounded font-normal flex items-center justify-start text-gray-400 text-[18px]">
                                You are Distributing leads For vendors under rule/ manual intervention
                            </div>
                        </div>

                        {/* Lead Table Component */}
                        <LeadsTable leads={leads} />

                        {/* Quick Actions */}
                        <div className="mt-6 bg-white  border border-gray-200 p-6 shadow-sm">
                            <h3 className="text-[36px] font-bold text-black mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-4 gap-48 justify-items-start">
                                <div
                                    onClick={() => navigate("/create-new-lead")}
                                    className="border border-black  p-6 text-center hover:bg-gray-50 cursor-pointer w-64">
                                    <img src={plus} alt="plus icon" className="mx-auto mb-2 w-6 h-6" />
                                    <p className="text-black font-regular text-[16px] mb-1">Add A New Lead</p>
                                    <p className="text-[14px] text-black font-regular">Create a new lead manually</p>
                                </div>
                                <div
                                    onClick={() => navigate("/distribution-method")}
                                    className="border border-black  p-6 text-center hover:bg-gray-50 cursor-pointer w-64">
                                    <img src={leadDistribution} alt="leadDistribution icon" className="mx-auto mb-2 w-6 h-6" />
                                    <p className="text-black font-normal text-[16px] mb-1">Lead Distribution Method</p>
                                    <p className="text-[14px] font-normal text-black">Select how you want to distribute the selected leads</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsManagement;