// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api';
// import { useAuth } from '../context/AuthContext';
// import './AuthPage.css';

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.email || !form.password) {
//       setError('Sab required fields fill karein');
//       return;
//     }
//     if (form.password !== form.confirm_password) {
//       setError('Passwords match nahi kar rahe');
//       return;
//     }
//     if (form.password.length < 6) {
//       setError('Password kam se kam 6 characters ka hona chahiye');
//       return;
//     }

//     setError('');
//     setLoading(true);
//     try {
//       const res = await api.post('/auth/signup', {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//       });
//       // Expected response: { user: {...}, token: "..." }
//       login(res.data.user, res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="orb orb-1" />
//       <div className="orb orb-2" />

//       <div className="content-card animate-fadeUp auth-card" style={{ marginTop: 24 }}>
//         {/* Logo / Brand */}
//         <div className="auth-header">
//           <div className="auth-logo">🚀</div>
//           <h1 className="auth-title">Review Booster</h1>
//           <p className="auth-subtitle">Naya account banayein — free mein!</p>
//         </div>

//         <div className="divider" style={{ margin: '20px 0' }} />

//         <div className="form-group">
//           <label className="form-label">Full Name *</label>
//           <div className="input-with-icon">
//             <span className="input-icon">👤</span>
//             <input
//               className="form-input input-padded"
//               name="name"
//               placeholder="Rahul Sharma"
//               value={form.name}
//               onChange={handleChange}
//               autoComplete="name"
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Email Address *</label>
//           <div className="input-with-icon">
//             <span className="input-icon">✉️</span>
//             <input
//               className="form-input input-padded"
//               name="email"
//               type="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={handleChange}
//               autoComplete="email"
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Password *</label>
//           <div className="input-with-icon">
//             <span className="input-icon">🔒</span>
//             <input
//               className="form-input input-padded"
//               name="password"
//               type="password"
//               placeholder="Min. 6 characters"
//               value={form.password}
//               onChange={handleChange}
//               autoComplete="new-password"
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Confirm Password *</label>
//           <div className="input-with-icon">
//             <span className="input-icon">🔒</span>
//             <input
//               className="form-input input-padded"
//               name="confirm_password"
//               type="password"
//               placeholder="Password dobara likhein"
//               value={form.confirm_password}
//               onChange={handleChange}
//               autoComplete="new-password"
//             />
//           </div>
//         </div>

//         {error && <p className="form-error">⚠️ {error}</p>}

//         <button
//           className="btn-primary"
//           onClick={handleSubmit}
//           disabled={loading}
//           style={{ marginTop: '8px' }}
//         >
//           {loading ? (
//             <><div className="spinner" /> Creating account...</>
//           ) : (
//             '🚀 Account Banayein'
//           )}
//         </button>

//         <div className="auth-footer">
//           <span>Pehle se account hai?</span>
//           <Link to="/login" className="auth-link">Login karein →</Link>
//         </div>
//       </div>

//       <div className="footer-brand">
//         <span>Powered by</span>
//         <span className="brand-name">🚀 Review Booster</span>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/review-booster-logo2.png";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Sab required fields fill karein");
      return;
    }
    if (form.password !== form.confirm_password) {
      setError("Passwords match nahi kar rahe");
      return;
    }
    if (form.password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                        More
                        Customers.
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
        <div style={styles.card}>
          <p style={styles.portalLabel}>Create account</p>
          <h2 style={styles.heading}>Sign up for free</h2>

          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>Full name</label>
            <div style={styles.inputWrap}>
              <span style={styles.icon}>👤</span>
              <input
                style={styles.input}
                name="name"
                type="text"
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={handleChange}
              />
            </div>
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
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.field}>
            <label style={styles.label}>Confirm password</label>
            <div style={styles.inputWrap}>
              <span style={styles.icon}>🔒</span>
              <input
                style={styles.input}
                name="confirm_password"
                type="password"
                placeholder="Re-enter password"
                value={form.confirm_password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
            {loading ? "⏳ Creating account..." : "🚀 Create Account"}
          </button>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.footerLink}>
              Sign in →
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  shell: {
    minHeight: "100vh",
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
  brandName: { fontSize: 17, color: "#fff", fontWeight: 600 },
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
  taglineH: {
    fontSize: 20,
    color: "#E6F1FB",
    fontWeight: 700,
    margin: "0 0 8px",
  },
  taglineB: { fontSize: 13, color: "#85B7EB", lineHeight: 1.7, margin: 0 },
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 48px",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    background: "#fff",
    border: "1px solid #B5D4F4",
    borderRadius: 12,
    padding: "36px 36px",
    boxShadow: "0 4px 24px rgba(14, 68, 124, 0.08)",
  },
  portalLabel: {
    fontSize: 11,
    color: "#378ADD",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    margin: "0 0 6px",
    fontWeight: 500,
  },
  heading: {
    fontSize: 22,
    color: "#042C53",
    fontWeight: 700,
    margin: "0 0 28px",
  },
  field: { marginBottom: 14 },
  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#185FA5",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  inputWrap: { position: "relative" },
  icon: {
    position: "absolute",
    left: 11,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 15,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    height: 42,
    padding: "0 12px 0 36px",
    border: "1px solid #B5D4F4",
    borderRadius: 6,
    fontSize: 14,
    color: "#042C53",
    background: "#F0F5FB",
    outline: "none",
  },
  errorBox: {
    background: "#FCEBEB",
    border: "1px solid #F7C1C1",
    borderRadius: 6,
    padding: "9px 13px",
    fontSize: 13,
    color: "#791F1F",
    marginBottom: 14,
  },
  btn: {
    width: "100%",
    height: 44,
    background: "#073057",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 6,
  },
  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#888780",
    marginTop: 16,
  },
  footerLink: { color: "#185FA5", fontWeight: 600, textDecoration: "none" },
};

export default SignupPage;