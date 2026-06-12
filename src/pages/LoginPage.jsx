import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/review-booster-logo2.png";
import Loading from "../components/Loading";
import './Login.css'



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
    <div className="shell">
      {/* Left Panel */}
      <div className="left">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "200px",
              paddingTop: 20,
              paddingLeft: 40,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{ width: "200px", height: "auto", display: "block" }}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <p className="tagline-heading">
              More Reviews.
              <br />
              <span className="highlight-text">More Trust.</span>
              <br />
              More Customers.
            </p>

            <p className="tagline-body">
              Review Booster helps businesses collect powerful customer
              feedback, improve online reputation, and convert visitors into
              loyal customers.
            </p>
          </div>
        </div>

        <div className="quick-access">
          <p className="quick-label">Quick access</p>

          {["Dashboard", "Review Center", "Analytics"].map((item) => (
            <p key={item} className="quick-item">
              → {item}
            </p>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right">
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div className="form-card">
            <div style={{ marginBottom: 32 }}>
              <p className="portal-label">Secure portal</p>
              <h2 className="heading">Sign in to your account</h2>
            </div>

            {/* Email */}
            <div className="field">
              <label className="label">Email address</label>

              <div className="input-wrap">
                <span className="icon">✉️</span>

                <input
                  className="input"
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
            <div className="field">
              <label className="label">Password</label>

              <div className="input-wrap">
                <span className="icon">🔒</span>

                <input
                  className="input"
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
              style={{
                textAlign: "right",
                marginTop: -10,
                marginBottom: 24,
              }}
            >
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}

            <button
              className="btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? <Loading size={20} /> : "🔑 Sign in"}
            </button>

            <p className="footer-text">
              Don't have an account?{" "}
              <Link to="/signup" className="footer-link">
                Create one →
              </Link>
            </p>

            <div className="trust-row">
              {[
                "🔒 SSL encrypted",
                "🏦 Enterprise grade",
                "⏰ 99.9% uptime",
              ].map((t) => (
                <span key={t} className="trust-item">
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


export default LoginPage;
