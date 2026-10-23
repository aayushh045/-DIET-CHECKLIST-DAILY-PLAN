
import { useState, useEffect } from "react";

const STORAGE_KEY = "diet_checklist_v1";

const plan = [
  {
    id: "meal1",
    time: "6:15 AM",
    label: "Pre-Workout",
    emoji: "🌅",
    color: "#f59e0b",
    timing: "Gym se 45 min pehle",
    calories: 280,
    protein: 10,
    items: [
      { id: "m1i1", text: "2 boiled aloo (medium) — energy ke liye" },
      { id: "m1i2", text: "150ml dahi — light protein + probiotics" },
      { id: "m1i3", text: "1 glass paani (500ml)" },
    ],
    note: "⚡ Light rakho — gym mein heavy feel na ho",
  },
  {
    id: "meal2",
    time: "7:00–9:00 AM",
    label: "GYM",
    emoji: "🏋️",
    color: "#ef4444",
    isGym: true,
    timing: "Train hard",
    note: "💊 Creatine 5g — gym se pehle ya baad, paani ke saath daily",
  },
  {
    id: "meal3",
    time: "9:15 AM",
    label: "Post-Workout Shake",
    emoji: "⚡",
    color: "#10b981",
    timing: "Gym ke 30 min ke andar — most important meal",
    calories: 541,
    protein: 37,
    items: [
      { id: "m3i1", text: "1 scoop Whey Protein — paani ya 150ml milk ke saath" },
      { id: "m3i2", text: "2 bananas" },
      { id: "m3i3", text: "1 tbsp peanut butter" },
      { id: "m3i4", text: "20g oats blend karo shake mein" },
      { id: "m3i5", text: "5g Creatine (agar gym se pehle nahi liya)" },
    ],
    note: "🥛 Whey milk se lena ho toh theek, paani se lena better for digestion",
  },
  {
    id: "meal4",
    time: "12:00 PM",
    label: "Lunch",
    emoji: "🍛",
    color: "#8b5cf6",
    timing: "Post-workout ke 2.5-3 ghante baad",
    calories: 520,
    protein: 18,
    items: [
      { id: "m4i1", text: "3 chapati (4 se kam kiya — bloating avoid)" },
      { id: "m4i2", text: "1 katori moong dal — easy digest, protein + fiber" },
      { id: "m4i3", text: "1 katori green sabji" },
      { id: "m4i4", text: "Salad: kheera + tamatar + nimbu" },
      { id: "m4i5", text: "1 tbsp flaxseeds — dahi mein mix karo (skin + gut)" },
      { id: "m4i6", text: "100ml dahi" },
    ],
    note: "🌿 Flaxseeds daily zaroori — constipation + acne dono fix karega",
  },
  {
    id: "meal5",
    time: "4:00 PM",
    label: "Evening Meal — Protein Focus",
    emoji: "💪",
    color: "#06b6d4",
    timing: "Lunch ke 4 ghante baad",
    calories: 380,
    protein: 30,
    items: [
      { id: "m5i1", text: "100g soya chunks dry (double kiya — main protein source)" },
      { id: "m5i2", text: "1 cup rice / 2 chapati — choose 1" },
      { id: "m5i3", text: "Nimbu + kala namak on soya" },
      { id: "m5i4", text: "1 glass nimbu pani / coconut water" },
    ],
    note: "💡 Soya 100g = 52g protein — yeh tera sabse important protein meal hai",
  },
  {
    id: "meal6",
    time: "6:30 PM",
    label: "Light Snack",
    emoji: "🥜",
    color: "#f97316",
    timing: "Evening meal ke 2.5 ghante baad",
    calories: 370,
    protein: 19,
    items: [
      { id: "m6i1", text: "50g roasted chana — fiber + protein" },
      { id: "m6i2", text: "50g paneer (raw ya lightly cooked)" },
      { id: "m6i3", text: "Handful cucumber slices" },
      { id: "m6i4", text: "1 Zinc tablet 25mg — skin ke liye daily" },
    ],
    note: "⚠️ Peanuts yahan se hataye — 7pm pe itna fat ek saath = bloating. Chana + paneer enough hai.",
  },
  {
    id: "meal7",
    time: "8:00 PM",
    label: "Dinner — Early karo",
    emoji: "🌙",
    color: "#6366f1",
    timing: "10-11 PM se badal ke 8 PM — skin game changer",
    calories: 480,
    protein: 16,
    items: [
      { id: "m7i1", text: "3-4 chapati" },
      { id: "m7i2", text: "1 katori dal (arhar / masoor)" },
      { id: "m7i3", text: "1 katori sabzi" },
      { id: "m7i4", text: "Salad" },
      { id: "m7i5", text: "1 tsp ghee on chapati — healthy fat + digestion" },
      { id: "m7i6", text: "1 Omega-3 capsule (raat ka khana ke saath daily)" },
    ],
    note: "🎯 Yeh time change sabse zaroori hai — late dinner = direct acne. 8 PM karo strictly.",
  },
  {
    id: "meal8",
    time: "10:00 PM",
    label: "Pre-Sleep — Light Only",
    emoji: "😴",
    color: "#64748b",
    timing: "Sone se 1.5-2 ghante pehle — heavy nahi",
    calories: 220,
    protein: 14,
    items: [
      { id: "m8i1", text: "200ml warm milk (agar din mein zyada dairy nahi li)" },
      { id: "m8i2", text: "5 almonds + 3 walnuts" },
      { id: "m8i3", text: "Ya: 150ml dahi + 1 tbsp flaxseeds (milk ki jagah)" },
      { id: "m8i4", text: "Phone band karo, 11:30 PM tak so jao" },
    ],
    note: "🛌 Yahan heavy meal mat lo — protein already din mein poori ho gayi. Sirf light raho.",
  },
];

const totals = { cal: 2791, protein: 144, note: "+ soya 100g add karne se protein ~170g ho jaayega" };

const skinRules = [
  { text: "Salicylic acid face wash — gym ke baad turant", done: false },
  { text: "Zinc 25mg tablet — daily lunch ke baad", done: false },
  { text: "Omega-3 capsule — daily dinner ke saath", done: false },
  { text: "4 liter paani — already kar raha hai ✅", done: true },
  { text: "Pillow cover week mein 2 baar badlo", done: false },
  { text: "Dinner 8 PM se pehle khatam", done: false },
];

export default function DietPlan() {
  const today = new Date().toDateString();
  const [checked, setChecked] = useState({});
  const [skinChecked, setSkinChecked] = useState({});
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedMeal, setExpandedMeal] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.date === today) {
        setChecked(saved.checked || {});
        setSkinChecked(saved.skin || {});
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, checked: {}, skin: {} }));
      }
    } catch {}
  }, []);

  const saveChecked = (newChecked, newSkin) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, checked: newChecked, skin: newSkin || skinChecked }));
    } catch {}
  };

  const toggleItem = (id) => {
    const updated = { ...checked, [id]: !checked[id] };
    setChecked(updated);
    saveChecked(updated, skinChecked);
  };

  const toggleSkin = (i) => {
    const updated = { ...skinChecked, [i]: !skinChecked[i] };
    setSkinChecked(updated);
    saveChecked(checked, updated);
  };

  const resetDay = () => {
    setChecked({});
    setSkinChecked({});
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, checked: {}, skin: {} }));
  };

  const allItems = plan.filter(m => m.items).flatMap(m => m.items);
  const totalChecked = allItems.filter(i => checked[i.id]).length;
  const progress = Math.round((totalChecked / allItems.length) * 100);

  const getMealProgress = (meal) => {
    if (!meal.items) return null;
    const done = meal.items.filter(i => checked[i.id]).length;
    return { done, total: meal.items.length, pct: Math.round((done / meal.items.length) * 100) };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#070a0f", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#f1f5f9", paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: #10b981; }
        .card { transition: transform 0.15s ease; }
        .card:hover { transform: translateY(-1px); }
        .cb { transition: all 0.2s; cursor: pointer; }
        .cb:active { transform: scale(0.95); }
        @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .popped { animation: pop 0.25s ease; }
        @keyframes fadeup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeup 0.3s ease forwards; }
      `}</style>

     
      <div style={{ background: "linear-gradient(160deg,#001208,#070a0f)", borderBottom: "1px solid #10b98125", padding: "36px 16px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%,#10b98115,transparent)" }} />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(32px,8vw,52px)", letterSpacing: 2, lineHeight: 1, marginBottom: 6 }}>
            DIET CHECKLIST<br /><span style={{ color: "#10b981" }}>DAILY PLAN</span>
          </div>
          <div style={{ fontSize: 12, color: "#475569", marginBottom: 20 }}>6'2" · 67kg · Pure Veg · Bulk + Acne Control</div>

         
          <div style={{ background: "#0f1923", borderRadius: 12, padding: "14px 16px", border: "1px solid #1e293b" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>Aaj ka progress</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>{totalChecked}/{allItems.length} items · {progress}%</span>
            </div>
            <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#10b981,#34d399)", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 6, padding: "14px 14px 4px", maxWidth: 680, margin: "0 auto" }}>
        {[["plan", "📋 Meal Plan"], ["summary", "📊 Nutrition"], ["skin", "🧴 Skin Routine"]].map(([k, l]) => (
          <button key={k} onClick={() => setActiveTab(k)} style={{
            flex: 1, padding: "10px 4px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
            background: activeTab === k ? "#10b981" : "#0f1923",
            color: activeTab === k ? "#000" : "#475569",
          }}>{l}</button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "12px 14px" }}>

        {/* MEAL PLAN */}
        {activeTab === "plan" && (
          <div className="fu">
            {plan.map((meal, mi) => {
              const mp = getMealProgress(meal);
              const isExpanded = expandedMeal === meal.id;
              const allDone = mp && mp.done === mp.total;

              if (meal.isGym) return (
                <div key={meal.id} style={{ background: "linear-gradient(135deg,#1a0505,#070a0f)", border: "1px solid #ef444425", borderRadius: 14, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 24 }}>🏋️</div>aQzzz!1111111
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 11, color: "#475569" }}>{meal.time}</span>
                      <span style={{ background: "#ef444420", color: "#ef4444", fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>GYM</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{meal.label}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{meal.note}</div>
                  </div>
                </div>
              );

              return (
                <div key={meal.id} className="card" style={{
                  background: allDone ? "#071a10" : "#0d1117",
                  border: `1px solid ${allDone ? "#10b98140" : "#161d26"}`,
                  borderRadius: 14, marginBottom: 10, overflow: "hidden",
                  transition: "all 0.2s",
                }}>
                 
                  <div onClick={() => setExpandedMeal(isExpanded ? null : meal.id)} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "#080c10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `1px solid ${meal.color}25`, flexShrink: 0, position: "relative" }}>
                      {meal.emoji}
                      {allDone && <div style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, background: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>✓</div>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "#475569" }}>{meal.time}</span>
                        <span style={{ background: `${meal.color}18`, color: meal.color, fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase" }}>{meal.label}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: allDone ? "#10b981" : "#e2e8f0" }}>{meal.timing}</div>
                      {meal.calories && <div style={{ fontSize: 11, color: "#334155", marginTop: 1 }}>{meal.calories} kcal · {meal.protein}g protein</div>}
                    </div>
                    {mp && (
                      <div style={{ textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: allDone ? "#10b981" : "#475569" }}>{mp.done}/{mp.total}</div>
                        <div style={{ width: 36, height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden", marginTop: 3 }}>
                          <div style={{ height: "100%", width: `${mp.pct}%`, background: allDone ? "#10b981" : meal.color, transition: "width 0.3s" }} />
                        </div>
                      </div>
                    )}
                    <span style={{ color: "#1e293b", fontSize: 14, flexShrink: 0 }}>{isExpanded ? "▲" : "▼"}</span>
                  </div>

                  {meal.note && (
                    <div style={{ margin: "0 14px 10px", background: "#080c10", borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "#64748b", borderLeft: `3px solid ${meal.color}` }}>
                      {meal.note}
                    </div>
                  )}

                  {isExpanded && meal.items && (
                    <div style={{ padding: "0 14px 14px" }}>
                      {meal.items.map((item) => {
                        const isDone = !!checked[item.id];
                        return (
                          <div key={item.id} className="cb" onClick={() => toggleItem(item.id)} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                            borderRadius: 10, marginBottom: 6, cursor: "pointer",
                            background: isDone ? "#10b98112" : "#080c10",
                            border: `1px solid ${isDone ? "#10b98135" : "#1e293b"}`,
                            transition: "all 0.2s",
                          }}>
                            <div style={{
                              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                              background: isDone ? "#10b981" : "transparent",
                              border: `2px solid ${isDone ? "#10b981" : "#334155"}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 12, color: "#000", fontWeight: 700,
                              transition: "all 0.2s",
                            }}>{isDone ? "✓" : ""}</div>
                            <span style={{ fontSize: 13, color: isDone ? "#64748b" : "#94a3b8", textDecoration: isDone ? "line-through" : "none", lineHeight: 1.5, transition: "all 0.2s" }}>
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <button onClick={resetDay} style={{ width: "100%", padding: "12px", background: "#0f1923", border: "1px solid #1e293b", borderRadius: 12, color: "#475569", fontSize: 13, cursor: "pointer", marginTop: 4 }}>
              🔄 Nayi din ke liye reset karo
            </button>
          </div>
        )}

        {activeTab === "summary" && (
          <div className="fu">
            <div style={{ background: "linear-gradient(135deg,#001208,#070a0f)", border: "1px solid #10b98130", borderRadius: 14, padding: 20, marginBottom: 12, textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#10b981", letterSpacing: 2 }}>~2800</div>
              <div style={{ fontSize: 12, color: "#475569" }}>kcal/day · Soya 100g karne se ~2970 kcal</div>
            </div>

            {[
              { label: "Protein", current: "144g", target: "170g", tip: "Soya 100g karo → 170g ho jaayega", color: "#10b981", pct: 85 },
              { label: "Carbs", current: "370g", target: "400g", tip: "Bananas + chawal se comfortable range mein", color: "#f59e0b", pct: 92 },
              { label: "Fat", current: "73g", target: "70g+", tip: "Peanuts + ghee se achha fat milta hai", color: "#8b5cf6", pct: 100 },
              { label: "Fiber", current: "42g", target: "38g+", tip: "Flaxseeds + chana se sufficient hai", color: "#06b6d4", pct: 100 },
            ].map((item) => (
              <div key={item.label} style={{ background: "#0d1117", border: "1px solid #161d26", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: item.color }}>{item.current} / {item.target}</span>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 8 }}>
                  <div style={{ height: "100%", width: `${Math.min(item.pct, 100)}%`, background: item.color, borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: 12, color: "#475569" }}>💡 {item.tip}</div>
              </div>
            ))}

            <div style={{ background: "#0d1117", border: "1px solid #f59e0b30", borderRadius: 14, padding: 16, marginTop: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginBottom: 10 }}>📋 Meal-wise Breakdown</div>
              {plan.filter(m => m.calories).map(m => (
                <div key={m.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #0f1923", fontSize: 12 }}>
                  <span style={{ color: "#64748b" }}>{m.time} — {m.label}</span>
                  <span style={{ color: m.color }}>{m.calories} kcal · P:{m.protein}g</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#0a0a1a", border: "1px solid #6366f130", borderRadius: 14, padding: 16, marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#a5b4fc", marginBottom: 10 }}>💊 Daily Supplements</div>
              {[
                ["Creatine 5g", "Post-workout paani ke saath", "#10b981"],
                ["Zinc 25mg", "Lunch ke baad — acne + skin control", "#f97316"],
                ["Omega-3 capsule", "Dinner ke saath — anti-inflammatory", "#6366f1"],
                ["Flaxseeds 1 tbsp", "Dahi mein mix karo — gut + hormones", "#8b5cf6"],
              ].map(([name, tip, color]) => (
                <div key={name} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid #0f1923" }}>
                  <span style={{ color, fontSize: 14 }}>◆</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{name}</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "skin" && (
          <div className="fu">
            <div style={{ background: "#0a0515", border: "1px solid #6366f130", borderRadius: 12, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#a5b4fc", lineHeight: 1.6 }}>
              🎯 Teri skin mein oiliness zyada hai + forehead + cheeks pe acne. Yeh diet + routine dono fix karenge. 2-3 hafte strict follow karo.
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", marginBottom: 8, padding: "0 2px" }}>Daily Checklist</div>
            {skinRules.map((rule, i) => {
              const isDone = rule.done || !!skinChecked[i];
              return (
                <div key={i} className="cb" onClick={() => !rule.done && toggleSkin(i)} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  borderRadius: 12, marginBottom: 8, cursor: rule.done ? "default" : "pointer",
                  background: isDone ? "#10b98112" : "#0d1117",
                  border: `1px solid ${isDone ? "#10b98135" : "#161d26"}`,
                  transition: "all 0.2s",
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                    background: isDone ? "#10b981" : "transparent",
                    border: `2px solid ${isDone ? "#10b981" : "#334155"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, color: "#000", fontWeight: 700,
                  }}>{isDone ? "✓" : ""}</div>
                  <span style={{ fontSize: 13, color: isDone ? "#64748b" : "#94a3b8", textDecoration: isDone ? "line-through" : "none" }}>
                    {rule.text}
                  </span>
                </div>
              );
            })}

            <div style={{ background: "#0d1117", border: "1px solid #ef444430", borderRadius: 14, padding: 16, marginTop: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 10 }}>🚫 Avoid Karo — Acne Triggers</div>
              {["Late dinner (10-11 PM) → 8 PM karo strictly","Maida — bread, noodles, biscuits","Packaged juices — hidden sugar","Dahi + milk + paneer ek saath ek meal mein","Mass gainer supplements — sugar bomb","Touching face after gym without washing hands"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < 5 ? "1px solid #0f1923" : "none" }}>
                  <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#0d1117", border: "1px solid #10b98130", borderRadius: 14, padding: 16, marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981", marginBottom: 10 }}>✅ Skincare Products — Simple Routine</div>
              {[
                ["Face wash", "Salicylic acid 2% — post gym + raat (Minimalist / Neutrogena)"],
                ["Moisturizer", "Oil-free, non-comedogenic — Dot & Key / Simple brand"],
                ["Sunscreen", "SPF 50 matte finish — garmi mein zaroor (Minimalist SPF 50)"],
                ["Spot treatment", "Benzoyl peroxide 2.5% — sirf active pimple pe raat ko"],
              ].map(([name, tip]) => (
                <div key={name} style={{ padding: "7px 0", borderBottom: "1px solid #0f1923" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{tip}</div>
                </div>
              ))}
            </div>
          </div> 
        )}
      </div>
    </div>
  );
}

