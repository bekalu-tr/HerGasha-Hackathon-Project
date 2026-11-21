
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/pages/Home.jsx";
import Report from "../components/pages/Report.jsx";
import Dashboard from "../components/pages/Dashboard.jsx";
import Opportunities from "../components/pages/Opportunities.jsx";
import Support from "../components/pages/Support.jsx";
import Login from "../components/pages/Login.jsx";
import Register from "../components/pages/Register.jsx";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// Import authentication hook.
import useAuth from "../hooks/useAuth";

// Redirect authenticated users away from login/register.
function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/opportunities"
          element={<Opportunities />}
        />
      </Route>

      {/* Guest-only pages */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Pages requiring authentication */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/report"
            element={<Report />}
          />

          <Route
            path="/support"
            element={<Support />}
          />
        </Route>
      </Route>

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
