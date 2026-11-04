import React, { useState } from 'react';
import OreoPuzzle from './components/OreoPuzzle';
import LoveLetter from './components/LoveLetter';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import HeartArcade from './components/HeartArcade';
import MomentsSection from './components/MomentsSection';
import MusicRelaxSection from './components/MusicRelaxSection';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // App navigation and unlocked state
  // Stage: 'lock' (Oreo puzzle) | 'letter' (First letter reading) | 'app' (Main app unlocked)
  const [stage, setStage] = useState('lock');
  const [activeTab, setActiveTab] = useState('home');
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);

  // When Oreo is solved:
  const handleOreoUnlocked = () => {
    setStage('letter');
  };

  // When continuing from first letter reading:
  const handleContinueToApp = () => {
    setStage('app');
  };

  // Triggering the 2212 points secret
  const handleSecretTriggered = () => {
    setShowSecretModal(true);
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ffccd5']
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* 1. LOCK STAGE: OREO PUZZLE */}
      {stage === 'lock' && (
        <OreoPuzzle onUnlock={handleOreoUnlocked} />
      )}

      {/* 2. LETTER STAGE: FIRST REVEAL */}
      {stage === 'letter' && (
        <LoveLetter onContinueToApp={handleContinueToApp} />
      )}

      {/* 3. MAIN UNLOCKED APP */}
      {stage === 'app' && (
        <div className="min-h-screen flex flex-col">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenLetter={() => setShowLetterModal(true)}
          />

          <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
            {activeTab === 'home' && (
              <HomeSection
                onOpenLetter={() => setShowLetterModal(true)}
                onGoToArcade={() => setActiveTab('arcade')}
              />
            )}

            {activeTab === 'arcade' && (
              <HeartArcade onSecretTriggered={handleSecretTriggered} />
            )}

            {activeTab === 'moments' && (
              <MomentsSection />
            )}

            {activeTab === 'music' && (
              <MusicRelaxSection />
            )}
          </main>

          {/* Footer */}
          <footer className="mt-auto py-6 text-center text-xs text-rose-500/80 border-t border-rose-200/60 bg-white/40">
            <p className="flex items-center justify-center gap-1.5 font-medium">
              Creato con tutto il cuore per Ele <Heart className="w-3.5 h-3.5 fill-rose-500 inline" /> &bull; Per sempre
            </p>
          </footer>
        </div>
      )}

      {/* POPUP MODAL: LETTER (Accessible anytime after unlock) */}
      {showLetterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8">
            <button
              onClick={() => setShowLetterModal(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow transition"
              aria-label="Chiudi lettera"
            >
              <X className="w-5 h-5" />
            </button>
            <LoveLetter onContinueToApp={() => setShowLetterModal(false)} />
          </div>
        </div>
      )}

      {/* POPUP MODAL: 2212 SECRET "TI AMO" */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 bg-rose-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative max-w-md w-full bg-gradient-to-b from-rose-50 via-white to-pink-50 rounded-3xl p-8 border-4 border-rose-300 shadow-2xl text-center overflow-hidden">

            {/* Close button */}
            <button
              id="close-secret-modal"
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Hearts Header */}
            <div className="relative w-24 h-24 mx-auto my-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-rose-400 rounded-full blur-xl opacity-50 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xl">
                <Heart className="w-10 h-10 fill-white animate-bounce" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Traguardo 2212 Punti Sbloccato</span>
            </div>

            <h3 className="text-4xl sm:text-5xl font-black text-rose-600 tracking-tight my-3 drop-shadow-sm">
              ti amo
            </h3>

            <div className="p-4 rounded-2xl bg-white/80 border border-rose-200 shadow-inner my-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-rose-700 mb-1">
                Ele, hai trovato il segreto nascosto! 💖
              </p>
              <p>
                Il numero 2212 porta con sé tutto quello che provo: sei la persona che adoro di più e che adorerò per sempre. Non smetterò mai di dirti quanto ti amo!
              </p>
            </div>

            <button
              onClick={() => {
                setShowSecretModal(false);
                confetti({ particleCount: 70, spread: 60 });
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition"
            >
              Ti amo anche io &bull; Continua a Giocare 💕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
