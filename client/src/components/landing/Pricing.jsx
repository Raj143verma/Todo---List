import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free Forever',
      price: '$0',
      period: 'free forever',
      description: 'Everything you need to structure your personal goals.',
      features: [
        '3 AI Task Breakdowns per day',
        'Standard 25-min Pomodoro timer',
        'Weekly productivity dashboard',
        'Full calendar scheduling',
        'Single device synchronization'
      ],
      cta: 'Start Free',
      popular: false,
      variant: 'secondary'
    },
    {
      name: 'Pro Focus',
      price: '$6',
      period: '/ month',
      description: 'For professionals aiming for maximum daily leverage.',
      features: [
        'Unlimited AI Task Breakdowns',
        'Custom Pomodoro duration & alerts',
        'Advanced monthly trend analytics',
        'Unlimited multi-device sync',
        'Priority customer support'
      ],
      cta: 'Go Pro (Coming Soon)',
      popular: true,
      variant: 'primary'
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-200/20 dark:bg-indigo-950/15 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-500"
          >
            Pricing Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3 mb-5"
          >
            Transparent, simple pricing
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Start organizing your ambitions for free. Upgrade to Pro later when you need unlimited power.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`flex flex-col justify-between p-8 rounded-2xl border bg-white dark:bg-cardDark relative ${
                plan.popular
                  ? 'border-indigo-500 shadow-xl shadow-indigo-500/5 dark:shadow-none'
                  : 'border-slate-200/60 dark:border-slate-800 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Plan Name */}
                <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-2">
                  {plan.name}
                </h3>
                
                {/* Plan Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {plan.description}
                </p>

                {/* Plan Pricing */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 mb-8" />

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-650 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full justify-center text-sm py-3"
                disabled={plan.popular} // Pro is "Coming Soon"
                onClick={() => navigate('/signup')}
              >
                <span>{plan.cta}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Small disclosure */}
        <div className="text-center mt-8 text-xs text-slate-400 dark:text-slate-500 font-medium">
          Have team requirements? Contact our support team for customized organization profiles.
        </div>

      </div>
    </section>
  );
}
