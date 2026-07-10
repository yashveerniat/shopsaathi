import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getApplicationsForWorker } from "../../services/applicationService";

function WorkerDashboard() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      const data = await getApplicationsForWorker(currentUser.uid);
      setApplications(data);
      setLoading(false);
    }
    loadApplications();
  }, [currentUser]);

  const statusColors = {
    pending:     { bg: "#f1f5f9", color: "#475569" },
    shortlisted: { bg: "var(--blue-100)", color: "var(--blue-800)" },
    hired:       { bg: "#dcfce7", color: "#15803d" },
    rejected:    { bg: "#fee2e2", color: "#b91c1c" },
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ marginBottom: "6px" }}>Worker Dashboard</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Track your applications and find new opportunities.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Applied Jobs", value: applications.length, icon: "📨" },
            { label: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length, icon: "⭐" },
            { label: "Hired", value: applications.filter(a => a.status === "hired").length, icon: "🎉" },
          ].map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--blue-900)" }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.2rem" }}>My Applications</h2>
          <Link to="/jobs" className="btn btn-primary btn-sm">Browse Jobs</Link>
        </div>

        {loading && <p style={{ color: "var(--text-secondary)" }}>Loading applications...</p>}

        {!loading && applications.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>💼</div>
            <h3 style={{ marginBottom: "8px" }}>No applications yet</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.9rem" }}>
              Browse available jobs and start applying today
            </p>
            <Link to="/jobs" className="btn btn-primary">Browse Jobs →</Link>
          </div>
        )}

        {!loading && applications.map((app) => {
          const sc = statusColors[app.status] || statusColors.pending;
          return (
            <div key={app.id} className="card" style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ marginBottom: "4px" }}>{app.jobTitle}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  Applied on {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <span style={{
                padding: "5px 14px",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: sc.bg,
                color: sc.color,
                textTransform: "capitalize",
              }}>
                {app.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkerDashboard;