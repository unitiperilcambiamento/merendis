import React from 'react';
import { Heart, Sparkles, BookHeart, Gamepad2, ArrowRight } from 'lucide-react';

export default function HomeSection({ onOpenLetter, onGoToArcade }) {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Welcome */}
      <div className="relative rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-white animate-ping" />
            <span>Benvenuta nel tuo posto speciale</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Ciao Ele meravigliosa! 💕
          </h1>
          <p className="text-rose-100 text-base sm:text-lg leading-relaxed mb-6 font-light">
            Questa applicazione è stata creata solo ed esclusivamente per te. Dopo aver risolto il puzzle dell'Oreo, qui puoi esplorare le diverse sezioni, risentire la melodia del carillon e divertirti con i tanti giochini dei cuori!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenLetter}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-rose-600 font-bold text-sm shadow-lg hover:bg-rose-50 transition active:scale-95"
            >
              <BookHeart className="w-4 h-4" />
              <span>Rileggi la Lettera per Te</span>
            </button>

            <button
              onClick={onGoToArcade}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-700/60 backdrop-blur-sm border border-white/20 text-white font-bold text-sm shadow-lg hover:bg-rose-700 transition active:scale-95"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Vai alla Sala Giochi (Segreto 2212)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient emojis */}
        <div className="absolute -right-8 -bottom-10 text-[140px] opacity-15 pointer-events-none select-none">
          🍪
        </div>
      </div>

      {/* Highlights / Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              🍪
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">L'Oreo Risolto</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Hai completato il cerchio del biscotto! Era la chiave d'accesso al tuo posto protetto e sicuro.
            </p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
              🎮
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Giochini con i Cuori</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Tanti mini-giochi con tipi di cuori differenti: cuori dorati, cuori fragola, cuori arcobaleno... e un segreto a 2212 punti!
            </p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              ✨
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">La Persona Più Speciale</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Tutti i giorni con te sono un dono. Ricordati sempre quanto sei adorata e quanto bene ti voglio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
