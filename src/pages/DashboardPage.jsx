//=============================================================================================================
//=============================================================================================================
//                                      NEW START
//=============================================================================================================
//=============================================================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';
import BusinessState from '../components/BusinessState';
import PaymentPage from '../components/PaymentPage';
import logo from "../assets/review-booster-logo2.png";
import Loading from '../components/Loading';
import { API } from '../utils/api';


const BUSINESS_TYPES = [
  { value: 'restaurant', label: '🍽️ Restaurant / Dhaba' },
  { value: 'shop', label: '🛍️ Shop / Store' },
  { value: 'salon', label: '✂️ Salon / Parlour' },
  { value: 'hotel', label: '🏨 Hotel / Lodge' },
  { value: 'default', label: '🏢 Other Business' },
];

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dashboard tabs: 'home' | 'create'
  const [activeTab, setActiveTab] = useState('home');

  // Businesses list
  const [businesses, setBusinesses] = useState([]);
  const [bizLoading, setBizLoading] = useState(true);

  // QR Create form
  const [form, setForm] = useState({
    name: '',
    type: '',
    google_place_id: '',
    owner_email: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch businesses on mount
  useEffect(() => {
    const fetchBiz = async () => {
      try {
        const token = localStorage.getItem("rb_token");

        const res = await api.get(`/business/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        });
        setBusinesses(res.data.businesses || []);
      } catch {
        // silently fail — user may have no businesses yet
      } finally {
        setBizLoading(false);
      }
    };
    if(activeTab === "home"){
      fetchBiz();
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.google_place_id) {
      setError('Sab required fields fill karein');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        type: form.type,
        google_place_id: form.google_place_id,
        owner_email: form.owner_email || null,
        user_id: user.id
      };
      const token = localStorage.getItem("rb_token");
      
      const res = await api.post("/business", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data) {
        setResult(res.data);
        // refresh businesses list
        setBusinesses((prev) => [...prev, res.data.business]);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || 'Kuch galat ho gaya'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(result.reviewPageUrl);
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = result.qrCode;
    link.download = `${result.business.name}-QR-Code.png`;
    link.click();
  };

  const handleCreateAnother = () => {
    setResult(null);
    setForm({ name: '', type: '', google_place_id: '', owner_email: '' });
  };

  // Greeting based on time
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dash-page-wrapper">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ── Top Navbar ── */}
      <header className="dash-navbar">
        <div className="dash-brand">
          <span className="dash-brand-icon">
            {" "}
            <img src={logo} alt="" style={{ height: "60px", width: "60px" }} />
          </span>
          <span
            className="dash-brand-name"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "20px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #073057 0%, #378ADD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.3px",
            }}
          >
            Review Booster
          </span>
        </div>
        <div className="dash-nav-right">
          <div className="dash-user-pill">
            <span className="dash-user-avatar">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </span>
            <span className="dash-user-name">{user?.name || "User"}</span>
          </div>
          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* <div className="sidebar-logo">
            {" "}
            <img src="" alt="" />
            Review Booster
          </div> */}

          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("home");
                setResult(null);
              }}
            >
              🏢 Businesses
            </button>

            <button
              className={`sidebar-item ${activeTab === "create" ? "active" : ""}`}
              onClick={() => setActiveTab("create")}
            >
              ➕ New Business
            </button>

            <button
              className={`sidebar-item ${activeTab === "payments" ? "active" : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              💳 Payment Method
            </button>

            <button
              className={`sidebar-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              ⚙️ Settings
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dash-main">
          {activeTab === "home" && (
            <BusinessState
              user={user}
              businesses={businesses}
              bizLoading={bizLoading}
              setActiveTab={setActiveTab}
            />
          )}

          {/* ── CREATE TAB ── */}
          {activeTab === "create" && (
            <div className="create-business-layout animate-fadeIn">
              {/* LEFT SIDE */}
              <div className="create-form-card">
                <div className="create-header">
                  <div className="create-badge">New Business</div>

                  {/* REMOVE KIYA "Create Review QR" */}

                  <p className="create-subtitle">
                    Add your business details and generate a smart QR code for
                    collecting customer reviews.
                  </p>
                </div>

                <div className="form-grid">
                  {/* Business Name */}
                  <div className="form-group">
                    <label>Business Name</label>

                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Sharma Ji Cafe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Business Type */}
                  <div className="form-group">
                    <label>Business Type</label>

                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                    >
                      <option value="">Select Business Type</option>

                      {BUSINESS_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Google Place ID */}
                  <div className="form-group full-width">
                    <label>Google Place ID</label>

                    <input
                      type="text"
                      name="google_place_id"
                      placeholder="Enter Google Place ID"
                      value={form.google_place_id}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group full-width">
                    <label>Owner Email</label>

                    <input
                      type="email"
                      name="owner_email"
                      placeholder="you@example.com"
                      value={form.owner_email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {error && <div className="error-box">⚠️ {error}</div>}

                <button
                  className="generate-btn"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <div>
                      <Loading size={20} />
                    </div>
                  ) : (
                    "Generate QR Code"
                  )}
                </button>
              </div>

              {/* RIGHT SIDE */}
              <div className="preview-card">
                {!result ? (
                  <>
                    <div className="preview-icon">📲</div>

                    <h3 style={{ color: "Black" }}>QR Preview</h3>

                    <p style={{ color: "gray" }}>
                      Your generated review QR code will appear here.
                    </p>

                    <div className="preview-placeholder">QR CODE</div>

                    <div className="preview-features">
                      <div className="feature-item" style={{ color: "green" }}>
                        ✅ Instant QR Generation
                      </div>

                      <div className="feature-item" style={{ color: "green" }}>
                        ✅ Google Review Redirect
                      </div>

                      <div className="feature-item" style={{ color: "green" }}>
                        ✅ Download PNG QR
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="qr-result-section">
                    <div className="success-badge">
                      ✅ QR Generated Successfully
                    </div>

                    <img
                      src={result.qrCode}
                      alt="QR Code"
                      className="generated-qr"
                    />

                    <button className="download-btn" onClick={handleDownloadQR}>
                      Download QR
                    </button>

                    <div className="review-link-box">
                      <span style={{ color: "black" }}>
                        {result.reviewPageUrl}
                      </span>

                      <button onClick={handleCopyLink}>Copy</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PAYMENT TAB */}
          {activeTab === "payments" && <PaymentPage user={user} />}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="content-card animate-fadeIn">
              <h2 className="reg-title">⚙️ Settings</h2>

              <div className="form-group">
                <label className="form-label">Profile Name</label>
                <input
                  className="form-input"
                  value={user?.name || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              <button className="btn-secondary">Update Profile</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;