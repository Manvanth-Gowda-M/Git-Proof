"use client";
import { format } from "date-fns";
import { RepoData } from "./Generator";

const GreatVibesStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
    .signature { font-family: 'Great Vibes', cursive; }
  `}</style>
);

const GitHubLogo = ({ s=32, f="white" }: { s?: number; f?: string }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill={f}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// We need a subtle topography/wave pattern for the white card background.
const WavePattern = () => (
  <svg style={{position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.03, pointerEvents:"none"}}>
    <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M0 50 Q 25 25, 50 50 T 100 50" fill="none" stroke="#000" strokeWidth="1"/>
      <path d="M0 70 Q 25 45, 50 70 T 100 70" fill="none" stroke="#000" strokeWidth="1"/>
      <path d="M0 90 Q 25 65, 50 90 T 100 90" fill="none" stroke="#000" strokeWidth="1"/>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)" />
  </svg>
);

function HexBadge({ year }: { year: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      <svg viewBox="0 0 240 380" width={240} height={380} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8250df" />
            <stop offset="100%" stopColor="#5e32a6" />
          </linearGradient>
          <linearGradient id="hexFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#24292f" />
            <stop offset="100%" stopColor="#0d1117" />
          </linearGradient>
          <linearGradient id="hexStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#57606a" />
            <stop offset="100%" stopColor="#161b22" />
          </linearGradient>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000" floodOpacity="0.5" />
          </filter>

        </defs>

        {/* Ribbon */}
        <g filter="url(#dropShadow)">
          <polygon points="85,200 155,200 155,320 120,295 85,320" fill="url(#ribbonGrad)" />
          <text x="120" y="278" fill="white" fontSize="20" fontWeight="700" textAnchor="middle" letterSpacing="1" fontFamily="Inter, sans-serif">{year}</text>
        </g>

        {/* Hexagon */}
        <polygon points="120,10 224,70 224,190 120,250 16,190 16,70" fill="url(#hexFill)" stroke="url(#hexStroke)" strokeWidth="6" strokeLinejoin="round" filter="url(#dropShadow)" />
        <polygon points="120,18 217,74 217,186 120,242 23,186 23,74" fill="none" stroke="#484f58" strokeWidth="1.5" strokeLinejoin="round" />


        {/* Logo */}
        <circle cx="120" cy="80" r="32" fill="white" />
        <g transform="translate(98, 58)">
          <GitHubLogo s={44} f="#0d1117" />
        </g>

        {/* Text */}
        <text x="120" y="148" fill="white" fontSize="15" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="1.5">ACHIEVEMENT</text>
        <text x="120" y="168" fill="#8b949e" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="2">UNLOCKED</text>

        {/* Lock icon */}
        <line x1="90" y1="188" x2="105" y2="188" stroke="#484f58" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="135" y1="188" x2="150" y2="188" stroke="#484f58" strokeWidth="1.5" strokeLinecap="round" />
        <g transform="translate(112, 178)" opacity="0.8">
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1.5" fill="#8b949e" stroke="none" />
          </svg>
        </g>
      </svg>
    </div>
  );
}

export default function AchievementCertificateTemplate({ data }: { data: RepoData }) {
  const certYear = new Date().getFullYear();
  const issuedDate = format(new Date(), "MMMM d, yyyy");
  const certId = `GH-ACH-${certYear}-${Buffer.from(data.name)
    .toString("hex")
    .substring(0, 8)
    .toUpperCase()}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://gitproof.dev";
  const verifyUrl = `${origin}/verify/${certId.toLowerCase()}`;

  return (
    <div style={{
      width: "100%",
      height: "100%",
      fontFamily: "Inter,-apple-system,BlinkMacSystemFont,system-ui,sans-serif",
      display: "flex",
      flexDirection: "column",
      background: "#0d1117",
      padding: "24px 32px",
      position: "relative",
      boxSizing: "border-box",
      borderRadius: 14,
      overflow: "hidden",
    }}>
      <GreatVibesStyle />

      {/* ── HEADER (GitHub Logo) ────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
      }}>
        <GitHubLogo s={32} f="white" />
        <span style={{
          color: "white",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "-0.5px",
        }}>GitHub</span>
      </div>

      {/* ── WHITE CARD ────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        background: "white",
        borderRadius: 12,
        border: "1px solid #d1d5da",
        position: "relative",
        display: "flex",
        overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset, 0 20px 40px rgba(0,0,0,0.4)",
      }}>
        {/* Subtle topography/waves pattern overlay */}
        <WavePattern />
        
        {/* Inner thin border offset by 10px */}
        <div style={{
          position: "absolute",
          inset: 10,
          border: "1px solid rgba(209, 213, 218, 0.5)",
          borderRadius: 8,
          pointerEvents: "none",
        }} />

        {/* ── LEFT COLUMN (Text) ──────────────────────────────────────── */}
        <div style={{
          flex: 1.2,
          padding: "40px 50px",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}>
          {/* Title */}
          <h1 style={{
            margin: "0 0 8px",
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#1f2328",
            letterSpacing: "-1.5px",
          }}>
            Achievement<br />Certificate
          </h1>

          {/* Recipient */}
          <p style={{
            margin: "24px 0 8px",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#57606a",
            textTransform: "uppercase",
          }}>Proudly Presented To</p>
          <h2 style={{
            margin: "0 0 16px",
            fontSize: 40,
            fontWeight: 800,
            color: "#1f2328",
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}>{data.owner}</h2>

          {/* Divider */}
          <div style={{ width: 160, height: 2, background: "#d1d5da", marginBottom: 16 }} />

          {/* Recognition text */}
          <p style={{
            margin: "0 0 24px",
            fontSize: 16,
            color: "#57606a",
            lineHeight: 1.5,
            maxWidth: 400,
          }}>
            In recognition of outstanding contributions and dedication to open source development.
          </p>

          {/* Repo block */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 20,
          }}>
            {/* Repo icon */}
            <svg viewBox="0 0 16 16" width={24} height={24} fill="#57606a" style={{ marginTop: 2, flexShrink: 0 }}>
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
            </svg>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#1f2328", marginBottom: 4 }}>
                {data.name}
              </div>
              <div style={{ fontSize: 14, color: "#57606a", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {data.description || "An outstanding repository on GitHub!"}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {/* Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg viewBox="0 0 16 16" width={18} height={18} fill="#1f2328">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#1f2328" }}>{data.stars.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: "#57606a" }}>Stars</div>
              </div>
            </div>

            {/* Forks */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
              </svg>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#1f2328" }}>{data.forks.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: "#57606a" }}>Forks</div>
              </div>
            </div>

            {/* Language */}
            {data.language && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1f2328", flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#1f2328" }}>{data.language}</div>
                  <div style={{ fontSize: 12, color: "#57606a" }}>Primary Language</div>
                </div>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Footer Area */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 60, marginTop: 24 }}>
            {/* Signature Block */}
            <div style={{ width: 180 }}>
              <p className="signature" style={{ fontSize: 40, color: "#1f2328", margin: 0, lineHeight: 0.8 }}>nxtgenx</p>
              <div style={{ width: "100%", height: 1, background: "#d1d5da", margin: "10px 0 6px 0" }} />
              <p style={{ fontWeight: 800, fontSize: 14, color: "#1f2328", margin: 0 }}>NextGenX</p>
              <p style={{ fontSize: 12, color: "#57606a", margin: 0 }}>GitProof Issuer</p>
            </div>

            {/* Date Block */}
            <div style={{ width: 150 }}>
              <p style={{ fontWeight: 800, fontSize: 16, color: "#1f2328", margin: "0 0 10px 0" }}>{issuedDate}</p>
              <div style={{ width: "100%", height: 1, background: "#d1d5da", margin: "0 0 6px 0" }} />
              <p style={{ fontSize: 12, color: "#57606a", margin: 0 }}>Date</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (Badge & Info) ──────────────────────────────── */}
        <div style={{
          flex: 0.8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "40px 50px",
          zIndex: 1,
        }}>
          <div style={{alignSelf: "center", marginTop: 20}}>
            <HexBadge year={certYear} />
          </div>

          {/* Cert ID + Verify at Bottom Right with QR Code */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginTop: "auto" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#57606a", margin: "0 0 4px 0", whiteSpace: "nowrap" }}>
                Certificate ID: <span style={{ color: "#1f2328" }}>{certId}</span>
              </p>
              <p style={{ fontSize: 10, color: "#57606a", margin: 0, whiteSpace: "nowrap" }}>
                Verify at: <span style={{ color: "#0969da" }}>{verifyUrl}</span>
              </p>
            </div>
            {/* QR Code */}
            <div style={{ background: "white", padding: 4, borderRadius: 4, border: "1px solid #d1d5da" }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(verifyUrl)}&size=60x60&color=1f2328&bgcolor=ffffff&margin=0`} width={60} height={60} alt="QR Code" style={{ display: "block" }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
