/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo
          hover: '#4f46e5',
          light: '#e0e7ff',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Violet
          hover: '#7c3aed',
        },
        success: {
          DEFAULT: '#10B981', // Emerald
          hover: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          hover: '#d97706',
        },
        danger: {
          DEFAULT: '#F43F5E', // Rose
          hover: '#e11d48',
        },
        darkBg: '#0F172A', // slate-900
        cardDark: '#1E293B', // slate-800
        lightBg: '#F8FAFC', // slate-50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
