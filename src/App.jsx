import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Leads from "./pages/LeadsManagement/LeadsManagement";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import VendorGroup from "./pages/LeadsManagement/VendorGroup";
import CreateLeadGroup from "./pages/LeadsManagement/CreateLeadGroup";
import CreateNewLead from "./pages/LeadsManagement/CreateNewLead";
import DistributionMethod from "./pages/LeadsManagement/DistributionMethod";
import PagesManagementDashboard from "./pages/PagesManagement/PagesManagementDashboard";
import KnowUs from "./../src/components/Page Management/KnowUs";
import ServicesList from "./pages/PagesManagement/ServicesList";
import HomePages from "./pages/PagesManagement/HomePages";
import ServicePages from "./pages/PagesManagement/ServicePages";
import VendorMain from "./pages/Vendors/VendorMain";
import CreateVendorGroup from "./pages/Vendors/CreateVendorGroup";
import CategoryDetail from "./pages/Vendors/CategoryDetail";
import CategoryPortfolio from "./pages/Vendors/CategoryPortfolio";
import ViewAll from "./pages/Vendors/ViewAll";
import CityManagement from "./pages/Cities/CityManagement";
import LocalAreaDetails from "./pages/Cities/LocalAreaDetails";
import ArticlesMain from "./pages/Articles/ArticlesMain";
import EditArticle from "./pages/Articles/EditArticle";
import Home from "./pages/HomePage/Home";
import VendorSignIn from "./pages/VendorLogin/VendorSignIn";
import VendorOtpVerify from "./pages/VendorLogin/VendorOtpVerify";
import VendorSignUp from "./pages/VendorLogin/VendorSignUp";
import VendorDashboard from "./pages/VendorLogin/VendorDashboard";
import VendorInfo from "./pages/VendorLogin/VendorInfo";
import VendorPortfolio from "./pages/VendorLogin/VendorPortfolio";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import DropdownManagement from "./pages/PagesManagement/DropdownManagement"

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.admin);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/vendor-login" element={<VendorSignIn />} />
        <Route path="/vendor-verify" element={<VendorOtpVerify />} />
        <Route path="/vendor-register" element={<VendorSignUp />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedAdminRoute>
              <Leads />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedAdminRoute>
              <Leads />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/vendor-group" 
          element={
            <ProtectedAdminRoute>
              <VendorGroup />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/create-lead-group" 
          element={
            <ProtectedAdminRoute>
              <CreateLeadGroup />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/create-new-lead" 
          element={
            <ProtectedAdminRoute>
              <CreateNewLead />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/distribution-method" 
          element={
            <ProtectedAdminRoute>
              <DistributionMethod />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/pages-management-dashboard" 
          element={
            <ProtectedAdminRoute>
              <PagesManagementDashboard />
            </ProtectedAdminRoute>
          } 
        />

          <Route 
          path="/dropdown-management" 
          element={
            <ProtectedAdminRoute>
              <DropdownManagement />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/services-list" 
          element={
            <ProtectedAdminRoute>
              <ServicesList />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/know-us" 
          element={
            <ProtectedAdminRoute>
              <KnowUs />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/home-page" 
          element={
            <ProtectedAdminRoute>
              <HomePages />
            </ProtectedAdminRoute>
          } 
        />

         <Route 
          path="/service-page" 
          element={
            <ProtectedAdminRoute>
              <ServicePages />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/vendor" 
          element={
            <ProtectedAdminRoute>
              <VendorMain />
            </ProtectedAdminRoute>
          } 
        />

         <Route 
          path="/create-vendor-group" 
          element={
            <ProtectedAdminRoute>
              <CreateVendorGroup />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/category-detail" 
          element={
            <ProtectedAdminRoute>
              <CategoryDetail />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/category-portfolio" 
          element={
            <ProtectedAdminRoute>
              <CategoryPortfolio />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/View-all" 
          element={
            <ProtectedAdminRoute>
              <ViewAll />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/city-management" 
          element={
            <ProtectedAdminRoute>
              <CityManagement />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/local-area-details" 
          element={
            <ProtectedAdminRoute>
              <LocalAreaDetails />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/articles" 
          element={
            <ProtectedAdminRoute>
              <ArticlesMain />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/edit-article" 
          element={
            <ProtectedAdminRoute>
              <EditArticle />
            </ProtectedAdminRoute>
          } 
        />
        
        {/* Vendor Routes (keep these separate) */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/vendor-info" element={<VendorInfo />} />
        <Route path="/vendor-portfolio" element={<VendorPortfolio />} />
        <Route path="/home" element={<Home />} />
        
        {/* Redirect root to admin login if not authenticated */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/admin-dashboard" : "/admin-login"} replace />} 
        />
      </Routes>
    </Router>
  );
}