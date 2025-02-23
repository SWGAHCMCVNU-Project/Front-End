/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "antd/dist/reset.css";

import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./assets/styles/App.scss";
import "./assets/styles/responsive.scss";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import DashBoard from "./pages/DashBoard";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin.jsx";
import DashboardStaff from "./pages/Dashboard/DashboardStaff.jsx";
import DashboardBrand from "./pages/Dashboard/DashboardBrand.jsx";
import CampaignPage from "./pages/CampaignManagement/CampaignPage.jsx";
// import CampaignDetailsPage from "./pages/CampaignManagement/CampaignDetailsPage.jsx";
import Brands from "./pages/BrandManagement/Brands.jsx";
import Brand from "./pages/BrandManagement/Brand.jsx";
import Students from "./pages/StudentManagement/Students.jsx";
import Student from "./pages/StudentManagement/Student.jsx";
import UniversityPage from "./pages/UniversityManagement/UniversityPage.jsx";
import MajorPage from "./pages/MajorManagement/MajorPage.jsx";
import StorePage from "./pages/StoreManagement/StorePage.jsx";
import Vouchers from "./pages/VoucherManagement/Vouchers.jsx";
import CustomerPage from "./pages/CustomerManagement/CustomerPage.jsx";
import BrandTransactionPage from "./pages/BrandManagement/BrandTransaction.jsx";
import VoucherItems from "./pages/VoucherItemManagement/VoucherItems.jsx";
import FeedbackPage from "./pages/FeedbackManagement/Feedback.jsx";

import Main from "./components/layout/Main.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TransactionDetailPage from "./pages/BrandManagement/TransactionDetailPage";

// Mock service thay thế storageService
const mockAuthService = {
  getToken: () => true, // luôn trả về đã đăng nhập
  getRole: () => localStorage.getItem("role"), // Lấy role từ localStorage, không có mặc định
};

function PrivateRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const isAuthenticated = mockAuthService.getToken();
  const userRole = mockAuthService.getRole();

  // Khi chưa có role hoặc chưa đăng nhập
  if (!userRole) {
    return <Navigate to="/sign-in" replace />;
  }

  // Nếu không có roles được chỉ định, cho phép tất cả roles truy cập
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect về dashboard tương ứng với role
    switch (userRole) {
      case "Admin":
        return <Navigate to="/dashboard-admin" replace />;
      case "Brand":
        return <Navigate to="/dashboard-brand" replace />;
      case "Manager":
        return <Navigate to="/dashboard-manager" replace />;
      case "Campus":
        return <Navigate to="/dashboard-campus" replace />;
      default:
        return <Navigate to="/sign-in" replace />;
    }
  }

  return children;
}

// Component để switch role
function RoleSwitcher() {
  const handleRoleChange = (role) => {
    localStorage.setItem("role", role);
    window.location.reload(); // Reload để cập nhật UI
  };

  const currentRole = localStorage.getItem("role") || "none";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <select
        value={currentRole}
        onChange={(e) => handleRoleChange(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="none" disabled>
          Select Role
        </option>
        <option value="Admin">Admin</option>
        <option value="Brand">Brand</option>
        <option value="Manager">Manager</option>
        <option value="Campus">Campus</option>
      </select>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <RoleSwitcher />
        <Routes>
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<DashBoard />} />
          <Route path="/" element={<Main />}>
            <Route
              path="/dashboard-admin"
              exact
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <DashboardAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard-brand"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <DashboardBrand />
                </PrivateRoute>
              }
            />
            {/* <Route path="/dashboard-manager" exact element={
              <PrivateRoute allowedRoles={["Manager"]}>
                <DashboardManager />
              </PrivateRoute>
            } />
            <Route path="/dashboard-campus" exact element={
              <PrivateRoute allowedRoles={["Campus"]}>
                <DashboardCampus />
              </PrivateRoute>
            } /> */}
            <Route
              path="/brands"
              exact
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <Brands />
                </PrivateRoute>
              }
            />
            <Route
              path="brands/:brandId"
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <Brand />
                </PrivateRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <PrivateRoute allowedRoles={["Admin", "Brand"]}>
                  <CampaignPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/students"
              exact
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <Students />
                </PrivateRoute>
              }
            />
            <Route
              path="students/:studentId"
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <Student />
                </PrivateRoute>
              }
            />
            <Route
              path="/universities"
              exact
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <UniversityPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/majors"
              exact
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <MajorPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/stores"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <StorePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/vouchers"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <Vouchers />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <CustomerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <BrandTransactionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions/:id"
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <TransactionDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/voucher-items"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <VoucherItems />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              exact
              element={
                <PrivateRoute allowedRoles={["Brand"]}>
                  <FeedbackPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
