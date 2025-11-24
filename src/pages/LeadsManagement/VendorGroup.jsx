import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, Eye, Search } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import profile from "../../assets/Icons/profile.png";
import { useNavigate } from "react-router-dom";

const VendorGroupCard = ({ title, members = [] }) => {

  return (
    <div className="bg-white border border-black  overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black">
        <h3 className="text-[18px] font-medium text-black">{title}</h3>
        <button className="p-1 hover:bg-gray-100 border border-gray-300 ">
          <Plus size={18} className="text-black" />
        </button>
      </div>

      {/* Members */}
      <div className="p-4 space-y-3">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border border-black  px-3 py-2"
          >
            {/* Left side: profile image + name + subname */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 -full overflow-hidden flex-shrink-0">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-medium text-black">
                  {member.name}
                </span>
                <span className="text-[13px] text-gray-600">
                  {member.subname}
                </span>
              </div>
            </div>

            {/* Right side: status in two lines + delete */}
            <div className="flex items-center gap-5 ml-4">
              <div className="flex flex-col items-center leading-tight text-black text-[14px] font-medium">
                <span>{member.status.split(" ")[0]}</span>
                <span>{member.status.split(" ")[1] || ""}</span>
              </div>
              <button className="text-black hover:text-red-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Members */}
      <div className="px-4 py-3 flex justify-center border-t border-black">
        <button className="flex items-center gap-2 text-[14px] border border-black px-4 py-2  hover:bg-gray-100">
          <Eye size={16} /> View All Group Members
        </button>
      </div>

      {/* Add / Delete Buttons */}
      <div className="px-4 py-3 flex justify-between border-t border-black">
        <button className="flex items-center gap-2 text-[14px] border border-black px-3 py-2  hover:bg-gray-100 whitespace-nowrap">
          <Plus size={14} /> Add Members
        </button>

        <button className="flex items-center gap-2 text-[14px] border border-black px-3 py-2  hover:bg-gray-100 whitespace-nowrap">
          <Trash2 size={14} /> Delete Group
        </button>
      </div>
    </div>
  );
};

const VendorGroup = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/create-lead-group");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;
  const city = "Bengaluru";

  const vendorGroups = [
    {
      title: "Wedding Photography",
      members: [
        { name: "Praveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Naveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Suresh", subname: "Studio 19 Photography", status: "20/50 Leads" },
      ],
    },
    {
      title: "Birthday Photography",
      members: [
        { name: "Praveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Naveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Suresh", subname: "Studio 19 Photography", status: "20/50 Leads" },
      ],
    },
    {
      title: "Baby Shower Makeup",
      members: [
        { name: "Praveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Naveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Suresh", subname: "Studio 19 Photography", status: "20/50 Leads" },
      ],
    },
     {
      title: "maternity Catering",
      members: [
        { name: "Praveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Naveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Suresh", subname: "Studio 19 Photography", status: "20/50 Leads" },
      ],
    },
     {
      title: "Naming Makeup",
      members: [
        { name: "Praveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Naveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Suresh", subname: "Studio 19 Photography", status: "20/50 Leads" },
      ],
    },
     {
      title: "HW Photography",
      members: [
        { name: "Praveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Naveen Kumar", subname: "Studio 19 Photography", status: "28/50 Leads" },
        { name: "Suresh", subname: "Studio 19 Photography", status: "20/50 Leads" },
      ],
    },
  ];

  const pageNumbers = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex ml-64 flex-col">

        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start flex-shrink-0">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center mt-2 w-full">
              <div className="flex items-center border border-gray-300  px-2 w-[70%]">
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

            <h1 className="text-[36px] font-semibold text-black">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white  p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">

              <label className="text-[18px] font-normal text-black">
                Select the City
              </label>
              <select className="px-3 py-2 border border-black font-normal  text-[18px] bg-white">
                <option>{city}</option>
              </select>
            </div>
            <button
              onClick={handleNavigate}
              className="flex items-center gap-2 font-normal text-[18px] px-4 py-2 bg-white border border-gray-300  hover:bg-gray-50">
              <Plus size={16} />
              Create Lead Group
            </button>
          </div>

          <h2 className="text-[43px] font-medium text-black mb-4">
            Vendor Groups
          </h2>
          <p className="text-[24px] font-medium text-black mb-6">
            Manage your vendor groups and their members
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {vendorGroups.map((group, idx) => (
              <VendorGroupCard
                key={idx}
                title={group.title}
                members={group.members}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">Showing 1-3 of 15 pages</p>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 ">
                <ChevronLeft size={18} />
              </button>
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 flex items-center justify-center  text-sm ${currentPage === num
                    ? "bg-gray-400 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-gray-600">... {totalPages}</span>
              <button className="p-2 hover:bg-gray-200 ">
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
          <div className="space-y-4">
            <h1 className="text-[43px] font-medium text-black">Single Vendor Window</h1>

            {/* Form section */}
            <div className="flex items-center bg-white p-4 border border-gray-200  gap-2">
              {/* Select Vendor Dropdown */}
              <select
                className="border px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Vendor</option>
                <option value="vendor1">Vendor 1</option>
                <option value="vendor2">Vendor 2</option>
                <option value="vendor3">Vendor 3</option>
              </select>

              {/* Send Button */}
              <button
                type="button"
                className="border border-black hover:bg-gray-400 text-black font-medium px-6 py-2 "
              >
                Send
              </button>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorGroup;
