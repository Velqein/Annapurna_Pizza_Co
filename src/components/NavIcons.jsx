// SVG icons used in the bottom navigation bar

export function MenuIcon({ active }) {
  const c = active ? "#E6392E" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M3 12h18M3 18h12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function ComboIcon({ active }) {
  const c = active ? "#E6392E" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="13" rx="2" stroke={c} strokeWidth="1.7"/>
      <path d="M12 8V21M3 12h18" stroke={c} strokeWidth="1.7"/>
      <path d="M12 8C12 8 9 5 7 6s-1 4 5 2M12 8C12 8 15 5 17 6s1 4-5 2" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

export function AddonsIcon({ active }) {
  const c = active ? "#E6392E" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/>
      <path d="M12 8v8M8 12h8" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

export function GameIcon({ active }) {
  const c = active ? "#E6392E" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="12" rx="4" stroke={c} strokeWidth="1.7"/>
      <path d="M8 11v4M6 13h4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="16" cy="12" r="1.1" fill={c}/>
      <circle cx="18" cy="14" r="1.1" fill={c}/>
    </svg>
  );
}
