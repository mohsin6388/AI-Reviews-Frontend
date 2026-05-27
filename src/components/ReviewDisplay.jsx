// import React, { useState } from 'react';
// import './ReviewDisplay.css';

// const ReviewDisplay = ({ review, sessionId, googleUrl, onTrackCopied, onTrackRedirected }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopyAndGo = async () => {
//     try {
//       await navigator.clipboard.writeText(review);
//       setCopied(true);

//       // Track analytics
//       if (sessionId) {
//         onTrackCopied?.(sessionId);
//         setTimeout(() => onTrackRedirected?.(sessionId), 500);
//       }

//       // Open Google review page
//       setTimeout(() => {
//         window.open(googleUrl, '_blank');
//       }, 300);

//       setTimeout(() => setCopied(false), 3000);
//     } catch (err) {
//       // Fallback for older browsers
//       const textarea = document.createElement('textarea');
//       textarea.value = review;
//       document.body.appendChild(textarea);
//       textarea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textarea);
//       setCopied(true);
//       setTimeout(() => {
//         window.open(googleUrl, '_blank');
//       }, 300);
//       setTimeout(() => setCopied(false), 3000);
//     }
//   };

//   return (
//     <div className="review-display animate-fadeUp">
//       <div className="review-header">
//         <div className="review-icon">✨</div>
//         <div>
//           <h3 className="review-title">Your Review is Ready!</h3>
//           <p className="review-subtitle">AI ne aapke liye yeh banaya</p>
//         </div>
//       </div>

//       <div className="review-text-box">
//         <div className="quote-mark">"</div>
//         <p className="review-text">{review}</p>
//       </div>

//       <div className="review-steps">
//         <div className="step-item">
//           <span className="step-num">1</span>
//           <span className="step-text">Button dabao — text copy ho jayega</span>
//         </div>
//         <div className="step-item">
//           <span className="step-num">2</span>
//           <span className="step-text">Google Reviews page khulega</span>
//         </div>
//         <div className="step-item">
//           <span className="step-num">3</span>
//           <span className="step-text">Wahan paste karke Post karo</span>
//         </div>
//       </div>

//       <button
//         className={`copy-btn ${copied ? "copied" : ""}`}
//         onClick={handleCopyAndGo}
//       >
//         {copied ? (
//           <>
//             <span className="btn-icon">✅</span>
//             Copied! Google Reviews khul raha hai...
//           </>
//         ) : (
//           <span style={{ fontFamily: "Poppins, sans-serif" }}>
//             <span className="btn-icon">Copy & Post on Google ⭐</span>
//           </span>
//         )}
//       </button>

//       <p className="disclaimer">
//         🔒 Aapka review Google par directly post hoga. Hum kuch save nahi karte.
//       </p>
//     </div>
//   );
// };

// export default ReviewDisplay;

import React, { useState } from "react";
import "./ReviewDisplay.css";

const ReviewDisplay = ({
  reviews,
  sessionId,
  googleUrl,
  onTrackCopied,
  onTrackRedirected,
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyAndGo = async (reviewText, index) => {
    try {
      await navigator.clipboard.writeText(reviewText);

      setCopiedIndex(index);

      // Track analytics
      if (sessionId) {
        onTrackCopied?.(sessionId);

        setTimeout(() => {
          onTrackRedirected?.(sessionId);
        }, 500);
      }

      // Open Google Review Page
      setTimeout(() => {
        window.open(googleUrl, "_blank");
      }, 300);

      // Reset copied state
      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    } catch (err) {
      // Fallback copy
      const textarea = document.createElement("textarea");

      textarea.value = reviewText;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);

      setCopiedIndex(index);

      setTimeout(() => {
        window.open(googleUrl, "_blank");
      }, 300);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    }
  };

  return (
    <div className="review-display animate-fadeUp">
      {/* HEADER */}
      <div className="review-header">
        <div className="review-icon">✨</div>

        <div>
          <h3 className="review-title">Your Reviews are Ready!</h3>

          <p className="review-subtitle">
            AI ne aapke liye multiple reviews banaye
          </p>
        </div>
      </div>

      {/* REVIEW SLIDER */}
      <div className="reviews-slider">
        {reviews?.map((item, index) => (
          <div className="review-card" key={index}>
            <div className="review-text-box">
              <div className="quote-mark">"</div>

              <p className="review-text">{item.review}</p>
            </div>

            <button
              className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
              onClick={() => handleCopyAndGo(item.review, index)}
            >
              {copiedIndex === index ? (
                <>
                  <span className="btn-icon">✅</span>
                  Copied! Opening Google...
                </>
              ) : (
                <>
                  <span className="btn-icon">⭐</span>
                  Copy & Post on Google
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* STEPS */}
      <div className="review-steps">
        <div className="step-item">
          <span className="step-num">1</span>

          <span className="step-text">Kisi bhi review ko copy karo</span>
        </div>

        <div className="step-item">
          <span className="step-num">2</span>

          <span className="step-text">Google Reviews page khulega</span>
        </div>

        <div className="step-item">
          <span className="step-num">3</span>

          <span className="step-text">Paste karke review post kar do</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <p className="disclaimer">
        🔒 Aapka review directly Google par post hoga. Hum kuch save nahi karte.
      </p>
    </div>
  );
};

export default ReviewDisplay;