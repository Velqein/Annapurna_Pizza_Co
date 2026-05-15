import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { SNAKES, LADDERS, PLAYERS } from "../data/gameData";

/* ─── board helpers ──────────────────────────────────────────────────────── */
function squareToCell(sq) {
  if (sq <= 0) return null;
  const idx  = sq - 1;
  const row  = Math.floor(idx / 10);   // board row: 0=bottom, 9=top
  const col  = idx % 10;
  const displayCol = row % 2 === 0 ? col : 9 - col;
  const displayRow = 9 - row;          // displayRow: 0=top, 9=bottom
  return [displayRow, displayCol];
}
function rollDice() { return Math.floor(Math.random() * 6) + 1; }

/* ─── DICE FACE ──────────────────────────────────────────────────────────── */
const DICE_DOTS = {
  1: [[50,50]],
  2: [[28,28],[72,72]],
  3: [[28,28],[50,50],[72,72]],
  4: [[28,28],[72,28],[28,72],[72,72]],
  5: [[28,28],[72,28],[50,50],[28,72],[72,72]],
  6: [[28,25],[72,25],[28,50],[72,50],[28,75],[72,75]],
};
function DiceFace({ value, size = 54 }) {
  const dots = DICE_DOTS[value] || DICE_DOTS[1];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><filter id="diceSh"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.18"/></filter></defs>
      <rect x="4" y="4" width="92" height="92" rx="18" fill="white" filter="url(#diceSh)"/>
      <rect x="4" y="4" width="92" height="92" rx="18" fill="white"/>
      {dots.map(([dx,dy],i)=><circle key={i} cx={dx} cy={dy} r="9" fill="#1E1E1E"/>)}
    </svg>
  );
}

/* ─── SNAKE SVG ──────────────────────────────────────────────────────────── */
function SnakesSVG({ cellSize }) {
  const colors = ["#2D8A3E","#E6392E","#3B82F6","#D9A441"];
  return (
    <svg style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3 }} width="100%" height="100%">
      {SNAKES.map((s,i) => {
        const hc = squareToCell(s.head);
        const tc = squareToCell(s.tail);
        if (!hc || !tc) return null;
        const hx = (hc[1] + 0.5) * cellSize, hy = (hc[0] + 0.5) * cellSize;
        const tx = (tc[1] + 0.5) * cellSize, ty = (tc[0] + 0.5) * cellSize;
        const col = colors[i % colors.length];
        const mx  = (hx + tx) / 2 + (i % 2 === 0 ? 18 : -18);
        const my  = (hy + ty) / 2;
        return (
          <g key={i}>
            <path d={`M${hx},${hy} Q${mx},${my} ${tx},${ty}`} fill="none" stroke={col} strokeWidth="6" strokeLinecap="round" opacity="0.88"/>
            <path d={`M${hx},${hy} Q${mx},${my} ${tx},${ty}`} fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" strokeDasharray="4 6"/>
            <circle cx={hx} cy={hy} r="5.5" fill={col}/>
            <circle cx={hx-1} cy={hy-1} r="2" fill="white" opacity="0.6"/>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── LADDER SVG ─────────────────────────────────────────────────────────── */
function LaddersSVG({ cellSize }) {
  return (
    <svg style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3 }} width="100%" height="100%">
      {LADDERS.map((l,i) => {
        const bc = squareToCell(l.bottom);
        const tc = squareToCell(l.top);
        if (!bc || !tc) return null;
        const bx = (bc[1] + 0.5) * cellSize, by = (bc[0] + 0.5) * cellSize;
        const tx = (tc[1] + 0.5) * cellSize, ty = (tc[0] + 0.5) * cellSize;
        const dx = tx - bx, dy = ty - by;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = (-dy/len) * 5, uy = (dx/len) * 5;
        const steps = Math.max(2, Math.floor(len / (cellSize * 0.7)));
        return (
          <g key={i}>
            <line x1={bx+ux} y1={by+uy} x2={tx+ux} y2={ty+uy} stroke="#8B5E2B" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
            <line x1={bx-ux} y1={by-uy} x2={tx-ux} y2={ty-uy} stroke="#8B5E2B" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
            {Array.from({length:steps+1}).map((_,j) => {
              const t  = j / steps;
              const rx = bx + dx*t, ry = by + dy*t;
              return <line key={j} x1={rx+ux*1.4} y1={ry+uy*1.4} x2={rx-ux*1.4} y2={ry-uy*1.4} stroke="#A87040" strokeWidth="2.8" strokeLinecap="round" opacity="0.85"/>;
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── PLAYER TOKEN ───────────────────────────────────────────────────────── */
function Token({ x, y, color, isActive }) {
  return (
    <motion.div
      style={{ position:"absolute", left:x, top:y, transform:"translate(-50%,-50%)", zIndex:10, pointerEvents:"none" }}
      animate={{ scale: isActive ? [1, 1.18, 1] : 1 }}
      transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}>
      <div style={{ width:18, height:22, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ width:16, height:16, borderRadius:"50% 50% 50% 0", transform:"rotate(-45deg)", background:`radial-gradient(circle at 35% 35%,${color}DD,${color})`, boxShadow:`0 2px 8px ${color}88,inset 0 1px 2px rgba(255,255,255,0.4)`, border:`2px solid ${isActive?"white":color}` }}/>
        <div style={{ width:3, height:6, background:color, marginTop:-1 }}/>
      </div>
    </motion.div>
  );
}

/* ─── WINNER OVERLAY ─────────────────────────────────────────────────────── */
function WinnerOverlay({ winner, onReset }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.62)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:200,damping:18}}
        style={{ background:"white", borderRadius:28, padding:"36px 28px", textAlign:"center", margin:"0 24px", boxShadow:"0 24px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize:56, marginBottom:12 }}>🏆</div>
        <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color:"#E6392E", letterSpacing:2, lineHeight:1 }}>{winner.label} WINS!</p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:"#A0917F", marginTop:8, marginBottom:24 }}>Congratulations! You reached square 100!</p>
        <motion.button whileTap={{scale:0.95}} onClick={onReset}
          style={{ padding:"14px 36px", background:"linear-gradient(135deg,#E6392E,#A8251C)", border:"none", borderRadius:50, fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:14, color:"white", cursor:"pointer", boxShadow:"0 6px 20px rgba(230,57,46,0.4)" }}>
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ─── SNAKE & LADDER PAGE ────────────────────────────────────────────────── */
export default function SnakeLadderPage() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const playerCount = location.state?.players ?? 1;

  /* single-player = You vs AI */
  const isSinglePlayer = playerCount === 1;
  const activePlayers  = isSinglePlayer
    ? [PLAYERS[0], { ...PLAYERS[1], label:"AI 🤖", color:"#6B7280" }]
    : PLAYERS.slice(0, playerCount);

  const initPositions = () => Object.fromEntries(activePlayers.map(p => [p.id, 0]));

  const [positions,   setPositions]   = useState(initPositions);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [lastRoll,    setLastRoll]    = useState(null);
  const [winner,      setWinner]      = useState(null);
  const [rolling,     setRolling]     = useState(false);
  const [eventMsg,    setEventMsg]    = useState(null);
  const [diceAnim,    setDiceAnim]    = useState(false);

  const rollingRef = useRef(false);   // ref mirror so AI effect reads fresh value

  const BOARD_SIZE = 300;
  const CELL_SIZE  = BOARD_SIZE / 10;

  function resetGame() {
    setPositions(initPositions());
    setCurrentTurn(0); setLastRoll(null); setWinner(null);
    setRolling(false); rollingRef.current = false; setEventMsg(null);
  }

  const roll = useCallback(() => {
    if (rollingRef.current || winner) return;
    rollingRef.current = true;
    setRolling(true); setDiceAnim(true); setEventMsg(null);
    setTimeout(() => setDiceAnim(false), 500);

    setTimeout(() => {
      const die    = rollDice();
      const player = activePlayers[currentTurn];
      const prev   = positions[player.id];
      let next     = prev + die;

      if (next > 100) next = prev;

      let msg = null;
      const snake  = SNAKES.find(s => s.head === next);
      const ladder = LADDERS.find(l => l.bottom === next);

      if (snake)        { next = snake.tail;  msg = `🐍 Snake! ${player.label} slides to ${next}`; }
      else if (ladder)  { next = ladder.top;  msg = `🪜 Ladder! ${player.label} climbs to ${next}`; }

      setLastRoll(die);
      setEventMsg(msg);
      setPositions(p => ({ ...p, [player.id]: next }));

      if (next === 100) { setWinner(player); }
      else              { setCurrentTurn(t => (t + 1) % activePlayers.length); }

      rollingRef.current = false;
      setRolling(false);
    }, 700);
  }, [winner, currentTurn, positions, activePlayers]);

  /* AI auto-roll: fires 1200 ms after it becomes the AI's turn */
  useEffect(() => {
    if (!isSinglePlayer || winner) return;
    const currentPlayer = activePlayers[currentTurn];
    const isAI = currentPlayer.id !== PLAYERS[0].id;
    if (!isAI) return;
    const timer = setTimeout(() => roll(), 1200);
    return () => clearTimeout(timer);
  }, [currentTurn, isSinglePlayer, winner, roll]);

  /* ─── build board squares in CSS-grid order: top-left → bottom-right ─── */
  /* displayRow 0 = top, 9 = bottom; displayCol 0 = left, 9 = right          */
  const CELL_COLORS = ["#F5DDD0","#C8D9A0"];  // alternating light peach / light green
  const boardSquares = [];
  for (let dr = 0; dr < 10; dr++) {            // dr = display row, 0=top
    const boardRow = 9 - dr;                   // boardRow 0=bottom, 9=top
    for (let dc = 0; dc < 10; dc++) {          // dc = display col, 0=left
      const col = boardRow % 2 === 0 ? dc : 9 - dc;  // actual numbering column
      const sq  = boardRow * 10 + col + 1;
      boardSquares.push({ dr, dc, sq });
    }
  }

  const currentPlayer = activePlayers[currentTurn];
  const isMyTurn = !isSinglePlayer || currentPlayer.id === PLAYERS[0].id;

  return (
    <div style={{ minHeight:"100svh", background:"#E8E0D8", display:"flex", justifyContent:"center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>

      <div style={{ width:"100%", maxWidth:430, minHeight:"100svh", position:"relative", overflow:"hidden", background:"linear-gradient(170deg,#FFF8F1 0%,#F8EFE5 50%,#F4EDE4 100%)" }}>

        {/* ── STATUS BAR ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 22px 6px", position:"relative", zIndex:10 }}>
          <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:"#1E1E1E" }}>9:41</span>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:2 }}>
              {[5,7,10,13].map((h,i)=><div key={i} style={{ width:3.2, height:h, background:i<3?"#1E1E1E":"#CCC", borderRadius:2 }}/>)}
            </div>
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none"><path d="M8.5 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#1E1E1E"/><path d="M4.5 7.5a5.5 5.5 0 019 0" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M1.5 4.5a9.5 9.5 0 0114 0" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
            <div style={{ display:"flex", alignItems:"center" }}>
              <div style={{ width:27, height:14, border:"2px solid #1E1E1E", borderRadius:4, padding:"1.5px 2px" }}><div style={{ width:"74%", height:"100%", background:"#1E1E1E", borderRadius:2 }}/></div>
              <div style={{ width:3, height:7, background:"#1E1E1E", borderRadius:"0 2px 2px 0", marginLeft:1 }}/>
            </div>
          </div>
        </div>

        {/* ── TOP NAV ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"2px 20px 8px", position:"relative", zIndex:10 }}>
          <motion.button style={{ background:"rgba(255,255,255,0.68)", border:"none", borderRadius:14, padding:"9px 10px", cursor:"pointer", display:"flex", flexDirection:"column", gap:4.5, boxShadow:"0 2px 14px rgba(0,0,0,0.07)" }} whileTap={{scale:0.88}} onClick={()=>navigate("/games")}>
            {[22,22,15].map((w,i)=><div key={i} style={{ width:w, height:2.5, background:"#1E1E1E", borderRadius:3 }}/>)}
          </motion.button>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#E6392E"/><circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.28"/><path d="M16 7 L23 24 L9 24 Z" fill="white" opacity="0.16"/><circle cx="13" cy="18" r="1.4" fill="white" opacity="0.52"/><circle cx="18" cy="20" r="1.4" fill="white" opacity="0.52"/><circle cx="16" cy="14" r="0.9" fill="white" opacity="0.42"/><circle cx="16" cy="6" r="2.5" fill="#D9A441"/><circle cx="16" cy="6" r="1.1" fill="white" opacity="0.55"/></svg>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:18, letterSpacing:2, color:"#E6392E", lineHeight:1 }}>ANNAPURNA</span>
            </div>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:8.5, letterSpacing:4, color:"#B0A090", fontWeight:600, marginTop:1 }}>— PIZZA CO. —</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <motion.button style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:4 }} whileTap={{scale:0.85}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1E1E1E" strokeWidth="1.7" strokeLinecap="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="#1E1E1E" strokeWidth="1.7" strokeLinecap="round"/></svg>
              <div style={{ position:"absolute", top:2, right:2, width:9, height:9, background:"#E6392E", borderRadius:"50%", border:"1.5px solid #FFF8F1" }}/>
            </motion.button>
            <motion.button style={{ width:42, height:42, borderRadius:"50%", border:"2px solid #E6392E", background:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 14px rgba(230,57,46,0.18)" }} whileHover={{scale:1.07}} whileTap={{scale:0.9}} onClick={()=>navigate("/menu")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="#E6392E" strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </motion.button>
          </div>
        </div>

        {/* ── TITLE ── */}
        <div style={{ padding:"4px 20px 10px", display:"flex", alignItems:"baseline", gap:8 }}>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color:"#1E1E1E", letterSpacing:2 }}>SNAKE</span>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:28, color:"#1E1E1E", letterSpacing:1 }}>&amp;</span>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:36, color:"#E6392E", letterSpacing:2 }}>LADDER</span>
          <div style={{ marginLeft:"auto" }}>
            <motion.div animate={{ rotate:[0,10,-10,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }} style={{ fontSize:28 }}>🍕</motion.div>
          </div>
        </div>

        {/* ── TURN INDICATOR ── */}
        <div style={{ margin:"0 16px 10px", padding:"10px 14px", background:"rgba(255,255,255,0.7)", borderRadius:14, display:"flex", alignItems:"center", gap:10, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
          <div style={{ width:12, height:12, borderRadius:"50%", background:currentPlayer?.color, boxShadow:`0 0 8px ${currentPlayer?.color}88` }}/>
          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:700, color:"#1E1E1E" }}>
            {currentPlayer?.label}{isSinglePlayer && !isMyTurn ? " is thinking…" : "'s Turn"}
          </span>
          {eventMsg && (
            <motion.span initial={{opacity:0,x:10}} animate={{opacity:1,x:0}}
              style={{ marginLeft:"auto", fontFamily:"'Poppins',sans-serif", fontSize:11, color:"#718A32", fontWeight:600 }}>{eventMsg}</motion.span>
          )}
        </div>

        {/* ── GAME BOARD ── */}
        <div style={{ padding:"0 12px" }}>
          <div style={{ borderRadius:16, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.18),0 2px 8px rgba(0,0,0,0.1)", border:"6px solid #8B5E2B", position:"relative", background:"#C8A06A" }}>

            {/* board grid — dr=0 top (sq 91-100), dr=9 bottom (sq 1-10) */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(10,1fr)", position:"relative", width:"100%" }}>
              {boardSquares.map(({ dr, dc, sq }) => {
                const isSpecial = sq === 100 || sq === 1;
                const bg = sq === 100
                  ? "linear-gradient(135deg,#D9A441,#F0C060)"
                  : sq === 1
                    ? "linear-gradient(135deg,#82C882,#A8E0A8)"
                    : CELL_COLORS[(dr + dc) % 2];
                return (
                  <div key={`${dr}-${dc}`}
                    style={{ aspectRatio:"1", background:bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", border:"0.5px solid rgba(0,0,0,0.08)" }}>
                    <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:7, fontWeight:600, color:isSpecial?"#5C3A00":"rgba(0,0,0,0.42)", position:"absolute", top:2, left:2 }}>{sq}</span>
                    {sq === 100 && <span style={{ fontSize:9 }}>🏆</span>}
                    {sq === 1   && <span style={{ fontSize:9 }}>🚩</span>}
                  </div>
                );
              })}
            </div>

            {/* snakes + ladders overlay — positioned relative to board content area */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
              <LaddersSVG cellSize={CELL_SIZE}/>
              <SnakesSVG  cellSize={CELL_SIZE}/>
            </div>

            {/* player tokens */}
            {activePlayers.map(player => {
              const pos = positions[player.id];
              if (pos <= 0) return null;
              const cell = squareToCell(pos);
              if (!cell) return null;
              const x = (cell[1] + 0.5) * CELL_SIZE;
              const y = (cell[0] + 0.5) * CELL_SIZE;
              return (
                <Token key={player.id} x={x} y={y}
                  color={player.color}
                  isActive={activePlayers[currentTurn]?.id === player.id}/>
              );
            })}
          </div>
        </div>

        {/* ── PLAYER TOKEN ROW ── */}
        <div style={{ display:"flex", justifyContent:"center", gap:14, padding:"14px 0 6px" }}>
          {activePlayers.map((p,i) => {
            const on = currentTurn === i;
            return (
              <div key={p.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:p.color, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:on?`0 4px 14px ${p.color}88`:"none", border:on?"3px solid white":"3px solid transparent", transition:"all 0.3s" }}>
                  <span style={{ fontSize:15, filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
                    {isSinglePlayer ? (i===0?"🔴":"🤖") : (["🔴","🟡","🟢","🔵"][i])}
                  </span>
                </div>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:9.5, fontWeight:on?700:500, color:on?p.color:"#9CA3AF" }}>{p.label}</span>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:8, color:"#A0917F" }}>
                  {positions[p.id] > 0 ? `Sq ${positions[p.id]}` : "Start"}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── CONTROLS ROW ── */}
        <div style={{ padding:"8px 16px", display:"flex", alignItems:"center", gap:10 }}>
          {/* Last Roll */}
          <div style={{ flex:1, background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"10px 12px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:9, color:"#A0917F", fontWeight:600, marginBottom:4 }}>LAST ROLL</p>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#718A32" strokeWidth="1.8"/><circle cx="8" cy="8" r="1.8" fill="#718A32"/><circle cx="16" cy="16" r="1.8" fill="#718A32"/></svg>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:"#1E1E1E", lineHeight:1 }}>{lastRoll ?? "—"}</span>
            </div>
          </div>

          {/* Current Position */}
          <div style={{ flex:1, background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"10px 12px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:9, color:"#A0917F", fontWeight:600, marginBottom:4 }}>POSITION</p>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#E6392E" strokeWidth="1.8"/><circle cx="12" cy="9" r="2.5" stroke="#E6392E" strokeWidth="1.8"/></svg>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:"#E6392E", lineHeight:1 }}>{positions[currentPlayer?.id] || 0}</span>
            </div>
          </div>

          {/* Roll Dice button */}
          <motion.button
            style={{ width:68, height:68, borderRadius:18, background: isMyTurn && !rolling && !winner ? "linear-gradient(135deg,#718A32,#8FA840)" : "linear-gradient(135deg,#9CA3AF,#6B7280)", border:"none", cursor:isMyTurn&&!rolling&&!winner?"pointer":"not-allowed", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, boxShadow:"0 6px 20px rgba(113,138,50,0.42)", opacity:rolling||winner?0.7:1 }}
            whileHover={isMyTurn&&!rolling&&!winner?{scale:1.06}:{}}
            whileTap={isMyTurn&&!rolling&&!winner?{scale:0.92}:{}}
            animate={diceAnim?{rotate:[0,15,-15,10,-10,0]}:{}}
            transition={{ duration:0.5 }}
            onClick={isMyTurn ? roll : undefined}>
            <DiceFace value={lastRoll || 1} size={34}/>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:8, color:"rgba(255,255,255,0.9)", fontWeight:700, letterSpacing:0.5 }}>
              {isMyTurn ? "TAP TO ROLL" : "AI ROLLING…"}
            </span>
          </motion.button>
        </div>

        {/* ── NEW GAME ── */}
        <div style={{ display:"flex", justifyContent:"center", padding:"4px 0 8px" }}>
          <motion.button
            style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 22px", borderRadius:50, background:"rgba(255,255,255,0.8)", border:"1.5px solid rgba(230,57,46,0.18)", cursor:"pointer", boxShadow:"0 3px 12px rgba(0,0,0,0.07)" }}
            whileTap={{scale:0.93}} onClick={resetGame}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M23 4v6h-6" stroke="#E6392E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="#E6392E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:700, color:"#E6392E" }}>New Game</span>
          </motion.button>
        </div>

        <div style={{ height:90 }}/>

        {/* ── BOTTOM NAV ── */}
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, padding:"0 14px 18px", zIndex:300 }}>
          <motion.div style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(26px)", WebkitBackdropFilter:"blur(26px)", borderRadius:26, padding:"10px 6px", boxShadow:"0 -2px 0 rgba(0,0,0,0.03),0 -8px 34px rgba(0,0,0,0.09),0 8px 24px rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-around", border:"1px solid rgba(255,255,255,0.92)" }}
            initial={{y:80}} animate={{y:0}} transition={{type:"spring",stiffness:260,damping:22,delay:0.4}}>
            {[
              { label:"Menu",      path:"/menu",  icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { label:"Combos",    path:"/menu",  icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="13" rx="2" stroke={c} strokeWidth="1.7"/><path d="M12 8V21M3 12h18" stroke={c} strokeWidth="1.7"/></svg> },
              { label:"Add-ons",   path:"/menu",  icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/><path d="M12 8v8M8 12h8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg> },
              { label:"Play Game", path:"/games", icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="12" rx="4" stroke={c} strokeWidth="1.7"/><path d="M8 11v4M6 13h4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><circle cx="16" cy="12" r="1.1" fill={c}/><circle cx="18" cy="14" r="1.1" fill={c}/></svg> },
            ].map((item,i)=>{
              const on = i===3;
              const c  = on?"#E6392E":"#9CA3AF";
              return (
                <motion.button key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"6px 14px", borderRadius:16, border:"none", background:"transparent", cursor:"pointer", position:"relative" }}
                  onClick={()=>navigate(item.path)} whileTap={{scale:0.87}}>
                  <motion.div animate={{scale:on?1.14:1}} transition={{type:"spring",stiffness:420,damping:20}}>{item.icon(c)}</motion.div>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, fontWeight:on?700:400, color:c }}>{item.label}</span>
                  {on && <motion.div layoutId="navDot3" style={{ position:"absolute", bottom:-2, width:22, height:3.5, background:"linear-gradient(90deg,#E6392E,#FF5555)", borderRadius:3 }}/>}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* ── WINNER OVERLAY ── */}
        <AnimatePresence>
          {winner && <WinnerOverlay winner={winner} onReset={resetGame}/>}
        </AnimatePresence>

      </div>
    </div>
  );
}
