import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, AlertCircle, ArrowDown, Frown, Sparkles, Zap, Flame } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      badge: 'Task Paralysis',
      title: 'Vague goals lead to zero progress',
      description: 'You write "Build portfolio" on your list. But because it feels too large, you procrastinate. Staring at an empty list or giant task blocks causes cognitive friction.',
      solution: 'AI breaks big ambitions into 5-minute executable chunks automatically.',
      icon: Frown,
      solIcon: Sparkles,
      color: 'rose'
    },
    {
      badge: 'Context Switching',
      title: 'Scattered tools break your focus',
      description: 'Your tasks are in one app, your Pomodoro timer is a browser tab, and your schedule is in Google Calendar. Moving between them breaks your concentration.',
      solution: 'A single, unified workspace with built-in sprint timers and calendar layouts.',
      icon: AlertCircle,
      solIcon: Zap,
      color: 'amber'
    },
    {
      badge: 'Invisible Momentum',
      title: 'Working hard without feeling progress',
      description: 'You check off tasks all day but finish feeling like you accomplished nothing. Without visual history or streak tracking, motivation slowly fizzles out.',
      solution: 'Interactive productivity metrics and daily streaks to gamify your focus.',
      icon: HelpCircle,
      solIcon: Flame,
      color: 'indigo'
    }
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-500"
          >
            Why traditional lists fail
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3 mb-5"
          >
            Productivity isn't about tracking tasks.<br />
            It's about removing friction.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Most task managers just act as digital spreadsheets. They help you list work, but do nothing to help you actually execute it.
          </motion.p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            const SolIcon = prob.solIcon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-cardDark/40 p-6 md:p-8 hover:border-slate-300 dark:hover:border-slate-700/80 transition-colors"
              >
                {/* Friction Card part */}
                <div className="flex-1 flex flex-col items-start mb-6 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400">
                      {prob.badge}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2.5 mb-3">
                    <Icon className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-base text-slate-850 dark:text-slate-100 leading-tight">
                      {prob.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                {/* Solution Card part */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5">
                    <SolIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      How we fix it
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-relaxed">
                      {prob.solution}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
