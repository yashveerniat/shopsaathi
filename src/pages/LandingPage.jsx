import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const { currentUser, userRole } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #2563eb 100%)",
        color: "#fff",
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div className="container">
          <span style={{
            display: "inline-block",
            background: "rgba(245,158,11,0.2)",
            border: "1px solid #f59e0b",
            color: "#fcd34d",
            padding: "4px 16px",
            borderRadius: "999px",
            fontSize: "0.8rem",
            fontWeight: 600,
            marginBottom: "20px",
            letterSpacing: "0.05em",
          }}>
            HYPERLOCAL JOB MATCHING
          </span>

          <h1 style={{ color: "#fff", marginBottom: "20px" }}>
            Apni dukaan ke liye<br />
            <span style={{ color: "#fcd34d" }}>sahi kaam wala</span> dhundo
          </h1>

          <p style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            ShopSaathi connects kirana stores, medical shops, and local businesses
            with nearby, reliable workers — in minutes, not days.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            {currentUser ? (
              <Link
                to={userRole === "owner" ? "/owner-dashboard" : "/worker-dashboard"}
                className="btn btn-saffron btn-lg"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-saffron btn-lg">
                  I'm hiring — Post a job
                </Link>
                <Link to="/register" className="btn btn-lg" style={{
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.6)",
                  color: "#fff",
                }}>
                  I'm looking for work
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#fff", padding: "32px 20px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          {[
            { number: "500+", label: "Local Businesses" },
            { number: "2000+", label: "Job Seekers" },
            { number: "10+", label: "Cities Covered" },
            { number: "48hrs", label: "Average Hiring Time" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e3a8a" }}>{stat.number}</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "72px 20px", background: "#f8fafc" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Kaise kaam karta hai?</h2>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: "48px" }}>
            3 simple steps mein apna kaam shuru karo
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              { step: "01", icon: "🏪", title: "Account Banao", desc: "Shop owner ya job seeker — apna profile banao, business ya skills add karo. Sirf 2 minute lagta hai." },
              { step: "02", icon: "📋", title: "Job Post Karo ya Dhundo", desc: "Owners job post karo with salary, timings, location. Workers apne area ki jobs browse karo aur apply karo." },
              { step: "03", icon: "🤝", title: "Connect Karo", desc: "Owner applications dekhe, status update kare, aur seedha WhatsApp se contact kare. Simple, fast, local." },
            ].map((item) => (
              <div key={item.step} className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
                <div style={{
                  width: "48px", height: "48px",
                  background: "#dbeafe", borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", margin: "0 auto 16px",
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.1em", marginBottom: "8px" }}>
                  STEP {item.step}
                </div>
                <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ padding: "72px 20px", background: "#fff" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "48px" }}>Kiske liye hai ShopSaathi?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)", color: "#fff", borderRadius: "12px", padding: "36px 28px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🏪</div>
              <h3 style={{ color: "#fff", marginBottom: "12px" }}>Shop Owners</h3>
              <p style={{ opacity: 0.85, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "20px" }}>
                Kirana, medical, stationery, supermarket — kisi bhi local business ke liye reliable workers dhundo. Part-time ya full-time, apni zaroorat ke hisaab se.
              </p>
              <Link to="/register" className="btn btn-white btn-sm">Post a Job →</Link>
            </div>
            <div style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", borderRadius: "12px", padding: "36px 28px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "16px" }}>💼</div>
              <h3 style={{ color: "#fff", marginBottom: "12px" }}>Job Seekers</h3>
              <p style={{ opacity: 0.85, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "20px" }}>
                Students, freshers, ya experienced workers — apne area mein jobs dhundo. Local kaam, accha salary, flexible timings.
              </p>
              <Link to="/jobs" className="btn btn-white btn-sm" style={{ color: "#d97706" }}>Browse Jobs →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0f172a", color: "#fff", padding: "72px 20px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "#fff", marginBottom: "12px" }}>Abhi shuru karo — bilkul free hai</h2>
          <p style={{ opacity: 0.7, marginBottom: "32px" }}>Register in 2 minutes. No fees, no commissions.</p>
          <Link to="/register" className="btn btn-saffron btn-lg">Create Free Account →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", padding: "24px 20px", textAlign: "center", fontSize: "0.85rem" }}>
        <div className="container">
          <p>© 2026 ShopSaathi — Hyperlocal Workforce Platform</p>
          <p style={{ marginTop: "6px" }}>Made with ❤️ for Indian small businesses</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;