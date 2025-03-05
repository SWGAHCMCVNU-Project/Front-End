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

import Main from "./components/layout/Main.jsx";
import storageService from "./services/storageService"; // Import storageService

function PrivateRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const isAuthenticated = !!storageService.getAccessToken(); // Kiểm tra token từ localStorage
  const userRole = storageService.getRoleLogin(); // Lấy role từ localStorage

  // Nếu không có token hoặc role, redirect về sign-in
  if (!isAuthenticated || !userRole) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Kiểm tra nếu role hiện tại không nằm trong allowedRoles (nếu có)
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Điều hướng dựa trên role nếu cần
  // const rolePaths = {
  //   admin: "/dashboard",
  //   brand: "/brands",
  //   staff: "/dashboard",
  //   campus: "/universities",
  // };

  // const path = rolePaths[userRole] || "/dashboard";
  // if (location.pathname !== path && !allowedRoles.length) {
  //   return <Navigate to={path} replace />;
  // }

  return children;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/" element={<Main />}>
            {/* Route dashboard */}
            <Route
              path="/dashboard"
              exact
              element={
                <PrivateRoute allowedRoles={["admin", "staff"]}>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            {/* Route brands */}
            <Route
              path="/brands"
              exact
              element={
                <PrivateRoute allowedRoles={["admin", "brand"]}>
                  <Brands />
                </PrivateRoute>
              }
            />
            <Route
              path="brands/:brandId"
              element={
                <PrivateRoute allowedRoles={["admin", "brand"]}>
                  <Brand />
                </PrivateRoute>
              }
            />
            {/* Route campaigns */}
            <Route
              path="/campaigns"
              exact
              element={
                <PrivateRoute allowedRoles={["admin", "brand"]}>
                  <CampaignPage />
                </PrivateRoute>
              }
            />
            {/* Route students */}
            <Route
              path="/students"
              exact
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Students />
                </PrivateRoute>
              }
            />
            <Route
              path="students/:studentId"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Student />
                </PrivateRoute>
              }
            />
            {/* Route universities */}
            <Route
              path="/universities"
              exact
              element={
                <PrivateRoute allowedRoles={["admin", "campus"]}>
                  <UniversityPage />
                </PrivateRoute>
              }
            />
            {/* Route majors */}
            <Route
              path="/majors"
              exact
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <MajorPage />
                </PrivateRoute>
              }
            />
            {/* Route stores */}
            <Route
              path="/stores"
              exact
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <StorePage />
                </PrivateRoute>
              }
            />
            {/* Route vouchers */}
            <Route
              path="/vouchers"
              exact
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <Vouchers />
                </PrivateRoute>
              }
            />
            {/* Route customers */}
            <Route
              path="/customers"
              exact
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <CustomerPage />
                </PrivateRoute>
              }
            />
            {/* Route transactions */}
            <Route
              path="/transactions"
              exact
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <BrandTransactionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions/:id"
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <TransactionDetailPage />
                </PrivateRoute>
              }
            />
            {/* Route voucher-items */}
            <Route
              path="/voucher-items"
              exact
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <VoucherItems />
                </PrivateRoute>
              }
            />
            {/* Route feedback */}
            <Route
              path="/feedback"
              exact
              element={
                <PrivateRoute allowedRoles={["brand"]}>
                  <FeedbackPage />
                </PrivateRoute>
              }
            />
            {/* Route lecturers */}
            <Route
              path="/lecturers"
              exact
              element={
                <PrivateRoute allowedRoles={["campus"]}>
                  <Lecturers />
                </PrivateRoute>
              }
            />
            {/* Route point-packages */}
            <Route
              path="/point-packages"
              exact
              element={
                <PrivateRoute allowedRoles={["campus"]}>
                  <PackagePoint />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;