import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOpenJobs } from "../../services/jobService";

function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    async function loadJobs() {
      const data = await getAllOpenJobs();
      setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, []);

  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.city?.toLowerCase().includes(search.toLowerCase()) ||
      job.businessName?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || job.jobType === filterType;
    return matchSearch && matchType;
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--blue-900), var(--blue-800))",
        color: "#fff",
        padding: "48px 20px 32px",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ color: "#fff", marginBottom: "8px" }}>Available Jobs</h1>
          <p style={{ opacity: 0.8, marginBottom: "24px" }}>
            Find local jobs near you — kirana stores, medical shops, and more
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              className="form-input"
              style={{ flex: 1, minWidth: "200px", background: "rgba(255,255,255,0.95)" }}
              placeholder="Search by job title, city, or business..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-select"
              style={{ width: "160px", background: "rgba(255,255,255,0.95)" }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px" }}>
        {loading && <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading jobs...</p>}

        {!loading && filtered.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "48px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ marginBottom: "8px" }}>No jobs found</h3>
            <p style={{ color: "var(--text-secondary)" }}>Try a different search or filter</p>
          </div>
        )}

        {!loading && (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "16px" }}>
            Showing {filtered.length} job{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {filtered.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "12px" }}
          >
            <div
              className="card"
              style={{ transition: "box-shadow 0.2s, transform 0.1s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "4px" }}>{job.title}</h3>
                  <p style={{ color: "var(--blue-600)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "10px" }}>
                    {job.businessName}
                  </p>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      💰 ₹{job.salaryMin} - ₹{job.salaryMax}/{job.salaryType}
                    </span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      📍 {job.location?.area ? `${job.location.area}, ` : ""}{job.location?.city}
                    </span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      🕒 {job.workTimings}
                    </span>
                  </div>
                </div>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: job.jobType === "full-time" ? "var(--blue-100)" : "var(--saffron-light)",
                  color: job.jobType === "full-time" ? "var(--blue-800)" : "#b45309",
                  whiteSpace: "nowrap",
                }}>
                  {job.jobType}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JobListingsPage;