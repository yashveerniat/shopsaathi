import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getApplicationsForOwner, updateApplicationStatus } from "../../services/applicationService";

function OwnerApplicationsPage() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      const data = await getApplicationsForOwner(currentUser.uid);
      setApplications(data);
      setLoading(false);
    }
    loadApplications();
  }, [currentUser]);

  async function handleStatusChange(applicationId, newStatus) {
    await updateApplicationStatus(applicationId, newStatus);
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  }

  const statusStyle = {
    pending:     { bg: "#f1f5f9", color: "#475569" },
    shortlisted: { bg: "#dbeafe", color: "#1e40af" },
    hired:       { bg: "#dcfce7", color: "#15803d" },
    rejected:    { bg: "#fee2e2", color: "#b91c1c" },
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        <Link to="/owner-dashboard" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "24px" }}>
          Back to Dashboard
        </Link>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ marginBottom: "6px" }}>Applications Received</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {applications.length} application{applications.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {loading && <p style={{ color: "var(--text-secondary)" }}>Loading applications...</p>}

        {!loading && applications.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "56px 24px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📭</div>
            <h3 style={{ marginBottom: "8px" }}>No applications yet</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Applications will appear here when workers apply to your jobs
            </p>
          </div>
        )}

        {applications.map((app) => {
          const ss = statusStyle[app.status] || statusStyle.pending;
          return (
            <div key={app.id} className="card" style={{ marginBottom: "16px", padding: "24px" }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ marginBottom: "4px" }}>{app.jobTitle}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    Applied on {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span style={{ padding: "4px 14px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, background: ss.bg, color: ss.color, textTransform: "capitalize" }}>
                  {app.status}
                </span>
              </div>

              <div style={{ background: "var(--bg)", borderRadius: "var(--radius)", padding: "14px 16px", marginBottom: "16px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "2px" }}>APPLICANT</div>
                  <div style={{ fontWeight: 600 }}>👤 {app.workerSnapshot?.name || "—"}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "2px" }}>PHONE</div>
                  <div style={{ fontWeight: 600 }}>📞 {app.workerSnapshot?.phone || "—"}</div>
                </div>
                {app.workerSnapshot?.skills?.length > 0 && (
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "2px" }}>SKILLS</div>
                    <div style={{ fontWeight: 600 }}>🛠 {app.workerSnapshot.skills.join(", ")}</div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <a href={"https://wa.me/91" + app.workerSnapshot?.phone} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}>
                  WhatsApp
                </a>
                <button onClick={() => handleStatusChange(app.id, "shortlisted")} className="btn btn-sm" style={{ background: app.status === "shortlisted" ? "#dbeafe" : "#f1f5f9", color: app.status === "shortlisted" ? "#1e40af" : "var(--text)", border: app.status === "shortlisted" ? "2px solid #93c5fd" : "2px solid transparent" }}>
                  Shortlist
                </button>
                <button onClick={() => handleStatusChange(app.id, "hired")} className="btn btn-sm" style={{ background: app.status === "hired" ? "#dcfce7" : "#f1f5f9", color: app.status === "hired" ? "#15803d" : "var(--text)", border: app.status === "hired" ? "2px solid #86efac" : "2px solid transparent" }}>
                  Hire
                </button>
                <button onClick={() => handleStatusChange(app.id, "rejected")} className="btn btn-sm" style={{ background: app.status === "rejected" ? "#fee2e2" : "#f1f5f9", color: app.status === "rejected" ? "#b91c1c" : "var(--text)", border: app.status === "rejected" ? "2px solid #fca5a5" : "2px solid transparent" }}>
                  Reject
                </button>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default OwnerApplicationsPage;