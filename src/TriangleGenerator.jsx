import React, { useState, useMemo } from 'react';
import { Terminal, AlignCenter, Code2 } from 'lucide-react';

/* ── Typography & Colors ── */
const C = {
  bg: "#0B0F19", surface: "#161D2F", surface2: "#1C2540", border: "#232E47",
  text: "#E8ECF4", text2: "#A0AABE", text3: "#6B7A94", 
  accent: "#10B981"
};
const F = { sans: "'IBM Plex Sans Thai', sans-serif", mono: "'IBM Plex Mono', monospace" };

export default function TriangleGenerator() {
  const [rows, setRows] = useState(7);

  const triangleText = useMemo(() => {
    const n = Math.max(1, Math.min(15, rows || 1));
    let out = "";
    for (let i = 0; i < n; i++) {
      out += "  ".repeat(i) + "* ".repeat(2 * (n - i) - 1) + "\n";
    }
    return out;
  }, [rows]);

  return (
    <div className="animate-fade-up" style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
      
      {/* Left side: Controls */}
      <div style={{ flex: "1 1 300px" }}>
        <p style={{ color: C.text2, fontSize: 14, marginBottom: 24, lineHeight: 1.6, fontFamily: F.sans }}>
          โปรแกรมสร้างรูปสามเหลี่ยมกลับด้านแบบสมมาตร (Symmetric Inverted Triangle) โดยรับค่าตัวเลข 1 ตัวเป็นจำนวนแถว
        </p>

        <div style={{ background: C.surface, padding: 24, borderRadius: 16, border: "1px solid " + C.border, marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 12, color: C.text, fontFamily: F.sans, fontSize: 14 }}>
            จำนวนแถว (Rows)
          </label>
          <input
            type="number"
            min="1" max="15"
            value={rows}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRows(isNaN(val) ? "" : val);
            }}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 8,
              background: "#080B12", border: "1px solid " + C.border, color: C.text,
              fontFamily: F.sans, fontSize: 14, outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s"
            }}
            onFocus={e => e.target.style.borderColor = C.accent}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>

        <div style={{ background: C.surface, padding: 24, borderRadius: 16, border: "1px solid " + C.border }}>
          <h3 style={{ margin: "0 0 16px", color: C.text, fontFamily: F.sans, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Code2 size={18} color={C.accent} /> Example Code (JS)
          </h3>
          <pre style={{
            margin: 0, padding: 16, borderRadius: 12, background: "#080B12",
            color: "#A0AABE", fontSize: 12, fontFamily: F.mono, border: "1px solid " + C.border,
            overflowX: "auto"
          }}>
{`function drawTriangle(n) {
  for (let i = 0; i < n; i++) {
    const spaces = "  ".repeat(i);
    const stars = "* ".repeat(2 * (n - i) - 1);
    console.log(spaces + stars);
  }
}`}
          </pre>
        </div>
      </div>

      {/* Right side: Terminal Output */}
      <div style={{ flex: "1 1 400px" }}>
        <div style={{ 
          background: "#080B12", borderRadius: 16, border: "1px solid " + C.border,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)", overflow: "hidden"
        }}>
          {/* Terminal Header */}
          <div style={{ padding: "12px 16px", background: C.surface2, borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
            </div>
            <div style={{ flex: 1, textAlign: "center", color: C.text3, fontSize: 12, fontFamily: F.sans, fontWeight: 500, letterSpacing: "0.5px" }}>
              <Terminal size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> Output Console
            </div>
          </div>
          
          {/* Terminal Body */}
          <div style={{ padding: 24, minHeight: 300, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <pre style={{
              margin: 0,
              color: C.accent, fontFamily: F.mono, fontSize: "clamp(12px, 1.5vw, 16px)", 
              lineHeight: 1.2, whiteSpace: "pre", textShadow: "0 0 10px rgba(16, 185, 129, 0.4)",
              transition: "all 0.2s"
            }}>
              {triangleText}
            </pre>
          </div>
        </div>
      </div>

    </div>
  );
}
