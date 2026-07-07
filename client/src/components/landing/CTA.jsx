import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
      {/* Background mesh glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-indigo-500/10 dark:bg-indigo-950/15 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="bg-white dark:bg-cardDark rounded-3xl p-8 md:p-16 border border-slate-200/60 dark:border-slate-800 shadow-xl flex flex-col items-center"
        >
          {/* Tagline */}
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-950/45 px-3 py-1.5 rounded-full border border-indigo-100/50 dark:border-indigo-900/30 flex items-center gap-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Increase your focus today</span>
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-5 leading-tight">
            Ready to boost your productivity?
          </h2>

          {/* Subheading */}
          <p className="text-slate-550 dark:text-slate-400 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            Stop losing track of your goals in scattered lists. Join thousands of knowledge workers using PriorityFlow to plan, track, and complete daily tasks.
          </p>

          {/* Primary Action Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/signup')}
            icon={ArrowRight}
            className="px-8 py-3.5 shadow-md shadow-indigo-500/15 text-base"
          >
            Get Started Free
          </Button>

          {/* Badges details */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-400 dark:text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              No credit card required
            </span>
            <span className="text-slate-350 dark:text-slate-850">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Free tier active forever
            </span>
            <span className="text-slate-350 dark:text-slate-850">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              GDPR compliant
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
