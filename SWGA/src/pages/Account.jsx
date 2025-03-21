import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import AccountPage from "../features/account/brand/AccountPage";
import storageService from "../services/storageService";

const Account = () => {
  const navigate = useNavigate();
  const roleLogin = storageService.getRoleLogin();
  const accountId = storageService.getAccountId();

  useEffect(() => {
    if (!storageService.getAccessToken() || !roleLogin || !accountId) {
      navigate("/sign-in", { replace: true });
    }
  }, [roleLogin, navigate, accountId]);

  if (!roleLogin || !accountId) {
    return <Spinner />;
  }

  switch (roleLogin) {
    case "admin":
      return <div>Admin Profile (To be implemented)</div>;
    case "brand":
      return <AccountPage accountId={accountId} />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default Account;