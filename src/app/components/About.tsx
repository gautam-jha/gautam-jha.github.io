'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SUMMARY } from '../data';
import { ParticleImage } from './ParticleImage';
import { StarWarsCrawl } from './StarWarsCrawl';
import { Play } from 'lucide-react';

// Figma asset - will be available at runtime in Figma environment
// For public builds, provide a placeholder or add your own image
let profileImage: string | null = '/gautam-jha.jpg';
// try {
//   profileImage = require('figma:asset/0c9a7a93d970391fcd24648e8be078080ca043b5.png').default || null;
// } catch (e) {
//   profileImage = null;
// }

export function About() {
  const [showStarWars, setShowStarWars] = useState(false);
  const paragraphs = SUMMARY.split('\n\n');
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Origin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Story</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
          </div>
          <button
            onClick={() => setShowStarWars(true)}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 rounded-full hover:bg-yellow-500/20 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
          >
            <Play size={16} fill="currentColor" />
            Play Holographic Intro
          </button>
        </motion.div>

        {showStarWars && <StarWarsCrawl onClose={() => setShowStarWars(false)} />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex justify-center [perspective:1000px]"
          >
            <motion.div 
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative group w-full max-w-sm"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-25 group-hover:opacity-60 blur-xl transition duration-500" style={{ transform: "translateZ(-50px)" }}></div>
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 border-2 border-white/10" style={{ transform: "translateZ(50px)" }}>
                  <ParticleImage src={profileImage || '/gautam-jha.jpg'} />
                
                {/* Simulated Glass/Glare overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30" />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 prose prose-slate dark:prose-invert prose-lg"
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
