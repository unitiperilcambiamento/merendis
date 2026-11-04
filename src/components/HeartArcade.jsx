import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Heart, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

// Target Easter Egg scores as requested:
// 2009, 2212 (with "ti amo"), 1209, 1812, 2610
const EASTER_EGG_SCORES = {
  1209: { title: 'Traguardo 1209', desc: 'Una data incisa nella memoria. Un ricordo indelebile.' },
  1812: { title: 'Traguardo 1812', desc: 'Un momento prezioso che custodisco con profondo affetto.' },
  2009: { title: 'Traguardo 2009', desc: 'Il tempo trascorso insieme è una certezza che non muta.' },
  2212: { title: 'Traguardo 2212', desc: 'ti amo', isMainLoveSecret: true },
  2610: { title: 'Traguardo 2610', desc: 'Sempre al tuo fianco, con rispetto e verità.' },
};

export default function HeartArcade({ onSecretTriggered }) {
  const [selectedGame, setSelectedGame] = useState('catcher'); // 'catcher' | 'popper' | 'memory' | 'clicker'
  const [score, setScore] = useState(0);
  const [unlockedEggs, setUnlockedEggs] = useState([]);
  const [activeEggModal, setActiveEggModal] = useState(null);

  const checkEasterEggs = (newScore) => {
    // If exactly or crosses 2212
    if (newScore >= 2212 && !unlockedEggs.includes(2212)) {
      setUnlockedEggs((prev) => [...prev, 2212]);
      onSecretTriggered();
      return;
    }

    // Check specific egg scores
    Object.keys(EASTER_EGG_SCORES).forEach((scoreKey) => {
      const target = Number(scoreKey);
      if (newScore === target && !unlockedEggs.includes(target)) {
        setUnlockedEggs((prev) => [...prev, target]);
        setActiveEggModal(EASTER_EGG_SCORES[target]);
        confetti({ particleCount: 70, spread: 60 });
      }
    });
  };

  const addPoints = (points) => {
    setScore((prev) => {
      const nextScore = prev + points;
      checkEasterEggs(nextScore);
      return nextScore;
    });
  };

  const setScoreDirectly = (val) => {
    setScore(val);
    if (val === 2212 || val >= 2212) {
      if (!unlockedEggs.includes(2212)) {
        setUnlockedEggs((prev) => [...prev, 2212]);
      }
      onSecretTriggered();
    } else if (EASTER_EGG_SCORES[val]) {
      setActiveEggModal(EASTER_EGG_SCORES[val]);
      if (!unlockedEggs.includes(val)) {
        setUnlockedEggs((prev) => [...prev, val]);
      }
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner */}
      <div className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            Spazio Interattivo
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1 mb-2 text-stone-100">
            Sala Giochi
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg leading-relaxed">
            Quattro giochi di concentrazione e precisione. Raggiungendo determinati punteggi chiave (come 1209, 1812, 2009, 2212, 2610) si sbloccheranno easter egg riservati. In particolare a <strong>2212 punti</strong> è custodito il messaggio principale.
          </p>
        </div>

        {/* Global Score Display */}
        <div className="flex flex-col items-center bg-stone-800/80 px-6 py-4 rounded-xl border border-stone-700 min-w-[210px]">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-400">Punteggio Totale</span>
          <span id="arcade-score-value" className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white my-1">
            {score}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => { setScore(0); setUnlockedEggs([]); }}
              className="text-[11px] text-stone-400 hover:text-stone-200 underline transition"
            >
              Azzera
            </button>
            <span className="text-stone-600">&bull;</span>
            <button
              id="cheat-2212-btn"
              onClick={() => setScoreDirectly(2212)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 text-stone-900 text-xs font-medium hover:bg-white transition"
              title="Raggiungi quota 2212"
            >
              <Zap className="w-3 h-3 text-stone-700" />
              <span>Quota 2212</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secret Targets Bar */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-medium text-stone-600">
          Traguardi segreti:
        </div>
        <div className="flex flex-wrap gap-2">
          {[1209, 1812, 2009, 2212, 2610].map((target) => {
            const isUnlocked = score >= target || unlockedEggs.includes(target);
            return (
              <button
                key={target}
                onClick={() => setScoreDirectly(target)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                  isUnlocked
                    ? 'bg-rose-50 text-rose-800 border border-rose-300'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {isUnlocked && <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />}
                <span>{target}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'catcher', label: '1. Riflessi e Coordinate' },
          { id: 'popper', label: '2. Sfere in Sospensione' },
          { id: 'memory', label: '3. Memoria Visiva' },
          { id: 'clicker', label: '4. Ritmo e Precisione' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`game-tab-${tab.id}`}
            onClick={() => setSelectedGame(tab.id)}
            className={`px-4 py-2 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition ${
              selectedGame === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Game Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm min-h-[420px] flex flex-col justify-center">
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

      {/* Modal for other easter egg scores */}
      {activeEggModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center border border-stone-200 shadow-xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200 mb-3">
              <Heart className="w-6 h-6 fill-rose-600" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">{activeEggModal.title}</h4>
            <p className="text-stone-600 text-sm mb-4 leading-relaxed">{activeEggModal.desc}</p>
            <button
              onClick={() => setActiveEggModal(null)}
              className="px-5 py-2 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- GAME 1: Riflessi e Coordinate ----------------
function CatcherGame({ onAddPoints }) {
  const [paddleX, setPaddleX] = useState(50);
  const [items, setItems] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);

  const startGame = () => {
    setIsActive(true);
    setItems([]);
  };

  useEffect(() => {
    if (!isActive) return;

    const spawnTimer = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          points: 15,
          x: Math.floor(Math.random() * 85) + 5,
          y: 0,
        }
      ]);
    }, 650);

    const tickTimer = setInterval(() => {
      setItems((prev) => {
        const next = [];
        for (const item of prev) {
          const newY = item.y + 4.5;
          if (newY >= 82 && newY <= 94) {
            const diffX = Math.abs(item.x - paddleX);
            if (diffX < 15) {
              onAddPoints(item.points);
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
  }, [isActive, paddleX, onAddPoints]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    setPaddleX(Math.max(5, Math.min(95, relX)));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg font-serif font-bold text-stone-900">Riflessi e Coordinate</h3>
        <p className="text-xs text-stone-500">
          Sposta il cursore per intercettare le particelle luminose in caduta.
        </p>
      </div>

      {!isActive ? (
        <div className="py-12 text-center">
          <button
            onClick={startGame}
            id="start-catcher-btn"
            className="px-6 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs sm:text-sm hover:bg-stone-800 transition"
          >
            Avvia Sessione
          </button>
        </div>
      ) : (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          className="relative w-full max-w-lg h-72 bg-stone-100 rounded-xl border border-stone-300 overflow-hidden cursor-crosshair select-none"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute w-4 h-4 rounded-full bg-stone-800 shadow transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            />
          ))}

          <div
            className="absolute bottom-2 -translate-x-1/2 w-24 h-4 rounded-full bg-stone-900 shadow border border-white pointer-events-none"
            style={{ left: `${paddleX}%` }}
          />
        </div>
      )}

      <button
        onClick={() => onAddPoints(20)}
        className="mt-4 px-4 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-xs hover:bg-stone-50 transition"
      >
        Intercetta Punto Rapido (+20 pt)
      </button>
    </div>
  );
}

// ---------------- GAME 2: Sfere in Sospensione ----------------
function PopperGame({ onAddPoints }) {
  const [spheres, setSpheres] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpheres((prev) => {
        if (prev.length >= 8) return prev;
        return [
          ...prev,
          {
            id: Math.random().toString(),
            points: 25,
            x: Math.floor(Math.random() * 80) + 10,
            y: Math.floor(Math.random() * 70) + 15,
            size: Math.floor(Math.random() * 14) + 38,
          }
        ];
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const popSphere = (id, points) => {
    onAddPoints(points);
    setSpheres((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg font-serif font-bold text-stone-900">Sfere in Sospensione</h3>
        <p className="text-xs text-stone-500">
          Seleziona le sfere fluttuanti per registrarne il valore.
        </p>
      </div>

      <div className="relative w-full max-w-lg h-72 bg-stone-100 rounded-xl border border-stone-300 overflow-hidden select-none">
        {spheres.map((s) => (
          <button
            key={s.id}
            data-testid="popper-heart-bubble"
            onClick={() => popSphere(s.id, s.points)}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md border border-stone-300 hover:scale-110 active:scale-95 flex items-center justify-center transition-transform cursor-pointer font-serif text-xs font-semibold text-stone-800"
          >
            {s.points}
          </button>
        ))}
        {spheres.length === 0 && (
          <div className="h-full flex items-center justify-center text-stone-400 text-xs">
            In attesa di nuove sfere...
          </div>
        )}
      </div>

      <button
        onClick={() => onAddPoints(50)}
        className="mt-4 px-4 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-xs hover:bg-stone-50 transition"
      >
        Acquisizione Multipla (+50 pt)
      </button>
    </div>
  );
}

// ---------------- GAME 3: Memoria Visiva ----------------
function MemoryGame({ onAddPoints }) {
  const cardsTemplate = [
    { label: 'Oreo', id: 1 },
    { label: 'Oreo', id: 2 },
    { label: 'Tempo', id: 3 },
    { label: 'Tempo', id: 4 },
    { label: 'Calma', id: 5 },
    { label: 'Calma', id: 6 },
    { label: 'Parole', id: 7 },
    { label: 'Parole', id: 8 },
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
      if (first.label === second.label) {
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
        <h3 className="text-lg font-serif font-bold text-stone-900">Memoria Visiva</h3>
        <p className="text-xs text-stone-500">Abbina le coppie corrispondenti.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-sm w-full">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              data-testid={`memory-card-${idx}`}
              onClick={() => handleCardClick(idx)}
              className={`h-20 rounded-xl font-medium text-xs flex items-center justify-center border transition-all duration-200 ${
                isFlipped
                  ? 'bg-stone-100 border-stone-400 text-stone-900 font-semibold'
                  : 'bg-stone-900 border-stone-800 text-stone-400'
              }`}
            >
              {isFlipped ? card.label : '•'}
            </button>
          );
        })}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Nuova Sequenza
      </button>
    </div>
  );
}

// ---------------- GAME 4: Ritmo e Precisione ----------------
function ClickerGame({ onAddPoints }) {
  const [multiplier, setMultiplier] = useState(1);

  const handleClick = () => {
    const pts = 25 * multiplier;
    onAddPoints(pts);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">Ritmo e Precisione</h3>
      <p className="text-xs text-stone-500 mb-6 max-w-sm">
        Premi sul quadrante per incrementare i punti verso i traguardi segreti.
      </p>

      <button
        id="maxi-heart-clicker"
        onClick={handleClick}
        className="w-32 h-32 rounded-full bg-stone-900 text-white shadow-lg border-4 border-stone-200 flex flex-col items-center justify-center hover:bg-stone-800 active:scale-95 transition cursor-pointer"
      >
        <span className="text-sm font-serif font-bold tracking-widest uppercase">PUNTO</span>
        <span className="text-[10px] text-stone-400 mt-0.5">+{25 * multiplier}</span>
      </button>

      <div className="flex items-center gap-2 mt-6">
        <span className="text-xs text-stone-500">Fattore di moltiplicazione:</span>
        {[1, 2, 5, 10].map((m) => (
          <button
            key={m}
            onClick={() => setMultiplier(m)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              multiplier === m
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            x{m}
          </button>
        ))}
      </div>
    </div>
  );
}
