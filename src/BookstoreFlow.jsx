import React, { useState } from 'react';
import { User, GraduationCap, Store, Upload, Check, Image as ImageIcon, FileText, ArrowRight, Database } from 'lucide-react';

/* ── Typography & Colors ── */
const C = {
  bg: "#0B0F19", surface: "#161D2F", surface2: "#1C2540", border: "#232E47",
  text: "#E8ECF4", text2: "#A0AABE", text3: "#6B7A94", 
  accent: "#8B5CF6", accentDim: "rgba(139, 92, 246, 0.15)",
  success: "#10B981"
};
const F = { sans: "'IBM Plex Sans Thai', sans-serif", mono: "'IBM Plex Mono', monospace" };

/* ── Components ── */
const Input = ({ label, type = "text", placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: C.text2, fontFamily: F.sans }}>{label}</label>
    <input 
      type={type} placeholder={placeholder} 
      style={{
        width: "100%", padding: "10px 14px", borderRadius: 8,
        background: "#080B12", border: "1px solid " + C.border, color: C.text,
        fontFamily: F.sans, fontSize: 14, outline: "none", boxSizing: "border-box"
      }}
      onFocus={e => e.target.style.borderColor = C.accent}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const FileUpload = ({ label }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: C.text2, fontFamily: F.sans }}>{label}</label>
    <div style={{
      width: "100%", padding: "20px", borderRadius: 8, border: "2px dashed " + C.border,
      background: "#080B12", display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      cursor: "pointer", color: C.text3, transition: "all 0.2s"
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text3; }}
    >
      <Upload size={24} />
      <span style={{ fontSize: 13, fontFamily: F.sans }}>Click to upload or drag and drop</span>
    </div>
  </div>
);

/* ── Registration Form ── */
function RegistrationForm() {
  const [memberType, setMemberType] = useState('general');

  const types = [
    { id: 'general', label: 'บุคคลทั่วไป (General)', icon: <User size={18} /> },
    { id: 'student', label: 'นักเรียน/นักศึกษา (Student)', icon: <GraduationCap size={18} /> },
    { id: 'shop', label: 'ร้านค้า (Shop)', icon: <Store size={18} /> }
  ];

  return (
    <div className="animate-fade-up" style={{ maxWidth: 600, margin: "0 auto", background: C.surface, padding: 32, borderRadius: 20, border: "1px solid " + C.border }}>
      <h2 style={{ fontFamily: F.sans, fontSize: 24, margin: "0 0 24px", color: C.text, textAlign: "center" }}>สมัครสมาชิก (Bookstore)</h2>
      
      {/* Type Selector */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {types.map(t => (
          <button
            key={t.id} onClick={() => setMemberType(t.id)}
            style={{
              flex: 1, padding: "12px", borderRadius: 12, border: "1px solid " + (memberType === t.id ? C.accent : C.border),
              background: memberType === t.id ? C.accentDim : C.surface2,
              color: memberType === t.id ? C.accent : C.text2,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {t.icon}
            <span style={{ fontSize: 12, fontFamily: F.sans, fontWeight: 500 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Fields */}
      <div className="animate-fade" key={memberType}>
        {memberType === 'general' && (
          <>
            <Input label="ชื่อ-นามสกุล (Full Name)" placeholder="นายใจดี มีสุข" />
            <Input label="รหัสบัตรประชาชน (ID Card)" placeholder="1-2345-67890-12-3" />
            <Input label="อีเมล (Email)" type="email" placeholder="email@example.com" />
            <Input label="วันเกิด (Date of Birth)" type="date" />
            <Input label="หมายเลขโทรศัพท์ (Phone)" placeholder="08X-XXX-XXXX" />
          </>
        )}
        
        {memberType === 'student' && (
          <>
            <Input label="ชื่อ-นามสกุล (Full Name)" placeholder="นายขยัน เรียนเก่ง" />
            <Input label="ชื่อสถานศึกษา (School/University)" placeholder="มหาวิทยาลัย..." />
            <Input label="รหัสประจำตัวนักศึกษา (Student ID)" placeholder="64XXXXXXX" />
            <FileUpload label="แนบรูปภาพบัตรนักศึกษา (Student Card Image)" />
            <Input label="วันหมดอายุของบัตร (Card Expiry)" type="date" />
            <Input label="อีเมล (Email)" type="email" placeholder="student@university.ac.th" />
            <Input label="วันเกิด (Date of Birth)" type="date" />
            <Input label="หมายเลขโทรศัพท์ (Phone)" placeholder="08X-XXX-XXXX" />
          </>
        )}

        {memberType === 'shop' && (
          <>
            <Input label="ชื่อผู้ประกอบการ (Entrepreneur Name)" placeholder="นายพาณิชย์ ค้าขาย" />
            <Input label="ชื่อสถานประกอบการ (Shop Name)" placeholder="ร้านหนังสือใจดี" />
            <Input label="เลขทะเบียนนิติบุคคล (Registration Number)" placeholder="010XXXXXXXXXX" />
            <FileUpload label="แนบเอกสารนิติบุคคล (Registration Document)" />
            <Input label="อีเมล (Email)" type="email" placeholder="contact@shop.com" />
            <Input label="หมายเลขโทรศัพท์ (Phone)" placeholder="02-XXX-XXXX" />
          </>
        )}
      </div>

      <button style={{
        width: "100%", padding: "14px", marginTop: 16, borderRadius: 10, border: "none",
        background: C.accent, color: "white", fontFamily: F.sans, fontSize: 16, fontWeight: 600,
        cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8
      }}>
        สมัครสมาชิก <ArrowRight size={18} />
      </button>
    </div>
  );
}


/* ── Main Component ── */
export default function BookstoreFlow() {
  return (
    <div style={{ width: "100%" }}>
      <p style={{ color: C.text2, fontSize: 14, marginBottom: 24, lineHeight: 1.6, fontFamily: F.sans }}>
        ระบบรับสมัครสมาชิกและการจัดการฐานข้อมูล E-commerce สำหรับร้านขายหนังสือออนไลน์ (รองรับ 3 ประเภทผู้ใช้งาน)
      </p>

      <RegistrationForm />
    </div>
  );
}
