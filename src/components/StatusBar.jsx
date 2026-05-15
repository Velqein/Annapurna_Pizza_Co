// Mobile status bar (time + signal + battery)
export default function StatusBar() {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 22px 6px" }}>
      <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:"#1E1E1E" }}>9:41</span>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {/* signal bars */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:2 }}>
          {[5,7,10,13].map((h,i)=>(
            <div key={i} style={{ width:3.2, height:h, background:i<3?"#1E1E1E":"#CCC", borderRadius:2 }}/>
          ))}
        </div>
        {/* wifi */}
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <path d="M8.5 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#1E1E1E"/>
          <path d="M4.5 7.5a5.5 5.5 0 019 0" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M1.5 4.5a9.5 9.5 0 0114 0" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        {/* battery */}
        <div style={{ display:"flex", alignItems:"center" }}>
          <div style={{ width:27, height:14, border:"2px solid #1E1E1E", borderRadius:4, padding:"1.5px 2px" }}>
            <div style={{ width:"74%", height:"100%", background:"#1E1E1E", borderRadius:2 }}/>
          </div>
          <div style={{ width:3, height:7, background:"#1E1E1E", borderRadius:"0 2px 2px 0", marginLeft:1 }}/>
        </div>
      </div>
    </div>
  );
}
