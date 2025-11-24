import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import Distribution from "../../assets/Icons/Distribution.png";
import Assignment from "../../assets/Icons/Assignment.png";

const DistributionMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState('auto');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('based-on-specialty');

    const handleMethodChange = (method) => {
        // Toggle selected method
        setSelectedMethod(method);
    };

    const handleAlgorithmChange = (e) => {
        setSelectedAlgorithm(e.target.value);
    };

    const handleSaveChanges = () => {
        console.log('Saved:', { selectedMethod, selectedAlgorithm });
        alert('Changes saved successfully!');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            {/* Main Content */}
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
                        <h1 className="text-[30px] font-semibold text-black">
                            Distribution Method for Leads
                        </h1>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-3xl">
                        {/* Form Card */}
                        <div className="bg-white border border-gray-300 rounded-lg p-8">
                            <h2 className="text-[32px] font-normal text-black mb-6">
                                Distribution Method
                            </h2>

                            {/* Distribution Options */}
                            <div className="mb-8">
                                <p className="text-[18px] font-normal text-black mb-4">
                                    Select how you want to distribute the selected leads
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Auto Distribution */}
                                    <div
                                        onClick={() => handleMethodChange("auto")}
                                        className={`border-2 p-6 cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out ${selectedMethod === "auto"
                                            ? "border-black bg-[#F7F7F7]"
                                            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                                            }`}
                                    >
                                        <img
                                            src={Distribution}
                                            alt="Auto Distribution"
                                            className="w-10 h-10 mb-3 object-contain"
                                        />
                                        <h3 className="text-[24px] font-normal text-black mb-2">
                                            Auto Distribution
                                        </h3>
                                        <p className="text-[14px] text-black font-normal">
                                            Automatically assign leads to groups based on rules
                                        </p>
                                    </div>

                                    {/* Manual Assignment */}
                                    <div
                                        onClick={() => handleMethodChange("manual")}
                                        className={`border-2 p-6 cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out ${selectedMethod === "manual"
                                            ? "border-black bg-[#F7F7F7]"
                                            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                                            }`}
                                    >
                                        <img
                                            src={Assignment}
                                            alt="Manual Assignment"
                                            className="w-10 h-10 mb-3 object-contain"
                                        />
                                        <h3 className="text-[24px] font-normal text-black mb-2">
                                            Manual Assignment
                                        </h3>
                                        <p className="text-[14px] font-normal text-black">
                                            Manually assign leads to specific vendor groups
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Group Selection Algorithm */}

                            <div className="mb-8 border-t pt-8">
                                <label className="block text-[24px] font-normal text-black mb-4">
                                    Group Selection Algorithm
                                </label>
                                <select
                                    value={selectedAlgorithm}
                                    onChange={handleAlgorithmChange}
                                    className="w-full px-4 py-3 border border-black rounded-lg text-[20px] font-normal outline-none focus:border-gray-400 bg-white"
                                >
                                    <option value="based-on-specialty">
                                        Based On Group Specialty
                                    </option>
                                    <option value="round-robin">Round Robin</option>
                                    <option value="least-busy">Least Busy Group</option>
                                    <option value="random">Random Distribution</option>
                                </select>
                            </div>

                            {/* Save Button */}
                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={handleSaveChanges}
                                    className="w-[350px] px-6 py-3 bg-white text-black border border-black rounded-lg text-[24px] font-normal hover:bg-gray-100 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistributionMethod;
