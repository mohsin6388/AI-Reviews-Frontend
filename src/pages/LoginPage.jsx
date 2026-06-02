import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/review-booster-logo2.png";
import Loading from "../components/Loading";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Email aur password dono fill karein");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      },
      {
       withCredentials: true,
      }
    );

    login(res.data.user);
    navigate("/dashboard");
    
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={styles.shell}>
      {/* Left Panel */}
      <div style={styles.left}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              paddingTop: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "200px",
                width: "200px",
                objectFit: "contain",
              }}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <p style={styles.taglineHeading}>
              More Reviews.
              <br />
              <span style={styles.highlightText}>More Trust.</span>
              <br />
              More Customers.
            </p>

            <p style={styles.taglineBody}>
              Review Booster helps businesses collect powerful customer
              feedback, improve online reputation, and convert visitors into
              loyal customers.
            </p>
          </div>
        </div>

        <div>
          <p style={styles.quickLabel}>Quick access</p>
          {["Dashboard", "Review Center", "Analytics"].map((item) => (
            <p key={item} style={styles.quickItem}>
              → {item}
            </p>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          {" "}
          {/* wrap karo yahan */}
          <div style={styles.formCard}>
            {" "}
            {/* card wrapper */}
            <div style={{ marginBottom: 32 }}>
              <p style={styles.portalLabel}>Secure portal</p>
              <h2 style={styles.heading}>Sign in to your account</h2>
            </div>
            {/* Email */}
            <div style={styles.field}>
              <label style={styles.label}>Email address</label>
              <div style={styles.inputWrap}>
                <span style={styles.icon}>✉️</span>
                <input
                  style={styles.input}
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            {/* Password */}
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrap}>
                <span style={styles.icon}>🔒</span>
                <input
                  style={styles.input}
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div
              style={{ textAlign: "right", marginTop: -10, marginBottom: 24 }}
            >
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            {error && <div style={styles.errorBox}>⚠️ {error}</div>}
            <button
              style={{
                ...styles.btn,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loading size={20} /> : "🔑 Sign in"}
            </button>
            <p style={styles.footerText}>
              Don't have an account?{" "}
              <Link to="/signup" style={styles.footerLink}>
                Create one →
              </Link>
            </p>
            <div style={styles.trustRow}>
              {[
                "🔒 SSL encrypted",
                "🏦 Enterprise grade",
                "⏰ 99.9% uptime",
              ].map((t) => (
                <span key={t} style={styles.trustItem}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  shell: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    fontFamily: "'DM Sans', sans-serif",
    background: "#F0F5FB",
  },

  left: {
    width: 560,
    flexShrink: 0,
    background: "white",
    paddingTop: "0px",
    paddingLeft: "32px",
    paddingRight: "32px",
    paddingBottom: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  brandMark: { display: "flex", alignItems: "center", gap: 10 },
  brandIcon: {
    width: 36,
    height: 36,
    background: "#378ADD",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  brandName: {
    fontSize: 17,
    color: "#fff",
    fontWeight: 600,
    letterSpacing: 0.3,
  },

  taglineHeading: {
    fontSize: "45px",
    fontWeight: "900",
    lineHeight: "1.05",
    letterSpacing: "-2.5px",
    margin: "0 0 22px",
    maxWidth: "720px",
    color: "#073057",
    textShadow: `
  0px 1px 2px rgba(0,0,0,0.06),
  0px 4px 10px rgba(7, 48, 87, 0.12)
`,

    fontFamily: "'Poppins', sans-serif",

    /* Smooth rendering */
    WebkitFontSmoothing: "antialiased",
  },

  highlightText: {
    color: "#FF741C",
    position: "relative",
  },

  taglineBody: {
    fontSize: "18px",
    color: "rgba(7, 48, 87, 0.75)",
    maxWidth: "620px",
    fontWeight: "400",
    letterSpacing: "0.3px",
    fontFamily: "'Inter', sans-serif",
  },
  // taglineBody: { fontSize: 13, color: "#85B7EB", lineHeight: 1.7, margin: 0 },

  quickLabel: {
    fontSize: 11,
    color: "#378ADD",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    margin: "0 0 8px",
  },
  quickItem: { fontSize: 13, color: "#85B7EB", margin: "4px 0" },

  right: {
    flex: 1,
    background: "#F0F5FB",
    padding: "64px 56px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // add this
  },

  formCard: {
    width: "100%",
    maxWidth: 490,
    background: "#fff",
    border: "1px solid #B5D4F4",
    borderRadius: 12,
    padding: "40px 40px",
    boxShadow: "0 4px 24px rgba(14, 68, 124, 0.08)",
  },

  portalLabel: {
    fontSize: 12,
    color: "#white",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    margin: "0 0 6px",
    fontWeight: 500,
  },
  heading: { fontSize: 26, color: "#042C53", fontWeight: 700, margin: 0 },
  field: { marginBottom: 18 },
  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#185FA5",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputWrap: { position: "relative" },
  icon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 15,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    height: 44,
    padding: "0 14px 0 38px",
    border: "1px solid #B5D4F4",
    borderRadius: 6,
    fontSize: 14,
    color: "#042C53",
    background: "#F0F5FB",
    outline: "none",
  },
  forgotLink: { fontSize: 12, color: "#378ADD", textDecoration: "none" },
  errorBox: {
    background: "#FCEBEB",
    border: "1px solid #F7C1C1",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 13,
    color: "#791F1F",
    marginBottom: 16,
  },
  btn: {
    width: "100%",
    height: 46,
    background: "#185FA5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#888780",
    marginTop: 20,
  },
  footerLink: { color: "#185FA5", fontWeight: 600, textDecoration: "none" },
  trustRow: {
    display: "flex",
    gap: 16,
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid #E6F1FB",
  },
  trustItem: { fontSize: 11, color: "#85B7EB" },
};

export default LoginPage;
