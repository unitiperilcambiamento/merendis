import React, { useState } from 'react';
import { Feather, RefreshCw, Check } from 'lucide-react';

export default function MomentsSection() {
  const thoughts = [
    {
      title: "Il tuo sorriso autentico",
      desc: "Rende speciale qualsiasi ambiente ed è una delle cose più sincere e belle da vedere."
    },
    {
      title: "I momenti semplici a tavola insieme",
      desc: "Come quando ci fermiamo a mangiare qualcosa insieme con leggerezza, tra i ricordi più autentici."
    },
    {
      title: "I tuoi messaggi",
      desc: "I bei messaggi ricevuti che custodisco con grande cura e che hanno un valore profondo."
    },
    {
      title: "La persona che sei",
      desc: "Sensibile, intelligente e unica: la persona che adoro di più e che adorerò per sempre."
    },
    {
      title: "La delicatezza d'animo",
      desc: "La tua capacità di comprendere e guardare le cose con sensibilità merita solo rispetto e cura."
    },
    {
      title: "I piccoli riferimenti condivisi",
      desc: "Dai biscotti Oreo alle nostre conversazioni, ogni singolo giorno trascorso insieme ha un significato vero."
    }
  ];

  const reflections = [
    "Ele, hai uno sguardo limpido e profondo.",
    "Il tempo trascorso insieme è sempre stato un momento di valore sincero.",
    "Sei una persona meravigliosa e non smetterò mai di ribadirtelo.",
    "Ti amo davvero e ti ringrazio per tutto ciò che hai scelto di condividere.",
    "La tua presenza ha sempre fatto una differenza reale.",
    "Custodisco il rispetto più profondo per quello che sei."
  ];

  const [currentReflection, setCurrentReflection] = useState(reflections[0]);
  const [claimedItems, setClaimedItems] = useState({});

  const getNextReflection = () => {
    const next = reflections[Math.floor(Math.random() * reflections.length)];
    setCurrentReflection(next);
  };

  const promises = [
    { id: 'talk', title: 'Dialogo & Ascolto', desc: 'Tempo dedicato ad ascoltarti con calma, attenzione e totale trasparenza.' },
    { id: 'meal', title: 'Pasto Insieme', desc: 'Un momento per mangiare qualcosa insieme in serenità, come ai bei tempi.' },
    { id: 'patience', title: 'Pazienza & Maturità', desc: 'L\'impegno a non ripetere gli errori del passato e a dimostrare vera maturità.' },
    { id: 'support', title: 'Presenza Costante', desc: 'Esserci sempre per qualsiasi cosa tu abbia bisogno, nel rispetto dei tuoi tempi.' }
  ];

  const claimPromise = (id) => {
    setClaimedItems(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header Banner */}
      <div className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-stone-800">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            Dedicato ad Ele
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight mt-1 mb-2 text-stone-100">
            Ciò che custodisco con rispetto
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Anche quando ho agito con ingenuità o immaturità, ciò che provo e la considerazione che ho di te non sono mai cambiate. Qui ci sono riflessioni sincere su di noi.
          </p>
        </div>
      </div>

      {/* Thought Generator */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-10 h-10 mx-auto rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
          <Feather className="w-5 h-5 text-stone-700" />
        </div>
        <h3 className="text-lg font-semibold text-stone-900 mb-1">Un pensiero per Ele</h3>
        <p className="text-stone-500 text-xs sm:text-sm mb-6">Un promemoria sulla persona meravigliosa che sei:</p>

        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-stone-800 font-serif text-base sm:text-lg min-h-[64px] flex items-center justify-center">
          "{currentReflection}"
        </div>

        <button
          onClick={getNextReflection}
          type="button"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-stone-900 text-white font-medium text-xs sm:text-sm hover:bg-stone-800 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Nuovo Pensiero</span>
        </button>
      </div>

      {/* Grid of Thoughts */}
      <div>
        <h3 className="text-lg font-bold text-stone-900 mb-4 font-serif">
          Aspetti che adoro di te
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {thoughts.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:border-stone-400 transition"
            >
              <h4 className="font-semibold text-stone-900 mb-1.5 text-sm sm:text-base">
                {item.title}
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitments Section */}
      <div>
        <h3 className="text-lg font-bold text-stone-900 mb-1 font-serif">
          Impegni e Promesse
        </h3>
        <p className="text-stone-500 text-xs sm:text-sm mb-4">
          Gesti concreti a tua disposizione quando vorrai:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {promises.map((p) => {
            const isClaimed = claimedItems[p.id];
            return (
              <div
                key={p.id}
                className="p-5 rounded-xl border border-stone-200 bg-white shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm sm:text-base mb-1">{p.title}</h4>
                  <p className="text-stone-600 text-xs sm:text-sm mb-4 leading-relaxed">{p.desc}</p>
                </div>

                <button
                  onClick={() => claimPromise(p.id)}
                  disabled={isClaimed}
                  type="button"
                  className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                    isClaimed
                      ? 'bg-stone-100 text-stone-500 cursor-default'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {isClaimed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Confermato</span>
                    </>
                  ) : (
                    <span>Seleziona questo impegno</span>
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
