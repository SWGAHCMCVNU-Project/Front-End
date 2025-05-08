import { Navigate } from "react-router-dom";
import storageService from "../../services/storageService";

const ProtectedRoute = ({ children }) => {
  const token = storageService.getAccessToken();
  const roleLogin = storageService.getRoleLogin();

  if (!token || !roleLogin) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;