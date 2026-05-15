import { SNAKES, LADDERS } from "../data/gameData";

// Convert board square (1–100) to [row, col] in rendered grid
export function squareToCell(square) {
  const idx  = square - 1;           // 0-based
  const row  = Math.floor(idx / 10); // 0 = bottom row
  const col  = idx % 10;
  // even rows go left→right, odd rows go right→left
  const renderCol = row % 2 === 0 ? col : 9 - col;
  const renderRow = 9 - row;         // flip so row 0 is at bottom
  return [renderRow, renderCol];
}

export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export function checkSnake(pos) {
  const s = SNAKES.find(s => s.head === pos);
  return s ? s.tail : null;
}

export function checkLadder(pos) {
  const l = LADDERS.find(l => l.bottom === pos);
  return l ? l.top : null;
}

export function movePlayer(pos, roll) {
  const next = pos + roll;
  if (next > 100) return pos; // can't overshoot 100
  return next;
}
