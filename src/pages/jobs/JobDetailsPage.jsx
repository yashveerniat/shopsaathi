import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobById } from "../../services/jobService";
import { applyToJob, hasAlreadyApplied } from "../../services/applicationService";
import { getUserProfile } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

function JobDetailsPage() {
  const { jobId } = useParams();
  const { currentUser, userRole } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadJob() {
      const data = await getJobById(jobId);
      setJob(data);
      if (currentUser && userRole === "worker") {
        const applied = await hasAlreadyApplied(jobId, currentUser.uid);
        setAlreadyApplied(applied);
      }
      setLoading(false);
    }
    loadJob();
  }, [jobId, currentUser, userRole]);

  async function handleApply() {
    setApplying(true);
    setMessage("");
    const profile = await getUserProfile(currentUser.uid);
    await applyToJob({
      jobId: job.id,
      jobTitle: job.title,
      workerId: currentUser.uid,
      ownerId: job.ownerId,
      workerSnapshot: {
        name: profile?.name || "",
        phone: profile?.phone || "",
        skills: profile?.skills || [],
      },
    });
    setAlreadyApplied(true);
    setApplying(false);
    setMessage("Application submitted successfully!");
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-secondary)" }}>
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Job not found</h2>
        <Link to="/jobs" className="btn btn-primary" style={{ marginTop: "16px" }}>← Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        <Link to="/jobs" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "24px" }}>
          ← Back to all jobs
        </Link>

        {/* Job Header */}
        <div className="card" style={{ marginBottom: "16px", padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
            <div>
              <h1 style={{ fontSize: "1.6rem", marginBottom: "6px" }}>{job.title}</h1>
              <p style={{ color: "var(--blue-600)", fontWeight: 600, fontSize: "0.95rem" }}>{job.businessName}</p>
            </div>
            <span style={{
              padding: "6px 14px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600,
              background: job.jobType === "full-time" ? "var(--blue-100)" : "var(--saffron-light)",
              color: job.jobType === "full-time" ? "var(--blue-800)" : "#b45309",
            }}>
              {job.jobType}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            {[
              { icon: "💰", label: "Salary", value: `₹${job.salaryMin} - ₹${job.salaryMax} / ${job.salaryType}` },
              { icon: "📍", label: "Location", value: `${job.location?.area ? job.location.area + ", " : ""}${job.location?.city}` },
              { icon: "🕒", label: "Timings", value: job.workTimings },
            ].map((info) => (
              <div key={info.label} style={{ background: "var(--bg)", padding: "12px 16px", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{info.icon}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "2px" }}>{info.label}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{info.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="card" style={{ marginBottom: "16px", padding: "28px" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Job Description</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>{job.description}</p>
        </div>

        {/* Apply Card */}
        {userRole === "worker" && (
          <div className="card" style={{
            padding: "24px",
            background: alreadyApplied ? "#f0fdf4" : "var(--blue-50)",
            border: alreadyApplied ? "1px solid #86efac" : "1px solid var(--blue-100)",
          }}>
            {message && (
              <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "12px 16px", borderRadius: "var(--radius)", fontSize: "0.85rem", marginBottom: "16px", fontWeight: 500 }}>
                ✅ {message}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ marginBottom: "4px", fontSize: "1rem" }}>
                  {alreadyApplied ? "Application Submitted" : "Interested in this job?"}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  {alreadyApplied ? "The owner will contact you if shortlisted." : "Apply now — owner will review your profile."}
                </p>
              </div>
              <button
                onClick={handleApply}
                disabled={alreadyApplied || applying}
                className="btn btn-primary"
                style={{ opacity: alreadyApplied ? 0.6 : 1 }}
              >
                {alreadyApplied ? "✓ Already Applied" : applying ? "Applying..." : "Apply Now →"}
              </button>
            </div>
          </div>
        )}

        {!currentUser && (
          <div className="card" style={{ padding: "24px", textAlign: "center", background: "var(--blue-50)", border: "1px solid var(--blue-100)" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>Login as a worker to apply for this job</p>
            <Link to="/login" className="btn btn-primary">Login to Apply →</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailsPage;