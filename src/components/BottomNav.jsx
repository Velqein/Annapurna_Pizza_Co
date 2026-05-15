import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MenuIcon, ComboIcon, AddonsIcon, GameIcon } from "./NavIcons";

const NAV = [
  { label: "Menu",      Icon: MenuIcon,   path: "/menu"         },
  { label: "Combos",    Icon: ComboIcon,  path: "/menu"         }, // placeholder
  { label: "Add-ons",   Icon: AddonsIcon, path: "/menu"         }, // placeholder
  { label: "Play Game", Icon: GameIcon,   path: "/games"        },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeIndex = () => {
    if (pathname === "/games" || pathname === "/snake-ladder") return 3;
    if (pathname === "/menu") return 0;
    return 0;
  };

  const active = activeIndex();

  return (
    <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, padding:"0 14px 18px", zIndex:300 }}>
      <motion.div
        style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(26px)", WebkitBackdropFilter:"blur(26px)", borderRadius:26, padding:"10px 6px", boxShadow:"0 -2px 0 rgba(0,0,0,0.03),0 -8px 34px rgba(0,0,0,0.09),0 8px 24px rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-around", border:"1px solid rgba(255,255,255,0.92)" }}
        initial={{ y: 80 }} animate={{ y: 0 }}
        transition={{ type:"spring", stiffness:260, damping:22, delay:0.3 }}>
        {NAV.map((item, i) => {
          const on = active === i;
          return (
            <motion.button key={i}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"6px 14px", borderRadius:16, border:"none", background:"transparent", cursor:"pointer", position:"relative" }}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.87 }}>
              <motion.div animate={{ scale: on ? 1.14 : 1 }} transition={{ type:"spring", stiffness:420, damping:20 }}>
                <item.Icon active={on} />
              </motion.div>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, fontWeight:on?700:400, color:on?"#E6392E":"#9CA3AF" }}>{item.label}</span>
              {on && (
                <motion.div layoutId="navBar"
                  style={{ position:"absolute", bottom:-2, width:22, height:3.5, background:"linear-gradient(90deg,#E6392E,#FF5555)", borderRadius:3 }}
                  transition={{ type:"spring", stiffness:380, damping:28 }}/>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
