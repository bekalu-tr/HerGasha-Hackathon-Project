
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication information is loaded.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pinkBg">
        <p className="text-plum font-semibold">
          Loading Her Gasha...
        </p>
      </div>
    );
  }

  // Redirect users who are not logged in.
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Check the user's role when a route has role restrictions.
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
