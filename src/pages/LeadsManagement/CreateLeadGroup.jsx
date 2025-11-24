import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import profile from "../../assets/Icons/profile.png";

const CreateLeadGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);

    const city = "Bengaluru";

    const services = [
        "Photography services",
        "Event management",
        "Catering",
        "Decoration",
        "Makeup artist",
    ];

    const availableMembers = [
        { id: 1, name: "Naveen Kumar", subname: "Photographer" },
        { id: 2, name: "Praveen Kumar", subname: "Photographer" },
        { id: 3, name: "Naveen Mehra", subname: "Makeup" },
        { id: 4, name: "Praveen Mehra", subname: "Videography" },
    ];

    const filteredMembers = availableMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleMember = (memberId) => {
        setSelectedMembers(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex ml-64 flex-col">
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
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                            </div>
                        </div>

                        <h1 className="text-[36px] font-semibold text-black">Dashboard</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto p-6">
                    {/* City Selector */}
                    <div className="bg-white  p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <label className="text-[18px] font-normal text-black">
                                Select the City
                            </label>
                            <select className="px-3 py-2 border border-black font-normal  text-[18px] bg-white">
                                <option>{city}</option>
                            </select>
                        </div>
                    </div>

                    {/* Create New Lead Group Form */}
                    <div className="bg-white  border border-gray-300 p-6 max-w-2xl">
                        <h2 className="text-[30px] font-semibold text-black mb-1">
                            Create New Lead Group
                        </h2>
                        <p className="text-[14px] text-gray-600 mb-6">
                            Organize your team members to share leads more efficiently
                        </p>

                        {/* Group Name */}
                        <div className="mb-6">
                            <label className="block text-[14px] font-medium text-black mb-2">
                                Group Name
                            </label>
                            <input
                                type="text"
                                placeholder="Eg: Makeup vendors 1"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300  text-[14px] outline-none focus:border-gray-400"
                            />
                        </div>

                        {/* Select Main Service */}
                        <div className="mb-6">
                            <label className="block text-[14px] font-medium text-black mb-2">
                                Select Main Service
                            </label>
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300  text-[14px] outline-none focus:border-gray-400 bg-white"
                            >
                                <option value="">Photography services</option>
                                {services.map((service, idx) => (
                                    <option key={idx} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[12px] text-gray-500 mt-1">
                                Event management, photography, makeup artist, catering
                            </p>
                        </div>

                        {/* Add Members */}
                        <div className="mb-6">
                            <label className="block text-[14px] font-medium text-black mb-2">
                                Add Members
                            </label>

                            {/* Search Members */}
                            <div className="relative mb-3">
                                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search name / service"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300  text-[14px] outline-none focus:border-gray-400"
                                />
                            </div>

                            {/* Members List */}
                            <div className="border border-gray-300  p-3 max-h-48 overflow-y-auto space-y-2">
                                {filteredMembers.map((member) => (
                                    <label
                                        key={member.id}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedMembers.includes(member.id)}
                                            onChange={() => toggleMember(member.id)}
                                            className="w-4 h-4 rounded border-gray-300"
                                        />
                                        <div className="flex-1">
                                            <div className="text-[14px] font-medium text-black">
                                                {member.name}
                                            </div>
                                            <div className="text-[12px] text-gray-600">
                                                {member.subname}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border  border-black p-2 flex items-center gap-2">
                                    <img src={profile} alt="profile" className="w-6 h-6 rounded-full" />
                                    <h1 className="text-start">Praveen Kumar / Photographer</h1>
                                </div>

                                <div className="border  border-black p-2 flex items-center gap-2">
                                    <img src={profile} alt="profile" className="w-6 h-6 rounded-full" />
                                    <h1 className="text-start">Praveen Kumar / Photographer</h1>
                                </div>

                                <div className="border border-black p-2 flex items-center gap-2">
                                    <img src={profile} alt="profile" className="w-6 h-6 rounded-full" />
                                    <h1 className="text-start">Ajay Kumar / Makeup</h1>
                                </div>

                                <div className="border  border-black p-2 flex items-center gap-2">
                                    <img src={profile} alt="profile" className="w-6 h-6 rounded-full" />
                                    <h1 className="text-start">Ajay Kumar / Makeup</h1>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 border bg-[#EBEBEB] border-gray-300  text-[14px] font-medium text-black hover:bg-gray-50">
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2 bg-[#EBEBEB] text-black  text-[14px] font-medium hover:bg-gray-50">
                                Create Group
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLeadGroup;