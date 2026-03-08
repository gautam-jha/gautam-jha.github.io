import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE, EDUCATION } from '../data';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

export function Experience() {
  return (
    <section className="py-24" id="experience">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Journey</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-10 text-slate-900 dark:text-white">
              <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold">Jedi Path (Experience)</h3>
            </div>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={idx} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-lg">{exp.role}</span>
                      <span className="text-slate-900 dark:text-white font-medium">{exp.company}</span>
                      <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-10 text-slate-900 dark:text-white">
              <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold">Jedi Academy (Education)</h3>
            </div>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
              {EDUCATION.map((edu, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={idx} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-1 mb-2">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">{edu.degree}</span>
                      <span className="text-slate-900 dark:text-white font-medium">{edu.school}</span>
                      <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2">
                        <Calendar size={14} />
                        {edu.period}
                      </span>
                      {edu.desc && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {edu.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
