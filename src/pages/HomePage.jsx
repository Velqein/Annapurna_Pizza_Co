import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logoPng from "../assets/logo-home.png";
import homeBg  from "../assets/home-bg.png";

/* ─── SIDE DRAWER ─────────────────────────────────────────────────────────── */
function HomeDrawer({ onClose }) {
  const socials = [
    { label:"Instagram", handle:"@annapurnapizza.com",
      bg:"linear-gradient(45deg,#F09433,#E6683C,#DC2743,#CC2366,#BC1888)",
      card:"linear-gradient(135deg,#FFF0F8,#FFF0E8)",
      svg:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="white"/></svg> },
    { label:"Facebook",  handle:"@annapurnapizza.com",
      bg:"#1877F2", card:"linear-gradient(135deg,#EBF2FF,#F0F6FF)",
      svg:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { label:"WhatsApp",  handle:"+91-9000000011",
      bg:"#25D366", card:"linear-gradient(135deg,#EDFFF4,#F0FFF8)",
      svg:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];
  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.48)", zIndex:190, backdropFilter:"blur(4px)" }}
        onClick={onClose}/>
      <motion.div initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}}
        transition={{type:"spring",stiffness:300,damping:30}}
        style={{ position:"absolute", top:0, left:0, bottom:0, width:"78%", maxWidth:300, background:"white",
          zIndex:200, boxShadow:"6px 0 40px rgba(0,0,0,0.22)", borderRadius:"0 28px 28px 0",
          display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* header */}
        <div style={{ background:"linear-gradient(148deg,#C02818,#E6392E,#F05040)", padding:"36px 20px 22px", position:"relative", flexShrink:0 }}>
          <motion.button
            style={{ position:"absolute", top:12, right:14, width:30, height:30, borderRadius:"50%",
              background:"rgba(255,255,255,0.18)", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center" }}
            whileTap={{scale:0.88}} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </motion.button>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <svg width="38" height="38" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="15" fill="white" opacity="0.22"/>
              <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.4"/>
              <path d="M16 7 L23 24 L9 24 Z" fill="white" opacity="0.28"/>
              <circle cx="13" cy="18" r="1.4" fill="white" opacity="0.7"/>
              <circle cx="18" cy="20" r="1.4" fill="white" opacity="0.7"/>
              <circle cx="16" cy="6" r="2.5" fill="#D9A441"/>
            </svg>
            <div>
              <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:20, color:"white", letterSpacing:2, lineHeight:1 }}>ANNAPURNA</p>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:8, color:"rgba(255,255,255,0.7)", letterSpacing:2.5, marginTop:2 }}>— PIZZA CO. —</p>
            </div>
          </div>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"rgba(255,255,255,0.85)", lineHeight:1.5 }}>Fresh. Handcrafted. Delicious.</p>
        </div>
        {/* body */}
        <div style={{ flex:1, overflowY:"auto", padding:"18px 18px 24px" }}>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:13, color:"#1E1E1E", marginBottom:8 }}>About Us</p>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"#7B5A3A", lineHeight:1.7, marginBottom:18 }}>
            Annapurna Pizza Co. crafts every pizza with love, the freshest garden ingredients, and time-honoured recipes. Our handmade dough, rich tomato sauce, and premium toppings bring you an authentic slice of happiness.
          </p>
          <div style={{ height:1, background:"#F0EAE0", marginBottom:16 }}/>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:13, color:"#1E1E1E", marginBottom:12 }}>Connect With Us</p>
          {socials.map((s,i)=>(
            <motion.div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", borderRadius:16, background:s.card, marginBottom:10, cursor:"pointer" }}
              whileHover={{x:4}} whileTap={{scale:0.97}}>
              <div style={{ width:38, height:38, borderRadius:11, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{s.svg}</div>
              <div>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:12, color:"#1E1E1E" }}>{s.label}</p>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#888" }}>{s.handle}</p>
              </div>
              <svg style={{marginLeft:"auto"}} width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#C0B0A0" strokeWidth="2" strokeLinecap="round"/></svg>
            </motion.div>
          ))}
          <div style={{ height:1, background:"#F0EAE0", margin:"16px 0" }}/>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#C0A890", textAlign:"center" }}>
            © 2025 Annapurna Pizza Co. · Made with ❤️
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [notif,       setNotif]       = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);

  return (
    <div style={{
      width: "100%",
      maxWidth: 430,
      height: "100svh",
      position: "relative",
      overflow: "hidden",
      background: "#FBF6EE",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Great+Vibes&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
      `}</style>

      {/* ── SIDE DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && <HomeDrawer onClose={()=>setDrawerOpen(false)}/>}
      </AnimatePresence>

      {/* Full-screen background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        zIndex: 0,
      }}/>

      {/* ── TOP NAV ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px 0",
        position: "relative", zIndex: 10, flexShrink: 0,
      }}>
        {/* hamburger */}
        <motion.button
          style={{ background:"rgba(255,255,255,0.8)", border:"none", borderRadius:12,
            padding:"8px 10px", cursor:"pointer", display:"flex",
            flexDirection:"column", gap:4, boxShadow:"0 2px 12px rgba(0,0,0,0.09)" }}
          whileTap={{ scale:0.88 }}
          onClick={()=>setDrawerOpen(true)}>
          {[22,22,15].map((w,i)=>(
            <div key={i} style={{ width:w, height:2.5, background:"#1E1E1E", borderRadius:3 }}/>
          ))}
        </motion.button>

        {/* right icons */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {/* notification bell */}
          <motion.button
            style={{ position:"relative", background:"rgba(255,255,255,0.8)", border:"none",
              cursor:"pointer", padding:8, borderRadius:12,
              boxShadow:"0 2px 12px rgba(0,0,0,0.09)" }}
            whileTap={{ scale:0.85 }}
            onClick={()=>setNotif(v=>!v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1E1E1E" strokeWidth="1.7" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#1E1E1E" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <motion.div
              style={{ position:"absolute", top:6, right:6, width:7, height:7,
                background:"#E6392E", borderRadius:"50%", border:"1.5px solid white" }}
              animate={{ scale:[1,1.3,1] }} transition={{ duration:1.6, repeat:Infinity }}/>
          </motion.button>

          {/* cart */}
          <motion.button
            style={{ width:36, height:36, borderRadius:"50%", border:"2px solid #E6392E",
              background:"white", cursor:"pointer", display:"flex", alignItems:"center",
              justifyContent:"center", boxShadow:"0 3px 12px rgba(230,57,46,0.18)" }}
            whileHover={{ scale:1.07 }} whileTap={{ scale:0.9 }}
            onClick={()=>navigate("/menu")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="#E6392E" strokeWidth="1.8"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="#E6392E" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ── LOGO ── */}
      <div style={{ display:"flex", justifyContent:"center", position:"relative", zIndex:10, flexShrink:0, marginTop:4 }}>
        <motion.div
          style={{ cursor:"pointer" }}
          initial={{ opacity:0, scale:0.88 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.1, type:"spring", stiffness:180, damping:18 }}
          onClick={()=>navigate("/")}
          whileTap={{ scale:0.94 }}>
          <img
            src={logoPng}
            alt="Annapurna Pizza Co."
            style={{ width:270, height:"auto", mixBlendMode:"multiply", display:"block" }}
          />
        </motion.div>
      </div>

      {/* ── HERO TEXT ── */}
      <div style={{ padding:"0 22px", position:"relative", zIndex:5, flexShrink:0, textAlign:"center", marginTop:2 }}>

        {/* "Speciality" script */}
        <motion.p
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ fontFamily:"'Great Vibes',cursive", fontSize:36, color:"#D9A441",
            lineHeight:1.2, marginBottom:2 }}>
          Speciality
        </motion.p>

        {/* Main heading */}
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:70, color:"#1E1E1E",
            lineHeight:0.88, letterSpacing:2 }}>HANDMADE</div>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:70, color:"#E6392E",
            lineHeight:0.88, letterSpacing:2 }}>PIZZA DOUGH</div>
        </motion.div>

        {/* Gold decorative divider */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.44 }}
          style={{ display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, margin:"14px auto", width:130 }}>
          <div style={{ flex:1, height:1.5, background:"linear-gradient(90deg,transparent,#D9A441)" }}/>
          <span style={{ fontSize:13, color:"#D9A441" }}>✦</span>
          <div style={{ flex:1, height:1.5, background:"linear-gradient(90deg,#D9A441,transparent)" }}/>
        </motion.div>

        {/* Body text */}
        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ fontFamily:"'Poppins',sans-serif", fontSize:15, color:"#4A3728",
            lineHeight:1.6, fontWeight:400 }}>
          Crafted fresh. Baked to perfection.
        </motion.p>
      </div>

      {/* pizza shows through background image — flex spacer */}
      <div style={{ flex:1, minHeight:0, zIndex:1 }}/>

      {/* ── CTA BUTTON ── */}
      <div style={{ padding:"10px 28px 20px", position:"relative", zIndex:10, flexShrink:0 }}>
        <motion.button
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
          style={{
            width:"100%", padding:"18px 24px",
            background:"linear-gradient(135deg,#C0392B,#E6392E)",
            border:"none", borderRadius:50, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:14,
            boxShadow:"0 10px 32px rgba(230,57,46,0.45)",
          }}
          whileHover={{ scale:1.03, boxShadow:"0 14px 40px rgba(230,57,46,0.58)" }}
          whileTap={{ scale:0.96 }}
          onClick={()=>navigate("/menu")}>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:28, color:"white", letterSpacing:3 }}>
            EXPLORE MENU
          </span>
          <div style={{ width:50, height:50, borderRadius:"50%", background:"white", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#E6392E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.button>

        {/* ornament */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:10 }}>
          <div style={{ width:30, height:1, background:"linear-gradient(90deg,transparent,#D9A441)" }}/>
          <span style={{ fontSize:12 }}>🍕</span>
          <div style={{ width:30, height:1, background:"linear-gradient(90deg,#D9A441,transparent)" }}/>
        </div>
      </div>

      {/* notif popup */}
      <AnimatePresence>
        {notif && (
          <motion.div
            initial={{ opacity:0, y:-10, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-10, scale:0.95 }}
            style={{ position:"absolute", top:82, right:16, zIndex:200, background:"white",
              borderRadius:18, padding:"14px 18px", boxShadow:"0 14px 44px rgba(0,0,0,0.16)", width:220 }}>
            <p style={{ fontWeight:800, fontSize:13, color:"#1E1E1E", marginBottom:8,
              fontFamily:"'Poppins',sans-serif" }}>🔔 Notifications</p>
            {["Your Margherita is on the way! 🛵","20% off on your first order 🎉","New combo: Cheese Burst + Drink"].map((m,i)=>(
              <p key={i} style={{ fontSize:11, color:"#888", marginBottom:5, lineHeight:1.4,
                fontFamily:"'Poppins',sans-serif" }}>{m}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
