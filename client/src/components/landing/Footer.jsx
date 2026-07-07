import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-100 dark:border-slate-800/50">
          
          {/* Logo & Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2 group focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 dark:from-slate-50 dark:via-indigo-100 dark:to-slate-100 bg-clip-text text-transparent">
                Priority<span className="text-indigo-500">Flow</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              AI-powered task management that structures your daily ambitions. Break down goals, track streaks, and maintain deep focus sprints.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8.5 h-8.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">
              Contact & Support
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <p className="leading-relaxed">
                Have questions or need assistance? Reach out directly to our help desk.
              </p>
              <a
                href="mailto:support@priorityflow.com"
                className="inline-flex items-center gap-2 text-indigo-650 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors mt-1 focus:outline-none"
              >
                <Mail className="w-4 h-4" />
                <span>support@priorityflow.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <div>
            © {currentYear} PriorityFlow. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {legalLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
