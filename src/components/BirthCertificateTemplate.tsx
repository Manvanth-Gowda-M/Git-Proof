"use client";
import { format } from "date-fns";
import { RepoData } from "./Generator";

const CinzelStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Great+Vibes&display=swap');
    .cinzel { font-family: 'Cinzel', serif; }
    .signature { font-family: 'Great Vibes', cursive; }
  `}</style>
);

const GitHubLogo = ({ s=32, f="white" }: { s?: number; f?: string }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill={f}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const QR = ({ url }: { url: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=76x76&color=ffffff&bgcolor=0d1117&margin=0`} width={76} height={76} alt="QR" style={{display:"block",borderRadius:3}}/>
);

const GoldMedal = () => (
  <div style={{position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center"}}>
    {/* Ribbon Tails */}
    <div style={{position: "absolute", bottom: -20, display: "flex", gap: 10, zIndex: 0}}>
      <div style={{width: 30, height: 50, background: "#c9960c", clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)"}} />
      <div style={{width: 30, height: 50, background: "#c9960c", clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)"}} />
    </div>
    
    {/* Outer Star/Gear Shape */}
    <svg viewBox="0 0 100 100" width="120" height="120" style={{position: "absolute", zIndex: 1, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}>
      <path d="M50 2 L56 12 L68 10 L71 21 L82 23 L80 34 L90 40 L84 49 L90 58 L80 64 L82 75 L71 77 L68 88 L56 86 L50 96 L44 86 L32 88 L29 77 L18 75 L20 64 L10 58 L16 49 L10 40 L20 34 L18 23 L29 21 L32 10 L44 12 Z" fill="#c9960c" stroke="#f5c842" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="38" fill="#1a1a1a" stroke="#fff" strokeWidth="1" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#c9960c" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
    {/* Inner Octocat */}
    <div style={{position: "relative", zIndex: 2}}>
      <GitHubLogo s={45} f="#c9960c" />
    </div>
  </div>
);

export default function BirthCertificate({ data }: { data: RepoData }) {
  const d = new Date(data.createdAt);
  const certId = `GB-CERT-${format(d, "yyyy-MM-dd")}-${String(data.stars + data.forks).padStart(6, "0")}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://gitproof.dev";
  const verifyUrl = `${origin}/verify/${certId.toLowerCase()}`;

  return (
    <div style={{width: "100%", height: "100%", display: "flex", fontFamily: "Inter,-apple-system,sans-serif", background: "#f8f9fa", borderRadius: 14, overflow: "hidden", border: "1px solid #d1d5da", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}>
      <CinzelStyle/>

      {/* SIDEBAR (Dark Navy) */}
      <div style={{width: 240, flexShrink: 0, background: "#0d1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "30px 20px 24px", position: "relative"}}>
        
        {/* Faint GitHub pattern overlay (simplified as radial gradients for subtle texture) */}
        <div style={{position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px"}} />

        {/* Top Logo */}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1}}>
          <div style={{width: 50, height: 50, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <GitHubLogo s={36} f="#0d1117" />
          </div>
          <span style={{color: "white", fontWeight: 700, fontSize: 24, letterSpacing: "-0.5px"}}>GitHub</span>
          <p style={{color: "#8b949e", fontSize: 10, textAlign: "center", lineHeight: 1.4, margin: "4px 0 0"}}>Building the future,<br/>one commit at a time.</p>
        </div>

        {/* Big Gold Medal */}
        <div style={{zIndex: 1, marginTop: 20}}>
          <GoldMedal />
        </div>

        {/* QR Code */}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1, width: "100%"}}>
          <div style={{padding: 6, background: "white", borderRadius: 4}}>
            <QR url={verifyUrl}/>
          </div>
          <p style={{color: "#8b949e", fontSize: 10, textAlign: "center", margin: 0}}>Scan to verify<br/>this certificate</p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{flex: 1, background: "white", display: "flex", flexDirection: "column", padding: "32px 48px", position: "relative"}}>
        
        {/* Header */}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24}}>
          <div style={{marginBottom: 8}}><GitHubLogo s={32} f="#0d1117" /></div>
          <h1 className="cinzel" style={{fontWeight: 900, fontSize: 36, color: "#0d1117", margin: 0, letterSpacing: "2px"}}>GITHUB BIRTH CERTIFICATE</h1>
          
          <div style={{display: "flex", alignItems: "center", width: "80%", marginTop: 12}}>
            <div style={{flex: 1, height: 1, background: "#d1d5da"}}/>
            <div style={{width: 6, height: 6, transform: "rotate(45deg)", background: "#c9960c", margin: "0 -3px", zIndex: 1}}/>
            <span style={{color: "#57606a", fontSize: 14, padding: "0 16px", fontStyle: "italic"}}>This is to certify that the repository</span>
            <div style={{width: 6, height: 6, transform: "rotate(45deg)", background: "#c9960c", margin: "0 -3px", zIndex: 1}}/>
            <div style={{flex: 1, height: 1, background: "#d1d5da"}}/>
          </div>
        </div>

        {/* Repo Identity */}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24}}>
          <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 8}}>
            <div style={{background: "#0d1117", padding: 8, borderRadius: 6}}>
              <svg viewBox="0 0 16 16" width={24} height={24} fill="white"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/></svg>
            </div>
            <span style={{fontWeight: 800, fontSize: 32, color: "#0d1117", letterSpacing: "-0.5px"}}>{data.name}</span>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: "#57606a"}}>
            <span>owned by</span>
            <GitHubLogo s={16} f="#0d1117" />
            <strong style={{color: "#0d1117"}}>{data.owner}</strong>
          </div>
          <p style={{fontSize: 13, color: "#8b949e", margin: "12px 0 0"}}>was created on GitHub on the following date and time</p>
        </div>

        {/* Date / Time Boxes */}
        <div style={{display: "flex", gap: 16, marginBottom: 24, justifyContent: "center"}}>
          <div style={{width: "40%", display: "flex", alignItems: "center", gap: 16, border: "1px solid #d1d5da", borderRadius: 8, padding: "10px 20px", background: "#f8f9fa"}}>
            <svg viewBox="0 0 16 16" width={28} height={28} fill="#24292f"><path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25C14.216 2 15 2.784 15 3.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm0 3.5h-2a.25.25 0 00-.25.25V6h11V3.75a.25.25 0 00-.25-.25H11V5a.75.75 0 01-1.5 0V3.5h-5V5a.75.75 0 01-1.5 0V3.5zm-2.25 4H2.5v2.25c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5h-11z"/></svg>
            <div>
              <p style={{fontSize: 11, color: "#57606a", margin: 0, fontWeight: 500}}>Created on</p>
              <p style={{fontWeight: 700, fontSize: 18, color: "#0d1117", margin: 0}}>{format(d,"d MMMM yyyy")}</p>
            </div>
          </div>
          
          <div style={{width: 1, background: "#d1d5da", margin: "4px 0"}} />

          <div style={{width: "40%", display: "flex", alignItems: "center", gap: 16, border: "1px solid transparent", padding: "10px 20px"}}>
            <svg viewBox="0 0 16 16" width={28} height={28} fill="#24292f"><path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7.25 4a.75.75 0 011.5 0v3.94l2.28 1.32a.75.75 0 11-.75 1.3l-2.5-1.44A.75.75 0 017.25 9V4z"/></svg>
            <div>
              <p style={{fontSize: 11, color: "#57606a", margin: 0, fontWeight: 500}}>at</p>
              <p style={{fontWeight: 700, fontSize: 18, color: "#0d1117", margin: 0}}>{format(d,"h:mm:ss a")} UTC</p>
            </div>
          </div>
        </div>

        {/* Details Grid Section */}
        <div style={{marginBottom: 8}}>
          <h3 style={{color: "#c9960c", fontSize: 12, fontWeight: 700, letterSpacing: "1px", margin: "0 0 8px 0"}}>REPOSITORY DETAILS</h3>
          <div style={{height: 1, background: "linear-gradient(90deg, #e1e4e8 0%, transparent 100%)", width: "100%", marginBottom: 12}} />
        </div>

        <div style={{display: "flex", flex: 1, background: "#fafbfc", border: "1px solid #d1d5da", borderRadius: 8, padding: 14, gap: 24, marginBottom: 16}}>
          
          {/* Column 1 */}
          <div style={{flex: 1.2, display: "flex", flexDirection: "column", gap: 16}}>
            {[
              {icon: <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/></svg>, label: "Repository Name", val: data.name},
              {icon: <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a"><path d="M10.561 8.073a6.005 6.005 0 011.944 4.204.75.75 0 11-1.498.047 4.5 4.5 0 00-9 0 .75.75 0 01-1.498-.045 6.005 6.005 0 011.944-4.207 3.5 3.5 0 111.048 0zm-4.51-.613a2 2 0 100-4 2 2 0 000 4z"/></svg>, label: "Owner", val: data.owner},
              {icon: <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a"><path d="M0 1.75A.75.75 0 01.75 1h14.5a.75.75 0 010 1.5H.75A.75.75 0 010 1.75zm0 5A.75.75 0 01.75 6h14.5a.75.75 0 010 1.5H.75A.75.75 0 010 6.75zm0 5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"/></svg>, label: "Description", val: (data.description || "No description").substring(0, 45) + (data.description?.length > 45 ? "..." : "")},
            ].map((item, i) => (
              <div key={i} style={{display: "flex", gap: 12}}>
                <div style={{marginTop: 2}}>{item.icon}</div>
                <div>
                  <p style={{fontSize: 11, color: "#57606a", margin: "0 0 2px 0"}}>{item.label}</p>
                  <p style={{fontWeight: 600, fontSize: 14, color: "#0d1117", margin: 0, wordBreak: "break-word"}}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{width: 1, background: "#d1d5da", margin: "0 -4px"}} />

          {/* Column 2 */}
          <div style={{flex: 1, display: "flex", flexDirection: "column", gap: 16}}>
            {[
              {icon: <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a"><path d="M5.45 5.154A4.25 4.25 0 009.25 7.5h1.378a2.251 2.251 0 110 1.5H9.25A5.734 5.734 0 015 7.123v3.505a2.25 2.25 0 11-1.5 0V5.372a2.25 2.25 0 111.95-.218zM4.25 13.5a.75.75 0 100-1.5.75.75 0 000 1.5zm8.5-4.5a.75.75 0 100-1.5.75.75 0 000 1.5zM5 3.25a.75.75 0 100 .005V3.25z"/></svg>, label: "Default Branch", val: data.defaultBranch || "main"},
              {icon: <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25zm1.75-.25a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25z"/></svg>, label: "Language", val: data.language || "N/A"},
              {icon: <svg viewBox="0 0 16 16" width={18} height={18} fill="#57606a"><path d="M4 4a4 4 0 118 0 4 4 0 01-8 0zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM1.5 13.5c0-2.76 2.24-5 5-5h3c2.76 0 5 2.24 5 5a.75.75 0 01-1.5 0 3.5 3.5 0 00-3.5-3.5h-3A3.5 3.5 0 003 13.5a.75.75 0 01-1.5 0z"/></svg>, label: "Visibility", val: "Public"},
            ].map((item, i) => (
              <div key={i} style={{display: "flex", gap: 12}}>
                <div style={{marginTop: 2}}>{item.icon}</div>
                <div>
                  <p style={{fontSize: 11, color: "#57606a", margin: "0 0 2px 0"}}>{item.label}</p>
                  <p style={{fontWeight: 600, fontSize: 14, color: "#0d1117", margin: 0}}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{width: 1, background: "#d1d5da", margin: "0 -4px"}} />

          {/* Column 3: Stats block */}
          <div style={{flex: 1.2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 8px", alignContent: "start"}}>
            {[
              {icon: <svg viewBox="0 0 16 16" width={16} height={16} fill="#1f2328"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>, label: "Stars", val: data.stars},
              {icon: <svg viewBox="0 0 16 16" width={16} height={16} fill="#57606a"><path d="M5.45 5.154A4.25 4.25 0 009.25 7.5h1.378a2.251 2.251 0 110 1.5H9.25A5.734 5.734 0 015 7.123v3.505a2.25 2.25 0 11-1.5 0V5.372a2.25 2.25 0 111.95-.218zM4.25 13.5a.75.75 0 100-1.5.75.75 0 000 1.5zm8.5-4.5a.75.75 0 100-1.5.75.75 0 000 1.5zM5 3.25a.75.75 0 100 .005V3.25z"/></svg>, label: "Forks", val: data.forks},
              {icon: <svg viewBox="0 0 16 16" width={16} height={16} fill="#57606a"><path d="M8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.8c.45.677 1.367 1.931 2.637 3.022C4.33 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.022a1.619 1.619 0 000-1.8c-.45-.677-1.367-1.931-2.637-3.022C11.67 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"/></svg>, label: "Watchers", val: data.stars},
              {icon: <svg viewBox="0 0 16 16" width={16} height={16} fill="#57606a"><path d="M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 6a2 2 0 100 4 2 2 0 000-4z"/></svg>, label: "Commits", val: data.commitCount || 1},
              {icon: <svg viewBox="0 0 16 16" width={16} height={16} fill="#57606a"><path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.493 3.493 0 012 5.5zM11 4a3.001 3.001 0 012.22 5.018 5.01 5.01 0 012.56 3.012.749.749 0 01-.885.954.752.752 0 01-.549-.514 3.507 3.507 0 00-2.522-2.372.75.75 0 01-.574-.73v-.352a.75.75 0 01.416-.672A1.5 1.5 0 0011 5.5.75.75 0 0111 4z"/></svg>, label: "Contributors", val: data.contributorsCount || data.topContributors?.length || 1, full: true},
            ].map((item, i) => (
              <div key={i} style={{display: "flex", alignItems: "center", gap: 10, gridColumn: item.full ? "1 / -1" : "auto"}}>
                <div style={{flexShrink: 0}}>{item.icon}</div>
                <div>
                  <p style={{fontSize: 10, color: "#57606a", margin: "0 0 1px 0"}}>{item.label}</p>
                  <p style={{fontWeight: 700, fontSize: 16, color: "#0d1117", margin: 0, lineHeight: 1}}>{item.val}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div style={{marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 12, borderTop: "1px solid #d1d5da"}}>
          {/* Bottom Left: ID & Verify */}
          <div>
            <p style={{fontSize: 10, color: "#57606a", margin: "0 0 2px 0"}}>Certificate ID</p>
            <p style={{fontSize: 13, fontWeight: 600, color: "#c9960c", margin: "0 0 8px 0"}}>{certId}</p>
            <p style={{fontSize: 10, color: "#57606a", margin: "0 0 2px 0"}}>Verify Certificate</p>
            <p style={{fontSize: 12, color: "#0969da", margin: 0}}>{verifyUrl}</p>
          </div>

          {/* Signature */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", transform: "translateY(-6px)"}}>
            <p className="signature" style={{fontSize: 36, color: "#24292f", margin: 0, lineHeight: 0.8}}>NextGenX</p>
            <div style={{width: 140, height: 1, background: "#d1d5da", margin: "6px 0 4px 0"}} />
            <p style={{fontSize: 11, fontWeight: 700, color: "#0d1117", margin: 0}}>NextGenX</p>
            <p style={{fontSize: 10, color: "#57606a", margin: 0}}>GitProof Issuer</p>
          </div>

          {/* GITHUB VERIFIED Seal */}
          <div style={{position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", transform: "translateY(-4px)"}}>
            <svg viewBox="0 0 100 100" style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}>
              {/* Outer gold ring */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c9960c" strokeWidth="2" />
              {/* Inner dashed gold ring */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#c9960c" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Curved Text "GITHUB" */}
              <path id="curve-top" d="M 20 50 A 30 30 0 0 1 80 50" fill="transparent" />
              <text fontSize="12" fontWeight="800" fill="#c9960c" letterSpacing="2px">
                <textPath href="#curve-top" startOffset="50%" textAnchor="middle">GITHUB</textPath>
              </text>
              
              {/* Curved Text "VERIFIED" */}
              <path id="curve-bottom" d="M 18 50 A 32 32 0 0 0 82 50" fill="transparent" />
              <text fontSize="12" fontWeight="800" fill="#c9960c" letterSpacing="1px">
                <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">VERIFIED</textPath>
              </text>

              {/* Decorative Stars */}
              <circle cx="15" cy="50" r="1.5" fill="#c9960c" />
              <circle cx="85" cy="50" r="1.5" fill="#c9960c" />
            </svg>
            <div style={{marginTop: -4}}><GitHubLogo s={24} f="#c9960c" /></div>
          </div>
        </div>

      </div>
    </div>
  );
}
