import React, { useState, useEffect } from 'react';
import uploadImg from './../../assets/Icons/uploadImg.png';
import tag from '../../assets/Icons/tag.png'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimaryFooter, upsertPrimaryFooter } from '../../redux/footerSlice';

const LogoAndQuote = () => {
  const dispatch = useDispatch();
  const { primaryFooter, loading } = useSelector(state => state.footer);
  
  const [formData, setFormData] = useState({
    tagline: '',
    aboutUs: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    dispatch(fetchPrimaryFooter());
  }, [dispatch]);

  useEffect(() => {
    if (primaryFooter) {
      setFormData({
        tagline: primaryFooter.tagline || '',
        aboutUs: primaryFooter.aboutUs || ''
      });
      if (primaryFooter.logo) {
        setLogoPreview(primaryFooter.logo);
      }
    }
  }, [primaryFooter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(upsertPrimaryFooter({ 
        data: formData, 
        logoFile 
      })).unwrap();
      alert('Logo and quote saved successfully!');
    } catch (error) {
      alert('Failed to save: ' + error);
    }
  };

  return (
    <div className="space-y-3 mb-5">
      <div className="max-w-xs">
        <label className="block text-[20px] font-semibold text-black mb-1">
          Footer Logo
        </label>
        
        {/* Logo Preview */}
        {logoPreview && (
          <div className="mb-3">
            <img 
              src={logoPreview} 
              alt="Logo preview" 
              className="w-32 h-32 object-contain border border-gray-300 rounded"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={uploadImg} alt="upload" className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-40 text-[14px] font-semibold placeholder:text-black outline-none"
          />
        </div>
      </div>

      <div className="max-w-xs">
        <label className="block text-[20px] font-semibold text-black mb-1">
          Tagline
        </label>
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={tag} alt="tag" className="w-4 h-4" />
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            placeholder="Tagline of category"
            className="w-40 text-[14px] text-black placeholder:text-black font-semibold outline-none"
          />
        </div>
      </div>

      <div className="max-w-xs">
        <label className="block text-[20px] font-semibold text-black mb-1">
          About Us
        </label>
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={tag} alt="tag" className="w-4 h-4" />
          <input
            type="text"
            name="aboutUs"
            value={formData.aboutUs}
            onChange={handleInputChange}
            placeholder="About us description"
            className="w-40 text-[14px] text-black placeholder:text-black font-semibold outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default LogoAndQuote;