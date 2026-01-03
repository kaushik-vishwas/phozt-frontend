// slices/citiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateCity,
  apiGetAllCities,
  apiGetCityById,
  apiUpdateCity,
  apiDeleteCity,
  apiToggleCityStatus,
  apiAddAreaToCity,
  apiUpdateAreaInCity,
  apiDeleteAreaFromCity,
  apiGetAreasByCity,
  apiGetCityStatistics,
  apiGetCitiesWithPagination,
  apiGetCitiesByPinCode,
  apiGetCitiesByStatus,
  apiSearchCities,
  apiBulkUpdateCitiesStatus
} from '../service/api';

// Async Thunks
export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiGetAllCities(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cities');
    }
  }
);

export const fetchCitiesWithPagination = createAsyncThunk(
  'cities/fetchCitiesWithPagination',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiGetCitiesWithPagination(page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cities');
    }
  }
);

export const fetchCityById = createAsyncThunk(
  'cities/fetchCityById',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await apiGetCityById(cityId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch city');
    }
  }
);

export const createNewCity = createAsyncThunk(
  'cities/createCity',
  async (cityData, { rejectWithValue }) => {
    try {
      const response = await apiCreateCity(cityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create city');
    }
  }
);

export const updateCity = createAsyncThunk(
  'cities/updateCity',
  async ({ id, cityData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateCity(id, cityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update city');
    }
  }
);

export const deleteCity = createAsyncThunk(
  'cities/deleteCity',
  async (cityId, { rejectWithValue }) => {
    try {
      await apiDeleteCity(cityId);
      return cityId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete city');
    }
  }
);

export const toggleCityStatus = createAsyncThunk(
  'cities/toggleCityStatus',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await apiToggleCityStatus(cityId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle city status');
    }
  }
);

export const addAreaToCity = createAsyncThunk(
  'cities/addAreaToCity',
  async ({ cityId, areaData }, { rejectWithValue }) => {
    try {
      const response = await apiAddAreaToCity(cityId, areaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add area');
    }
  }
);

export const updateAreaInCity = createAsyncThunk(
  'cities/updateAreaInCity',
  async ({ cityId, areaId, areaData }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateAreaInCity(cityId, areaId, areaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update area');
    }
  }
);

export const deleteAreaFromCity = createAsyncThunk(
  'cities/deleteAreaFromCity',
  async ({ cityId, areaId }, { rejectWithValue }) => {
    try {
      await apiDeleteAreaFromCity(cityId, areaId);
      return { cityId, areaId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete area');
    }
  }
);

export const fetchAreasByCity = createAsyncThunk(
  'cities/fetchAreasByCity',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await apiGetAreasByCity(cityId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch areas');
    }
  }
);

export const fetchCityStatistics = createAsyncThunk(
  'cities/fetchCityStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetCityStatistics();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
);

export const searchCities = createAsyncThunk(
  'cities/searchCities',
  async (query, { rejectWithValue }) => {
    try {
      const response = await apiSearchCities(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search cities');
    }
  }
);

export const bulkUpdateCitiesStatus = createAsyncThunk(
  'cities/bulkUpdateCitiesStatus',
  async ({ cityIds, isActive }, { rejectWithValue }) => {
    try {
      const response = await apiBulkUpdateCitiesStatus(cityIds, isActive);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cities status');
    }
  }
);

// Initial State
const initialState = {
  cities: [],
  currentCity: null,
  areas: [],
  statistics: null,
  loading: false,
  error: null,
  success: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCities: 0,
    limit: 10
  },
  searchResults: [],
  isSearching: false
};

// Slice
const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearCurrentCity: (state) => {
      state.currentCity = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.isSearching = false;
    },
    setSearchTerm: (state, action) => {
      // This can be used for local filtering without API call
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all cities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.data || [];
        state.success = true;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch cities with pagination
      .addCase(fetchCitiesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.data || [];
        state.pagination = {
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          totalCities: action.payload.totalCities || 0,
          limit: action.payload.limit || 10
        };
        state.success = true;
      })
      .addCase(fetchCitiesWithPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single city
      .addCase(fetchCityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCity = action.payload.data;
        state.success = true;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create city
      .addCase(createNewCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createNewCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.unshift(action.payload.data);
        state.success = true;
      })
      .addCase(createNewCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update city
      .addCase(updateCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCity = action.payload.data;
        const index = state.cities.findIndex(city => city._id === updatedCity._id);
        if (index !== -1) {
          state.cities[index] = updatedCity;
        }
        if (state.currentCity && state.currentCity._id === updatedCity._id) {
          state.currentCity = updatedCity;
        }
        state.success = true;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete city
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter(city => city._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Toggle city status
      .addCase(toggleCityStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCityStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCity = action.payload.data;
        const index = state.cities.findIndex(city => city._id === updatedCity._id);
        if (index !== -1) {
          state.cities[index] = updatedCity;
        }
        if (state.currentCity && state.currentCity._id === updatedCity._id) {
          state.currentCity = updatedCity;
        }
        state.success = true;
      })
      .addCase(toggleCityStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add area to city
      .addCase(addAreaToCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAreaToCity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCity = action.payload.data;
        const index = state.cities.findIndex(city => city._id === updatedCity._id);
        if (index !== -1) {
          state.cities[index] = updatedCity;
        }
        if (state.currentCity && state.currentCity._id === updatedCity._id) {
          state.currentCity = updatedCity;
        }
        state.success = true;
      })
      .addCase(addAreaToCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update area in city
      .addCase(updateAreaInCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAreaInCity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCity = action.payload.data;
        const index = state.cities.findIndex(city => city._id === updatedCity._id);
        if (index !== -1) {
          state.cities[index] = updatedCity;
        }
        if (state.currentCity && state.currentCity._id === updatedCity._id) {
          state.currentCity = updatedCity;
        }
        state.success = true;
      })
      .addCase(updateAreaInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete area from city
      .addCase(deleteAreaFromCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAreaFromCity.fulfilled, (state, action) => {
        state.loading = false;
        const { cityId } = action.payload;
        const cityIndex = state.cities.findIndex(city => city._id === cityId);
        if (cityIndex !== -1) {
          // Update totalLocalAreas
          state.cities[cityIndex].totalLocalAreas -= 1;
        }
        if (state.currentCity && state.currentCity._id === cityId) {
          state.currentCity.totalLocalAreas -= 1;
        }
        state.success = true;
      })
      .addCase(deleteAreaFromCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch areas by city
      .addCase(fetchAreasByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAreasByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload.data || [];
        state.success = true;
      })
      .addCase(fetchAreasByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch city statistics
      .addCase(fetchCityStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload.data;
        state.success = true;
      })
      .addCase(fetchCityStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search cities
      .addCase(searchCities.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.data || [];
        state.success = true;
      })
      .addCase(searchCities.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload;
      })

      // Bulk update cities status
      .addCase(bulkUpdateCitiesStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bulkUpdateCitiesStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update cities in state
        state.cities = state.cities.map(city => {
          if (action.meta.arg.cityIds.includes(city._id)) {
            return { ...city, isActive: action.meta.arg.isActive };
          }
          return city;
        });
      })
      .addCase(bulkUpdateCitiesStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

// Export actions and reducer
export const { 
  clearError, 
  clearSuccess, 
  clearCurrentCity, 
  clearSearchResults,
  setSearchTerm 
} = citiesSlice.actions;

export default citiesSlice.reducer;