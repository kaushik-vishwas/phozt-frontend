import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateHomePage,
  apiGetAllHomePages,
  apiGetHomePageStats,
  apiGetHomePageById,
  apiGetHomePageBySlug,
  apiUpdateHomePage,
  apiUpdateHomePageStatus,
  apiDeleteHomePage,
  apiBulkDeleteHomePages,
  apiAddBlockToHomePage,
  apiUpdateBlockInHomePage,
  apiDeleteBlockFromHomePage,
  apiDuplicateHomePage,
  apiGetPublicHomePageBySlug,
  apiAddReviewToPage,
  apiUpdateReviewInPage,
  apiDeleteReviewFromPage,
  apiToggleReviewDisplay
} from '../service/api';

// =====================
// ASYNC THUNKS
// =====================

// Get all homepages with pagination and filters
export const fetchAllHomePages = createAsyncThunk(
  'homepages/fetchAllHomePages',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiGetAllHomePages(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get homepage statistics
export const fetchHomePageStats = createAsyncThunk(
  'homepages/fetchHomePageStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetHomePageStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get single homepage by ID
export const fetchHomePageById = createAsyncThunk(
  'homepages/fetchHomePageById',
  async (homePageId, { rejectWithValue }) => {
    try {
      const response = await apiGetHomePageById(homePageId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get homepage by slug (public)
export const fetchHomePageBySlug = createAsyncThunk(
  'homepages/fetchHomePageBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await apiGetPublicHomePageBySlug(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new homepage
export const createHomePage = createAsyncThunk(
  'homepages/createHomePage',
  async (homePageData, { rejectWithValue }) => {
    try {
      const response = await apiCreateHomePage(homePageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update homepage
export const updateHomePage = createAsyncThunk(
  'homepages/updateHomePage',
  async ({ homePageId, homePageData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateHomePage(homePageId, homePageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update homepage status only
export const updateHomePageStatus = createAsyncThunk(
  'homepages/updateHomePageStatus',
  async ({ homePageId, status }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateHomePageStatus(homePageId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete homepage
export const deleteHomePage = createAsyncThunk(
  'homepages/deleteHomePage',
  async (homePageId, { rejectWithValue }) => {
    try {
      const response = await apiDeleteHomePage(homePageId);
      return { ...response.data, homePageId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Bulk delete homepages
export const bulkDeleteHomePages = createAsyncThunk(
  'homepages/bulkDeleteHomePages',
  async (homePageIds, { rejectWithValue }) => {
    try {
      const response = await apiBulkDeleteHomePages(homePageIds);
      return { ...response.data, homePageIds };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Duplicate homepage
export const duplicateHomePage = createAsyncThunk(
  'homepages/duplicateHomePage',
  async (homePageId, { rejectWithValue }) => {
    try {
      const response = await apiDuplicateHomePage(homePageId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add block to homepage
export const addBlockToHomePage = createAsyncThunk(
  'homepages/addBlockToHomePage',
  async ({ homePageId, blockData }, { rejectWithValue }) => {
    try {
      const response = await apiAddBlockToHomePage(homePageId, blockData);
      return { ...response.data, homePageId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update block in homepage
export const updateBlockInHomePage = createAsyncThunk(
  'homepages/updateBlockInHomePage',
  async ({ homePageId, blockId, blockData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateBlockInHomePage(homePageId, blockId, blockData);
      return { ...response.data, homePageId, blockId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete block from homepage
export const deleteBlockFromHomePage = createAsyncThunk(
  'homepages/deleteBlockFromHomePage',
  async ({ homePageId, blockId }, { rejectWithValue }) => {
    try {
      const response = await apiDeleteBlockFromHomePage(homePageId, blockId);
      return { ...response.data, homePageId, blockId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =====================
// REVIEW MANAGEMENT THUNKS
// =====================

// Add review to homepage
export const addReviewToHomePage = createAsyncThunk(
  'homepages/addReviewToHomePage',
  async ({ homePageId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await apiAddReviewToPage(homePageId, reviewData);
      return { ...response.data, homePageId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update review in homepage
export const updateReviewInHomePage = createAsyncThunk(
  'homepages/updateReviewInHomePage',
  async ({ homePageId, reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateReviewInPage(homePageId, reviewId, reviewData);
      return { ...response.data, homePageId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete review from homepage
export const deleteReviewFromHomePage = createAsyncThunk(
  'homepages/deleteReviewFromHomePage',
  async ({ homePageId, reviewId }, { rejectWithValue }) => {
    try {
      const response = await apiDeleteReviewFromPage(homePageId, reviewId);
      return { ...response.data, homePageId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Toggle review display status
export const toggleReviewDisplayInHomePage = createAsyncThunk(
  'homepages/toggleReviewDisplayInHomePage',
  async ({ homePageId, reviewId, display }, { rejectWithValue }) => {
    try {
      const response = await apiToggleReviewDisplay(homePageId, reviewId, display);
      return { ...response.data, homePageId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =====================
// SLICE
// =====================

const homePagesSlice = createSlice({
  name: 'homepages',
  initialState: {
    homePages: [],
    currentHomePage: null,
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
    error: null,
    success: false,
    message: '',
    filters: {
      status: '',
      pageType: '',
      search: ''
    }
  },
  reducers: {
    clearHomePagesError: (state) => {
      state.error = null;
    },
    clearHomePagesSuccess: (state) => {
      state.success = false;
      state.message = '';
    },
    clearCurrentHomePage: (state) => {
      state.currentHomePage = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        pageType: '',
        search: ''
      };
    },
    // Add a reducer to update reviews locally (for immediate UI feedback)
    updateReviewsLocally: (state, action) => {
      const { reviews } = action.payload;
      if (state.currentHomePage) {
        state.currentHomePage.reviews = reviews;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all homepages
      .addCase(fetchAllHomePages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHomePages.fulfilled, (state, action) => {
        state.loading = false;
        state.homePages = action.payload.data.homepages;
        state.pagination = action.payload.data.pagination;
        state.success = true;
      })
      .addCase(fetchAllHomePages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch homepage stats
      .addCase(fetchHomePageStats.pending, (state) => {
        state.loadingStats = true;
        state.error = null;
      })
      .addCase(fetchHomePageStats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.stats = action.payload.data;
        state.success = true;
      })
      .addCase(fetchHomePageStats.rejected, (state, action) => {
        state.loadingStats = false;
        state.error = action.payload;
      })

      // Fetch single homepage by ID
      .addCase(fetchHomePageById.pending, (state) => {
        state.loadingSingle = true;
        state.error = null;
      })
      .addCase(fetchHomePageById.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.currentHomePage = action.payload.data;
        state.success = true;
      })
      .addCase(fetchHomePageById.rejected, (state, action) => {
        state.loadingSingle = false;
        state.error = action.payload;
      })

      // Fetch homepage by slug
      .addCase(fetchHomePageBySlug.pending, (state) => {
        state.loadingSingle = true;
        state.error = null;
      })
      .addCase(fetchHomePageBySlug.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.currentHomePage = action.payload.data;
        state.success = true;
      })
      .addCase(fetchHomePageBySlug.rejected, (state, action) => {
        state.loadingSingle = false;
        state.error = action.payload;
      })

      // Create homepage
      .addCase(createHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.homePages.unshift(action.payload.data);
        state.success = true;
        state.message = 'Homepage created successfully';
      })
      .addCase(createHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update homepage
      .addCase(updateHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomePage.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIndex = state.homePages.findIndex(
          page => page._id === action.payload.data._id
        );
        if (updatedIndex !== -1) {
          state.homePages[updatedIndex] = action.payload.data;
        }
        state.currentHomePage = action.payload.data;
        state.success = true;
        state.message = 'Homepage updated successfully';
      })
      .addCase(updateHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update homepage status
      .addCase(updateHomePageStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomePageStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIndex = state.homePages.findIndex(
          page => page._id === action.payload.data._id
        );
        if (updatedIndex !== -1) {
          state.homePages[updatedIndex].basicInfo.status = action.meta.arg.status;
        }
        if (state.currentHomePage && state.currentHomePage._id === action.payload.data._id) {
          state.currentHomePage.basicInfo.status = action.meta.arg.status;
        }
        state.success = true;
        state.message = `Homepage status updated to ${action.meta.arg.status}`;
      })
      .addCase(updateHomePageStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete homepage
      .addCase(deleteHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.homePages = state.homePages.filter(
          page => page._id !== action.payload.homePageId
        );
        if (state.currentHomePage && state.currentHomePage._id === action.payload.homePageId) {
          state.currentHomePage = null;
        }
        state.success = true;
        state.message = 'Homepage deleted successfully';
      })
      .addCase(deleteHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Bulk delete homepages
      .addCase(bulkDeleteHomePages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteHomePages.fulfilled, (state, action) => {
        state.loading = false;
        state.homePages = state.homePages.filter(
          page => !action.payload.homePageIds.includes(page._id)
        );
        state.success = true;
        state.message = `${action.payload.deletedCount} homepage(s) deleted successfully`;
      })
      .addCase(bulkDeleteHomePages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Duplicate homepage
      .addCase(duplicateHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(duplicateHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.homePages.unshift(action.payload.data);
        state.success = true;
        state.message = 'Homepage duplicated successfully';
      })
      .addCase(duplicateHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add block to homepage
      .addCase(addBlockToHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlockToHomePage.fulfilled, (state, action) => {
        state.loading = false;
        const homePageIndex = state.homePages.findIndex(
          page => page._id === action.payload.homePageId
        );
        if (homePageIndex !== -1) {
          state.homePages[homePageIndex].blocks = action.payload.data;
        }
        if (state.currentHomePage && state.currentHomePage._id === action.payload.homePageId) {
          state.currentHomePage.blocks = action.payload.data;
        }
        state.success = true;
        state.message = 'Block added successfully';
      })
      .addCase(addBlockToHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update block in homepage
      .addCase(updateBlockInHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlockInHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = 'Block updated successfully';
      })
      .addCase(updateBlockInHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete block from homepage
      .addCase(deleteBlockFromHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockFromHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = 'Block deleted successfully';
      })
      .addCase(deleteBlockFromHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // REVIEW MANAGEMENT REDUCERS
      // =====================

      // Add review to homepage
      .addCase(addReviewToHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReviewToHomePage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentHomePage && state.currentHomePage._id === action.payload.homePageId) {
          if (!state.currentHomePage.reviews) {
            state.currentHomePage.reviews = [];
          }
          state.currentHomePage.reviews.push(action.payload.data);
        }
        state.success = true;
        state.message = 'Review added successfully';
      })
      .addCase(addReviewToHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update review in homepage
      .addCase(updateReviewInHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReviewInHomePage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentHomePage && state.currentHomePage._id === action.payload.homePageId) {
          const reviewIndex = state.currentHomePage.reviews.findIndex(
            review => review._id === action.payload.reviewId
          );
          if (reviewIndex !== -1) {
            state.currentHomePage.reviews[reviewIndex] = action.payload.data;
          }
        }
        state.success = true;
        state.message = 'Review updated successfully';
      })
      .addCase(updateReviewInHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete review from homepage
      .addCase(deleteReviewFromHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviewFromHomePage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentHomePage && state.currentHomePage._id === action.payload.homePageId) {
          state.currentHomePage.reviews = state.currentHomePage.reviews.filter(
            review => review._id !== action.payload.reviewId
          );
        }
        state.success = true;
        state.message = 'Review deleted successfully';
      })
      .addCase(deleteReviewFromHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle review display status
      .addCase(toggleReviewDisplayInHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleReviewDisplayInHomePage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentHomePage && state.currentHomePage._id === action.payload.homePageId) {
          const reviewIndex = state.currentHomePage.reviews.findIndex(
            review => review._id === action.payload.reviewId
          );
          if (reviewIndex !== -1) {
            state.currentHomePage.reviews[reviewIndex].display = action.payload.data.display;
          }
        }
        state.success = true;
        state.message = `Review ${action.payload.data.display ? 'displayed' : 'hidden'} successfully`;
      })
      .addCase(toggleReviewDisplayInHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearHomePagesError,
  clearHomePagesSuccess,
  clearCurrentHomePage,
  setFilters,
  clearFilters,
  updateReviewsLocally
} = homePagesSlice.actions;

export default homePagesSlice.reducer;