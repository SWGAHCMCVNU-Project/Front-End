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
import DashBoard from "./pages/DashBoard"; // Chỉ cần import DashBoard
import CampaignPage from "./pages/CampaignManagement/CampaignPage.jsx";
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

import TransactionDetailPage from "./pages/BrandManagement/TransactionDetailPage";
import Lecturers from "./pages/LectureManagement/Lecturers.jsx";
import PackagePoint from "./pages/PackagePointManagement/PackagePoint.jsx";
// import LecturersPoint from "./pages/LectureManagement/Lecture.jsx"





import Main from "./components/layout/Main.jsx";
// Mock service thay thế storageService
const mockAuthService = {
  getToken: () => true, // luôn trả về đã đăng nhập
  getRole: () => localStorage.getItem("role"), // Lấy role từ localStorage
};

function PrivateRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = mockAuthService.getToken();
  const userRole = mockAuthService.getRole();

  // Nếu không có role hoặc chưa đăng nhập, redirect về sign-in
  if (!isAuthenticated || !userRole) {
    return <Navigate to="/sign-in" replace />;
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
        <option value="admin">Admin</option>
        <option value="brand">Brand</option>
        <option value="staff">Staff</option>
        <option value="campus">Campus</option>
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
          <Route path="/" element={<Main />}>
            {/* Chỉ giữ một route dashboard duy nhất */}
            <Route
              path="/dashboard"
              exact
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/brands"
              exact
              element={
                <PrivateRoute>
                  <Brands />
                </PrivateRoute>
              }
            />
            <Route
              path="brands/:brandId"
              element={
                <PrivateRoute>
                  <Brand />
                </PrivateRoute>
              }
            />
            <Route
              path="/campaigns"
              exact
              element={
                <PrivateRoute>
                  <CampaignPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/students"
              exact
              element={
                <PrivateRoute>
                  <Students />
                </PrivateRoute>
              }
            />
            <Route
              path="students/:studentId"
              element={
                <PrivateRoute>
                  <Student />
                </PrivateRoute>
              }
            />
            <Route
              path="/universities"
              exact
              element={
                <PrivateRoute>
                  <UniversityPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/majors"
              exact
              element={
                <PrivateRoute>
                  <MajorPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/stores"
              exact
              element={
                <PrivateRoute>
                  <StorePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/vouchers"
              exact
              element={
                <PrivateRoute>
                  <Vouchers />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              exact
              element={
                <PrivateRoute>
                  <CustomerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              exact
              element={
                <PrivateRoute>
                  <BrandTransactionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions/:id"
              element={
                <PrivateRoute>
                  <TransactionDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/voucher-items"
              exact
              element={
                <PrivateRoute>
                  <VoucherItems />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              exact
              element={
                <PrivateRoute>
                  <FeedbackPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/lecturers" // Đổi từ /students
              exact
              element={
                <PrivateRoute>
                  <Lecturers /> 
                </PrivateRoute>
              }
            />
             <Route
              path="/point-packages" // Đổi từ /students
              exact
              element={
                <PrivateRoute>
                  <PackagePoint /> 
                </PrivateRoute>
              }
            />
             {/* <Route
              path="/lecturers/:id" // Đổi từ /students
              exact
              element={
                <PrivateRoute>
                <LecturersPoint/>
                </PrivateRoute>
              }
            /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
