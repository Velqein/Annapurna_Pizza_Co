import { useState, useCallback } from "react";
import { rollDice, movePlayer, checkSnake, checkLadder } from "../utils/gameUtils";
import { PLAYERS } from "../data/gameData";

export function useSnakeLadder(playerCount = 1) {
  const activePlayers = PLAYERS.slice(0, playerCount);

  const [positions, setPositions]   = useState(() => Object.fromEntries(activePlayers.map(p => [p.id, 0])));
  const [currentTurn, setCurrentTurn] = useState(0); // index into activePlayers
  const [lastRoll, setLastRoll]       = useState(null);
  const [winner, setWinner]           = useState(null);
  const [rolling, setRolling]         = useState(false);
  const [event, setEvent]             = useState(null); // "snake" | "ladder" | null

  const roll = useCallback(() => {
    if (rolling || winner) return;
    setRolling(true);

    setTimeout(() => {
      const die  = rollDice();
      const player = activePlayers[currentTurn];
      const prev   = positions[player.id];
      let next     = movePlayer(prev, die);

      let evt = null;
      const snakeDest  = checkSnake(next);
      const ladderDest = checkLadder(next);

      if (snakeDest !== null)  { next = snakeDest;  evt = "snake";  }
      if (ladderDest !== null) { next = ladderDest; evt = "ladder"; }

      setLastRoll(die);
      setEvent(evt);
      setPositions(p => ({ ...p, [player.id]: next }));

      if (next === 100) {
        setWinner(player);
      } else {
        setCurrentTurn(t => (t + 1) % activePlayers.length);
      }

      setRolling(false);
    }, 600); // simulate roll delay
  }, [rolling, winner, currentTurn, positions, activePlayers]);

  function resetGame() {
    setPositions(Object.fromEntries(activePlayers.map(p => [p.id, 0])));
    setCurrentTurn(0);
    setLastRoll(null);
    setWinner(null);
    setRolling(false);
    setEvent(null);
  }

  return {
    positions,
    currentTurn,
    currentPlayer: activePlayers[currentTurn],
    activePlayers,
    lastRoll,
    winner,
    rolling,
    event,
    roll,
    resetGame,
  };
}
