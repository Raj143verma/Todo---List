import React from 'react';
import { cn } from '../../utils/helpers';

export default function Badge({ children, variant = 'info', className }) {
  const styles = {
    // Priorities
    high: 'bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-950/20 dark:text-rose-450 dark:border-rose-900/30',
    medium: 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900/30',
    low: 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900/30',
    
    // Categories
    study: 'bg-blue-50 text-blue-705 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
    work: 'bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
    personal: 'bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
    health: 'bg-pink-50 text-pink-700 border border-pink-100 dark:bg-pink-950/20 dark:text-pink-400 dark:border-pink-900/30',
    
    info: 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-305 dark:border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        styles[variant] || styles.info,
        className
      )}
    >
      {children}
    </span>
  );
}
