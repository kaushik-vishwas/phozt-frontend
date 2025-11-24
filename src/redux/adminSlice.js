// adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminLogin,
  apiGetAllVendorGroups,
  apiCreateVendorGroup,
  apiGetVendorsByService,
  apiDeleteVendorGroup,
  apiAddVendorToGroup,
  apiRemoveMemberFromGroup,
  apiAssignLeadToGroup
} from '../service/api';

// Admin Login
export const adminLogin = createAsyncThunk(
  'admin/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await apiAdminLogin(loginData);
      localStorage.setItem('adminToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Get All Vendor Groups
export const fetchVendorGroups = createAsyncThunk(
  'admin/fetchVendorGroups',
  async (city = '', { rejectWithValue }) => {
    try {
      const response = await apiGetAllVendorGroups(city);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch vendor groups'
      );
    }
  }
);

// Create Vendor Group
export const createVendorGroup = createAsyncThunk(
  'admin/createVendorGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await apiCreateVendorGroup(groupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create vendor group'
      );
    }
  }
);

// Get Vendors by Service
export const fetchVendorsByService = createAsyncThunk(
  'admin/fetchVendorsByService',
  async (service, { rejectWithValue }) => {
    try {
      const response = await apiGetVendorsByService(service);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch vendors'
      );
    }
  }
);

// Delete Vendor Group
export const deleteVendorGroup = createAsyncThunk(
  'admin/deleteVendorGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      await apiDeleteVendorGroup(groupId);
      return groupId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete vendor group'
      );
    }
  }
);

// Add Vendor to Group
export const addVendorToGroup = createAsyncThunk(
  'admin/addVendorToGroup',
  async ({ groupId, vendorId }, { rejectWithValue }) => {
    try {
      const response = await apiAddVendorToGroup(groupId, vendorId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add vendor to group'
      );
    }
  }
);

// Remove Member from Group
export const removeMemberFromGroup = createAsyncThunk(
  'admin/removeMemberFromGroup',
  async ({ groupId, vendorId }, { rejectWithValue }) => {
    try {
      const response = await apiRemoveMemberFromGroup(groupId, vendorId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove vendor from group'
      );
    }
  }
);

// Assign Lead to Group
export const assignLeadToGroup = createAsyncThunk(
  'admin/assignLeadToGroup',
  async (assignData, { rejectWithValue }) => {
    try {
      const response = await apiAssignLeadToGroup(assignData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to assign lead to group'
      );
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuthenticated: !!localStorage.getItem('adminToken'),
    token: localStorage.getItem('adminToken') || null,
    loading: false,
    error: null,
    
    // Vendor Groups State
    vendorGroups: [],
    vendorGroupsLoading: false,
    vendorGroupsError: null,
    
    // Vendors by Service State
    vendorsByService: [],
    vendorsLoading: false,
    vendorsError: null,
    
    // Create Group State
    createGroupLoading: false,
    createGroupError: null,
    
    // Assign Lead State
    assignLeadLoading: false,
    assignLeadError: null,
  },
  reducers: {
    adminLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.vendorGroups = [];
      state.vendorsByService = [];
      localStorage.removeItem('adminToken');
    },
    clearError: (state) => {
      state.error = null;
      state.vendorGroupsError = null;
      state.vendorsError = null;
      state.createGroupError = null;
      state.assignLeadError = null;
    },
    clearVendorsList: (state) => {
      state.vendorsByService = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
      })
      
      // Fetch Vendor Groups
      .addCase(fetchVendorGroups.pending, (state) => {
        state.vendorGroupsLoading = true;
        state.vendorGroupsError = null;
      })
      .addCase(fetchVendorGroups.fulfilled, (state, action) => {
        state.vendorGroupsLoading = false;
        state.vendorGroups = action.payload.groups || [];
        state.vendorGroupsError = null;
      })
      .addCase(fetchVendorGroups.rejected, (state, action) => {
        state.vendorGroupsLoading = false;
        state.vendorGroupsError = action.payload;
        state.vendorGroups = [];
      })
      
      // Create Vendor Group
      .addCase(createVendorGroup.pending, (state) => {
        state.createGroupLoading = true;
        state.createGroupError = null;
      })
      .addCase(createVendorGroup.fulfilled, (state, action) => {
        state.createGroupLoading = false;
        // Add new group to the list
        state.vendorGroups.unshift(action.payload.group);
        state.createGroupError = null;
      })
      .addCase(createVendorGroup.rejected, (state, action) => {
        state.createGroupLoading = false;
        state.createGroupError = action.payload;
      })
      
      // Fetch Vendors by Service
      .addCase(fetchVendorsByService.pending, (state) => {
        state.vendorsLoading = true;
        state.vendorsError = null;
      })
      .addCase(fetchVendorsByService.fulfilled, (state, action) => {
        state.vendorsLoading = false;
        state.vendorsByService = action.payload;
        state.vendorsError = null;
      })
      .addCase(fetchVendorsByService.rejected, (state, action) => {
        state.vendorsLoading = false;
        state.vendorsError = action.payload;
        state.vendorsByService = [];
      })
      
      // Delete Vendor Group
      .addCase(deleteVendorGroup.fulfilled, (state, action) => {
        state.vendorGroups = state.vendorGroups.filter(
          group => group._id !== action.payload
        );
      })
      
      // Add Vendor to Group
      .addCase(addVendorToGroup.fulfilled, (state, action) => {
        const updatedGroup = action.payload.group;
        const index = state.vendorGroups.findIndex(
          group => group._id === updatedGroup._id
        );
        if (index !== -1) {
          state.vendorGroups[index] = updatedGroup;
        }
      })
      
      // Remove Member from Group
      .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
        const updatedGroup = action.payload.group;
        const index = state.vendorGroups.findIndex(
          group => group._id === updatedGroup._id
        );
        if (index !== -1) {
          state.vendorGroups[index] = updatedGroup;
        }
      })
      
      // Assign Lead to Group
      .addCase(assignLeadToGroup.pending, (state) => {
        state.assignLeadLoading = true;
        state.assignLeadError = null;
      })
      .addCase(assignLeadToGroup.fulfilled, (state) => {
        state.assignLeadLoading = false;
        state.assignLeadError = null;
      })
      .addCase(assignLeadToGroup.rejected, (state, action) => {
        state.assignLeadLoading = false;
        state.assignLeadError = action.payload;
      });
  },
});

export const { adminLogout, clearError, clearVendorsList } = adminSlice.actions;
export default adminSlice.reducer;