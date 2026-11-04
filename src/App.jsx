import React, { useState } from 'react';
import OreoPuzzle from './components/OreoPuzzle';
import LoveLetter from './components/LoveLetter';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import HeartArcade from './components/HeartArcade';
import MomentsSection from './components/MomentsSection';
import MusicRelaxSection from './components/MusicRelaxSection';
import { Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [stage, setStage] = useState('lock');
  const [activeTab, setActiveTab] = useState('home');
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleOreoUnlocked = () => {
    setStage('letter');
  };

  const handleContinueToApp = () => {
    setStage('app');
  };

  const handleSecretTriggered = () => {
    setShowSecretModal(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#be123c', '#9f1239', '#fb7185']
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 text-stone-900">
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
          <footer className="mt-auto py-6 text-center text-xs text-stone-500 border-t border-stone-200 bg-white">
            <p className="font-sans">
              Dedicato ad Ele &bull; Per sempre
            </p>
          </footer>
        </div>
      )}

      {/* POPUP MODAL: LETTER (Accessible anytime after unlock) */}
      {showLetterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8">
            <button
              onClick={() => setShowLetterModal(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center shadow transition"
              aria-label="Chiudi lettera"
            >
              <X className="w-4 h-4" />
            </button>
            <LoveLetter onContinueToApp={() => setShowLetterModal(false)} />
          </div>
        </div>
      )}

      {/* POPUP MODAL: 2212 SECRET "TI AMO" (EASTER EGG CON CUORE) */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-2xl p-8 border border-stone-200 shadow-2xl text-center overflow-hidden">

            <button
              id="close-secret-modal"
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Easter Egg Heart appears here exclusively */}
            <div className="w-16 h-16 mx-auto my-3 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200">
                <Heart className="w-8 h-8 fill-rose-600" />
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold tracking-wider mb-2">
              Traguardo 2212 Raggiunto
            </div>

            <h3 className="text-4xl font-serif font-bold text-rose-700 tracking-tight my-3">
              ti amo
            </h3>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 my-4 text-stone-700 text-sm leading-relaxed font-sans">
              <p className="font-semibold text-stone-900 mb-1">
                Ele, hai sbloccato il messaggio segreto.
              </p>
              <p>
                Il numero 2212 porta con sé tutto quello che provo: sei la persona che adoro di più e che adorerò per sempre.
              </p>
            </div>

            <button
              onClick={() => setShowSecretModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition"
            >
              Continua
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
