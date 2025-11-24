import React from 'react'
import { Search } from 'lucide-react'

const TopBar = () => {
  return (
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

        <h1 className="text-[36px] font-semibold text-black">
          Lead Management <span className="font-semibold">Dashboard</span>
        </h1>
      </div>
    </div>
  )
}

export default TopBar
