import React, { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0F1219",
  surface: "#171B26",
  surface2: "#1E2432",
  border: "#2A3040",
  borderGlow: "#3A4560",
  text: "#E9EBF2",
  textDim: "#8C93A8",
  amber: "#F2A93B",
  amberGlow: "rgba(242,169,59,.15)",
  teal: "#4FD1C5",
};

const FONT_MONO = "'IBM Plex Mono',monospace";
const FONT_BODY = "'IBM Plex Sans Thai',sans-serif";

const STYLE_ID = "__sidebar-styles__";
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const sheet = document.createElement("style");
  sheet.id = STYLE_ID;
  sheet.textContent = [
    ".sidebar-nav { scrollbar-width: thin; scrollbar-color: " + COLORS.border + " transparent; }",
    ".sidebar-nav::-webkit-scrollbar { width: 4px; }",
    ".sidebar-nav::-webkit-scrollbar-track { background: transparent; }",
    ".sidebar-nav::-webkit-scrollbar-thumb { background: " + COLORS.border + "; border-radius: 4px; }",
    ".sidebar-nav::-webkit-scrollbar-thumb:hover { background: " + COLORS.borderGlow + "; }",
    "@keyframes sidebar-pulse { 0%, 100% { opacity: .6; } 50% { opacity: 1; } }",
    "@keyframes sidebar-slide-in { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }",
    ".sidebar-item { position: relative; transition: all .25s cubic-bezier(.4,0,.2,1); }",
    ".sidebar-item:hover { background: " + COLORS.surface2 + " !important; transform: translateX(2px); }",
    ".sidebar-item:active { transform: translateX(1px) scale(.98); }",
  ].join("\n");
  document.head.appendChild(sheet);
}

export default function Sidebar({ questions, activeId, onSelect, isOpen, onClose }) {
  const navRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    if (!navRef.current || !activeId) return;
    const el = navRef.current.querySelector("[data-qid='" + activeId + "']");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  return (
    <React.Fragment>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <nav
        ref={navRef}
        className={`sidebar-nav flex flex-col w-64 flex-shrink-0 fixed md:sticky top-0 md:top-14 left-0 self-start z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          height: "100vh",
          overflowY: "auto",
          background: "linear-gradient(180deg, " + COLORS.surface + " 0%, " + COLORS.bg + " 100%)",
          borderRight: "1px solid " + COLORS.border,
          maxHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 20px 16px",
            borderBottom: "1px solid " + COLORS.border,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: COLORS.teal,
                boxShadow: "0 0 8px " + COLORS.teal,
                animation: "sidebar-pulse 2.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 11, fontFamily: FONT_MONO, color: COLORS.textDim,
                textTransform: "uppercase", letterSpacing: "0.18em",
              }}
            >
              MODULES
            </span>
          </div>
          <button
            className="md:hidden"
            onClick={onClose}
            style={{ background: "none", border: "none", color: COLORS.textDim, fontSize: 18, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* Module List */}
        <div style={{ padding: "12px 10px 24px", flex: 1 }}>
          {questions.map(function(q, idx) {
            var isActive = activeId === q.id;
            var isHovered = hoveredId === q.id;
            return (
              <button
                key={q.id}
                data-qid={q.id}
                onClick={function() { onSelect(q.id); }}
                onMouseEnter={function() { setHoveredId(q.id); }}
                onMouseLeave={function() { setHoveredId(null); }}
                className="sidebar-item"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left",
                  padding: "10px 12px",
                  marginBottom: 2,
                  borderRadius: 10,
                  fontSize: 13,
                  fontFamily: FONT_BODY,
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  color: isActive ? COLORS.text : COLORS.textDim,
                  background: isActive ? COLORS.amberGlow : "transparent",
                  animationName: idx < 12 ? "sidebar-slide-in" : "none",
                  animationDuration: ".35s",
                  animationDelay: (idx * 0.04) + "s",
                  animationFillMode: "both",
                }}
              >
                {/* Active indicator bar */}
                <span
                  style={{
                    position: "absolute", left: 0, top: "50%",
                    transform: "translateY(-50%)", width: 3,
                    height: isActive ? 20 : 0, borderRadius: "0 3px 3px 0",
                    background: "linear-gradient(180deg, " + COLORS.amber + ", #E8874A)",
                    transition: "height .3s cubic-bezier(.4,0,.2,1)",
                    boxShadow: isActive ? "0 0 8px " + COLORS.amber : "none",
                  }}
                />

                {/* Icon badge */}
                <span
                  style={{
                    flexShrink: 0, width: 30, height: 30, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14,
                    color: isActive ? COLORS.bg : COLORS.textDim,
                    background: isActive
                      ? "linear-gradient(135deg, " + COLORS.amber + ", #E8874A)"
                      : isHovered ? COLORS.surface2 : COLORS.surface,
                    border: "1px solid " + (isActive ? "transparent" : isHovered ? COLORS.borderGlow : COLORS.border),
                    transition: "all .25s ease",
                    boxShadow: isActive ? "0 2px 8px rgba(242,169,59,.3)" : "none",
                  }}
                >
                  {q.icon}
                </span>

                {/* Label */}
                <span
                  style={{
                    flex: 1, overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: isActive ? 500 : 400,
                    transition: "color .25s ease",
                  }}
                >
                  {q.label}
                </span>

                {isActive && (
                  <span style={{ fontSize: 14, color: COLORS.amber, opacity: 0.7 }}>
                    ›
                  </span>
                )}
              </button>
            );
          })}
        </div>


      </nav>
    </React.Fragment>
  );
}