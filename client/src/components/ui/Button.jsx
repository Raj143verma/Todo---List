import React from 'react';
import { cn } from '../../utils/helpers';
import Spinner from './Spinner';

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover focus:ring-primary dark:focus:ring-offset-darkBg shadow-sm shadow-indigo-500/10',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50',
    danger:
      'bg-danger text-white hover:bg-danger-hover focus:ring-danger dark:focus:ring-offset-darkBg shadow-sm',
    success:
      'bg-success text-white hover:bg-success-hover focus:ring-success dark:focus:ring-offset-darkBg shadow-sm',
    outline:
      'border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-500',
    ghost:
      'text-slate-700 hover:bg-slate-150 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-500',
  };

  const sizes = {
    sm: 'text-xs py-1.5 px-3 rounded-lg',
    md: 'text-sm py-2.5 px-5',
    lg: 'text-base py-3 px-6 rounded-2xl',
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="w-4.5 h-4.5 mr-2" />}
      {!loading && Icon && <Icon className="w-4.5 h-4.5 mr-2" />}
      {children}
    </button>
  );
}
