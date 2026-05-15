import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PizzaSVG from "../components/PizzaSVG";
import { VEG_PIZZAS, NON_VEG_PIZZAS, ADDONS, COMBOS } from "../data/pizzaData";
import banner1 from "../assets/banner-1.png";

/* ─── BRAND ──────────────────────────────────────────────────────────────── */
const BRAND = "ANNAPURNA";

/* ─── ALL ADD-ONS (addons + garlic bread) ───────────────────────────────── */
const ALL_ADDONS = [
  ...ADDONS.map((a, i) => ({ ...a, id: `addon_${i}`, type:"addon" })),
  { id:"garlic_bread", name:"Garlic Bread", price:170, emoji:"🥖", isVeg:true,
    bg:"linear-gradient(135deg,#FFF8E8,#FFEFD0)", type:"side" },
];

/* ─── LOGO SVG ───────────────────────────────────────────────────────────── */
function LogoIcon({ size=24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="15" fill="#E6392E"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.28"/>
      <path d="M16 7 L23 24 L9 24 Z" fill="white" opacity="0.16"/>
      <circle cx="13" cy="18" r="1.4" fill="white" opacity="0.52"/>
      <circle cx="18" cy="20" r="1.4" fill="white" opacity="0.52"/>
      <circle cx="16" cy="14" r="0.9" fill="white" opacity="0.42"/>
      <circle cx="16" cy="6" r="2.5" fill="#D9A441"/>
      <circle cx="16" cy="6" r="1.1" fill="white" opacity="0.55"/>
    </svg>
  );
}

/* ─── HERO PIZZA ─────────────────────────────────────────────────────────── */
function HeroPizza({ pizza, size=152 }) {
  const cx=size*0.48, cy=size*0.46, cR=size*0.4, sR=size*0.33, chR=size*0.3;
  const gId=`hp${pizza.id}`;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow:"visible"}}>
        <defs>
          <radialGradient id={`${gId}cr`} cx="44%" cy="36%" r="55%"><stop offset="0%" stopColor="#F2CC60"/><stop offset="52%" stopColor={pizza.crustColor}/><stop offset="100%" stopColor="#7A4A05"/></radialGradient>
          <radialGradient id={`${gId}sa`} cx="50%" cy="45%" r="50%"><stop offset="0%" stopColor="#FF9999"/><stop offset="100%" stopColor={pizza.sauceColor}/></radialGradient>
          <radialGradient id={`${gId}ch`} cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFF5B0"/><stop offset="100%" stopColor={pizza.cheeseColor}/></radialGradient>
          <filter id={`${gId}ds`}><feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#B06020" floodOpacity="0.22"/></filter>
        </defs>
        <ellipse cx={cx} cy={size*0.93} rx={cR*0.78} ry={size*0.05} fill="rgba(0,0,0,0.09)"/>
        <circle cx={cx} cy={cy} r={cR} fill={`url(#${gId}cr)`} filter={`url(#${gId}ds)`}/>
        {Array.from({length:16}).map((_,i)=>{ const a=(i/16)*Math.PI*2; return <circle key={i} cx={cx+Math.cos(a)*cR*0.93} cy={cy+Math.sin(a)*cR*0.93} r={size*0.014} fill="#8A5005" opacity="0.44"/>; })}
        <circle cx={cx} cy={cy} r={sR} fill={`url(#${gId}sa)`}/>
        <circle cx={cx} cy={cy} r={chR} fill={`url(#${gId}ch)`} opacity="0.9"/>
        {Array.from({length:8}).map((_,i)=>{ const a=(i/8)*Math.PI*2; return <ellipse key={i} cx={cx+Math.cos(a)*chR*0.45} cy={cy+Math.sin(a)*chR*0.45} rx={chR*0.33} ry={chR*0.22} fill={pizza.cheeseColor} opacity="0.5"/>; })}
        {Array.from({length:10}).map((_,i)=>{ const a=(i/10)*Math.PI*2+0.2; const r2=chR*0.54+(i%3)*chR*0.18; return <circle key={i} cx={cx+Math.cos(a)*r2} cy={cy+Math.sin(a)*r2} r={size*0.022+(i%2)*size*0.01} fill={pizza.toppings[i%pizza.toppings.length]} opacity="0.92"/>; })}
        {[0,1,2,3].map((_,i)=>{ const a=(i/4)*Math.PI*2+1; const lx=cx+Math.cos(a)*chR*0.7, ly=cy+Math.sin(a)*chR*0.7; return (<g key={i} transform={`rotate(${a*57.3+20},${lx},${ly})`}><ellipse cx={lx} cy={ly} rx={size*0.046} ry={size*0.024} fill="#1E7A2E" opacity="0.88"/></g>); })}
        {[[-0.16,0.28],[-0.05,0.24],[0.06,0.26],[0.15,0.22]].map(([ox,len],i)=>(
          <motion.line key={i} x1={cx+ox*size} y1={cy-chR+4} x2={cx+ox*size*1.4} y2={cy-chR-len*size}
            stroke={pizza.cheeseColor} strokeWidth={size*0.013-i*size*0.003} strokeLinecap="round" opacity={0.7-i*0.13}
            animate={{ y2:[cy-chR-len*size, cy-chR-len*size*0.5, cy-chR-len*size] }}
            transition={{ duration:2.4+i*0.4, repeat:Infinity, ease:"easeInOut" }}/>
        ))}
      </svg>
      {[{top:0,left:10,em:"🌿",d:3.2},{top:28,left:-4,em:"🌱",d:3.9},{top:2,right:2,em:"🍃",d:4.2}].map((l,i)=>(
        <motion.div key={i} style={{ position:"absolute", top:l.top, left:l.left, right:l.right, fontSize:13, pointerEvents:"none" }}
          animate={{ y:[-4,4,-4], rotate:[-14,14,-14] }} transition={{ duration:l.d, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}>{l.em}</motion.div>
      ))}
    </div>
  );
}

/* ─── PIZZA LIST CARD ─────────────────────────────────────────────────────── */
const PIZZA_TAGS = [
  {label:"Signature",icon:"✦"},{label:"Chef's Choice",icon:"👨‍🍳"},{label:"House Special",icon:"🏠"},
  {label:"Must Try",icon:"💫"},{label:"Fan Favorite",icon:"❤️"},
];
function getPizzaTag(pizza, index) {
  if (pizza.badge==="BESTSELLER") return {label:"Bestseller",icon:"⭐"};
  if (pizza.badge==="POPULAR")    return {label:"Popular",   icon:"🔥"};
  if (pizza.badge?.includes("HOT")) return {label:"Spicy",  icon:"🌶️"};
  const t = PIZZA_TAGS[index % PIZZA_TAGS.length];
  return {label:t.label, icon:t.icon};
}

function PizzaListCard({ pizza, index, onAdd, isVeg }) {
  const tag   = getPizzaTag(pizza, index);
  const color = isVeg ? "#27AE60" : "#E6392E";
  const numBg = isVeg ? "linear-gradient(160deg,#618024,#8FA840)" : "linear-gradient(160deg,#C0311F,#E6392E)";
  return (
    <motion.div style={{ display:"flex", alignItems:"center", background:"white", borderRadius:26, boxShadow:"0 6px 22px rgba(0,0,0,0.08)", overflow:"visible", marginBottom:12, position:"relative" }}
      whileHover={{y:-2,boxShadow:"0 12px 36px rgba(0,0,0,0.12)"}} whileTap={{scale:0.985}}
      initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:index*0.05,type:"spring",stiffness:280,damping:26}}>
      {/* number tab */}
      <div style={{ width:36, alignSelf:"stretch", background:numBg, borderRadius:"26px 0 0 26px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:11, color:"rgba(255,255,255,0.95)", writingMode:"vertical-rl", transform:"rotate(180deg)", letterSpacing:1 }}>{pizza.num}</span>
      </div>
      {/* pizza image */}
      <div style={{ width:100, height:100, borderRadius:"50%", background:isVeg?"linear-gradient(145deg,#EEF5E4,#E2EDD0)":"linear-gradient(145deg,#FFEEED,#FFD8D4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, margin:"13px 0 13px 13px", boxShadow:"0 4px 16px rgba(0,0,0,0.10)", overflow:"hidden" }}>
        {pizza.img
          ? <img src={pizza.img} alt={pizza.name} loading="lazy"
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }}
              onError={e=>{ e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex"; }}/>
          : null}
        <div style={{ display:pizza.img?"none":"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", transform:"scale(0.9)" }}>
          <PizzaSVG pizza={pizza} size={100}/>
        </div>
      </div>
      {/* content */}
      <div style={{ flex:1, padding:"14px 12px 14px 14px", minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:2 }}>
          <div style={{ width:13, height:13, border:`1.8px solid ${color}`, borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <div style={{ width:5.5, height:5.5, borderRadius:"50%", background:color }}/>
          </div>
          <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:13.5, color:"#1E1E1E", lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pizza.name}</h3>
        </div>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:isVeg?"#618024":"#C0311F", fontStyle:"italic", fontWeight:600, marginBottom:4 }}>{tag.icon} {tag.label}</p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#A0917F", lineHeight:1.4, marginBottom:8, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{pizza.desc}</p>
        <div style={{ borderTop:"1.5px dashed #EDE5DC", marginBottom:8 }}/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:900, fontSize:16, color:"#E6392E", letterSpacing:-0.5 }}>{pizza.price}/-</span>
          <motion.button style={{ width:32, height:32, borderRadius:"50%", background:isVeg?"linear-gradient(135deg,#618024,#8FA840)":"linear-gradient(135deg,#E6392E,#A8251C)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 12px ${isVeg?"rgba(97,128,36,0.42)":"rgba(230,57,46,0.42)"}`, flexShrink:0 }}
            whileHover={{scale:1.14}} whileTap={{scale:0.86}} onClick={e=>{ e.stopPropagation(); onAdd(pizza); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


/* ─── COMBOS CONTENT ─────────────────────────────────────────────────────── */
function CombosContent({ onAdd }) {
  return (
    <div style={{ padding:"16px 14px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <span style={{ fontSize:20 }}>🍕</span>
        <div>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:17, color:"#1E1E1E" }}>Pizza Combos</p>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10.5, color:"#B0A090" }}>Best value meal deals</p>
        </div>
      </div>
      {COMBOS.map((combo) => (
        <motion.div key={combo.id}
          style={{ background:"white", borderRadius:22, padding:"16px", marginBottom:12, boxShadow:"0 6px 22px rgba(0,0,0,0.08)", border:`1.5px solid ${combo.isVeg?"rgba(97,128,36,0.15)":"rgba(230,57,46,0.15)"}` }}
          whileHover={{y:-2}}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:52, height:52, borderRadius:16, background:combo.isVeg?"linear-gradient(135deg,#EEF8E0,#DFF0CC)":"linear-gradient(135deg,#FFEFED,#FFD8D4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{combo.emoji}</div>
              <div>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:14, color:"#1E1E1E" }}>{combo.name}</p>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
                  <div style={{ width:10, height:10, border:`1.5px solid ${combo.isVeg?"#27AE60":"#E6392E"}`, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", background:combo.isVeg?"#27AE60":"#E6392E" }}/>
                  </div>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:9, fontWeight:700, color:combo.isVeg?"#618024":"#E6392E" }}>{combo.isVeg?"PURE VEG":"NON-VEG"}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:900, fontSize:20, color:"#E6392E" }}>₹{combo.price}</p>
              <motion.button style={{ marginTop:6, background:combo.isVeg?"linear-gradient(135deg,#618024,#8FA840)":"linear-gradient(135deg,#E6392E,#A8251C)", border:"none", borderRadius:12, padding:"6px 16px", cursor:"pointer", boxShadow:`0 4px 14px ${combo.isVeg?"rgba(97,128,36,0.35)":"rgba(230,57,46,0.35)"}` }}
                whileTap={{scale:0.92}} onClick={()=>onAdd({id:`combo_${combo.id}`,name:combo.name,price:combo.price,isVeg:combo.isVeg,emoji:combo.emoji})}>
                <span style={{ color:"white", fontSize:12, fontWeight:700 }}>Add +</span>
              </motion.button>
            </div>
          </div>
          <div style={{ borderTop:"1.5px dashed #EDE5DC", paddingTop:10, display:"flex", flexWrap:"wrap", gap:6 }}>
            {combo.items.map((item,i)=>(
              <span key={i} style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#6B4A2B", background:"rgba(0,0,0,0.04)", padding:"3px 10px", borderRadius:20, border:"1px solid rgba(0,0,0,0.06)" }}>{item}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── ADD-ONS CONTENT ────────────────────────────────────────────────────── */
function AddOnsContent({ onAdd }) {
  return (
    <div style={{ padding:"16px 14px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <span style={{ fontSize:20 }}>✨</span>
        <div>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:17, color:"#1E1E1E" }}>Add-Ons & Sides</p>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10.5, color:"#B0A090" }}>Make your order even better</p>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {ALL_ADDONS.map((a, i) => (
          <motion.div key={a.id}
            style={{ background:a.bg||"white", borderRadius:22, padding:"18px 14px", boxShadow:"0 5px 18px rgba(0,0,0,0.07)", border:`1px solid rgba(255,255,255,0.9)`, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}
            whileHover={{y:-3,boxShadow:"0 10px 28px rgba(0,0,0,0.12)"}} whileTap={{scale:0.96}}
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}>
            <div style={{ position:"relative", width:64, height:64 }}>
              {a.img
                ? <img src={a.img} alt={a.name} loading="lazy"
                    style={{ width:64, height:64, borderRadius:14, objectFit:"cover", objectPosition:"center", display:"block" }}
                    onError={e=>{ e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex"; }}/>
                : null}
              <div style={{ display:a.img?"none":"flex", width:64, height:64, alignItems:"center", justifyContent:"center" }}>
                <motion.span style={{ fontSize:36 }} animate={{rotate:[-4,4,-4]}} transition={{duration:3+i*0.4,repeat:Infinity,ease:"easeInOut"}}>{a.emoji}</motion.span>
              </div>
              <div style={{ position:"absolute", top:-3, right:-6, width:13, height:13, borderRadius:"50%", background:a.isVeg?"#27AE60":"#E6392E", border:"2px solid white" }}/>
            </div>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:12, color:"#1E1E1E", textAlign:"center" }}>{a.name}</p>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:900, fontSize:15, color:"#E6392E" }}>+₹{a.price}</p>
            <motion.button style={{ width:"100%", padding:"8px 0", borderRadius:14, background:a.isVeg?"linear-gradient(135deg,#618024,#8FA840)":"linear-gradient(135deg,#E6392E,#A8251C)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:4, boxShadow:`0 4px 12px ${a.isVeg?"rgba(97,128,36,0.35)":"rgba(230,57,46,0.35)"}` }}
              whileTap={{scale:0.9}} onClick={()=>onAdd(a)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></svg>
              <span style={{ color:"white", fontSize:11, fontWeight:700 }}>Add to Cart</span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── CART CONTENT ───────────────────────────────────────────────────────── */
function CartContent({ items, onUpdateQty, navigate }) {
  const total     = items.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  const isEmpty   = items.length === 0;

  return (
    <div style={{ padding:"16px 14px" }}>
      {/* heading */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <span style={{ fontSize:22 }}>🛒</span>
        <div>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:17, color:"#1E1E1E" }}>Your Cart</p>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10.5, color:"#B0A090" }}>
            {isEmpty ? "Nothing added yet" : `${itemCount} item${itemCount!==1?"s":""} · ₹${total}`}
          </p>
        </div>
      </div>

      {isEmpty ? (
        <motion.div style={{ textAlign:"center", padding:"40px 0" }} initial={{opacity:0}} animate={{opacity:1}}>
          <div style={{ fontSize:60, marginBottom:12 }}>🍕</div>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:"#C0A890", marginBottom:6 }}>Your cart is empty</p>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#C0B0A0" }}>Add some delicious pizzas!</p>
        </motion.div>
      ) : (
        <>
          {/* item list */}
          <div style={{ marginBottom:14 }}>
            <AnimatePresence>
              {items.map(item => (
                <motion.div key={item.id}
                  style={{ display:"flex", alignItems:"center", background:"white", borderRadius:18, padding:"12px 14px", marginBottom:10, boxShadow:"0 4px 14px rgba(0,0,0,0.07)" }}
                  initial={{opacity:0,x:-14}} animate={{opacity:1,x:0}} exit={{opacity:0,x:14,height:0,padding:0,marginBottom:0}}
                  layout>
                  {/* emoji / veg dot */}
                  <div style={{ width:40, height:40, borderRadius:12, background:item.isVeg?"linear-gradient(135deg,#EEF8E0,#DFF0CC)":"linear-gradient(135deg,#FFEFED,#FFD8D4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                    {item.emoji || "🍕"}
                  </div>
                  <div style={{ flex:1, padding:"0 10px" }}>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:12.5, color:"#1E1E1E", lineHeight:1.2 }}>{item.name}</p>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"#E6392E", fontWeight:800, marginTop:2 }}>₹{item.price * item.qty}</p>
                  </div>
                  {/* qty controls */}
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <motion.button style={{ width:26, height:26, borderRadius:"50%", background:"#F4ECE4", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
                      whileTap={{scale:0.86}} onClick={()=>onUpdateQty(item.id, -1)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round"/></svg>
                    </motion.button>
                    <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:14, color:"#1E1E1E", minWidth:18, textAlign:"center" }}>{item.qty}</span>
                    <motion.button style={{ width:26, height:26, borderRadius:"50%", background:"#E6392E", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
                      whileTap={{scale:0.86}} onClick={()=>onUpdateQty(item.id, 1)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* bill summary */}
          <div style={{ background:"white", borderRadius:20, padding:"16px", marginBottom:14, boxShadow:"0 4px 16px rgba(0,0,0,0.07)" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, color:"#1E1E1E", marginBottom:10 }}>Bill Summary</p>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#7B5A3A" }}>Items ({itemCount})</span>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#7B5A3A", fontWeight:600 }}>₹{total}</span>
            </div>
            <div style={{ borderTop:"1.5px dashed #EDE5DC", paddingTop:8, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:14, color:"#1E1E1E" }}>Total</span>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:900, fontSize:18, color:"#E6392E" }}>₹{total}</span>
            </div>
          </div>

          {/* place order note */}
          <motion.div style={{ background:"linear-gradient(135deg,#FFF8E8,#FFF0D0)", borderRadius:20, padding:"16px 18px", marginBottom:14, border:"1.5px solid rgba(217,164,65,0.3)", display:"flex", alignItems:"flex-start", gap:12 }}
            animate={{scale:[1,1.01,1]}} transition={{duration:3,repeat:Infinity}}>
            <div style={{ fontSize:28, flexShrink:0 }}>🧾</div>
            <div>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:14, color:"#7A4A00", marginBottom:3 }}>Place Order at Counter</p>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11.5, color:"#9A6A20", lineHeight:1.55 }}>Show this cart to our team at the counter to place your order. We'll prepare it fresh for you!</p>
            </div>
          </motion.div>
        </>
      )}

      {/* game while waiting */}
      <motion.div style={{ background:"linear-gradient(135deg,#1E1E1E,#2E2E2E)", borderRadius:22, padding:"18px 18px", marginBottom:4 }}
        whileHover={{scale:1.01}}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <motion.div style={{ fontSize:28 }} animate={{rotate:[0,15,-15,0]}} transition={{duration:3,repeat:Infinity}}>🎲</motion.div>
          <div>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:13.5, color:"white" }}>Waiting for your order?</p>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10.5, color:"rgba(255,255,255,0.6)" }}>Play Dots &amp; Boxes while it's prepared!</p>
          </div>
        </div>
        <motion.button style={{ width:"100%", padding:"12px 0", background:"linear-gradient(135deg,#E6392E,#FF5540)", border:"none", borderRadius:14, cursor:"pointer", fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:13, color:"white", letterSpacing:0.5, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 6px 20px rgba(230,57,46,0.4)" }}
          whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>navigate("/games")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="12" rx="4" stroke="white" strokeWidth="1.7"/><path d="M8 11v4M6 13h4" stroke="white" strokeWidth="1.7" strokeLinecap="round"/><circle cx="16" cy="12" r="1.1" fill="white"/><circle cx="18" cy="14" r="1.1" fill="white"/></svg>
          PLAY WITH US →
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ─── MENU PAGE ──────────────────────────────────────────────────────────── */
export default function MenuPage() {
  const navigate = useNavigate();
  const [category,    setCategory]    = useState("veg");
  const [activeTab,   setActiveTab]   = useState(0);
  const [cartItems,   setCartItems]   = useState([]);
  const [toast,       setToast]       = useState(null);

  const isVeg  = category === "veg";
  const pizzas = isVeg ? VEG_PIZZAS : NON_VEG_PIZZAS;

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (item) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === (item.id ?? item.name));
      if (ex) return prev.map(i => (i.id===(item.id??item.name)) ? {...i,qty:i.qty+1} : i);
      return [...prev, { id:item.id??item.name, name:item.name, price:item.price, isVeg:item.isVeg, qty:1, emoji:item.emoji }];
    });
    setToast({ msg:`${item.name} added!`, color: item.isVeg ? "#618024" : "#E6392E" });
    setTimeout(() => setToast(null), 1400);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(i => i.id===id ? {...i,qty:Math.max(0,i.qty+delta)} : i).filter(i=>i.qty>0));
  };

  const NAV_TABS = [
    { label:"Menu",    idx:0, icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { label:"Combos",  idx:1, icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="13" rx="2" stroke={c} strokeWidth="1.7"/><path d="M12 8V21M3 12h18" stroke={c} strokeWidth="1.7"/></svg> },
    { label:"Add-ons", idx:2, icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/><path d="M12 8v8M8 12h8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg> },
    { label:"Cart",    idx:3, icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="21" y2="6" stroke={c} strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg> },
  ];

  return (
    <div style={{ width:"100%", maxWidth:430, height:"100svh", display:"flex", flexDirection:"column", background:"#EDE4D4", overflow:"hidden", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Pacifico&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .s-hide{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;}
        .s-hide::-webkit-scrollbar{display:none;}
        .hs{overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none;}
        .hs::-webkit-scrollbar{display:none;}
      `}</style>

      {/* ambient orbs */}
      <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(230,57,46,0.07) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }}/>

      {/* ── COMPACT HEADER — glass so banner shows behind it ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 18px 8px", flexShrink:0, position:"relative", zIndex:100, background: activeTab===0 ? "rgba(237,228,212,0.28)" : "rgba(237,228,212,0.97)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", boxShadow: activeTab===0 ? "none" : "0 1px 0 rgba(0,0,0,0.06)", transition:"background 0.3s" }}>
        {/* Back button */}
        <motion.button
          style={{ background:"white", border:"none", borderRadius:12, padding:"8px 12px", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 12px rgba(0,0,0,0.08)" }}
          whileTap={{scale:0.88}} onClick={()=>navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="#1E1E1E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        <motion.div style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer" }}
          onClick={() => navigate("/")} whileTap={{ scale:0.93 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <LogoIcon size={22}/>
            <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:18, letterSpacing:2, color:"#E6392E", lineHeight:1 }}>{BRAND}</span>
          </div>
          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:7, letterSpacing:2.5, color:"#B0A090", fontWeight:600 }}>— PIZZA CO. —</span>
        </motion.div>

        <motion.button style={{ position:"relative", width:40, height:40, borderRadius:"50%", border:"2px solid #E6392E", background:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 14px rgba(230,57,46,0.18)" }}
          whileHover={{scale:1.07}} whileTap={{scale:0.9}} onClick={()=>setActiveTab(3)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="#E6392E" strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <AnimatePresence mode="popLayout">
            {cartCount > 0 && (
              <motion.div key={cartCount} style={{ position:"absolute", top:-5, right:-5, width:18, height:18, background:"#E6392E", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}
                initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={{type:"spring",stiffness:420,damping:22}}>
                <span style={{ color:"white", fontSize:9, fontWeight:700 }}>{cartCount}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="s-hide" style={{ flex:1, overflowY:"auto" }}>

        {/* ═══ MENU TAB ═══ */}
        {activeTab === 0 && (
          <>
            {/* ── BANNER — extends up behind the glass header ── */}
            <div style={{
              position:"relative",
              backgroundImage:`url(${banner1})`,
              backgroundSize:"cover",
              backgroundPosition:"center top",
              marginTop:-58,
              paddingTop:58,
            }}>
              {/* reduced overlay — left fade only, image stays clear on right */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(20,10,5,0.42) 0%,rgba(20,10,5,0.18) 52%,transparent 100%)", pointerEvents:"none" }}/>

              {/* hero text */}
              <div style={{ padding:"16px 18px 18px", position:"relative", zIndex:5 }}>
                <motion.p initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.08}}
                  style={{ fontFamily:"'Pacifico',cursive", fontSize:15, color:"#D9A441", marginBottom:4 }}>
                  Fresh Ingredients,
                </motion.p>
                <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.15}}>
                  <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color:"white", lineHeight:0.92, letterSpacing:1 }}>IRRESISTIBLE</div>
                  <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color:"#FF6B5B", lineHeight:0.92, letterSpacing:1 }}>PIZZA!</div>
                </motion.div>
                <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:0.28,duration:0.38}}
                  style={{ height:2, width:38, background:"linear-gradient(90deg,#FF6B5B,#D9A441)", borderRadius:3, margin:"8px 0 6px", transformOrigin:"left" }}/>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
                  style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"rgba(255,255,255,0.88)", lineHeight:1.5, fontWeight:400 }}>
                  Farm fresh veggies & 100% real cheese
                </motion.p>
              </div>
            </div>

            {/* ── VEG / NON-VEG — outside banner so sticky works throughout scroll ── */}
            <div style={{ position:"sticky", top:0, zIndex:50, padding:"10px 14px", background:"rgba(237,228,212,0.97)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}>
              <div style={{ background:"white", borderRadius:50, padding:4, display:"flex", boxShadow:"0 4px 18px rgba(0,0,0,0.09)" }}>
                {[{label:"VEG",icon:"🌿",val:"veg"},{label:"NON-VEG",icon:"🍗",val:"nonveg"}].map(cat => {
                  const on = category===cat.val;
                  const bg = on ? (cat.val==="veg"?"linear-gradient(135deg,#618024,#8FA840)":"linear-gradient(135deg,#C02818,#E6392E)") : "transparent";
                  return (
                    <motion.button key={cat.val} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px 0", borderRadius:46, border:"none", cursor:"pointer", fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, background:bg, color:on?"white":"#9CA3AF" }}
                      onClick={()=>setCategory(cat.val)} whileTap={{scale:0.96}} layout>
                      <span style={{fontSize:15}}>{cat.icon}</span>{cat.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* pizza list */}
            <div style={{ padding:"14px 14px 0" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <span style={{ fontSize:14 }}>{isVeg?"🌿":"🍗"}</span>
                  <div>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:16, color:"#1E1E1E", lineHeight:1 }}>{isVeg?"Veg Pizza":"Non-Veg Pizza"}</p>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#B0A090", marginTop:2 }}>{pizzas.length} varieties</p>
                  </div>
                </div>
                <motion.button style={{ display:"flex", alignItems:"center", gap:5, background:"white", border:"none", borderRadius:20, padding:"7px 13px", cursor:"pointer", boxShadow:"0 3px 12px rgba(0,0,0,0.07)" }} whileTap={{scale:0.93}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:600, color:"#6B7280" }}>Filter</span>
                </motion.button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={category} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.18}}>
                  {pizzas.map((pizza, idx) => (
                    <PizzaListCard key={pizza.id} pizza={pizza} index={idx} isVeg={pizza.isVeg} onAdd={addToCart}/>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ height:20 }}/>
          </>
        )}

        {/* ═══ COMBOS TAB ═══ */}
        {activeTab === 1 && <CombosContent onAdd={addToCart}/>}

        {/* ═══ ADD-ONS TAB ═══ */}
        {activeTab === 2 && <AddOnsContent onAdd={addToCart}/>}

        {/* ═══ CART TAB ═══ */}
        {activeTab === 3 && <CartContent items={cartItems} onUpdateQty={updateQty} navigate={navigate}/>}

        {/* ── FOOTER ── */}
        <div style={{ textAlign:"center", padding:"6px 0 8px" }}>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:9.5, color:"#C0B0A0", letterSpacing:0.4 }}>
            Developed by <span style={{ fontWeight:700, color:"#A09080" }}>VELQEIN</span>
            {" | "}www.velqein.com
          </p>
        </div>

        <div style={{ height:96 }}/>
      </div>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{opacity:0,y:18,scale:0.84}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-14,scale:0.84}}
            style={{ position:"absolute", bottom:84, left:"50%", transform:"translateX(-50%)", background:toast.color, borderRadius:30, padding:"9px 24px", zIndex:400, boxShadow:`0 8px 26px ${toast.color}66`, whiteSpace:"nowrap" }}>
            <span style={{ color:"white", fontWeight:700, fontSize:13, fontFamily:"'Poppins',sans-serif" }}>✓ {toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM NAV ── */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 14px 14px", zIndex:300 }}>
        <motion.div style={{ background:"rgba(237,228,212,0.96)", backdropFilter:"blur(26px)", WebkitBackdropFilter:"blur(26px)", borderRadius:26, padding:"10px 4px", boxShadow:"0 -2px 0 rgba(0,0,0,0.03),0 -8px 34px rgba(0,0,0,0.09)", display:"flex", justifyContent:"space-around", border:"1px solid rgba(237,228,212,0.92)" }}
          initial={{y:80}} animate={{y:0}} transition={{type:"spring",stiffness:260,damping:22,delay:0.3}}>
          {NAV_TABS.map(item => {
            const on = activeTab===item.idx;
            const c  = on?"#E6392E":"#9CA3AF";
            return (
              <motion.button key={item.idx}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"6px 14px", borderRadius:16, border:"none", background:"transparent", cursor:"pointer", position:"relative" }}
                onClick={()=>setActiveTab(item.idx)} whileTap={{scale:0.87}}>
                <div style={{ position:"relative" }}>
                  <motion.div animate={{scale:on?1.12:1}} transition={{type:"spring",stiffness:420,damping:20}}>{item.icon(c)}</motion.div>
                  {/* cart badge on nav */}
                  {item.idx===3 && cartCount>0 && (
                    <div style={{ position:"absolute", top:-5, right:-6, width:16, height:16, background:"#E6392E", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ color:"white", fontSize:8, fontWeight:700 }}>{cartCount}</span>
                    </div>
                  )}
                </div>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, fontWeight:on?700:400, color:c }}>
                  {item.idx===3 && cartTotal>0 ? `₹${cartTotal}` : item.label}
                </span>
                {on && <motion.div layoutId="menuNav" style={{ position:"absolute", bottom:-2, width:22, height:3.5, background:"linear-gradient(90deg,#E6392E,#FF5555)", borderRadius:3 }} transition={{type:"spring",stiffness:380,damping:28}}/>}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
