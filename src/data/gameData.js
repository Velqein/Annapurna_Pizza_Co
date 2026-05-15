// ── Snake positions: { head: square, tail: square } ──────────────────────────
export const SNAKES = [
  { head: 99, tail: 78 },
  { head: 95, tail: 24 },
  { head: 92, tail: 73 },
  { head: 87, tail: 24 },
  { head: 64, tail: 60 },
  { head: 62, tail: 19 },
  { head: 54, tail: 34 },
  { head: 17, tail:  7 },
];

// ── Ladder positions: { bottom: square, top: square } ────────────────────────
export const LADDERS = [
  { bottom:  4, top: 25 },
  { bottom:  9, top: 31 },
  { bottom: 20, top: 59 },
  { bottom: 28, top: 84 },
  { bottom: 40, top: 59 },
  { bottom: 51, top: 67 },
  { bottom: 63, top: 81 },
  { bottom: 71, top: 91 },
];

// ── Player configs ────────────────────────────────────────────────────────────
export const PLAYERS = [
  { id: 1, label: "You",      color: "#E6392E", token: "🔴" },
  { id: 2, label: "Player 2", color: "#D9A441", token: "🟡" },
  { id: 3, label: "Player 3", color: "#718A32", token: "🟢" },
  { id: 4, label: "Player 4", color: "#3B82F6", token: "🔵" },
];

// ── Game mode options shown on selection screen ───────────────────────────────
export const GAME_MODES = [
  { id: 1, label: "Single Player", sub: "Play against the computer", icon: "👤",  players: 1 },
  { id: 2, label: "Multi · Two",   sub: "Play with 2 players",       icon: "👥",  players: 2 },
  { id: 3, label: "Multi · Three", sub: "Play with 3 players",       icon: "👨‍👩‍👦", players: 3 },
  { id: 4, label: "Multi · Four",  sub: "Play with 4 players",       icon: "👨‍👩‍👧‍👦", players: 4 },
];
