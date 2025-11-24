


import React from 'react';
import link from './../../assets/Icons/link.png';


const KnowUs = () => {
  return (
    <div className="space-y-3 mb-5">
      <div className="max-w-xs">
        <label className="block text-[20px] font-semibold text-black mb-1">
          About Us
        </label>
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={link} alt="upload" className="w-4 h-4" />
          <input
            type="text"
            placeholder="Add the link of empty page"
            className="w-56 text-[14px] font-semibold placeholder:text-black outline-none"
          />
        </div>
      </div>

      <div className="max-w-xs">
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white">
          <img src={link} alt="tag" className="w-4 h-4" />
          <input
            type="text"
            placeholder="Add the link of empty page "
            className="w-56 text-[14px] text-black placeholder:text-black font-semibold outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default KnowUs;
