import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        backgroundColor: "#1e3a8a",
        color: "#fff",
      }}
    >
      <Link to="/" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "20px" }}>
        ShopSaathi 🛒
      </Link>

      <Link to="/jobs" style={{ color: "#fff", textDecoration: "none" }}>
        Browse Jobs
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {!currentUser && (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}

        {currentUser && (
          <>
            <Link
              to={userRole === "owner" ? "/owner-dashboard" : "/worker-dashboard"}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Dashboard
            </Link>
            <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
              Profile
            </Link>
            {userRole === "owner" && (
              <>
                <Link to="/post-job" style={{ color: "#fff", textDecoration: "none" }}>
                  Post Job
                </Link>
                <Link to="/owner-applications" style={{ color: "#fff", textDecoration: "none" }}>
                  Applications
                </Link>
              </>
            )}
            <span style={{ fontSize: "14px", opacity: 0.85 }}>{currentUser.email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 14px",
                backgroundColor: "#fff",
                color: "#1e3a8a",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;