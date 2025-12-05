// store/slices/navigationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateNavigationService,
  apiGetAllNavigationServices,
  apiUpdateNavigationService,
  apiDeleteNavigationService,
  apiCreateSubService,
  apiGetAllSubServices,
  apiUpdateSubService,
  apiDeleteSubService,
  apiGetFullNavigation
} from '../service/api';

// Async Thunks for Navigation Services
export const createNavigation = createAsyncThunk(
  'navigation/createNavigation',
  async (navigationData, { rejectWithValue }) => {
    try {
      const response = await apiCreateNavigationService(navigationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllNavigations = createAsyncThunk(
  'navigation/fetchAllNavigations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetAllNavigationServices();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateNavigation = createAsyncThunk(
  'navigation/updateNavigation',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateNavigationService(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteNavigation = createAsyncThunk(
  'navigation/deleteNavigation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiDeleteNavigationService(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async Thunks for Sub Services
export const createSubService = createAsyncThunk(
  'navigation/createSubService',
  async ({ data, imageFile }, { rejectWithValue }) => {
    try {
      const response = await apiCreateSubService(data, imageFile);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllSubServices = createAsyncThunk(
  'navigation/fetchAllSubServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetAllSubServices();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSubService = createAsyncThunk(
  'navigation/updateSubService',
  async ({ id, data, imageFile }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateSubService(id, data, imageFile);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSubService = createAsyncThunk(
  'navigation/deleteSubService',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiDeleteSubService(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async Thunk for Full Navigation Data
export const fetchFullNavigation = createAsyncThunk(
  'navigation/fetchFullNavigation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetFullNavigation();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    navigations: [],
    subServices: [],
    fullNavigation: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Navigation Services
    builder
      .addCase(createNavigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.navigations.push(action.payload.data);
      })
      .addCase(createNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchAllNavigations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNavigations.fulfilled, (state, action) => {
        state.loading = false;
        state.navigations = action.payload.data;
      })
      .addCase(fetchAllNavigations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateNavigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.navigations.findIndex(
          nav => nav._id === action.payload.data._id
        );
        if (index !== -1) {
          state.navigations[index] = action.payload.data;
        }
      })
      .addCase(updateNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteNavigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.navigations = state.navigations.filter(
          nav => nav._id !== action.payload.id
        );
        // Also remove subservices of this navigation
        state.subServices = state.subServices.filter(
          sub => sub.navigationService !== action.payload.id
        );
      })
      .addCase(deleteNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Sub Services
      .addCase(createSubService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subServices.push(action.payload.data);
      })
      .addCase(createSubService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchAllSubServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubServices.fulfilled, (state, action) => {
        state.loading = false;
        state.subServices = action.payload.data;
      })
      .addCase(fetchAllSubServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateSubService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.subServices.findIndex(
          sub => sub._id === action.payload.data._id
        );
        if (index !== -1) {
          state.subServices[index] = action.payload.data;
        }
      })
      .addCase(updateSubService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteSubService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subServices = state.subServices.filter(
          sub => sub._id !== action.payload.id
        );
      })
      .addCase(deleteSubService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Full Navigation
      .addCase(fetchFullNavigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFullNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.fullNavigation = action.payload.data;
      })
      .addCase(fetchFullNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = navigationSlice.actions;
export default navigationSlice.reducer;