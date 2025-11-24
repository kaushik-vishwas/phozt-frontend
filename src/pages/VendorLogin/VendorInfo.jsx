import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import VendorSidebar from "../../components/VendorLogin/VendorSidebar";
import VendorHeader from "../../components/VendorLogin/VendorHeader";
import { getVendorProfile, updateVendorProfile } from '../../redux/vendorSlice';

const VendorInfo = () => {
    const dispatch = useDispatch();
    const { vendor, loading } = useSelector((state) => state.vendor);
    
    const [formData, setFormData] = useState({
        businessName: '',
        contactPersonName: '',
        whatsappNumber: '',
        address: '',
        city: '',
        mobile: '',
        facebookLink: '',
        instagramLink: '',
        youtubeLink: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Load vendor profile when component mounts
    useEffect(() => {
        dispatch(getVendorProfile());
    }, [dispatch]);

    // Populate form when vendor data is available
    useEffect(() => {
        if (vendor) {
            setFormData({
                businessName: vendor.businessName || '',
                contactPersonName: vendor.contactPersonName || '',
                whatsappNumber: vendor.whatsappNumber || '',
                address: vendor.address || '',
                city: vendor.city || '',
                mobile: vendor.mobile || '',
                facebookLink: vendor.facebookLink || '',
                instagramLink: vendor.instagramLink || '',
                youtubeLink: vendor.youtubeLink || ''
            });
        }
    }, [vendor]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        // Reset form to original vendor data
        if (vendor) {
            setFormData({
                businessName: vendor.businessName || '',
                contactPersonName: vendor.contactPersonName || '',
                whatsappNumber: vendor.whatsappNumber || '',
                address: vendor.address || '',
                city: vendor.city || '',
                mobile: vendor.mobile || '',
                facebookLink: vendor.facebookLink || '',
                instagramLink: vendor.instagramLink || '',
                youtubeLink: vendor.youtubeLink || ''
            });
        }
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    };

  const handleUpdate = async () => {
    try {
        // Filter out empty fields and prepare data for API
        const updateData = {};
        Object.keys(formData).forEach(key => {
            if (formData[key] !== '') {
                updateData[key] = formData[key];
            }
        });

        await dispatch(updateVendorProfile(updateData)).unwrap();
        
        // 🔥 FORCE REFRESH: Wait a moment and then refetch the profile
        setTimeout(() => {
            dispatch(getVendorProfile());
        }, 500);
        
        setMessage({ 
            type: 'success', 
            text: 'Profile updated successfully!' 
        });
        setIsEditing(false);
        
        // Clear message after 3 seconds
        setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 3000);

    } catch (error) {
        setMessage({ 
            type: 'error', 
            text: error.message || 'Failed to update profile. Please try again.' 
        });
    }
};

    const handleEdit = () => {
        setIsEditing(true);
        setMessage({ type: '', text: '' });
    };

    if (loading && !vendor) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                <VendorSidebar />
                <div className="flex-1 ml-64 overflow-auto">
                    <VendorHeader />
                    <div className="p-8">
                        <div className="flex justify-center items-center h-64">
                            <p className="text-gray-500">Loading profile...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <VendorSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 overflow-auto">
                {/* Common Header */}
                <VendorHeader />

                {/* Content */}
                <div className="p-8">
                    {/* Message Alert */}
                    {message.text && (
                        <div className={`mb-4 p-4 rounded ${
                            message.type === 'success' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Profile Analytics */}
                    <div className="mb-8">
                        <h2 className="text-[25px] font-semibold text-black mb-4">PROFILE ANALYTICS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border border-black p-6 text-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">60</div>
                                <div className="text-[25px] text-black font-medium">TOTAL LEADS</div>
                            </div>
                            <div className="bg-white border border-black p-6 text-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">60</div>
                                <div className="text-[25px] text-black font-medium">RECEIVED LEADS</div>
                            </div>
                            <div className="bg-white border border-black p-6 text-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">2</div>
                                <div className="text-[25px] text-black font-medium">RETURNED LEADS</div>
                            </div>
                        </div>
                    </div>

                    {/* Information Form */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[25px] font-semibold text-black">PERSONAL OR STUDIO INFORMATION</h2>
                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="px-6 py-2 border border-gray-800 text-black hover:bg-gray-50 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                    
                    <div className="bg-white border border-black p-8">
                        <div className="space-y-6">
                            {/* Login Mobile Number (Read-only) */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">LOGIN MOBILE NUMBER</label>
                                <input
                                    type="text"
                                    value={vendor?.mobile || 'N/A'}
                                    disabled
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] bg-gray-100"
                                />
                            </div>

                            {/* Business Name */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">BUSINESS NAME</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* Contact Person Name */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">CONTACT PERSON NAME</label>
                                <input
                                    type="text"
                                    name="contactPersonName"
                                    value={formData.contactPersonName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* WhatsApp Number */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm font-medium">WHATSAPP NUMBER</label>
                                <input
                                    type="text"
                                    name="whatsappNumber"
                                    value={formData.whatsappNumber}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* Address */}
                            <div className="grid grid-cols-3 gap-4 items-start">
                                <label className="text-sm text-black font-medium">ADDRESS</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="4"
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-100"
                                />
                            </div>

                            {/* City */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">CITY</label>
                                <div className="col-span-2 relative">
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:bg-gray-100"
                                    >
                                        <option value="">Select City</option>
                                        <option value="Bengaluru">Bengaluru</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Kolkata">Kolkata</option>
                                        <option value="Pune">Pune</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Facebook Link */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">FACEBOOK LINK</label>
                                <input
                                    type="text"
                                    name="facebookLink"
                                    value={formData.facebookLink}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* Instagram Link */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">INSTAGRAM LINK</label>
                                <input
                                    type="text"
                                    name="instagramLink"
                                    value={formData.instagramLink}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* YouTube Link */}
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label className="text-sm text-black font-medium">YOUTUBE LINK</label>
                                <input
                                    type="text"
                                    name="youtubeLink"
                                    value={formData.youtubeLink}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="col-span-2 px-4 py-2 border border-gray-300 text-[#413F3F] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="px-8 py-2.5 border border-gray-300 text-black hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={loading}
                                        className="px-8 py-2.5 border border-gray-800 text-black hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorInfo;