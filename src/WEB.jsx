import React, { useState, useMemo, useRef, useEffect } from "react";
import { Check, ChevronRight, Copy, CheckCheck, Download, FileText, Database, BookOpen, Droplet, Triangle } from "lucide-react";
import RecipePage from "./RecipePage";
import SQLViewer from "./SQLViewer";
import BookstoreFlow from "./BookstoreFlow";
import WaterTank from "./WaterTank";
import TriangleGenerator from "./TriangleGenerator";
import Sidebar from "./Sidebar";

/* ═══════════════════════════════════════════════
   Design Tokens
   ═══════════════════════════════════════════════ */
const C = {
  bg: "#0B0F19",
  bgEl: "#111827",
  surface: "#161D2F",
  surface2: "#1C2540",
  border: "#232E47",
  borderL: "#2C3A5A",
  text: "#E8ECF4",
  text2: "#A0AABE",
  text3: "#6B7A94",
  amber: "#F0A840",
  amberDim: "rgba(240,168,64,.12)",
  amberBorder: "rgba(240,168,64,.25)",
  teal: "#50D2C6",
  tealDim: "rgba(80,210,198,.10)",
  tealBorder: "rgba(80,210,198,.22)",
  red: "#EF6F5B",
};
const F = {
  display: "'Bai Jamjuree','IBM Plex Sans Thai',system-ui,sans-serif",
  body: "'IBM Plex Sans Thai',system-ui,sans-serif",
  mono: "'IBM Plex Mono','Fira Code',monospace",
};
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";

/* ═══════════════════════════════════════════════
   Modules Data
   ═══════════════════════════════════════════════ */
const MODULES = [
  { id: "m1",  label: "Recipe App UI",          icon: "🍜", cat: "frontend" },
  { id: "m4",  label: "Database Explorer (Q4-Q5)", icon: <Database size={16} />, cat: "sql" },
  { id: "m6",  label: "06 / Bookstore Architecture", icon: <BookOpen size={16} />, cat: "design" },
  { id: "m7",  label: "07 / Water Tank Algorithm",   icon: <Droplet size={16} />, cat: "math" },
  { id: "m8",  label: "08 / Symmetric Triangle",     icon: <Triangle size={16} />, cat: "code" },
  { id: "m9",  label: "Sports Analytics Prob",  icon: "⚽", cat: "prob" },
  { id: "m10", label: "Fruit Basket Combinatorics", icon: "🍊", cat: "prob" },
  { id: "m11", label: "Number 8 Summation",     icon: "🔢", cat: "math" },
  { id: "m12", label: "Dice Probability",       icon: "🎲", cat: "prob" },
  { id: "m13", label: "13 / Exam PDF Viewer",        icon: <FileText size={16} />, cat: "docs" },
];

/* ═══════════════════════════════════════════════
   Shared UI Components
   ═══════════════════════════════════════════════ */

function CodeBlock({ children, title }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "14px 0" }}>
      {title && (
        <div style={{ fontSize: 10, fontFamily: F.mono, color: C.text3, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>
          {title}
        </div>
      )}
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
        <button
          onClick={handleCopy}
          style={{
            position: "absolute", top: 10, right: 10, zIndex: 2,
            display: "flex", alignItems: "center", gap: 4,
            padding: "5px 10px", borderRadius: 6,
            background: C.surface2, border: `1px solid ${C.borderL}`,
            color: copied ? C.teal : C.text3, cursor: "pointer",
            fontSize: 11, fontFamily: F.mono,
            transition: "all .2s",
          }}
        >
          {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre style={{
          margin: 0, padding: "20px 24px",
          background: C.bgEl, color: "#D6DEEB",
          fontFamily: F.mono, fontSize: 13, lineHeight: 1.7,
          overflowX: "auto", whiteSpace: "pre-wrap",
        }}>
          {children}
        </pre>
      </div>
    </div>
  );
}

function AnswerBadge({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 16px", borderRadius: 9999, margin: "12px 0",
      background: C.tealDim, border: `1px solid ${C.tealBorder}`,
      color: C.teal, fontSize: 13, fontFamily: F.mono, fontWeight: 500,
    }}>
      <Check size={14} strokeWidth={3} /> {children}
    </div>
  );
}

function StepList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0" }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          padding: "10px 14px", borderRadius: 10,
          background: C.surface, border: `1px solid ${C.border}`,
          fontSize: 13, color: C.text, lineHeight: 1.6,
        }}>
          <span style={{
            flexShrink: 0, width: 24, height: 24, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: C.amberDim, border: `1px solid ${C.amberBorder}`,
            color: C.amber, fontSize: 11, fontFamily: F.mono, fontWeight: 600,
          }}>
            {i + 1}
          </span>
          <span style={{ paddingTop: 2 }}>{it}</span>
        </div>
      ))}
    </div>
  );
}

function SubCard({ title, children, accentColor }) {
  const ac = accentColor || C.teal;
  return (
    <div style={{
      borderRadius: 14, padding: "20px 22px", margin: "16px 0",
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${ac}`,
    }}>
      {title && (
        <h4 style={{
          fontSize: 11, fontFamily: F.mono, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: ".12em",
          color: ac, marginBottom: 12,
        }}>
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

function SvgWrap({ children, maxWidth }) {
  return (
    <div style={{
      borderRadius: 12, padding: 20, overflowX: "auto", margin: "14px 0",
      background: C.bgEl, border: `1px solid ${C.border}`,
      maxWidth: maxWidth || "none",
    }}>
      {children}
    </div>
  );
}

function renderTriangle(n) {
  const clamped = Math.max(1, Math.min(12, n || 1));
  let out = "";
  for (let i = 0; i < clamped; i++) {
    out += "  ".repeat(i) + "* ".repeat(2 * (clamped - i) - 1) + "\n";
  }
  return out;
}

/* ═══════════════════════════════════════════════
   Module Content Renderers
   ═══════════════════════════════════════════════ */
function M1Content() {
  return <RecipePage />;
}

function M4Content() {
  return <SQLViewer />;
}

function M6Content() {
  return <BookstoreFlow />;
}

function M7Content() {
  return <WaterTank />;
}

function M8Content() {
  return <TriangleGenerator />;
}

function M13Content() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
        <p style={{ color: C.text2, fontSize: 14, margin: 0 }}>
          Here is the provided exam PDF. You can read it directly below or download it to your device.
        </p>
        <a 
          href="/exam-2568.pdf" 
          download
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 8,
            background: `linear-gradient(135deg, ${C.amber}, #E8874A)`,
            color: C.bg, fontSize: 13, fontFamily: F.display, fontWeight: 600,
            textDecoration: "none", transition: "transform 0.15s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = ""}
        >
          <Download size={14} /> Download PDF
        </a>
      </div>
      
      <div style={{ 
        width: "100%", height: "70vh", minHeight: 600, 
        borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`,
        background: C.surface 
      }}>
        <iframe 
          src="/exam-2568.pdf" 
          width="100%" 
          height="100%" 
          style={{ border: "none" }}
          title="Exam PDF Viewer"
        />
      </div>
    </>
  );
}

function M9Content() {
  return (
    <>
      <p style={{ color: C.text2, fontSize: 14, marginBottom: 16 }}>
        Probability calculations utilizing set theory for user demographics analytics.
      </p>
      <SvgWrap maxWidth={460}>
        <svg viewBox="0 0 460 260" width="100%">
          <rect x="10" y="10" width="440" height="240" rx="10" fill="none" stroke={C.border} />
          <circle cx="185" cy="130" r="90" fill={C.amber} fillOpacity="0.18" stroke={C.amber} />
          <circle cx="275" cy="130" r="90" fill={C.teal} fillOpacity="0.18" stroke={C.teal} />
          <text x="140" y="130" textAnchor="middle" fontSize="20" fill={C.amber} fontWeight="700">13</text>
          <text x="230" y="130" textAnchor="middle" fontSize="20" fill={C.text} fontWeight="700">5</text>
          <text x="320" y="130" textAnchor="middle" fontSize="20" fill={C.teal} fontWeight="700">10</text>
          <text x="140" y="60" textAnchor="middle" fontSize="12" fill={C.amber}>Group A</text>
          <text x="320" y="60" textAnchor="middle" fontSize="12" fill={C.teal}>Group B</text>
          <text x="230" y="235" textAnchor="middle" fontSize="12" fill={C.text3}>Excluded = 12 (Outside Set)</text>
        </svg>
      </SvgWrap>
      <StepList items={[
        "Total active members = 40 − 12 = 28",
        "|A∪B| = |A| + |B| − |A∩B| → 28 = 18 + 15 − |A∩B| → Intersection = 5",
        "Strictly Group B = 15 − 5 = 10",
      ]} />
      <AnswerBadge>Probability = 10/40 = 0.25</AnswerBadge>
    </>
  );
}

function M10Content() {
  return (
    <>
      <p style={{ color: C.text2, fontSize: 14, marginBottom: 16 }}>
        Combinatorics engine testing variations in constrained basket models.
      </p>
      <StepList items={[
        "Constraint calculations yield: Items[x]=3, Items[y]=6, Items[z]=1",
        "Total combinatorics space = C(10,3) = 120 possible states",
        "Optimal combinations matching criteria = C(6,1)×C(3,1)×C(1,1) = 18",
      ]} />
      <AnswerBadge>P = 18/120 = 0.15</AnswerBadge>
    </>
  );
}

function M11Content() {
  return (
    <>
      <p style={{ color: C.text2, fontSize: 14, marginBottom: 16 }}>
        Algorithmic numeric sequence resolution based on a fixed integer constraint.
      </p>
      <div style={{
        textAlign: "center", padding: "32px 20px", borderRadius: 14,
        background: `linear-gradient(135deg, ${C.surface} 0%, ${C.surface2} 100%)`,
        border: `1px solid ${C.border}`,
        margin: "16px 0",
      }}>
        <div style={{ fontSize: 28, fontFamily: F.mono, fontWeight: 600, color: C.teal, letterSpacing: 2 }}>
          888 + 88 + 8 + 8 + 8 = 1000
        </div>
      </div>
    </>
  );
}

function M12Content() {
  return (
    <>
      <p style={{ color: C.text2, fontSize: 14, marginBottom: 16 }}>
        Randomized state machine testing modeling a dual 6-axis die roll.
      </p>
      <p style={{ fontSize: 13, color: C.text }}>State Space = 6 × 6 = 36 iterations</p>

      <SubCard title="Target A: Sum = 10">
        <p style={{ fontSize: 13, color: C.text, marginBottom: 8 }}>
          Valid pairs: (4,6) (5,5) (6,4) → 3 states
        </p>
        <AnswerBadge>P = 3/36 = 1/12</AnswerBadge>
      </SubCard>

      <SubCard title="Target B: Difference = 2">
        <p style={{ fontSize: 13, color: C.text, marginBottom: 8 }}>
          Valid pairs: (1,3)(3,1)(2,4)(4,2)(3,5)(5,3)(4,6)(6,4) → 8 states
        </p>
        <AnswerBadge>P = 8/36 = 2/9</AnswerBadge>
      </SubCard>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Main App Component (with Sidebar)
   ═══════════════════════════════════════════════ */
export default function DevDashboard() {
  const [activeId, setActiveId] = useState("m1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeM = MODULES.find(m => m.id === activeId);

  const renderContent = () => {
    switch (activeId) {
      case "m1":  return <M1Content />;
      case "m4":  return <M4Content />;
      case "m6":  return <M6Content />;
      case "m7":  return <M7Content />;
      case "m8":  return <M8Content />;
      case "m9":  return <M9Content />;
      case "m10": return <M10Content />;
      case "m11": return <M11Content />;
      case "m12": return <M12Content />;
      case "m13": return <M13Content />;
      default:    return null;
    }
  };

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: F.body, minHeight: "100vh" }}>
      <link rel="stylesheet" href={FONT_LINK} />

      {/* ── Mobile Top Header ── */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-5 py-4 border-b"
           style={{ background: `rgba(11, 15, 25, 0.85)`, backdropFilter: "blur(12px)", borderColor: C.border }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, boxShadow: `0 0 10px ${C.teal}` }} />
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 14 }}>APPINTOUCH</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          style={{ background: "none", border: "none", color: C.text, fontSize: 24 }}
        >
          ☰
        </button>
      </div>

      <div style={{ display: "flex", width: "100%", maxWidth: 1600, margin: "0 auto", padding: "16px 24px 32px" }}>
        
        {/* ── Left Nav ── */}
        <Sidebar 
          questions={MODULES} 
          activeId={activeId} 
          onSelect={(id) => { setActiveId(id); setIsSidebarOpen(false); }} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* ── Main Dashboard Area ── */}
        <main className="flex-1 min-w-0 md:ml-8 pb-16 pt-4 md:pt-0">
          <div
            key={activeId}
            className="animate-slide"
            style={{
              borderRadius: 18,
              padding: "24px",
              background: `linear-gradient(135deg, ${C.surface} 0%, ${C.bgEl} 100%)`,
              border: `1px solid ${C.border}`,
              boxShadow: "0 4px 30px rgba(0,0,0,.2)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, flexShrink: 0,
                background: C.amberDim, border: `1px solid ${C.amberBorder}`,
              }}>
                {activeM?.icon}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, fontFamily: F.mono, color: C.amber, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.1em" }}>
                    {activeM?.cat}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: F.display, fontWeight: 600, fontSize: "clamp(20px, 3vw, 24px)",
                  marginTop: 6, lineHeight: 1.3,
                }}>
                  {activeM?.label}
                </h2>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: C.border, margin: "0 -24px 28px", }} />

            {/* Content Module */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}