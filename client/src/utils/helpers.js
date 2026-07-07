import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// CSS classes merge utility combining clsx and tailwind-merge
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Simple date formatter
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Overdue task utility checks if task is incomplete and past its due date
export function isOverdue(dateString, completed) {
  if (!dateString || completed) return false;
  const dueDate = new Date(dateString);
  // Set to the end of the specified due day to avoid aggressive timezone cutoff
  dueDate.setHours(23, 59, 59, 999);
  return dueDate < new Date();
}

// Format seconds into MM:SS format for Pomodoro timer displays
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
