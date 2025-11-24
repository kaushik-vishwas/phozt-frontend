import React, { useState } from 'react';
import { Search, Camera } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import makeup from "../../assets/Icons/makeup.png";
import edit from "../../assets/Icons/edit.png";
import deletee from "../../assets/Icons/delete.png";
import home from "../../assets/Icons/home.png";
import service from "../../assets/Icons/service.png";
import city from "../../assets/Icons/city.png";
import empty from "../../assets/Icons/empty.png";
import save from "../../assets/Icons/save.png";
import NewHeaderSection from '../../components/Page Management/NewHeaderSection';
import LogoAndQuote from "../../components/Page Management/LogoAndQuote";
import KnowUs from "../../components/Page Management/KnowUs";
import Services from '../../components/Page Management/Services';
import NeededtoKnow from '../../components/Page Management/NeededtoKnow';
import Logosettings from '../../components/Page Management/Logosettings';
import SocialMediaLinks from '../../components/Page Management/SocialMediaLinks';
import { useNavigate } from "react-router-dom";

const PagesManagementDashboard = () => {
    const [activeHeaderTab, setActiveHeaderTab] = useState('navigation');
    const [activeFooterType, setActiveFooterType] = useState("primary");
    const [activeFooterTab, setActiveFooterTab] = useState("Logo and quote");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const services = [
        { id: 'photography', name: 'Photography', status: 'Active' },
        { id: 'makeup', name: 'Makeup', subhead: 'Professional Makeup services for events, portraits, and commercial needs.', status: 'Inactive' },
    ];

    const footerTabs = ['Logo and quote', 'Know Us', 'Services', 'Needed to Know', 'Social Media links'];

    const pageManager = [
        { id: 1, name: 'Home Page', description: 'Edit the Home media and cards', icon: home },
        { id: 2, name: 'Service Page', description: 'Add/Edit the Vendors Services', icon: service },
        { id: 3, name: 'City Page', description: 'Add/Edit the Area in city', icon: city },
        { id: 4, name: 'Empty pages', description: 'Add/Edit the Only text browser', icon: empty },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex ml-64 flex-col overflow-hidden">
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

                        <h1 className="text-[36px] font-semibold text-black">Pages Management System Dashboard</h1>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl space-y-6">
                        {/* Header Management Section */}
                        <div className="bg-white border border-black ">
                            <div className="p-5 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[24px] font-semibold text-black">Header Management</h2>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-1"
                                    >
                                        <span>+</span>
                                        <span>Add Service</span>
                                    </button>
                                </div>
                            </div>

                            <div className="p-5">
                                {/* Tabs */}
                                <div className="flex gap-8 border-b border-gray-200 mb-5">
                                    <button
                                        onClick={() => setActiveHeaderTab('navigation')}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeHeaderTab === 'navigation'
                                            ? 'text-[#6331F9] border-[#6331F9]'
                                            : 'text-black border-transparent'
                                            }`}
                                    >
                                        Navigation Services
                                    </button>

                                    <button
                                        onClick={() => setActiveHeaderTab('logo')}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeHeaderTab === 'logo'
                                            ? 'text-[#6331F9] border-[#6331F9]'
                                            : 'text-black border-transparent'
                                            }`}
                                    >
                                        Logo Settings
                                    </button>

                                    <button
                                        onClick={() => setActiveHeaderTab('action')}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeHeaderTab === 'action'
                                            ? 'text-[#6331F9] border-[#6331F9]'
                                            : 'text-black border-transparent'
                                            }`}
                                    >
                                        Call to Action
                                    </button>
                                </div>

                                {/* Conditional render for tabs */}
                                {activeHeaderTab === 'navigation' && (
                                    <>
                                        <div className="grid grid-cols-3 gap-4 mb-5">
                                            {services.map((service) => (
                                                <div
                                                    key={service.id}
                                                    className="border border-black p-4 flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                                    <Camera size={20} className="text-gray-600" />
                                                                </div>
                                                                <div className="font-medium text-[18px] text-black">
                                                                    {service.name}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`inline-block px-2 py-0.5 rounded text-[14px] font-medium ${service.status === 'Active'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-gray-100 text-gray-600'
                                                                    }`}
                                                            >
                                                                {service.status}
                                                            </div>
                                                        </div>

                                                        {service.subhead && (
                                                            <p className="text-[12px] font-medium text-black mb-3">
                                                                {service.subhead}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2 mt-3">
                                                        <button className="flex-1 px-3 py-1.5 border border-black text-[12px] font-medium hover:bg-gray-50 flex items-center justify-center gap-1">
                                                            <img src={edit} alt="edit" className="w-3.5 h-3.5" />
                                                            <span>Edit Page</span>
                                                        </button>
                                                        <button className="flex-1 px-3 py-1.5 border border-black text-[12px] font-medium hover:bg-gray-50 flex items-center justify-center gap-1">
                                                            <img src={deletee} alt="delete" className="w-3.5 h-3.5" />
                                                            <span>Delete Page</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end">
                                            <button className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2">
                                                <img src={save} alt="save" className="w-4 h-4" />
                                                <span>Save changes</span>
                                            </button>
                                        </div>
                                    </>
                                )}

                                {activeHeaderTab === 'logo' && <Logosettings />}
                                {activeHeaderTab === 'action' && <p className="mt-5 text-[16px] font-medium text-black">Call to Action content coming soon...</p>}
                            </div>
                        </div>

                        {/* Footer Management Section */}
                        <div className="bg-white border border-black">
                            <div className="p-5 border-b border-gray-200">
                                <h2 className="text-[24px] font-semibold text-gray-900">Footer Management</h2>
                            </div>

                            <div className="p-5">
                                {/* Footer Tabs */}
                                <div className="flex gap-8 border-b border-gray-200 mb-5">
                                    <button
                                        onClick={() => setActiveFooterType("primary")}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeFooterType === "primary"
                                            ? "text-[#6331F9] border-[#6331F9]"
                                            : "text-black border-transparent"
                                            }`}
                                    >
                                        Primary Footer
                                    </button>
                                    <button
                                        onClick={() => setActiveFooterType("secondary")}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeFooterType === "secondary"
                                            ? "text-[#6331F9] border-[#6331F9]"
                                            : "text-black border-transparent"
                                            }`}
                                    >
                                        Secondary Footer
                                    </button>
                                </div>

                                <div className="flex gap-4 border-b border-gray-200 overflow-x-auto mb-5">
                                    {footerTabs.map((tab, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveFooterTab(tab)}
                                            className={`pb-3 px-4 whitespace-nowrap text-[14px] font-semibold border-b-2 transition-colors ${activeFooterTab === tab
                                                ? "text-[#6331F9] border-[#6331F9]"
                                                : "text-black border-transparent"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-5">
                                    {activeFooterTab === "Logo and quote" && <LogoAndQuote />}
                                    {activeFooterTab === "Know Us" && <KnowUs />}
                                    {activeFooterTab === "Services" && <Services />}
                                    {activeFooterTab === "Needed to Know" && <NeededtoKnow />}
                                    {activeFooterTab === "Social Media links" && <SocialMediaLinks />}
                                </div>

                                <div className="flex flex-row gap-4 mt-5 justify-end">
                                    {activeFooterTab === "Services" || activeFooterTab === "Needed to Know" || activeFooterTab === "Social Media links" ? (
                                        <>
                                            <button className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2">
                                                <p>+</p>
                                                <span>Add the form </span>
                                            </button>

                                            <button className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2">
                                                <img src={save} alt="save" className="w-4 h-4" />
                                                <span>Save changes</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2">
                                            <img src={save} alt="save" className="w-4 h-4" />
                                            <span>Save changes</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Page Manager Section */}
                        {/* Page Manager Section */}
                        <div className="bg-white border border-black">
                            <div className="p-5 border-b border-gray-200">
                                <h2 className="text-[24px] font-semibold text-black">Page Manager</h2>
                            </div>

                            <div className="p-5">
                                <div className="grid grid-cols-4 gap-4">
                                    {pageManager.map((page) => (
                                        <div
                                            key={page.id}
                                            onClick={() => navigate(`/${page.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                            className="border border-black p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
                                        >
                                            <div className="w-12 h-12 mb-3 flex items-center justify-center">
                                                <img src={page.icon} alt={page.name} className="w-10 h-10 object-contain" />
                                            </div>
                                            <h3 className="font-semibold text-black mb-1 text-[20px]">{page.name}</h3>
                                            <p className="text-[16px] font-semibold text-black">{page.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div className="w-[600px] max-w-full">
                        <NewHeaderSection onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default PagesManagementDashboard;