import React from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const VendorCard = ({ title, subtitle, selected }) => {
  return (
    <div className="relative border rounded-md p-3 text-sm bg-white hover:shadow transition">
      <p className="font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
        <PlusIcon className="h-4 w-4" />
      </button>

      {selected && (
        <span className="absolute top-2 right-2 text-blue-600 font-bold">
          ✓
        </span>
      )}
    </div>
  );
};

const VendorBlock = ({ blockIndex }) => {
  return (
    <div className="space-y-6 border-b pb-10">
      {/* Heading + Sub Service */}
      <div className="grid grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading for {blockIndex} sub vendor category
          </label>
          <input
            type="text"
            defaultValue="Our finest decorators"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Right */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select 1st Sub Service
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Add upto 10 internal Service vendors that shows in the page on our website
          </p>
          <select className="w-full border rounded-md px-3 py-2 text-sm bg-white">
            <option>Decoration</option>
            <option>Photography</option>
            <option>Makeup</option>
            <option>Catering</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose the Vendors from list of vendors
        </label>
        <div className="relative">
          <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages"
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-3 gap-4">
        <VendorCard
          title="Studi d Decoration"
          subtitle="Best wedding photography services in bengaluru"
          selected
        />
        <VendorCard
          title="Studio 19 Decoration"
          subtitle="Best birthday photography services in bengaluru"
        />
        <VendorCard
          title="Studio varada Decoration"
          subtitle="Best birthday photography services in bengaluru"
        />
        <VendorCard
          title="Buggy Decoration"
          subtitle="Best wedding photography services in bengaluru"
        />
        <VendorCard
          title="Studio 16 Decoration"
          subtitle="Best birthday photography services in bengaluru"
        />
        <VendorCard
          title="hari digital Decoration"
          subtitle="Best birthday photography services in bengaluru"
          selected
        />
      </div>
    </div>
  );
};

const OtherVendorsTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg space-y-12 max-w-6xl">
      {/* BLOCKS */}
      <VendorBlock blockIndex="1st (n3-1)" />
      <VendorBlock blockIndex="2nd (n3-2)" />
      <VendorBlock blockIndex="3rd (n3-3)" />
      <VendorBlock blockIndex="4th (n3-4)" />
    </div>
  );
};

export default OtherVendorsTab;
