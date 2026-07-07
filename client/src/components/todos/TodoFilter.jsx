import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import useTodos from '../../hooks/useTodos';
import { cn } from '../../utils/helpers';

export default function TodoFilter() {
  const { filters, setFilters } = useTodos();
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Debounce search query input (300ms delays)
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters({ search: searchTerm });
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Study', value: 'study' },
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Health', value: 'health' },
  ];

  const priorities = [
    { label: 'All', value: 'all' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  const statuses = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'true' },
    { label: 'Pending', value: 'false' },
  ];

  const sortOptions = [
    { label: 'Drag Order', value: 'order' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Priority', value: 'priority' },
    { label: 'Created Date', value: 'createdAt' },
  ];

  return (
    <div className="space-y-4 bg-white dark:bg-cardDark p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
      {/* Search input and sorting parameters line */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
          />
        </div>

        {/* Sort and Order */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ sortBy: e.target.value })}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={filters.order}
            onChange={(e) => setFilters({ order: e.target.value })}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Filter Row chips */}
      <div className="flex flex-col gap-3.5 pt-3.5 border-t border-slate-100/60 dark:border-slate-800/50">
        {/* Categories Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 shrink-0">
            Category
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilters({ category: cat.value })}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer',
                  filters.category === cat.value
                    ? 'bg-primary border-primary text-white shadow-sm shadow-indigo-500/15'
                    : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-650 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 shrink-0">
            Priority
          </span>
          <div className="flex flex-wrap gap-1.5">
            {priorities.map((prio) => (
              <button
                key={prio.value}
                onClick={() => setFilters({ priority: prio.value })}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer',
                  filters.priority === prio.value
                    ? 'bg-primary border-primary text-white shadow-sm shadow-indigo-500/15'
                    : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-650 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                )}
              >
                {prio.label}
              </button>
            ))}
          </div>
        </div>

        {/* Completion status Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 shrink-0">
            Status
          </span>
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((stat) => (
              <button
                key={stat.value}
                onClick={() => setFilters({ completed: stat.value })}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer',
                  filters.completed === stat.value
                    ? 'bg-primary border-primary text-white shadow-sm shadow-indigo-500/15'
                    : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-650 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                )}
              >
                {stat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
