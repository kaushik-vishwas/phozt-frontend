// api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://backend.nagalikardiagnostic.com/phozt"
});

// Attach vendor token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendorToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Admin API instance with admin token
const AdminAPI = axios.create({
  // baseURL: "http://localhost:5000/api/admin"
  baseURL: "https://backend.nagalikardiagnostic.com/phozt/admin"
});

// Attach admin token automatically
AdminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Navigation API instance for navigation endpoints (without /admin prefix)
const NavigationAPI = axios.create({
  // baseURL: "http://localhost:5000/api"
    baseURL: "https://backend.nagalikardiagnostic.com/phozt"
});

// Attach admin token for navigation endpoints that need admin access
NavigationAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
export const apiAdminLogin = (loginData) =>
  AdminAPI.post("/admin-login", loginData);

export const apiCreateVendorGroup = (groupData) =>
  AdminAPI.post("/create-vendor-group", groupData);

export const apiGetVendorsByService = (service) =>
  AdminAPI.get(`/vendors-list?service=${service}`);

export const apiGetAllVendorGroups = (city = '') =>
  AdminAPI.get(`/all-vendor-groups${city ? `?city=${city}` : ''}`);

export const apiRemoveMemberFromGroup = (groupId, vendorId) =>
  AdminAPI.delete(`/remove-member-from-group/${groupId}/${vendorId}`);

export const apiAddVendorToGroup = (groupId, vendorId) =>
  AdminAPI.post(`/add-member-to-group/${groupId}/${vendorId}`);

export const apiDeleteVendorGroup = (groupId) =>
  AdminAPI.delete(`/delete-vendor-group/${groupId}`);

export const apiAssignLeadToGroup = (assignData) =>
  AdminAPI.post("/assign-lead-to-group", assignData);

// -------------------
// Navigation Endpoints (without /admin prefix)
// -------------------

// Navigation Services (Admin operations - protected)
export const apiCreateNavigationService = (data, imageFile = null) => {
  const formData = new FormData();
  
  // Append all data fields
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  
  // Append image if exists
  if (imageFile) {
    formData.append("image", imageFile);
  }
  
  return NavigationAPI.post("/navigation/navigation-create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const apiGetAllNavigationServices = () =>
  NavigationAPI.get("/navigation/navigation-get-all");

export const apiUpdateNavigationService = (id, data, imageFile = null) => {
  const formData = new FormData();
  
  // Append all data fields
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  
  // Append image if exists
  if (imageFile) {
    formData.append("image", imageFile);
  }
  
  return NavigationAPI.put(`/navigation/navigation-update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const apiDeleteNavigationService = (id) =>
  NavigationAPI.delete(`/navigation/navigation-delete/${id}`);

// Sub Services (Admin operations - protected)
export const apiCreateSubService = (data, imageFile) => {
  const formData = new FormData();
  
  // Append all data fields
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  
  // Append image if exists
  if (imageFile) {
    formData.append("image", imageFile);
  }
  
  return NavigationAPI.post("/navigation/subservice-create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const apiGetAllSubServices = () =>
  NavigationAPI.get("/navigation/subservice-get-all");

export const apiUpdateSubService = (id, data, imageFile) => {
  const formData = new FormData();
  
  // Append all data fields
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  
  // Append image if exists
  if (imageFile) {
    formData.append("image", imageFile);
  }
  
  return NavigationAPI.put(`/navigation/subservice-update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
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
// Footer Management Endpoints (Updated to match your routes)
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

export default API;