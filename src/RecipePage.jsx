import React, { useState } from "react";
import { Clock, Users, ArrowLeft, Star, Heart, Flame, ChefHat, RotateCcw } from "lucide-react";

/* Typography */
const F = {
  display: "'Outfit', 'IBM Plex Sans Thai', sans-serif",
  cursive: "'Caveat', cursive",
  body: "'IBM Plex Sans Thai', sans-serif",
};

const RECIPES = [
  {
    id: "r1",
    name: "THANG NOODLE",
    time: "20 mins",
    servings: 4,
    cals: "550 kcal",
    difficulty: "Medium",
    chef: "Kenji Takahashi",
    rating: 4.8,
    reviews: 120,
    desc: "A hearty bowl of Thang Noodles served with a rich, savory broth and topped with fresh herbs and thinly sliced meats.",
    badge: "15",
    color: "#D32F2F",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop",
    ingredients: [
      { name: "Thang Noodles", amount: "200g" },
      { name: "Beef Bone Broth", amount: "500ml" },
      { name: "Sliced Beef", amount: "150g" },
      { name: "Fresh Basil & Cilantro", amount: "Handful" },
      { name: "Lime & Chili", amount: "To taste" },
    ],
    steps: [
      "Simmer the beef bone broth for at least 3 hours.",
      "Boil noodles for 3-4 minutes until al dente.",
      "Place noodles in a bowl, add raw sliced beef on top.",
      "Pour boiling broth over the beef to cook it instantly.",
      "Garnish with herbs and serve with lime."
    ]
  },
  {
    id: "r2",
    name: "MANGO STICKY RICE",
    time: "25 mins",
    servings: 4,
    cals: "450 kcal",
    difficulty: "Easy",
    chef: "Maliwan S.",
    rating: 4.9,
    reviews: 340,
    desc: "Classic Thai dessert featuring sweet glutinous rice, fresh ripe mangoes, and rich coconut cream.",
    badge: "25",
    color: "#F2A93B",
    image: "https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=600",
    ingredients: [
      { name: "Glutinous Rice", amount: "300g" },
      { name: "Coconut Milk", amount: "400ml" },
      { name: "Ripe Mango", amount: "2 pcs" },
      { name: "Sugar", amount: "3 tbsp" },
      { name: "Salt", amount: "½ tsp" },
    ],
    steps: [
      "Soak glutinous rice for 4 hours, then steam for 25 minutes.",
      "Mix warm coconut milk with sugar and salt.",
      "Pour coconut milk over rice and let it absorb for 15 mins.",
      "Serve warm with sliced fresh mango on the side."
    ]
  },
  {
    id: "r3",
    name: "CORN SPICY SALAD",
    time: "10 mins",
    servings: 2,
    cals: "220 kcal",
    difficulty: "Easy",
    chef: "Somchai K.",
    rating: 4.7,
    reviews: 85,
    desc: "A vibrant, spicy, and tangy Thai salad made with sweet corn kernels, tomatoes, and a punchy dressing.",
    badge: "15",
    color: "#E85D04",
    image: "https://hungryinthailand.com/thai-corn-salad/",
    ingredients: [
      { name: "Sweet Corn", amount: "2 ears" },
      { name: "Cherry Tomatoes", amount: "100g" },
      { name: "Dried Shrimp", amount: "2 tbsp" },
      { name: "Lime Juice", amount: "2 tbsp" },
      { name: "Fish Sauce & Palm Sugar", amount: "1 tbsp each" },
      { name: "Thai Chilies", amount: "3 pcs" },
    ],
    steps: [
      "Boil corn until tender, then slice kernels off the cob.",
      "Lightly pound chilies and garlic in a mortar.",
      "Add lime juice, fish sauce, and palm sugar; mix well.",
      "Toss in corn, tomatoes, and dried shrimp.",
      "Serve immediately for best crunch."
    ]
  },
  {
    id: "r4",
    name: "PAD THAI",
    time: "15 mins",
    servings: 2,
    cals: "400 kcal",
    difficulty: "Medium",
    chef: "Arnon S.",
    rating: 4.8,
    reviews: 520,
    desc: "Stir-fried rice noodles with eggs, peanuts, bean sprouts, and a sweet-savory tamarind sauce.",
    badge: "30",
    color: "#E28743",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&auto=format&fit=crop",
    ingredients: [
      { name: "Rice Noodles", amount: "200g" },
      { name: "Shrimp", amount: "150g" },
      { name: "Tamarind Paste", amount: "2 tbsp" },
      { name: "Palm Sugar & Fish Sauce", amount: "2 tbsp each" },
      { name: "Peanuts & Bean Sprouts", amount: "Handful" },
    ],
    steps: [
      "Soak noodles until pliable.",
      "Stir-fry shrimp until cooked, then push to the side.",
      "Scramble an egg in the pan, add noodles and sauce.",
      "Toss everything together until well combined.",
      "Garnish with crushed peanuts and bean sprouts."
    ]
  },
  {
    id: "r5",
    name: "TOM YUM GOONG",
    time: "30 mins",
    servings: 4,
    cals: "250 kcal",
    difficulty: "Medium",
    chef: "Nittaya W.",
    rating: 4.9,
    reviews: 890,
    desc: "A hot and sour Thai soup cooked with shrimp, mushrooms, and fragrant herbs like lemongrass and galangal.",
    badge: "20",
    color: "#C62828",
    image: "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/04/24/5608757681874e1ea5df1aa41d5b2e3d_How_To_Make_Tom_Yam_Kung_The_Epitome_Of_Delicious_And_Nutritious_Thai_Cuisine3.jpg",
    ingredients: [
      { name: "Large Shrimp", amount: "300g" },
      { name: "Lemongrass & Galangal", amount: "A few slices" },
      { name: "Kaffir Lime Leaves", amount: "5 leaves" },
      { name: "Mushrooms", amount: "100g" },
      { name: "Chili Paste (Nam Prik Pao)", amount: "2 tbsp" },
    ],
    steps: [
      "Bring water or broth to a boil with lemongrass, galangal, and lime leaves.",
      "Add mushrooms and chili paste.",
      "Add shrimp and cook until just pink.",
      "Turn off heat, stir in lime juice and fish sauce.",
      "Serve hot with jasmine rice."
    ]
  },
  {
    id: "r6",
    name: "GREEN CURRY",
    time: "40 mins",
    servings: 4,
    cals: "520 kcal",
    difficulty: "Hard",
    chef: "Panya T.",
    rating: 4.7,
    reviews: 410,
    desc: "A rich and fragrant Thai curry made with green chilies, coconut milk, chicken, and Thai eggplants.",
    badge: "40",
    color: "#2E7D32",
    image: "https://images.unsplash.com/photo-1548946526-f69ebe3bc5ee?q=80&w=600&auto=format&fit=crop",
    ingredients: [
      { name: "Chicken Breast", amount: "400g" },
      { name: "Green Curry Paste", amount: "3 tbsp" },
      { name: "Coconut Milk", amount: "500ml" },
      { name: "Thai Eggplants", amount: "4 pcs" },
      { name: "Sweet Basil", amount: "1 cup" },
    ],
    steps: [
      "Fry the green curry paste in a little coconut cream until fragrant.",
      "Add chicken and cook until the outside is sealed.",
      "Pour in the rest of the coconut milk and bring to a simmer.",
      "Add eggplants and cook until tender.",
      "Stir in fresh basil just before serving."
    ]
  }
];

/* ── Inline CSS for 3D flip card and layout ── */
const injectStyles = () => {
  if (typeof document === "undefined" || document.getElementById("recipe-styles")) return;
  const style = document.createElement("style");
  style.id = "recipe-styles";
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Outfit:wght@400;600;700&display=swap');
    
    .recipe-scroll {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      padding-bottom: 30px;
      padding-top: 10px;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .recipe-scroll::-webkit-scrollbar {
      display: none;
    }
    
    .recipe-card-wrap {
      scroll-snap-align: start;
      flex: 0 0 calc(50% - 10px);
      min-width: 220px;
      max-width: 280px;
      perspective: 1000px;
    }
    @media (min-width: 768px) {
      .recipe-card-wrap { flex: 0 0 calc(33.333% - 14px); }
    }
    @media (min-width: 1024px) {
      .recipe-card-wrap { flex: 0 0 calc(25% - 15px); }
    }

    /* 3D Flip Card Effect */
    .flip-card {
      position: relative;
      width: 100%;
      aspect-ratio: 3/4;
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .flip-card.flipped {
      transform: rotateY(180deg);
    }
    .flip-card-front, .flip-card-back {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 20px;
      overflow: hidden;
    }
    .flip-card-front {
      background-color: #222;
    }
    .flip-card-back {
      background-color: #FCF9F2;
      color: #2D3748;
      transform: rotateY(180deg);
      border: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }

    /* Custom thin scrollbar for back recipe */
    .recipe-back-scroll {
      overflow-y: auto;
      flex: 1;
      padding: 14px 16px;
    }
    .recipe-back-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .recipe-back-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .recipe-back-scroll::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    .recipe-back-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);
};

/* ── Card Component ── */
function RecipeCard({ recipe }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="recipe-card-wrap">
      {/* Outer wrapper handles the hover lift and shadow */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", height: "100%",
          boxShadow: hovered ? "0 22px 40px rgba(0,0,0,0.2)" : "0 8px 20px rgba(0,0,0,0.06)",
          transform: hovered && !isFlipped ? "translateY(-8px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          borderRadius: 20,
        }}
      >
        <div
          className={`flip-card ${isFlipped ? "flipped" : ""}`}
        >
          {/* FRONT FACE */}
          <div
            className="flip-card-front"
            onClick={handleFlip}
            style={{ cursor: "pointer", borderRadius: 20 }}
          >
            {/* Background Image */}
            <div
              style={{
                position: "absolute", inset: 0,
                backgroundImage: "url(" + recipe.image + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: hovered && !isFlipped ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.6s ease"
              }}
            />

            {/* Floating Badge (e.g. "15", "25") */}
            <div style={{
              position: "absolute", top: 14, right: 14,
              width: 38, height: 38, borderRadius: "50%",
              background: "white", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
              fontFamily: F.display, fontWeight: 700, fontSize: 15, color: recipe.color,
              zIndex: 2,
              transform: hovered ? "scale(1.15) rotate(10deg)" : "scale(1) rotate(0)",
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}>
              {recipe.badge}
            </div>

            {/* Bottom Text Overlay */}
            <div
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
                padding: "45px 20px 20px",
                color: "white",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                textAlign: "left"
              }}
            >
              <h3 style={{
                fontFamily: F.display, fontWeight: 700, fontSize: 18,
                margin: "0 0 6px", letterSpacing: "0.5px",
                textShadow: "0 2px 4px rgba(0,0,0,0.4)"
              }}>
                {recipe.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.9)", fontFamily: F.body }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} /> {recipe.time}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Users size={12} /> {recipe.servings}
                  </span>
                </div>
                {/* Flip indicator */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "rgba(255,255,255,0.25)", padding: "4px 8px", borderRadius: 12,
                  backdropFilter: "blur(4px)", fontSize: 10, fontWeight: 600,
                  transform: hovered ? "translateX(0)" : "translateX(4px)",
                  opacity: hovered ? 1 : 0.8,
                  transition: "all 0.3s ease"
                }}>
                  <RotateCcw size={10} /> Flip
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="flip-card-back">
            {/* Card Back Header */}
            <div style={{
              padding: "16px 16px 10px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              background: "rgba(0,0,0,0.01)"
            }}>
              <div style={{ textAlign: "left" }}>
                <h3 style={{
                  fontFamily: F.display, fontWeight: 700, fontSize: 13,
                  color: recipe.color, margin: 0, letterSpacing: "0.3px"
                }}>
                  {recipe.name}
                </h3>
                <div style={{ display: "flex", gap: 8, fontSize: 10, color: "#718096", marginTop: 2, fontFamily: F.body }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Clock size={10} /> {recipe.time}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Users size={10} /> {recipe.servings} servings
                  </span>
                </div>
              </div>

              <button
                onClick={handleFlip}
                style={{
                  background: "rgba(0,0,0,0.04)",
                  border: "none",
                  cursor: "pointer",
                  color: "#4A5568",
                  padding: 6,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
                title="ย้อนกลับด้านหน้า"
              >
                <RotateCcw size={12} />
              </button>
            </div>

            {/* Scrollable Recipe Details */}
            <div className="recipe-back-scroll" style={{ textAlign: "left" }}>
              {/* Description */}
              <p style={{ fontSize: 11, color: "#4A5568", lineHeight: 1.4, margin: "0 0 12px 0", fontFamily: F.body, fontStyle: "italic" }}>
                "{recipe.desc}"
              </p>

              {/* Ingredients */}
              <div style={{ marginBottom: 14 }}>
                <h4 style={{
                  fontSize: 10, fontFamily: F.display, fontWeight: 700,
                  color: "#1A202C", textTransform: "uppercase", letterSpacing: "0.5px",
                  marginBottom: 6, borderLeft: "2px solid " + recipe.color, paddingLeft: 6
                }}>
                  Ingredients
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "#4A5568", fontFamily: F.body }}>
                      <span style={{ fontWeight: 500 }}>• {ing.name}</span>
                      <span style={{ color: recipe.color, fontWeight: 600 }}>{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 style={{
                  fontSize: 10, fontFamily: F.display, fontWeight: 700,
                  color: "#1A202C", textTransform: "uppercase", letterSpacing: "0.5px",
                  marginBottom: 6, borderLeft: "2px solid " + recipe.color, paddingLeft: 6
                }}>
                  Instructions
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {recipe.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", fontSize: 10.5, color: "#4A5568", lineHeight: 1.4, fontFamily: F.body }}>
                      <span style={{
                        width: 14, height: 14, borderRadius: "50%",
                        background: recipe.color + "18",
                        color: recipe.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 8.5, fontWeight: 700, flexShrink: 0, marginTop: 2
                      }}>
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Back Footer */}
            <div style={{
              padding: "8px 16px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              fontSize: 9.5,
              fontFamily: F.body,
              color: "#718096",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(0,0,0,0.01)"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <ChefHat size={10} /> {recipe.chef}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 2, color: recipe.color, fontWeight: 600 }}>
                ★ {recipe.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components for Question 2 (Component Separation) ── */

function DecorativeVectors() {
  return (
    <>
      <div style={{ position: "absolute", top: -40, right: -20, opacity: 0.1, pointerEvents: "none" }}>
        <svg width="300" height="300" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#FF5722" strokeWidth="2" />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: -20, left: 20, opacity: 0.08, pointerEvents: "none" }}>
        <svg width="150" height="150" viewBox="0 0 100 100">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#FFC107" />
        </svg>
      </div>
    </>
  );
}

function RecipeHeader() {
  return (
    <div style={{ position: "relative", zIndex: 10, marginBottom: 30 }}>
      <h2 style={{
        fontFamily: F.display, fontWeight: 400, fontSize: 32,
        color: "#D32F2F", margin: 0, letterSpacing: "1px",
        textTransform: "uppercase"
      }}>
        RECOMMENDED
      </h2>
      <h1 style={{
        fontFamily: F.cursive, fontSize: 48,
        color: "#D32F2F", margin: "-10px 0 0 0",
        transform: "rotate(-2deg)",
        display: "inline-block"
      }}>
        Recipes
      </h1>
    </div>
  );
}

function RecipeList({ recipes }) {
  return (
    <div className="recipe-scroll" style={{ position: "relative", zIndex: 10 }}>
      {recipes.map((r, i) => (
        <RecipeCard key={i} recipe={r} />
      ))}
    </div>
  );
}

/* ── Main Export ── */
export default function RecipePage() {
  React.useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div style={{
      position: "relative",
      background: "#FCF9F2", // Light cream background from PDF
      borderRadius: 24,
      padding: "40px 30px",
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.05)",
      boxShadow: "inset 0 0 60px rgba(255,255,255,0.5)"
    }}>
      <DecorativeVectors />
      <RecipeHeader />
      <RecipeList recipes={RECIPES} />
    </div>
  );
}
