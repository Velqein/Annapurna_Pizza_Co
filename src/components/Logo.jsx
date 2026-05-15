// ZORO Pizza Co. logo — used in all top nav bars
export default function Logo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#E6392E"/>
          <circle cx="16" cy="16" r="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.28"/>
          <path d="M16 7 L23 24 L9 24 Z" fill="white" opacity="0.16"/>
          <circle cx="13" cy="18" r="1.4" fill="white" opacity="0.52"/>
          <circle cx="18" cy="20" r="1.4" fill="white" opacity="0.52"/>
          <circle cx="16" cy="14" r="0.9" fill="white" opacity="0.42"/>
          <circle cx="16" cy="6"  r="2.5" fill="#D9A441"/>
          <circle cx="16" cy="6"  r="1.1" fill="white" opacity="0.55"/>
        </svg>
        <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:24, letterSpacing:2.5, color:"#E6392E", lineHeight:1 }}>ZORO</span>
      </div>
      <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:8.5, letterSpacing:4, color:"#B0A090", fontWeight:600, marginTop:1 }}>— PIZZA CO. —</span>
    </div>
  );
}
