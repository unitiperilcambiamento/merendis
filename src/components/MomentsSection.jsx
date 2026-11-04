import React, { useState } from 'react';
import { Heart, Sparkles, Smile, Star, Gift, Coffee, Moon, Sun, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MomentsSection() {
  const reasons = [
    {
      title: "Il tuo sorriso quando sei felice",
      desc: "Illumina letteralmente ogni stanza ed è la cosa più bella da vedere al mondo.",
      emoji: "✨"
    },
    {
      title: "I nostri momenti a mangiare insieme",
      desc: "Come quando condividiamo qualcosa di buono e chiacchieriamo spensierati, i ricordi più preziosi.",
      emoji: "🍕"
    },
    {
      title: "I tuoi messaggi dolci",
      desc: "I bei messaggi di oggi e di sempre che mi scaldano il cuore e mi fanno sentire fortunato.",
      emoji: "💌"
    },
    {
      title: "La persona meravigliosa che sei",
      desc: "Sensibile, unica, speciale: sei la persona che adoro di più e che adorerò per sempre.",
      emoji: "💖"
    },
    {
      title: "La tua dolcezza infinita",
      desc: "Anche nei momenti difficili, hai un cuore grande che merita solo il meglio e il massimo rispetto.",
      emoji: "🌸"
    },
    {
      title: "I nostri piccoli riti",
      desc: "Dagli Oreo ai sorrisi improvvisi, ogni secondo trascorso con te ha un valore inestimabile.",
      emoji: "🍪"
    }
  ];

  const compliments = [
    "Ele, hai gli occhi più espressivi e dolci del mondo! ✨",
    "Stare con te fa sembrare qualsiasi giornata normale un momento indimenticabile! 💖",
    "Sei incredibilmente bella quando ridi di gusto! 🌟",
    "Ti amo davvero tantissimo, più di ogni parola che potrò mai scrivere. 💕",
    "Sei la mia persona preferita nell'intero universo. 🪐",
    "Non dimenticare mai quanto vali e quanto sei preziosa per me. 🌹"
  ];

  const [currentCompliment, setCurrentCompliment] = useState(compliments[0]);
  const [redeemedCoupons, setRedeemedCoupons] = useState({});

  const getRandomCompliment = () => {
    const next = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(next);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const coupons = [
    { id: 'oreo', title: 'Cena o Merenda Offerta', desc: 'Con tanto di confezione gigante di Oreo o qualsiasi cosa tu desideri!' },
    { id: 'hug', title: 'Abbraccio Stretto Illimitato', desc: 'Valido ovunque e per tutto il tempo che desideri.' },
    { id: 'listen', title: 'Ascolto & Chiacchierata', desc: 'Ascolto totale senza giudizi, per parlare e risolvere con calma.' },
    { id: 'massage', title: 'Coccole & Relax Senza Limiti', desc: 'Giornata di relax totale e zero stress garantito per la mia Ele.' },
  ];

  const redeemCoupon = (id) => {
    setRedeemedCoupons(prev => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3 uppercase tracking-wider backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Dedicato ad Ele</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Perché sei la persona che adoro di più 💕
          </h2>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Anche quando sbaglio o sono ingenuo, il mio sentimento per te non è mai cambiato. Qui ci sono solo alcuni dei mille motivi per cui sei così speciale.
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-9xl opacity-20 pointer-events-none">
          🌸
        </div>
      </div>

      {/* Generator of compliments */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-md text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <Wand2 className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Generatore di Dolcezze per Ele</h3>
        <p className="text-slate-600 text-sm mb-6">Clicca per ricevere un pensiero speciale pensato solo per te:</p>

        <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-rose-800 font-medium text-base sm:text-lg min-h-[70px] flex items-center justify-center italic">
          "{currentCompliment}"
        </div>

        <button
          onClick={getRandomCompliment}
          type="button"
          className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:from-rose-600 hover:to-pink-600 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Genera un Altro Pensiero Dolce</span>
        </button>
      </div>

      {/* Grid of Reasons */}
      <div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center gap-2">
          <span>Piccole Grandi Cose Che Amo Di Te</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition group"
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h4 className="font-bold text-slate-800 mb-1 text-base group-hover:text-rose-600 transition">
                {item.title}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Love Coupons Section */}
      <div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
          <span>Buoni d'Amore per Ele (Sempre Validi!)</span>
          <Gift className="w-5 h-5 text-rose-500" />
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          Puoi riscattarli quando vuoi, non hanno scadenza:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons.map((c) => {
            const isClaimed = redeemedCoupons[c.id];
            return (
              <div
                key={c.id}
                className={`p-5 rounded-2xl border-2 transition relative flex flex-col justify-between ${
                  isClaimed
                    ? 'bg-rose-50/50 border-rose-300 opacity-90'
                    : 'bg-white border-dashed border-rose-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800 text-base">{c.title}</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      100% Amore
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">{c.desc}</p>
                </div>

                <button
                  onClick={() => redeemCoupon(c.id)}
                  disabled={isClaimed}
                  type="button"
                  className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isClaimed
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : 'bg-rose-500 text-white hover:bg-rose-600 shadow'
                  }`}
                >
                  {isClaimed ? (
                    <>
                      <span>✓ Riscattato con Successo!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Riscatta Questo Buono</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
