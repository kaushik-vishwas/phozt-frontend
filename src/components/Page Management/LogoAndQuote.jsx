import React from 'react';
import uploadImg from './../../assets/Icons/uploadImg.png';
import tag from '../../assets/Icons/tag.png'; 

const LogoAndQuote = () => {
  return (
    <div className="space-y-3 mb-5">
      <div className="max-w-xs">
        <label className="block text-[20px] font-semibold text-black mb-1">
          Footer column - title1
        </label>
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={uploadImg} alt="upload" className="w-4 h-4" />
          <input
            type="text"
            placeholder="Upload the image"
            className="w-40 text-[14px] font-semibold placeholder:text-black outline-none"
          />
        </div>
      </div>

      <div className="max-w-xs">
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={tag} alt="tag" className="w-4 h-4" />
          <input
            type="text"
            placeholder="Tagline of category"
            className="w-40 text-[14px] text-black placeholder:text-black font-semibold outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoAndQuote;
