import React, { useState } from 'react';
import api from '../api';
import './RegisterPage.css';

const BUSINESS_TYPES = [
  { value: 'restaurant', label: '🍽️ Restaurant / Dhaba' },
  { value: 'shop', label: '🛍️ Shop / Store' },
  { value: 'salon', label: '✂️ Salon / Parlour' },
  { value: 'hotel', label: '🏨 Hotel / Lodge' },
  { value: 'default', label: '🏢 Other Business' },
];

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    google_place_id: '',
    owner_email: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async () => {
  //   if (!form.name || !form.type || !form.google_place_id) {
  //     setError('Sab required fields fill karein');
  //     return;
  //   }
  //   setError('');
  //   setLoading(true);
  //   try {
  //     const res = await api.post('/business', form);
  //     setResult(res.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
  // validation
  if (!form.name || !form.type || !form.google_place_id) {
    setError('Sab required fields fill karein');
    return;
  }

  setError('');
  setLoading(true);

  try {
    // payload
    const payload = {
      name: form.name,
      type: form.type,
      google_place_id: form.google_place_id,
      owner_email: form.owner_email || null,
    };

    // API CALL
    const response = await api.post('/business', payload);

    // response set
    if (response?.data) {
      setResult(response.data);
      console.log('Business registered successfully:', response.data);
    }

  } catch (err) {
    console.error('Business register error:', err);

    setError(
      err?.response?.data?.message ||
      err?.message ||
      'Kuch galat ho gaya'
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

  return (
    <div className="page-wrapper">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {!result ? (
        <div className="content-card animate-fadeUp" style={{ marginTop: 24 }}>
          {/* Header */}
          <div className="reg-header">
            <div className="reg-rocket">🚀</div>
            <h1 className="reg-title">Review Booster</h1>
            <p className="reg-subtitle">Apna business register karein aur QR code paayein</p>
          </div>

          <div className="divider" style={{ margin: '20px 0' }} />

          <div className="form-group">
            <label className="form-label">Business Name *</label>
            <input
              className="form-input"
              name="name"
              placeholder="e.g., Sharma Ji Ka Dhaba"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Business Type *</label>
            <select
              className="form-input form-select"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Select karo...</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Google Place ID *
              <a
                href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                target="_blank"
                rel="noreferrer"
                className="help-link"
              >
                Kaise dhundhe? ↗
              </a>
            </label>
            <input
              className="form-input"
              name="google_place_id"
              placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
              value={form.google_place_id}
              onChange={handleChange}
            />
            <p className="form-hint">
              Google Maps pe apna business search karo → Share → Place ID copy karo
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Owner Email (optional)</label>
            <input
              className="form-input"
              name="owner_email"
              type="email"
              placeholder="you@example.com"
              value={form.owner_email}
              onChange={handleChange}
            />
          </div>

          {error && <p className="form-error">⚠️ {error}</p>}

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading ? (
              <><div className="spinner" /> Generating...</>
            ) : (
              '🚀 QR Code Generate Karo'
            )}
          </button>
        </div>
      ) : (
        <div className="content-card result-card animate-fadeUp" style={{ marginTop: 24 }}>
          <div className="result-header">
            <div className="result-check">✅</div>
            <h2 className="result-title">Business Register Ho Gaya!</h2>
            <p className="result-sub">{result.business.name}</p>
          </div>

          <div className="divider" style={{ margin: '16px 0' }} />

          {/* QR Code */}
          <div className="qr-section">
            <p className="qr-label">Yeh QR code apni shop par lagaayein</p>
            <img
              src={result.qrCode}
              alt="QR Code"
              className="qr-image"
            />
            <button className="btn-primary" onClick={handleDownloadQR}>
              📥 QR Code Download Karo
            </button>
          </div>

          <div className="divider" style={{ margin: '16px 0' }} />

          {/* Review link */}
          <div className="link-section">
            <p className="link-label">Direct review link:</p>
            <div className="link-box">
              <span className="link-text">{result.reviewPageUrl}</span>
              <button className="copy-link-btn" onClick={handleCopyLink}>
                Copy
              </button>
            </div>
          </div>

          <div className="business-id-note">
            <p>📋 Business ID (save karein):</p>
            <code>{result.business.id}</code>
          </div>

          <button
            className="btn-secondary"
            style={{ marginTop: '8px' }}
            onClick={() => { setResult(null); setForm({ name: '', type: '', google_place_id: '', owner_email: '' }); }}
          >
            + Naya Business Register Karo
          </button>
        </div>
      )}

      <div className="footer-brand">
        <span>Powered by</span>
        <span className="brand-name">🚀 Review Booster</span>
      </div>
    </div>
  );
};

export default RegisterPage;
