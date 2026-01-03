import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "https://backend.nagalikardiagnostic.com/phozt"
});

// Attach vendor token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendorToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Admin API instance with admin token
const AdminAPI = axios.create({
  baseURL: "http://localhost:5000/api/admin"
  // baseURL: "https://backend.nagalikardiagnostic.com/phozt/admin"
});

// Attach admin token automatically
AdminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Navigation API instance for navigation endpoints (without /admin prefix)
const NavigationAPI = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "https://backend.nagalikardiagnostic.com/phozt"
});

// Attach admin token for navigation endpoints that need admin access
NavigationAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// City API instance (without /admin prefix but needs admin token)
const CityAPI = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "https://backend.nagalikardiagnostic.com/phozt"
});

// Attach admin token for city endpoints
CityAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Pages API instance for pages endpoints
const PagesAPI = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "https://backend.nagalikardiagnostic.com/phozt"
});

// Attach admin token for pages endpoints that need admin access
PagesAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -------------------
// City Management Endpoints
// -------------------

// **City CRUD Operations**

// Create new city
export const apiCreateCity = (cityData) =>
  CityAPI.post("/cities/create-city", cityData);

// Get all cities
export const apiGetAllCities = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  return CityAPI.get(`/cities/all-cities${queryParams ? `?${queryParams}` : ''}`);
};

// Get cities with pagination
export const apiGetCitiesWithPagination = (page = 1, limit = 10) =>
  CityAPI.get(`/cities/cities-paginated?page=${page}&limit=${limit}`);

// Get city by ID
export const apiGetCityById = (cityId) =>
  CityAPI.get(`/cities/city/${cityId}`);

// Update city
export const apiUpdateCity = (cityId, cityData) =>
  CityAPI.put(`/cities/update-city/${cityId}`, cityData);

// Delete city
export const apiDeleteCity = (cityId) =>
  CityAPI.delete(`/cities/delete-city/${cityId}`);

// Toggle city status (active/inactive)
export const apiToggleCityStatus = (cityId) =>
  CityAPI.patch(`/cities/toggle-city-status/${cityId}`);

// Get cities by pin code
export const apiGetCitiesByPinCode = (pinCode) =>
  CityAPI.get(`/cities/cities-by-pincode/${pinCode}`);

// Get cities by status
export const apiGetCitiesByStatus = (status) =>
  CityAPI.get(`/cities/cities-by-status/${status}`);

// Get active cities only (for dropdowns)
export const apiGetActiveCities = () =>
  CityAPI.get("/cities/active-cities");

// Search cities by name
export const apiSearchCities = (query) =>
  CityAPI.get(`/cities/search-cities?query=${query}`);

// Bulk update cities status
export const apiBulkUpdateCitiesStatus = (cityIds, isActive) =>
  CityAPI.put("/cities/bulk-update-status", { cityIds, isActive });

// Get city statistics
export const apiGetCityStatistics = () =>
  CityAPI.get("/cities/city-statistics");

// **Area Operations within Cities**

// Add area to a city
export const apiAddAreaToCity = (cityId, areaData) =>
  CityAPI.post(`/cities/city/${cityId}/add-area`, areaData);

// Get all areas of a city
export const apiGetAreasByCity = (cityId) =>
  CityAPI.get(`/cities/city/${cityId}/areas`);

// Update area in a city
export const apiUpdateAreaInCity = (cityId, areaId, areaData) =>
  CityAPI.put(`/cities/city/${cityId}/update-area/${areaId}`, areaData);

// Delete area from a city
export const apiDeleteAreaFromCity = (cityId, areaId) =>
  CityAPI.delete(`/cities/city/${cityId}/delete-area/${areaId}`);

// -------------------
// Image Management Endpoints
// -------------------

// Upload Image (Generic)
export const apiUploadImage = (file, folder = 'images') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);
  
  return NavigationAPI.post('/images/upload', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get All Images
export const apiGetAllImages = (folder = '') =>
  NavigationAPI.get(`/images${folder ? `?folder=${folder}` : ''}`);

// Get Image by ID
export const apiGetImageById = (id) =>
  NavigationAPI.get(`/images/${id}`);

// Update Image
export const apiUpdateImage = (id, data, imageFile = null) => {
  const formData = new FormData();
  
  // Append data fields
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  
  // Append image if exists
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  return NavigationAPI.put(`/images/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete Image
export const apiDeleteImage = (id) =>
  NavigationAPI.delete(`/images/${id}`);

// Bulk Upload Images
export const apiBulkUploadImages = (files, folder = 'images') => {
  const formData = new FormData();
  
  files.forEach((file, index) => {
    formData.append('images', file);
  });
  
  formData.append('folder', folder);
  
  return NavigationAPI.post('/images/bulk-upload', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// -------------------
// Vendor Auth & Register
// -------------------
export const apiRegisterVendor = (data) =>
  API.post("/vendor/vendor-register", data);

export const apiSendVendorOtp = (email) =>
  API.post("/vendor/vendor-send-otp", { email });

export const apiVerifyVendorOtp = (email, otp) =>
  API.post("/vendor/vendor-verify-otp", { email, otp });

export const apiVendorLogin = (email, password) =>
  API.post("/vendor/vendor-login", { email, password });

// -------------------
// Vendor Profile
// -------------------
export const apiGetVendorProfile = () =>
  API.get("/vendor/get-vendor-profile");

export const apiUpdateVendorProfile = (data) =>
  API.put("/vendor/update-vendor-profile", data);

// -------------------
// Vendor Leads
// -------------------
export const apiGetVendorLeads = () =>
  API.get("/vendor/assigned-leads");

// -------------------
// Vendor Portfolio
// -------------------
export const apiAddPortfolioImage = (file, sectionName) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("sectionName", sectionName);

  return API.post("/vendor/portfolio/image", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const apiGetVendorPortfolio = () =>
  API.get("/vendor/portfolio");

// -------------------
// Admin Endpoints (for admin panel - with /admin prefix)
// -------------------

// Admin Auth
export const apiAdminLogin = (loginData) =>
  AdminAPI.post("/admin-login", loginData);

// Admin Dashboard
export const apiAdminDashboard = () =>
  AdminAPI.get("/dashboard");

// Lead Management
export const apiCreateLead = (leadData) =>
  AdminAPI.post("/create-lead", leadData);

export const apiGetLeadById = (leadId) =>
  AdminAPI.get(`/lead/${leadId}`);

export const apiGetAllLeads = () =>
  AdminAPI.get("/all-leads");

export const apiDeleteLead = (leadId) =>
  AdminAPI.delete(`/delete-lead/${leadId}`);

export const apiAssignLeadToGroup = (assignData) =>
  AdminAPI.post("/assign-lead-to-group", assignData);

// Vendor Group Management
export const apiCreateVendorGroup = (groupData) =>
  AdminAPI.post("/create-vendor-group", groupData);

export const apiGetVendorsByService = (service) =>
  AdminAPI.get(`/vendors-list?service=${service}`);

export const apiGetAllVendorGroups = (city = '') =>
  AdminAPI.get(`/all-vendor-groups${city ? `?city=${city}` : ''}`);

export const apiRemoveMemberFromGroup = (groupId, vendorId) =>
  AdminAPI.delete(`/vendor-groups/${groupId}/dlt-member/${vendorId}`);

export const apiAddVendorToGroup = (groupId, vendorId) =>
  AdminAPI.post(`/vendor-groups/${groupId}/add-member/${vendorId}`);

export const apiDeleteVendorGroup = (groupId) =>
  AdminAPI.delete(`/vendor-groups/${groupId}`);

// -------------------
// Navigation Endpoints (without /admin prefix)
// -------------------

// Navigation Services (Admin operations - protected)
export const apiCreateNavigationService = (data) => {
  // Navigation services don't have images, send as JSON
  return NavigationAPI.post("/navigation/navigation-create", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const apiGetAllNavigationServices = () =>
  NavigationAPI.get("/navigation/navigation-get-all");

export const apiUpdateNavigationService = (id, data) => {
  // Navigation services don't have images, send as JSON
  return NavigationAPI.put(`/navigation/navigation-update/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const apiDeleteNavigationService = (id) =>
  NavigationAPI.delete(`/navigation/navigation-delete/${id}`);

// Sub Services (Admin operations - protected)
export const apiCreateSubService = (data, imageFile = null) => {
  // If there's an image, use FormData
  if (imageFile) {
    const formData = new FormData();
    
    // Append all data fields
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    formData.append("image", imageFile);
    
    return NavigationAPI.post("/navigation/subservice-create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  
  // If no image, send as JSON
  return NavigationAPI.post("/navigation/subservice-create", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const apiGetAllSubServices = () =>
  NavigationAPI.get("/navigation/subservice-get-all");

export const apiUpdateSubService = (id, data, imageFile = null) => {
  // If there's an image, use FormData
  if (imageFile) {
    const formData = new FormData();
    
    // Append all data fields
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    formData.append("image", imageFile);
    
    return NavigationAPI.put(`/navigation/subservice-update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  
  // If no image, send as JSON
  return NavigationAPI.put(`/navigation/subservice-update/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const apiDeleteSubService = (id) =>
  NavigationAPI.delete(`/navigation/subservice-delete/${id}`);

// Combined Navigation with SubServices (Public - can be accessed without token)
export const apiGetFullNavigation = () =>
  API.get("/navigation/navigation-full");

// -------------------
// Header Management Endpoints
// -------------------

export const apiUpdateHeaderImage = (imageFile) => {
  const formData = new FormData();
  
  // Create empty data objects
  formData.append('logoSettings', JSON.stringify({}));
  formData.append('vendorLoginButton', JSON.stringify({}));
  
  // Append header image file
  if (imageFile) {
    formData.append('headerImage', imageFile);
  }
  
  return NavigationAPI.post("/header/header", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Create or Update Header (Upsert)
export const apiUpdateHeader = (data, files) => {
  const formData = new FormData();
  
  // Append JSON data
  if (data.logoSettings) {
    formData.append('logoSettings', JSON.stringify(data.logoSettings));
  }
  if (data.vendorLoginButton) {
    formData.append('vendorLoginButton', JSON.stringify(data.vendorLoginButton));
  }
  
  // Append files if they exist
  if (files?.siteLogo) {
    formData.append('siteLogo', files.siteLogo);
  }
  if (files?.siteIcon) {
    formData.append('siteIcon', files.siteIcon);
  }
  if (files?.headerImage) {
    formData.append('headerImage', files.headerImage);
  }
  
  return NavigationAPI.post("/header/header", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get Header Data
export const apiGetHeader = () =>
  NavigationAPI.get("/header/header");

// Public Get Header (No authentication required for public access)
export const apiGetPublicHeader = () =>
  API.get("/header/header");

// -------------------
// Footer Management Endpoints
// -------------------

// Primary Footer - Create/Update (Upsert)
export const apiUpsertPrimaryFooter = (data, logoFile = null) => {
  const formData = new FormData();
  
  // Append JSON fields
  if (data.knowUs) formData.append('knowUs', JSON.stringify(data.knowUs));
  if (data.services) formData.append('services', JSON.stringify(data.services));
  if (data.needToKnow) formData.append('needToKnow', JSON.stringify(data.needToKnow));
  if (data.socialLinks) formData.append('socialLinks', JSON.stringify(data.socialLinks));
  
  // Append text fields
  if (data.tagline) formData.append('tagline', data.tagline);
  if (data.aboutUs) formData.append('aboutUs', data.aboutUs);
  
  // Append logo file if exists
  if (logoFile) {
    formData.append('logo', logoFile);
  }
  
  return NavigationAPI.post("/footer/create-primary-footer", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get Primary Footer
export const apiGetPrimaryFooter = () =>
  NavigationAPI.get("/footer/get-primary-footer");

// Delete Primary Footer
export const apiDeletePrimaryFooter = () =>
  NavigationAPI.delete("/footer/delete-primary-footer");

// Update Primary Footer Field
export const apiUpdatePrimaryFooterField = (field, value) =>
  NavigationAPI.patch("/footer/primary-update-field", { field, value });

// Delete Item from Primary Footer Section
export const apiDeletePrimaryFooterItem = (section, value) =>
  NavigationAPI.delete(`/footer/primary-delete-field/${section}/${value}`);

// Secondary Footer - Create
export const apiCreateSecondaryFooter = (data) =>
  NavigationAPI.post("/footer/create-secondary-footer", data);

// Get All Secondary Footers
export const apiGetAllSecondaryFooters = () =>
  NavigationAPI.get("/footer/get-secondary-footer");

// Update Secondary Footer
export const apiUpdateSecondaryFooter = (id, data) =>
  NavigationAPI.put(`/footer/update-secondary-footer/${id}`, data);

// Delete Secondary Footer
export const apiDeleteSecondaryFooter = (id) =>
  NavigationAPI.delete(`/footer/delete-secondary-footer/${id}`);

// Public Get Primary Footer (No authentication required)
export const apiGetPublicPrimaryFooter = () =>
  API.get("/footer/get-primary-footer");

// -------------------
// Public City Endpoints (No authentication required)
// -------------------

// Public get all active cities
export const apiGetPublicActiveCities = () =>
  API.get("/cities/active-cities");

// Public search cities
export const apiPublicSearchCities = (query) =>
  API.get(`/cities/search-public?query=${query}`);

// Public get city by ID
export const apiGetPublicCityById = (cityId) =>
  API.get(`/cities/public-city/${cityId}`);

// Public get areas by city ID
export const apiGetPublicAreasByCity = (cityId) =>
  API.get(`/cities/public-city/${cityId}/areas`);

// =====================
// HOME PAGE MANAGEMENT ENDPOINTS
// =====================

// Create new homepage
export const apiCreateHomePage = (formData) =>
  PagesAPI.post("/pages/create", formData, {
    headers: { 
      "Content-Type": "multipart/form-data"
    }
  });

// Get all homepages with pagination and filters
export const apiGetAllHomePages = (params = {}) => {
  // Clean the params to remove undefined/null values
  const cleanParams = {};
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      cleanParams[key] = params[key];
    }
  });
  
  const queryParams = new URLSearchParams(cleanParams).toString();
  return PagesAPI.get(`/pages/all${queryParams ? `?${queryParams}` : ''}`);
};

// Get homepage statistics
export const apiGetHomePageStats = () =>
  PagesAPI.get("/pages/stats");

// Get single homepage by ID
export const apiGetHomePageById = (homePageId) =>
  PagesAPI.get(`/pages/${homePageId}`);

// Get homepage by slug (public route - no auth needed)
export const apiGetHomePageBySlug = (slug) =>
  API.get(`/pages/slug/${slug}`);

// Update homepage
export const apiUpdateHomePage = (homePageId, formData) =>
  PagesAPI.put(`/pages/${homePageId}`, formData, {
    headers: { 
      "Content-Type": "multipart/form-data"
    }
  });

// Update homepage status only
export const apiUpdateHomePageStatus = (homePageId, status) =>
  PagesAPI.patch(`/pages/${homePageId}/status`, { status });

// Delete homepage
export const apiDeleteHomePage = (homePageId) =>
  PagesAPI.delete(`/pages/${homePageId}`);

// Bulk delete homepages
export const apiBulkDeleteHomePages = (homePageIds) =>
  PagesAPI.delete("/pages/bulk/delete", { data: { ids: homePageIds } });

// Duplicate homepage
export const apiDuplicateHomePage = (homePageId) =>
  PagesAPI.post(`/pages/${homePageId}/duplicate`);

// =====================
// HOME PAGE BLOCK MANAGEMENT ENDPOINTS
// =====================

// Add block to homepage
export const apiAddBlockToHomePage = (homePageId, formData) => {
  return PagesAPI.post(`/pages/${homePageId}/blocks`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

// Update block in homepage  
export const apiUpdateBlockInHomePage = (homePageId, blockId, formData) => {
  return PagesAPI.put(`/pages/${homePageId}/blocks/${blockId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

// Delete block from homepage
export const apiDeleteBlockFromHomePage = (homePageId, blockId) =>
  PagesAPI.delete(`/pages/${homePageId}/blocks/${blockId}`);

// Home Page Review Management Endpoints
export const apiAddReviewToPage = (homePageId, reviewData) =>
  PagesAPI.post(`/pages/${homePageId}/reviews`, reviewData);

export const apiUpdateReviewInPage = (homePageId, reviewId, reviewData) =>
  PagesAPI.put(`/pages/${homePageId}/reviews/${reviewId}`, reviewData);

export const apiDeleteReviewFromPage = (homePageId, reviewId) =>
  PagesAPI.delete(`/pages/${homePageId}/reviews/${reviewId}`);

export const apiToggleReviewDisplay = (homePageId, reviewId, display) =>
  PagesAPI.patch(`/pages/${homePageId}/reviews/${reviewId}/display`, { display });

// =====================
// PUBLIC PAGES ENDPOINTS (No authentication required)
// =====================

// Get homepage by slug for public viewing
export const apiGetPublicHomePageBySlug = (slug) =>
  API.get(`/pages/slug/${slug}`);

// =====================
// SERVICE PAGE MANAGEMENT ENDPOINTS
// =====================

// Create new service page
export const apiCreateServicePage = (formData) =>
  PagesAPI.post("/pages/service/create", formData, {
    headers: { 
      "Content-Type": "multipart/form-data"
    }
  });

// Get all service pages with pagination and filters
export const apiGetAllServicePages = (params = {}) => {
  // Clean the params to remove undefined/null values
  const cleanParams = {};
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      cleanParams[key] = params[key];
    }
  });
  
  const queryParams = new URLSearchParams(cleanParams).toString();
  return PagesAPI.get(`/pages/service/all${queryParams ? `?${queryParams}` : ''}`);
};

// Get service page statistics
export const apiGetServicePageStats = () =>
  PagesAPI.get("/pages/service/stats");

// Get single service page by ID
export const apiGetServicePageById = (servicePageId) =>
  PagesAPI.get(`/pages/service/${servicePageId}`);

// Get service page by slug (public route - no auth needed)
export const apiGetServicePageBySlug = (slug) =>
  API.get(`/pages/service/slug/${slug}`);

// Get service page by location (public route - no auth needed)
export const apiGetServicePageByLocation = (location) =>
  API.get(`/pages/service/location/${location}`);

// Update service page
export const apiUpdateServicePage = (servicePageId, formData) =>
  PagesAPI.put(`/pages/service/${servicePageId}`, formData, {
    headers: { 
      "Content-Type": "multipart/form-data"
    }
  });

// Update service page status only
export const apiUpdateServicePageStatus = (servicePageId, status) =>
  PagesAPI.patch(`/pages/service/${servicePageId}/status`, { status });

// Delete service page
export const apiDeleteServicePage = (servicePageId) =>
  PagesAPI.delete(`/pages/service/${servicePageId}`);

// Bulk delete service pages
export const apiBulkDeleteServicePages = (servicePageIds) =>
  PagesAPI.delete("/pages/service/bulk/delete", { data: { ids: servicePageIds } });

// Duplicate service page
export const apiDuplicateServicePage = (servicePageId) =>
  PagesAPI.post(`/pages/service/${servicePageId}/duplicate`);

// =====================
// SERVICE PAGE BLOCK MANAGEMENT ENDPOINTS (ADDED - MISSING)
// =====================

// Add block to service page
export const apiAddBlockToServicePage = (servicePageId, formData) => {
  return PagesAPI.post(`/pages/service/${servicePageId}/blocks`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

// Update block in service page
export const apiUpdateBlockInServicePage = (servicePageId, blockId, formData) => {
  return PagesAPI.put(`/pages/service/${servicePageId}/blocks/${blockId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

// Delete block from service page
export const apiDeleteBlockFromServicePage = (servicePageId, blockId) =>
  PagesAPI.delete(`/pages/service/${servicePageId}/blocks/${blockId}`);

// =====================
// SERVICE PAGE REVIEW MANAGEMENT ENDPOINTS
// =====================

// Add review to service page
export const apiAddReviewToServicePage = (servicePageId, reviewData) =>
  PagesAPI.post(`/pages/service/${servicePageId}/reviews`, reviewData);

// Update review in service page
export const apiUpdateReviewInServicePage = (servicePageId, reviewId, reviewData) =>
  PagesAPI.put(`/pages/service/${servicePageId}/reviews/${reviewId}`, reviewData);

// Delete review from service page
export const apiDeleteReviewFromServicePage = (servicePageId, reviewId) =>
  PagesAPI.delete(`/pages/service/${servicePageId}/reviews/${reviewId}`);

// Toggle review display status for service page
export const apiToggleReviewDisplayInServicePage = (servicePageId, reviewId, display) =>
  PagesAPI.patch(`/pages/service/${servicePageId}/reviews/${reviewId}/display`, { display });

// =====================
// PUBLIC SERVICE PAGE ENDPOINTS (No authentication required)
// =====================

// Get service page by slug for public viewing
export const apiGetPublicServicePageBySlug = (slug) =>
  API.get(`/pages/service/slug/${slug}`);

export default API;