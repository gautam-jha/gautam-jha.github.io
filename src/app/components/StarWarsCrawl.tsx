import React, { useEffect, useRef, useState } from 'react';
import { SUMMARY } from '../data';
import { Volume2, VolumeX, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StarWarsCrawl({ onClose }: { onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const paragraphs = SUMMARY.split('\n\n');

  useEffect(() => {
    // Attempt to auto-play audio (browsers may block this without user interaction, 
    // so we handle it with a play button as fallback, but try first)
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => setIsPlaying(false));
    }

    // "A long time ago..." fades out after 4 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden font-sans">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Using a generic placeholder for copyright safety, though users often provide a custom one
        loop
      />

      {/* Starfield background */}
      <div className="absolute inset-0 bg-black">
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-365f375c3f91?auto=format&fit=crop&q=80')] bg-repeat"
          style={{ backgroundSize: '100% 100%' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80')] bg-repeat opacity-40 mix-blend-screen"
          style={{ backgroundSize: '120% 120%' }}
          animate={{
            x: ['0%', '-10%', '0%'],
            y: ['0%', '-5%', '0%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80')] bg-repeat opacity-30 mix-blend-screen"
          style={{ backgroundSize: '80% 80%' }}
          animate={{
            x: ['0%', '5%', '0%'],
            y: ['0%', '10%', '0%']
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 z-50 flex gap-4">
        <button
          onClick={toggleAudio}
          className="p-3 bg-slate-900/50 hover:bg-slate-800 text-yellow-400 border border-yellow-500/30 rounded-full backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <button
          onClick={onClose}
          className="p-3 bg-slate-900/50 hover:bg-rose-900/50 text-rose-500 border border-rose-500/30 rounded-full backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]"
          title="Exit Holocron"
        >
          <XCircle size={24} />
        </button>
      </div>

      {/* Intro Text */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center z-40"
          >
            <p className="text-cyan-400 text-2xl md:text-4xl tracking-wide font-light">
              A long time ago in a galaxy far, far away....
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Star Wars Logo (Fades in, shrinks, and disappears) */}
      {!showIntro && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
          <motion.div
            initial={{ scale: 3, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 font-black tracking-tighter" style={{ fontSize: '15vw', lineHeight: '0.8', WebkitTextStroke: '2px #b48600' }}>
              ORIGIN<br/>STORY
            </h1>
          </motion.div>
        </div>
      )}

      {/* Crawling Text */}
      {!showIntro && (
        <div 
          className="absolute inset-0 flex justify-center pointer-events-none mt-[50vh]"
          style={{ perspective: '800px' }}
        >
          <motion.div
            initial={{ rotateX: 25, y: '50%', z: 0 }}
            animate={{ rotateX: 25, y: '-300%', z: -1500 }}
            transition={{ duration: 60, ease: "linear" }}
            className="w-full max-w-4xl text-center text-yellow-400 font-bold px-6 md:px-12"
            style={{ transformOrigin: "50% 100%" }}
          >
            <h2 className="text-3xl md:text-5xl mb-12 uppercase tracking-widest">Episode I<br/>The Architect Menace</h2>
            
            <div className="text-xl md:text-3xl leading-relaxed text-justify space-y-12 tracking-wide">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
