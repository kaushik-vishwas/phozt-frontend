import React, { useState } from 'react';
import uploadImg from "../../assets/Icons/uploadImg.png";

const EditService = ({ onClose }) => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [buttonTitle, setButtonTitle] = useState('');
  const [buttonUrl, setButtonUrl] = useState('');
  const [serviceImage, setServiceImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServiceImage(file);
    }
  };

  const handleCancel = () => {
    setServiceTitle('');
    setServiceDescription('');
    setButtonTitle('');
    setButtonUrl('');
    setServiceImage(null);
    onClose(); // ✅ close the modal when cancel is clicked
  };

  const handleSaveService = () => {
    console.log({
      serviceTitle,
      serviceDescription,
      buttonTitle,
      buttonUrl,
      serviceImage
    });

  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white shadow-xl w-full max-w-md relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-[32px] font-semibold text-black">Edit Service</h2>
      
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Service Title */}
          <div>
            <label className="block text-[22px] font-medium text-black mb-2">
              Service Title
            </label>
            <input
              type="text"
              placeholder="Eg: birthday photography"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Service Description */}
          <div>
            <label className="block text-[22px] font-medium text-gray-900 mb-2">
              Service Description
            </label>
            <textarea
              placeholder="Eg: Capture your special birthday moments with professional photography services."
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Button Title */}
          <div>
            <label className="block text-[22px] font-medium text-gray-900 mb-2">
              Button Title
            </label>
            <input
              type="text"
              placeholder="Eg: Click here"
              value={buttonTitle}
              onChange={(e) => setButtonTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* URL for button */}
          <div>
            <label className="block text-[20px] font-medium text-gray-900 mb-2">
              Url for button (page linked)
            </label>
            <input
              type="text"
              placeholder="Eg : Page Link"
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/*Updated Service Image Section */}
          <div>
            <label className="block text-[22px] font-medium text-gray-900 mb-2">
              Service Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="w-full px-4 py-2.5 border border-black placeholder:text-black flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-600"
              >
                <img
                  src={uploadImg}
                  alt="Upload"
                  className="w-4 h-4 object-contain"
                />
                {serviceImage ? serviceImage.name : 'Upload the image here'}
              </label>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-5 py-2 border border-black font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveService}
            className="px-5 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            Save service
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditService;
