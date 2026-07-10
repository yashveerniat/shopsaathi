import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/userService";

function ProfilePage() {
  const { currentUser, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("part-time");
  const [bio, setBio] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const data = await getUserProfile(currentUser.uid);
      if (data) {
        setName(data.name || "");
        setPhone(data.phone || "");
        setBusinessName(data.businessName || "");
        setBusinessType(data.businessType || "");
        setBusinessAddress(data.businessAddress || "");
        setSkills((data.skills || []).join(", "));
        setExperience(data.experience || "");
        setAvailability(data.availability || "part-time");
        setBio(data.bio || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const updates = { name, phone };
    if (userRole === "owner") {
      updates.businessName = businessName;
      updates.businessType = businessType;
      updates.businessAddress = businessAddress;
    } else {
      updates.skills = skills.split(",").map((s) => s.trim()).filter(Boolean);
      updates.experience = experience;
      updates.availability = availability;
      updates.bio = bio;
    }
    await updateUserProfile(currentUser.uid, updates);
    setSaving(false);
    setMessage("Profile updated successfully!");
  }

  if (loading) {
    return <div style={{ textAlign: "center", padding: "80px", color: "var(--text-secondary)" }}>Loading...</div>;
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        <Link to={userRole === "owner" ? "/owner-dashboard" : "/worker-dashboard"}
          style={{ color: "var(--text-secondary)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "24px" }}>
          ← Back to Dashboard
        </Link>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ marginBottom: "6px" }}>Your Profile</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {userRole === "owner" ? "Manage your business information" : "Update your skills and experience"}
          </p>
        </div>

        <div className="card" style={{ padding: "32px" }}>
          {message && (
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "12px 16px", borderRadius: "var(--radius)", fontSize: "0.85rem", marginBottom: "20px", fontWeight: 500 }}>
              ✅ {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "0.95rem", marginBottom: "16px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Basic Info
              </h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="9876543210" />
              </div>
            </div>

            {/* Owner Fields */}
            {userRole === "owner" && (
              <div>
                <h3 style={{ fontSize: "0.95rem", marginBottom: "16px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Business Info
                </h3>
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input className="form-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Sharma Kirana Store" />
                </div>
                <div className="form-group">
                  <label className="form-label">Business Type</label>
                  <select className="form-select" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                    <option value="">Select type</option>
                    <option value="kirana">Kirana Store</option>
                    <option value="medical">Medical Store</option>
                    <option value="stationery">Stationery Shop</option>
                    <option value="supermarket">Supermarket</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Business Address</label>
                  <input className="form-input" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} placeholder="Shop No. 5, Main Market, Delhi" />
                </div>
              </div>
            )}

            {/* Worker Fields */}
            {userRole === "worker" && (
              <div>
                <h3 style={{ fontSize: "0.95rem", marginBottom: "16px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Work Info
                </h3>
                <div className="form-group">
                  <label className="form-label">Skills <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>(comma separated)</span></label>
                  <input className="form-input" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Billing, Customer Service, Inventory" />
                </div>
                <div className="form-group">
                  <label className="form-label">Experience</label>
                  <input className="form-input" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 1-2 years" />
                </div>
                <div className="form-group">
                  <label className="form-label">Availability</label>
                  <select className="form-select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                    <option value="part-time">Part-time</option>
                    <option value="full-time">Full-time</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Bio <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>(optional)</span></label>
                  <textarea className="form-textarea" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell employers a bit about yourself..." />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: "8px", padding: "12px" }} disabled={saving}>
              {saving ? "Saving..." : "Save Profile →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;