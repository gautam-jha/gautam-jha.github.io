import React from 'react';
import { motion } from 'motion/react';
import { SKILLS } from '../data';
import { Code2, Database, LayoutTemplate, PenTool, Server, Settings, Cpu, Shield, Cloud } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  ARCHITECTURE: <Cpu className="text-rose-500" size={24} />,
  LANGUAGES: <Code2 className="text-cyan-500" size={24} />,
  FRAMEWORKS: <LayoutTemplate className="text-indigo-500" size={24} />,
  BACKEND_CLOUD: <Cloud className="text-emerald-500" size={24} />,
  DATABASES: <Database className="text-amber-500" size={24} />,
  TOOLS_LEADERSHIP: <Shield className="text-purple-500" size={24} />,
};

export function Skills() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50" id="skills">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Superpowers</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(SKILLS).map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-300">
                  {categoryIcons[category] || <Code2 className="text-slate-500" size={24} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                  {category.toLowerCase()}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
