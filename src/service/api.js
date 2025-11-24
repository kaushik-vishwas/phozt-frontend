// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend.nagalikardiagnostic.com/phozt"
// baseURL: "http://localhost:5000/api"
});

// Attach vendor token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendorToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Admin API instance with admin token
const AdminAPI = axios.create({
  baseURL: "https://backend.nagalikardiagnostic.com/phozt/admin"
    // baseURL: "http://localhost:5000/api/admin"
});

// Attach admin token automatically
AdminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
// Admin Endpoints
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

export default API;