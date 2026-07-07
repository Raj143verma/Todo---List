import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MessageSquare, ListTodo, Play, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up in 30 seconds. No credit card required. Instantly unlock the interface.'
    },
    {
      number: '02',
      icon: MessageSquare,
      title: 'Describe Your Goal',
      description: 'Input your project ambitions: "Build React native app" or "Clean the garage."'
    },
    {
      number: '03',
      icon: ListTodo,
      title: 'Get Structured Subtasks',
      description: 'Our AI engine outputs achievable steps, complete with hours and logical order.'
    },
    {
      number: '04',
      icon: Play,
      title: 'Start Working',
      description: 'Launch Pomodoro sprints, check off items, check your stats, and build streaks.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-500"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3 mb-5"
          >
            From idea to done in four steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-650 dark:text-slate-350 text-sm sm:text-base leading-relaxed"
          >
            PriorityFlow aligns your planning with execution. Here is how your daily workflow changes.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-100 via-indigo-500/30 to-violet-100 dark:from-slate-800 dark:via-indigo-950 dark:to-slate-800 pointer-events-none -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left relative group"
                >
                  {/* Step Bubble & Number */}
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-slate-200 dark:text-slate-800 select-none font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Connect arrow (mobile between cards) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute top-6 right-[-15%] text-slate-300 dark:text-slate-700 -z-10">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-850 dark:text-slate-100 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-[260px] lg:max-w-none">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
