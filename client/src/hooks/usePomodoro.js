import { useState, useEffect, useRef } from 'react';
import useLocalStorage from './useLocalStorage';
import { STORAGE_KEYS, POMODORO_DEFAULTS } from '../utils/constants';

export default function usePomodoro() {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.POMODORO_SETTINGS, {
    workTime: POMODORO_DEFAULTS.WORK,
    shortBreakTime: POMODORO_DEFAULTS.SHORT_BREAK,
    longBreakTime: POMODORO_DEFAULTS.LONG_BREAK,
    longBreakInterval: POMODORO_DEFAULTS.LONG_BREAK_INTERVAL,
    tickSound: true,
  });

  const [mode, setMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(settings.workTime);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalWorkSessionsToday, setTotalWorkSessionsToday] = useLocalStorage('pomodoro_sessions_today', 0);

  const audioContextRef = useRef(null);

  // Request notifications access
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Sync timeLeft when configuration changes and timer is paused
  useEffect(() => {
    if (!isActive) {
      if (mode === 'work') setTimeLeft(settings.workTime);
      else if (mode === 'shortBreak') setTimeLeft(settings.shortBreakTime);
      else if (mode === 'longBreak') setTimeLeft(settings.longBreakTime);
    }
  }, [settings, mode, isActive]);

  // Audio synthesizer utilizing standard Web Audio oscillators to prevent external asset request errors
  const playSound = (type) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'tick' && settings.tickSound) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.005, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'alarm') {
        const playBeep = (time, freq, duration) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0.12, time);
          gain.gain.exponentialRampToValueAtTime(0.00001, time + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + duration);
        };
        
        const now = ctx.currentTime;
        playBeep(now, 440, 0.15);
        playBeep(now + 0.2, 440, 0.15);
        playBeep(now + 0.4, 554, 0.3);
      }
    } catch (e) {
      console.warn('Web Audio Playback failed/blocked by browser gesture policies:', e);
    }
  };

  const sendNotification = (message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('PriorityFlow Pomodoro', {
        body: message,
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⏱️</text></svg>',
      });
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Cycle completes on the next tick
            setTimeout(() => handleCycleComplete(), 0);
            return 0;
          }
          if (settings.tickSound) {
            playSound('tick');
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, settings.tickSound]);

  const handleCycleComplete = () => {
    setIsActive(false);
    playSound('alarm');

    if (mode === 'work') {
      const nextSessions = completedSessions + 1;
      setCompletedSessions(nextSessions);
      setTotalWorkSessionsToday((prev) => prev + 1);
      
      const isLongBreak = nextSessions % settings.longBreakInterval === 0;
      if (isLongBreak) {
        setMode('longBreak');
        sendNotification('Work session complete! Enjoy a long break.');
      } else {
        setMode('shortBreak');
        sendNotification('Work session complete! Take a short break.');
      }
    } else {
      setMode('work');
      sendNotification('Break finished! Let\'s get back to work.');
    }
  };

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setTimeLeft(settings.workTime);
    else if (mode === 'shortBreak') setTimeLeft(settings.shortBreakTime);
    else if (mode === 'longBreak') setTimeLeft(settings.longBreakTime);
  };

  const toggleTickSound = () => {
    setSettings((prev) => ({ ...prev, tickSound: !prev.tickSound }));
  };

  return {
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
    setTimeLeft,
  };
}
