import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Google.com Kholein",
    subtitle: "Browser mein Google ki homepage par jaayein",
    description:
      "Sabse pehle apne browser mein google.com open karein. Aapko Google ka search page dikhega jisme search bar, voice search, aur naya AI Mode button hoga.",
    tip: {
      type: "info",
      label: "💡 Tip",
      text: "Koi bhi browser chalega — Chrome, Firefox, Edge sab theek hain.",
    },
    visual: "homepage",
  },
  {
    id: 2,
    title: "Search Bar Mein Type Karein",
    subtitle: '"google place id finder" search karein',
    description:
      'Search bar mein click karein aur type karein: "google place id finder". Phir Enter dabayein ya "Google Search" button par click karein.',
    tip: {
      type: "info",
      label: "💡 Tip",
      text: 'Exactly yahi likhein: "google place id finder" — isse pehla result Google ka official tool aayega.',
    },
    visual: "search",
  },
  {
    id: 3,
    title: "Pehle Result Par Click Karein",
    subtitle: "Google for Developers ka link select karein",
    description:
      'Search results mein sabse upar "Place ID Finder | Maps JavaScript API" ka result aayega — yeh Google for Developers ka official link hai. Isi par click karein.',
    tip: {
      type: "warning",
      label: "⚠️ Dhyan Dein",
      text: "Sirf pehla result — Google for Developers wala — click karein. Yeh official aur bilkul free hai.",
    },
    visual: "results",
  },
  {
    id: 4,
    title: "Google Developer Page Kholegi",
    subtitle: "Place ID Finder tool ka page dikhega",
    description:
      "Click karne ke baad aap Google Maps Platform Documentation page par pahunch jayenge jahan Place ID Finder ka interactive tool hoga. Yahan ek map aur search box diya gaya hai.",
    tip: {
      type: "info",
      label: "💡 Note",
      text: 'Page thoda scroll karna pad sakta hai tool tak pahunchne ke liye. "Try Sample" section mein map milega.',
    },
    visual: "devpage",
  },
  {
    id: 5,
    title: "Jagah Ka Naam Search Karein",
    subtitle: "Map ke search box mein apni jagah likhein",
    description:
      "Map ke andar diye gaye search box mein apni jagah ka naam type karein. Dropdown mein suggestions aayenge — wahan se sahi jagah select karein.",
    tip: {
      type: "info",
      label: "💡 Tip",
      text: "Agar ek se zyada result aayein, address dekh kar sahi wala choose karein.",
    },
    visual: "dropdown",
  },
  {
    id: 6,
    title: "Place ID Copy Karein",
    subtitle: "Map par popup mein Place ID dikha jayega",
    description:
      "Map par ek info window mein jagah ka naam, Place ID, aur address dikhega. Place ID ko select karke copy kar lein.",
    tip: {
      type: "success",
      label: "✅ Itna hi karna tha!",
      text: "Blue color mein dikhne wale Place ID ko select karein, right-click > Copy karein, aur apne kaam mein use karein. Yeh ID permanent rehti hai Google Maps mein.",
    },
    visual: "placeid",
  },
];

/* ─── Visual mock components ─── */

function GoogleLogo() {
  return (
    <span className="google-logo">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC04" }}>o</span>
      <span style={{ color: "#34A853" }}>g</span>
      <span style={{ color: "#EA4335" }}>l</span>
      <span style={{ color: "#4285F4" }}>e</span>
    </span>
  );
}

function MockBrowser({ children, url = "google.com" }) {
  return (
    <div className="mock-browser">
      <div className="mock-browser-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="mock-url">{url}</span>
      </div>
      <div className="mock-content">{children}</div>
    </div>
  );
}

function VisualHomepage() {
  return (
    <MockBrowser>
      <div className="v-center">
        <GoogleLogo />
        <div className="mock-searchbar">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9aa0a6"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="placeholder-text">Kuch bhi search karein...</span>
          <svg
            style={{ marginLeft: "auto" }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4285F4"
            strokeWidth="2"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
          </svg>
        </div>
        <div className="mock-btns">
          <button className="mock-btn">Google Search</button>
          <button className="mock-btn">I'm Feeling Lucky</button>
        </div>
      </div>
    </MockBrowser>
  );
}

function VisualSearch() {
  return (
    <MockBrowser>
      <div className="v-center">
        <GoogleLogo />
        <div className="mock-searchbar active-bar">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9aa0a6"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span style={{ color: "#202124", fontSize: 12 }}>
            google place id finder
          </span>
          <svg
            style={{ marginLeft: "auto" }}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5f6368"
            strokeWidth="2"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div className="mock-btns">
          <button className="mock-btn primary-btn">Google Search</button>
          <button className="mock-btn">I'm Feeling Lucky</button>
        </div>
      </div>
    </MockBrowser>
  );
}

function VisualResults() {
  return (
    <div className="results-box">
      <div className="result-highlighted">
        <div className="result-site">
          <span className="g-favicon" />
          Google for Developers · developers.google.com
        </div>
        <div className="result-title">
          Place ID Finder | Maps JavaScript API ↗
        </div>
        <div className="result-desc">
          The Place ID Finder sample allows a user to find a place based on its
          address, then it adds a marker for the place...
        </div>
        <div className="highlight-badge">← Yahi click karein</div>
      </div>
      <div className="result-plain">
        <div className="result-site">Local Ranking · localranking.com</div>
        <div className="result-title-plain">
          Free Google Place ID Finder Tool [Instant Lookup]
        </div>
      </div>
      <div className="result-plain">
        <div className="result-site">Chrome Web Store</div>
        <div className="result-title-plain">
          Place ID Finder for Google Maps - Chrome Web Store
        </div>
      </div>
    </div>
  );
}

function VisualDevPage() {
  return (
    <div className="devpage-box">
      <div className="devpage-breadcrumb">
        Home › Products › Google Maps Platform › Maps JS API
      </div>
      <div className="devpage-title">Place ID Finder</div>
      <div className="devpage-desc">
        The Place ID Finder sample allows a user to find a place based on its
        address, then it adds a marker for the place to the map.
      </div>
      <div className="mock-map-bg">
        <div className="map-search-bar">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9aa0a6"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span style={{ color: "#9aa0a6", fontSize: 10 }}>
            Search for a place...
          </span>
        </div>
        <div className="map-placeholder">🗺️ Interactive Map</div>
      </div>
    </div>
  );
}

function VisualDropdown() {
  const items = [
    {
      name: "The Perch Restaurant - Winery",
      addr: "Great Ocean Road, Lavers Hill VIC, Australia",
      highlight: false,
    },
    {
      name: "The Perch Restaurant & Lounge",
      addr: "East Washington Street, Phoenix, AZ, USA",
      highlight: false,
    },
    {
      name: "The Perch Rooftop Restaurant ← yeh select karein",
      addr: "Indira Nagar Road, Makri Kheora, Khyora, Kanpur, UP",
      highlight: true,
    },
  ];
  return (
    <div className="mock-map-bg">
      <div className="map-search-bar active-bar">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9aa0a6"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{ color: "#202124", fontSize: 10 }}>
          The Perch Rooftop Restaurant
        </span>
      </div>
      <div className="dropdown-list">
        {items.map((item, i) => (
          <div
            key={i}
            className={`dropdown-item ${item.highlight ? "highlighted" : ""}`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={item.highlight ? "#1A73E8" : "#9aa0a6"}
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <div
                className={`drop-name ${item.highlight ? "drop-name-blue" : ""}`}
              >
                {item.name}
              </div>
              <div className="drop-addr">{item.addr}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualPlaceId() {
  return (
    <div className="mock-map-bg">
      <div className="map-search-bar">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9aa0a6"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{ color: "#202124", fontSize: 10 }}>
          The Perch Rooftop Restaurant, Indira Nagar Road...
        </span>
      </div>
      <div className="place-id-popup">
        <div className="popup-header">
          <span className="pin-icon">📍</span>
          <strong style={{ fontSize: 11 }}>The Perch Rooftop Restaurant</strong>
        </div>
        <div className="popup-label">Place ID:</div>
        <div className="popup-id">ChIJEblbHT85nDKR-3_bRkgDhZ0</div>
        <div className="popup-addr">
          4th Floor, Crystal Square Building, Indira Nagar Rd, Makri Kheora,
          Khyora, Kanpur, UP 208017, India
        </div>
      </div>
    </div>
  );
}

const visualMap = {
  homepage: <VisualHomepage />,
  search: <VisualSearch />,
  results: <VisualResults />,
  devpage: <VisualDevPage />,
  dropdown: <VisualDropdown />,
  placeid: <VisualPlaceId />,
};

/* ─── Main component ─── */

export default function Guide({ onBack }) {
  const [current, setCurrent] = useState(0);

  const step = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  const tipClass = {
    info: "tip-info",
    warning: "tip-warning",
    success: "tip-success",
  }[step.tip.type];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

       .guide-root {
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          padding: 0;
          background: transparent;
        }

        .guide-wrap {
           width: 100%;
           max-width: 100%;
         }

         .guide-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  transition: all 0.2s ease;
}

.guide-back-btn:hover {
  background: #f8fafc;
  border-color: #2563eb;
  color: #2563eb;
}

        /* Header */
        .guide-head {
          margin-bottom: 2rem;
        }
        .guide-head-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f0fe;
          color: #1A73E8;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .guide-head h1 {
          font-size: 22px;
          font-weight: 600;
          color: #202124;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .guide-head p {
          font-size: 14px;
          color: #5f6368;
          line-height: 1.7;
        }

        /* Progress */
        .progress-track {
          display: flex;
          align-items: center;
          margin-bottom: 1.75rem;
          gap: 0;
        }
        .prog-step {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .prog-step:last-child { flex: none; }
        .prog-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          border: 1.5px solid #dadce0;
          background: #fff;
          color: #9aa0a6;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .prog-dot:hover { border-color: #1A73E8; color: #1A73E8; }
        .prog-dot.done {
          background: #34A853;
          border-color: #34A853;
          color: #fff;
        }
        .prog-dot.active {
          background: #1A73E8;
          border-color: #1A73E8;
          color: #fff;
          box-shadow: 0 0 0 4px rgba(26,115,232,0.15);
        }
        .prog-line {
          flex: 1;
          height: 2px;
          background: #dadce0;
          transition: background 0.3s ease;
        }
        .prog-line.done { background: #34A853; }

        /* Card */
        .step-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e8eaed;
          overflow: hidden;
          animation: fadeSlide 0.3s ease;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f1f3f4;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: #fafbfc;
        }
        .step-badge {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #e8f0fe;
          color: #1A73E8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .step-badge.done { background: #e6f4ea; color: #34A853; }
        .card-title { font-size: 16px; font-weight: 600; color: #202124; margin-bottom: 3px; }
        .card-subtitle { font-size: 12px; color: #5f6368; }

        .card-body { padding: 1.5rem; }

        .step-desc {
          font-size: 14px;
          color: #3c4043;
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }

        /* Screenshot box */
        .screenshot-wrap {
          background: #f8f9fa;
          border: 1px solid #e8eaed;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1.25rem;
        }
        .screenshot-label {
          font-size: 10px;
          font-weight: 600;
          color: #9aa0a6;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* Mock browser */
        .mock-browser {
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e8eaed;
          overflow: hidden;
        }
        .mock-browser-bar {
          background: #e8eaed;
          padding: 7px 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .dot {
          width: 9px; height: 9px; border-radius: 50%;
        }
        .dot.red { background: #EA4335; }
        .dot.yellow { background: #FBBC04; }
        .dot.green { background: #34A853; }
        .mock-url {
          flex: 1;
          background: #fff;
          border-radius: 20px;
          padding: 3px 12px;
          font-size: 10px;
          color: #5f6368;
          margin-left: 6px;
          font-family: 'DM Mono', monospace;
        }
        .mock-content {
          background: #fff;
          padding: 1.25rem 1rem;
        }
        .v-center { display: flex; flex-direction: column; align-items: center; gap: 10px; }

        .google-logo {
          font-size: 32px;
          font-weight: 400;
          letter-spacing: -1px;
          line-height: 1;
        }

        .mock-searchbar {
          display: flex;
          align-items: center;
          border: 1px solid #dfe1e5;
          border-radius: 24px;
          padding: 8px 16px;
          gap: 8px;
          width: 100%;
          max-width: 380px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .mock-searchbar.active-bar {
          border-color: #4285F4;
          box-shadow: 0 1px 6px rgba(66,133,244,0.25);
        }
        .placeholder-text { font-size: 12px; color: #9aa0a6; }

        .mock-btns { display: flex; gap: 8px; }
        .mock-btn {
          background: #f8f9fa;
          border: 1px solid #dadce0;
          border-radius: 4px;
          padding: 7px 14px;
          font-size: 11px;
          color: #3c4043;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .mock-btn.primary-btn {
          background: #1A73E8;
          border-color: #1A73E8;
          color: #fff;
        }

        /* Results */
        .results-box {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e8eaed;
          padding: 10px;
        }
        .result-highlighted {
          border: 2px solid #EA4335;
          border-radius: 6px;
          padding: 8px 10px;
          margin-bottom: 8px;
          background: #fff8f8;
          position: relative;
        }
        .result-site {
          font-size: 10px;
          color: #5f6368;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 2px;
        }
        .g-favicon {
          width: 14px; height: 14px;
          background: #4285F4;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .result-title { font-size: 12px; color: #1a0dab; font-weight: 600; margin-bottom: 3px; }
        .result-desc { font-size: 10px; color: #545454; line-height: 1.5; }
        .highlight-badge {
          display: inline-block;
          margin-top: 5px;
          background: #EA4335;
          color: #fff;
          font-size: 9px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 3px;
        }
        .result-plain { margin-bottom: 6px; }
        .result-title-plain { font-size: 12px; color: #1a0dab; }

        /* Dev page */
        .devpage-box {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e8eaed;
          padding: 10px;
        }
        .devpage-breadcrumb { font-size: 9px; color: #9aa0a6; margin-bottom: 6px; }
        .devpage-title { font-size: 16px; font-weight: 600; color: #202124; margin-bottom: 5px; }
        .devpage-desc { font-size: 10px; color: #5f6368; line-height: 1.5; margin-bottom: 10px; }

        /* Map bg */
        .mock-map-bg {
          background: #e8e8e0;
          border-radius: 8px;
          padding: 10px;
        }
        .map-search-bar {
          background: #fff;
          border-radius: 20px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          font-size: 10px;
          color: #202124;
        }
        .map-search-bar.active-bar {
          box-shadow: 0 1px 4px rgba(26,115,232,0.25);
          border: 1px solid #4285F4;
        }
        .map-placeholder {
          text-align: center;
          color: #80868b;
          font-size: 11px;
          padding: 20px 0;
        }

        /* Dropdown */
        .dropdown-list {
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          overflow: hidden;
        }
        .dropdown-item {
          padding: 7px 12px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          border-bottom: 1px solid #f1f3f4;
          font-size: 10px;
        }
        .dropdown-item:last-child { border-bottom: none; }
        .dropdown-item.highlighted { background: #e8f0fe; }
        .drop-name { font-weight: 500; color: #202124; }
        .drop-name-blue { color: #1A73E8; }
        .drop-addr { color: #70757a; font-size: 9px; margin-top: 1px; }

        /* Place ID popup */
        .place-id-popup {
          background: #fff;
          border-radius: 8px;
          padding: 10px 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .popup-header {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 6px;
          font-size: 11px;
          color: #202124;
        }
        .pin-icon { font-size: 13px; }
        .popup-label { font-size: 9px; color: #5f6368; margin-bottom: 3px; }
        .popup-id {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #1A73E8;
          background: #e8f0fe;
          padding: 4px 8px;
          border-radius: 4px;
          word-break: break-all;
          margin-bottom: 5px;
        }
        .popup-addr { font-size: 9px; color: #5f6368; line-height: 1.5; }

        /* Tip box */
        .tip-box {
          border-radius: 0 8px 8px 0;
          padding: 10px 12px;
          margin-bottom: 1.25rem;
        }
        .tip-info { background: #e8f0fe; border-left: 3px solid #1A73E8; }
        .tip-warning { background: #fef7e0; border-left: 3px solid #FBBC04; }
        .tip-success { background: #e6f4ea; border-left: 3px solid #34A853; }
        .tip-label {
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 3px;
        }
        .tip-info .tip-label { color: #1A73E8; }
        .tip-warning .tip-label { color: #945b00; }
        .tip-success .tip-label { color: #0F6E56; }
        .tip-text { font-size: 12px; color: #3c4043; line-height: 1.6; }

        /* Nav */
        .card-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid #f1f3f4;
          margin-top: 0.25rem;
        }
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #dadce0;
          background: #fff;
          color: #3c4043;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
        }
        .nav-btn:hover:not(:disabled) { background: #f1f3f4; border-color: #bdc1c6; }
        .nav-btn:active:not(:disabled) { transform: scale(0.97); }
        .nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .nav-btn.primary {
          background: #1A73E8;
          border-color: #1A73E8;
          color: #fff;
        }
        .nav-btn.primary:hover:not(:disabled) { background: #1557B0; border-color: #1557B0; }
        .nav-btn.success {
          background: #34A853;
          border-color: #34A853;
          color: #fff;
        }
        .nav-btn.success:hover { background: #2d8f47; border-color: #2d8f47; }
        .step-counter {
          font-size: 12px;
          color: #9aa0a6;
          font-weight: 500;
        }

        /* Arrow icons inline */
        .arr { display: inline-flex; align-items: center; }
      `}</style>

      <div className="guide-root">
        <div className="guide-back-btn" onClick={onBack}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>

          <span>Back to Business Form</span>
        </div>
        <div className="guide-wrap">
          {/* Header */}
          <div className="guide-head">
            <div className="guide-head-label">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Google Maps Guide
            </div>
            <h1>Google Place ID Kaise Dhundein</h1>
            <p>
              Kisi bhi jagah ka Google Place ID step-by-step dhundein — jo
              Google Maps API mein use hota hai.
            </p>
          </div>

          {/* Progress */}
          <div className="progress-track">
            {steps.map((s, i) => (
              <div key={s.id} className="prog-step">
                <div
                  className={`prog-dot ${i < current ? "done" : i === current ? "active" : ""}`}
                  onClick={() => setCurrent(i)}
                  title={`Step ${s.id}: ${s.title}`}
                >
                  {i < current ? (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className={`prog-line ${i < current ? "done" : ""}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step card */}
          <div className="step-card" key={current}>
            <div className="card-header">
              <div className={`step-badge ${isLast ? "done" : ""}`}>
                {step.id}
              </div>
              <div>
                <div className="card-title">{step.title}</div>
                <div className="card-subtitle">{step.subtitle}</div>
              </div>
            </div>
            <div className="card-body">
              <p className="step-desc">{step.description}</p>

              <div className="screenshot-wrap">
                <div className="screenshot-label">Aisa dikhega</div>
                {visualMap[step.visual]}
              </div>

              <div className={`tip-box ${tipClass}`}>
                <div className="tip-label">{step.tip.label}</div>
                <div className="tip-text">{step.tip.text}</div>
              </div>

              <div className="card-nav">
                <button
                  className="nav-btn"
                  onClick={() => setCurrent((c) => c - 1)}
                  disabled={isFirst}
                >
                  <span className="arr">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </span>
                  Pichha
                </button>
                <span className="step-counter">
                  Step {current + 1} / {steps.length}
                </span>
                {isLast ? (
                  <button
                    className="nav-btn success"
                    onClick={() => setCurrent(0)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 .49-3.3" />
                    </svg>
                    Dobara Dekhein
                  </button>
                ) : (
                  <button
                    className="nav-btn primary"
                    onClick={() => setCurrent((c) => c + 1)}
                  >
                    Agla
                    <span className="arr">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
