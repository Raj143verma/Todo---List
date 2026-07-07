import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PomodoroTimer from '../components/pomodoro/PomodoroTimer';
import { Timer, Brain, Heart, Coffee } from 'lucide-react';

export default function PomodoroPage() {
  const tips = [
    {
      title: 'Maintain Focus',
      description: 'Avoid multi-tasking during focus sessions. Keep notifications muted.',
      icon: Brain,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20',
    },
    {
      title: 'Rest & Recover',
      description: 'Step away from screens during breaks. Stretch or drink water.',
      icon: Coffee,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20',
    },
    {
      title: 'Health First',
      description: 'The long break interval lets your brain recover for intense sessions.',
      icon: Heart,
      color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/20',
    },
  ];

  return (
    <AppLayout title="Pomodoro Focus Timer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Focus Timer */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              Focus Timer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Utilize the Pomodoro technique to break work into structured intervals separated by short rest sessions.
            </p>
          </div>
          
          <PomodoroTimer />
        </div>

        {/* Tips list */}
        <div className="space-y-6 lg:mt-12 bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-205 uppercase tracking-wider flex items-center gap-2">
            <Timer className="w-5 h-5 text-primary" />
            <span>Productivity Tips</span>
          </h3>

          <div className="space-y-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`p-3 rounded-2xl shrink-0 self-start ${tip.color}`}>
                  <tip.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
