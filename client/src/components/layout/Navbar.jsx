import React from 'react';
import { Menu } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar({ onMenuClick, title }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-6 dark:border-slate-800 dark:bg-darkBg/80">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger menu trigger */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {title && (
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Navbar ThemeToggle shown on mobile viewports for convenience */}
        <ThemeToggle className="lg:hidden" />

        {user && (
          <div className="flex items-center gap-2.5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
            />
            <span className="hidden text-sm font-semibold text-slate-700 dark:text-slate-300 sm:inline">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
