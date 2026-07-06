import React, { useState, useEffect } from 'react';
import { Droplet, FastForward, RotateCcw } from 'lucide-react';

/* ── Typography & Colors ── */
const C = {
  bg: "#0B0F19", surface: "#161D2F", surface2: "#1C2540", border: "#232E47",
  text: "#E8ECF4", text2: "#A0AABE", text3: "#6B7A94", 
  water: "#38BDF8", waterDark: "#0284C7",
  accent: "#F472B6"
};
const F = { sans: "'IBM Plex Sans Thai', sans-serif", mono: "'IBM Plex Mono', monospace" };

export default function WaterTank() {
  const INITIAL_VOLUME = 5832;
  const [days, setDays] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate current volume: y = 5832 * (2/3)^x
  const currentVolume = INITIAL_VOLUME * Math.pow(2 / 3, days);
  const percentage = (currentVolume / INITIAL_VOLUME) * 100;

  useEffect(() => {
    let timer;
    if (isPlaying && days < 14) { // Cap at 14 days for animation
      timer = setTimeout(() => {
        setDays(prev => prev + 1);
      }, 800); // 800ms per day
    } else if (isPlaying && days >= 14) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, days]);

  const handleReset = () => {
    setIsPlaying(false);
    setDays(0);
  };

  const handlePlay = () => {
    if (days >= 14) setDays(0);
    setIsPlaying(true);
  };

  return (
    <div style={{ width: "100%", display: "flex", gap: 32, flexWrap: "wrap" }}>
      
      {/* Left side: Formula & Controls */}
      <div style={{ flex: "1 1 300px" }}>
        <p style={{ color: C.text2, fontSize: 14, marginBottom: 24, lineHeight: 1.6, fontFamily: F.sans }}>
          จำลองการใช้น้ำจากถังความจุ 5,832 ลิตร โดยแต่ละวันจะถูกนำไปใช้ 1/3 ของปริมาณที่เหลืออยู่
        </p>

        <div style={{ background: C.surface, padding: 24, borderRadius: 16, border: "1px solid " + C.border, marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px", color: C.text, fontFamily: F.sans, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <Droplet size={18} color={C.water} /> Mathematical Model
          </h3>
          <div style={{ background: "#0A0D14", padding: 16, borderRadius: 12, border: "1px solid " + C.border, fontFamily: F.mono, color: C.accent, fontSize: 14, textAlign: "center", letterSpacing: "1px" }}>
            y = 5832 × (2/3)<sup style={{ fontSize: 10 }}>x</sup>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 13, color: C.text2, fontFamily: F.mono }}>
            <span>x = Days</span>
            <span>y = Remaining Volume (L)</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ background: C.surface, padding: 24, borderRadius: 16, border: "1px solid " + C.border }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ color: C.text2, fontSize: 13, fontFamily: F.sans }}>Day (x)</span>
            <span style={{ color: C.text, fontSize: 18, fontFamily: F.mono, fontWeight: 600 }}>{days}</span>
          </div>
          <input 
            type="range" 
            min="0" max="14" 
            value={days} 
            onChange={e => { setIsPlaying(false); setDays(Number(e.target.value)); }}
            style={{ width: "100%", cursor: "pointer", marginBottom: 24 }}
          />

          <div style={{ display: "flex", gap: 12 }}>
            <button 
              onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
              style={{
                flex: 1, padding: "12px", borderRadius: 8, border: "none", cursor: "pointer",
                background: isPlaying ? C.surface2 : C.waterDark, color: "white",
                display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
                fontFamily: F.sans, fontWeight: 600
              }}
            >
              {isPlaying ? "Pause" : <><FastForward size={16} /> Auto Play</>}
            </button>
            <button 
              onClick={handleReset}
              style={{
                padding: "12px", borderRadius: 8, border: "1px solid " + C.border, cursor: "pointer",
                background: "transparent", color: C.text2, display: "flex", justifyContent: "center", alignItems: "center"
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Visual Tank */}
      <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Value Display */}
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 14, color: C.text2, fontFamily: F.sans, marginBottom: 4 }}>Remaining Water (y)</div>
          <div style={{ fontSize: 36, color: C.water, fontFamily: F.mono, fontWeight: 700 }}>
            {currentVolume.toFixed(2)} <span style={{ fontSize: 16, color: C.text3 }}>L</span>
          </div>
        </div>

        {/* 3D Tank CSS */}
        <div style={{
          position: "relative",
          width: 200, height: 300,
          background: "rgba(255,255,255,0.02)",
          border: "4px solid " + C.border,
          borderRadius: "16px 16px 24px 24px",
          overflow: "hidden",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)"
        }}>
          {/* Water Fill */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: percentage + "%",
            background: "linear-gradient(to top, " + C.waterDark + " 0%, " + C.water + " 100%)",
            transition: "height 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
            boxShadow: "0 -4px 12px rgba(56, 189, 248, 0.4)"
          }}>
            {/* Water Surface reflection */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 6,
              background: "rgba(255,255,255,0.3)", borderRadius: "50%"
            }} />
          </div>
          
          {/* Measurement Marks */}
          <div style={{ position: "absolute", top: "25%", right: 0, width: 10, borderBottom: "2px solid " + C.border }} />
          <div style={{ position: "absolute", top: "50%", right: 0, width: 20, borderBottom: "2px solid " + C.border }} />
          <div style={{ position: "absolute", top: "75%", right: 0, width: 10, borderBottom: "2px solid " + C.border }} />
        </div>
        
      </div>
    </div>
  );
}
