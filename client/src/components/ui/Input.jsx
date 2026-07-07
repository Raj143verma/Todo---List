import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(
  ({ label, error, className, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:pointer-events-none',
            error
              ? 'border-danger focus:ring-danger/20 focus:border-danger'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-semibold text-danger">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
