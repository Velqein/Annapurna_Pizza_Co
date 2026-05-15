import { motion } from "framer-motion";

// Renders a pizza as a detailed SVG illustration
export default function PizzaSVG({ pizza, size = 190, stretch = false }) {
  const id  = `p${pizza.id}`;
  const cx  = size / 2;
  const cy  = size / 2;
  const cR  = size * 0.44;
  const sR  = size * 0.368;
  const chR = size * 0.348;

  const rings = [
    { count: 6,  r: chR * 0.52 },
    { count: 10, r: chR * 0.83 },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow:"visible" }}>
      <defs>
        <radialGradient id={`${id}cr`} cx="44%" cy="36%" r="56%">
          <stop offset="0%"   stopColor="#F2CC60"/>
          <stop offset="52%"  stopColor={pizza.crustColor}/>
          <stop offset="100%" stopColor="#7A4A05"/>
        </radialGradient>
        <radialGradient id={`${id}sa`} cx="50%" cy="45%" r="50%">
          <stop offset="0%"   stopColor="#FF6666"/>
          <stop offset="100%" stopColor={pizza.sauceColor}/>
        </radialGradient>
        <radialGradient id={`${id}ch`} cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#FFF5B0"/>
          <stop offset="100%" stopColor={pizza.cheeseColor}/>
        </radialGradient>
        <filter id={`${id}ds`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy={size*0.055} stdDeviation={size*0.065} floodColor="#000" floodOpacity="0.42"/>
        </filter>
      </defs>

      {/* shadow */}
      <ellipse cx={cx} cy={size*0.93} rx={cR*0.72} ry={size*0.063} fill="rgba(0,0,0,0.28)"/>
      {/* crust */}
      <circle cx={cx} cy={cy} r={cR} fill={`url(#${id}cr)`} filter={`url(#${id}ds)`}/>
      {/* crust bumps */}
      {Array.from({length:22}).map((_,i) => {
        const a = (i/22)*Math.PI*2;
        return <circle key={i} cx={cx+Math.cos(a)*cR*0.93} cy={cy+Math.sin(a)*cR*0.93} r={size*0.014} fill="#8A5005" opacity="0.52"/>;
      })}
      {/* sauce */}
      <circle cx={cx} cy={cy} r={sR} fill={`url(#${id}sa)`}/>
      {/* cheese */}
      <circle cx={cx} cy={cy} r={chR} fill={`url(#${id}ch)`} opacity="0.9"/>
      {/* cheese blobs */}
      {Array.from({length:8}).map((_,i) => {
        const a = (i/8)*Math.PI*2;
        return <ellipse key={i} cx={cx+Math.cos(a)*chR*0.42} cy={cy+Math.sin(a)*chR*0.42} rx={chR*0.22} ry={chR*0.15} fill={pizza.cheeseColor} opacity="0.6"/>;
      })}
      {/* toppings */}
      {rings.map((ring,ri) =>
        Array.from({length:ring.count}).map((_,i) => {
          const a   = (i/ring.count)*Math.PI*2 + ri*0.45;
          const col = pizza.toppings[(ri*5+i) % pizza.toppings.length];
          const r2  = size*(col==="#E74C3C"||col==="#C0392B" ? 0.032 : 0.026);
          return (
            <g key={`${ri}-${i}`}>
              <circle cx={cx+Math.cos(a)*ring.r} cy={cy+Math.sin(a)*ring.r} r={r2} fill={col} opacity="0.93"/>
              <circle cx={cx+Math.cos(a)*ring.r-r2*0.28} cy={cy+Math.sin(a)*ring.r-r2*0.28} r={r2*0.33} fill="white" opacity="0.28"/>
            </g>
          );
        })
      )}
      {/* basil leaves */}
      {[0,1,2,3,4].map((_,i) => {
        const a   = (i/5)*Math.PI*2 + 0.65;
        const lx  = cx+Math.cos(a)*chR*0.54;
        const ly  = cy+Math.sin(a)*chR*0.54;
        const rot = (a*57.3)+22;
        return (
          <g key={i} transform={`rotate(${rot},${lx},${ly})`}>
            <ellipse cx={lx} cy={ly} rx={size*0.052} ry={size*0.026} fill="#1E7A2E" opacity="0.93"/>
            <line x1={lx-size*0.038} y1={ly} x2={lx+size*0.038} y2={ly} stroke="#2D9E3E" strokeWidth="0.9" opacity="0.55"/>
          </g>
        );
      })}
      {/* center highlight */}
      <circle cx={cx-size*0.06} cy={cy-size*0.08} r={size*0.09} fill="white" opacity="0.06"/>
      {/* animated cheese stretch */}
      {stretch && [[-0.14,0.3],[-0.04,0.26],[0.07,0.28],[0.19,0.22]].map(([ox,len],i) => (
        <motion.line key={i}
          x1={cx+ox*size} y1={cy-cR*0.68}
          x2={cx+ox*size*1.35} y2={cy-cR*0.68-len*size}
          stroke={pizza.cheeseColor} strokeWidth={3-i*0.6} strokeLinecap="round" opacity={0.62-i*0.1}
          animate={{ y2:[cy-cR*0.68-len*size, cy-cR*0.68-len*size*0.68, cy-cR*0.68-len*size] }}
          transition={{ duration:2.6+i*0.35, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </svg>
  );
}
