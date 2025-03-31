/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
// import AdminProfile from "../features/profile/admin/admin-profile";
import BrandProfile from "../features/profile/brand/BrandProfile";
import CampusProfile from "../features/profile/campus/CampusProfile";
// import StaffProfile from "../features/profile/staff/staff-profile";
import storageService from "../services/storageService";

const Profile = () => {
  const navigate = useNavigate();
  const roleLogin = storageService.getRoleLogin();

  useEffect(() => {
    if (!storageService.getAccessToken() || !roleLogin) {
      navigate("/sign-in", { replace: true });
    }
  }, [roleLogin, navigate]);

  if (!roleLogin) {
    return <Spinner />;
  }

  switch (roleLogin) {
    // case 'admin':
    //   return <AdminProfile />;
    // case 'staff':
    //   return <StaffProfile />;
    case "brand":
      return <BrandProfile />;
    case "campus":
      return <CampusProfile />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default Profile;
