import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getJobsByOwner } from "../../services/jobService";

function OwnerDashboard() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      const data = await getJobsByOwner(currentUser.uid);
      setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, [currentUser]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ marginBottom: "6px" }}>Owner Dashboard</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Welcome back! Manage your jobs and applications here.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Posted Jobs", value: jobs.length, icon: "📋" },
            { label: "Active Listings", value: jobs.filter(j => j.status === "open").length, icon: "✅" },
          ].map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--blue-900)" }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Jobs Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.2rem" }}>Your Posted Jobs</h2>
          <Link to="/post-job" className="btn btn-primary btn-sm">
            + Post New Job
          </Link>
        </div>

        {loading && <p style={{ color: "var(--text-secondary)" }}>Loading jobs...</p>}

        {!loading && jobs.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📋</div>
            <h3 style={{ marginBottom: "8px" }}>No jobs posted yet</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.9rem" }}>
              Post your first job to start receiving applications
            </p>
            <Link to="/post-job" className="btn btn-primary">Post a Job →</Link>
          </div>
        )}

        {!loading && jobs.map((job) => (
          <div key={job.id} className="card" style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ marginBottom: "6px" }}>{job.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "4px" }}>
                  ₹{job.salaryMin} - ₹{job.salaryMax} / {job.salaryType} · {job.jobType}
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  📍 {job.location?.area ? `${job.location.area}, ` : ""}{job.location?.city}
                  &nbsp;·&nbsp;🕒 {job.workTimings}
                </p>
              </div>
              <span style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: job.status === "open" ? "#dcfce7" : "#f1f5f9",
                color: job.status === "open" ? "#15803d" : "#475569",
              }}>
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerDashboard;