import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart, Play, Pause } from 'lucide-react';

/**
 * MusicRelaxSection:
 * Plays sweet, soothing carillon / lofi synth notes using the native Web Audio API.
 * No external audio files needed, guaranteed zero 404s and works offline smoothly.
 */
export default function MusicRelaxSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Sweet gentle lullaby / chime melody notes (frequencies in Hz)
  const notes = [
    261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 329.63,
    293.66, 349.23, 440.00, 392.00, 329.63, 261.63, 392.00,
    349.23, 329.63, 293.66, 261.63
  ];

  const playTone = (freq, duration = 1.2) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Sweet bell/chime envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const startMusic = () => {
    setIsPlaying(true);
    let noteIndex = 0;
    timerRef.current = setInterval(() => {
      playTone(notes[noteIndex % notes.length]);
      noteIndex++;
    }, 700);
  };

  const stopMusic = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl text-center">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-lg mb-4">
          <Music className={`w-8 h-8 ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Carillon & Relax per Ele</h2>
        <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
          Una dolce melodia generata in tempo reale come un carillon romantico. Ascoltala ogni volta che vuoi rilassarti e sentirti coccolata.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={isPlaying ? stopMusic : startMusic}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
              isPlaying
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pausa Melodia</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Ascolta Carillon Dolce</span>
              </>
            )}
          </button>
        </div>

        {/* Music visualizer animation if playing */}
        <div className="flex items-center justify-center gap-1.5 mt-8 h-12">
          {[40, 70, 30, 90, 60, 100, 50, 80, 45, 65].map((height, idx) => (
            <div
              key={idx}
              className={`w-2 rounded-full bg-rose-400 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${height}%` : '20%',
                animationDelay: `${idx * 0.1}s`
              }}
            />
          ))}
        </div>

        <p className="text-xs text-rose-500 mt-4 font-medium flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>Pensato con tutto il mio amore per te</span>
        </p>
      </div>
    </div>
  );
}
