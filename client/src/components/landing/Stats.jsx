import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckSquare, BarChart, Star } from 'lucide-react';

export default function Stats() {
  const metrics = [
    {
      icon: Users,
      value: '12,400+',
      label: 'Active Users',
      description: 'Knowledge workers, students, and founders.',
      color: 'text-indigo-500'
    },
    {
      icon: CheckSquare,
      value: '350,000+',
      label: 'Tasks Created',
      description: 'Structured into clear, achievable subtasks.',
      color: 'text-violet-500'
    },
    {
      icon: BarChart,
      value: '94.8%',
      label: 'Completion Rate',
      description: 'Users successfully checking off daily goals.',
      color: 'text-cyan-500'
    },
    {
      icon: Star,
      value: '4.9 / 5.0',
      label: 'Average Rating',
      description: 'Rated for design clarity and AI accuracy.',
      color: 'text-amber-500'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-6 rounded-2xl bg-slate-50/50 dark:bg-cardDark/30 border border-slate-200/40 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-750 transition-colors"
              >
                {/* Metric Icon */}
                <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${metric.color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Metric value */}
                <h3 className="text-3xl font-black text-slate-850 dark:text-slate-50 tracking-tight leading-none mb-2">
                  {metric.value}
                </h3>
                
                {/* Metric Label */}
                <span className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  {metric.label}
                </span>
                
                {/* Metric Description */}
                <p className="text-slate-500 dark:text-slate-550 text-xs leading-relaxed max-w-[200px] sm:max-w-none">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
