import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ForgotPassword.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_LENGTH = 6;

export default function ForgotPassword({ onBack, onVerified }) {

  const navigate = useNavigate()

  // ── Step 1: Email ──────────────────────────
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // "email" | "otp"

  // ── Step 2: OTP ───────────────────────────
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  // Start countdown when OTP screen appears
  useEffect(() => {
    if (step === "otp") startTimer();
    return () => clearInterval(timerRef.current);
  }, [step]);

  function startTimer() {
    setResendTimer(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // ── Email submit ───────────────────────────
  function validateEmail() {
    if (!email.trim()) return "Email field khali hai";
    if (!EMAIL_REGEX.test(email.trim()))
      return "Valid email daalo (jaise: abc@gmail.com)";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validateEmail();

    if (err) {
      setError(err);
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log(data);

      setStep("otp");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ── OTP input handling ─────────────────────
  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return; // sirf numbers
    const updated = [...otp];
    updated[index] = value.slice(-1); // ek hi digit
    setOtp(updated);
    setOtpError("");
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputRefs.current[index + 1]?.focus();
  }

  function handleOtpPaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const updated = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => {
      updated[i] = ch;
    });
    setOtp(updated);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  async function handleOtpVerify(e) {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < OTP_LENGTH) {
      setOtpError("Poora OTP daalo (6 digits)");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");

      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: code,
        }),
      });

      const data = await response.json();

      const resetToken = data.resetToken;

      if (!response.ok) {
        throw new Error(data.message || "OTP verify failed");
        } else {
         navigate("/create-password", {
           state: { email, resetToken },
         });
        }
    } catch (error) {
      setOtpError(error.message);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
    }
  }

  // function handleResend() {
  //   if (!canResend) return;
  //   setOtp(Array(OTP_LENGTH).fill(""));
  //   setOtpError("");
  //   startTimer();
  //   inputRefs.current[0]?.focus();
  //   // Simulate resend API
  // }

  // ── OTP Screen ────────────────────────────
  if (step === "otp") {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="fp-card">
          <div className="fp-top-bar" />

          <button
            className="fp-btn-back fp-btn-back--top"
            onClick={() => setStep("email")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Wapas jao
          </button>

          <div className="fp-icon-wrap" style={{ marginTop: "1rem" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              <polyline points="16 2 18 4 22 0" />
            </svg>
          </div>

          <h1 className="fp-title">OTP daalo</h1>
          <p className="fp-subtitle">
            6-digit code bheja hai <strong>{email}</strong> par. Code 10 minute
            mein expire hoga.
          </p>

          <form onSubmit={handleOtpVerify} noValidate>
            <div className="fp-otp-row" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  className={`fp-otp-box${otpError ? " fp-otp-box--error" : ""}${digit ? " fp-otp-box--filled" : ""}`}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  disabled={otpLoading}
                  autoFocus={i === 0}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {otpError && (
              <div className="fp-error" style={{ marginTop: "0.75rem" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {otpError}
              </div>
            )}

            <button
              type="submit"
              className="fp-btn-primary"
              disabled={otpLoading}
              style={{ marginTop: "1.5rem" }}
            >
              {otpLoading ? (
                <span className="fp-spinner" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {otpLoading ? "Verify ho raha hai..." : "OTP Verify karo"}
            </button>
          </form>

          {/* <p
            className="fp-resend-text"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            {canResend ? (
              <>
                Code nahi mila?{" "}
                <span className="fp-link" onClick={handleResend}>
                  Dobara bhejo
                </span>
              </>
            ) : (
              <>
                Dobara bhejne ke liye <strong>{resendTimer}s</strong> wait karo
              </>
            )}
          </p> */}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <div className="fp-card">
        <div className="fp-top-bar" />

        <div className="fp-icon-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
          </svg>
        </div>

        <h1 className="fp-title">Password bhool gaye?</h1>
        <p className="fp-subtitle">
          Apna email daalo, hum aapko 6-digit OTP bhejenge.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="fp-label" htmlFor="fp-email">
            Email address
          </label>
          <div className="fp-input-wrap">
            <input
              id="fp-email"
              type="email"
              className={`fp-input${error ? " fp-input--error" : ""}`}
              placeholder="aap@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              disabled={loading}
            />
            <svg
              className="fp-input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          {error && (
            <div className="fp-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="fp-btn-primary" disabled={loading}>
            {loading ? (
              <span className="fp-spinner" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            )}
            {loading ? "Bhej rahe hain..." : "OTP Bhejo"}
          </button>
        </form>

        <hr className="fp-divider" />

        <button className="fp-btn-back" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <Link to={'/login'}>
          Login par wapas jao
          </Link>
        </button>
      </div>
    </div>
  );
}
