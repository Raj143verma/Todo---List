import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  className,
  size = 'md',
}) {
  // Temporarily disable page scrolling behind an active modal overlay
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with spring motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={cn(
              'relative z-10 w-full rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-cardDark p-6 shadow-2xl flex flex-col',
              sizes[size],
              className
            )}
          >
            {/* Header section with optional Title and Close Button */}
            {(title || onClose) && (
              <div className="flex items-center justify-between pb-4 border-b border-slate-105 dark:border-slate-700/60 mb-4">
                {title && (
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {title}
                  </h3>
                )}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto max-h-[72vh] pr-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
