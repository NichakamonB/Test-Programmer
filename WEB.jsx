import React, { useState, useEffect, useRef, useMemo } from "react";
import { Check, ExternalLink, ChevronRight } from "lucide-react";
import RecipePage from "./RecipePage";
import Sidebar from "./Sidebar";

const COLORS = {
  bg: "#0F1219",
  surface: "#171B26",
  surface2: "#1E2432",
  border: "#2A3040",
  text: "#E9EBF2",
  textDim: "#8C93A8",
  amber: "#F2A93B",
  teal: "#4FD1C5",
  pen: "#EF6F5B",
};

const FONT_DISPLAY = "'Bai Jamjuree','IBM Plex Sans Thai',sans-serif";
const FONT_BODY = "'IBM Plex Sans Thai',sans-serif";
const FONT_MONO = "'IBM Plex Mono',monospace";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";



const QUESTIONS = [
  { id: "q1", num: "1–3", label: "หน้าเว็บ Recipe" },
  { id: "q4", num: "4", label: "SQL: Used > 500k" },
  { id: "q5", num: "5", label: "SQL: LEFT JOIN" },
  { id: "q6", num: "6", label: "ระบบขายหนังสือ" },
  { id: "q7", num: "7", label: "ฟังก์ชันน้ำในถัง" },
  { id: "q8", num: "8", label: "สามเหลี่ยมกลับด้าน" },
  { id: "q9", num: "9", label: "ความน่าจะเป็น: กีฬา" },
  { id: "q10", num: "10", label: "ความน่าจะเป็น: ผลไม้" },
  { id: "q11", num: "11", label: "บวกเลข 8" },
  { id: "q12", num: "12", label: "ทอดลูกเต๋า" },
];

function Card({ title, children }) {
  return (
    <div
      className="rounded-lg p-5 my-4"
      style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
    >
      {title && (
        <h4
          className="text-xs uppercase tracking-wider mb-2 font-medium"
          style={{ color: COLORS.teal, fontFamily: FONT_MONO }}
        >
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

function AnswerTag({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full my-2 text-sm"
      style={{
        background: "rgba(79,209,197,.1)",
        color: COLORS.teal,
        border: "1px solid rgba(79,209,197,.3)",
        fontFamily: FONT_MONO,
      }}
    >
      <Check size={14} /> {children}
    </div>
  );
}

function Pre({ children }) {
  return (
    <pre
      className="rounded-lg p-4 overflow-x-auto text-sm my-3 whitespace-pre-wrap"
      style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: "#D6DEEB", fontFamily: FONT_MONO }}
    >
      {children}
    </pre>
  );
}

function Steps({ items }) {
  return (
    <ul className="list-none p-0 m-0">
      {items.map((it, i) => (
        <li key={i} className="relative pl-6 py-1.5 text-sm" style={{ color: COLORS.text }}>
          <span className="absolute left-0" style={{ color: COLORS.amber }}>→</span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function QHead({ badge, title, prompt }) {
  return (
    <div className="flex items-start gap-4 mb-4">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold"
        style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.amber, fontFamily: FONT_MONO }}
      >
        {badge}
      </div>
      <div className="min-w-0">
        <h2 className="text-lg mt-0.5" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY, fontWeight: 600 }}>
          {title}
        </h2>
        <div
          className="text-sm mt-1.5 px-3 py-2 rounded-lg"
          style={{ color: COLORS.textDim, background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        >
          {prompt}
        </div>
      </div>
    </div>
  );
}

function SvgWrap({ children, maxWidth }) {
  return (
    <div
      className="rounded-lg p-4 overflow-x-auto"
      style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, maxWidth: maxWidth || "none" }}
    >
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



export default function ExamAnswers() {
  const [triN, setTriN] = useState(7);
  const [activeId, setActiveId] = useState("q1");
  const [showRecipePage, setShowRecipePage] = useState(false);
  const sectionRefs = useRef({});

  const triangleText = useMemo(() => renderTriangle(triN), [triN]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── If Recipe page is open, render it full-screen ── */
  if (showRecipePage) {
    return <RecipePage onBack={() => setShowRecipePage(false)} />;
  }

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: FONT_BODY, fontWeight: 300, minHeight: "100vh" }}>
      <link rel="stylesheet" href={FONT_LINK} />

      {/* Topbar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5"
        style={{ background: "rgba(15,18,25,.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="flex items-center gap-2.5 text-sm font-bold" style={{ fontFamily: FONT_DISPLAY }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.teal, boxShadow: `0 0 12px ${COLORS.teal}` }} />
          APPINTOUCH · ข้อสอบโปรแกรมเมอร์
        </div>
        <div className="text-xs" style={{ color: COLORS.textDim, fontFamily: FONT_MONO }}>V1.4.0 · 11 ต.ค. 2568</div>
      </div>

      {/* Hero */}
      <div className="px-6 pt-16 pb-10 max-w-3xl" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <span
          className="block text-xs uppercase tracking-widest mb-3.5"
          style={{ color: COLORS.amber, fontFamily: FONT_MONO }}
        >
          Answer Key / เฉลยฉบับสมบูรณ์
        </span>
        <h1 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}>
          เฉลยข้อสอบโปรแกรมเมอร์<br />ครบทั้ง 12 ข้อ
        </h1>
        <p className="text-sm mb-5 max-w-xl" style={{ color: COLORS.textDim }}>
          รวมคำตอบ วิธีคิด และโค้ดตัวอย่างของทุกข้อ ตั้งแต่ frontend, SQL, ER diagram,
          โจทย์คณิตศาสตร์ ไปจนถึงความน่าจะเป็น พร้อมตัวอย่างที่รันจริงแล้ว
        </p>
        <div className="flex flex-wrap gap-1.5">
          {QUESTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => scrollTo(q.id)}
              className="w-8 h-8 rounded-md flex items-center justify-center text-xs transition-transform hover:-translate-y-0.5"
              style={{
                background: activeId === q.id ? COLORS.surface2 : COLORS.surface,
                border: `1px solid ${activeId === q.id ? COLORS.amber : COLORS.border}`,
                color: activeId === q.id ? COLORS.amber : COLORS.textDim,
                fontFamily: FONT_MONO,
              }}
            >
              {q.num}
            </button>
          ))}
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto">
        {/* Sidebar */}
        <Sidebar questions={QUESTIONS} activeId={activeId} onSelect={scrollTo} />

        {/* Main */}
        <main className="flex-1 min-w-0 px-6 md:px-8 pb-32 pt-7">
          {/* Q1-3 — Entry card linking to RecipePage */}
          <section id="q1" ref={(el) => (sectionRefs.current.q1 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead
              badge="1–3"
              title="หน้าเว็บ Recommended Recipes"
              prompt={
                <div>
                  <div className="mb-1.5">จากรูปด้านบน</div>
                  <ol className="list-none p-0 m-0 space-y-1">
                    <li><span style={{ color: COLORS.amber, fontFamily: FONT_MONO }}>1.</span> ให้พัฒนา Responsive website page รองรับทั้ง Desktop และ Mobile</li>
                    <li><span style={{ color: COLORS.amber, fontFamily: FONT_MONO }}>2.</span> ให้พัฒนาส่วนประกอบต่าง ๆ เป็น Component</li>
                    <li><span style={{ color: COLORS.amber, fontFamily: FONT_MONO }}>3.</span> สามารถเพิ่ม Effect ที่ทำให้หน้านี้น่าสนใจมากขึ้นเองได้ตามความเหมาะสม</li>
                  </ol>
                </div>
              }
            />

            <div
              className="rounded-xl p-6"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="flex-shrink-0 rounded-lg flex items-center justify-center"
                  style={{ width: 48, height: 48, background: "rgba(242,169,59,.12)", border: `1px solid rgba(242,169,59,.25)` }}
                >
                  <span style={{ fontSize: 22 }}>🍜</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold m-0 mb-1" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
                    หน้าเฉลย Recipe แยกต่างหาก
                  </h3>
                  <p className="text-sm m-0" style={{ color: COLORS.textDim }}>
                    ข้อ 1–3 ถูกแยกออกเป็นหน้าแยกต่างหาก พร้อม Live Demo · Sidebar sub-nav · และปุ่มเปิดเต็มจอ
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {["Responsive", "Component Tree", "Flip Card Effect", "Carousel"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.textDim, fontFamily: FONT_MONO }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setShowRecipePage(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.amber}, #E8874A)`,
                  color: COLORS.bg,
                  fontFamily: FONT_DISPLAY,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: `0 4px 16px rgba(242,169,59,.3)`,
                }}
              >
                <ChevronRight size={16} />
                เปิดหน้าเฉลย Recipe
              </button>
            </div>
          </section>

          {/* Q4 */}
          <section id="q4" ref={(el) => (sectionRefs.current.q4 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="4" title="Query: Used มากกว่า 500,000" prompt="จากตาราง Customer ให้เขียน Query แสดงข้อมูล Used ที่มีค่ามากกว่า 500,000" />
            <Pre>{`SELECT *
FROM Customer
WHERE Used > 500000;`}</Pre>
            <AnswerTag>ผลลัพธ์: C001–C005 (ทุกคน เพราะน้อยสุดคือ 600,000)</AnswerTag>
          </section>

          {/* Q5 */}
          <section id="q5" ref={(el) => (sectionRefs.current.q5 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="5" title="Join Customer + Order" prompt="เชื่อมข้อมูล 2 ตารางเข้าด้วยกัน โดยต้องแสดงทุก Record ที่อยู่ในตาราง Customer" />
            <Card title="เหตุผลที่ต้องใช้ LEFT JOIN">
              <p className="text-sm m-0">
                โจทย์บังคับว่าต้องแสดง "ทุก record" ของ Customer แม้บางคน (C001, C005) จะไม่เคยสั่งซื้อเลย
                — ถ้าใช้ INNER JOIN จะตัดคนที่ไม่มี Order ทิ้งไปทันที
              </p>
            </Card>
            <Pre>{`SELECT c.ID, c.Name, c.Email, c.CountryCode, c.Budget, c.Used,
       o.ID AS OrderID, o.Date, o.Amount
FROM Customer c
LEFT JOIN "Order" o ON c.ID = o.CustomerID;`}</Pre>
          </section>

          {/* Q6 */}
          <section id="q6" ref={(el) => (sectionRefs.current.q6 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="6" title="ระบบจำหน่ายหนังสือออนไลน์" prompt="Flow ของระบบ / ER Diagram / ออกแบบหน้าจอสมัครสมาชิก" />

            <Card title="6.1 · Flow ของระบบ">
              <SvgWrap>
                <svg viewBox="0 0 980 220" width="100%" style={{ minWidth: 820 }}>
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill={COLORS.teal} />
                    </marker>
                  </defs>
                  <g fontSize="12" fill={COLORS.text}>
                    <rect x="10" y="80" width="110" height="50" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="65" y="110" textAnchor="middle">เข้าเว็บ</text>

                    <rect x="150" y="80" width="130" height="50" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="215" y="105" textAnchor="middle">เลือกประเภท</text>
                    <text x="215" y="120" textAnchor="middle">สมาชิก</text>

                    <rect x="310" y="80" width="130" height="50" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="375" y="105" textAnchor="middle">กรอกข้อมูล</text>
                    <text x="375" y="120" textAnchor="middle">ตามประเภท</text>

                    <rect x="470" y="80" width="140" height="50" rx="8" fill={COLORS.surface2} stroke={COLORS.amber} />
                    <text x="540" y="105" textAnchor="middle" fill={COLORS.amber}>Validate</text>
                    <text x="540" y="120" textAnchor="middle" fill={COLORS.amber}>ข้อมูล</text>

                    <rect x="470" y="10" width="140" height="40" rx="8" fill={COLORS.surface2} stroke={COLORS.pen} />
                    <text x="540" y="34" textAnchor="middle" fill={COLORS.pen}>แจ้ง Error</text>

                    <rect x="640" y="80" width="140" height="50" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="710" y="105" textAnchor="middle">บันทึกสมาชิก</text>
                    <text x="710" y="120" textAnchor="middle">สำเร็จ</text>

                    <rect x="810" y="80" width="150" height="50" rx="8" fill={COLORS.surface2} stroke={COLORS.teal} />
                    <text x="885" y="105" textAnchor="middle" fill={COLORS.teal}>ซื้อหนังสือ →</text>
                    <text x="885" y="120" textAnchor="middle" fill={COLORS.teal}>สั่งซื้อ</text>

                    <path d="M120,105 H150" stroke={COLORS.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <path d="M280,105 H310" stroke={COLORS.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <path d="M440,105 H470" stroke={COLORS.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <path d="M540,80 V50" stroke={COLORS.pen} strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <path d="M470,30 H310 V80" stroke={COLORS.pen} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
                    <path d="M610,105 H640" stroke={COLORS.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <path d="M780,105 H810" stroke={COLORS.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />

                    <text x="200" y="70" fontSize="10" fill={COLORS.textDim}>ไม่ผ่าน</text>
                    <text x="620" y="70" fontSize="10" fill={COLORS.textDim}>ผ่าน</text>
                  </g>
                </svg>
              </SvgWrap>
            </Card>

            <Card title="6.2 · ER Diagram">
              <SvgWrap>
                <svg viewBox="0 0 980 380" width="100%" style={{ minWidth: 860 }}>
                  <g fontSize="11.5" fill={COLORS.text} fontFamily={FONT_MONO}>
                    <rect x="380" y="10" width="180" height="86" rx="8" fill={COLORS.surface2} stroke={COLORS.amber} />
                    <text x="470" y="28" textAnchor="middle" fill={COLORS.amber} fontWeight="600">Member</text>
                    <line x1="380" y1="36" x2="560" y2="36" stroke={COLORS.border} />
                    <text x="392" y="52">MemberID (PK)</text>
                    <text x="392" y="66">MemberType</text>
                    <text x="392" y="80">Email, Phone</text>

                    <rect x="60" y="150" width="190" height="96" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="155" y="168" textAnchor="middle" fontWeight="600">GeneralMember</text>
                    <line x1="60" y1="176" x2="250" y2="176" stroke={COLORS.border} />
                    <text x="72" y="192">MemberID (PK,FK)</text>
                    <text x="72" y="206">FullName, IDCard</text>
                    <text x="72" y="220">BirthDate</text>

                    <rect x="300" y="150" width="210" height="110" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="405" y="168" textAnchor="middle" fontWeight="600">StudentMember</text>
                    <line x1="300" y1="176" x2="510" y2="176" stroke={COLORS.border} />
                    <text x="312" y="192">MemberID (PK,FK)</text>
                    <text x="312" y="206">SchoolName, StudentID</text>
                    <text x="312" y="220">CardImage, ExpireDate</text>
                    <text x="312" y="234">BirthDate</text>

                    <rect x="560" y="150" width="200" height="96" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="660" y="168" textAnchor="middle" fontWeight="600">ShopMember</text>
                    <line x1="560" y1="176" x2="760" y2="176" stroke={COLORS.border} />
                    <text x="572" y="192">MemberID (PK,FK)</text>
                    <text x="572" y="206">ShopName, RegNo</text>
                    <text x="572" y="220">JuristicDocument</text>

                    <rect x="700" y="10" width="170" height="72" rx="8" fill={COLORS.surface2} stroke={COLORS.teal} />
                    <text x="785" y="28" textAnchor="middle" fill={COLORS.teal} fontWeight="600">Order</text>
                    <line x1="700" y1="36" x2="870" y2="36" stroke={COLORS.border} />
                    <text x="712" y="52">OrderID (PK)</text>
                    <text x="712" y="66">MemberID (FK), Date</text>

                    <rect x="700" y="290" width="180" height="86" rx="8" fill={COLORS.surface2} stroke={COLORS.teal} />
                    <text x="790" y="308" textAnchor="middle" fill={COLORS.teal} fontWeight="600">OrderDetail</text>
                    <line x1="700" y1="316" x2="880" y2="316" stroke={COLORS.border} />
                    <text x="712" y="332">OrderDetailID (PK)</text>
                    <text x="712" y="346">OrderID/BookID (FK)</text>
                    <text x="712" y="360">Quantity, SubTotal</text>

                    <rect x="440" y="290" width="170" height="72" rx="8" fill={COLORS.surface2} stroke={COLORS.border} />
                    <text x="525" y="308" textAnchor="middle" fontWeight="600">Book</text>
                    <line x1="440" y1="316" x2="610" y2="316" stroke={COLORS.border} />
                    <text x="452" y="332">BookID (PK)</text>
                    <text x="452" y="346">Image, Price, Category</text>

                    <path d="M470,96 V130 L155,150" stroke={COLORS.amber} fill="none" strokeWidth="1.3" />
                    <path d="M470,96 V130 L405,150" stroke={COLORS.amber} fill="none" strokeWidth="1.3" />
                    <path d="M470,96 V130 L660,150" stroke={COLORS.amber} fill="none" strokeWidth="1.3" />
                    <path d="M560,46 H700" stroke={COLORS.teal} strokeWidth="1.3" />
                    <text x="600" y="40" fontSize="10" fill={COLORS.textDim}>1 : N</text>
                    <path d="M785,82 V290" stroke={COLORS.teal} strokeWidth="1.3" />
                    <text x="792" y="200" fontSize="10" fill={COLORS.textDim}>1 : N</text>
                    <path d="M700,326 H610" stroke={COLORS.teal} strokeWidth="1.3" />
                    <text x="630" y="320" fontSize="10" fill={COLORS.textDim}>N : 1</text>
                  </g>
                </svg>
              </SvgWrap>
              <p className="text-xs mt-2.5" style={{ color: COLORS.textDim }}>
                Member เป็น superclass แตก subtype ตาม MemberType · Member 1–N Order · Order 1–N OrderDetail · Book 1–N OrderDetail
              </p>
            </Card>

            <Card title="6.3 · หน้าจอสมัครสมาชิก">
              <SvgWrap maxWidth={560}>
                <svg viewBox="0 0 560 300" width="100%">
                  <rect x="0" y="0" width="560" height="300" rx="10" fill={COLORS.surface2} stroke={COLORS.border} />
                  <text x="24" y="34" fill={COLORS.amber} fontSize="14" fontWeight="600">สมัครสมาชิก</text>
                  <g fontSize="12" fill={COLORS.text}>
                    <rect x="24" y="52" width="150" height="30" rx="6" fill={COLORS.surface} stroke={COLORS.teal} />
                    <text x="99" y="71" textAnchor="middle" fill={COLORS.teal}>บุคคลทั่วไป</text>
                    <rect x="186" y="52" width="150" height="30" rx="6" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="261" y="71" textAnchor="middle">นักเรียน/นักศึกษา</text>
                    <rect x="348" y="52" width="150" height="30" rx="6" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="423" y="71" textAnchor="middle">ร้านค้า</text>

                    <text x="24" y="108" fill={COLORS.textDim} fontSize="11">ฟอร์มจะเปลี่ยนตามประเภทที่เลือก ↓</text>

                    <rect x="24" y="120" width="512" height="26" rx="5" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="34" y="137">ชื่อ-นามสกุล</text>
                    <rect x="24" y="154" width="248" height="26" rx="5" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="34" y="171">เลขบัตรประชาชน</text>
                    <rect x="288" y="154" width="248" height="26" rx="5" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="298" y="171">วันเกิด</text>
                    <rect x="24" y="188" width="248" height="26" rx="5" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="34" y="205">อีเมล</text>
                    <rect x="288" y="188" width="248" height="26" rx="5" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="298" y="205">เบอร์โทรศัพท์</text>

                    <rect x="360" y="240" width="80" height="32" rx="6" fill={COLORS.surface} stroke={COLORS.border} />
                    <text x="400" y="261" textAnchor="middle" fill={COLORS.textDim}>ยกเลิก</text>
                    <rect x="448" y="240" width="88" height="32" rx="6" fill={COLORS.amber} stroke={COLORS.amber} />
                    <text x="492" y="261" textAnchor="middle" fill={COLORS.bg} fontWeight="600">สมัครสมาชิก</text>
                  </g>
                </svg>
              </SvgWrap>
              <p className="text-xs mt-2.5" style={{ color: COLORS.textDim }}>
                ใช้ conditional form fields — ฟิลด์เปลี่ยนแบบ dynamic ตามประเภทสมาชิกที่เลือก เพื่อ validate เฉพาะข้อมูลที่จำเป็นของแต่ละประเภท
              </p>
            </Card>
          </section>

          {/* Q7 */}
          <section id="q7" ref={(el) => (sectionRefs.current.q7 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="7" title="ฟังก์ชันน้ำในถัง" prompt="ถังจุ 5,832 ลิตร ใช้น้ำวันละ 1/3 ของที่มีอยู่ ครบ x วัน เหลือน้ำกี่ลิตร → y = Calculate(x)" />
            <AnswerTag>สูตร: y = 5832 × (2/3)ˣ</AnswerTag>
            <Pre>{`def Calculate(x):
    return 5832 * (2/3) ** x

# ตัวอย่าง: ผ่านไป 3 วัน
y = Calculate(3)
print(y)   # 1728.0 ลิตร`}</Pre>
          </section>

          {/* Q8 - interactive */}
          <section id="q8" ref={(el) => (sectionRefs.current.q8 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="8" title="สามเหลี่ยมกลับด้าน (Interactive)" prompt="รับ Input เป็นตัวเลข 1 ตัว แสดงรูปสามเหลี่ยมกลับด้านแบบสมมาตร ลองพิมพ์ตัวเลขด้านล่างได้เลย" />
            <Card>
              <div className="flex gap-6 flex-wrap items-start">
                <div>
                  <div className="flex items-center gap-2.5">
                    <label className="text-sm" style={{ color: COLORS.textDim }}>Enter number of rows:</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={triN}
                      onChange={(e) => setTriN(parseInt(e.target.value) || 1)}
                      className="w-16 rounded-md px-2.5 py-2 text-sm"
                      style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text, fontFamily: FONT_MONO }}
                    />
                  </div>
                  <pre
                    className="mt-3.5 rounded-lg p-4 text-sm whitespace-pre"
                    style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.teal, fontFamily: FONT_MONO, minHeight: 140 }}
                  >
                    {triangleText}
                  </pre>
                </div>
                <div className="flex-1 min-w-[260px]">
                  <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: COLORS.teal, fontFamily: FONT_MONO }}>โค้ด Python</h4>
                  <Pre>{`n = int(input("Enter number of rows: "))

for i in range(n):
    spaces = "  " * i
    stars  = "* " * (2 * (n - i) - 1)
    print(spaces + stars)`}</Pre>
                </div>
              </div>
            </Card>
          </section>

          {/* Q9 */}
          <section id="q9" ref={(el) => (sectionRefs.current.q9 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="9" title="ความน่าจะเป็น: ฟุตบอล/บาสเก็ตบอล" prompt="นักเรียน 40 คน เล่นฟุตบอล 18, เล่นบาส 15, ไม่เล่นทั้งคู่ 12 → สุ่ม 1 คน ความน่าจะเป็นที่เล่นบาสแต่ไม่เล่นฟุตบอล" />
            <SvgWrap maxWidth={460}>
              <svg viewBox="0 0 460 260" width="100%">
                <rect x="10" y="10" width="440" height="240" rx="10" fill="none" stroke={COLORS.border} />
                <circle cx="185" cy="130" r="90" fill={COLORS.amber} fillOpacity="0.18" stroke={COLORS.amber} />
                <circle cx="275" cy="130" r="90" fill={COLORS.teal} fillOpacity="0.18" stroke={COLORS.teal} />
                <text x="140" y="130" textAnchor="middle" fontSize="20" fill={COLORS.amber} fontWeight="700">13</text>
                <text x="230" y="130" textAnchor="middle" fontSize="20" fill={COLORS.text} fontWeight="700">5</text>
                <text x="320" y="130" textAnchor="middle" fontSize="20" fill={COLORS.teal} fontWeight="700">10</text>
                <text x="140" y="60" textAnchor="middle" fontSize="12" fill={COLORS.amber}>ฟุตบอล</text>
                <text x="320" y="60" textAnchor="middle" fontSize="12" fill={COLORS.teal}>บาสเก็ตบอล</text>
                <text x="230" y="235" textAnchor="middle" fontSize="12" fill={COLORS.textDim}>ไม่เล่นเลย = 12 คน (นอกวงกลม)</text>
              </svg>
            </SvgWrap>
            <Steps items={[
              "เล่นอย่างน้อย 1 อย่าง = 40 − 12 = 28 คน",
              "|F∪B| = |F| + |B| − |F∩B| → 28 = 18 + 15 − |F∩B| → เล่นทั้งคู่ = 5 คน",
              "เล่นบาสอย่างเดียว = 15 − 5 = 10 คน",
            ]} />
            <AnswerTag>P(เล่นบาส แต่ไม่เล่นฟุตบอล) = 10/40 = 1/4 = 0.25</AnswerTag>
          </section>

          {/* Q10 */}
          <section id="q10" ref={(el) => (sectionRefs.current.q10 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="10" title="ความน่าจะเป็น: หยิบผลไม้จากตะกร้า" prompt="ส้ม+มังคุด+มะม่วง รวม 10 ลูก ส้ม = 2×มังคุด มะม่วง 1 ลูก หยิบ 3 ลูก ความน่าจะเป็นที่ได้ผลไม้ชนิดละ 1 ลูก" />
            <Steps items={[
              "ส้ม + มังคุด = 10 − 1 = 9 และส้ม = 2×มังคุด → มังคุด 3, ส้ม 6, มะม่วง 1",
              "วิธีหยิบ 3 ลูกจากทั้งหมด = C(10,3) = 120",
              "วิธีที่ได้ครบ 3 ชนิด = C(6,1)×C(3,1)×C(1,1) = 18",
            ]} />
            <AnswerTag>P = 18/120 = 3/20 = 0.15</AnswerTag>
          </section>

          {/* Q11 */}
          <section id="q11" ref={(el) => (sectionRefs.current.q11 = el)} className="py-9" style={{ borderBottom: `1px solid ${COLORS.border}`, scrollMarginTop: "70px" }}>
            <QHead badge="11" title="บวกเลข 8 ให้ได้ 1,000" prompt="บวกเลขด้วยวิธีการใดก็ได้ โดยใช้เฉพาะเลข 8 ให้ได้คำตอบเท่ากับ 1,000" />
            <Card>
              <div className="text-center text-xl" style={{ color: COLORS.teal, fontFamily: FONT_MONO }}>888 + 88 + 8 + 8 + 8 = 1000</div>
            </Card>
            <p className="text-xs" style={{ color: COLORS.textDim }}>ตรวจทาน: 888+88=976, +8=984, +8=992, +8=1000 ✓ (ใช้เลข 8 รวม 8 ตัว)</p>
          </section>

          {/* Q12 */}
          <section id="q12" ref={(el) => (sectionRefs.current.q12 = el)} className="py-9" style={{ scrollMarginTop: "70px" }}>
            <QHead badge="12" title="ทอดลูกเต๋า 2 ลูก 1 ครั้ง" prompt="หาความน่าจะเป็นที่ (1) ผลรวมของแต้มเป็น 10 และ (2) ผลต่างของแต้มเป็น 2" />
            <p className="text-sm">จำนวนผลลัพธ์ทั้งหมด = 6 × 6 = 36</p>
            <Card title="1 · ผลรวมเป็น 10">
              <p className="text-sm mb-2">คู่ที่เป็นไปได้: (4,6) (5,5) (6,4) → 3 แบบ</p>
              <AnswerTag>P = 3/36 = 1/12</AnswerTag>
            </Card>
            <Card title="2 · ผลต่างเป็น 2">
              <p className="text-sm mb-2">คู่ที่เป็นไปได้: (1,3)(3,1)(2,4)(4,2)(3,5)(5,3)(4,6)(6,4) → 8 แบบ</p>
              <AnswerTag>P = 8/36 = 2/9</AnswerTag>
            </Card>
          </section>
        </main>
      </div>

      <footer className="px-8 py-7 text-center text-xs" style={{ color: COLORS.textDim, fontFamily: FONT_MONO, borderTop: `1px solid ${COLORS.border}` }}>
        เฉลยข้อสอบโปรแกรมเมอร์ AppInTouch V1.4.0 · จัดทำเพื่อการทบทวนเนื้อหา
      </footer>
    </div>
  );
}