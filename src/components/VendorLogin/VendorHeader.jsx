import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorProfile } from '../../redux/vendorSlice';

const VendorHeader = () => {
  const dispatch = useDispatch();
  const { vendor, loading } = useSelector((state) => state.vendor);

  // Fetch vendor profile on component mount
  useEffect(() => {
    dispatch(getVendorProfile());
  }, [dispatch]);

  // Get business name from profile or use default
  const businessName = vendor?.businessName || "VENDOR BUSINESS";
  
  // Get first letter for avatar
  const avatarLetter = businessName.charAt(0).toUpperCase();

  return (
    <div className="bg-white border-b border-black px-6 py-4 flex justify-between items-start flex-shrink-0">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center mt-2 w-full">
          <div className="flex items-center px-2 w-[70%]">
            <p className='text-[26px] font-semibold text-black'>VENDOR DASHBOARD</p>
          </div>
          <div className="flex items-center gap-3 ml-4">
            {loading ? (
              <span className="text-black font-medium">Loading...</span>
            ) : (
              <>
                <span className="text-black font-medium">{businessName}</span>
                <div className="w-10 h-10 bg-gray-300 flex items-center rounded-full justify-center text-white font-semibold">
                  {avatarLetter}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;