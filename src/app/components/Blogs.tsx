'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar, BookOpen, Heart, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
  tag_list: string[];
  cover_image: string | null;
}

export function Blogs() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dev.to/api/articles?username=gautamjha')
      .then(res => res.json())
      .then(data => {
        setArticles(data.slice(0, 6)); // Display latest 6 blogs
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-12">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Writings</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700" />
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8" id="blogs">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Writings</span>
        </h2>
        <a 
          href="https://dev.to/gautamjha" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          View all on Dev.to
          <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-start justify-between rounded-2xl bg-white dark:bg-slate-900/50 p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="w-full">
              {article.cover_image && (
                <div className="w-full h-40 mb-6 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              
              <div className="flex items-center gap-x-4 text-xs mb-4">
                <time dateTime={article.published_at} className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar size={14} />
                  {format(new Date(article.published_at), 'MMM d, yyyy')}
                </time>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <BookOpen size={14} />
                  {article.reading_time_minutes} min read
                </span>
              </div>
              
              <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {article.description}
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-between w-full">
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Heart size={16} className="text-rose-500" />
                  <span>{article.public_reactions_count}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare size={16} className="text-cyan-500" />
                  <span>{article.comments_count}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-end">
                {article.tag_list.slice(0, 2).map(tag => (
                  <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
