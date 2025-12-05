// store/slices/imageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiUploadImage,
  apiGetAllImages,
  apiGetImageById,
  apiUpdateImage,
  apiDeleteImage,
  apiBulkUploadImages
} from '../service/api';

// Async Thunks
export const uploadImage = createAsyncThunk(
  'images/uploadImage',
  async ({ file, folder }, { rejectWithValue }) => {
    try {
      const response = await apiUploadImage(file, folder);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllImages = createAsyncThunk(
  'images/getAllImages',
  async (folder, { rejectWithValue }) => {
    try {
      const response = await apiGetAllImages(folder);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getImageById = createAsyncThunk(
  'images/getImageById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiGetImageById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateImage = createAsyncThunk(
  'images/updateImage',
  async ({ id, data, imageFile }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateImage(id, data, imageFile);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteImage = createAsyncThunk(
  'images/deleteImage',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiDeleteImage(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const bulkUploadImages = createAsyncThunk(
  'images/bulkUploadImages',
  async ({ files, folder }, { rejectWithValue }) => {
    try {
      const response = await apiBulkUploadImages(files, folder);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    currentImage: null,
    loading: false,
    uploading: false,
    error: null,
    success: false,
    totalPages: 1,
    currentPage: 1,
    totalImages: 0,
  },
  reducers: {
    clearImageError: (state) => {
      state.error = null;
    },
    clearImageSuccess: (state) => {
      state.success = false;
    },
    setCurrentImage: (state, action) => {
      state.currentImage = action.payload;
    },
    clearCurrentImage: (state) => {
      state.currentImage = null;
    },
    updateLocalImage: (state, action) => {
      const index = state.images.findIndex(img => img._id === action.payload._id);
      if (index !== -1) {
        state.images[index] = { ...state.images[index], ...action.payload };
      }
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(img => img._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Image
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = true;
        state.images.unshift(action.payload.data);
        state.totalImages += 1;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Get All Images
      .addCase(getAllImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.data.images || [];
        state.totalPages = action.payload.data.totalPages || 1;
        state.currentPage = action.payload.data.currentPage || 1;
        state.totalImages = action.payload.data.totalImages || 0;
      })
      .addCase(getAllImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Image By ID
      .addCase(getImageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentImage = action.payload.data;
      })
      .addCase(getImageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Image
      .addCase(updateImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.images.findIndex(img => img._id === action.payload.data._id);
        if (index !== -1) {
          state.images[index] = action.payload.data;
        }
        if (state.currentImage && state.currentImage._id === action.payload.data._id) {
          state.currentImage = action.payload.data;
        }
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Delete Image
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.images = state.images.filter(img => img._id !== action.payload.data.id);
        state.totalImages -= 1;
        if (state.currentImage && state.currentImage._id === action.payload.data.id) {
          state.currentImage = null;
        }
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Bulk Upload Images
      .addCase(bulkUploadImages.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bulkUploadImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.success = true;
        state.images = [...action.payload.data, ...state.images];
        state.totalImages += action.payload.data.length;
      })
      .addCase(bulkUploadImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const {
  clearImageError,
  clearImageSuccess,
  setCurrentImage,
  clearCurrentImage,
  updateLocalImage,
  removeImage,
} = imageSlice.actions;

export default imageSlice.reducer;