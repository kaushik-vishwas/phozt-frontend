import React, { useState, useEffect } from 'react';
import link from './../../assets/Icons/link.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimaryFooter, upsertPrimaryFooter } from '../../redux/footerSlice';

const SocialMediaLinks = () => {
  const dispatch = useDispatch();
  const { primaryFooter, loading } = useSelector(state => state.footer);
  
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: ''
  });

  useEffect(() => {
    dispatch(fetchPrimaryFooter());
  }, [dispatch]);

  useEffect(() => {
    if (primaryFooter?.socialLinks) {
      const links = {};
      primaryFooter.socialLinks.forEach(link => {
        links[link.platform.toLowerCase()] = link.url;
      });
      setSocialLinks(prev => ({ ...prev, ...links }));
    }
  }, [primaryFooter]);

  const handleInputChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = async () => {
    // Convert object to array format expected by backend
    const socialLinksArray = Object.entries(socialLinks)
      .filter(([_, url]) => url.trim())
      .map(([platform, url]) => ({
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        url
      }));

    try {
      await dispatch(upsertPrimaryFooter({
        data: { socialLinks: socialLinksArray }
      })).unwrap();
      alert('Social media links saved successfully!');
    } catch (error) {
      alert('Failed to save links: ' + error);
    }
  };

  const platforms = [
    { key: 'twitter', label: 'X (formerly Twitter)', placeholder: 'https://twitter.com/username' },
    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/username' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/username' }
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-5">
      {/* Left section */}
      <div className="space-y-3">
        {platforms.slice(0, 3).map((platform) => (
          <div key={platform.key} className="max-w-xs">
            <h1 className="text-[14px] font-medium mb-1">{platform.label}</h1>
            <div className="relative border border-black rounded bg-white">
              <input
                type="text"
                value={socialLinks[platform.key]}
                onChange={(e) => handleInputChange(platform.key, e.target.value)}
                placeholder={platform.placeholder}
                className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
              />
              <img
                src={link}
                alt="link"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right section */}
      <div className="md:ml-4 mt-3 md:mt-0">
        {platforms.slice(3).map((platform) => (
          <div key={platform.key} className="max-w-xs">
            <h1 className="text-[14px] font-medium mb-1">{platform.label}</h1>
            <div className="relative border border-black rounded bg-white">
              <input
                type="text"
                value={socialLinks[platform.key]}
                onChange={(e) => handleInputChange(platform.key, e.target.value)}
                placeholder={platform.placeholder}
                className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
              />
              <img
                src={link}
                alt="link"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-0 md:ml-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save Social Links'}
        </button>
      </div>
    </div>
  );
};

export default SocialMediaLinks;