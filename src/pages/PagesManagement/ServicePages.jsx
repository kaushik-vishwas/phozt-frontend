import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import edit from "../../assets/Icons/edit1.png";
import deletee from "../../assets/Icons/delete1.png";
import AddNewServicePage from '../../pages/PagesManagement/AddNewServicePage';
import {
  fetchAllServicePages,
  deleteServicePage,
  updateServicePageStatus,
  clearServicePagesError,
  clearServicePagesSuccess,
  setFilters,
  clearFilters,
  fetchServicePageById,
  clearCurrentServicePage
} from '../../redux/servicePageSlice';
import { fetchCities } from '../../redux/citiesSlice';

const ServicePages = () => {
  const dispatch = useDispatch();
  
  // Access the Redux state - check your store configuration
  const servicePageState = useSelector((state) => {
    // First check if servicepages exists (from the corrected slice)
    if (state.servicepages) {
      return state.servicepages;
    }
    // If not, check other possible names
    return state.servicePages || {
      servicePages: [],
      loading: false,
      error: null,
      success: false,
      message: '',
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false
      },
      filters: {
        status: '',
        serviceCategory: '',
        location: '',
        search: ''
      }
    };
  });

  const citiesState = useSelector((state) => state.cities || {});
  const { cities = [], loading: citiesLoading = false } = citiesState;

  // Destructure with safe defaults
  const {
    servicePages = [],
    loading = false,
    error = null,
    success = false,
    message = '',
    pagination = {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false
    },
    filters = {
      status: '',
      serviceCategory: '',
      location: '',
      search: ''
    },
    currentServicePage = null,
    loadingSingle = false
  } = servicePageState;

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServicePageId, setEditingServicePageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Fetch service pages with current filters
  const fetchServicePages = useCallback((page = currentPage) => {
    const params = {
      page: page,
      limit: 10,
      ...filters,
      search: searchQuery || undefined
    };
    
    // Clean up params - remove empty values
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === undefined) {
        delete params[key];
      }
    });
    
    console.log('Fetching service pages with params:', params);
    dispatch(fetchAllServicePages(params));
  }, [dispatch, currentPage, filters, searchQuery]);

  // Fetch cities and service pages on component mount
  useEffect(() => {
    console.log('Component mounted, fetching data...');
    
    const fetchData = async () => {
      try {
        // Fetch cities first if not already loaded
        if (cities.length === 0 && !citiesLoading) {
          await dispatch(fetchCities());
        }
        
        // Then fetch service pages
        fetchServicePages();
        setHasFetched(true);
        setLocalError(null);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setLocalError('Failed to fetch data');
        toast.error('Failed to load service pages');
      }
    };

    fetchData();
  }, [dispatch]); // Only run once on mount

  // Handle search with debounce
  useEffect(() => {
    if (!hasFetched) return;
    
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchServicePages(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchServicePages, hasFetched]);

  // Handle filter changes
  useEffect(() => {
    if (!hasFetched) return;
    
    setCurrentPage(1);
    fetchServicePages(1);
  }, [filters.status, filters.serviceCategory, filters.location, fetchServicePages, hasFetched]);

  // Handle success and error messages
  useEffect(() => {
    if (error) {
      console.error('Redux Error:', error);
      toast.error(typeof error === 'string' ? error : 'An error occurred');
      dispatch(clearServicePagesError());
    }
    
    if (success && message) {
      console.log('Redux Success:', message);
      toast.success(message);
      dispatch(clearServicePagesSuccess());
    }
  }, [error, success, message, dispatch]);

  // Handle page change
  useEffect(() => {
    if (hasFetched && currentPage !== pagination.currentPage) {
      fetchServicePages(currentPage);
    }
  }, [currentPage, fetchServicePages, hasFetched, pagination.currentPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = async (servicePage) => {
    try {
      console.log('Editing service page:', servicePage._id);
      await dispatch(fetchServicePageById(servicePage._id));
      setEditingServicePageId(servicePage._id);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching service page for edit:', err);
      toast.error('Failed to load service page for editing');
    }
  };

  const handleDelete = (servicePageId) => {
    if (window.confirm('Are you sure you want to delete this service page? This action cannot be undone.')) {
      console.log('Deleting service page:', servicePageId);
      dispatch(deleteServicePage(servicePageId))
        .then(() => {
          // Refresh the list after deletion
          fetchServicePages();
        })
        .catch(err => {
          console.error('Error deleting service page:', err);
        });
    }
  };

  const handleStatusChange = (servicePageId, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    console.log('Changing status:', { servicePageId, currentStatus, newStatus });
    dispatch(updateServicePageStatus({ servicePageId, status: newStatus }))
      .then(() => {
        // Refresh the list after status change
        fetchServicePages();
      })
      .catch(err => {
        console.error('Error updating status:', err);
      });
  };

  const handlePageChange = (page) => {
    console.log('Page change:', page);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filterType, value) => {
    console.log('Filter change:', { filterType, value });
    dispatch(setFilters({ [filterType]: value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    console.log('Clearing all filters');
    dispatch(clearFilters());
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleModalClose = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setEditingServicePageId(null);
    dispatch(clearCurrentServicePage());
    
    // Refresh the list
    fetchServicePages();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      console.error('Error formatting date:', dateString, err);
      return 'Invalid date';
    }
  };

  // Helper function to get city name from ObjectId
  const getCityName = (page) => {
    try {
      // Get the location ObjectId from basicInfo
      const locationId = page?.basicInfo?.location;
      
      if (!locationId) {
        return 'N/A';
      }
      
      // Find the city in the cities array
      const city = cities.find(city => city._id === locationId);
      
      if (city) {
        return city.cityName || city.name || 'N/A';
      }
      
      return 'N/A';
    } catch (err) {
      console.error('Error getting city name:', err);
      return 'N/A';
    }
  };

  // Helper function to format city name for display
  const formatCityName = (city) => {
    if (!city || city === 'N/A') return 'N/A';
    try {
      // Capitalize first letter of each word
      return city.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    } catch (err) {
      console.error('Error formatting city name:', city, err);
      return city;
    }
  };

  // Helper function to get service category
  const getServiceCategory = (page) => {
    if (page?.basicInfo?.serviceCategory) {
      return page.basicInfo.serviceCategory;
    }
    return 'N/A';
  };

  // If still loading and no data fetched, show loading state
  if ((loading || citiesLoading) && !hasFetched && servicePages.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col ml-64 flex-1">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading service pages...</p>
              <p className="text-sm text-gray-500">Please wait while we fetch your data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If there's an error in initial load
  if (localError && servicePages.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64 flex-1 p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Service Pages</h2>
            <p className="text-red-700 mb-4">{localError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mr-2"
            >
              Reload Page
            </button>
            <button
              onClick={() => {
                setLocalError(null);
                fetchServicePages();
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col ml-64 flex-1">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start flex-shrink-0">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center mt-2 w-full">
              <div className="flex items-center border border-gray-300 rounded px-2 w-[70%]">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search by title, slug, city, service category, or content..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="py-2 text-sm w-full outline-none"
                  disabled={loading}
                />
              </div>

              <div className="flex items-center gap-3 ml-4">
                <span className="text-gray-900 font-medium">Alex</span>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
              </div>
            </div>
            <h1 className="text-[32px] font-semibold text-black">Service Pages According to City and Services</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className='text-[28px] font-bold'>Service Pages</h1>
                <p className="text-sm text-gray-600">
                  {pagination.totalItems || 0} total pages • {pagination.totalPages || 0} pages
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* Status Filter */}
                  <select
                    value={filters.status || ''}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="px-3 py-1.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={loading}
                  >
                    <option value="">All Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  {/* Service Category Filter */}
                  <select
                    value={filters.serviceCategory || ''}
                    onChange={(e) => handleFilterChange('serviceCategory', e.target.value)}
                    className="px-3 py-1.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={loading}
                  >
                    <option value="">All Categories</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Repair">Repair</option>
                    <option value="Installation">Installation</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>

                  {/* Location Filter */}
                  <select
                    value={filters.location || ''}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="px-3 py-1.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={loading}
                  >
                    <option value="">All Locations</option>
                    {Array.isArray(cities) && cities
                      .filter(city => city.isActive !== false)
                      .map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.cityName || city.name || 'Unnamed City'}
                        </option>
                      ))}
                  </select>

                  {/* Clear Filters Button */}
                  {(filters.status || filters.serviceCategory || filters.location || searchQuery) && (
                    <button
                      onClick={clearAllFilters}
                      className="px-3 py-1.5 border border-black text-sm hover:bg-gray-50 disabled:opacity-50"
                      disabled={loading}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Add New Service Page Button */}
                <button
                  onClick={() => {
                    setEditingServicePageId(null);
                    setIsModalOpen(true);
                  }}
                  disabled={loading}
                  className="px-4 py-2 bg-white border border-black text-sm font-medium hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">+</span> Add New Service Page
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-gray-600">Loading service pages...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => fetchServicePages()}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Data Table */}
            {!loading && !error && (
              <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-black">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Title</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Location</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Slug</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Status</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Updated</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!Array.isArray(servicePages) || servicePages.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-gray-500 border border-black">
                            No service pages found. Create your first service page!
                          </td>
                        </tr>
                      ) : (
                        servicePages.map((page) => {
                          if (!page) return null;
                          
                          const cityName = getCityName(page);
                          const formattedCityName = formatCityName(cityName);
                          const serviceCategory = getServiceCategory(page);
                          
                          return (
                            <tr key={page._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm text-black border border-black">
                                <div className="font-medium">{page.basicInfo?.pageTitle || 'Untitled'}</div>
                                {page.basicInfo?.h1Description && (
                                  <div className="text-xs text-gray-500 truncate max-w-xs">
                                    {page.basicInfo.h1Description.substring(0, 80)}...
                                  </div>
                                )}
                                {page.stats?.servicesCount && (
                                  <div className="text-xs text-gray-500">
                                    Services: {page.stats.servicesCount}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-black border border-black">
                                <div className="font-medium capitalize">
                                  {formattedCityName}
                                </div>
                                {page.basicInfo?.isFeatured && (
                                  <div className="text-xs text-green-600 font-medium">
                                    ★ Featured
                                  </div>
                                )}
                              </td>
                              
                              <td className="px-6 py-4 text-sm text-black border border-black">
                                <div className="font-mono text-xs break-all">{page.basicInfo?.slugUrl || '/'}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-black border border-black">
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    page.basicInfo?.status === 'Published' 
                                      ? 'bg-green-100 text-green-800'
                                      : page.basicInfo?.status === 'Draft'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {page.basicInfo?.status || 'Draft'}
                                  </span>
                                  <button
                                    onClick={() => handleStatusChange(page._id, page.basicInfo?.status)}
                                    className="text-xs text-purple-600 hover:text-purple-800 disabled:opacity-50"
                                    disabled={loading}
                                  >
                                    {page.basicInfo?.status === 'Published' ? 'Draft' : 'Publish'}
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-black border border-black">
                                {formatDate(page.updatedAt)}
                              </td>
                              <td className="px-6 py-4 text-sm text-black border border-black">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEdit(page)}
                                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                                    title="Edit"
                                    disabled={loading}
                                  >
                                    <img src={edit} alt="Edit" className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(page._id)}
                                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                                    title="Delete"
                                    disabled={loading}
                                  >
                                    <img src={deletee} alt="Delete" className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-black border flex items-center justify-between mt-4">
                <div className="text-sm text-black">
                  Showing {((currentPage - 1) * pagination.itemsPerPage) + 1}–
                  {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} 
                  of {pagination.totalItems} pages
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPreviousPage || loading}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const page = i + 1;
                      if (page <= pagination.totalPages) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={loading}
                            className={`w-8 h-8 rounded ${currentPage === page
                              ? 'bg-black text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                              } disabled:opacity-50`}
                          >
                            {page}
                          </button>
                        );
                      }
                      return null;
                    })}

                    {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
                      <span className="px-2 text-gray-600">...</span>
                    )}

                    {currentPage > 5 && currentPage <= pagination.totalPages - 2 && (
                      <>
                        <button
                          onClick={() => handlePageChange(currentPage)}
                          disabled={loading}
                          className="w-8 h-8 rounded bg-black text-white disabled:opacity-50"
                        >
                          {currentPage}
                        </button>
                        {currentPage < pagination.totalPages - 2 && (
                          <span className="px-2 text-gray-600">...</span>
                        )}
                      </>
                    )}

                    {pagination.totalPages > 5 && (
                      <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={loading}
                        className={`w-8 h-8 rounded ${currentPage === pagination.totalPages
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                          } disabled:opacity-50`}
                      >
                        {pagination.totalPages}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNextPage || loading}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddNewServicePage 
          onClose={handleModalClose}
          editMode={!!editingServicePageId}
          servicePageId={editingServicePageId}
        />
      )}
    </div>
  );
};

export default ServicePages;