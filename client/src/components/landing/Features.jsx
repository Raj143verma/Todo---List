import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Timer, Flame, BarChart3, CheckCircle } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Task Breakdown',
      benefit: 'Turn overwhelming goals into executable plans.',
      description: 'Describe your goal (e.g. "Build portfolio site"). Our AI lists 5-10 subtasks with time estimates, converting vague items into direct progress.',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      icon: Compass,
      title: 'Smart Focus Recommendations',
      benefit: 'Know exactly what task to work on next.',
      description: 'Get tailored recommendations based on deadlines, priorities, and your historical completion patterns. Less time deciding, more time doing.',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Timer,
      title: 'Built-in Pomodoro Timer',
      benefit: 'Sustain deep focus without burnout.',
      description: 'Run focused 25-minute sprints tied directly to your active tasks. Track actual time spent and trigger rest intervals to protect your energy.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
      textColor: 'text-cyan-650 dark:text-cyan-400'
    },
    {
      icon: Flame,
      title: 'Streak & Momentum Tracking',
      benefit: 'Build habits that stick through visual streaks.',
      description: 'Visualize your daily productivity chain. Watch your focus streak burn brighter as you check off items, building positive inertia day by day.',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      textColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      benefit: 'Understand your work habits with real data.',
      description: 'Visualize completion ratios, focus duration, and category breakdowns. Gain insights on when and how you work best to adjust your schedule.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      textColor: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[30%] right-[-10%] w-[35%] h-[35%] rounded-full bg-violet-200/20 dark:bg-purple-950/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-500"
          >
            Product Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3 mb-5"
          >
            Everything you need to stay productive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-650 dark:text-slate-350 text-sm sm:text-base leading-relaxed"
          >
            We designed PriorityFlow to combine deep planning tools with active focus features, helping you structure and finish your daily goals.
          </motion.p>
        </div>

        {/* Features Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            
            // Asymmetric widths for the last few elements on desktop
            const isLastTwo = idx >= 3;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-cardDark rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-200 ${
                  isLastTwo && 'lg:col-span-1.5' // visual balance
                }`}
              >
                <div>
                  {/* Icon Box with gradient backgrounds */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.bgColor} ${feat.textColor} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  
                  {/* Benefit Lead */}
                  <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-2 block">
                    {feat.benefit}
                  </span>
                  
                  {/* Feature Title */}
                  <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-3 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                    {feat.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Available on Free Tier</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
