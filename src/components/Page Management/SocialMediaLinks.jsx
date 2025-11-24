import React from 'react';
import link from './../../assets/Icons/link.png';

const SocialMediaLinks = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-5">
      {/* Left section */}
      <div className="space-y-3">
        {/* X (formerly Twitter) */}
        <div className="max-w-xs">
          <h1 className="text-[14px] font-medium mb-1">X (formerly Twitter)</h1>
          <div className="relative border border-black rounded bg-white">
            <input
              type="text"
              placeholder="Upload the link"
              className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
            />
            <img
              src={link}
              alt="link"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Facebook */}
        <div className="max-w-xs">
          <h1 className="text-[14px] font-medium mb-1">Facebook</h1>
          <div className="relative border border-black rounded bg-white">
            <input
              type="text"
              placeholder="Upload the link"
              className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
            />
            <img
              src={link}
              alt="link"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Instagram */}
        <div className="max-w-xs">
          <h1 className="text-[14px] font-medium mb-1">Instagram</h1>
          <div className="relative border border-black rounded bg-white">
            <input
              type="text"
              placeholder="Upload the link"
              className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
            />
            <img
              src={link}
              alt="link"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Right section (YouTube) */}
      <div className="md:ml-4 mt-3 md:mt-0">
        <div className="max-w-xs">
          <h1 className="text-[14px] font-medium mb-1">YouTube</h1>
          <div className="relative border border-black rounded bg-white">
            <input
              type="text"
              placeholder="Upload the link"
              className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
            />
            <img
              src={link}
              alt="link"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
