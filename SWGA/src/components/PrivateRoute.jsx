import { Navigate } from 'react-router-dom';
import storageService from '../services/storageService';

function PrivateRoute({ children, allowedRoles }) {
  const role = storageService.getRole();
  const isAuthenticated = storageService.getToken();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PrivateRoute; 