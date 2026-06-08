import React, { useState, useEffect } from "react";
import "./BusinessDetails.css";
import {API} from '../utils/api'
import api from "../api";

const BusinessDetails = ({ business, setSelectedBusiness, setActiveTab }) => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("rb_token");
        const res = await fetch(`${API}/review/${business.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setReviews(data.reviews || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [business.id])

   const handleCopyLink = async () => {
     try {
       await navigator.clipboard.writeText(business.user_review_url);

       setCopied(true);

       setTimeout(() => {
         setCopied(false);
       }, 2000);
     } catch (error) {
       console.error("Copy failed:", error);
     }
   };

  
  const handleDelete = async () => {
  try {
    setLoading(true);

    const { data } = await api.delete(
      `/business/${business.id}`
    );

    if (data.success) {
      setPopUp(false);
      setSelectedBusiness(null);
      setActiveTab("create");
    }
  } catch (error) {
    console.log("Delete Error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="business-details-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="back-btn"
            onClick={() => setSelectedBusiness(null)}
          >
            ← Back
          </button>

          <button className="back-btn" onClick={() => setPopUp(true)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>{" "}
              <div>Delete</div>
            </div>
          </button>
        </div>

        <div className="business-details-card">
          {/* TOP SECTION */}
          <div className="business-top">
            <div className="business-info">
              <h2>{business.name}</h2>
              <p>{business.type}</p>
            </div>
            <div className="review-box">
              <span>Total Reviews</span>
              <h1>{business.total_reviews_generated}</h1>
            </div>
          </div>

          {/* DETAILS + QR ROW */}
          <div className="details-qr-row">
            {/* LEFT - DETAILS */}
            <div className="details-grid">
              <div className="detail-item">
                <span>Business Type</span>
                <strong>{business.type}</strong>
              </div>
              <div className="detail-item">
                <span>Owner Email</span>
                <strong>{business.owner_email}</strong>
              </div>
              <div className="detail-item">
                <span>Google Place ID</span>
                <strong>
                  <code>{business.google_place_id}</code>
                </strong>
              </div>
              <div className="detail-item">
                <span>Created At</span>
                <strong>
                  {new Date(business.created_at).toLocaleString()}
                </strong>
              </div>
            </div>



            {/* RIGHT - QR */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "500px" }}>
              <div className="qr-card">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(business.user_review_url)}`}
                  alt="QR Code"
                />
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(business.user_review_url)}&format=png&download=1`}
                  download="qr-code.png"
                  className="download-btn"
                >
                  ⬇ Download QR
                </a>
              </div>

              <div className="review-link-box">
                   <span style={{ color: "black" }}>
                     {business.user_review_url}
                   </span>

                   <button onClick={handleCopyLink}>
                     {copied ? "Copied!" : "Copy"}
                   </button>
              </div>

            </div>
          </div>

          {/* REVIEW LINK */}
          <a
            className="review-link"
            href={business.google_review_url}
            target="_blank"
            rel="noreferrer"
          >
            Open Google Review Page
          </a>
        </div>

        {/* Customer Review List */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews found</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-top">
                    <div className="review-user">
                      <h4>{review.customer_name}</h4>
                      <span className="rating-text">
                        Rating: {review.star_rating}
                      </span>
                    </div>
                    <div className="stars">
                      {"⭐".repeat(review.star_rating)}
                    </div>
                  </div>
                  <p>{review.review_text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {popUp && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "400px",
              background: "#fff",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                marginBottom: "12px",
                color: "#111",
              }}
            >
              Delete Business
            </h2>

            <p
              style={{
                color: "#666",
                marginBottom: "25px",
                fontSize: "15px",
              }}
            >
              Are you sure you want to delete this business?
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setPopUp(false)}
                style={{
                  flex: 1,
                  height: "45px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#e5e7eb",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                No
              </button>

              <button
                onClick={() => {
                  handleDelete();
                }}
                style={{
                  flex: 1,
                  height: "45px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#dc2626",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessDetails;
