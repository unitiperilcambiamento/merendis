import React, { useState } from 'react';
import { Lock, Unlock, RotateCw, RefreshCw, Sparkle } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * OreoPuzzle:
 * Circular lock puzzle representing an Oreo cookie.
 * 4 quadrants rotate upon click to align the circular pattern.
 * Sleek, clean and mature aesthetic.
 */
export default function OreoPuzzle({ onUnlock }) {
  const [angles, setAngles] = useState([90, 180, 270, 90]);
  const [isSolved, setIsSolved] = useState(false);

  const checkWinCondition = (currentAngles) => {
    const allAligned = currentAngles.every((angle) => (angle % 360 + 360) % 360 === 0);
    if (allAligned && !isSolved) {
      setIsSolved(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
      setTimeout(() => {
        onUnlock();
      }, 700);
    }
  };

  const rotateQuadrant = (index) => {
    if (isSolved) return;
    setAngles((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 90) % 360;
      checkWinCondition(next);
      return next;
    });
  };

  const solveInstantly = () => {
    const solved = [0, 0, 0, 0];
    setAngles(solved);
    checkWinCondition(solved);
  };

  const scramble = () => {
    setIsSolved(false);
    setAngles([90, 180, 270, 180]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-rose-50/40 to-slate-200 text-slate-800">
      <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4 border border-slate-200">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Accesso Riservato ad Ele</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Il Cerchio dell'Oreo
        </h1>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Ruota i quattro settori del cerchio fino a ricomporre il disegno per accedere all'applicazione e leggere il messaggio.
        </p>

        {/* Circular Oreo Puzzle */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-4 select-none">
          <div className="relative w-full h-full rounded-full bg-[#1b1715] shadow-2xl overflow-hidden border-4 border-[#352e2a] grid grid-cols-2 grid-rows-2 p-1.5 gap-1.5">
            {[0, 1, 2, 3].map((index) => {
              const currentAngle = angles[index];
              const isQuadrantAligned = (currentAngle % 360 + 360) % 360 === 0;

              return (
                <div
                  key={index}
                  data-testid={`oreo-quadrant-${index}`}
                  onClick={() => rotateQuadrant(index)}
                  style={{
                    transform: `rotate(${currentAngle}deg)`,
                    transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  className={`relative w-full h-full bg-[#241f1b] rounded-xl cursor-pointer hover:brightness-125 flex items-center justify-center border ${
                    isQuadrantAligned ? 'border-amber-500/50' : 'border-dashed border-slate-600'
                  } group shadow-inner`}
                  title={`Ruota settore ${index + 1}`}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-[#4b4139] fill-current">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="14" fill="currentColor" opacity="0.4" />

                    {index === 0 && <text x="44" y="44" fill="#d97706" fontSize="18" fontWeight="bold" textAnchor="middle">O</text>}
                    {index === 1 && <text x="56" y="44" fill="#d97706" fontSize="18" fontWeight="bold" textAnchor="middle">R</text>}
                    {index === 2 && <text x="44" y="60" fill="#d97706" fontSize="18" fontWeight="bold" textAnchor="middle">E</text>}
                    {index === 3 && <text x="56" y="60" fill="#d97706" fontSize="18" fontWeight="bold" textAnchor="middle">O</text>}
                  </svg>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                    <RotateCw className="w-5 h-5 text-white" />
                  </div>

                  <div className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${isQuadrantAligned ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                </div>
              );
            })}

            {/* Central Cream Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-stone-100 rounded-full shadow-md border-2 border-stone-300 flex flex-col items-center justify-center pointer-events-none z-20">
              <span className="text-[11px] font-black tracking-widest text-stone-800">OREO</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 text-sm font-medium">
          {isSolved ? (
            <div className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Unlock className="w-4 h-4" />
              <span>Disegno completato. Apertura in corso...</span>
            </div>
          ) : (
            <div className="text-slate-500 text-xs">
              Allinea tutti i quattro settori nella posizione corretta.
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={scramble}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ricomponi</span>
          </button>

          <button
            id="solve-oreo-btn"
            onClick={solveInstantly}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Risolvi Subito</span>
          </button>
        </div>
      </div>
    </div>
  );
}
