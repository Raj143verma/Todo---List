import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, ArrowRight, CheckCircle2, Circle, Clock, CheckSquare } from 'lucide-react';
import Button from '../ui/Button';

// Mock AI breakdown databases for simulator
const SIMULATOR_GOALS = [
  {
    input: 'Launch a SaaS product in 4 weeks',
    tasks: [
      { text: 'Define core MVP scope & database schema', time: '8h', category: 'Planning' },
      { text: 'Set up JWT auth & Stripe integration', time: '12h', category: 'Backend' },
      { text: 'Build interactive responsive frontend dashboard', time: '16h', category: 'Frontend' },
      { text: 'Deploy to Cloud Platform & configure custom domain', time: '4h', category: 'Devops' },
      { text: 'Set up marketing landing page & collection forms', time: '6h', category: 'Marketing' }
    ]
  },
  {
    input: 'Train for a 10K running race',
    tasks: [
      { text: 'Assess current fitness baseline & get running shoes', time: '2h', category: 'Setup' },
      { text: 'Create 8-week structured progression schedule', time: '3h', category: 'Planning' },
      { text: 'Schedule 3 weekly runs (interval, tempo, long run)', time: '4h/wk', category: 'Execution' },
      { text: 'Perform active recovery and leg strength routines', time: '2h/wk', category: 'Health' },
      { text: 'Run mock 10K time trial & plan race pace strategy', time: '4h', category: 'Milestone' }
    ]
  },
  {
    input: 'Write a comprehensive research paper',
    tasks: [
      { text: 'Conduct initial literature review & gather 15 sources', time: '10h', category: 'Research' },
      { text: 'Outline key sections (Abstract, Intro, Method, Findings)', time: '4h', category: 'Planning' },
      { text: 'Draft literature review & methodology chapters', time: '12h', category: 'Writing' },
      { text: 'Synthesize data analysis results & generate charts', time: '8h', category: 'Analysis' },
      { text: 'Revise syntax, citation formatting, and peer review', time: '6h', category: 'Polishing' }
    ]
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});

  // Cycle goals simulator when first mounting
  useEffect(() => {
    runSimulation(0);
  }, []);

  const runSimulation = async (index) => {
    setIsTyping(true);
    setGeneratedTasks([]);
    setCheckedTasks({});
    const goal = SIMULATOR_GOALS[index];
    
    // Typing effect
    let currentText = '';
    for (let i = 0; i <= goal.input.length; i++) {
      currentText = goal.input.slice(0, i);
      setTypedInput(currentText);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
    
    setIsTyping(false);
    setIsAnalyzing(true);
    
    // Simulated AI API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsAnalyzing(false);
    
    // Render tasks one by one with a cascade effect
    for (let i = 0; i < goal.tasks.length; i++) {
      setGeneratedTasks((prev) => [...prev, goal.tasks[i]]);
      await new Promise((resolve) => setTimeout(resolve, 180));
    }

    // Automatically check off the first two tasks for interactive feel
    await new Promise((resolve) => setTimeout(resolve, 600));
    setCheckedTasks((prev) => ({ ...prev, 0: true }));
    await new Promise((resolve) => setTimeout(resolve, 400));
    setCheckedTasks((prev) => ({ ...prev, 0: true, 1: true }));
  };

  const handleSelectGoal = (index) => {
    if (isTyping || isAnalyzing) return;
    setSelectedGoalIndex(index);
    runSimulation(index);
  };

  const toggleTaskCheck = (index) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-slate-50 dark:bg-darkBg overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 dark:bg-indigo-950/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-200/40 dark:bg-purple-950/15 blur-[120px]" />
        {/* Subtle grid pattern overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/45 border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Next-Gen Task Management</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1] mb-6"
            >
              Break down big goals <br className="hidden sm:inline" />
              into <span className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">actionable tasks</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-350 max-w-xl mb-8 leading-relaxed"
            >
              AI-powered task management that understands your ambitions. Describe what you want to achieve, and watch it turn vague ideas into clear, daily progress.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/signup')}
                icon={ArrowRight}
                className="group"
              >
                Start Free
              </Button>
              <a href="#tour">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Play}
                  className="w-full sm:w-auto text-slate-700 dark:text-slate-300"
                >
                  View Tour
                </Button>
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 pl-1"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free tier included</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>No credit card required</span>
            </motion.div>
          </div>

          {/* Right Column: AI Task Simulator Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full max-w-lg bg-white dark:bg-cardDark rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col"
            >
              {/* Simulator Header */}
              <div className="bg-slate-50 dark:bg-slate-900/50 px-5 py-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  <span>AI Breakdown Engine</span>
                </div>
              </div>

              {/* Simulator Input View */}
              <div className="p-5 flex flex-col gap-4 border-b border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    What goal do you want to accomplish?
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      readOnly
                      value={typedInput}
                      placeholder="Type a goal..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none text-slate-800 dark:text-slate-100 shadow-inner"
                    />
                    {isTyping && (
                      <span className="absolute right-4 w-1.5 h-4.5 bg-indigo-500 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Preset Option Badges */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {SIMULATOR_GOALS.map((g, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectGoal(idx)}
                      disabled={isTyping || isAnalyzing}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                        selectedGoalIndex === idx
                          ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm'
                          : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-350 disabled:opacity-50'
                      }`}
                    >
                      {idx === 0 ? 'SaaS Launch' : idx === 1 ? '10K Run' : 'Research Paper'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulator Task Output list */}
              <div className="flex-1 p-5 min-h-[280px] flex flex-col justify-start relative bg-white dark:bg-cardDark">
                
                {/* State: Analyzing Loader */}
                <AnimatePresence>
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/90 dark:bg-cardDark/95 flex flex-col items-center justify-center gap-3.5 z-20"
                    >
                      <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-500 rounded-full animate-spin" />
                      <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="w-4 h-4" />
                        <span>AI structuring your tasks...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Task List */}
                <div className="flex flex-col gap-3">
                  {generatedTasks.length === 0 && !isTyping && !isAnalyzing && (
                    <div className="flex flex-col items-center justify-center text-center py-10 text-slate-400 dark:text-slate-600">
                      <CheckSquare className="w-12 h-12 stroke-[1.2] mb-3" />
                      <p className="text-sm font-semibold">Select a preset above to begin simulation</p>
                    </div>
                  )}

                  {generatedTasks.map((task, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex items-start justify-between p-3 rounded-xl border transition-colors ${
                        checkedTasks[idx]
                          ? 'bg-slate-50/50 dark:bg-slate-900/10 border-slate-100 dark:border-slate-800'
                          : 'bg-white dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-800/50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 mr-3">
                        <button
                          onClick={() => toggleTaskCheck(idx)}
                          className="mt-0.5 text-slate-400 hover:text-indigo-500 dark:text-slate-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
                          aria-label={checkedTasks[idx] ? "Mark incomplete" : "Mark complete"}
                        >
                          {checkedTasks[idx] ? (
                            <CheckCircle2 className="w-5.5 h-5.5 text-emerald-500 fill-emerald-500/10" />
                          ) : (
                            <Circle className="w-5.5 h-5.5" />
                          )}
                        </button>
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={`text-xs font-semibold transition-all ${
                              checkedTasks[idx]
                                ? 'text-slate-450 dark:text-slate-500 line-through'
                                : 'text-slate-700 dark:text-slate-250'
                            }`}
                          >
                            {task.text}
                          </span>
                          <span className="text-[10px] font-bold text-indigo-500/90 uppercase tracking-wide">
                            {task.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-slate-450 dark:text-slate-500 text-xs font-medium bg-slate-50 dark:bg-slate-900/50 py-1 px-2.5 rounded-lg border border-slate-200/30 dark:border-slate-800/40">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Simulator Footer metrics */}
              <div className="bg-slate-50/70 dark:bg-slate-900/45 px-5 py-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold">
                <div>
                  Generated:{' '}
                  <span className="text-slate-600 dark:text-slate-350">{generatedTasks.length} tasks</span>
                </div>
                <div>
                  Completed:{' '}
                  <span className="text-emerald-500">
                    {Object.values(checkedTasks).filter(Boolean).length} of {generatedTasks.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
