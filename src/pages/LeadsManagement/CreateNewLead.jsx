import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from "../../components/Sidebar";

const CreateNewLead = () => {
    const [formData, setFormData] = useState({
        name: '',
        service: '',
        contact: '',
        city: '',
        eventDate: '',
        eventBudget: '',
        message: ''
    });

    const services = [
        'Photography services',
        'Event management',
        'Catering',
        'Decoration',
        'Makeup artist',
    ];

    const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Lead created successfully!');
    };

    const handleReset = () => {
        setFormData({
            name: '',
            service: '',
            contact: '',
            city: '',
            eventDate: '',
            eventBudget: '',
            message: ''
        });
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 flex ml-64 flex-col ">
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

                        <h1 className="text-[36px] font-semibold text-black">Create A New Lead Manually</h1>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-3xl">
                        {/* <h1 className="text-4xl font-semibold text-gray-900 mb-8"></h1> */}

                        {/* Form Card */}
                        <div className="bg-[#FCFCFC]  border border-black p-8">
                            {/* Name and Service Row */}
                            <h1 className='font-semibold text-[24px] text-black mb-3 '>Create a New Lead</h1>
                            <div className="grid grid-cols-2 gap-6 mb-6">

                                <div>
                                    <label className="block text-[20px] font-medium text-black mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter the name of Lead"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300  text-[16px] outline-none focus:border-gray-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[20px] font-medium text-black mb-2">
                                        Requested Service
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300  text-[16x] outline-none focus:border-gray-400 bg-white"
                                    >
                                        <option value="">Select the Service Required</option>
                                        {services.map((service, idx) => (
                                            <option key={idx} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Contact and City Row */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-[24px] font-medium text-gray-900 mb-2">
                                        Contact
                                    </label>
                                    <div className="flex">
                                        <span className="px-3 py-2 bg-gray-100 border border-gray-300 border-r-0 rounded-l-lg text-sm">
                                            +91
                                        </span>
                                        <input
                                            type="text"
                                            name="contact"
                                            placeholder="Enter Contact Number"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg text-[16px] outline-none focus:border-gray-400"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[24px] font-medium text-gray-900 mb-2">
                                        City
                                    </label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300  text-[16px] outline-none focus:border-gray-400 bg-white"
                                    >
                                        <option value="">Select the City of Event</option>
                                        {cities.map((city, idx) => (
                                            <option key={idx} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Event Date and Budget Row */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-[24px] font-medium text-gray-900 mb-2">
                                        Event Date
                                    </label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300  text-[16px] outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[24px] font-medium text-gray-900 mb-2">
                                        Event Budget
                                    </label>
                                    <input
                                        type="text"
                                        name="eventBudget"
                                        placeholder="Enter Approx Budget for Event"
                                        value={formData.eventBudget}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300  text-[16px] outline-none focus:border-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mb-6">
                                <label className="block text-[24px] font-medium text-gray-900 mb-2">
                                    Enter The Message
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Enter the Service Required Details"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300  text-[16px] outline-none focus:border-gray-400 resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 px-4 py-2 border border-black bg-white  text-[24px] font-normal text-black"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 px-4 py-2  text-black  text-[24px] border border-black font-normal "
                                >
                                    Create Lead
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewLead;