const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_URL = rawApiUrl ? rawApiUrl.replace(/\/$/, '') : '/api';

export const CATEGORIES = ['study', 'work', 'personal', 'health'];

export const PRIORITIES = ['high', 'medium', 'low'];

export const STORAGE_KEYS = {
  THEME: 'theme',
  TOKEN: 'token',
  TODOS_BACKUP: 'todos_backup',
  POMODORO_SETTINGS: 'pomodoro_settings',
};

export const POMODORO_DEFAULTS = {
  WORK: 25 * 60, // 25 minutes in seconds
  SHORT_BREAK: 5 * 60, // 5 minutes in seconds
  LONG_BREAK: 15 * 60, // 15 minutes in seconds
  LONG_BREAK_INTERVAL: 4, // After 4 cycles
};
