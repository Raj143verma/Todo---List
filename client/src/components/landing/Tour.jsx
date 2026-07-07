import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CheckSquare, Clock, Calendar, Flame, Target, Sparkles, Plus, Play, Pause, Trash2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function Tour() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pomodoroRunning, setPomodoroRunning] = useState(true);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(1425); // 23:45

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Task List', icon: CheckSquare },
    { id: 'pomodoro', label: 'Pomodoro', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <section id="tour" className="py-20 md:py-28 bg-slate-50 dark:bg-darkBg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-200/25 dark:bg-cyan-950/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-500"
          >
            Product Tour
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3 mb-5"
          >
            Experience the workflow
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Take a look inside the application. Click through the tabs below to explore the core dashboard, focus timer, list views, and scheduling features.
          </p>
        </div>

        {/* Tab Controls (Mobile: Scrollable / Desktop: Flex Center) */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-4 mb-8 md:mb-12 scrollbar-none gap-2 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-500/15'
                    : 'bg-white hover:bg-slate-50 dark:bg-cardDark dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mock Application Window Wrapper */}
        <motion.div
          layout
          className="w-full max-w-5xl mx-auto bg-white dark:bg-cardDark rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row h-[550px] md:h-[580px]"
        >
          {/* Mock Window Sidebar */}
          <div className="hidden md:flex flex-col w-56 border-r border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
            {/* App Branding */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 mb-6">
              <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <CheckSquare className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Sarah's Workspace</span>
            </div>

            {/* Sidebar Navigation Replicas */}
            <div className="flex flex-col gap-1.5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-650 dark:text-indigo-400'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Sidebar bottom indicator */}
            <div className="mt-auto p-2 bg-indigo-500/5 dark:bg-indigo-950/20 rounded-xl border border-indigo-500/10 dark:border-indigo-950/40 flex items-center gap-2">
              <Flame className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Daily Streak</span>
                <span className="text-xs font-black text-slate-700 dark:text-slate-350">7 Days Active</span>
              </div>
            </div>
          </div>

          {/* Mock Window Main Panel */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-cardDark">
            {/* Mock Header Controls */}
            <div className="h-12 border-b border-slate-200/80 dark:border-slate-800 px-5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-450 dark:bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-450 dark:bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-450 dark:bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-250/30 dark:border-slate-700/50 text-[10px] font-semibold text-slate-400 dark:text-slate-500 w-52 text-center truncate">
                app.priorityflow.com/{activeTab}
              </div>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* Viewport Content */}
            <div className="flex-1 p-5 overflow-y-auto min-h-0 bg-white dark:bg-cardDark">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Workspace Dashboard</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Overview of Sarah's progress</p>
                      </div>
                      <div className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400">
                        All syncs active
                      </div>
                    </div>

                    {/* Dashboard Metrics Widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-200/50 dark:border-slate-800/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
                          <Flame className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Focus Streak</span>
                          <p className="text-base font-black text-slate-850 dark:text-slate-100">7 Days</p>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-200/50 dark:border-slate-800/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0">
                          <Target className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Weekly Tasks</span>
                          <p className="text-base font-black text-slate-850 dark:text-slate-100">24 Completed</p>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-200/50 dark:border-slate-800/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Deep Focus</span>
                          <p className="text-base font-black text-slate-850 dark:text-slate-100">12.5 Hours</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Circle & Recommendation splits */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      {/* Left: Completion Ring */}
                      <div className="sm:col-span-5 p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-200/50 dark:border-slate-800/80 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">Daily Progress</span>
                        
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          {/* SVG Progress Circle */}
                          <svg className="w-full h-full transform -rotate-95">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="6" fill="transparent" />
                            <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-indigo-500" strokeWidth="6" fill="transparent"
                              strokeDasharray="251.2"
                              strokeDashoffset="62.8" // 75% complete
                            />
                          </svg>
                          <span className="absolute text-lg font-black text-slate-855 dark:text-slate-100">75%</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-3">3 of 4 tasks complete</span>
                      </div>

                      {/* Right: AI smart suggestions */}
                      <div className="sm:col-span-7 p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-200/50 dark:border-slate-800/80 flex flex-col">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide flex items-center gap-1 mb-2.5">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          <span>Smart Focus Recommendation</span>
                        </span>
                        
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3.5">
                          "Based on your 2:00 PM deadline, you should run a focus session for 'Design feedback loops' next."
                        </p>
                        
                        <div className="mt-auto bg-white dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-250">Design feedback loops</span>
                            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wide">High Priority</span>
                          </div>
                          <button
                            onClick={() => setActiveTab('pomodoro')}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span className="hidden sm:inline">Start Timer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: TASKS */}
                {activeTab === 'tasks' && (
                  <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans">Task List</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Manage and check off your active goals</p>
                      </div>
                      <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all">
                        <Plus className="w-4 h-4" />
                        <span>Add Task</span>
                      </button>
                    </div>

                    {/* AI Prompt Tool mock */}
                    <div className="p-3.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/10 dark:border-indigo-900/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
                        <span className="text-xs font-semibold text-slate-650 dark:text-indigo-300">Need to plan a big goal? Write it here and get subtasks.</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('dashboard');
                          // triggers showing the AI block
                        }}
                        className="bg-indigo-500 hover:bg-indigo-650 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Analyze with AI</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Task rows */}
                    <div className="flex flex-col gap-2.5 mt-2">
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-xl opacity-60">
                        <div className="flex items-center gap-3">
                          <CheckSquare className="w-5.5 h-5.5 text-emerald-500 fill-emerald-500/10" />
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 line-through">Establish Git repository & directory layouts</span>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-550">Done</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-xl opacity-60">
                        <div className="flex items-center gap-3">
                          <CheckSquare className="w-5.5 h-5.5 text-emerald-500 fill-emerald-500/10" />
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 line-through">Configure Nodemailer templates for emails</span>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-550">Done</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-5.5 h-5.5 rounded border border-slate-350 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:border-indigo-500" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Design feedback loops</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455">High Priority</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">2h est.</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-5.5 h-5.5 rounded border border-slate-350 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:border-indigo-500" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Draft legal terms and compliance notes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">Medium Priority</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">3h est.</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: POMODORO */}
                {activeTab === 'pomodoro' && (
                  <motion.div
                    key="pomodoro"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center text-center py-4 gap-4"
                  >
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Pomodoro Timer</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Active Task: <span className="font-semibold text-indigo-500">Design feedback loops</span></p>
                    </div>

                    {/* Large Timer Ring */}
                    <div className="relative w-44 h-44 flex flex-col items-center justify-center mt-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="88" cy="88" r="76" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="6" fill="transparent" />
                        <circle cx="88" cy="88" r="76" stroke="currentColor" className="text-indigo-500" strokeWidth="6" fill="transparent"
                          strokeDasharray="477.2"
                          strokeDashoffset={477.2 - (477.2 * (pomodoroSeconds / 1500))} // percent of 25m
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black text-slate-850 dark:text-slate-100 font-mono tracking-tighter">
                          {formatTimer(pomodoroSeconds)}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-500/90 mt-1 animate-pulse">
                          {pomodoroRunning ? 'Deep Focus' : 'Paused'}
                        </span>
                      </div>
                    </div>

                    {/* Timer Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setPomodoroRunning(!pomodoroRunning)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 cursor-pointer ${
                          pomodoroRunning ? 'bg-amber-500 hover:bg-amber-650' : 'bg-indigo-500 hover:bg-indigo-650'
                        }`}
                        aria-label={pomodoroRunning ? 'Pause timer' : 'Start timer'}
                      >
                        {pomodoroRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <button
                        onClick={() => {
                          setPomodoroRunning(false);
                          setPomodoroSeconds(1500);
                        }}
                        className="text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: CALENDAR */}
                {activeTab === 'calendar' && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Schedule Calendar</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Plan and block focus routines</p>
                      </div>
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-350">
                        June 2026
                      </div>
                    </div>

                    {/* Mock Weekly Calendar Grid */}
                    <div className="border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden mt-1">
                      {/* Week headers */}
                      <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center py-2.5 border-b border-slate-200/60 dark:border-slate-800">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                      
                      {/* Calendar rows */}
                      <div className="grid grid-cols-7 divide-x divide-y divide-slate-150 dark:divide-slate-800/60 bg-white dark:bg-slate-900/10 min-h-[220px]">
                        {/* Day cell offsets */}
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-300 dark:text-slate-650">15</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-300 dark:text-slate-650">16</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-300 dark:text-slate-650">17</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-300 dark:text-slate-650">18</div>
                        
                        {/* Day 19 (Today) */}
                        <div className="p-1 min-h-[50px] relative bg-indigo-50/20 dark:bg-indigo-950/10 flex flex-col justify-between">
                          <span className="text-right text-[10px] font-bold text-indigo-500">19</span>
                          <div className="bg-indigo-500 text-white text-[8px] font-extrabold p-1 rounded mt-1 truncate">
                            Dev Sprint
                          </div>
                          <div className="bg-rose-500 text-white text-[8px] font-extrabold p-1 rounded mt-0.5 truncate">
                            Feedback Loop
                          </div>
                        </div>

                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">20</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">21</div>

                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">22</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">23</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500 flex flex-col justify-end">
                          <div className="bg-purple-500 text-white text-[8px] font-extrabold p-1 rounded truncate">
                            Launch SaaS
                          </div>
                        </div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">24</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">25</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">26</div>
                        <div className="p-1 min-h-[50px] relative text-right text-[10px] text-slate-400 dark:text-slate-500">27</div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
