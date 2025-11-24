// vendorSlice.js - Complete corrected version
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiSendVendorOtp,
  apiVerifyVendorOtp,
  apiRegisterVendor,
  apiGetVendorProfile,
  apiUpdateVendorProfile,
  apiGetVendorLeads,
  apiAddPortfolioImage,
  apiGetVendorPortfolio,
  apiVendorLogin // ADD THIS IMPORT
} from "../service/api";

// ----------------- THUNKS -----------------

export const sendVendorOtp = createAsyncThunk(
  "vendor/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await apiSendVendorOtp(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const verifyVendorOtp = createAsyncThunk(
  "vendor/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await apiVerifyVendorOtp(email, otp);
      localStorage.setItem("vendorToken", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const registerVendor = createAsyncThunk(
  "vendor/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiRegisterVendor(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const vendorLogin = createAsyncThunk(
  "vendor/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await apiVendorLogin(email, password);
      localStorage.setItem("vendorToken", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getVendorProfile = createAsyncThunk(
  "vendor/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetVendorProfile();
      return res.data.vendor;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateVendorProfile = createAsyncThunk(
  "vendor/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiUpdateVendorProfile(data);
      return res.data.vendor;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getVendorLeads = createAsyncThunk(
  "vendor/getLeads",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetVendorLeads();
      return res.data.leads;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addPortfolioImage = createAsyncThunk(
  "vendor/addPortfolioImage",
  async ({ file, sectionName }, { rejectWithValue }) => {
    try {
      const res = await apiAddPortfolioImage(file, sectionName);
      return res.data.portfolio;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getVendorPortfolio = createAsyncThunk(
  "vendor/getPortfolio",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetVendorPortfolio();
      return res.data.portfolio;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// ----------------- SLICE -----------------

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: null,
    token: localStorage.getItem("vendorToken"),
    leads: [],
    portfolio: null,
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    logoutVendor: (state) => {
      state.vendor = null;
      state.token = null;
      state.leads = [];
      state.portfolio = null;
      state.error = null;
      state.success = null;
      localStorage.removeItem("vendorToken");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendVendorOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendVendorOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(sendVendorOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(verifyVendorOtp.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(registerVendor.fulfilled, (state) => {
        state.success = "Registered successfully";
      })
      // ADD LOGIN CASES
      .addCase(vendorLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vendorLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.vendor = action.payload.vendor;
        state.success = action.payload.message;
      })
      .addCase(vendorLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(getVendorProfile.fulfilled, (state, action) => {
        state.vendor = action.payload;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.vendor = action.payload;
      })
      .addCase(getVendorLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      })
      .addCase(addPortfolioImage.fulfilled, (state, action) => {
        state.portfolio = action.payload;
      })
      .addCase(getVendorPortfolio.fulfilled, (state, action) => {
        state.portfolio = action.payload;
      });
  },
});

export const { logoutVendor, clearError, clearSuccess } = vendorSlice.actions;
export default vendorSlice.reducer;