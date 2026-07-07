import React from 'react';
import Button from '../ui/Button';
import { Plus } from 'lucide-react';

export default function EmptyState({ onAddClick, searchActive }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-cardDark/30">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-primary mb-6">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>

      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
        {searchActive ? 'No matching tasks found' : 'All clear! No tasks found'}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6 leading-relaxed">
        {searchActive
          ? 'Try adjusting your filters or search keywords to locate matching tasks.'
          : 'Organize your schedules, assign priorities, and follow up. Create a task now to get started.'}
      </p>

      {!searchActive && onAddClick && (
        <Button onClick={onAddClick} icon={Plus} size="sm">
          Add Your First Task
        </Button>
      )}
    </div>
  );
}
