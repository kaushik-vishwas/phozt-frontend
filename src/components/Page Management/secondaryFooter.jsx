// components/Page Management/SecondaryFooter.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSecondaryFooters,
  createSecondaryFooter,
  updateSecondaryFooter,
  deleteSecondaryFooter
} from '../../redux/footerSlice';

const SecondaryFooter = () => {
  const dispatch = useDispatch();
  const { secondaryFooters, secondaryLoading, secondaryError, secondarySuccess } = useSelector(state => state.footer);
  
  const [formData, setFormData] = useState({
    city: '',
    services: [{ title: '', areas: [] }]
  });
  const [editingId, setEditingId] = useState(null);
  const [newArea, setNewArea] = useState('');
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSecondaryFooters());
  }, [dispatch]);

  useEffect(() => {
    if (secondarySuccess) {
      dispatch(fetchSecondaryFooters());
    }
  }, [secondarySuccess, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceTitleChange = (index, value) => {
    const newServices = [...formData.services];
    newServices[index].title = value;
    setFormData(prev => ({ ...prev, services: newServices }));
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { title: '', areas: [] }]
    }));
  };

  const handleRemoveService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, services: newServices }));
  };

  const handleAddArea = (serviceIndex) => {
    if (!newArea.trim()) return;
    
    const newServices = [...formData.services];
    if (!newServices[serviceIndex].areas) {
      newServices[serviceIndex].areas = [];
    }
    newServices[serviceIndex].areas.push(newArea.trim());
    setFormData(prev => ({ ...prev, services: newServices }));
    setNewArea('');
  };

  const handleRemoveArea = (serviceIndex, areaIndex) => {
    const newServices = [...formData.services];
    newServices[serviceIndex].areas = newServices[serviceIndex].areas.filter((_, i) => i !== areaIndex);
    setFormData(prev => ({ ...prev, services: newServices }));
  };

  const handleEdit = (footer) => {
    setFormData({
      city: footer.city,
      services: footer.services.map(service => ({
        title: service.title,
        areas: service.areas || []
      }))
    });
    setEditingId(footer._id);
  };

  const handleCancelEdit = () => {
    setFormData({
      city: '',
      services: [{ title: '', areas: [] }]
    });
    setEditingId(null);
    setNewArea('');
  };

  const handleSubmit = async () => {
    // Filter out empty services
    const validServices = formData.services.filter(service => 
      service.title.trim() && service.areas.length > 0
    );

    if (!formData.city.trim() || validServices.length === 0) {
      alert('Please fill in city and at least one service with areas');
      return;
    }

    const payload = {
      city: formData.city.trim(),
      services: validServices.map(service => ({
        title: service.title.trim(),
        areas: service.areas
      }))
    };

    try {
      if (editingId) {
        await dispatch(updateSecondaryFooter({ id: editingId, data: payload })).unwrap();
      } else {
        await dispatch(createSecondaryFooter(payload)).unwrap();
      }
      handleCancelEdit();
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this city footer?')) {
      try {
        await dispatch(deleteSecondaryFooter(id)).unwrap();
      } catch (error) {
        alert('Error deleting: ' + error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {secondaryError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{secondaryError}</p>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h3 className="text-[20px] font-semibold text-black mb-4">
          {editingId ? 'Edit City Footer' : 'Add New City Footer'}
        </h3>

        <div className="space-y-4">
          {/* City Input */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-1">
              City Name *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="w-full max-w-md border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Services Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[14px] font-medium text-gray-700">
                Services *
              </label>
              <button
                type="button"
                onClick={handleAddService}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>

            {formData.services.map((service, serviceIndex) => (
              <div key={serviceIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceTitleChange(serviceIndex, e.target.value)}
                      placeholder="e.g., Photography, Videography"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveService(serviceIndex)}
                      className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                {/* Areas for this service */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-2">
                    Service Areas
                  </label>
                  
                  {/* Add Area Input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newArea}
                      onChange={(e) => {
                        setNewArea(e.target.value);
                        setServiceIndex(serviceIndex);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && serviceIndex === serviceIndex) {
                          handleAddArea(serviceIndex);
                        }
                      }}
                      placeholder="Enter area name and press Enter"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddArea(serviceIndex)}
                      className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>

                  {/* Display Areas */}
                  {service.areas && service.areas.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.areas.map((area, areaIndex) => (
                        <div
                          key={areaIndex}
                          className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{area}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveArea(serviceIndex, areaIndex)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={secondaryLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              {secondaryLoading ? (
                'Saving...'
              ) : (
                <>
                  <Save size={18} />
                  {editingId ? 'Update City' : 'Add City'}
                </>
              )}
            </button>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List of Existing City Footers */}
      <div>
        <h3 className="text-[20px] font-semibold text-black mb-4">
          Existing City Footers ({secondaryFooters.length})
        </h3>

        {secondaryLoading ? (
          <div className="text-center py-8">
            <p>Loading city footers...</p>
          </div>
        ) : secondaryFooters.length === 0 ? (
          <div className="text-center py-8 border border-gray-200 rounded-lg">
            <p className="text-gray-500">No city footers added yet</p>
            <p className="text-sm text-gray-400 mt-1">Add a city footer to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryFooters.map((footer) => (
              <div
                key={footer._id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[16px] font-semibold text-blue-800">
                      {footer.city}
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(footer)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(footer._id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(footer.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[14px] font-medium text-gray-700 mb-2">
                    Services ({footer.services.length}):
                  </p>
                  <div className="space-y-3">
                    {footer.services.map((service, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-3">
                        <p className="text-[13px] font-semibold text-gray-800 mb-1">
                          {service.title}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {service.areas.map((area, areaIndex) => (
                            <span
                              key={areaIndex}
                              className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondaryFooter;