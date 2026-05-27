import { useState, useEffect } from "react";
import { API } from "../utils/api";

// Markdown content ko sections mein convert karta hai
function parseMarkdownToSections(rawContent) {
  if (!rawContent) return [];
  const lines = rawContent.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith("## ") || line.startsWith("# ")) {
      if (current) sections.push(current);
      const prefix = line.startsWith("## ") ? 3 : 2;
      current = {
        id: sections.length + 1,
        title: line.slice(prefix).trim(),
        content: "",
      };
    } else if (current) {
      current.content += (current.content ? "\n" : "") + line;
    }
  }

  if (current) sections.push(current);

  // Agar koi heading nahi mili toh pura content ek section mein
  if (sections.length === 0 && rawContent.trim()) {
    return [{ id: 1, title: "Terms & Conditions", content: rawContent.trim() }];
  }

  return sections;
}

export default function TermsAndCondition() {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API}/admin/terms-condition`,
          { method: "GET" },
        );

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();

        setTerms({
          content: data.content,
          lastUpdated: new Date(data.updated_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          sections: parseMarkdownToSections(data.content),
        });
      } catch (err) {
        console.error("Terms fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const toggleSection = (id) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  /* ───────── Loading ───────── */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
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
            Loading Terms &amp; Conditions…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  /* ───────── Error ───────── */
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #fca5a5",
            padding: "32px 40px",
            maxWidth: 480,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
          <h2 style={{ color: "#111827", fontSize: 18, marginBottom: 8 }}>
            Terms load nahi hue
          </h2>
          <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#3d5af1",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { sections, lastUpdated } = terms;
  const wordCount = (terms.content || "").split(/\s+/).filter(Boolean).length;

  /* ───────── Main UI ───────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tnc-root {
          font-family: 'Sora', sans-serif;
          background: linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%);
          min-height: 100vh;
          padding: 32px 24px;
        }

        .tnc-header {
          background: #fff;
          border-radius: 16px;
          padding: 32px 40px;
          margin-bottom: 20px;
          border: 1px solid #e4e8f0;
          box-shadow: 0 2px 12px rgba(60,80,180,.06);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .tnc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eef1ff;
          color: #3d5af1;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        .tnc-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .tnc-subtitle {
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.6;
          max-width: 520px;
        }

        .tnc-date-chip {
          background: #f5f7ff;
          border: 1px solid #d6dcff;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 12px;
          color: #3d5af1;
          font-weight: 500;
          text-align: center;
        }
        .tnc-date-chip span {
          display: block;
          font-size: 11px;
          color: #9ca3af;
          font-weight: 400;
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .tnc-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .tnc-stat {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e4e8f0;
          padding: 14px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 140px;
        }
        .tnc-stat-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }
        .tnc-stat-val  { font-size: 20px; font-weight: 700; color: #111827; }
        .tnc-stat-label{ font-size: 11.5px; color: #6b7280; margin-top: 1px; }

        .tnc-body {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .tnc-body { grid-template-columns: 1fr; }
          .tnc-toc  { display: none; }
        }

        .tnc-toc {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e4e8f0;
          padding: 18px 0;
          position: sticky;
          top: 24px;
          box-shadow: 0 2px 8px rgba(60,80,180,.04);
        }
        .tnc-toc-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #9ca3af;
          padding: 0 18px 12px;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 8px;
        }
        .tnc-toc-item {
          padding: 8px 18px;
          font-size: 12.5px;
          color: #6b7280;
          cursor: pointer;
          transition: all .15s;
          border-left: 3px solid transparent;
          line-height: 1.4;
        }
        .tnc-toc-item:hover   { background:#f5f7ff; color:#3d5af1; }
        .tnc-toc-item.active  { background:#eef1ff; color:#3d5af1; font-weight:600; border-left-color:#3d5af1; }

        .tnc-sections { display: flex; flex-direction: column; gap: 12px; }

        .tnc-section {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e4e8f0;
          overflow: hidden;
          box-shadow: 0 1px 6px rgba(60,80,180,.04);
          transition: box-shadow .2s, border-color .2s;
        }
        .tnc-section:hover { box-shadow: 0 4px 16px rgba(61,90,241,.08); border-color:#c7d0ff; }
        .tnc-section.open  { border-color:#3d5af1; box-shadow: 0 4px 20px rgba(61,90,241,.12); }

        .tnc-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          cursor: pointer;
          user-select: none;
          gap: 14px;
        }
        .tnc-section-left { display: flex; align-items: center; gap: 14px; flex: 1; }
        .tnc-section-num {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: #f0f2f8;
          color: #3d5af1;
          font-size: 12px;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-family: 'JetBrains Mono', monospace;
          transition: background .2s;
        }
        .tnc-section.open .tnc-section-num { background: #3d5af1; color: #fff; }

        .tnc-section-title {
          font-size: 14.5px;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.3;
        }

        .tnc-chevron {
          width: 20px; height: 20px;
          color: #9ca3af;
          transition: transform .25s, color .2s;
          flex-shrink: 0;
        }
        .tnc-section.open .tnc-chevron { transform: rotate(180deg); color: #3d5af1; }

        .tnc-section-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height .35s ease;
        }
        .tnc-section.open .tnc-section-body { max-height: 1000px; }

        .tnc-section-content {
          padding: 0 22px 20px;
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.75;
          border-top: 1px solid #f3f4f6;
          padding-top: 14px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .tnc-accept {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e4e8f0;
          padding: 20px 24px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          box-shadow: 0 2px 12px rgba(60,80,180,.06);
        }
        .tnc-accept-text { font-size: 13px; color: #6b7280; line-height: 1.5; flex: 1; min-width: 200px; }
        .tnc-accept-text strong { color: #111827; }
        .tnc-accept-btn {
          background: linear-gradient(135deg, #3d5af1, #6366f1);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 28px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: opacity .15s, transform .1s;
          white-space: nowrap;
        }
        .tnc-accept-btn:hover  { opacity: 0.9; }
        .tnc-accept-btn:active { transform: scale(.98); }
        .tnc-accept-btn.accepted { background: #10b981; cursor: default; }
      `}</style>

      <div className="tnc-root">
        {/* Header */}
        <div className="tnc-header">
          <div>
            <div className="tnc-badge">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width={13}
                height={13}
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Legal Document
            </div>
            <h1 className="tnc-title">Terms &amp; Conditions</h1>
            <p className="tnc-subtitle">
              Please read these terms carefully before using this platform. By
              continuing, you agree to be bound by these conditions.
            </p>
          </div>
          <div className="tnc-date-chip">
            <span>Last Updated</span>
            {lastUpdated}
          </div>
        </div>

        {/* Stats */}
        {/* <div className="tnc-stats">
          <div className="tnc-stat">
            <div className="tnc-stat-icon" style={{ background: "#eef1ff" }}>
              📋
            </div>
            <div>
              <div className="tnc-stat-val">{sections.length}</div>
              <div className="tnc-stat-label">Total Sections</div>
            </div>
          </div>
          <div className="tnc-stat">
            <div className="tnc-stat-icon" style={{ background: "#d1fae5" }}>
              📝
            </div>
            <div>
              <div className="tnc-stat-val">{wordCount}</div>
              <div className="tnc-stat-label">Total Words</div>
            </div>
          </div>
          <div className="tnc-stat">
            <div className="tnc-stat-icon" style={{ background: "#fef3c7" }}>
              ⚖️
            </div>
            <div>
              <div className="tnc-stat-val">v2.0</div>
              <div className="tnc-stat-label">Version</div>
            </div>
          </div>
        </div> */}

        {/* Body */}
        <div className="tnc-body">
          {/* TOC */}
          <div className="tnc-toc">
            <div className="tnc-toc-title">Contents</div>
            {sections.map((s) => (
              <div
                key={s.id}
                className={`tnc-toc-item ${activeSection === s.id ? "active" : ""}`}
                onClick={() => toggleSection(s.id)}
              >
                {s.title}
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="tnc-sections">
            {sections.map((s) => (
              <div
                key={s.id}
                className={`tnc-section ${activeSection === s.id ? "open" : ""}`}
              >
                <div
                  className="tnc-section-header"
                  onClick={() => toggleSection(s.id)}
                >
                  <div className="tnc-section-left">
                    <div className="tnc-section-num">
                      {String(s.id).padStart(2, "0")}
                    </div>
                    <div className="tnc-section-title">{s.title}</div>
                  </div>
                  <svg
                    className="tnc-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="tnc-section-body">
                  <div className="tnc-section-content">{s.content.trim()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accept bar */}
        <AcceptBar />
      </div>
    </>
  );
}

function AcceptBar() {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className="tnc-accept">
      <p className="tnc-accept-text">
        <strong>Ready to proceed?</strong> By clicking "I Accept", you confirm
        that you have read and agree to our Terms &amp; Conditions and Privacy
        Policy.
      </p>
      <button
        className={`tnc-accept-btn ${accepted ? "accepted" : ""}`}
        onClick={() => setAccepted(true)}
        disabled={accepted}
      >
        {accepted ? "✓ Accepted" : "I Accept"}
      </button>
    </div>
  );
}

