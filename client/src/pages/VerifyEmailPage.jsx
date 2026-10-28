import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import authService from '../services/authService';
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing or invalid email verification token.');
      return;
    }

    const verify = async () => {
      try {
        const response = await authService.verifyEmail(token);
        if (response.success) {
          setStatus('success');
          setMessage(response.message || 'Your email address has been verified successfully!');
        } else {
          setStatus('error');
          setMessage(response.message || 'Verification token is invalid or has expired.');
        }
      } catch (err) {
        setStatus('error');
        setMessage(
          err.response?.data?.message || err.message || 'Failed to verify email. The link may have expired.'
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-cardDark rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm text-center">
        {status === 'verifying' && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Verifying Your Email...
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Please wait a moment while we verify your account.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Email Verified!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {message}
            </p>
            <div className="pt-4">
              <Link to="/login">
                <Button className="w-full" icon={ArrowRight}>
                  Continue to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Verification Failed
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {message}
            </p>
            <div className="pt-4">
              <Link to="/login">
                <Button variant="secondary" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
