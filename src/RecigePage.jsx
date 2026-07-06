import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
/* ─── Design tokens (same as webb.jsx) ─── */
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
/* ─── Embedded Recipe HTML (standalone) ─── */
const RECIPE_HTML = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recommended Recipes</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Caveat:wght@600;700&family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --cream:#FBF3E7;
    --cream-2:#F3E6D3;
    --ink:#2E2621;
    --ink-dim:#7A6E62;
    --terracotta:#C0392B;
    --terracotta-dark:#9E2E22;
    --gold:#E8A33D;
    --card-radius:20px;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    background:var(--cream);
    color:var(--ink);
    font-family:'Nunito Sans',sans-serif;
  }
  .display{font-family:'Fredoka',sans-serif;}
  .script{font-family:'Caveat',cursive;}
  .page{max-width:1180px; margin:0 auto; padding:48px 24px 90px;}
  /* ---- Header ---- */
  .section-head{position:relative; margin-bottom:34px;}
  .section-head .eyebrow{
    font-family:'Fredoka',sans-serif; font-weight:700; font-size:clamp(26px,4vw,40px);
    color:var(--terracotta); letter-spacing:1px; margin:0; line-height:1;
  }
  .section-head .script-title{
    font-family:'Caveat',cursive; font-weight:700; font-size:clamp(30px,5vw,52px);
    color:var(--ink); margin:-6px 0 0 4px; display:block;
  }
  .sunburst{
    position:absolute; right:0; top:-10px; width:120px; height:120px; opacity:.55; z-index:0;
  }
  /* ---- Carousel ---- */
  .carousel-wrap{position:relative;}
  .carousel{
    display:flex; gap:20px; overflow-x:auto; scroll-snap-type:x mandatory;
    padding:6px 6px 20px; margin:0 -6px;
    scrollbar-width:none;
  }
  .carousel::-webkit-scrollbar{display:none;}
  .nav-btn{
    position:absolute; top:40%; transform:translateY(-50%);
    width:42px; height:42px; border-radius:50%; border:none; cursor:pointer;
    background:var(--ink); color:var(--cream); font-size:16px;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 16px rgba(0,0,0,.18); z-index:2;
    transition:transform .15s ease;
  }
  .nav-btn:hover{transform:translateY(-50%) scale(1.08);}
  .nav-btn.prev{left:-14px;}
  .nav-btn.next{right:-14px;}
  /* ---- Flip Card ---- */
  .card-scene{
    flex:0 0 220px; scroll-snap-align:start; perspective:1200px; height:300px;
  }
  .card-flip{
    position:relative; width:100%; height:100%; transition:transform .6s cubic-bezier(.4,.2,.2,1);
    transform-style:preserve-3d; cursor:pointer;
  }
  .card-scene.flipped .card-flip{transform:rotateY(180deg);}
  .card-face{
    position:absolute; inset:0; border-radius:var(--card-radius);
    backface-visibility:hidden; overflow:hidden;
    box-shadow:0 10px 26px rgba(46,38,33,.14);
  }
  .card-front{background:var(--ink);}
  .card-illust{width:100%; height:190px; display:block;}
  .card-info{
    position:absolute; left:0; right:0; bottom:0; padding:14px 16px 16px;
    background:linear-gradient(0deg, rgba(0,0,0,.72), rgba(0,0,0,0));
  }
  .card-info .name{color:#fff; font-family:'Fredoka',sans-serif; font-weight:600; font-size:14.5px; margin:0 0 4px; text-transform:uppercase; letter-spacing:.3px;}
  .card-info .meta{color:#EADFCF; font-size:12px; margin:0;}
  .badge{
    position:absolute; top:12px; right:12px; width:34px; height:34px; border-radius:50%;
    background:var(--terracotta); color:#fff; display:flex; align-items:center; justify-content:center;
    font-family:'Fredoka',sans-serif; font-weight:600; font-size:11px; box-shadow:0 4px 10px rgba(0,0,0,.2);
  }
  .flip-hint{
    position:absolute; top:12px; left:12px; width:26px; height:26px; border-radius:50%;
    background:rgba(255,255,255,.9); display:flex; align-items:center; justify-content:center; font-size:12px;
  }
  .card-back{
    background:var(--cream-2); transform:rotateY(180deg); padding:18px 18px 16px;
    display:flex; flex-direction:column;
  }
  .card-back .name{font-family:'Fredoka',sans-serif; font-weight:600; font-size:14px; color:var(--terracotta); margin:0 0 8px;}
  .card-back h5{font-size:10.5px; text-transform:uppercase; letter-spacing:1px; color:var(--ink-dim); margin:8px 0 4px;}
  .card-back ul{margin:0; padding-left:16px; font-size:12px; color:var(--ink); line-height:1.5;}
  .card-back .price{margin-top:auto; font-family:'Fredoka',sans-serif; font-weight:600; color:var(--terracotta-dark); font-size:15px;}
  /* ---- Component legend ---- */
  .legend{
    margin-top:56px; background:#fff; border-radius:16px; padding:22px 26px;
    border:1px solid var(--cream-2);
  }
  .legend h3{font-family:'Fredoka',sans-serif; font-size:16px; margin:0 0 12px; color:var(--ink);}
  .legend .tags{display:flex; flex-wrap:wrap; gap:8px;}
  .legend .tag{
    font-size:12px; font-family:'Nunito Sans',sans-serif; font-weight:700;
    background:var(--cream); color:var(--terracotta); padding:6px 12px; border-radius:20px;
    border:1px solid var(--cream-2);
  }
  .legend p{font-size:13px; color:var(--ink-dim); margin:12px 0 0;}
  @media (max-width:640px){
    .nav-btn{display:none;}
    .card-scene{flex-basis:180px; height:270px;}
  }
</style>
</head>
<body>
<div class="page">
  <div class="section-head">
    <svg class="sunburst" viewBox="0 0 100 100"><g stroke="#E8A33D" stroke-width="2" opacity=".8">
      <line x1="50" y1="0" x2="50" y2="18"/><line x1="50" y1="82" x2="50" y2="100"/>
      <line x1="0" y1="50" x2="18" y2="50"/><line x1="82" y1="50" x2="100" y2="50"/>
      <line x1="14" y1="14" x2="26" y2="26"/><line x1="74" y1="74" x2="86" y2="86"/>
      <line x1="86" y1="14" x2="74" y2="26"/><line x1="26" y1="74" x2="14" y2="86"/>
    </g></svg>
    <p class="eyebrow">RECOMMENDED</p>
    <span class="script-title">Recipes</span>
  </div>
  <div class="carousel-wrap">
    <button class="nav-btn prev" onclick="scrollCarousel(-1)" aria-label="เลื่อนซ้าย">‹</button>
    <button class="nav-btn next" onclick="scrollCarousel(1)" aria-label="เลื่อนขวา">›</button>
    <div class="carousel" id="carousel"></div>
  </div>
  <div class="legend">
    <h3>โครงสร้าง Component ของหน้านี้</h3>
    <div class="tags">
      <span class="tag">&lt;SectionTitle /&gt;</span>
      <span class="tag">&lt;RecipeCarousel /&gt;</span>
      <span class="tag">&lt;RecipeCard /&gt;</span>
      <span class="tag">&lt;RecipeBadge /&gt;</span>
      <span class="tag">&lt;RecipeDetailFace /&gt;</span>
    </div>
    <p>Responsive: การ์ดปรับความกว้างและเลื่อนแนวนอนอัตโนมัติทั้งบน Desktop และ Mobile · Effect: คลิกที่การ์ดเพื่อพลิกดูวัตถุดิบและราคา</p>
  </div>
</div>
<script>
  const RECIPES = [
    {
      name:"Thang Noodle", time:"20 mins", servings:"4 servings", badge:"20′",
      color1:"#8B4A2B", color2:"#D98C4A",
      ingredients:["เส้นบะหมี่", "น้ำซุปกระดูกหมู", "หมูสับ", "ผักกาดขาว", "ต้นหอม ผักชี"],
      price:"฿ 65", illust:"noodle"
    },
    {
      name:"Mango Sticky Rice", time:"25 mins", servings:"4 servings", badge:"25′",
      color1:"#E8B23D", color2:"#F4D98A",
      ingredients:["ข้าวเหนียว", "มะม่วงสุก", "กะทิ", "น้ำตาลปี๊บ", "เกลือเล็กน้อย"],
      price:"฿ 55", illust:"mango"
    },
    {
      name:"Corn Spicy Salad", time:"30 mins", servings:"2 servings", badge:"30′",
      color1:"#4B7A3E", color2:"#8FBF5C",
      ingredients:["ข้าวโพดต้ม", "พริกขี้หนู", "มะนาว", "ถั่วลิสงคั่ว", "น้ำปลา"],
      price:"฿ 45", illust:"corn"
    },
  ];
  function illustSVG(type, c1, c2){
    if(type==="noodle"){
      return \`<svg class="card-illust" viewBox="0 0 220 190" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="190" fill="\${c1}"/>
        <ellipse cx="110" cy="150" rx="95" ry="26" fill="#3A2A1E"/>
        <ellipse cx="110" cy="140" rx="88" ry="24" fill="\${c2}"/>
        <path d="M40,135 Q60,110 80,135 Q100,108 120,135 Q140,108 160,135 Q175,120 180,135" stroke="#FFF3D6" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9"/>
        <circle cx="70" cy="118" r="9" fill="#E8534A"/>
        <circle cx="140" cy="122" r="8" fill="#4E9E4C"/>
        <circle cx="105" cy="112" r="7" fill="#F2C94C"/>
      </svg>\`;
    }
    if(type==="mango"){
      return \`<svg class="card-illust" viewBox="0 0 220 190" preserveAspectRatio="xMidYMid slice">
        <rect width="220" height="190" fill="\${c1}"/>
        <rect x="30" y="110" width="160" height="52" rx="14" fill="#FFFDF6"/>
        <ellipse cx="150" cy="105" rx="42" ry="30" fill="#F2A93B" transform="rotate(18 150 105)"/>
        <ellipse cx="150" cy="105" rx="42" ry="30" fill="#E8873D" opacity=".35" transform="rotate(18 150 105)"/>
        <ellipse cx="70" cy="128" rx="10" ry="7" fill="#FFF3D6"/>
        <ellipse cx="95" cy="132" rx="10" ry="7" fill="#FFF3D6"/>
        <ellipse cx="120" cy="128" rx="10" ry="7" fill="#FFF3D6"/>
      </svg>\`;
    }
    return \`<svg class="card-illust" viewBox="0 0 220 190" preserveAspectRatio="xMidYMid slice">
      <rect width="220" height="190" fill="\${c1}"/>
      <ellipse cx="110" cy="145" rx="92" ry="28" fill="#FFFDF6"/>
      <circle cx="80" cy="128" r="6" fill="#F2C94C"/>
      <circle cx="98" cy="120" r="6" fill="#F2C94C"/>
      <circle cx="116" cy="130" r="6" fill="#F2C94C"/>
      <circle cx="134" cy="122" r="6" fill="#F2C94C"/>
      <circle cx="152" cy="132" r="6" fill="#F2C94C"/>
      <circle cx="90" cy="112" r="4" fill="#E8534A"/>
      <circle cx="130" cy="110" r="4" fill="#E8534A"/>
      <path d="M60,150 L165,150" stroke="#4B7A3E" stroke-width="4" stroke-linecap="round" opacity=".5"/>
    </svg>\`;
  }
  const carousel = document.getElementById('carousel');
  const sequence = [...RECIPES, ...RECIPES, RECIPES[0]];
  sequence.forEach((r) => {
    const scene = document.createElement('div');
    scene.className = 'card-scene';
    scene.innerHTML = \`
      <div class="card-flip">
        <div class="card-face card-front">
          \${illustSVG(r.illust, r.color1, r.color2)}
          <div class="flip-hint">↻</div>
          <div class="badge">\${r.badge}</div>
          <div class="card-info">
            <p class="name">\${r.name}</p>
            <p class="meta">\${r.time} · \${r.servings}</p>
          </div>
        </div>
        <div class="card-face card-back">
          <p class="name">\${r.name}</p>
          <h5>Ingredients</h5>
          <ul>\${r.ingredients.map(i=>\`<li>\${i}</li>\`).join('')}</ul>
          <div class="price">\${r.price}</div>
        </div>
      </div>\`;
    scene.addEventListener('click', () => scene.classList.toggle('flipped'));
    carousel.appendChild(scene);
  });
  function scrollCarousel(dir){
    carousel.scrollBy({left: dir * 240, behavior:'smooth'});
  }
</script>
</body>
</html>
`;
/* ─── Shared UI components ─── */
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
function Pre({ children }) {
  return (
    <pre
      className="rounded-lg p-4 overflow-x-auto text-sm my-3 whitespace-pre-wrap"
      style={{
        background: COLORS.surface2,
        border: `1px solid ${COLORS.border}`,
        color: "#D6DEEB",
        fontFamily: FONT_MONO,
      }}
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
/* ─── Sub-nav items ─── */
const Q1_SUBNAV = [
  { id: "q1-demo",      label: "Live Demo" },
  { id: "q1-responsive", label: "1 · Responsive" },
  { id: "q1-component", label: "2 · Component" },
  { id: "q1-effect",    label: "3 · Effect" },
];
/* ─── Main component ─── */
export default function RecipePage({ onBack }) {
  const [subActiveId, setSubActiveId] = useState("q1-demo");
  const subRefs = useRef({});
  /* Track active sub-section */
  useEffect(() => {
    const subObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSubActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );
    Object.values(subRefs.current).forEach((el) => el && subObserver.observe(el));
    return () => subObserver.disconnect();
  }, []);
  const scrollToSub = (id) => {
    subRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const openRecipeFullscreen = () => {
    const blob = new Blob([RECIPE_HTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: FONT_BODY,
        fontWeight: 300,
        minHeight: "100vh",
      }}
    >
      <link rel="stylesheet" href={FONT_LINK} />
      {/* ── Topbar ── */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5"
        style={{
          background: "rgba(15,18,25,.92)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="flex items-center gap-2.5 text-sm font-bold" style={{ fontFamily: FONT_DISPLAY }}>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: COLORS.teal, boxShadow: `0 0 12px ${COLORS.teal}` }}
          />
          APPINTOUCH · ข้อ 1–3 หน้าเว็บ Recipe
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs" style={{ color: COLORS.textDim, fontFamily: FONT_MONO }}>
            Q1–Q3 / Recipe Page
          </div>
          <button
            onClick={() => onBack?.()}
            className="text-xs px-3 py-1.5 rounded-md"
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.textDim,
              fontFamily: FONT_MONO,
              cursor: "pointer",
            }}
          >
            ← กลับ
          </button>
        </div>
      </div>
      {/* ── Hero ── */}
      <div
        className="px-6 pt-14 pb-8 max-w-3xl"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <span
          className="block text-xs uppercase tracking-widest mb-3"
          style={{ color: COLORS.amber, fontFamily: FONT_MONO }}
        >
          ข้อ 1–3 · Frontend Web Development
        </span>
        <h1
          className="text-3xl md:text-4xl mb-3"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}
        >
          หน้าเว็บ Recommended Recipes
        </h1>
        <p className="text-sm max-w-xl" style={{ color: COLORS.textDim }}>
          พัฒนา Responsive website · แบ่งเป็น Component · เพิ่ม Effect — คลิก Live Demo เพื่อทดลองใช้งานจริง
          หรือเปิดเต็มจอเพื่อทดสอบ Responsive ได้อิสระ
        </p>
      </div>
      {/* ── Body: content + sub-sidebar ── */}
      <div className="flex max-w-5xl mx-auto">
        {/* Content */}
        <main className="flex-1 min-w-0 px-6 md:px-8 pb-32 pt-7">
          {/* Live Demo */}
          <div
            id="q1-demo"
            ref={(el) => (subRefs.current["q1-demo"] = el)}
            style={{ scrollMarginTop: "80px" }}
          >
            <Card title="ตัวอย่างที่ใช้งานได้จริง (Live Demo)">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm m-0" style={{ color: COLORS.textDim }}>
                  ลองเลื่อนการ์ด หรือคลิกที่การ์ดเพื่อพลิกดูวัตถุดิบ — เปิดเต็มจอเพื่อทดสอบ responsive ได้อิสระ
                </p>
                <button
                  onClick={openRecipeFullscreen}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-md"
                  style={{
                    background: COLORS.surface2,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.teal,
                    fontFamily: FONT_MONO,
                    cursor: "pointer",
                  }}
                >
                  เปิดเต็มจอ ↗
                </button>
              </div>
              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
                <iframe
                  title="Recommended Recipes Demo"
                  srcDoc={RECIPE_HTML}
                  style={{ width: "100%", height: 560, border: 0, display: "block", background: "#FBF3E7" }}
                />
              </div>
            </Card>
          </div>
          {/* 1 · Responsive */}
          <div
            id="q1-responsive"
            ref={(el) => (subRefs.current["q1-responsive"] = el)}
            style={{ scrollMarginTop: "80px" }}
          >
            <Card title="1 · Responsive (Desktop + Mobile)">
              <Steps
                items={[
                  "ใช้ CSS Grid/Flexbox เป็นโครงหลัก พร้อม media query แยก breakpoint: Desktop ≥1024px แสดง 5–6 การ์ด/แถว, Tablet ≥768px แสดง 3 การ์ด, Mobile <768px เลื่อนแนวนอนหรือ 1–2 การ์ด/แถว",
                  "ใช้หน่วย relative (%, rem, vw) แทน px ตายตัว และ object-fit: cover กับรูปภาพ",
                ]}
              />
            </Card>
          </div>
          {/* 2 · Component */}
          <div
            id="q1-component"
            ref={(el) => (subRefs.current["q1-component"] = el)}
            style={{ scrollMarginTop: "80px" }}
          >
            <Card title="2 · แบ่งเป็น Component">
              <Pre>{`<RecipePage>
 ├── <SectionTitle title="Recommended Recipes" />
 ├── <RecipeCarousel>
 │     └── <RecipeCard>          // ส่วนที่ซ้ำ ดึงมาเป็น component เดียว
 │           ├── <RecipeImage />
 │           ├── <RecipeBadge time="20 mins" servings="4" />
 │           ├── <RecipeTitle />
 │           └── <RecipeDetailIcon />`}</Pre>
            </Card>
          </div>
          {/* 3 · Effect */}
          <div
            id="q1-effect"
            ref={(el) => (subRefs.current["q1-effect"] = el)}
            style={{ scrollMarginTop: "80px" }}
          >
            <Card title="3 · Effect เพิ่มเติม">
              <Steps
                items={[
                  "Hover: การ์ดขยายเล็กน้อย transform: scale(1.05) พร้อมเงา",
                  "Transition แบบ fade/slide เวลาเลื่อน carousel",
                  "Lazy-load รูปภาพ + Skeleton loading ระหว่างรอข้อมูล",
                ]}
              />
            </Card>
          </div>
        </main>
        {/* ── Sub-sidebar ── */}
        <nav
          className="hidden lg:block w-44 flex-shrink-0 sticky self-start py-6 pr-4"
          style={{ top: "70px" }}
        >
          <div
            className="text-xs uppercase tracking-widest mb-3 px-2.5"
            style={{ color: COLORS.textDim, fontFamily: FONT_MONO }}
          >
            ในหน้านี้
          </div>
          {Q1_SUBNAV.map((s) => {
            const isActive = subActiveId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSub(s.id)}
                className="w-full text-left px-2.5 py-1.5 mb-0.5 rounded-md text-xs transition-colors"
                style={{
                  color: isActive ? COLORS.teal : COLORS.textDim,
                  background: isActive ? COLORS.surface : "transparent",
                  borderLeft: `2px solid ${isActive ? COLORS.teal : "transparent"}`,
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            );
          })}
          <div
            className="mt-8 px-2.5"
            style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: "16px" }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: COLORS.textDim, fontFamily: FONT_MONO }}
            >
              Quick
            </div>
            <button
              onClick={openRecipeFullscreen}
              className="w-full text-left px-2.5 py-1.5 rounded-md text-xs"
              style={{
                color: COLORS.teal,
                background: "rgba(79,209,197,.07)",
                border: `1px solid rgba(79,209,197,.2)`,
                fontFamily: FONT_MONO,
                cursor: "pointer",
              }}
            >
              เปิด Recipe เต็มจอ ↗
            </button>
          </div>
        </nav>
      </div>
      {/* Footer */}
      <footer
        className="px-8 py-7 text-center text-xs"
        style={{
          color: COLORS.textDim,
          fontFamily: FONT_MONO,
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        ข้อ 1–3 หน้าเว็บ Recipe · AppInTouch Programmer Exam Answer Key
      </footer>
    </div>
  );
}