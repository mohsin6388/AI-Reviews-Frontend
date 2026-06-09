import { useState, useEffect, useRef } from "react";
import logo from "../assets/review-booster-logo2.png"

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Stars({ count = 5, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{ fontSize: size, color: "#FF8C42", lineHeight: 1 }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ParticleBg() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: (i % 3) * 3 + 4,
            height: (i % 3) * 3 + 4,
            borderRadius: "50%",
            background: "rgba(255,140,66,0.12)",
            left: `${(i * 37 + 10) % 100}%`,
            top: `${(i * 53 + 5) % 100}%`,
            animation: `floatP ${4 + i * 0.4}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

function GoogleG({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.14 0 5.95 1.08 8.16 2.85l6.08-6.08C34.52 3.18 29.6 1 24 1 14.8 1 7 6.7 3.55 14.65l7.1 5.52C12.4 14.07 17.73 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.63-.15-3.2-.42-4.7H24v8.9h12.67c-.55 2.96-2.2 5.47-4.67 7.16l7.1 5.52C43.4 37.8 46.5 31.6 46.5 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.65 28.17A14.55 14.55 0 0 1 9.5 24c0-1.44.25-2.83.65-4.17l-7.1-5.52A23.5 23.5 0 0 0 .5 24c0 3.8.9 7.4 2.55 10.6l7.1-5.52z"
      />
      <path
        fill="#34A853"
        d="M24 46.5c5.6 0 10.3-1.85 13.7-5.02l-7.1-5.52C28.9 37.6 26.6 38.5 24 38.5c-6.27 0-11.6-4.57-13.35-10.67l-7.1 5.52C7 41.8 14.8 46.5 24 46.5z"
      />
    </svg>
  );
}

function PhoneMockup() {
  return (
    <div
      style={{
        position: "relative",
        width: "min(220px, 85vw)",
        background: "#0a1628",
        borderRadius: 36,
        padding: "12px 8px",
        boxShadow: "0 32px 80px rgba(7,48,87,0.55), 0 0 0 2px #1a3a5c",
      }}
    >
      <div
        style={{
          width: 60,
          height: 12,
          background: "#050e1c",
          borderRadius: 8,
          margin: "0 auto 10px",
        }}
      />
      <div
        style={{
          background: "white",
          borderRadius: 20,
          overflow: "hidden",
          minHeight: 300,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingBottom: 8,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#073057,#0a4a8a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>
              RM
            </span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#111" }}>
              Review Mater
            </div>
            <div style={{ fontSize: 9, color: "#6b7280" }}>
              Thanks for visiting!
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#eff6ff",
            borderRadius: 10,
            padding: "8px 10px",
            border: "1px solid #bfdbfe",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: "#1e3a5f",
              fontWeight: 600,
            }}
          >
            How was your experience?
          </p>
        </div>
        {[
          { emoji: "🤩", label: "Excellent", selected: true },
          { emoji: "😊", label: "Good", selected: false },
        ].map((o) => (
          <div
            key={o.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f9fafb",
              borderRadius: 8,
              padding: "7px 10px",
              border: o.selected
                ? "2px solid #073057"
                : "2px solid transparent",
            }}
          >
            <span style={{ fontSize: 16 }}>{o.emoji}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: o.selected ? "#073057" : "#374151",
              }}
            >
              {o.label}
            </span>
            {o.selected && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 9,
                  background: "#073057",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: 5,
                }}
              >
                ✓
              </span>
            )}
          </div>
        ))}
        <div
          style={{
            background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
            borderRadius: 10,
            padding: "8px 10px",
            border: "1px solid #93c5fd",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "#1d4ed8",
              fontWeight: 700,
              marginBottom: 3,
            }}
          >
            ✨ AI Review Ready
          </div>
          <div style={{ fontSize: 10, color: "#1e3a5f", lineHeight: 1.5 }}>
            "Amazing experience! Highly recommend!"
          </div>
        </div>
        <div
          style={{
            background: "#4285F4",
            borderRadius: 8,
            padding: "7px 0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <GoogleG size={12} />
          <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>
            Post to Google
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, icon, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,140,66,0.2)",
        borderRadius: 18,
        padding: "24px 20px",
        textAlign: "center",
        backdropFilter: "blur(16px)",
        transform: vis ? "translateY(0)" : "translateY(30px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <div style={{ fontSize: 30, marginBottom: 6 }}>{icon}</div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "#FF8C42",
          fontFamily: "'Poppins',sans-serif",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(240,245,251,0.6)",
          marginTop: 6,
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function StepCard({ num, title, desc, icon, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 22,
        padding: "28px 24px",
        position: "relative",
        boxShadow: "0 8px 32px rgba(7,48,87,0.08)",
        border: "1px solid rgba(7,48,87,0.08)",
        transform: vis ? "translateY(0)" : "translateY(40px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "linear-gradient(135deg,#073057,#0a4a8a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          marginBottom: 14,
          boxShadow: "0 6px 16px rgba(7,48,87,0.25)",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(255,140,66,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 14,
          color: "#FF8C42",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {num}
      </div>
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: 18,
          fontWeight: 700,
          color: "#073057",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "#6b7280",
          lineHeight: 1.7,
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function FeatureItem({ icon, title, desc, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        padding: "28px 0",
        borderBottom: "1px solid rgba(255,140,66,0.1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-40px)",
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "linear-gradient(135deg,#073057,#0a4a8a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 18,
            fontWeight: 700,
            color: "white",
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "rgba(240,245,251,0.6)",
            lineHeight: 1.75,
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

function TestiCard({ name, biz, text, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,140,66,0.15)",
        borderRadius: 18,
        padding: "24px 20px",
        backdropFilter: "blur(16px)",
        transform: vis ? "translateY(0)" : "translateY(30px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <Stars count={5} size={14} />
      <p
        style={{
          margin: "12px 0 16px",
          fontSize: 14,
          color: "rgba(240,245,251,0.75)",
          lineHeight: 1.75,
          fontStyle: "italic",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        "{text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#073057,#FF8C42)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 15,
            color: "white",
            flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: "white",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(240,245,251,0.45)",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            {biz}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  plan,
  setupPrice,
  monthlyPrice,
  audience,
  features,
  highlight = false,
  isCustom = false,
  delay = 0,
}) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: highlight
          ? "linear-gradient(145deg,#073057,#0a4a8a)"
          : "rgba(255,255,255,0.04)",
        border: highlight
          ? "1px solid rgba(255,140,66,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 22,
        padding: "32px 24px",
        position: "relative",
        transform: vis ? "translateY(0)" : "translateY(40px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.5s ease ${delay}ms`,
        boxShadow: highlight ? "0 24px 60px rgba(7,48,87,0.4)" : "none",
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#FF8C42",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 14px",
            borderRadius: 20,
            letterSpacing: 1,
            fontFamily: "'Poppins',sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          ⭐ BEST SELLER
        </div>
      )}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#FF8C42",
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 3,
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {plan}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(240,245,251,0.45)",
          marginBottom: 14,
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {audience}
      </div>
      {isCustom ? (
        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "white",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            Custom
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(240,245,251,0.45)",
              marginTop: 3,
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            Min ₹1,999/month
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              fontSize: 12,
              color: "rgba(240,245,251,0.5)",
              fontFamily: "'Poppins',sans-serif",
              marginBottom: 2,
            }}
          >
            Setup: <strong style={{ color: "white" }}>₹{setupPrice}</strong>{" "}
            one-time
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "#FF8C42",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              ₹{monthlyPrice}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "rgba(240,245,251,0.45)",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              /mo
            </span>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
          >
            <span
              style={{
                color: "#FF8C42",
                fontSize: 14,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(240,245,251,0.7)",
                lineHeight: 1.5,
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "13px 0",
          background: highlight ? "#FF8C42" : "rgba(255,140,66,0.12)",
          border: highlight ? "none" : "1px solid rgba(255,140,66,0.25)",
          borderRadius: 11,
          color: "white",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "'Poppins',sans-serif",
          marginTop: "auto",
        }}
      >
        {isCustom ? "Contact Sales →" : "Get Started →"}
      </button>


    </div>
  );
}

function FAQItem({ q, a, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        borderBottom: "1px solid rgba(255,140,66,0.1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateX(-20px)",
        transition: `all 0.5s ease ${delay}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "18px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "white",
            textAlign: "left",
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          {q}
        </span>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: open ? "#FF8C42" : "rgba(255,140,66,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: open ? "white" : "#FF8C42",
            flexShrink: 0,
            transition: "all .3s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 200 : 0,
          transition: "max-height 0.35s ease",
          paddingBottom: open ? 14 : 0,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "rgba(240,245,251,0.6)",
            lineHeight: 1.8,
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ badge, title, sub, light = false }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        marginBottom: 48,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px)",
        transition: "all .6s",
      }}
    >
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#FF8C42",
          letterSpacing: 2,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 10,
          fontFamily: "'Poppins',sans-serif",
          
        }}
      >
        {badge}
      </span>
      <h2
        style={{
          fontSize: "clamp(26px,4vw,44px)",
          fontWeight: 800,
          fontFamily: "'Poppins',sans-serif",
          color: light ? "#073057" : "white",
          marginBottom: sub ? 12 : 0,
          lineHeight: 1.2,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <p
          style={{
            fontSize: 15,
            color: light ? "#6b7280" : "rgba(240,245,251,0.5)",
            maxWidth: 480,
            margin: "0 auto",
            fontFamily: "'Poppins',sans-serif",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function ReviewMaterLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVis, setHeroVis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{-webkit-font-smoothing:antialiased;font-family:'Poppins',sans-serif;}
        @keyframes floatP{from{transform:translateY(0) scale(1);}to{transform:translateY(-20px) scale(1.2);}}
        @keyframes bounce-slow{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        @keyframes spin-slow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
        .btn-primary{background:linear-gradient(135deg,#FF8C42,#e8722e);border:none;border-radius:12px;color:white;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .25s;box-shadow:0 6px 20px rgba(255,140,66,0.3);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(255,140,66,0.45);}
        .btn-outline{background:transparent;border:1.5px solid rgba(240,245,251,0.3);border-radius:12px;color:white;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .25s;}
        .btn-outline:hover{border-color:#FF8C42;background:rgba(255,140,66,0.08);}
        @media(max-width:768px){
          .nav-links{display:none!important;}
          .nav-btns{display:none!important;}
          .hamburger{display:flex!important;}
          .hero-stats{gap:24px!important;}
          .hero-btns{flex-direction:column!important;align-items:stretch!important;}
          .hero-btns button{text-align:center;}
          .two-col{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:480px){
          .stats-grid{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;}
          .pricing-grid{grid-template-columns:1fr!important;}
        }
        .mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(5,14,28,0.97);backdrop-filter:blur(20px);padding:20px 5%;flex-direction:column;gap:4px;z-index:99;border-bottom:1px solid rgba(255,140,66,0.1);}
        .mobile-menu.open{display:flex;}
        .mobile-menu a{padding:12px 0;color:rgba(240,245,251,0.8);text-decoration:none;font-size:15px;font-weight:600;font-family:'Poppins',sans-serif;border-bottom:1px solid rgba(255,255,255,0.05);}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;}
        .hamburger span{width:22px;height:2px;background:white;border-radius:2px;transition:all .3s;}
      `}</style>

      <div
        style={{
          background: "#050e1c",
          color: "white",
          overflowX: "hidden",
          minHeight: "100vh",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {/* NAVBAR */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "0px 5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
            background: scrolled ? "rgba(5,14,28,0.94)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,140,66,0.1)" : "none",
            transition: "all .3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                // background: "linear-gradient(135deg,#073057,#0a4a8a)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 17,
                color: "white",
                border: "2px solid #FF8C42",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </div>

            <span
              style={{
                fontWeight: 800,
                fontSize: 19,
                fontFamily: "'Sora',sans-serif",
                color: "white",
              }}
            >
              Review <span style={{ color: "#FF8C42" }}> Mater</span>
            </span>
          </div>
          <div
            className="nav-links"
            style={{ display: "flex", gap: 28, alignItems: "center" }}
          >
            {["Features", "How It Works", "Pricing", "FAQ"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  color: "rgba(240,245,251,0.65)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <div className="nav-btns" style={{ display: "flex", gap: 10 }}>
            {/* <button
              className="btn-outline"
              style={{ padding: "8px 18px", fontSize: 13 }}
            >
              Sign In
            </button> */}
            <button
              className="btn-primary"
              style={{ padding: "4px 12px", fontSize: 13 }}
              onClick={() => (window.location.href = "/login")}
            >
              Get Started Free
            </button>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            />
          </div>
        </nav>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {["Features", "How It Works", "Pricing", "FAQ"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <button
            className="btn-primary"
            style={{
              padding: "12px",
              fontSize: 14,
              marginTop: 8,
              borderRadius: 10,
            }}
          >
            Get Started Free
          </button>
        </div>

        {/* HERO */}
        <section
          style={{
            minHeight: "100vh",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(7,48,87,0.55) 0%, #050e1c 70%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 5% 80px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <ParticleBg />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 820,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,140,66,0.08)",
                border: "1px solid rgba(255,140,66,0.2)",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 24,
                animation: heroVis ? "fadeSlideUp 0.6s ease both" : "none",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "#FF8C42",
                  borderRadius: "50%",
                  animation: "pulse 1.5s ease infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#FF8C42",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                AI-Powered Review Generation
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(36px,6.5vw,72px)",
                fontWeight: 800,
                fontFamily: "'Poppins',sans-serif",
                lineHeight: 1.1,
                color: "white",
                marginBottom: 20,
                letterSpacing: -1.5,
                animation: heroVis ? "fadeSlideUp 0.7s ease 0.1s both" : "none",
              }}
            >
              Turn Every Customer Into a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#FF8C42,#ffb380)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                5-Star Review
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(14px,1.8vw,17px)",
                color: "rgba(240,245,251,0.6)",
                maxWidth: 520,
                margin: "0 auto 32px",
                lineHeight: 1.7,
                fontFamily: "'Poppins',sans-serif",
                animation: heroVis ? "fadeSlideUp 0.7s ease 0.2s both" : "none",
              }}
            >
              Ek QR scan se Smart AI automatic Google review generate karta hai
              — negative feedback private rakhta hai aur Google Ranking boost
              karta hai.
            </p>

            {/* <div
              className="hero-btns"
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 44,
                animation: heroVis ? "fadeSlideUp 0.7s ease 0.3s both" : "none",
              }}
            >
              <button
                className="btn-primary"
                style={{ padding: "14px 32px", fontSize: 15 }}
              >
                🚀 Free Trial Shuru Karein
              </button>
              <button
                className="btn-outline"
                style={{ padding: "14px 32px", fontSize: 15 }}
              >
                ▶ Demo Dekhein
              </button>
            </div> */}

            <div
              className="hero-stats"
              style={{
                display: "flex",
                gap: 36,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: heroVis ? "fadeSlideUp 0.7s ease 0.4s both" : "none",
              }}
            >
              {[
                { n: "2,400+", l: "Businesses Served" },
                { n: "1.2M+", l: "Reviews Generated" },
                { n: "4.9★", l: "Avg Rating Boost" },
              ].map((s) => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#FF8C42",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(240,245,251,0.45)",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: 56,
              position: "relative",
              zIndex: 1,
              animation: heroVis ? "fadeSlideUp 0.9s ease 0.5s both" : "none",
            }}
          >
            <div style={{ animation: "bounce-slow 3.5s ease-in-out infinite" }}>
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div
          style={{
            background: "rgba(255,140,66,0.06)",
            borderTop: "1px solid rgba(255,140,66,0.12)",
            borderBottom: "1px solid rgba(255,140,66,0.12)",
            padding: "12px 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              animation: "ticker 22s linear infinite",
              width: "max-content",
            }}
          >
            {[...Array(2)]
              .fill([
                "🌟 AI-Powered Reviews",
                "🚀 Boost Google Ranking",
                "🛡️ Negative Feedback Shield",
                "🌐 100+ Countries",
                "📱 1-Click QR Scan",
                "💬 Multi-Language Support",
                "⚡ Instant Live Post",
              ])
              .flat()
              .map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0 28px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(240,245,251,0.6)",
                    whiteSpace: "nowrap",
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  {t}
                </span>
              ))}
          </div>
        </div>

        {/* WHY GOOGLE REVIEWS */}
        <section
          style={{
            padding: "80px 5%",
            background: "#050e1c",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="two-col"
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FF8C42",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 10,
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                WHY IT MATTERS
              </span>
              <h2
                style={{
                  fontSize: "clamp(16px,2.5vw,26px)",
                  fontWeight: 800,
                  fontFamily: "'Poppins',sans-serif",
                  lineHeight: 1.15,
                  marginBottom: 16,
                  color: "white",
                }}
              >
                Google Reviews{" "}
                <span style={{ color: "#FF8C42" }}>= More Customers</span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(240,245,251,0.6)",
                  lineHeight: 1.8,
                  marginBottom: 28,
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                <strong style={{ color: "white" }}>
                  93% customers rely on reviews
                </strong>{" "}
                before deciding. Zada reviews = better Google ranking = more
                visibility where it matters.
              </p>
              <button
                className="btn-primary"
                style={{ padding: "5px 10px", fontSize: 14 }}
                onClick={() => (window.location.href = "/login")}
              >
                Start Getting Reviews →
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
              className="stats-grid"
            >
              <StatCard
                value="73%"
                label="of all reviews are on Google"
                icon="📊"
                delay={0}
              />
              <StatCard
                value="93%"
                label="customers trust reviews"
                icon="🤝"
                delay={100}
              />
              <StatCard
                value="112+"
                label="reviews = more attraction"
                icon="⭐"
                delay={200}
              />
              <StatCard
                value="4.8x"
                label="more leads for top-ranked"
                icon="📈"
                delay={300}
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          style={{ padding: "80px 5%", background: "#F0F5FB" }}
        >
          <SectionHeading
            light
            badge="SIMPLE PROCESS"
            title="Sirf 3 Steps Mein"
            sub="No app download, no long forms. Bas scan karo aur AI baaki sambhal leta hai."
          />
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 24,
            }}
          >
            <StepCard
              num="01"
              icon="📲"
              title="Scan QR Code"
              delay={0}
              desc="Customer counter par rakhe QR code ko phone se scan karta hai — kisi extra app ki zaroorat nahi."
            />
            <StepCard
              num="02"
              icon="👆"
              title="Share Experience"
              delay={150}
              desc="Simple page open hoga — Sirf Rating pe click kro aur service ke according tags choose kro."
            />
            <StepCard
              num="03"
              icon="✨"
              title="AI Auto-Posts"
              delay={300}
              desc="AI professional human review generate karta hai tags and ratings pe. Customer 'Post' click kare — seedha Google review par redirect!"
            />
          </div>
          <div
            style={{
              maxWidth: 680,
              margin: "40px auto 0",
              background: "linear-gradient(135deg,#073057,#0a4a8a)",
              borderRadius: 20,
              padding: "28px 32px",
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              boxShadow: "0 16px 48px rgba(7,48,87,0.35)",
            }}
          >
            <div style={{ fontSize: 44, flexShrink: 0 }}>🛡️</div>
            <div>
              <h3
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                Negative Reviews Se Bachaye
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(240,245,251,0.7)",
                  lineHeight: 1.75,
                  margin: 0,
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                Agar koi customer khush nahi hai, unka feedback{" "}
                <strong style={{ color: "#FF8C42" }}>
                  aapke paas private aayega — Google par nahi.
                </strong>{" "}
                Personally resolve kar sakte hain.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          style={{
            padding: "80px 5%",
            background: "#060d1a",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ParticleBg />
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <SectionHeading
              badge="KEY FEATURES"
              title={`What Makes Review Mater <span style="color:#FF8C42">Different</span>`}
            />
            <FeatureItem
              icon="🤖"
              delay={0}
              title="Keyword-Rich AI Reviews"
              desc="AI sirf normal baatein nahi likhta — important keywords (Best Food, Great Service) review mein add karta hai, Google ranking improve hoti hai."
            />
            <FeatureItem
              icon="🌐"
              delay={100}
              title="Multi-Lingual — 100+ Countries"
              desc="Hindi, English, Tamil, Bengali, ya koi bhi bhasha mein feedback lo. Hamara AI har language mein perfect review banata hai."
            />
            <FeatureItem
              icon="⚡"
              delay={200}
              title="Zero Friction Posting"
              desc="Customer ko khud se lamba review type nahi karna. Ek click mein AI-generated review Google Business par live."
            />
            <FeatureItem
              icon="📊"
              delay={300}
              title="Smart Dashboard"
              desc="Real-time insights — kitne reviews aye, average rating, keyword performance, negative feedback trends, aur sentiment analysis check jo aapke business ko improve krega."
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          style={{
            padding: "80px 5%",
            background: "#050e1c",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ParticleBg />
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <SectionHeading
              badge="CUSTOMER STORIES"
              title={`Businesses That <span style="color:#FF8C42">Love Us</span>`}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 20,
              }}
            >
              <TestiCard
                delay={0}
                name="Rahul Sharma"
                biz="Sharma Restaurant, Delhi"
                text="Hamari Google rating 3.8 se 4.7 ho gayi sirf 2 mahine mein! QR scan karte hi AI review ready kar deta hai."
              />
              <TestiCard
                delay={100}
                name="Priya Mehta"
                biz="Mehta Beauty Salon, Mumbai"
                text="Negative review shield feature best hai! Ek naraz customer ka feedback seedha mere phone par aaya, Google par nahi gaya."
              />
              <TestiCard
                delay={200}
                name="Arun Patel"
                biz="Patel Auto Service, Surat"
                text="Multi-language support amazing hai. Gujarati customers apni bhasha mein feedback dete hain — business 40% grow kiya!"
              />
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          style={{
            padding: "80px 5%",
            background: "#060d1a",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ParticleBg />
          <div
            style={{
              maxWidth: 1060,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <SectionHeading
              badge="PRICING"
              title="Simple, Affordable Plans"
              sub="Acrylic QR Standee + AI Engine — sab ek package mein."
            />
            <div
              className="pricing-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
                gap: 22,
              }}
            >
              <PricingCard
                delay={0}
                plan="Starter"
                audience="Chote Vendors, Naye Cafes"
                setupPrice="999"
                monthlyPrice="799"
                features={[
                  "1 Acrylic QR Standee",
                  "Basic AI Engine",
                  "50 Reviews/month",
                  "Negative Feedback Filter",
                  "Email Support",
                ]}
              />
              <PricingCard
                delay={150}
                plan="Growth Plan"
                audience="Restaurants, Salons, Clinics"
                setupPrice="1,499"
                monthlyPrice="999"
                highlight
                features={[
                  "2 Premium Acrylic Standees",
                  "Unlimited AI Reviews",
                  "Negative Review Filter",
                  "Keyword-Rich AI Reviews",
                  "Multi-Language Support",
                  "Analytics Dashboard",
                  "Priority Support",
                ]}
              />
              <PricingCard
                delay={300}
                plan="Enterprise"
                audience="Multi-branch Brands, Hotels"
                isCustom
                features={[
                  "Custom Branded Standees (all branches)",
                  "Centralized Dashboard",
                  "Unlimited Reviews & Locations",
                  "White-Label Option",
                  "API Access & Integrations",
                  "Dedicated Account Manager",
                ]}
              />
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: 24,
                fontSize: 12,
                color: "rgba(240,245,251,0.35)",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              * Setup charges are one-time. Free trial available. Enterprise
              minimum ₹1,999/month.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: "80px 5%", background: "#050e1c" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionHeading badge="FAQ" title="Aksar Puche Jane Wale Sawaal" />
            <FAQItem
              delay={0}
              q="Kya yeh Google ke Terms of Service ke against hai?"
              a="Bilkul nahi. Review Mater customers ke genuine experiences ko conveniently share karne mein madad karta hai. AI sirf writing assist karta hai — content genuine experience par based hota hai. Google TOS compliant hai."
            />
            <FAQItem
              delay={80}
              q="Customer ko koi app download karni hogi?"
              a="Nahi! Sirf QR scan karo phone camera se. Fully browser-based process hai — koi download nahi."
            />
            <FAQItem
              delay={160}
              q="Negative reviews kaise handle hote hain?"
              a="Agar customer 'Average' ya lower select karta hai, Google par post nahi hoga. Aapko private message milega jahan personally resolve kar sakte hain."
            />
            <FAQItem
              delay={240}
              q="Free trial available hai?"
              a="Haan! 14-day free trial bina credit card ke. Starter features try karo aur decide karo."
            />
            <FAQItem
              delay={320}
              q="Acrylic Standee kab milega?"
              a="Order confirm ke baad 5-7 business days mein aapke address par courier ho jaata hai."
            />
          </div>
        </section>

        {/* CTA BANNER */}
        <section
          style={{
            padding: "70px 5%",
            background: "linear-gradient(135deg,#073057,#0a4a8a)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <ParticleBg />
          <div
            style={{
              maxWidth: 620,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 14 }}>🚀</div>
            <h2
              style={{
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 800,
                fontFamily: "'Poppins',sans-serif",
                color: "white",
                marginBottom: 14,
                lineHeight: 1.2,
              }}
            >
              Aaj Hi Shuru Karein —
              <span
                style={{
                  fontSize: "clamp(20px,3vw,35px)",
                  fontWeight: 800,
                  fontFamily: "'Poppins',sans-serif",
                  color: "white",
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                Customer Se{" "}
                <span
                  style={{
                    color: "#FF8C42",
                  }}
                >
                  Free Generate
                </span>{" "}
                Krae 15 Review Tak
              </span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(240,245,251,0.65)",
                marginBottom: 32,
                lineHeight: 1.7,
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              2,400+ businesses already grow kar rahe hain. Aapka number kab
              aayega?
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  padding: "14px 36px",
                  fontSize: 15,
                  fontWeight: 700,
                  background: "#FF8C42",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(255,140,66,0.35)",
                  fontFamily: "'Poppins',sans-serif",
                }}
                onClick={() => (window.location.href = "/login")}
              >
                Free Trial Shuru Karein →
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 700,
                  background: "transparent",
                  color: "white",
                  border: "2px solid rgba(240,245,251,0.3)",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                Sales Se Baat Karein
              </button>
            </div>
            <p
              style={{
                marginTop: 18,
                fontSize: 12,
                color: "rgba(240,245,251,0.4)",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              No credit card required • Cancel anytime • Setup in 5 minutes
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            background: "#030810",
            padding: "50px 5% 28px",
            borderTop: "1px solid rgba(255,140,66,0.08)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              className="footer-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: 40,
                marginBottom: 40,
              }}
            >
              <div>
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      background: "linear-gradient(135deg,#073057,#0a4a8a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 16,
                      color: "white",
                      border: "2px solid #FF8C42",
                    }}
                  >
                    R
                  </div>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      fontFamily: "'Poppins',sans-serif",
                      color: "white",
                    }}
                  >
                    Review<span style={{ color: "#FF8C42" }}>Mater</span>
                  </span>
                </div> */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      // background: "linear-gradient(135deg,#073057,#0a4a8a)",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 17,
                      color: "white",
                      border: "2px solid #FF8C42",
                    }}
                  >
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>

                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 19,
                      fontFamily: "'Sora',sans-serif",
                      color: "white",
                    }}
                  >
                    Review <span style={{ color: "#FF8C42" }}> Mater</span>
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(240,245,251,0.4)",
                    lineHeight: 1.8,
                    maxWidth: 260,
                    margin: "0 0 16px",
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  India's most advanced AI-powered review generation platform.
                </p>
              </div>
              {[
                {
                  heading: "Product",
                  links: [
                    "Features",
                    "How It Works",
                    "Pricing",
                    "Integrations",
                  ],
                },
                {
                  heading: "Company",
                  links: ["About Us", "Blog", "Careers", "Contact"],
                },
                {
                  heading: "Legal",
                  links: ["Privacy Policy", "Terms", "GDPR", "Refund Policy"],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <h4
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#FF8C42",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 14,
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    {col.heading}
                  </h4>
                  {col.links.map((l) => (
                    <div key={l} style={{ marginBottom: 9 }}>
                      <a
                        href="#"
                        style={{
                          fontSize: 13,
                          color: "rgba(240,245,251,0.45)",
                          textDecoration: "none",
                          fontFamily: "'Poppins',sans-serif",
                        }}
                      >
                        {l}
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(240,245,251,0.25)",
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                © 2026 ReviewMater. Made with ❤️ in India.
              </p>

              {/* <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <GoogleG size={14} />
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(240,245,251,0.25)",
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  Trusted Google Partner
                </span>
              </div> */}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
