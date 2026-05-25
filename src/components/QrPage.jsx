import React from 'react'
import './QrPage.css'

const QrPage = ({ selectedBusiness, setSelectedBusiness }) => {

  console.log(selectedBusiness)

  return (
    <div className="qr-container">
      <button
        className="back-btn"
        onClick={() => {
          setSelectedBusiness(null);
          // setShowQR(false);
        }}
      >
        ← Back
      </button>

      <div className="qr-top">
        <div>
          <h2>{selectedBusiness.name}</h2>

          <p>{selectedBusiness.type}</p>
        </div>

        <div className="qr-review-count">
          <span>Reviews</span>

          <h1>{selectedBusiness.total_reviews_generated}</h1>
        </div>
      </div>

      <div className="qr-card">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            selectedBusiness.google_review_url,
          )}`}
          alt="QR Code"
        />

        <h3>Scan & Leave a Review</h3>

        <p>
          Customers can scan this QR code to directly open the Google Review
          page.
        </p>

        <a
          href={selectedBusiness.google_review_url}
          target="_blank"
          rel="noreferrer"
        >
          Open Review Link
        </a>
      </div>
    </div>
  );
};

export default QrPage

