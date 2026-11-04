import React from 'react';
import { Mail, Gamepad2, ArrowRight, Disc3, Compass, Sparkle } from 'lucide-react';

export default function HomeSection({ onOpenLetter, onGoToArcade }) {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Welcome */}
      <div className="relative rounded-2xl bg-stone-900 p-8 sm:p-12 text-white shadow-xl overflow-hidden border border-stone-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800/80 text-xs font-medium text-stone-300 tracking-wide mb-4 border border-stone-700">
            <Compass className="w-3.5 h-3.5 text-stone-400" />
            <span>Spazio Dedicato ad Ele</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight leading-tight mb-4 text-stone-100">
            Un luogo pensato per te
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
            Questa applicazione è stata creata per raccogliere pensieri sinceri e momenti dedicati a te. Ora che hai risolto il cerchio dell'Oreo, puoi rileggere la lettera in qualsiasi momento, rilassarti con la musica o esplorare la sala giochi.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenLetter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-stone-900 font-medium text-sm shadow hover:bg-stone-100 transition active:scale-95"
            >
              <Mail className="w-4 h-4 text-stone-700" />
              <span>Rileggi la Lettera</span>
            </button>

            <button
              onClick={onGoToArcade}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 font-medium text-sm hover:bg-stone-750 transition active:scale-95"
            >
              <Gamepad2 className="w-4 h-4 text-stone-400" />
              <span>Sala Giochi (Traguardo 2212)</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
              <Disc3 className="w-5 h-5 text-stone-700" />
            </div>
            <h3 className="text-base font-semibold text-stone-900 mb-1">Il Cerchio dell'Oreo</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Il lucchetto circolare è stato completato con successo. Rappresenta la chiave simbolica di questo spazio personale.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
              <Gamepad2 className="w-5 h-5 text-stone-700" />
            </div>
            <h3 className="text-base font-semibold text-stone-900 mb-1">Sala Giochi</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Quattro mini-giochi con dinamiche di concentrazione e riflessi, con punteggi chiave ed easter egg dedicati.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
              <Sparkle className="w-5 h-5 text-stone-700" />
            </div>
            <h3 className="text-base font-semibold text-stone-900 mb-1">Pensieri e Riconoscenza</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Ogni giorno condiviso con te è prezioso. La persona che adoro di più e che adorerò sempre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
