import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeader, updateHeader, clearError, clearSuccess } from '../../redux/headerSlice';
import uploadImg from "../../assets/Icons/uploadImg.png";

const LogoSettingsTab = () => {
  const dispatch = useDispatch();
  const { headerData, loading, error, success } = useSelector(state => state.header);
  
  const [width, setWidth] = useState(100);
  const [siteTitle, setSiteTitle] = useState('');
  const [siteLogoFile, setSiteLogoFile] = useState(null);
  const [siteIconFile, setSiteIconFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  // Fetch header data on component mount
  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  // Update local state when headerData changes
  useEffect(() => {
    if (headerData) {
      if (headerData.logoSettings) {
        setWidth(headerData.logoSettings.logoWidth || 100);
        setSiteTitle(headerData.logoSettings.siteTitle || '');
        if (headerData.logoSettings.siteLogo) {
          setLogoPreview(headerData.logoSettings.siteLogo);
        }
      }
    }
  }, [headerData]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      alert('Header settings saved successfully!');
      dispatch(clearSuccess());
    }
    if (error) {
      alert(`Error: ${error}`);
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  const handleWidthChange = (e) => {
    const value = parseInt(e.target.value) || 100;
    setWidth(value);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSiteLogoFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSiteIconFile(file);
    }
  };

  const handleRemoveLogo = () => {
    setSiteLogoFile(null);
    setLogoPreview(headerData?.logoSettings?.siteLogo || '');
    // You can dispatch an action to remove logo from server if needed
  };

  const handleSaveChanges = async () => {
    const formData = {
      logoSettings: {
        siteTitle,
        logoWidth: width,
        siteIcon: siteIconFile ? 'uploading...' : headerData?.logoSettings?.siteIcon || '',
      },
      vendorLoginButton: headerData?.vendorLoginButton || { text: 'Vendor Login', link: '/vendor-login', active: true }
    };

    const files = {};
    if (siteLogoFile) files.siteLogo = siteLogoFile;
    if (siteIconFile) files.siteIcon = siteIconFile;

    await dispatch(updateHeader({ data: formData, files }));
  };

  if (loading && !headerData) {
    return (
      <div className="grid grid-cols-2 mb-5">
        <div className="space-y-6">
          <div className="border border-gray-300 w-80 h-24 flex items-center justify-center bg-gray-50">
            <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="animate-pulse w-64 h-10 bg-gray-300"></div>
          <div className="animate-pulse w-64 h-10 bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Logo Settings Tab Content */}
      <div className="grid grid-cols-2 mb-5">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Site Logo */}
          <div>
            <label className="block text-[16px] font-semibold text-black mb-3">
              Site Logo
            </label>
            <div className="border border-gray-300 w-80 h-24 flex items-center justify-center bg-gray-50">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Site Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="w-20 h-20 bg-[#6331F9] rounded"></div>
              )}
            </div>
            <div className="flex ml-12 gap-3 mt-3">
              <button 
                onClick={handleRemoveLogo}
                className="px-4 py-2 border border-black text-[14px] font-medium hover:bg-gray-50"
              >
                Remove
              </button>
              <label className="px-4 py-2 border border-black text-[14px] font-medium hover:bg-gray-50 cursor-pointer">
                Change logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          {/* Logo Width */}
          <div>
            <label className="block text-[14px] font-semibold text-black mb-2">
              Logo Width
            </label>
            <div className="flex items-center gap-4">
              {/* Dynamic width bar */}
              <div
                className="h-2 bg-gray-400 border border-black rounded"
                style={{ width: `${width}px` }}
              ></div>

              {/* Input to change width */}
              <div className="flex items-center border border-black px-2 py-1 w-16">
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  className="w-full outline-none text-center text-[14px]"
                  min="50"
                  max="300"
                />
              </div>
              <span className="text-[14px] font-medium text-black">px</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Site Title */}
          <div className="w-64">
            <label className="block text-[14px] font-semibold text-black mb-2">
              Site Title
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Phozt.com"
              className="w-full px-3 py-2 border placeholder:text-black border-black outline-none text-[14px]"
            />
          </div>

          {/* Site Icon */}
          <div className="w-64">
            <label className="block text-[14px] font-semibold text-black mb-2">
              Site Icon
            </label>
            <label className="flex items-center gap-2 px-3 py-2 border border-black bg-white cursor-pointer">
              <img
                src={uploadImg}
                alt="Upload Icon"
                className="w-4 h-4 text-gray-600"
              />
              <span className="text-[14px] text-gray-600">
                {siteIconFile ? siteIconFile.name : (headerData?.logoSettings?.siteIcon ? 'Icon uploaded' : 'Upload icon here')}
              </span>
              <input
                type="file"
                accept=".ico,.png,.jpg,.jpeg"
                className="hidden"
                onChange={handleIconChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSaveChanges}
          disabled={loading}
          className="px-6 py-2 bg-white border border-black text-[16px] font-medium hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </>
  );
};

export default LogoSettingsTab;