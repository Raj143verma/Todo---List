import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignupForm from '../components/auth/SignupForm';

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-darkBg px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-cardDark"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-bold text-2xl shadow-lg shadow-indigo-500/20 mb-4">
            ⚡
          </span>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Get Started Free
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Build your personalized task flow structure today.
          </p>
        </div>

        <SignupForm onSuccess={() => navigate('/dashboard')} />

        <div className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:text-primary-hover hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
