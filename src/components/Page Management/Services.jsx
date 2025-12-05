import React, { useState, useEffect } from 'react';
import link from './../../assets/Icons/link.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimaryFooter, updatePrimaryFooterField, deletePrimaryFooterItem } from '../../redux/footerSlice';

const Services = () => {
  const dispatch = useDispatch();
  const { primaryFooter, loading } = useSelector(state => state.footer);
  
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');

  useEffect(() => {
    dispatch(fetchPrimaryFooter());
  }, [dispatch]);

  useEffect(() => {
    if (primaryFooter?.services) {
      setServices(primaryFooter.services);
    }
  }, [primaryFooter]);

  const handleAddService = async () => {
    if (!newService.trim()) return;
    
    try {
      await dispatch(updatePrimaryFooterField({
        field: 'services',
        value: newService
      })).unwrap();
      
      setNewService('');
      dispatch(fetchPrimaryFooter()); // Refresh data
      alert('Service added successfully!');
    } catch (error) {
      alert('Failed to add service: ' + error);
    }
  };

  const handleDeleteService = async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service}"?`)) {
      try {
        await dispatch(deletePrimaryFooterItem({
          section: 'services',
          value: service
        })).unwrap();
        
        dispatch(fetchPrimaryFooter()); // Refresh data
        alert('Service deleted successfully!');
      } catch (error) {
        alert('Failed to delete service: ' + error);
      }
    }
  };

  return (
    <div className="space-y-3 mb-5">
      <div className="max-w-md">
        <label className="block text-[20px] font-semibold text-black mb-1">
          Add Service
        </label>
        <div className="flex gap-2 mb-4">
          <div className="relative border border-black rounded bg-white flex-1">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Enter the service title"
              className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
            />
            <img
              src={link}
              alt="link"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4"
            />
          </div>
          <button
            onClick={handleAddService}
            disabled={loading || !newService.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 whitespace-nowrap"
          >
            Add Service
          </button>
        </div>
      </div>

      {/* Display existing services */}
      <div className="max-w-md">
        <h3 className="text-[18px] font-semibold text-black mb-2">Current Services:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500">No services added yet</p>
        ) : (
          <div className="space-y-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between border border-gray-200 rounded p-3">
                <div className="flex items-center gap-2">
                  <img src={link} alt="link" className="w-4 h-4" />
                  <span className="text-[14px] font-medium">{service}</span>
                </div>
                <button
                  onClick={() => handleDeleteService(service)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;