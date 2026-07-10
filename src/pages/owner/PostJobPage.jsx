import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../services/userService";
import { createJob } from "../../services/jobService";

function PostJobPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("part-time");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryType, setSalaryType] = useState("monthly");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [workTimings, setWorkTimings] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const profile = await getUserProfile(currentUser.uid);
      await createJob({
        ownerId: currentUser.uid,
        businessName: profile?.businessName || "Local Business",
        title, description, jobType,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        salaryType,
        location: { city, area },
        workTimings,
      });
      navigate("/owner-dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        <Link to="/owner-dashboard" style={{ color: "var(--text-secondary)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "24px" }}>
          ← Back to Dashboard
        </Link>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ marginBottom: "6px" }}>Post a New Job</h1>
          <p style={{ color: "var(--text-secondary)" }}>Fill in the details to attract the right candidates</p>
        </div>

        <div className="card" style={{ padding: "32px" }}>
          {error && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "12px 16px", borderRadius: "var(--radius)", fontSize: "0.85rem", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Counter Sales Executive" />
            </div>

            <div className="form-group">
              <label className="form-label">Job Description</label>
              <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} placeholder="Describe the role, responsibilities, and requirements..." />
            </div>

            <div className="form-group">
              <label className="form-label">Job Type</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {["part-time", "full-time"].map((type) => (
                  <button key={type} type="button" onClick={() => setJobType(type)}
                    style={{
                      padding: "12px",
                      border: `2px solid ${jobType === type ? "var(--blue-600)" : "var(--border)"}`,
                      borderRadius: "var(--radius)",
                      background: jobType === type ? "var(--blue-50)" : "#fff",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: jobType === type ? "var(--blue-800)" : "var(--text-secondary)",
                      textTransform: "capitalize",
                    }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Min Salary (₹)</label>
                <input type="number" className="form-input" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} required placeholder="5000" />
              </div>
              <div className="form-group">
                <label className="form-label">Max Salary (₹)</label>
                <input type="number" className="form-input" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} required placeholder="10000" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Salary Type</label>
              <select className="form-select" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Delhi" />
              </div>
              <div className="form-group">
                <label className="form-label">Area / Locality</label>
                <input className="form-input" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Lajpat Nagar" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Work Timings</label>
              <input className="form-input" value={workTimings} onChange={(e) => setWorkTimings(e.target.value)} required placeholder="e.g. 9 AM – 6 PM" />
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: "8px", padding: "12px" }} disabled={loading}>
              {loading ? "Posting..." : "Post Job →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJobPage;