import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import BrandAccount from "../features/account/brand/BrandAccount";
import storageService from "../services/storageService";

const Account = () => {
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
    case "admin":
      return <div>Admin Profile (To be implemented)</div>;
    case "brand":
      return <BrandAccount accountId={storageService.getAccountId()} />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default Account;