import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ParticleNetwork } from './ParticleNetwork';
import { FileText, Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { CanvasGame } from './CanvasGame';

const greetings = [
  "Konnichiwa", 
  "Hello", 
  "Hola", 
  "Bonjour", 
  "Namaste", 
  "Ciao", 
  "Ni Hao",
  "Hallo",
  "Anyoung"
];

function TypewriterGreeting() {
  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const i = loopNum % greetings.length;
    const fullText = greetings[i];

    let timerId: NodeJS.Timeout;

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      } else {
        timerId = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
        }, 60);
      }
    } else {
      if (text === fullText) {
        timerId = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timerId = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timerId);
  }, [text, isDeleting, loopNum]);

  return (
    <span className="inline-block min-w-[3ch] text-left">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[1em] bg-cyan-500 ml-1 translate-y-[0.1em]"
      />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16" id="home">
      {/* Dynamic Background */}
      <ParticleNetwork />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-slate-950/50 dark:to-slate-950 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-medium text-sm mb-6 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            ☕ Constantly refactoring my life
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            <TypewriterGreeting /> <motion.span 
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
              className="inline-block origin-[70%_70%] cursor-default"
            >
              🙏
            </motion.span>
            <br />
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Gautam Jha</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0"
          >
            Full-Stack Developer | <span className="text-indigo-600 dark:text-indigo-400">Software Architect</span> 🧑‍💻
          </motion.p>
          
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 border-l-4 border-cyan-500 pl-4 text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto lg:mx-0"
          >
            "The greatest teacher, Failure is" ~ Yoda
          </motion.blockquote>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a 
              href="mailto:gotham@outlook.in"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
            >
              <Mail size={18} />
              Get in touch
            </a>
            <a 
              href="https://rxresu.me/gautamjha.mailbox/gautam-jha-sse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm group"
            >
              <FileText size={18} className="text-cyan-600 dark:text-cyan-400" />
              Download C.V.
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-50" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center justify-center lg:justify-start gap-5 text-slate-500 dark:text-slate-400"
          >
            <a href="https://github.com/gautam-jha" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/gautam-jha" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <Linkedin size={24} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 w-full lg:w-auto mt-12 lg:mt-0"
        >
          <CanvasGame />
        </motion.div>
      </div>
    </section>
  );
}
