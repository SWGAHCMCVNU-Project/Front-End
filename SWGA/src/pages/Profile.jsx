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

  // Fetch brandId or campusId based on role
  const brandId = roleLogin === "brand" ? storageService.getBrandId() : null;
  const campusId = roleLogin === "campus" ? storageService.getCampusId() : null;

  switch (roleLogin) {
    // case 'admin':
    //   return <AdminProfile />;
    // case 'staff':
    //   return <StaffProfile />;
    case "brand":
      if (!brandId) {
        return <div>Error: Brand ID is missing for the logged-in user.</div>;
      }
      return <BrandProfile brandId={brandId} />;
    case "campus":
      if (!campusId) {
        return <div>Error: Campus ID is missing for the logged-in user.</div>;
      }
      return <CampusProfile campusId={campusId} />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default Profile;