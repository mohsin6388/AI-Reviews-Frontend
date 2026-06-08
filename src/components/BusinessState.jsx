import React, { useState } from "react";
import "./BusinessState.css";
import BusinessDetails from "./BusinessDetails";
import QrPage from "./QrPage";

const BusinessState = ({ user, businesses, bizLoading, setActiveTab }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showQR, setShowQR] = useState(false);


  // QR PAGE FIRST

  if (selectedBusiness && showQR) {
    return (
      <QrPage
        selectedBusiness={selectedBusiness}
        setSelectedBusiness={setSelectedBusiness}
        // setShowQR={setShowQR}
      />
    );
  }

  // =========================
  // FULL BUSINESS DETAIL VIEW
  // =========================
  if (selectedBusiness && !showQR) {
    return (
      <BusinessDetails
        business={selectedBusiness}
        setSelectedBusiness={setSelectedBusiness}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (

    <div className="business-page">
      {/* TOP STATS */}
      <div className="business-stats-grid">
        <div className="business-stat-card">
          <div>
            <p>Total Businesses</p>
            <h2>{businesses.length}</h2>
          </div>

          <span>🏢</span>
        </div>

        <div className="business-stat-card">
          <div>
            <p>QR Generated</p>
            <h2>{businesses.length}</h2>
          </div>

          <span>📲</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="business-header">
        <div>
          <h2>Businesses</h2>

          <p>Manage all your registered businesses</p>
        </div>
      </div>

      {/* BUSINESS LIST */}
      <div className="business-list-wrapper">
        {bizLoading ? (
          <div className="business-empty-card">Loading businesses...</div>
        ) : businesses.length === 0 ? (
          <div className="business-empty-card">
            <div className="empty-icon">🏪</div>

            <h3>No Businesses Yet</h3>

            <p>Add your first business and generate review QR codes.</p>

            <button
              className="add-business-btn"
              onClick={() => setActiveTab("create")}
            >
              Add Business
            </button>
          </div>
        ) : (
          <div className="business-grid">
            {businesses.map((biz) => (
              <div key={biz.id} className="business-card">
                <div className="business-card-top">
                  <div className="business-avatar">
                    {biz.name?.[0]?.toUpperCase()}
                  </div>

                  <div>
                    <h3>{biz.name}</h3>

                    <p>{biz.type}</p>
                  </div>
                </div>

                <div className="business-meta">
                  <div className="meta-row">
                    <span>Generated Reviews</span>

                    <strong style={{ color: "black" }}>{biz.total_reviews_generated}</strong>
                  </div>

                  <div className="meta-row">
                    <span>Status</span>

                    <strong className="active-status">Active</strong>
                  </div>
                </div>

                <div className="business-actions">
                  <button
                    className="view-btn"
                    onClick={() => {
                      setSelectedBusiness(biz);
                      setShowQR(false);
                    }}
                  >
                    View
                  </button>

                  {/* <button
                    className="qr-btn"
                    onClick={() => {
                      console.log("qr clicked...");
                      // setSelectedBusiness(biz);
                      // setShowQR(true);
                    }}
                  >
                    QR
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};;

export default BusinessState;
