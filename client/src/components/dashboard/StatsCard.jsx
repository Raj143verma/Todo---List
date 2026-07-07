import React from 'react';
import { cn } from '../../utils/helpers';

export default function StatsCard({ title, value, icon: Icon, colorClass, trend }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark transition-all hover:shadow-md duration-200">
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            {value}
          </h3>
          {trend && (
            <span className="text-xs font-bold text-emerald-500">
              {trend}
            </span>
          )}
        </div>
      </div>

      <div className={cn('rounded-2xl p-4 flex items-center justify-center shrink-0', colorClass)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
