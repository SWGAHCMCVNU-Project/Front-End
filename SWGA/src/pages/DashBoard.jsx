/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

const DashBoard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const roleLogin = user?.role || "";

  useEffect(() => {
    // Điều hướng dựa vào role
    switch(roleLogin) {
      case "admin":
        navigate("/dashboard-admin");
        break;
      case "staff":
        navigate("/dashboard-staff");
        break;
      case "brand":
        navigate("/dashboard-brand");
        break;
      default:
        navigate("/sign-in");
    }
  }, [roleLogin, navigate]);

  // Hiển thị spinner trong khi điều hướng
  return <Spinner />;
};

export default DashBoard;
