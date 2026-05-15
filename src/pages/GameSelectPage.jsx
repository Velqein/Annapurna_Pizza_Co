import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GAME_MODES } from "../data/gameData";

/* ─── Dots & Boxes illustration ───────────────────────────────────────────── */
function GameIllustration() {
  const S = 30, P = 14, N = 4;
  const gx = c => P + c * S, gy = r => P + r * S;
  const drawnSet = new Set(["h_0_0","h_0_1","h_0_2","v_0_0","v_0_1","v_1_0","v_1_1","h_1_0","h_1_1","v_0_2","v_0_3","h_0_3","v_1_2","h_2_0","h_2_1","v_2_0","v_2_1","h_1_2"]);
  const boxes = { "0_0":0, "0_1":0, "1_0":1 };
  const COLORS2 = ["#E6392E","#3B82F6"];
  const hLines = [], vLines = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N-1; c++) hLines.push({ lid:`h_${r}_${c}`, x1:gx(c), y1:gy(r), x2:gx(c+1), y2:gy(r) });
  for (let r = 0; r < N-1; r++) for (let c = 0; c < N; c++) vLines.push({ lid:`v_${r}_${c}`, x1:gx(c), y1:gy(r), x2:gx(c), y2:gy(r+1) });
  return (
    <div style={{ position:"absolute", right:-4, top:0, width:160, height:180, zIndex:4 }}>
      <svg width="160" height="180" viewBox="0 0 160 180" style={{ overflow:"visible" }}>
        {Object.entries(boxes).map(([key, owner]) => {
          const [r,c] = key.split("_").map(Number);
          return (
            <g key={key}>
              <rect x={gx(c)+2} y={gy(r)+2} width={S-4} height={S-4} rx={6} fill={COLORS2[owner]} opacity={0.22}/>
              <circle cx={gx(c)+S/2} cy={gy(r)+S/2} r={9} fill={COLORS2[owner]} opacity={0.88}/>
              <text x={gx(c)+S/2} y={gy(r)+S/2+4} textAnchor="middle" fontSize={8} fontWeight="bold" fill="white" fontFamily="'Poppins',sans-serif">
                {owner===0?"P1":"P2"}
              </text>
            </g>
          );
        })}
        {[...hLines,...vLines].map(({lid,x1,y1,x2,y2})=>(
          <line key={lid} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={drawnSet.has(lid)?"#5B4A3A":"#DDCCB0"}
            strokeWidth={drawnSet.has(lid)?3.5:1.5} strokeLinecap="round"
            opacity={drawnSet.has(lid)?0.88:0.32}/>
        ))}
        {Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>(
          <circle key={`d_${r}_${c}`} cx={gx(c)} cy={gy(r)} r={3.5} fill="#1E1E1E"/>
        )))}
      </svg>
      {[{top:4,left:2,em:"🎯",d:3.4},{top:70,right:4,em:"✏️",d:4.1},{top:140,left:4,em:"🏆",d:3.8}].map((l,i)=>(
        <motion.div key={i} style={{ position:"absolute", top:l.top, left:l.left, right:l.right, fontSize:18, pointerEvents:"none" }}
          animate={{ y:[-6,6,-6], rotate:[-15,15,-15] }} transition={{ duration:l.d, repeat:Infinity, ease:"easeInOut" }}>{l.em}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Player mode card ────────────────────────────────────────────────────── */
function ModeCard({ mode, selected, onSelect }) {
  const on = selected;
  return (
    <motion.div
      style={{ borderRadius:20, border:`2px solid ${on?"#E6392E":"rgba(0,0,0,0.07)"}`, background:on?"rgba(230,57,46,0.04)":"white", padding:"16px 14px", cursor:"pointer", position:"relative", boxShadow:on?"0 8px 28px rgba(230,57,46,0.16)":"0 4px 16px rgba(0,0,0,0.06)" }}
      whileHover={{ y:-3, boxShadow:"0 12px 32px rgba(0,0,0,0.12)" }}
      whileTap={{ scale:0.96 }}
      onClick={onSelect}>

      {on && (
        <motion.div initial={{scale:0}} animate={{scale:1}} style={{ position:"absolute", top:10, right:10, width:22, height:22, borderRadius:"50%", background:"#E6392E", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.div>
      )}

      {/* icon */}
      <div style={{ width:48, height:48, borderRadius:16, background:on?"linear-gradient(135deg,#E6392E,#A8251C)":"linear-gradient(135deg,#F5EBDD,#EDE0CE)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:10, boxShadow:on?"0 6px 16px rgba(230,57,46,0.32)":"none" }}>
        {mode.players === 1 && (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke={on?"white":"#6B4A2B"} strokeWidth="1.8"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={on?"white":"#6B4A2B"} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        )}
        {mode.players === 2 && (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="8" r="3.5" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7"/>
            <circle cx="17" cy="8" r="3.5" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7"/>
            <path d="M2 20c0-3.5 3-6 7-6" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M22 20c0-3.5-3-6-7-6" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        )}
        {mode.players === 3 && (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7"/>
            <circle cx="6"  cy="13" r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7"/>
            <circle cx="18" cy="13" r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7"/>
            <path d="M5 21c0-3 3-5 7-5s7 2 7 5" stroke={on?"white":"#6B4A2B"} strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        )}
        {mode.players === 4 && (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="8"  cy="7"  r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.6"/>
            <circle cx="16" cy="7"  r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.6"/>
            <circle cx="8"  cy="17" r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.6"/>
            <circle cx="16" cy="17" r="3" stroke={on?"white":"#6B4A2B"} strokeWidth="1.6"/>
          </svg>
        )}
      </div>

      <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, color:on?"#E6392E":"#1E1E1E", marginBottom:3 }}>{mode.label}</p>
      <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10.5, color:"#A0917F", lineHeight:1.4 }}>{mode.sub}</p>

      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
        <div style={{ width:24, height:24, borderRadius:"50%", background:on?"#E6392E":"rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={on?"white":"#9CA3AF"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── GAME SELECT PAGE ───────────────────────────────────────────────────── */
export default function GameSelectPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1); // default Single Player
  const [activeTab, setActiveTab] = useState(3);

  function startGame() {
    navigate("/dots-boxes", { state: { players: selected } });
  }

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FFF8F1 0%,#F9F0E8 55%,#F4EDE4 100%)", display:"flex", justifyContent:"center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Pacifico&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>

      <div style={{ width:"100%", maxWidth:430, minHeight:"100vh", position:"relative", overflow:"hidden", background:"linear-gradient(170deg,#FFF8F1 0%,#F8EFE5 50%,#F4EDE4 100%)" }}>

        {/* ambient orbs */}
        {[{t:-60,r:-60,c:"rgba(230,57,46,0.08)"},{t:350,l:-80,c:"rgba(113,138,50,0.07)"}].map((o,i)=>(
          <div key={i} style={{ position:"absolute", top:o.t, right:o.r, left:o.l, width:220, height:220, borderRadius:"50%", background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`, pointerEvents:"none", zIndex:0 }}/>
        ))}

        {/* ── TOP NAV ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"2px 20px 8px", position:"relative", zIndex:10 }}>
          {/* Back button */}
          <motion.button
            style={{ background:"rgba(255,255,255,0.82)", border:"none", borderRadius:14, padding:"9px 11px",
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }}
            whileTap={{scale:0.88}} onClick={()=>navigate(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="#1E1E1E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <motion.div style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer" }}
            onClick={()=>navigate("/")} whileTap={{scale:0.93}}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#E6392E"/><circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.28"/><path d="M16 7 L23 24 L9 24 Z" fill="white" opacity="0.16"/><circle cx="13" cy="18" r="1.4" fill="white" opacity="0.52"/><circle cx="18" cy="20" r="1.4" fill="white" opacity="0.52"/><circle cx="16" cy="14" r="0.9" fill="white" opacity="0.42"/><circle cx="16" cy="6" r="2.5" fill="#D9A441"/><circle cx="16" cy="6" r="1.1" fill="white" opacity="0.55"/></svg>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:18, letterSpacing:2, color:"#E6392E", lineHeight:1 }}>ANNAPURNA</span>
            </div>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:8.5, letterSpacing:4, color:"#B0A090", fontWeight:600, marginTop:1 }}>— PIZZA CO. —</span>
          </motion.div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <motion.button style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:4 }} whileTap={{scale:0.85}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1E1E1E" strokeWidth="1.7" strokeLinecap="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="#1E1E1E" strokeWidth="1.7" strokeLinecap="round"/></svg>
              <div style={{ position:"absolute", top:2, right:2, width:9, height:9, background:"#E6392E", borderRadius:"50%", border:"1.5px solid #FFF8F1" }}/>
            </motion.button>
            <motion.button style={{ width:42, height:42, borderRadius:"50%", border:"2px solid #E6392E", background:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 14px rgba(230,57,46,0.18)" }} whileHover={{scale:1.07}} whileTap={{scale:0.9}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="#E6392E" strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </motion.button>
          </div>
        </div>

        {/* ── TITLE + ILLUSTRATION ── */}
        <div style={{ margin:"10px 20px 0", position:"relative", minHeight:180 }}>
          <div style={{ position:"relative", zIndex:5 }}>
            <motion.p initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:0.15}}
              style={{ fontFamily:"'Pacifico',cursive", fontSize:18, color:"#D9A441", marginBottom:2 }}>Let's Play</motion.p>
            <motion.div initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:0.25}}>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:54, color:"#1E1E1E", lineHeight:0.92, letterSpacing:2, display:"block" }}>DOTS &amp;</span>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:54, color:"#E6392E", lineHeight:0.92, letterSpacing:2, display:"block" }}>BOXES</span>
            </motion.div>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
              style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A0917F", marginTop:10, lineHeight:1.5 }}>
              Draw lines, claim boxes<br/>and outsmart your opponent!
            </motion.p>
          </div>
          <GameIllustration/>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ display:"flex", alignItems:"center", gap:12, margin:"18px 20px 14px" }}>
          <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }}/>
          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"#A0917F", fontWeight:600, letterSpacing:1.5 }}>CHOOSE PLAYERS</span>
          <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }}/>
        </div>

        {/* ── 2×2 MODE GRID ── */}
        <div style={{ padding:"0 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {GAME_MODES.map(mode=>(
            <ModeCard key={mode.id} mode={mode} selected={selected===mode.players} onSelect={()=>setSelected(mode.players)}/>
          ))}
        </div>

        {/* ── START BUTTON ── */}
        <div style={{ padding:"18px 16px 10px" }}>
          <motion.button
            style={{ width:"100%", padding:"16px 0", background:"linear-gradient(135deg,#E6392E,#A8251C)", border:"none", borderRadius:50, cursor:"pointer", fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:15, color:"white", letterSpacing:1, boxShadow:"0 8px 26px rgba(230,57,46,0.42)" }}
            whileHover={{scale:1.02}} whileTap={{scale:0.97}}
            onClick={startGame}>
            START GAME →
          </motion.button>
        </div>

        {/* ── HOW TO PLAY ── */}
        <div style={{ margin:"4px 16px 0", padding:"16px 18px", background:"linear-gradient(135deg,#718A32,#8FA840)", borderRadius:20, boxShadow:"0 8px 24px rgba(113,138,50,0.28)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <div style={{ width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🎯</div>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:14, color:"white" }}>How To Play</p>
          </div>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11.5, color:"rgba(255,255,255,0.85)", lineHeight:1.55 }}>
            Tap between dots to draw a line. Complete all 4 sides of a box to claim it and take another turn. Player with the most boxes wins!
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign:"center", padding:"10px 0 6px" }}>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:9.5, color:"#C0B0A0", letterSpacing:0.4 }}>
            Developed by <span style={{ fontWeight:700, color:"#A09080" }}>VELQEIN</span>
            {" | "}www.velqein.com
          </p>
        </div>

        <div style={{height:100}}/>

        {/* ── BOTTOM NAV ── */}
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, padding:"0 14px 18px", zIndex:300 }}>
          <motion.div style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(26px)", WebkitBackdropFilter:"blur(26px)", borderRadius:26, padding:"10px 6px", boxShadow:"0 -2px 0 rgba(0,0,0,0.03),0 -8px 34px rgba(0,0,0,0.09),0 8px 24px rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-around", border:"1px solid rgba(255,255,255,0.92)" }}
            initial={{y:80}} animate={{y:0}} transition={{type:"spring",stiffness:260,damping:22,delay:0.4}}>
            {[
              { label:"Menu",      path:"/menu",         icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { label:"Combos",    path:"/menu",         icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="13" rx="2" stroke={c} strokeWidth="1.7"/><path d="M12 8V21M3 12h18" stroke={c} strokeWidth="1.7"/></svg> },
              { label:"Add-ons",   path:"/menu",         icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/><path d="M12 8v8M8 12h8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg> },
              { label:"Play Game", path:"/games",        icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="12" rx="4" stroke={c} strokeWidth="1.7"/><path d="M8 11v4M6 13h4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><circle cx="16" cy="12" r="1.1" fill={c}/><circle cx="18" cy="14" r="1.1" fill={c}/></svg> },
            ].map((item,i)=>{
              const on = i===3;
              const c  = on?"#E6392E":"#9CA3AF";
              return (
                <motion.button key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"6px 14px", borderRadius:16, border:"none", background:"transparent", cursor:"pointer", position:"relative" }}
                  onClick={()=>navigate(item.path)} whileTap={{scale:0.87}}>
                  <motion.div animate={{scale:on?1.14:1}} transition={{type:"spring",stiffness:420,damping:20}}>{item.icon(c)}</motion.div>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, fontWeight:on?700:400, color:c }}>{item.label}</span>
                  {on && <motion.div layoutId="navDot2" style={{ position:"absolute", bottom:-2, width:22, height:3.5, background:"linear-gradient(90deg,#E6392E,#FF5555)", borderRadius:3 }} transition={{type:"spring",stiffness:380,damping:28}}/>}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
