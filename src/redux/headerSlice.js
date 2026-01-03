// store/slices/headerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetHeader, apiUpdateHeader } from '../service/api';

// Async Thunks
export const fetchHeader = createAsyncThunk(
  'header/fetchHeader',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetHeader();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateHeader = createAsyncThunk(
  'header/updateHeader',
  async ({ data, files }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateHeader(data, files);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    headerData: null,
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
    updateLocalHeader: (state, action) => {
      if (state.headerData) {
        state.headerData = {
          ...state.headerData,
          ...action.payload
        };
      }
    },
    // Add action to update header image locally
    updateHeaderImage: (state, action) => {
      if (state.headerData) {
        state.headerData.headerImage = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Header
      .addCase(fetchHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.headerData = action.payload.data || {};
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Header
      .addCase(updateHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.headerData = action.payload.data;
      })
      .addCase(updateHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, updateLocalHeader, updateHeaderImage } = headerSlice.actions;
export default headerSlice.reducer;