import React from 'react';
import { Compass, Gamepad2, Feather, Music, Mail } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLetter }) {
  const tabs = [
    { id: 'home', label: 'Inizio', icon: Compass },
    { id: 'arcade', label: 'Sala Giochi', icon: Gamepad2, badge: 'Punteggio 2212' },
    { id: 'moments', label: 'Pensieri e Dediche', icon: Feather },
    { id: 'music', label: 'Melodia e Calma', icon: Music },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white text-sm font-serif font-bold">
              E
            </div>
            <div>
              <span className="font-semibold text-base text-stone-900 tracking-tight">
                Spazio per Ele
              </span>
              <p className="text-[11px] text-stone-500 -mt-0.5">Spazio intimo e dedicato</p>
            </div>
          </div>

          <button
            onClick={onOpenLetter}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Lettera</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ml-0.5 ${
                    isActive ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={onOpenLetter}
            title="Rileggi la lettera"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 text-xs sm:text-sm font-medium hover:bg-stone-50 transition"
          >
            <Mail className="w-3.5 h-3.5 text-stone-500" />
            <span>Rileggi Lettera</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
