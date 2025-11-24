import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from "../../components/Sidebar";
import edit from "../../assets/Icons/edit1.png";
import deletee from "../../assets/Icons/delete1.png";
import home from "../../assets/Icons/home.png";
import service from "../../assets/Icons/service.png";
import city from "../../assets/Icons/city.png";
import empty from "../../assets/Icons/empty.png";
import profile from "../../assets/Icons/profile.png";
import save from "../../assets/Icons/save.png";
import uploadImg from "../../assets/Icons/uploadImg.png";
import link from "../../assets/Icons/link.png";
import NewHeaderSection from '../../components/Page Management/NewHeaderSection';
import Logosettings from '../../components/Page Management/Logosettings';
import EditService from '../../components/Page Management/editService';

import { useNavigate } from "react-router-dom";

const ServicesList = () => {
    const [activeHeaderTab, setActiveHeaderTab] = useState('navigation');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const services = [
        {
            id: 'birthday',
            name: 'Birthday Photography',
            imageIcon: profile,
            subhead: 'Capture your special birthday moments with professional photography services.',
            image: 'Birthday image.jpg',
            path: '/services/photography/',
            status: 'Active'
        },
        {
            id: 'wedding',
            name: 'Wedding Photography',
            imageIcon: profile,
            subhead: 'Capture your special birthday moments with professional photography services.',
            image: 'Birthday image.jpg',
            path: '/services/photography/',
            status: 'Active'
        },
        {
            id: 'babyshower',
            name: 'Baby shower Photography',
            imageIcon: profile,
            subhead: 'Capture your special birthday moments with professional photography services.',
            image: 'Birthday image.jpg',
            path: '/services/photography/',
            status: 'Active'
        },
        {
            id: 'corporate',
            name: 'Corporate Photography',
            imageIcon: profile,
            subhead: 'Capture your special birthday moments with professional photography services.',
            image: 'Birthday image.jpg',
            path: '/services/photography/',
            status: 'Active'
        },
        {
            id: 'naming',
            name: 'naming Photography',
            imageIcon: profile,
            subhead: 'Capture your special birthday moments with professional photography services.',
            image: 'Birthday image.jpg',
            path: '/services/photography/',
            status: 'Active'
        },
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
                                        // onClick={() => setIsModalOpen(true)}
                                        className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-1"
                                    >
                                        <span>+</span>
                                        <span>Add Section</span>
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
                                                    className="border border-black p-4 flex flex-col justify-between relative"
                                                >

                                                    <div>
                                                        <div className="flex items-start">
                                                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                                                <img src={service.imageIcon} alt={service.name} className="w-8 h-8 object-contain" />
                                                            </div>

                                                            <div className="font-medium text-[18px] mb-2 text-black leading-snug break-words max-w-[150px]">
                                                                {service.name}
                                                            </div>
                                                        </div>

                                                        {service.subhead && (
                                                            <p className="text-[12px] font-medium border mb-2 border-black text-black px-2 py-1">
                                                                {service.subhead}
                                                            </p>
                                                        )}

                                                        {service.image && (
                                                            <div className="flex items-center gap-2 text-[11px] text-gray-600 mb-1">
                                                                <img src={uploadImg} alt="upload" className="w-4 h-4 object-contain" />
                                                                <span className='text-black'>{service.image}</span>
                                                            </div>
                                                        )}


                                                        {service.path && (
                                                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                                                <img src={link} alt="link" className="w-5 h-5 object-contain" />
                                                                {/* <span>{service.image}</span> */}
                                                                <span className='text-black'>{service.path}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Edit & Delete Buttons */}
                                                    <div className="absolute top-2 right-2 flex">
                                                        <button
                                                            onClick={() => setIsModalOpen(true)}
                                                            className="px-2 py-1  text-[10px] font-medium hover:bg-gray-50 flex items-center gap-1">
                                                            <img src={edit} alt="edit" className="w-5 h-5" />

                                                        </button>
                                                        <button className="px-2 py-1 text-[10px] font-medium hover:bg-gray-50 flex items-center gap-1">
                                                            <img src={deletee} alt="delete" className="w-5 h-5" />

                                                        </button>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {activeHeaderTab === 'logo' && <Logosettings />}
                                {activeHeaderTab === 'action' && <p className="mt-5 text-[16px] font-medium text-black">Call to Action content coming soon...</p>}
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
                        <EditService onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default ServicesList;