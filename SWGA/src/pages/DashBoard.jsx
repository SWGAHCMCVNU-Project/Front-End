/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Thêm Navigate để redirect nếu không có role
import Spinner from "../ui/Spinner";
import DashboardAdmin from "./Dashboard/DashboardAdmin"; // Import các component dashboard
import DashboardStaff from "./Dashboard/DashboardStaff";
import DashboardBrand from "./Dashboard/DashboardBrand";
import DashboardCampus from "./Dashboard/DashBoardCampus"; // Giả sử bạn đã tạo component này
import storageService from "../services/storageService"; // Import storageService

const DashBoard = () => {
  const roleLogin = storageService.getRoleLogin() || ""; // Lấy role từ storageService

  // Nếu không có role, redirect về sign-in
  useEffect(() => {
    if (!roleLogin) {
      window.location.href = "/sign-in"; // Redirect ngay lập tức
    }
  }, [roleLogin]);

  if (!roleLogin) {
    return <Spinner />; // Hiển thị spinner trong khi kiểm tra
  }

  // Hiển thị dashboard tương ứng với role
  switch (roleLogin) {
    case "admin":
      return <DashboardAdmin />;
    case "staff":
      return <DashboardStaff />;
    case "brand":
      return <DashboardBrand />;
    case "campus":
      return <DashboardCampus />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default DashBoard;