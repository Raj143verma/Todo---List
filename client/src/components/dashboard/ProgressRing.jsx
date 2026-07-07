import React from 'react';

export default function ProgressRing({ radius = 40, stroke = 8, progress = 0 }) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Cap progress at 100% or floor at 0%
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        {/* Background track circle */}
        <circle
          stroke="currentColor"
          className="text-slate-100 dark:text-slate-800"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated indicator circle */}
        <circle
          stroke="currentColor"
          className="text-primary transition-all duration-500 ease-out"
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
      {/* Label overlay */}
      <span className="absolute text-sm font-extrabold text-slate-800 dark:text-slate-100">
        {Math.round(safeProgress)}%
      </span>
    </div>
  );
}
