import React, { useState, useEffect } from "react";
import { ShieldCheck, Clock, Info } from "lucide-react";
import { API } from "../utils/api";
import Loading from "./Loading";

// ─── Markdown Parser ──────────────────────────────────────────────────────────

function parseMarkdownToSections(md) {
  if (!md) return [];
  const lines = md.split("\n");
  const sections = [];
  let current = null;
  let bodyLines = [];

  const flush = () => {
    if (current) {
      sections.push({ ...current, content: bodyLines.join("\n").trim() });
      bodyLines = [];
      current = null;
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      current = { title: line.slice(3).trim() };
    } else if (current) {
      bodyLines.push(line);
    }
  }
  flush();
  return sections;
}

function getIntroFromMarkdown(md) {
  if (!md) return "";
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#") && !t.startsWith("-")) return t;
  }
  return "";
}

// ─── Section Content Renderer ─────────────────────────────────────────────────

const SectionContent = ({ text }) => {
  const lines = text.split("\n").filter((l) => l.trim() !== "");

  return (
    <div style={styles.contentWrapper}>
      {lines.map((line, i) => {
        const l = line.trim();
        if (l.startsWith("- ") || l.startsWith("• ")) {
          return (
            <div key={i} style={styles.bulletRow}>
              <span style={styles.bulletDot} />
              <p style={styles.bulletText}>{l.slice(2)}</p>
            </div>
          );
        }
        return (
          <p key={i} style={styles.paragraph}>
            {l}
          </p>
        );
      })}
    </div>
  );
};

// ─── Skeleton Loader ───────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div style={styles.skeletonCard}>
    <div style={styles.skeletonHeader}>
      <div
        style={{
          ...styles.skeletonBox,
          width: 28,
          height: 28,
          borderRadius: 8,
        }}
      />
      <div
        style={{
          ...styles.skeletonBox,
          width: "45%",
          height: 16,
          borderRadius: 4,
        }}
      />
    </div>
    <div style={styles.divider} />
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          ...styles.skeletonBox,
          width: "100%",
          height: 13,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          ...styles.skeletonBox,
          width: "80%",
          height: 13,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          ...styles.skeletonBox,
          width: "65%",
          height: 13,
          borderRadius: 4,
        }}
      />
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PrivacyPolicy() {
  const [sections, setSections] = useState([]);
  const [intro, setIntro] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API}/admin/privacy-policy`,
          {
            method: "GET",
            // headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setSections(parseMarkdownToSections(data.content));
        setIntro(getIntroFromMarkdown(data.content));

        if (data.updated_at) {
          setLastUpdated(
            new Date(data.updated_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          );
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  const handleSectionClick = (idx) => {
    setActiveSection((prev) => (prev === idx ? null : idx));
  };

  const scrollToSection = (idx) => {
    setActiveSection(idx);
    document
      .getElementById(`section-${idx}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Error State ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={styles.errorWrapper}>
        <div style={styles.errorCard}>
          <ShieldCheck
            size={40}
            color="#94a3b8"
            style={{ display: "block", margin: "0 auto 16px" }}
          />
          <h2 style={styles.errorTitle}>Could not load Privacy Policy</h2>
          <p style={styles.errorText}>Please try again later.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "90vh",
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
            Loading Privacy Policy…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ── Header Card ─────────────────────────────────────────────────── */}
        <div style={styles.headerCard}>
          <div style={styles.headerTop}>
            <div style={styles.iconWrap}>
              <ShieldCheck size={24} color="#2563eb" />
            </div>
            <div>
              <h1 style={styles.pageTitle}>Privacy Policy</h1>
              {lastUpdated && (
                <p style={styles.lastUpdated}>
                  <Clock
                    size={12}
                    style={{ marginRight: 5, verticalAlign: "middle" }}
                  />
                  Last updated:{" "}
                  <span style={styles.lastUpdatedBold}>{lastUpdated}</span>
                </p>
              )}
            </div>
          </div>

          {intro && !loading && <p style={styles.introParagraph}>{intro}</p>}

          {loading && (
            <div
              style={{
                ...styles.skeletonBox,
                width: "100%",
                height: 48,
                borderRadius: 8,
              }}
            />
          )}
        </div>

        {/* ── Quick Navigation ─────────────────────────────────────────────── */}
        {!loading && sections.length > 0 && (
          <div style={styles.quickNavCard}>
            <p style={styles.quickNavLabel}>Jump to section</p>
            <div style={styles.quickNavTags}>
              {sections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  style={
                    activeSection === idx ? styles.navTagActive : styles.navTag
                  }
                >
                  {idx + 1}. {sec.title.split(" ").slice(0, 3).join(" ")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Skeleton ────────────────────────────────────────────────────── */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Policy Sections ──────────────────────────────────────────────── */}
        {!loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sections.map((sec, idx) => (
              <div
                key={idx}
                id={`section-${idx}`}
                onClick={() => handleSectionClick(idx)}
                style={
                  activeSection === idx
                    ? styles.sectionCardActive
                    : styles.sectionCard
                }
              >
                {/* Card Header */}
                <div style={styles.sectionHeader}>
                  <div
                    style={
                      activeSection === idx
                        ? styles.sectionNumActive
                        : styles.sectionNum
                    }
                  >
                    {idx + 1}
                  </div>
                  <h2 style={styles.sectionTitle}>{sec.title}</h2>
                </div>

                <div style={styles.divider} />

                <SectionContent text={sec.content} />
              </div>
            ))}
          </div>
        )}

        {/* ── Footer Note ──────────────────────────────────────────────────── */}
        {!loading && sections.length > 0 && (
          <div style={styles.footerNote}>
            <Info
              size={14}
              color="#94a3b8"
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <p style={styles.footerText}>
              This policy may be updated periodically. Continued use of the
              platform constitutes acceptance of any revised policy.
            </p>
          </div>
        )}
      </div>

      {/* ── Keyframe for skeleton shimmer ───────────────────────────────────── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
    padding: "24px 20px 48px",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  headerCard: {
    background: "#ffffff",
    border: "1px solid #dbe4f0",
    borderRadius: 16,
    padding: "24px 28px",
    boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 4px",
  },
  lastUpdated: {
    fontSize: 13,
    color: "#64748b",
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  lastUpdatedBold: {
    fontWeight: 600,
    color: "#475569",
    marginLeft: 4,
  },
  introParagraph: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.75,
    margin: 0,
    padding: "12px 16px",
    background: "#f0f7ff",
    borderLeft: "3px solid #2563eb",
    borderRadius: "0 8px 8px 0",
  },

  // ── Quick Nav ─────────────────────────────────────────────────────────────
  quickNavCard: {
    background: "#ffffff",
    border: "1px solid #dbe4f0",
    borderRadius: 14,
    padding: "14px 18px",
    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
  },
  quickNavLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    margin: "0 0 10px",
  },
  quickNavTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  navTag: {
    background: "#f8fafc",
    color: "#475569",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "inherit",
  },
  navTagActive: {
    background: "#2563eb",
    color: "#ffffff",
    border: "1px solid #2563eb",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },

  // ── Section Cards ─────────────────────────────────────────────────────────
  sectionCard: {
    background: "#ffffff",
    border: "1px solid #dbe4f0",
    borderRadius: 16,
    padding: "20px 24px",
    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
    cursor: "pointer",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    scrollMarginTop: 16,
  },
  sectionCardActive: {
    background: "#ffffff",
    border: "1.5px solid #2563eb",
    borderRadius: 16,
    padding: "20px 24px",
    boxShadow: "0 4px 20px rgba(37,99,235,0.12)",
    cursor: "pointer",
    scrollMarginTop: 16,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  sectionNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: "#eff6ff",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  },
  sectionNumActive: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1e293b",
    margin: 0,
  },
  divider: {
    height: 1,
    background: "#f1f5f9",
    marginBottom: 12,
  },

  // ── Section Content ───────────────────────────────────────────────────────
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  paragraph: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.75,
    margin: 0,
  },
  bulletRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginLeft: 4,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#2563eb",
    flexShrink: 0,
    marginTop: 8,
  },
  bulletText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.75,
    margin: 0,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerNote: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "12px 16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
  },
  footerText: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 1.65,
    margin: 0,
  },

  // ── Error State ───────────────────────────────────────────────────────────
  errorWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
  },
  errorCard: {
    background: "#ffffff",
    border: "1px solid #dbe4f0",
    borderRadius: 16,
    padding: "40px 32px",
    textAlign: "center",
    maxWidth: 400,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#475569",
    margin: "0 0 8px",
  },
  errorText: {
    fontSize: 14,
    color: "#94a3b8",
    margin: 0,
  },

  // ── Skeleton ──────────────────────────────────────────────────────────────
  skeletonCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: 16,
    padding: "20px 24px",
  },
  skeletonHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  skeletonBox: {
    background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  },
};
