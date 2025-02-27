/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Thêm Navigate để redirect nếu không có role
import Spinner from "../ui/Spinner";
import DashboardAdmin from "./Dashboard/DashboardAdmin"; // Import các component dashboard
import DashboardStaff from "./Dashboard/DashboardStaff";
import DashboardBrand from "./Dashboard/DashboardBrand";
import DashboardCampus from "./Dashboard/DashBoardCampus"; // Giả sử bạn đã tạo component này

const DashBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roleLogin = user?.role || "";

  // Nếu không có role, redirect về sign-in
  if (!roleLogin) {
    return <Navigate to="/sign-in" replace />;
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
      return <DashboardCampus />; // Thêm dashboard cho campus
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default DashBoard;