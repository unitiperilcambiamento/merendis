import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * LoveLetter:
 * Displays the exact letter requested by the user, presented in a clean, refined,
 * and intimate editorial letter format without excessive emojis or symbols.
 */
export default function LoveLetter({ onContinueToApp }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-rose-50/30 to-stone-200 flex items-center justify-center p-4 sm:p-6 text-slate-800">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden relative">

        {/* Top Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 p-6 sm:p-8 text-white text-center relative">
          <span className="text-xs uppercase tracking-widest text-rose-200 font-semibold">
            Messaggio per Ele
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif mt-1 font-normal tracking-wide">
            Per Ele
          </h1>
        </div>

        {/* Letter Content / Parchment */}
        <div className="p-6 sm:p-10 space-y-5 bg-[#faf8f5] text-slate-800 font-serif leading-relaxed text-base sm:text-lg">
          <div className="border-l-2 border-rose-300 pl-5 sm:pl-7 space-y-4">

            <p className="font-sans font-bold text-xl text-rose-900 tracking-tight not-italic">
              ciaooo ele!!
            </p>

            <p>
              non so se ci vedremo oggi, ma non preoccuparti nel caso, già tanto che ci hai pensato, sei una persona meravigliosa, e ti voglio tanto bene (in realtà più che solo bene).
            </p>

            <p>
              sono contento che forse oggi potremmo mangiare qualcosina insieme come i bei tempi, prima che io sbagliassi tutto, sopratutto perche sono stato cosi immaturo, non ci ho pensato davvero quel pomeriggio e capisco in realtà cosa tu possa pensare di me.
            </p>

            <p>
              potresti pensare che magari non ci tenevo cosi tanto, oppure che mi sono sfogato veramente ma adesso sto negando tutto, in realtà purtroppo non è nessuna delle due, ma sono solo stato ingenuo io, davvero davvero.
            </p>

            <p className="font-semibold text-rose-950">
              io ti amo davvero e ti ringrazio per tutti i giorni che hai deciso di passare con me e che passeremo insieme!! sei davvero la persona che adoro di piu e che adorerò per sempre!!
            </p>

            <p>
              grazie per ieri, per i bei messaggi di oggi e per tutto, spero magari che potremmo risolvere un giorno, perchè ho sbagliato davvero tanto
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 text-sm font-sans text-stone-500">
            Con affetto sincero e profondo rispetto.
          </div>
        </div>

        {/* Action Button to Enter App */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-500 font-sans text-center sm:text-left">
            Prosegui per accedere a tutte le sezioni dell'applicazione.
          </span>

          <button
            id="enter-app-btn"
            onClick={onContinueToApp}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-all font-sans"
          >
            <span>Entra nell'Applicazione</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
