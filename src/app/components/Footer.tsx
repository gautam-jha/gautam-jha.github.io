import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
            Gautam.
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
            Built in a galaxy far, far away <span className="text-rose-500">❤️</span>
            <br />
            © {year} Gautam Jha. All rights reserved. May the Force be with you.
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a href="https://github.com/gautam-jha" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/gautam-jha" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Linkedin size={20} />
          </a>
          <a href="mailto:gotham@outlook.in" className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
