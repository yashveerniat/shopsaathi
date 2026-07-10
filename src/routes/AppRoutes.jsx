import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import JobListingsPage from "../pages/jobs/JobListingsPage";
import JobDetailsPage from "../pages/jobs/JobDetailsPage";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import PostJobPage from "../pages/owner/PostJobPage";
import OwnerApplicationsPage from "../pages/owner/OwnerApplicationsPage";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/jobs" element={<JobListingsPage />} />
      <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute allowedRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-job"
        element={
          <ProtectedRoute allowedRole="owner">
            <PostJobPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner-applications"
        element={
          <ProtectedRoute allowedRole="owner">
            <OwnerApplicationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/worker-dashboard"
        element={
          <ProtectedRoute allowedRole="worker">
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;