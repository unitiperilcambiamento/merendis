import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Sparkles, RotateCw, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * OreoPuzzle:
 * A circular puzzle representing an iconic Oreo cookie.
 * The cookie is composed of 4 concentric/radial sections (or 4 quadrants/rings).
 * Here, we model 4 rotatable quadrants of the circular biscuit pattern with the classic Oreo embossed motifs!
 * Each quadrant has an angle (0, 90, 180, 270 deg).
 * When all 4 quadrants are at 0 deg (or aligned mod 360), the Oreo matches perfectly and unlocks!
 */
export default function OreoPuzzle({ onUnlock }) {
  // 4 slices/quadrants of the Oreo circle.
  // Initial scrambled angles (non-zero multiples of 90)
  const [angles, setAngles] = useState([90, 180, 270, 90]);
  const [isSolved, setIsSolved] = useState(false);
  const [hintActive, setHintActive] = useState(false);

  const checkWinCondition = (currentAngles) => {
    const allAligned = currentAngles.every((angle) => (angle % 360 + 360) % 360 === 0);
    if (allAligned && !isSolved) {
      setIsSolved(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100 text-slate-800">
      {/* Background floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-3xl animate-bounce opacity-70">🍪</div>
        <div className="absolute top-24 right-16 text-3xl animate-pulse opacity-70">💖</div>
        <div className="absolute bottom-16 left-20 text-4xl animate-float opacity-70">✨</div>
        <div className="absolute bottom-20 right-20 text-3xl animate-bounce opacity-70">🍪</div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-4 border border-rose-300">
          <Lock className="w-4 h-4" />
          <span>Area Riservata ad Ele</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          L'Oreo Segreto 🍪
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
          Per sbloccare il tuo regalo e leggere il messaggio, ricomponi il nostro biscotto Oreo preferito! Clicca su ciascuno spicchio del cerchio per ruotarlo fino a completare il disegno.
        </p>

        {/* Circular Oreo Puzzle Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-4 select-none">
          {/* Outer Cookie Glow */}
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 rounded-full blur-md opacity-60 animate-pulse-slow"></div>

          {/* Cookie Base */}
          <div className="relative w-full h-full rounded-full bg-[#1b1715] shadow-2xl overflow-hidden border-4 border-[#3a322d] grid grid-cols-2 grid-rows-2 p-1 gap-1">

            {/* 4 Quadrants */}
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
                  className={`relative w-full h-full bg-[#231e1a] rounded-xl cursor-pointer hover:brightness-125 flex items-center justify-center border ${
                    isQuadrantAligned ? 'border-amber-500/40' : 'border-dashed border-rose-400/50'
                  } group shadow-inner`}
                  title={`Clicca per ruotare lo spicchio ${index + 1}`}
                >
                  {/* Embossed Oreo Details */}
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-[#463d36] fill-current">
                    {/* Concentric rings and Oreo waffle pattern */}
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="16" fill="currentColor" opacity="0.6" />

                    {/* Quadrant orientation hint markings */}
                    {index === 0 && (
                      <text x="45" y="42" fill="#d97706" fontSize="20" fontWeight="bold" textAnchor="middle">O</text>
                    )}
                    {index === 1 && (
                      <text x="55" y="42" fill="#d97706" fontSize="20" fontWeight="bold" textAnchor="middle">R</text>
                    )}
                    {index === 2 && (
                      <text x="45" y="58" fill="#d97706" fontSize="20" fontWeight="bold" textAnchor="middle">E</text>
                    )}
                    {index === 3 && (
                      <text x="55" y="58" fill="#d97706" fontSize="20" fontWeight="bold" textAnchor="middle">O</text>
                    )}

                    {/* Petite heart stamped in each quarter */}
                    <path
                      d="M50,22 C48,18 40,18 40,24 C40,29 50,35 50,35 C50,35 60,29 60,24 C60,18 52,18 50,22 Z"
                      fill="#e11d48"
                      opacity="0.8"
                    />
                  </svg>

                  {/* Rotate badge */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                    <RotateCw className="w-6 h-6 text-white drop-shadow" />
                  </div>

                  {/* Corner indicator */}
                  <div className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${isQuadrantAligned ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}`} />
                </div>
              );
            })}

            {/* Central Cream Logo Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 rounded-full shadow-lg border-2 border-amber-200 flex flex-col items-center justify-center pointer-events-none z-20">
              <span className="text-[10px] font-black tracking-widest text-[#2e2621]">OREO</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-3 text-sm font-medium">
          {isSolved ? (
            <div className="inline-flex items-center gap-1.5 text-emerald-600 font-bold animate-bounce">
              <Unlock className="w-4 h-4" />
              <span>Oreo ricomposto! Apertura in corso...</span>
            </div>
          ) : (
            <div className="text-slate-500 text-xs">
              Allinea tutti i 4 spicchi per sbloccare la lettera segreta!
            </div>
          )}
        </div>

        {/* Buttons / Helpers */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={scramble}
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Rimescola
          </button>

          <button
            id="solve-oreo-btn"
            onClick={solveInstantly}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-md hover:from-rose-600 hover:to-pink-600 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Aiuto Rapido (Risolvi)
          </button>
        </div>

        {/* Tip for Ele */}
        <div className="mt-5 p-3 rounded-2xl bg-rose-50/80 border border-rose-100 text-rose-700 text-xs">
          💡 <strong>Consiglio per Ele:</strong> I pallini verdi indicano quando ogni pezzettino dell'Oreo è nella posizione corretta!
        </div>
      </div>
    </div>
  );
}
