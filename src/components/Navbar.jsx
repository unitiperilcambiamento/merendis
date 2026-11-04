import React from 'react';
import { Heart, Sparkles, BookHeart, Gamepad2, Music, Coffee } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLetter }) {
  const tabs = [
    { id: 'home', label: 'Il Nostro Posto', icon: Heart },
    { id: 'arcade', label: 'Sala Giochi dei Cuori', icon: Gamepad2, badge: 'Speciale 2212' },
    { id: 'moments', label: 'Cose Che Adoro Di Te', icon: Sparkles },
    { id: 'music', label: 'Carillon & Relax', icon: Music },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-800 tracking-tight flex items-center gap-1.5">
                Ele's Special World <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-semibold">Per Te 💖</span>
              </span>
              <p className="text-[11px] text-slate-500 -mt-1">Solo per i tuoi occhi</p>
            </div>
          </div>

          <button
            onClick={onOpenLetter}
            className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold"
          >
            <BookHeart className="w-3.5 h-3.5" />
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
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                    isActive ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={onOpenLetter}
            title="Rileggi la lettera d'amore"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 text-rose-600 text-xs sm:text-sm font-semibold hover:bg-rose-50 transition"
          >
            <BookHeart className="w-4 h-4" />
            <span>Rileggi Lettera</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
