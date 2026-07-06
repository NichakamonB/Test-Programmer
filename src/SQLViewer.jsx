import React, { useState } from 'react';
import { Database, Image as ImageIcon } from 'lucide-react';

/* ── Colors ── */
const C = {
  bg: "#0B0F19", surface: "#161D2F", surface2: "#1C2540", border: "#232E47",
  text: "#E8ECF4", text2: "#A0AABE", text3: "#6B7A94",
  blue: "#4D96FF"
};
const F = { sans: "'IBM Plex Sans Thai', sans-serif" };

export default function SQLViewer() {
  const [activeTab, setActiveTab] = useState("q4");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, animate: "fade-up" }}>
      
      <p style={{ color: C.text2, fontSize: 14, margin: 0, fontFamily: F.sans, lineHeight: 1.6 }}>
        แสดงผลลัพธ์การ Query ฐานข้อมูล (ข้อ 4 และ 5) ตามรูปภาพที่กำหนด
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => setActiveTab("q4")}
          style={{
            flex: 1, padding: "16px", borderRadius: 12, cursor: "pointer", border: "none",
            background: activeTab === "q4" ? C.blue : C.surface,
            color: activeTab === "q4" ? "#fff" : C.text2,
            fontFamily: F.sans, fontSize: 15, fontWeight: 600,
            display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
            transition: "all 0.2s"
          }}
        >
          <ImageIcon size={18} /> รูปผลลัพธ์ ข้อ 4 (SELECT &gt; 500,000)
        </button>
        <button
          onClick={() => setActiveTab("q5")}
          style={{
            flex: 1, padding: "16px", borderRadius: 12, cursor: "pointer", border: "none",
            background: activeTab === "q5" ? C.blue : C.surface,
            color: activeTab === "q5" ? "#fff" : C.text2,
            fontFamily: F.sans, fontSize: 15, fontWeight: 600,
            display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
            transition: "all 0.2s"
          }}
        >
          <ImageIcon size={18} /> รูปผลลัพธ์ ข้อ 5 (LEFT JOIN)
        </button>
      </div>

      {/* Image Display */}
      <div style={{ 
        background: C.surface, padding: 16, borderRadius: 16, border: "1px solid " + C.border,
        display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400
      }}>
        {activeTab === "q4" && (
          <img 
            src="/q4.png" 
            alt="Result Q4" 
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} 
          />
        )}
        {activeTab === "q5" && (
          <img 
            src="/q5.png" 
            alt="Result Q5" 
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} 
          />
        )}
      </div>

    </div>
  );
}
