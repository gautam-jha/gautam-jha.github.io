'use client';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Blogs } from './components/Blogs';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 selection:bg-cyan-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Blogs />
      </main>

      <Footer />
    </div>
  );
}
