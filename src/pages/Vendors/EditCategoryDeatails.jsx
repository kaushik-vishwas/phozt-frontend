import React, { useState } from 'react';
import { X, Pause, Plus, RefreshCw } from 'lucide-react';

const EditCategoryDetails = ({ isOpen, onClose, vendorData }) => {
  const [packageData, setPackageData] = useState({
    vendorName: vendorData?.name || 'Karthik Ramachandra',
    packageType: vendorData?.package || '50 Leads Package',
    status: vendorData?.status || 'Active',
    totalLeads: vendorData?.totalLeads || 50,
    remainingLeads: vendorData?.remainingLeads || 22,
    returnedLeads: vendorData?.returnedLeads || 5
  });

  if (!isOpen) return null;

  const progressPercentage = ((packageData.totalLeads - packageData.remainingLeads) / packageData.totalLeads) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white  shadow-xl w-full max-w-2xl mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-black">
          <h2 className="text-xl font-semibold text-gray-900">
            {packageData.vendorName} - {packageData.packageType}
          </h2>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-gray-100 text-black text-sm font-medium  border border-black">
              {packageData.status}
            </span>
            <button onClick={onClose} className="text-black hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Progress */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Package Progress</h3>
            <div className="relative">
              <div className="w-full h-8 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="border border-black  p-4">
              <div className="text-2xl font-semibold text-gray-900 mb-1">{packageData.totalLeads}</div>
              <div className="text-sm text-black">Total Leads</div>
            </div>
            <div className="border border-black  p-4">
              <div className="text-2xl font-semibold text-gray-900 mb-1">{packageData.remainingLeads}</div>
              <div className="text-sm text-black">Remaining Leads</div>
            </div>
            <div className="border border-black  p-4">
              <div className="text-2xl font-semibold text-gray-900 mb-1">{packageData.returnedLeads}</div>
              <div className="text-sm text-black">Returned Leads</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-black bg-white  text-sm font-medium text-black hover:bg-gray-50">
              <Pause size={18} /> Pause Package
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-black bg-white  text-sm font-medium text-black hover:bg-gray-50">
              <Plus size={18} /> Add Leads
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-black bg-white  text-sm font-medium text-black hover:bg-gray-50">
              <RefreshCw size={18} /> Reassign Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryDetails;
