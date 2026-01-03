// PagesManagementDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Search, Camera, Trash2, Edit, Image as ImageIcon, Plus, Upload, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllNavigations,
  fetchAllSubServices,
  deleteNavigation,
  deleteSubService,
  fetchFullNavigation
} from '../../redux/navigationSlice';
import { getAllImages } from '../../redux/imageSlice';
import { fetchHeader, updateHeader } from '../../redux/headerSlice';
import Sidebar from "../../components/Sidebar";
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
import SocialMediaLinks from '../../components/Page Management/SocialMediaLinks';
import Logosettings from '../../components/Page Management/Logosettings';
// import VendorLogin from '../../components/Page Management/VendorLoginSettings';
import SecondaryFooter from '../../components/Page Management/secondaryFooter';
import { useNavigate } from "react-router-dom";

const PagesManagementDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Redux state
    const { navigations, subServices, loading, error, success } = useSelector(state => state.navigation);
    const { headerData, loading: headerLoading } = useSelector(state => state.header);
    
    const [activeHeaderTab, setActiveHeaderTab] = useState('navigation');
    const [activeFooterType, setActiveFooterType] = useState("primary");
    const [activeFooterTab, setActiveFooterTab] = useState("Logo and quote");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNavigation, setEditingNavigation] = useState(null);
    const [editingSubService, setEditingSubService] = useState(null);
    const [uploadingHeaderImage, setUploadingHeaderImage] = useState(false);
    const [headerImageFile, setHeaderImageFile] = useState(null);
    const [headerImagePreview, setHeaderImagePreview] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchAllNavigations());
        dispatch(fetchAllSubServices());
        dispatch(fetchHeader()); // Fetch header data
    }, [dispatch]);

    // Update header image preview when headerData changes
    useEffect(() => {
        if (headerData?.headerImage) {
            setHeaderImagePreview(headerData.headerImage);
        }
    }, [headerData]);

    // Handle navigation service deletion
    const handleDeleteNavigation = async (id) => {
        if (window.confirm('Are you sure you want to delete this navigation service? This will also delete all its sub-services.')) {
            await dispatch(deleteNavigation(id));
            dispatch(fetchAllNavigations());
            dispatch(fetchAllSubServices());
        }
    };

    // Handle sub-service deletion
    const handleDeleteSubService = async (id) => {
        if (window.confirm('Are you sure you want to delete this sub-service?')) {
            await dispatch(deleteSubService(id));
            dispatch(fetchAllSubServices());
        }
    };

    // Handle header image upload
    const handleHeaderImageUpload = async (file) => {
        if (!file) return;
        
        setUploadingHeaderImage(true);
        setHeaderImageFile(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setHeaderImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        
        try {
            // Prepare current data for other fields
            const currentLogoSettings = headerData?.logoSettings || {};
            const currentVendorLoginButton = headerData?.vendorLoginButton || {};
            
            // Dispatch updateHeader action
            await dispatch(updateHeader({ 
                data: { 
                    logoSettings: currentLogoSettings, 
                    vendorLoginButton: currentVendorLoginButton
                }, 
                files: { headerImage: file }
            })).unwrap();
            
            alert('Header image updated successfully!');
        } catch (err) {
            alert('Failed to upload header image: ' + err.message);
        } finally {
            setUploadingHeaderImage(false);
        }
    };

    // Get sub-services for a specific navigation
    const getSubServicesForNavigation = (navigationId) => {
        return subServices.filter(sub => sub.navigationService === navigationId);
    };

    const footerTabs = ['Logo and quote', 'Know Us', 'Services', 'Needed to Know', 'Social Media links'];

    const pageManager = [
        { id: 1, name: 'Home Page', description: 'Edit the Home media and cards', icon: home },
        { id: 2, name: 'Service Page', description: 'Add/Edit the Vendors Services', icon: service },
        { id: 3, name: 'City Page', description: 'Add/Edit the Area in city', icon: city },
        { id: 4, name: 'Empty pages', description: 'Add/Edit the Only text browser', icon: empty },
    ];

    // Handle navigation service edit
    const handleEditNavigation = (nav) => {
        setEditingNavigation(nav);
        setIsModalOpen(true);
    };

    // Handle sub-service edit
    const handleEditSubService = (sub) => {
        setEditingSubService(sub);
        console.log('Editing sub-service:', sub);
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingNavigation(null);
        setEditingSubService(null);
    };

    // Handle save changes
    const handleSaveChanges = () => {
        alert('Changes saved successfully!');
    };

    // Handle file input for header image
    const handleHeaderFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleHeaderImageUpload(file);
            e.target.value = ''; // Reset input
        }
    };

    // Clear header image
    const handleClearHeaderImage = async () => {
        if (window.confirm('Are you sure you want to remove the header image?')) {
            try {
                // Get current data
                const currentLogoSettings = headerData?.logoSettings || {};
                const currentVendorLoginButton = headerData?.vendorLoginButton || {};
                
                // Update with empty header image
                await dispatch(updateHeader({ 
                    data: { 
                        logoSettings: currentLogoSettings, 
                        vendorLoginButton: currentVendorLoginButton,
                        headerImage: '' 
                    }, 
                    files: {} 
                })).unwrap();
                
                setHeaderImagePreview(null);
                setHeaderImageFile(null);
                alert('Header image removed successfully!');
            } catch (err) {
                alert('Failed to remove header image: ' + err.message);
            }
        }
    };

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
                        {/* Loading and Error States */}
                        {loading && (
                            <div className="text-center py-4">
                                <p>Loading...</p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Header Management Section */}
                        <div className="bg-white border border-black ">
                            <div className="p-5 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[24px] font-semibold text-black">Header Management</h2>
                                    <button
                                        onClick={() => {
                                            setEditingNavigation(null);
                                            setIsModalOpen(true);
                                        }}
                                        className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-1"
                                    >
                                        <span>+</span>
                                        <span>Add Service</span>
                                    </button>

                                    <button
    onClick={() => navigate('/dropdown-management')}
    className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-1"
>
    <span>+</span>
    <span>Dropdown Management</span>
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
                                        onClick={() => setActiveHeaderTab('images')}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeHeaderTab === 'images'
                                            ? 'text-[#6331F9] border-[#6331F9]'
                                            : 'text-black border-transparent'
                                            }`}
                                    >
                                        Images
                                    </button>

                                    <button
                                        onClick={() => setActiveHeaderTab('vendor-login')}
                                        className={`pb-3 text-[14px] font-semibold border-b-2 transition-colors ${activeHeaderTab === 'vendor-login'
                                            ? 'text-[#6331F9] border-[#6331F9]'
                                            : 'text-black border-transparent'
                                            }`}
                                    >
                                        Vendor Login
                                    </button>
                                </div>

                                {/* Conditional render for tabs */}
                                {activeHeaderTab === 'navigation' && (
                                    <>
                                        <div className="grid grid-cols-3 gap-4 mb-5">
                                            {navigations.map((nav) => {
                                                const navSubServices = getSubServicesForNavigation(nav._id);
                                                return (
                                                    <div
                                                        key={nav._id}
                                                        className="border border-black p-4 flex flex-col justify-between"
                                                    >
                                                        <div>
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                                        <Camera size={20} className="text-gray-600" />
                                                                    </div>
                                                                    <div className="font-medium text-[18px] text-black">
                                                                        {nav.title}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`inline-block px-2 py-0.5 rounded text-[14px] font-medium ${nav.active
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : 'bg-gray-100 text-gray-600'
                                                                        }`}
                                                                >
                                                                    {nav.active ? 'Active' : 'Inactive'}
                                                                </div>
                                                            </div>

                                                            {nav.info && (
                                                                <p className="text-[12px] font-medium text-black mb-3">
                                                                    {nav.info}
                                                                </p>
                                                            )}

                                                            {/* Display sub-services for this navigation */}
                                                            {navSubServices.length > 0 && (
                                                                <div className="mt-3">
                                                                    <p className="text-sm font-semibold mb-2">Sub-Services:</p>
                                                                    <div className="space-y-2">
                                                                        {navSubServices.map(sub => (
                                                                            <div key={sub._id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                                                <div className="flex items-center gap-2">
                                                                                    {sub.image && (
                                                                                        <img 
                                                                                            src={sub.image} 
                                                                                            alt={sub.title} 
                                                                                            className="w-8 h-8 object-cover rounded"
                                                                                        />
                                                                                    )}
                                                                                    <span className="text-sm">{sub.title}</span>
                                                                                </div>
                                                                                <div className="flex gap-1">
                                                                                    <button
                                                                                        onClick={() => handleEditSubService(sub)}
                                                                                        className="p-1 hover:bg-gray-200 rounded"
                                                                                    >
                                                                                        <Edit size={14} />
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleDeleteSubService(sub._id)}
                                                                                        className="p-1 hover:bg-red-100 rounded text-red-600"
                                                                                    >
                                                                                        <Trash2 size={14} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex gap-2 mt-3">
                                                            <button 
                                                                onClick={() => handleEditNavigation(nav)}
                                                                className="flex-1 px-3 py-1.5 border border-black text-[12px] font-medium hover:bg-gray-50 flex items-center justify-center gap-1"
                                                            >
                                                                <img src={edit} alt="edit" className="w-3.5 h-3.5" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteNavigation(nav._id)}
                                                                className="flex-1 px-3 py-1.5 border border-black text-[12px] font-medium hover:bg-gray-50 flex items-center justify-center gap-1"
                                                            >
                                                                <img src={deletee} alt="delete" className="w-3.5 h-3.5" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="flex justify-end">
                                            <button 
                                                onClick={handleSaveChanges}
                                                className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <img src={save} alt="save" className="w-4 h-4" />
                                                <span>Save changes</span>
                                            </button>
                                        </div>
                                    </>
                                )}

                                {activeHeaderTab === 'logo' && <Logosettings />}
                                
                                {activeHeaderTab === 'images' && (
                                    <div className="mt-5">
                                        {/* Header Image Section */}
                                        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
                                            <h3 className="text-[18px] font-semibold text-black mb-4">Header Image Management</h3>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Current Header Image Preview */}
                                                <div className="md:w-1/3">
                                                    <h4 className="text-[14px] font-medium text-gray-700 mb-2">Current Header Image</h4>
                                                    {headerLoading ? (
                                                        <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center">
                                                            <p>Loading...</p>
                                                        </div>
                                                    ) : headerImagePreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={headerImagePreview}
                                                                alt="Header Preview"
                                                                className="w-full h-40 object-cover rounded border border-gray-300"
                                                            />
                                                            <button
                                                                onClick={handleClearHeaderImage}
                                                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 text-red-600"
                                                                title="Remove header image"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-100 rounded flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                                                            <ImageIcon size={32} className="text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-500">No header image set</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Upload New Header Image */}
                                                <div className="md:w-2/3">
                                                    <h4 className="text-[14px] font-medium text-gray-700 mb-2">Upload New Header Image</h4>
                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                                        <div className="flex flex-col items-center justify-center space-y-4">
                                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                                <Upload size={24} className="text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="file"
                                                                    id="headerImageUpload"
                                                                    accept="image/*"
                                                                    onChange={handleHeaderFileInputChange}
                                                                    className="hidden"
                                                                    disabled={uploadingHeaderImage}
                                                                />
                                                                <label
                                                                    htmlFor="headerImageUpload"
                                                                    className={`px-4 py-2 rounded transition-colors mb-2 cursor-pointer inline-block ${uploadingHeaderImage
                                                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                                                    }`}
                                                                >
                                                                    {uploadingHeaderImage ? 'Uploading...' : 'Choose Header Image'}
                                                                </label>
                                                                <p className="text-sm text-gray-500">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500 text-center">
                                                                Recommended: 1920×400 px • Supports: JPG, PNG, WebP • Max 5MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {headerImageFile && (
                                                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                                            <div className="flex items-center gap-2">
                                                                <Check size={16} className="text-green-600" />
                                                                <span className="text-sm text-blue-800">
                                                                    {headerImageFile.name} ready to upload
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <button 
                                                onClick={handleSaveChanges}
                                                className="px-4 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <img src={save} alt="save" className="w-4 h-4" />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeHeaderTab === 'vendor-login' && <VendorLogin />}
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

                               {activeFooterType === "primary" && (
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
                                )}

                               <div className="mt-5">
                                    {activeFooterType === "primary" && (
                                    <>
                                        {activeFooterTab === "Logo and quote" && <LogoAndQuote />}
                                        {activeFooterTab === "Know Us" && <KnowUs />}
                                        {activeFooterTab === "Services" && <Services />}
                                        {activeFooterTab === "Needed to Know" && <NeededtoKnow />}
                                        {activeFooterTab === "Social Media links" && <SocialMediaLinks />}
                                    </>
                                    )}
                                    {activeFooterType === "secondary" && <SecondaryFooter />}
                                </div>

                              {activeFooterType === "primary" && (
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
                                )}
                            </div>
                        </div>

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

            {/* Modal for adding/editing navigation service */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleModalClose();
                        }
                    }}
                >
                    <div className="w-[600px] max-w-full">
                        <NewHeaderSection 
                            onClose={handleModalClose} 
                            editingNavigation={editingNavigation}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PagesManagementDashboard;