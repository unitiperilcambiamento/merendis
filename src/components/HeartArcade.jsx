import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, RotateCcw, Heart, Flame, Zap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

// Distinct heart types with different colors, point values and descriptions
const HEART_TYPES = [
  { id: 'classic', icon: '💖', name: 'Cuore Rosa Scintillante', points: 10, bg: 'bg-rose-100', color: 'text-rose-600' },
  { id: 'gold', icon: '💛', name: 'Cuore d\'Oro Prezioso', points: 25, bg: 'bg-amber-100', color: 'text-amber-600' },
  { id: 'fire', icon: '❤️‍🔥', name: 'Cuore di Fuoco & Passione', points: 50, bg: 'bg-orange-100', color: 'text-orange-600' },
  { id: 'purple', icon: '💜', name: 'Cuore Viola Dolcezza', points: 15, bg: 'bg-purple-100', color: 'text-purple-600' },
  { id: 'rainbow', icon: '🌈', name: 'Cuore Arcobaleno Magico', points: 100, bg: 'bg-teal-100', color: 'text-teal-600' },
  { id: 'cookie', icon: '🍪', name: 'Cuore Oreo Speciale', points: 75, bg: 'bg-stone-200', color: 'text-stone-800' },
];

export default function HeartArcade({ onSecretTriggered }) {
  const [selectedGame, setSelectedGame] = useState('catcher'); // 'catcher' | 'popper' | 'memory' | 'clicker'
  const [score, setScore] = useState(0);
  const [secretShown, setSecretShown] = useState(false);
  const [lastHeartCollected, setLastHeartCollected] = useState(null);

  // Check 2212 secret trigger
  const addPoints = (points) => {
    setScore((prev) => {
      const nextScore = prev + points;
      if (nextScore >= 2212 && !secretShown) {
        setSecretShown(true);
        triggerSecretModal();
      }
      return nextScore;
    });
  };

  const triggerSecretModal = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#e11d48', '#fb7185', '#f43f5e', '#ffe4e6']
    });
    onSecretTriggered();
  };

  const setScoreDirectly = (val) => {
    setScore(val);
    if (val >= 2212 && !secretShown) {
      setSecretShown(true);
      triggerSecretModal();
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2 uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>Heart Arcade per Ele</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            I Giochini dei Cuoricini Diversi 💕
          </h2>
          <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-lg">
            Divertiti con i vari tipi di cuori! C'è un dolce segreto nascosto: raggiungi esattamente o supera i <strong>2212 punti</strong> in qualunque gioco per scoprirlo!
          </p>
        </div>

        {/* Global Score Display & Quick Cheat / Reset */}
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 min-w-[200px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-100">Punti Cuore</span>
          <span id="arcade-score-value" className="text-3xl sm:text-4xl font-black tracking-tight text-white animate-pulse">
            {score}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => { setScore(0); setSecretShown(false); }}
              className="text-[11px] underline opacity-80 hover:opacity-100 transition"
              title="Resetta punteggio"
            >
              Azzera
            </button>
            <span className="opacity-50">&bull;</span>
            <button
              id="cheat-2212-btn"
              onClick={() => setScoreDirectly(2212)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold shadow hover:bg-amber-300 transition"
              title="Raggiungi istantaneamente 2212 punti per vedere il segreto"
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Segreto 2212!</span>
            </button>
          </div>
        </div>
      </div>

      {/* Heart Types Legend */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-rose-100 shadow-sm">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>I Cuoricini da Collezionare:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {HEART_TYPES.map((ht) => (
            <div key={ht.id} className={`p-2 rounded-xl ${ht.bg} flex items-center gap-2 border border-black/5`}>
              <span className="text-2xl">{ht.icon}</span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-800 truncate">{ht.name}</p>
                <p className="text-[10px] font-semibold text-rose-600">+{ht.points} pt</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'catcher', label: '1. Acchiappa i Cuori Cadenti', icon: '🧺' },
          { id: 'popper', label: '2. Scoppia i Cuoricini Magici', icon: '🫧' },
          { id: 'memory', label: '3. Memory delle Coppie d\'Amore', icon: '🃏' },
          { id: 'clicker', label: '4. Generatore di Cuori Turbo', icon: '💖' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`game-tab-${tab.id}`}
            onClick={() => setSelectedGame(tab.id)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center gap-2 transition ${
              selectedGame === tab.id
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-rose-50 border border-rose-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Game Container */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl min-h-[440px] flex flex-col justify-center">
        {selectedGame === 'catcher' && (
          <CatcherGame onAddPoints={addPoints} />
        )}
        {selectedGame === 'popper' && (
          <PopperGame onAddPoints={addPoints} />
        )}
        {selectedGame === 'memory' && (
          <MemoryGame onAddPoints={addPoints} />
        )}
        {selectedGame === 'clicker' && (
          <ClickerGame onAddPoints={addPoints} />
        )}
      </div>

      {/* Secret 2212 Points Milestone Alert / Indicator */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center font-black text-sm shadow">
            2212
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">Traguardo Segreto: 2212 Punti</h4>
            <p className="text-xs text-amber-800">
              {score >= 2212
                ? '✨ Segreto sbloccato! Il messaggio speciale "ti amo" è stato rivelato!'
                : `Mancano ancora ${2212 - score} punti per scoprire il messaggio nascosto.`}
            </p>
          </div>
        </div>

        {score >= 2212 && (
          <button
            onClick={triggerSecretModal}
            className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 shadow transition animate-bounce"
          >
            💖 Mostra di Nuovo il "Ti Amo"
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------- GAME 1: Cuori Cadenti (Catcher) ----------------
function CatcherGame({ onAddPoints }) {
  const [basketX, setBasketX] = useState(50); // percentage 0 - 100
  const [fallingHearts, setFallingHearts] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);

  const startGame = () => {
    setIsActive(true);
    setFallingHearts([]);
  };

  useEffect(() => {
    if (!isActive) return;

    // Spawn falling hearts periodically
    const spawnTimer = setInterval(() => {
      const randomHeart = HEART_TYPES[Math.floor(Math.random() * HEART_TYPES.length)];
      setFallingHearts((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          heart: randomHeart,
          x: Math.floor(Math.random() * 85) + 5, // 5% to 90%
          y: 0,
        }
      ]);
    }, 700);

    // Gravity / falling tick
    const tickTimer = setInterval(() => {
      setFallingHearts((prev) => {
        const next = [];
        for (const item of prev) {
          const newY = item.y + 4;
          // Check collision with basket (basket is around y: 85 - 95%)
          if (newY >= 82 && newY <= 94) {
            const diffX = Math.abs(item.x - basketX);
            if (diffX < 15) {
              // Caught!
              onAddPoints(item.heart.points);
              continue;
            }
          }
          if (newY < 100) {
            next.push({ ...item, y: newY });
          }
        }
        return next;
      });
    }, 50);

    return () => {
      clearInterval(spawnTimer);
      clearInterval(tickTimer);
    };
  }, [isActive, basketX, onAddPoints]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, relX)));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Acchiappa i Cuoricini dal Cielo 🧺</h3>
        <p className="text-xs text-slate-500">
          Muovi il cestino col mouse o col dito per catturare i vari tipi di cuori che piovono!
        </p>
      </div>

      {!isActive ? (
        <div className="py-12 text-center">
          <button
            onClick={startGame}
            id="start-catcher-btn"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:from-rose-600 hover:to-pink-600 transition"
          >
            Inizia la Pioggia di Cuori ✨
          </button>
        </div>
      ) : (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          className="relative w-full max-w-lg h-72 bg-gradient-to-b from-rose-50/70 via-pink-100/50 to-rose-200/60 rounded-2xl border-2 border-rose-300 overflow-hidden cursor-crosshair select-none"
        >
          {/* Falling items */}
          {fallingHearts.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl drop-shadow transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.heart.icon}
            </div>
          ))}

          {/* The Basket */}
          <div
            className="absolute bottom-2 -translate-x-1/2 px-4 py-1.5 rounded-2xl bg-rose-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-1 border-2 border-white pointer-events-none"
            style={{ left: `${basketX}%` }}
          >
            <span>🧺</span>
            <span>Ele's Basket</span>
          </div>
        </div>
      )}

      {/* Manual quick catch button for easy play */}
      <button
        onClick={() => {
          const heart = HEART_TYPES[Math.floor(Math.random() * HEART_TYPES.length)];
          onAddPoints(heart.points);
        }}
        className="mt-4 px-4 py-1.5 rounded-xl bg-rose-100 text-rose-700 text-xs font-semibold hover:bg-rose-200 transition"
      >
        + Cattura Cuore Rapido (+punti)
      </button>
    </div>
  );
}

// ---------------- GAME 2: Cuori Esplosivi (Popper) ----------------
function PopperGame({ onAddPoints }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate bubbles
    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= 8) return prev;
        const randomHeart = HEART_TYPES[Math.floor(Math.random() * HEART_TYPES.length)];
        return [
          ...prev,
          {
            id: Math.random().toString(),
            heart: randomHeart,
            x: Math.floor(Math.random() * 80) + 10,
            y: Math.floor(Math.random() * 70) + 15,
            size: Math.floor(Math.random() * 15) + 40,
          }
        ];
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (id, points) => {
    onAddPoints(points);
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Scoppia i Cuoricini Fluttuanti 🫧</h3>
        <p className="text-xs text-slate-500">
          Clicca o tocca sui cuoricini per farli scoppiare e guadagnare un sacco di punti!
        </p>
      </div>

      <div className="relative w-full max-w-lg h-72 bg-gradient-to-tr from-amber-50 via-rose-50 to-pink-100 rounded-2xl border-2 border-rose-300 overflow-hidden select-none">
        {bubbles.map((b) => (
          <button
            key={b.id}
            data-testid="popper-heart-bubble"
            onClick={() => popBubble(b.id, b.heart.points)}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-md border-2 border-rose-300 hover:scale-125 active:scale-90 flex items-center justify-center transition-transform animate-float cursor-pointer"
          >
            <span className="text-xl">{b.heart.icon}</span>
          </button>
        ))}
        {bubbles.length === 0 && (
          <div className="h-full flex items-center justify-center text-rose-400 text-xs font-semibold">
            In arrivo nuovi cuoricini...
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onAddPoints(50)}
          className="px-4 py-1.5 rounded-xl bg-rose-100 text-rose-700 text-xs font-semibold hover:bg-rose-200 transition"
        >
          Scoppio Multiplo (+50 pt)
        </button>
      </div>
    </div>
  );
}

// ---------------- GAME 3: Memory d'Amore ----------------
function MemoryGame({ onAddPoints }) {
  const cardsTemplate = [
    { name: 'Oreo', icon: '🍪', id: 1 },
    { name: 'Oreo', icon: '🍪', id: 2 },
    { name: 'Cuore Oro', icon: '💛', id: 3 },
    { name: 'Cuore Oro', icon: '💛', id: 4 },
    { name: 'Cuore Rosa', icon: '💖', id: 5 },
    { name: 'Cuore Rosa', icon: '💖', id: 6 },
    { name: 'Arcobaleno', icon: '🌈', id: 7 },
    { name: 'Arcobaleno', icon: '🌈', id: 8 },
  ];

  const [cards, setCards] = useState(() => [...cardsTemplate].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];
      if (first.name === second.name) {
        setMatched((prev) => [...prev, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
        onAddPoints(80);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const resetGame = () => {
    setCards([...cardsTemplate].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Memory delle Coppie dei Cuori 🃏</h3>
        <p className="text-xs text-slate-500">Trova le coppie identiche di cuori e biscotti Oreo!</p>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-sm w-full">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              data-testid={`memory-card-${idx}`}
              onClick={() => handleCardClick(idx)}
              className={`h-20 rounded-2xl font-bold text-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                isFlipped
                  ? 'bg-rose-50 border-rose-400 rotate-0'
                  : 'bg-gradient-to-tr from-rose-500 to-pink-500 border-white text-white rotate-6'
              }`}
            >
              {isFlipped ? card.icon : '❓'}
            </button>
          );
        })}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Nuova Partita
      </button>
    </div>
  );
}

// ---------------- GAME 4: Turbo Clicker ----------------
function ClickerGame({ onAddPoints }) {
  const [multiplier, setMultiplier] = useState(1);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const pts = 20 * multiplier;
    onAddPoints(pts);
    setClickCount((c) => c + 1);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-xl font-bold text-slate-800 mb-1">Generatore di Cuori Turbo 💖</h3>
      <p className="text-xs text-slate-500 mb-6 max-w-sm">
        Clicca a raffica sul maxi-cuore per accumulare tantissimi punti e scalare verso quota 2212!
      </p>

      <button
        id="maxi-heart-clicker"
        onClick={handleClick}
        className="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 shadow-xl border-4 border-white flex flex-col items-center justify-center text-white hover:scale-110 active:scale-95 transition transform group cursor-pointer"
      >
        <Heart className="w-16 h-16 fill-white group-hover:animate-ping" />
        <span className="text-xs font-black tracking-widest uppercase mt-1">CLICK!</span>
      </button>

      <div className="flex items-center gap-2 mt-6">
        <span className="text-xs text-slate-600">Moltiplicatore Cuore:</span>
        {[1, 2, 5, 10].map((m) => (
          <button
            key={m}
            onClick={() => setMultiplier(m)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              multiplier === m
                ? 'bg-rose-500 text-white'
                : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
            }`}
          >
            x{m}
          </button>
        ))}
      </div>
    </div>
  );
}
