import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: 'Is there a free plan?',
      a: 'Yes! Our Free plan includes 3 AI task generations per day, a built-in focus timer, and basic weekly productivity analytics. It contains everything you need to start structuring and accomplishing your goals.'
    },
    {
      q: 'Can I import existing tasks?',
      a: 'Yes, you can import your tasks from other popular tools like Google Tasks, Todoist, Microsoft To Do, and standard CSV sheets in just a few clicks from your dashboard settings.'
    },
    {
      q: 'Is my data secure?',
      a: 'We take security seriously. We use enterprise-grade SSL/TLS encryption for data transmission and store passwords using strong hashing algorithms. We are GDPR compliant, write zero tracking logs, and never sell your data. Your data is entirely yours.'
    },
    {
      q: 'Can I upgrade or downgrade anytime?',
      a: 'Yes! There are no lock-in contracts. When the Pro tier is released, you will be able to upgrade, downgrade, or cancel your subscription at any time directly from your account page.'
    },
    {
      q: 'How does the AI work?',
      a: 'We leverage the Google Gemini API to analyze the goal description you enter. It evaluates the objectives and uses industry best-practice structures to generate realistic, sequential subtasks with reasonable time estimations.'
    },
    {
      q: 'Can I use the app offline?',
      a: 'Currently, PriorityFlow requires an active internet connection to synchronize your tasks, communicate with the AI breakdown engine, and save your Pomodoro sessions. Offline caching support is on our roadmap for later this year.'
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/60 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-500"
          >
            Questions & Answers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3 mb-5"
          >
            Frequently asked questions
          </motion.h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base">
            Everything you need to know about the platform. Contact support if you have other questions.
          </p>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Inner Accordion Item Component
function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="border border-slate-200/60 dark:border-slate-800 rounded-2xl bg-slate-50/40 dark:bg-cardDark/20 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 dark:text-slate-500"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200/30 dark:border-slate-800/40 pt-4 bg-white/50 dark:bg-slate-900/10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
