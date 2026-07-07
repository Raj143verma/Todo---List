import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, Timer, LogOut, X } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';
import { cn } from '../../utils/helpers';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', to: '/todos', icon: CheckSquare },
    { name: 'Calendar', to: '/calendar', icon: Calendar },
    { name: 'Pomodoro', to: '/pomodoro', icon: Timer },
  ];

  return (
    <>
      {/* Mobile Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Navigation Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-45 flex w-[260px] flex-col border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-bold text-lg shadow-md shadow-indigo-500/20">
              ⚡
            </span>
            <span className="font-extrabold text-slate-800 dark:text-slate-150 tracking-tight text-lg">
              PriorityFlow
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 space-y-1.5 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-indigo-400 shadow-sm shadow-indigo-500/5'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                )
              }
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* User Card & Action Area */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 space-y-4">
          {user && (
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full bg-slate-200"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-505 truncate max-w-[110px]">
                    {user.email}
                  </span>
                </div>
              </div>
              
              {user.streak > 0 && (
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-450 px-2 py-0.5 rounded-lg text-xs font-bold border border-amber-100 dark:border-amber-900/20">
                  🔥 <span>{user.streak}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Theme
            </span>
            <ThemeToggle />
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/20 dark:hover:text-red-450 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
