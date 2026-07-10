import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// children = the page to show if allowed
// allowedRole = "owner" or "worker" — only that role can see this page
function ProtectedRoute({ children, allowedRole }) {
  const { currentUser, userRole } = useAuth();

  // Not logged in at all -> send to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, but wrong role (e.g. a worker trying to open owner dashboard)
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // All good — show the actual page
  return children;
}

export default ProtectedRoute;