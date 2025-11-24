import React from 'react';
import link from './../../assets/Icons/link.png';

const Services = () => {
    return (
        <div className="space-y-3 mb-5">
            {[1, 2].map((_, index) => (
                <div key={index} className="max-w-xs">
                    <h1 className='text-[14px] font-medium mb-1'>Add name</h1>
                    <div className="relative border border-black rounded bg-white">
                        <input
                            type="text"
                            placeholder="Enter the Title"
                            className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
                        />
                        <img
                            src={link}
                            alt="link"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Services;
