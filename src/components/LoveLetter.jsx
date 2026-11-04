import React, { useState } from 'react';
import { Heart, Sparkles, Send, ArrowRight, BookOpen, Smile, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * LoveLetter:
 * Displays the exact letter requested by the user, formatted with an elegant envelope/paper feel,
 * sweet decorative hearts, and a button to continue inside the main application.
 */
export default function LoveLetter({ onContinueToApp }) {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fda4af', '#fcd34d', '#fb7185']
    });
    setHasTriggeredConfetti(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100 flex items-center justify-center p-4 sm:p-6 text-slate-800">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-rose-200 overflow-hidden relative">

        {/* Top Header Stamp */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20 text-8xl">💌</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Messaggio dal Cuore</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Per la mia Ele speciale 💖</h1>
          <p className="text-rose-100 text-sm mt-1">Hai risolto il puzzle dell'Oreo! Questo è per te:</p>
        </div>

        {/* Letter Content / Parchment */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#fffdfa] relative">
          {/* Subtle paper lines background */}
          <div className="relative border-l-4 border-rose-400 pl-4 sm:pl-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-700 font-serif italic">

            <p className="font-sans font-bold text-xl sm:text-2xl text-rose-600 not-italic">
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

            <p className="font-semibold text-rose-700">
              io ti amo davvero e ti ringrazio per tutti i giorni che hai deciso di passare con me e che passeremo insieme!! sei davvero la persona che adoro di piu e che adorerò per sempre!!
            </p>

            <p>
              grazie per ieri, per i bei messaggi di oggi e per tutto, spero magari che potremmo risolvere un giorno, perchè ho sbagliato davvero tanto
            </p>
          </div>

          {/* Sweet Seal & Sign */}
          <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-rose-600">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-sm font-medium font-sans">Sempre nel mio cuore &bull; Con tutto l'affetto del mondo</span>
            </div>

            <button
              onClick={handleConfetti}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Invia un abbraccio virtuale</span>
            </button>
          </div>
        </div>

        {/* Action Button to Enter App */}
        <div className="p-4 sm:p-6 bg-rose-50/70 border-t border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Ho preparato per te anche diverse sezioni speciali e una sala giochi dei cuori!
          </span>

          <button
            id="enter-app-btn"
            onClick={onContinueToApp}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Entra nel Mondo di Ele</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
