import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateServicePage,
  apiGetAllServicePages,
  apiGetServicePageStats,
  apiGetServicePageById,
  apiGetPublicServicePageBySlug,
  apiUpdateServicePage,
  apiUpdateServicePageStatus,
  apiDeleteServicePage,
  apiBulkDeleteServicePages,
  apiAddBlockToServicePage,
  apiUpdateBlockInServicePage,
  apiDeleteBlockFromServicePage,
  apiDuplicateServicePage,
  apiAddReviewToServicePage,
  apiUpdateReviewInServicePage,
  apiDeleteReviewFromServicePage,
  apiToggleReviewDisplayInServicePage
} from '../service/api';

// =====================
// ASYNC THUNKS
// =====================

// Get all service pages with pagination and filters
export const fetchAllServicePages = createAsyncThunk(
  'servicepages/fetchAllServicePages',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiGetAllServicePages(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get service page statistics
export const fetchServicePageStats = createAsyncThunk(
  'servicepages/fetchServicePageStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetServicePageStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get single service page by ID
export const fetchServicePageById = createAsyncThunk(
  'servicepages/fetchServicePageById',
  async (servicePageId, { rejectWithValue }) => {
    try {
      const response = await apiGetServicePageById(servicePageId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get service page by slug (public)
export const fetchServicePageBySlug = createAsyncThunk(
  'servicepages/fetchServicePageBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await apiGetPublicServicePageBySlug(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new service page
export const createServicePage = createAsyncThunk(
  'servicepages/createServicePage',
  async (servicePageData, { rejectWithValue }) => {
    try {
      const response = await apiCreateServicePage(servicePageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update service page
export const updateServicePage = createAsyncThunk(
  'servicepages/updateServicePage',
  async ({ servicePageId, servicePageData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateServicePage(servicePageId, servicePageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update service page status only
export const updateServicePageStatus = createAsyncThunk(
  'servicepages/updateServicePageStatus',
  async ({ servicePageId, status }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateServicePageStatus(servicePageId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete service page
export const deleteServicePage = createAsyncThunk(
  'servicepages/deleteServicePage',
  async (servicePageId, { rejectWithValue }) => {
    try {
      const response = await apiDeleteServicePage(servicePageId);
      return { ...response.data, servicePageId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Bulk delete service pages
export const bulkDeleteServicePages = createAsyncThunk(
  'servicepages/bulkDeleteServicePages',
  async (servicePageIds, { rejectWithValue }) => {
    try {
      const response = await apiBulkDeleteServicePages(servicePageIds);
      return { ...response.data, servicePageIds };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Duplicate service page
export const duplicateServicePage = createAsyncThunk(
  'servicepages/duplicateServicePage',
  async (servicePageId, { rejectWithValue }) => {
    try {
      const response = await apiDuplicateServicePage(servicePageId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add block to service page
export const addBlockToServicePage = createAsyncThunk(
  'servicepages/addBlockToServicePage',
  async ({ servicePageId, blockData }, { rejectWithValue }) => {
    try {
      const response = await apiAddBlockToServicePage(servicePageId, blockData);
      return { ...response.data, servicePageId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update block in service page
export const updateBlockInServicePage = createAsyncThunk(
  'servicepages/updateBlockInServicePage',
  async ({ servicePageId, blockId, blockData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateBlockInServicePage(servicePageId, blockId, blockData);
      return { ...response.data, servicePageId, blockId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete block from service page
export const deleteBlockFromServicePage = createAsyncThunk(
  'servicepages/deleteBlockFromServicePage',
  async ({ servicePageId, blockId }, { rejectWithValue }) => {
    try {
      const response = await apiDeleteBlockFromServicePage(servicePageId, blockId);
      return { ...response.data, servicePageId, blockId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =====================
// REVIEW MANAGEMENT THUNKS
// =====================

// Add review to service page
export const addReviewToServicePage = createAsyncThunk(
  'servicepages/addReviewToServicePage',
  async ({ servicePageId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await apiAddReviewToServicePage(servicePageId, reviewData);
      return { ...response.data, servicePageId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update review in service page
export const updateReviewInServicePage = createAsyncThunk(
  'servicepages/updateReviewInServicePage',
  async ({ servicePageId, reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateReviewInServicePage(servicePageId, reviewId, reviewData);
      return { ...response.data, servicePageId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete review from service page
export const deleteReviewFromServicePage = createAsyncThunk(
  'servicepages/deleteReviewFromServicePage',
  async ({ servicePageId, reviewId }, { rejectWithValue }) => {
    try {
      const response = await apiDeleteReviewFromServicePage(servicePageId, reviewId);
      return { ...response.data, servicePageId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Toggle review display status
export const toggleReviewDisplayInServicePage = createAsyncThunk(
  'servicepages/toggleReviewDisplayInServicePage',
  async ({ servicePageId, reviewId, display }, { rejectWithValue }) => {
    try {
      const response = await apiToggleReviewDisplayInServicePage(servicePageId, reviewId, display);
      return { ...response.data, servicePageId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =====================
// SLICE
// =====================

const servicePagesSlice = createSlice({
  name: 'servicepages',
  initialState: {
    servicePages: [],
    currentServicePage: null,
    stats: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false
    },
    loading: false,
    loadingSingle: false,
    loadingStats: false,
    loadingAction: false,
    error: null,
    success: false,
    message: '',
    filters: {
      status: '',
      serviceCategory: '',
      location: '',
      search: ''
    }
  },
  reducers: {
    clearServicePagesError: (state) => {
      state.error = null;
    },
    clearServicePagesSuccess: (state) => {
      state.success = false;
      state.message = '';
    },
    clearCurrentServicePage: (state) => {
      state.currentServicePage = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        serviceCategory: '',
        location: '',
        search: ''
      };
    },
    updateReviewsLocally: (state, action) => {
      const { reviews } = action.payload;
      if (state.currentServicePage) {
        state.currentServicePage.reviews = reviews;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetServicePages: (state) => {
      state.servicePages = [];
      state.currentServicePage = null;
      state.stats = null;
      state.loading = false;
      state.loadingSingle = false;
      state.loadingStats = false;
      state.loadingAction = false;
      state.error = null;
      state.success = false;
      state.message = '';
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all service pages
      .addCase(fetchAllServicePages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAllServicePages.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePages = action.payload.data?.servicePages || [];
        state.pagination = action.payload.data?.pagination || state.pagination;
        state.success = true;
        state.message = 'Service pages fetched successfully';
      })
      .addCase(fetchAllServicePages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch service pages';
        state.servicePages = [];
      })

      // Fetch service page stats
      .addCase(fetchServicePageStats.pending, (state) => {
        state.loadingStats = true;
        state.error = null;
      })
      .addCase(fetchServicePageStats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.stats = action.payload.data;
        state.success = true;
        state.message = 'Statistics fetched successfully';
      })
      .addCase(fetchServicePageStats.rejected, (state, action) => {
        state.loadingStats = false;
        state.error = action.payload || 'Failed to fetch statistics';
      })

      // Fetch single service page by ID
      .addCase(fetchServicePageById.pending, (state) => {
        state.loadingSingle = true;
        state.error = null;
      })
      .addCase(fetchServicePageById.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.currentServicePage = action.payload.data;
        state.success = true;
        state.message = 'Service page fetched successfully';
      })
      .addCase(fetchServicePageById.rejected, (state, action) => {
        state.loadingSingle = false;
        state.error = action.payload || 'Failed to fetch service page';
        state.currentServicePage = null;
      })

      // Fetch service page by slug
      .addCase(fetchServicePageBySlug.pending, (state) => {
        state.loadingSingle = true;
        state.error = null;
      })
      .addCase(fetchServicePageBySlug.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.currentServicePage = action.payload.data;
        state.success = true;
        state.message = 'Service page fetched successfully';
      })
      .addCase(fetchServicePageBySlug.rejected, (state, action) => {
        state.loadingSingle = false;
        state.error = action.payload || 'Failed to fetch service page';
        state.currentServicePage = null;
      })

      // Create service page
      .addCase(createServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          state.servicePages.unshift(action.payload.data);
        }
        state.success = true;
        state.message = action.payload.message || 'Service page created successfully';
      })
      .addCase(createServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to create service page';
      })

      // Update service page
      .addCase(updateServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          const updatedIndex = state.servicePages.findIndex(
            page => page._id === action.payload.data._id
          );
          if (updatedIndex !== -1) {
            state.servicePages[updatedIndex] = action.payload.data;
          }
          
          if (state.currentServicePage && state.currentServicePage._id === action.payload.data._id) {
            state.currentServicePage = action.payload.data;
          }
        }
        state.success = true;
        state.message = action.payload.message || 'Service page updated successfully';
      })
      .addCase(updateServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to update service page';
      })

      // Update service page status
      .addCase(updateServicePageStatus.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateServicePageStatus.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          const updatedIndex = state.servicePages.findIndex(
            page => page._id === action.payload.data._id
          );
          if (updatedIndex !== -1) {
            state.servicePages[updatedIndex].basicInfo.status = action.meta.arg.status;
          }
          
          if (state.currentServicePage && state.currentServicePage._id === action.payload.data._id) {
            state.currentServicePage.basicInfo.status = action.meta.arg.status;
          }
        }
        state.success = true;
        state.message = action.payload.message || `Service page status updated to ${action.meta.arg.status}`;
      })
      .addCase(updateServicePageStatus.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to update service page status';
      })

      // Delete service page
      .addCase(deleteServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        state.servicePages = state.servicePages.filter(
          page => page._id !== action.payload.servicePageId
        );
        if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
          state.currentServicePage = null;
        }
        state.success = true;
        state.message = action.payload.message || 'Service page deleted successfully';
      })
      .addCase(deleteServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to delete service page';
      })

      // Bulk delete service pages
      .addCase(bulkDeleteServicePages.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bulkDeleteServicePages.fulfilled, (state, action) => {
        state.loadingAction = false;
        state.servicePages = state.servicePages.filter(
          page => !action.payload.servicePageIds.includes(page._id)
        );
        state.success = true;
        state.message = action.payload.message || `${action.payload.deletedCount || 0} service page(s) deleted successfully`;
      })
      .addCase(bulkDeleteServicePages.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to delete service pages';
      })

      // Duplicate service page
      .addCase(duplicateServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(duplicateServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          state.servicePages.unshift(action.payload.data);
        }
        state.success = true;
        state.message = action.payload.message || 'Service page duplicated successfully';
      })
      .addCase(duplicateServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to duplicate service page';
      })

      // Add block to service page
      .addCase(addBlockToServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBlockToServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          const servicePageIndex = state.servicePages.findIndex(
            page => page._id === action.payload.servicePageId
          );
          if (servicePageIndex !== -1) {
            state.servicePages[servicePageIndex].blocks = action.payload.data.blocks || action.payload.data;
          }
          
          if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
            state.currentServicePage.blocks = action.payload.data.blocks || action.payload.data;
          }
        }
        state.success = true;
        state.message = action.payload.message || 'Block added successfully';
      })
      .addCase(addBlockToServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to add block';
      })

      // Update block in service page
      .addCase(updateBlockInServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBlockInServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          const servicePageIndex = state.servicePages.findIndex(
            page => page._id === action.payload.servicePageId
          );
          if (servicePageIndex !== -1 && action.payload.data.blocks) {
            state.servicePages[servicePageIndex].blocks = action.payload.data.blocks;
          }
          
          if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
            if (action.payload.data.blocks) {
              state.currentServicePage.blocks = action.payload.data.blocks;
            } else {
              // Update specific block
              const blockIndex = state.currentServicePage.blocks?.findIndex(
                block => block._id === action.payload.blockId
              );
              if (blockIndex !== -1 && action.payload.data) {
                state.currentServicePage.blocks[blockIndex] = {
                  ...state.currentServicePage.blocks[blockIndex],
                  ...action.payload.data
                };
              }
            }
          }
        }
        state.success = true;
        state.message = action.payload.message || 'Block updated successfully';
      })
      .addCase(updateBlockInServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to update block';
      })

      // Delete block from service page
      .addCase(deleteBlockFromServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBlockFromServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (action.payload.data) {
          const servicePageIndex = state.servicePages.findIndex(
            page => page._id === action.payload.servicePageId
          );
          if (servicePageIndex !== -1 && action.payload.data.blocks) {
            state.servicePages[servicePageIndex].blocks = action.payload.data.blocks;
          }
          
          if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
            if (action.payload.data.blocks) {
              state.currentServicePage.blocks = action.payload.data.blocks;
            } else {
              // Filter out the deleted block
              state.currentServicePage.blocks = state.currentServicePage.blocks?.filter(
                block => block._id !== action.payload.blockId
              ) || [];
            }
          }
        }
        state.success = true;
        state.message = action.payload.message || 'Block deleted successfully';
      })
      .addCase(deleteBlockFromServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to delete block';
      })

      // =====================
      // REVIEW MANAGEMENT REDUCERS
      // =====================

      // Add review to service page
      .addCase(addReviewToServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addReviewToServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
          if (!state.currentServicePage.reviews) {
            state.currentServicePage.reviews = [];
          }
          if (action.payload.data) {
            state.currentServicePage.reviews.push(action.payload.data);
          }
        }
        state.success = true;
        state.message = action.payload.message || 'Review added successfully';
      })
      .addCase(addReviewToServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to add review';
      })

      // Update review in service page
      .addCase(updateReviewInServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateReviewInServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
          const reviewIndex = state.currentServicePage.reviews?.findIndex(
            review => review._id === action.payload.reviewId
          );
          if (reviewIndex !== -1 && action.payload.data) {
            state.currentServicePage.reviews[reviewIndex] = action.payload.data;
          }
        }
        state.success = true;
        state.message = action.payload.message || 'Review updated successfully';
      })
      .addCase(updateReviewInServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to update review';
      })

      // Delete review from service page
      .addCase(deleteReviewFromServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReviewFromServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
          state.currentServicePage.reviews = state.currentServicePage.reviews?.filter(
            review => review._id !== action.payload.reviewId
          ) || [];
        }
        state.success = true;
        state.message = action.payload.message || 'Review deleted successfully';
      })
      .addCase(deleteReviewFromServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to delete review';
      })

      // Toggle review display status
      .addCase(toggleReviewDisplayInServicePage.pending, (state) => {
        state.loadingAction = true;
        state.error = null;
        state.success = false;
      })
      .addCase(toggleReviewDisplayInServicePage.fulfilled, (state, action) => {
        state.loadingAction = false;
        if (state.currentServicePage && state.currentServicePage._id === action.payload.servicePageId) {
          const reviewIndex = state.currentServicePage.reviews?.findIndex(
            review => review._id === action.payload.reviewId
          );
          if (reviewIndex !== -1 && action.payload.data) {
            state.currentServicePage.reviews[reviewIndex].display = action.payload.data.display;
          }
        }
        state.success = true;
        state.message = action.payload.message || `Review ${action.payload.data?.display ? 'displayed' : 'hidden'} successfully`;
      })
      .addCase(toggleReviewDisplayInServicePage.rejected, (state, action) => {
        state.loadingAction = false;
        state.error = action.payload || 'Failed to update review display';
      });
  }
});

export const {
  clearServicePagesError,
  clearServicePagesSuccess,
  clearCurrentServicePage,
  setFilters,
  clearFilters,
  updateReviewsLocally,
  setLoading,
  setCurrentPage,
  resetServicePages
} = servicePagesSlice.actions;

export default servicePagesSlice.reducer;