import { useReducer, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

/* ── constants ─────────────────────────────────────────────────────────────── */
const CELLS = 4;      // 4×4 = 16 boxes
const CELL  = 76;     // px per cell
const PAD   = 18;     // board padding
const SVG_S = CELLS * CELL + PAD * 2;  // 4*76+36 = 340

const COLORS = ["#E6392E", "#3B82F6", "#27AE60", "#8B5CF6"];
const LIGHTS  = ["rgba(230,57,46,0.15)","rgba(59,130,246,0.15)","rgba(39,174,96,0.15)","rgba(139,92,246,0.15)"];

/* ── helpers ───────────────────────────────────────────────────────────────── */
const dx = c => PAD + c * CELL;
const dy = r => PAD + r * CELL;

function boxSides(r, c) {
  return [`h_${r}_${c}`, `h_${r+1}_${c}`, `v_${r}_${c}`, `v_${r}_${c+1}`];
}

function adjBoxes(lid) {
  const parts = lid.split("_");
  const type = parts[0], ri = +parts[1], ci = +parts[2];
  const out = [];
  if (type === "h") {
    if (ri > 0)     out.push([ri - 1, ci]);
    if (ri < CELLS) out.push([ri, ci]);
  } else {
    if (ci > 0)     out.push([ri, ci - 1]);
    if (ci < CELLS) out.push([ri, ci]);
  }
  return out.filter(([r2, c2]) => r2 >= 0 && r2 < CELLS && c2 >= 0 && c2 < CELLS);
}

function sideCnt(lines, r, c) {
  return boxSides(r, c).filter(s => lines.has(s)).length;
}

function everyLine() {
  const out = [];
  for (let r = 0; r <= CELLS; r++) for (let c = 0; c < CELLS; c++) out.push(`h_${r}_${c}`);
  for (let r = 0; r < CELLS; r++) for (let c = 0; c <= CELLS; c++) out.push(`v_${r}_${c}`);
  return out;
}

/* ── AI ────────────────────────────────────────────────────────────────────── */
function aiPick(lines) {
  const avail = everyLine().filter(l => !lines.has(l));
  if (!avail.length) return null;
  // 1: complete a box
  for (const l of avail) {
    if (adjBoxes(l).some(([r, c]) => sideCnt(lines, r, c) === 3)) return l;
  }
  // 2: avoid giving 3-sided box
  const safe = avail.filter(l => !adjBoxes(l).some(([r, c]) => sideCnt(lines, r, c) === 2));
  const pool = safe.length ? safe : avail;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ── reducer ───────────────────────────────────────────────────────────────── */
const mkState = (players) => ({ lines: new Set(), boxes: {}, scores: players.map(() => 0), turn: 0, gameOver: false, players });

function reducer(state, action) {
  if (action.type === "RESET") return mkState(action.players);
  if (action.type !== "PLAY" || state.gameOver || state.lines.has(action.lid)) return state;
  const lines = new Set(state.lines);
  lines.add(action.lid);
  let got = 0;
  const boxes = { ...state.boxes };
  for (const [r, c] of adjBoxes(action.lid)) {
    const key = `${r}_${c}`;
    if (!boxes[key] && boxSides(r, c).every(s => lines.has(s))) { boxes[key] = state.turn; got++; }
  }
  const scores = [...state.scores];
  scores[state.turn] += got;
  const gameOver = Object.keys(boxes).length >= CELLS * CELLS;
  const turn = gameOver ? state.turn : (got > 0 ? state.turn : (state.turn + 1) % state.players.length);
  return { ...state, lines, boxes, scores, turn, gameOver };
}

/* ── pre-computed line segments ────────────────────────────────────────────── */
const H_SEGS = [], V_SEGS = [];
for (let r = 0; r <= CELLS; r++) for (let c = 0; c < CELLS; c++)
  H_SEGS.push({ lid:`h_${r}_${c}`, x1:dx(c), y1:dy(r), x2:dx(c+1), y2:dy(r) });
for (let r = 0; r < CELLS; r++) for (let c = 0; c <= CELLS; c++)
  V_SEGS.push({ lid:`v_${r}_${c}`, x1:dx(c), y1:dy(r), x2:dx(c), y2:dy(r+1) });
const ALL_SEGS = [...H_SEGS, ...V_SEGS];

/* ── component ─────────────────────────────────────────────────────────────── */
export default function DotsBoxesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const playerCount = location.state?.players ?? 1;
  const isAI = playerCount === 1;

  const players = isAI
    ? [{ label:"You", color:COLORS[0] }, { label:"AI 🤖", color:"#6B7280" }]
    : Array.from({ length: playerCount }, (_, i) => ({ label:`P${i + 1}`, color:COLORS[i] }));

  const [state, dispatch] = useReducer(reducer, players, mkState);
  const [hovLine, setHovLine]     = useState(null);
  const [aiThinking, setAiThink]  = useState(false);

  const isAITurn = isAI && state.turn === 1 && !state.gameOver;

  /* AI effect */
  useEffect(() => {
    if (!isAITurn) { setAiThink(false); return; }
    setAiThink(true);
    const t = setTimeout(() => {
      const move = aiPick(state.lines);
      if (move) dispatch({ type:"PLAY", lid:move });
      setAiThink(false);
    }, 900);
    return () => clearTimeout(t);
  }, [isAITurn, state.lines.size]);

  function handleLine(lid) {
    if (isAITurn || state.gameOver) return;
    dispatch({ type:"PLAY", lid });
    setHovLine(null);
  }

  function newGame() {
    dispatch({ type:"RESET", players });
    setHovLine(null);
    setAiThink(false);
  }

  /* winner */
  const maxScore = state.gameOver ? Math.max(...state.scores) : 0;
  const winnerIdx = state.gameOver ? state.scores.findIndex(s => s === maxScore) : -1;
  const tieGame   = state.gameOver && state.scores.filter(s => s === maxScore).length > 1;
  const winner    = (!tieGame && winnerIdx >= 0) ? state.players[winnerIdx] : null;

  const FONT  = "'Poppins',sans-serif";
  const BEBAS = "'Bebas Neue',cursive";
  const curColor = state.players[state.turn]?.color ?? "#888";

  return (
    <div style={{ width:"100%", maxWidth:430, height:"100svh", background:"linear-gradient(170deg,#FBF6EE 0%,#F5EBDD 55%,#EDE0CE 100%)", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Pacifico&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .db-scroll{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;}
        .db-scroll::-webkit-scrollbar{display:none;}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 18px 6px", flexShrink:0, zIndex:10 }}>
        <motion.button
          style={{ background:"rgba(255,255,255,0.7)", border:"none", borderRadius:14, padding:"8px 10px", cursor:"pointer", display:"flex", flexDirection:"column", gap:4, boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}
          whileTap={{ scale:0.88 }}>
          {[22,22,15].map((w,i) => <div key={i} style={{ width:w, height:2.5, background:"#1E1E1E", borderRadius:3 }}/>)}
        </motion.button>

        <motion.div
          style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer" }}
          onClick={() => navigate("/")} whileTap={{ scale:0.93 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <svg width="28" height="28" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="15" fill="#E6392E"/>
              <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.28"/>
              <path d="M16 7 L23 24 L9 24 Z" fill="white" opacity="0.16"/>
              <circle cx="13" cy="18" r="1.4" fill="white" opacity="0.52"/>
              <circle cx="18" cy="20" r="1.4" fill="white" opacity="0.52"/>
              <circle cx="16" cy="14" r="0.9" fill="white" opacity="0.42"/>
              <circle cx="16" cy="6"  r="2.5" fill="#D9A441"/>
              <circle cx="16" cy="6"  r="1.1" fill="white" opacity="0.55"/>
            </svg>
            <span style={{ fontFamily:BEBAS, fontSize:18, letterSpacing:2, color:"#E6392E", lineHeight:1 }}>ANNAPURNA</span>
          </div>
          <span style={{ fontFamily:FONT, fontSize:7.5, letterSpacing:3.5, color:"#B0A090", fontWeight:600, marginTop:1 }}>— PIZZA CO. —</span>
        </motion.div>

        <motion.button
          style={{ width:38, height:38, borderRadius:"50%", border:"2px solid #E6392E", background:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 12px rgba(230,57,46,0.18)" }}
          whileTap={{ scale:0.9 }} onClick={() => navigate("/menu")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke="#E6392E" strokeWidth="1.8"/>
            <path d="M16 10a4 4 0 01-8 0" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </motion.button>
      </div>

      {/* ── TITLE ── */}
      <div style={{ padding:"2px 18px 6px", flexShrink:0 }}>
        <motion.p style={{ fontFamily:"'Pacifico',cursive", fontSize:13, color:"#D9A441", marginBottom:1 }} initial={{ opacity:0 }} animate={{ opacity:1 }}>
          Let's Play
        </motion.p>
        <motion.div initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}>
          <span style={{ fontFamily:BEBAS, fontSize:40, color:"#1E1E1E", letterSpacing:2, lineHeight:0.9 }}>DOTS &amp; </span>
          <span style={{ fontFamily:BEBAS, fontSize:40, color:"#E6392E", letterSpacing:2, lineHeight:0.9 }}>BOXES</span>
        </motion.div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="db-scroll" style={{ flex:1, overflowY:"auto", padding:"0 12px 20px" }}>

        {/* Turn indicator */}
        <motion.div style={{ background:"white", borderRadius:18, padding:"10px 14px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 4px 16px rgba(0,0,0,0.07)" }}
          initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <motion.div style={{ width:12, height:12, borderRadius:"50%", background:curColor }}
              animate={{ scale:[1,1.3,1] }} transition={{ duration:1.2, repeat:Infinity }}/>
            <span style={{ fontFamily:FONT, fontWeight:700, fontSize:13, color:"#1E1E1E" }}>
              {state.gameOver
                ? (tieGame ? "It's a Tie!" : `${winner?.label} Wins! 🎉`)
                : aiThinking ? "AI is thinking..."
                : `${state.players[state.turn]?.label}'s turn`}
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {aiThinking && (
              <div style={{ display:"flex", gap:3 }}>
                {[0,1,2].map(i => (
                  <motion.div key={i} style={{ width:5, height:5, borderRadius:"50%", background:"#6B7280" }}
                    animate={{ y:[0,-5,0] }} transition={{ duration:0.6, repeat:Infinity, delay:i*0.15 }}/>
                ))}
              </div>
            )}
            <motion.button
              style={{ background:"rgba(0,0,0,0.06)", border:"none", borderRadius:10, padding:"5px 11px", cursor:"pointer", fontFamily:FONT, fontSize:11, fontWeight:600, color:"#888" }}
              whileTap={{ scale:0.92 }} onClick={newGame}>New</motion.button>
          </div>
        </motion.div>

        {/* Scores */}
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          {state.players.map((p, i) => {
            const isActive = state.turn === i && !state.gameOver;
            return (
              <motion.div key={i}
                style={{ flex:1, background:"white", borderRadius:16, padding:"10px 12px", boxShadow:"0 4px 14px rgba(0,0,0,0.07)", border:`2px solid ${isActive ? p.color : "transparent"}`, transition:"border-color 0.25s" }}>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:p.color }}/>
                  <span style={{ fontFamily:FONT, fontSize:10, fontWeight:700, color:"#9CA3AF" }}>{p.label}</span>
                </div>
                <span style={{ fontFamily:BEBAS, fontSize:28, color:p.color, lineHeight:1 }}>{state.scores[i]}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Board */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <div style={{ background:"white", borderRadius:24, padding:8, boxShadow:"0 8px 30px rgba(0,0,0,0.11)" }}>
            <svg width={SVG_S} height={SVG_S} style={{ display:"block", touchAction:"manipulation" }}>

              {/* Box fills */}
              {Array.from({ length:CELLS }, (_, r) =>
                Array.from({ length:CELLS }, (_, c) => {
                  const key = `${r}_${c}`;
                  const owner = state.boxes[key];
                  if (owner === undefined) return null;
                  return (
                    <g key={key}>
                      <rect x={dx(c)+3} y={dy(r)+3} width={CELL-6} height={CELL-6} rx={10}
                        fill={COLORS[owner]} opacity={0.18}/>
                      <circle cx={dx(c)+CELL/2} cy={dy(r)+CELL/2} r={13} fill={COLORS[owner]} opacity={0.88}/>
                      <text x={dx(c)+CELL/2} y={dy(r)+CELL/2+5}
                        textAnchor="middle" fontSize={11} fontWeight="bold"
                        fontFamily="'Poppins',sans-serif" fill="white">
                        {state.players[owner]?.label?.[0]}
                      </text>
                    </g>
                  );
                })
              )}

              {/* Lines */}
              {ALL_SEGS.map(({ lid, x1, y1, x2, y2 }) => {
                const drawn = state.lines.has(lid);
                const hov   = hovLine === lid && !drawn && !isAITurn && !state.gameOver;
                return (
                  <g key={lid}>
                    {/* transparent hit area */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="transparent" strokeWidth={26} strokeLinecap="round"
                      style={{ cursor: drawn || isAITurn || state.gameOver ? "default" : "pointer" }}
                      onMouseEnter={() => { if (!drawn && !isAITurn && !state.gameOver) setHovLine(lid); }}
                      onMouseLeave={() => setHovLine(null)}
                      onClick={() => handleLine(lid)}/>
                    {/* visible line */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={drawn ? "#5B4A3A" : hov ? curColor : "#DDCCB0"}
                      strokeWidth={drawn ? 5 : hov ? 4.5 : 2.5}
                      strokeLinecap="round"
                      opacity={drawn ? 0.9 : hov ? 0.8 : 0.45}
                      pointerEvents="none"
                      style={{ transition:"stroke 0.1s, stroke-width 0.1s, opacity 0.1s" }}/>
                  </g>
                );
              })}

              {/* Dots */}
              {Array.from({ length:CELLS+1 }, (_, r) =>
                Array.from({ length:CELLS+1 }, (_, c) => (
                  <circle key={`d_${r}_${c}`} cx={dx(c)} cy={dy(r)} r={5}
                    fill="#2D1A0E" pointerEvents="none"/>
                ))
              )}
            </svg>
          </div>
        </div>

        {/* How to play */}
        <div style={{ background:"linear-gradient(135deg,#1E1E1E,#2D2D2D)", borderRadius:20, padding:"16px 18px" }}>
          <p style={{ fontFamily:FONT, fontWeight:800, fontSize:13, color:"white", marginBottom:6 }}>🎯 How To Play</p>
          <p style={{ fontFamily:FONT, fontSize:11, color:"rgba(255,255,255,0.72)", lineHeight:1.65 }}>
            Tap between two dots to draw a line. Complete all 4 sides of a box to claim it — and take another turn! The player with the most boxes at the end wins.
          </p>
        </div>

        <div style={{ height:16 }}/>
      </div>

      {/* ── GAME OVER OVERLAY ── */}
      <AnimatePresence>
        {state.gameOver && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(6px)" }}>
            <motion.div
              initial={{ scale:0.72, opacity:0, y:30 }} animate={{ scale:1, opacity:1, y:0 }}
              transition={{ type:"spring", stiffness:220, damping:22 }}
              style={{ background:"white", borderRadius:28, padding:"32px 26px", width:"82%", maxWidth:320, textAlign:"center", boxShadow:"0 30px 80px rgba(0,0,0,0.30)" }}>

              <motion.div style={{ fontSize:54, marginBottom:6 }}
                animate={{ rotate:[0,10,-10,0] }} transition={{ duration:0.6, repeat:3 }}>
                {tieGame ? "🤝" : "🎉"}
              </motion.div>
              <p style={{ fontFamily:"'Pacifico',cursive", fontSize:13, color:"#D9A441", marginBottom:3 }}>
                {tieGame ? "It's a Tie!" : "Winner!"}
              </p>
              <p style={{ fontFamily:BEBAS, fontSize:44, letterSpacing:2, color:winner?.color ?? "#1E1E1E", lineHeight:1, marginBottom:16 }}>
                {tieGame ? "DRAW" : winner?.label}
              </p>

              {/* score breakdown */}
              <div style={{ display:"flex", justifyContent:"center", gap:14, marginBottom:22 }}>
                {state.players.map((p, i) => (
                  <div key={i} style={{ textAlign:"center" }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:p.color, margin:"0 auto 4px" }}/>
                    <span style={{ fontFamily:FONT, fontSize:11, color:"#9CA3AF", display:"block" }}>{p.label}</span>
                    <span style={{ fontFamily:BEBAS, fontSize:26, color:p.color }}>{state.scores[i]}</span>
                  </div>
                ))}
              </div>

              <motion.button
                style={{ width:"100%", padding:"14px 0", background:"linear-gradient(135deg,#E6392E,#A8251C)", border:"none", borderRadius:50, cursor:"pointer", fontFamily:FONT, fontWeight:800, fontSize:14, color:"white", letterSpacing:0.5, boxShadow:"0 8px 26px rgba(230,57,46,0.42)", marginBottom:10 }}
                whileTap={{ scale:0.96 }} onClick={newGame}>
                Play Again
              </motion.button>
              <motion.button
                style={{ width:"100%", padding:"12px 0", background:"transparent", border:"2px solid #EDE5DC", borderRadius:50, cursor:"pointer", fontFamily:FONT, fontWeight:700, fontSize:13, color:"#999" }}
                whileTap={{ scale:0.96 }} onClick={() => navigate("/games")}>
                Change Mode
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
