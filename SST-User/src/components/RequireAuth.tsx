
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RequireAuthProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}

export default function RequireAuth({ children, requireAdmin = false }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login page but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    // If admin access is required but user is not an admin
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
