import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function StreakBadge({ streak = 0, heatmapData = [] }) {
  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800';
    if (count <= 2) return 'bg-indigo-100 dark:bg-indigo-900/35';
    if (count <= 4) return 'bg-indigo-300 dark:bg-indigo-750/70';
    return 'bg-indigo-600';
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cardDark">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-1">
            Focus Streak
          </h3>
          <p className="text-xs text-slate-550 dark:text-slate-400">
            Keep completing tasks daily to grow your personal streak.
          </p>
        </div>

        {/* Dynamic flame streak badge */}
        <div className="flex items-center gap-2 bg-gradient-to-tr from-amber-500 to-rose-500 text-white px-4 py-2.5 rounded-xl shadow-md shadow-rose-500/10 self-start sm:self-auto">
          <Flame className="w-5 h-5 fill-current animate-bounce" />
          <span className="text-sm font-extrabold tracking-tight uppercase">
            {streak} Day Streak
          </span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
          Last 30 Days Activity
        </h4>
        
        {heatmapData.length === 0 ? (
          <div className="flex h-12 items-center justify-center text-slate-400">
            <span className="text-[11px] font-semibold">Activity logs will appear here</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {heatmapData.map((item, index) => {
              const dateObj = new Date(item.date);
              const label = `${dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}: ${item.count} tasks completed`;

              return (
                <div
                  key={item.date || index}
                  className={cn(
                    'w-6.5 h-6.5 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer',
                    getIntensityClass(item.count)
                  )}
                  title={label}
                />
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4 mt-4 text-[10px] font-semibold text-slate-400 dark:text-slate-500 justify-end">
          <span>Less</span>
          <div className="flex gap-1">
            <span className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-slate-800" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-100 dark:bg-indigo-900/35" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-300 dark:bg-indigo-750/70" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-600" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
