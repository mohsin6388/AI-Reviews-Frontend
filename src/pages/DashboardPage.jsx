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
// import { API } from '../utils/api';
import ContactUs from '../components/ContactUs';
import TermsAndCondition from '../components/TermsAndCondition';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Guide from '../components/Guide';
import MySubscriptions from "./MySubscriptions";


const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dashboard tabs: 'home' | 'create'
  const [activeTab, setActiveTab] = useState('home');

  // Businesses list
  const [businesses, setBusinesses] = useState([]);
  const [bizLoading, setBizLoading] = useState(true);
  const [outLoading, setOutLoading] = useState(false);
  const [showPlaceIdHelp, setShowPlaceIdHelp] = useState(false);
  

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

  const [businessTypes, setBusinessTypes] = useState([]);
  const [copied, setCopied] = useState(false);


  const getBusinessTypes = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/business/type/business-type");

      if (data.success) {
        setBusinessTypes(data.data);
      }
    } catch (error) {
      console.log("Business Types Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if(activeTab === 'create'){
      getBusinessTypes();
    }
  }, [activeTab]);



  useEffect(() => {
    const fetchBiz = async () => {
      setLoading(true);

      try {
        const res = await api.get(`/business/${user.id}`, {
          withCredentials: true,
        });

        setBusinesses(res.data.businesses || []);
        console.log("Fetched Businesses:", res.data.businesses);
      } catch (error) {
        console.log("Business Fetch Error:", error);
      } finally {
        setLoading(false);
        setBizLoading(false);
      }
    };

    if (activeTab === "home" && user?.id) {
      fetchBiz();
    }
  }, [activeTab, user]);






  const handleLogout = async () => {
    setOutLoading(true);
  try {
    await api.post("/auth/logout");

    logout();

    navigate("/login");
  } catch (error) {
    console.error(
      "Logout Error:",
      error
    );
  } finally {
    setOutLoading(false);
  }
};

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.google_place_id) {
      setError("Sab required fields fill karein");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        type: form.type,
        google_place_id: form.google_place_id,
        owner_email: form.owner_email || null,
        user_id: user.id,
      };

      const res = await api.post("/business", payload);

      if (res.data?.success) {
        setResult(res.data);

        setBusinesses((prev) => [...prev, res.data.business]);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Kuch galat ho gaya",
      );
    } finally {
      setLoading(false);
    }
  };


   const handleCopyLink = async () => {
     try {
       await navigator.clipboard.writeText(result.reviewPageUrl);

       setCopied(true);

       setTimeout(() => {
         setCopied(false);
       }, 2000);
     } catch (error) {
       console.error("Copy failed:", error);
     }
   };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = result.qrCode;
    link.download = `${result.business.name}-QR-Code.png`;
    link.click();
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
            Review Ninja Pro
          </span>
        </div>
        <div className="dash-nav-right">
          <div className="dash-user-pill">
            <span className="dash-user-avatar">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </span>
            <span className="dash-user-name">{user?.name || "User"}</span>
          </div>
          <button
            className="dash-logout-btn"
            onClick={handleLogout}
            disabled={loading}
          >
          
            {outLoading ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid white",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Logging out...
              </span>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("home");
                setResult(null);
              }}
            >
              Businesses
            </button>

            <button
              className={`sidebar-item ${activeTab === "create" ? "active" : ""}`}
              onClick={() => setActiveTab("create")}
            >
              New Business
            </button>

            <button
              className={`sidebar-item ${activeTab === "payments" ? "active" : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              Plans & Billing
            </button>

            <button
              className={`sidebar-item ${activeTab === "subscription" ? "active" : ""}`}
              onClick={() => setActiveTab("subscription")}
            >
              My Subscriptions
            </button>

            <button
              className={`sidebar-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Contact Us
            </button>

            <button
              className={`sidebar-item ${activeTab === "termsConditions" ? "active" : ""}`}
              onClick={() => setActiveTab("termsConditions")}
            >
              Terms & Condition
            </button>

            <button
              className={`sidebar-item ${activeTab === "privacyPolicy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacyPolicy")}
            >
              Privacy Policy
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dash-main">
          {activeTab === "home" &&
            (loading ? (
              <div
                style={{
                  minHeight: "100vh",
                  background:
                    "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      border: "3px solid #e4e8f0",
                      borderTopColor: "#3d5af1",
                      borderRadius: "50%",
                      animation: "spin .7s linear infinite",
                      margin: "0 auto 12px",
                    }}
                  />
                  <p style={{ color: "#6b7280", fontSize: 14 }}>
                    Loading your businesses...
                  </p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              </div>
            ) : (
              <BusinessState
                user={user}
                businesses={businesses}
                bizLoading={bizLoading}
                setActiveTab={setActiveTab}
              />
            ))}

          {activeTab === "create" && (
            <>
              {!showPlaceIdHelp ? (
                <div className="create-business-layout animate-fadeIn">
                  {/* LEFT SIDE */}
                  <div className="create-form-card">
                    <div className="create-header">
                      <div className="create-badge">New Business</div>

                      {/* REMOVE KIYA "Create Review QR" */}

                      <p className="create-subtitle">
                        Add your business details and generate a smart QR code
                        for collecting customer reviews.
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

                          {businessTypes.map((t) => (
                            <option key={t.id} value={t.business_type}>
                              {t.business_type}
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

                        <div
                          onClick={() => setShowPlaceIdHelp(true)}
                          style={{
                            color: "#2563eb",
                            textDecoration: "underline",
                            fontSize: "14px",
                            fontWeight: "500",
                            paddingLeft: "5px",
                            cursor: "pointer",
                          }}
                        >
                          How to find your Google Business Place ID
                        </div>
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
                          <div
                            className="feature-item"
                            style={{ color: "green" }}
                          >
                            ✅ Instant QR Generation
                          </div>

                          <div
                            className="feature-item"
                            style={{ color: "green" }}
                          >
                            ✅ Google Review Redirect
                          </div>

                          <div
                            className="feature-item"
                            style={{ color: "green" }}
                          >
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

                        <button
                          className="download-btn"
                          onClick={handleDownloadQR}
                        >
                          Download QR
                        </button>

                        <div className="review-link-box">
                          <span style={{ color: "black" }}>
                            {result.reviewPageUrl}
                          </span>

                          <button onClick={handleCopyLink}>
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="create-form-card">
                  <Guide onBack={() => setShowPlaceIdHelp(false)} />
                </div>
              )}
            </>
          )}

          {/* PAYMENT TAB */}
          {activeTab === "payments" && <PaymentPage user={user} />}

          {activeTab === "subscription" && <MySubscriptions user={user} />}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && <ContactUs />}

          {/* SETTINGS TAB */}
          {activeTab === "termsConditions" && <TermsAndCondition />}

          {/* SETTINGS TAB */}
          {activeTab === "privacyPolicy" && <PrivacyPolicy />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;