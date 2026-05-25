import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import StarRating from '../components/StarRating';
import TagSelector from '../components/TagSelector';
import ReviewDisplay from '../components/ReviewDisplay';
import './ReviewPage.css';
import logo from "../assets/review-booster-logo2.png";

const STEP = {
  LOADING: 'loading',
  ERROR: 'error',
  RATE: 'rate',
  TAGS: 'tags',
  GENERATING: 'generating',
  REVIEW: 'review',
  NEGATIVE: 'negative',
  THANKYOU: 'thankyou',
};

const ReviewPage = () => {
  const { businessId } = useParams();
  const [step, setStep] = useState(STEP.LOADING);
  const [business, setBusiness] = useState(null);
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [generatedReview, setGeneratedReview] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [negativeFeedback, setNegativeFeedback] = useState('');

  // Load business data
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await api.get(`/business/review/${businessId}`);
        setBusiness(res.data.businesses[0]);
        setTags(res.data.tags);
        setStep(STEP.RATE);
      } catch (err) {
        setErrorMsg(err.message || 'Business not found');
        setStep(STEP.ERROR);
      }
    };
    fetchBusiness();
  }, [businessId]);

  const handleRate = (r) => {
    setRating(r);
    setTimeout(() => {
      if (r >= 3) {
        setStep(STEP.TAGS);
      } else {
        setStep(STEP.NEGATIVE);
      }
    }, 400);
  };

  const toggleTag = (label) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handleGenerateReview = async () => {
    if (selectedTags.length === 0) return;
    setStep(STEP.GENERATING);
    try {
      const res = await api.post('/review/generate', {
        business_id: businessId,
        rating,
        selected_tags: selectedTags,
      });
      setGeneratedReview(res.data.review);
      setSessionId(res.data.session_id);
      setStep(STEP.REVIEW);
    } catch (err) {
      setErrorMsg(err.message);
      setStep(STEP.ERROR);
    }
  };

  const handleTrackCopied = useCallback(async (sid) => {
    try { await api.post(`/review/session/${sid}/copied`); } catch {}
  }, []);

  const handleTrackRedirected = useCallback(async (sid) => {
    try { await api.post(`/review/session/${sid}/redirected`); } catch {}
  }, []);

  const handleNegativeSubmit = async () => {
    try {
      await api.post('/review/feedback', {
        business_id: businessId,
        rating,
        feedback_text: negativeFeedback,
      });
      setStep(STEP.THANKYOU);
    } catch {
      setStep(STEP.THANKYOU);
    }
  };

  const googleUrl = business?.google_review_url;

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {step === STEP.LOADING && (
        <div className="loader-screen">
          <div className="loader-rocket animate-float">🚀</div>
          <p className="loader-text">Loading...</p>
        </div>
      )}

      {step === STEP.ERROR && (
        <div className="content-card error-card animate-fadeUp">
          <div className="error-icon">😕</div>
          <h2 className="error-title">Kuch galat ho gaya</h2>
          <p className="error-msg">{errorMsg}</p>
          <button
            className="btn-secondary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {(step === STEP.RATE ||
        step === STEP.TAGS ||
        step === STEP.REVIEW ||
        step === STEP.NEGATIVE) &&
        business && (
          <div className="content-card animate-fadeUp">
            {/* Business Header */}
            <div className="biz-header">
              <div className="biz-avatar">
                {business.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="biz-name">{business.name}</h1>
                <p className="biz-type">{business.type}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* Step: Rate */}
            {step === STEP.RATE && (
              <div className="step-section animate-fadeIn">
                <h2 className="step-title">Aapka experience kaisa raha?</h2>
                <p className="step-subtitle">Apni honest rating dijiye</p>
                <StarRating onRate={handleRate} />
              </div>
            )}

            {/* Step: Tags */}
            {step === STEP.TAGS && (
              <div className="step-section">
                <div className="rating-badge">
                  {"⭐".repeat(rating)} <span>{rating}/5 Stars</span>
                </div>
                <TagSelector
                  tags={tags}
                  selectedTags={selectedTags}
                  onToggle={toggleTag}
                />
                <button
                  className="btn-primary"
                  onClick={handleGenerateReview}
                  disabled={selectedTags.length === 0}
                  style={{ marginTop: "8px" }}
                >
                  {selectedTags.length === 0
                    ? "Koi tag select karein"
                    : `✨ AI Review Generate Karo (${selectedTags.length} tags)`}
                </button>
                <button className="btn-back" onClick={() => setStep(STEP.RATE)}>
                  ← Rating change karein
                </button>
              </div>
            )}

            {/* Step: Review */}
            {step === STEP.REVIEW && (
              <ReviewDisplay
                review={generatedReview}
                sessionId={sessionId}
                googleUrl={googleUrl}
                onTrackCopied={handleTrackCopied}
                onTrackRedirected={handleTrackRedirected}
              />
            )}

            {/* Step: Negative feedback */}
            {step === STEP.NEGATIVE && (
              <div className="step-section animate-fadeIn">
                <div className="negative-icon">🙏</div>
                <h2 className="step-title">Hum maafi chahte hain</h2>
                <p className="step-subtitle">
                  Aapka feedback humein behtar banane mein madad karta hai. Kya
                  hua batayein? (optional)
                </p>
                <textarea
                  className="feedback-textarea"
                  placeholder="Aapka feedback yahan likhein..."
                  value={negativeFeedback}
                  onChange={(e) => setNegativeFeedback(e.target.value)}
                  rows={4}
                />
                <button className="btn-primary" onClick={handleNegativeSubmit}>
                  Feedback Bhejo
                </button>
                <button className="btn-back" onClick={() => setStep(STEP.RATE)}>
                  ← Back to rating
                </button>
              </div>
            )}
          </div>
        )}

      {/* Generating overlay */}
      {step === STEP.GENERATING && (
        <div className="content-card generating-card animate-fadeIn">
          <div className="generating-icon animate-float">🤖</div>
          <h2 className="generating-title">AI Review Likh Raha Hai...</h2>
          <p className="generating-sub">
            Ek bilkul natural review ban rahi hai aapke liye
          </p>
          <div className="generating-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {/* Thank you screen */}
      {step === STEP.THANKYOU && (
        <div className="content-card thankyou-card animate-fadeUp">
          <div className="thankyou-icon animate-float">💛</div>
          <h2 className="thankyou-title">Shukriya!</h2>
          <p className="thankyou-text">
            Aapka feedback humein apni service better banane mein bahut help
            karta hai. Hum jald hi improve karenge!
          </p>
          <p className="thankyou-sub">Aap yeh page band kar sakte hain.</p>
        </div>
      )}

      {/* Powered by footer */}
      <div className="footer-brand">
        <span>Powered by</span>
        <img src={logo} alt="" style={{ height: "30px", width: "30px" }} />
        <span className="brand-name">Review Booster</span>
      </div>
    </div>
  );
};

export default ReviewPage;
