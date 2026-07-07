import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { cn } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    toggleTheme();
    toast.success(`${theme === 'light' ? 'Dark' : 'Light'} mode enabled`, {
      id: 'theme-toggle-toast', // Overwrite previous toggle toasts to avoid clutter
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'relative flex items-center justify-between w-16 h-8 rounded-full p-1 cursor-pointer border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40',
        theme === 'dark'
          ? 'bg-slate-850 border-slate-700 text-yellow-400'
          : 'bg-slate-100 border-slate-300 text-slate-500',
        className
      )}
      aria-label="Toggle Theme Mode"
    >
      <Moon className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
      <Sun className="w-3.5 h-3.5 mr-1.5 text-yellow-500" />
      
      {/* Framer motion animated indicator ball */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className={cn(
          'absolute w-6 h-6 rounded-full flex items-center justify-center shadow-md',
          theme === 'dark'
            ? 'bg-yellow-400 text-slate-900 right-1'
            : 'bg-white text-slate-800 left-1'
        )}
      >
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5 text-slate-950" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-indigo-600" />
        )}
      </motion.div>
    </button>
  );
}
