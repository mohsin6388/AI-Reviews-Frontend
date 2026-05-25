import { useState, useEffect } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import { API } from "../utils/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .cp-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f6fb;
    font-family: 'Sora', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .cp-root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
    top: -150px;
    left: -150px;
    pointer-events: none;
  }

  .cp-root::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    pointer-events: none;
  }

  .cp-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .cp-card {
    position: relative;
    z-index: 10;
    background: #ffffff;
    border: 1px solid rgba(99, 102, 241, 0.1);
    border-radius: 24px;
    padding: 48px 44px;
    width: 100%;
    max-width: 440px;
    box-shadow:
      0 0 0 1px rgba(99, 102, 241, 0.06),
      0 24px 56px rgba(99, 102, 241, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.06);
    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .cp-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 100px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 600;
    color: #10b981;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .cp-badge-dot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .cp-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .cp-title span {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cp-subtitle {
    font-size: 13.5px;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 36px;
    font-weight: 400;
  }

  .cp-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cp-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cp-label {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .cp-input-wrap {
    position: relative;
  }

  .cp-input {
    width: 100%;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    padding: 14px 48px 14px 16px;
    font-size: 14px;
    font-family: 'JetBrains Mono', monospace;
    color: #111827;
    outline: none;
    transition: all 0.2s ease;
    letter-spacing: 0.03em;
  }

  .cp-input::placeholder {
    font-family: 'Sora', sans-serif;
    color: #9ca3af;
    letter-spacing: 0;
    font-size: 13px;
  }

  .cp-input:focus {
    border-color: #6366f1;
    background: #fafaff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  .cp-input.error {
    border-color: #ef4444;
    background: #fff5f5;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
  }

  .cp-input.success {
    border-color: #10b981;
    background: #f0fdf8;
  }

  .cp-eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    padding: 2px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .cp-eye-btn:hover {
    color: #4b5563;
  }

  .cp-strength-bar {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .cp-strength-track {
    display: flex;
    gap: 4px;
  }

  .cp-strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 100px;
    background: #e5e7eb;
    transition: background 0.3s ease;
  }

  .cp-strength-seg.active-weak   { background: #ef4444; }
  .cp-strength-seg.active-fair   { background: #f59e0b; }
  .cp-strength-seg.active-good   { background: #3b82f6; }
  .cp-strength-seg.active-strong { background: #10b981; }

  .cp-strength-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  .cp-strength-label.weak   { color: #ef4444; }
  .cp-strength-label.fair   { color: #f59e0b; }
  .cp-strength-label.good   { color: #3b82f6; }
  .cp-strength-label.strong { color: #10b981; }

  .cp-rules {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  }

  .cp-rule {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11.5px;
    color: #9ca3af;
    transition: color 0.25s;
  }

  .cp-rule.met {
    color: #10b981;
  }

  .cp-rule-icon {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 8px;
    transition: all 0.25s;
  }

  .cp-rule.met .cp-rule-icon {
    background: #10b981;
    border-color: #10b981;
    color: #fff;
  }

  .cp-match-hint {
    font-size: 12px;
    margin-top: 6px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .cp-match-hint.match { color: #10b981; }
  .cp-match-hint.no-match { color: #ef4444; }

  .cp-btn {
    margin-top: 8px;
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border: none;
    border-radius: 12px;
    font-family: 'Sora', sans-serif;
    font-size: 14.5px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
  }

  .cp-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .cp-btn:hover::before { opacity: 1; }

  .cp-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(99, 102, 241, 0.45);
  }

  .cp-btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  }

  .cp-btn:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .cp-btn-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .cp-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .cp-success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0;
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .cp-success-icon {
    width: 72px;
    height: 72px;
    background: rgba(16, 185, 129, 0.12);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 28px;
    animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }

  @keyframes popIn {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .cp-success-title {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
  }

  .cp-success-sub {
    font-size: 13.5px;
    color: #6b7280;
    line-height: 1.6;
  }

  .cp-error-msg {
    font-size: 12px;
    color: #ef4444;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthMap = {
  0: { label: "", cls: "" },
  1: { label: "Weak", cls: "weak" },
  2: { label: "Fair", cls: "fair" },
  3: { label: "Good", cls: "good" },
  4: { label: "Strong", cls: "strong" },
};

const segClass = {
  weak: "active-weak",
  fair: "active-fair",
  good: "active-good",
  strong: "active-strong",
};

export default function CreatePassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState({ new: false, confirm: false });

  const strength = getStrength(newPass);
  const { label: sLabel, cls: sCls } = strengthMap[strength] || {};

  const rules = [
    { text: "Min 8 characters", met: newPass.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(newPass) },
    { text: "One number", met: /[0-9]/.test(newPass) },
    { text: "One special character", met: /[^A-Za-z0-9]/.test(newPass) },
  ];

  const passwordsMatch = confirmPass.length > 0 && newPass === confirmPass;
  const passwordsMismatch = confirmPass.length > 0 && newPass !== confirmPass;
  const isValid = strength === 4 && passwordsMatch;

  const navigate = useNavigation()
  const location = useLocation();

  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

  const handleSubmit = async () => {
    setTouched({ new: true, confirm: true });

    if (!isValid) return;

    try {
      setLoading(true);

      const response = await fetch(`${API}/auth/create-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          resetToken,
          newPass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      } else {
        console.log(data);
        setDone(true);
        navigate('/login')
      }

      
    } catch (error) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show }) =>
    show ? (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  return (
    <>
      <style>{styles}</style>
      <div className="cp-root">
        <div className="cp-grid" />
        <div className="cp-card">
          {done ? (
            <div className="cp-success-state">
              <div className="cp-success-icon">✓</div>
              <div className="cp-success-title">Password Updated!</div>
              <div className="cp-success-sub">
                Your password has been reset successfully.
                <br />
                You can now log in with your new password.
              </div>
            </div>
          ) : (
            <>
              <div className="cp-badge">
                <span className="cp-badge-dot" />
                OTP Verified
              </div>
              <h1 className="cp-title">
                Create <span>new password</span>
              </h1>
              <p className="cp-subtitle">
                Choose a strong password to secure your account.
              </p>

              <div className="cp-form">
                {/* New Password */}
                <div className="cp-field">
                  <label className="cp-label">New Password</label>
                  <div className="cp-input-wrap">
                    <input
                      type={showNew ? "text" : "password"}
                      className={`cp-input ${touched.new && strength < 4 ? "error" : ""} ${strength === 4 ? "success" : ""}`}
                      placeholder="Enter new password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, new: true }))}
                    />
                    <button
                      className="cp-eye-btn"
                      onClick={() => setShowNew((v) => !v)}
                      type="button"
                      tabIndex={-1}
                    >
                      <EyeIcon show={showNew} />
                    </button>
                  </div>

                  {/* Strength bar */}
                  {newPass.length > 0 && (
                    <div className="cp-strength-bar">
                      <div className="cp-strength-track">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`cp-strength-seg ${strength >= i && sCls ? segClass[sCls] : ""}`}
                          />
                        ))}
                      </div>
                      {sLabel && (
                        <span className={`cp-strength-label ${sCls}`}>
                          {sLabel} password
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rules */}
                  {(touched.new || newPass.length > 0) && (
                    <div className="cp-rules">
                      {rules.map((r, i) => (
                        <div
                          key={i}
                          className={`cp-rule ${r.met ? "met" : ""}`}
                        >
                          <span className="cp-rule-icon">
                            {r.met ? "✓" : ""}
                          </span>
                          {r.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="cp-field">
                  <label className="cp-label">Confirm Password</label>
                  <div className="cp-input-wrap">
                    <input
                      type={showConfirm ? "text" : "password"}
                      className={`cp-input ${touched.confirm && passwordsMismatch ? "error" : ""} ${passwordsMatch ? "success" : ""}`}
                      placeholder="Re-enter your password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, confirm: true }))
                      }
                    />
                    <button
                      className="cp-eye-btn"
                      onClick={() => setShowConfirm((v) => !v)}
                      type="button"
                      tabIndex={-1}
                    >
                      <EyeIcon show={showConfirm} />
                    </button>
                  </div>
                  {touched.confirm && passwordsMismatch && (
                    <div className="cp-match-hint no-match">
                      ✕ Passwords do not match
                    </div>
                  )}
                  {passwordsMatch && (
                    <div className="cp-match-hint match">✓ Passwords match</div>
                  )}
                </div>

                <button
                  className="cp-btn"
                  onClick={handleSubmit}
                  disabled={loading || !isValid}
                >
                  {loading ? (
                    <span className="cp-btn-loading">
                      <span className="cp-spinner" /> Setting password...
                    </span>
                  ) : (
                    "Set New Password →"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
