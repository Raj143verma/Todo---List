import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import usePomodoro from '../../hooks/usePomodoro';
import { formatTime, cn } from '../../utils/helpers';
import Button from '../ui/Button';

export default function PomodoroTimer() {
  const {
    mode,
    setMode,
    timeLeft,
    isActive,
    completedSessions,
    totalWorkSessionsToday,
    startTimer,
    pauseTimer,
    resetTimer,
    settings,
    toggleTickSound,
  } = usePomodoro();

  const getModeDuration = () => {
    if (mode === 'work') return settings.workTime;
    if (mode === 'shortBreak') return settings.shortBreakTime;
    return settings.longBreakTime;
  };

  const activeDuration = getModeDuration();
  const progressPercent = activeDuration > 0 ? (timeLeft / activeDuration) * 100 : 0;
  
  // Circular ring measurements
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const modeLabels = {
    work: 'Focus Period',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  const modeColors = {
    work: 'text-primary border-primary/20',
    shortBreak: 'text-success border-success/20',
    longBreak: 'text-secondary border-secondary/20',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-cardDark rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-md mx-auto">
      {/* Mode Switches */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1 mb-8 w-full">
        {Object.keys(modeLabels).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              resetTimer();
            }}
            className={cn(
              'flex-1 text-[10px] font-bold py-2 rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer',
              mode === m
                ? 'bg-white dark:bg-cardDark text-slate-800 dark:text-slate-150 shadow-sm'
                : 'text-slate-500 hover:text-slate-750 dark:hover:text-slate-200'
            )}
          >
            {modeLabels[m].split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Circle Ring Countdown */}
      <div className="relative flex items-center justify-center mb-8 select-none">
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
          <circle
            stroke="currentColor"
            className="text-slate-100 dark:text-slate-800/80"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            className={cn('transition-all duration-150 ease-linear', modeColors[mode].split(' ')[0])}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-1">
            {modeLabels[mode]}
          </span>
        </div>
      </div>

      {/* Control Actions Row */}
      <div className="flex items-center gap-4 w-full justify-center mb-8">
        <Button
          variant="secondary"
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center border border-slate-205 dark:border-slate-700"
          onClick={toggleTickSound}
          title={settings.tickSound ? 'Mute ticking' : 'Enable ticking sound'}
        >
          {settings.tickSound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </Button>

        <Button
          variant={mode === 'work' ? 'primary' : mode === 'shortBreak' ? 'success' : 'secondary'}
          className="rounded-full w-16 h-16 p-0 flex items-center justify-center shadow-lg"
          onClick={isActive ? pauseTimer : startTimer}
        >
          {isActive ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
        </Button>

        <Button
          variant="secondary"
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center border border-slate-205 dark:border-slate-700"
          onClick={resetTimer}
          title="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Stats Counter Footer */}
      <div className="w-full border-t border-slate-100 dark:border-slate-800/60 pt-4 flex justify-between items-center text-center">
        <div className="flex-1 border-r border-slate-100 dark:border-slate-800/60">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Cycle Sessions
          </p>
          <p className="text-lg font-black text-slate-805 dark:text-slate-200 mt-0.5">
            {completedSessions} <span className="text-xs text-slate-400 font-semibold">/ {settings.longBreakInterval}</span>
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Completed Today
          </p>
          <p className="text-lg font-black text-slate-805 dark:text-slate-200 mt-0.5">
            {totalWorkSessionsToday} 🔥
          </p>
        </div>
      </div>
    </div>
  );
}
