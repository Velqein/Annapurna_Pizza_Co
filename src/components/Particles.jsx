import { motion } from "framer-motion";

// Seeded so particles don't re-randomize on re-render
const ITEMS = [
  { id:0,  x:8,  y:6,  s:14, dur:4.2, delay:0.0, em:"🌿" },
  { id:1,  x:88, y:12, s:10, dur:5.1, delay:0.8, em:"🍃" },
  { id:2,  x:22, y:78, s:8,  dur:4.8, delay:1.2, em:"🌱" },
  { id:3,  x:72, y:45, s:12, dur:3.9, delay:0.4, em:"✨" },
  { id:4,  x:50, y:20, s:7,  dur:5.6, delay:2.1, em:"🌿" },
  { id:5,  x:14, y:50, s:9,  dur:4.4, delay:1.6, em:"🌶️" },
  { id:6,  x:82, y:72, s:11, dur:4.0, delay:0.3, em:"🍃" },
  { id:7,  x:38, y:88, s:8,  dur:5.2, delay:2.8, em:"✨" },
  { id:8,  x:62, y:8,  s:13, dur:3.7, delay:0.9, em:"🌿" },
  { id:9,  x:6,  y:32, s:7,  dur:4.9, delay:1.9, em:"⭐" },
  { id:10, x:94, y:55, s:9,  dur:5.4, delay:0.6, em:"🍃" },
  { id:11, x:28, y:15, s:6,  dur:4.1, delay:3.0, em:"🌱" },
];

export default function Particles() {
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:1 }}>
      {ITEMS.map(p => (
        <motion.div key={p.id}
          style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, fontSize:p.s, userSelect:"none", opacity:0.3 }}
          animate={{ y:[-10,10,-10], x:[-5,5,-5], rotate:[-18,18,-18], opacity:[0.15,0.35,0.15] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:"easeInOut" }}>
          {p.em}
        </motion.div>
      ))}
    </div>
  );
}
