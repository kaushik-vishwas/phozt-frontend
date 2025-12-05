import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiUpsertPrimaryFooter,
  apiGetPrimaryFooter,
  apiDeletePrimaryFooter,
  apiUpdatePrimaryFooterField,
  apiDeletePrimaryFooterItem,
  apiCreateSecondaryFooter,
  apiGetAllSecondaryFooters,
  apiUpdateSecondaryFooter,
  apiDeleteSecondaryFooter
} from '../service/api';

// Async Thunks for Primary Footer
export const fetchPrimaryFooter = createAsyncThunk(
  'footer/fetchPrimaryFooter',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetPrimaryFooter();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const upsertPrimaryFooter = createAsyncThunk(
  'footer/upsertPrimaryFooter',
  async ({ data, logoFile = null }, { rejectWithValue }) => {
    try {
      const response = await apiUpsertPrimaryFooter(data, logoFile);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePrimaryFooter = createAsyncThunk(
  'footer/deletePrimaryFooter',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiDeletePrimaryFooter();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePrimaryFooterField = createAsyncThunk(
  'footer/updatePrimaryFooterField',
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const response = await apiUpdatePrimaryFooterField(field, value);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePrimaryFooterItem = createAsyncThunk(
  'footer/deletePrimaryFooterItem',
  async ({ section, value }, { rejectWithValue }) => {
    try {
      const response = await apiDeletePrimaryFooterItem(section, value);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async Thunks for Secondary Footer
export const fetchSecondaryFooters = createAsyncThunk(
  'footer/fetchSecondaryFooters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetAllSecondaryFooters();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSecondaryFooter = createAsyncThunk(
  'footer/createSecondaryFooter',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateSecondaryFooter(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSecondaryFooter = createAsyncThunk(
  'footer/updateSecondaryFooter',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateSecondaryFooter(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSecondaryFooter = createAsyncThunk(
  'footer/deleteSecondaryFooter',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiDeleteSecondaryFooter(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    primaryFooter: null,
    secondaryFooters: [],
    loading: false,
    error: null,
    success: false,
    message: ''
  },
  reducers: {
    clearFooterError: (state) => {
      state.error = null;
    },
    clearFooterSuccess: (state) => {
      state.success = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Primary Footer
      .addCase(fetchPrimaryFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrimaryFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.primaryFooter = action.payload.data;
        state.success = true;
      })
      .addCase(fetchPrimaryFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(upsertPrimaryFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upsertPrimaryFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.primaryFooter = action.payload.data;
        state.success = true;
        state.message = 'Primary footer saved successfully';
      })
      .addCase(upsertPrimaryFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Secondary Footers
      .addCase(fetchSecondaryFooters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecondaryFooters.fulfilled, (state, action) => {
        state.loading = false;
        state.secondaryFooters = action.payload.data;
        state.success = true;
      })
      .addCase(fetchSecondaryFooters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(createSecondaryFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSecondaryFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.secondaryFooters.push(action.payload.data);
        state.success = true;
        state.message = 'Secondary footer created successfully';
      })
      .addCase(createSecondaryFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearFooterError, clearFooterSuccess } = footerSlice.actions;
export default footerSlice.reducer;