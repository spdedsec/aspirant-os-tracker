import React, { useState, useEffect } from 'react';
import { SyllabusItem, StudySessionLog, ExamId, UserTopicState } from '../types';
import { formatDuration, getSpacedRevisionDate } from '../utils/storage';
import { playTactileClick, playSuccessChime, playTimerFinishSound } from '../utils/sound';
import { Play, Pause, RotateCcw, CheckCircle, Star, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SessionTimerProps {
  currentExam: ExamId;
  syllabusItems: SyllabusItem[];
  selectedTopic: SyllabusItem | null;
  onSelectTopic: (topic: SyllabusItem | null) => void;
  onLogSession: (session: StudySessionLog) => void;
  onUpdateTopicState: (topicId: string, updates: Partial<UserTopicState>) => void;
  topicStates: Record<string, UserTopicState>;
  soundEnabled: boolean;
}

type TimerMode = 'deep-work' | 'pomodoro' | 'revision' | 'stopwatch';

const MODE_PRESETS: Record<TimerMode, { title: string; minutes: number; subtitle: string; color: string }> = {
  'deep-work': { title: 'Deep Work', minutes: 50, subtitle: '50m Intense Focus + 10m Break', color: '#0071e3' },
  'pomodoro': { title: 'Pomodoro', minutes: 25, subtitle: '25m Standard Block', color: '#ff2d55' },
  'revision': { title: 'Revision Blitz', minutes: 15, subtitle: '15m High-Yield Recall', color: '#af52de' },
  'stopwatch': { title: 'Open Stopwatch', minutes: 0, subtitle: 'Continuous Uncapped Flow', color: '#34c759' }
};

export const SessionTimer: React.FC<SessionTimerProps> = ({
  currentExam,
  syllabusItems,
  selectedTopic,
  onSelectTopic,
  onLogSession,
  onUpdateTopicState,
  topicStates,
  soundEnabled
}) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [startTime, setStartTime] = useState<string | null>(null);

  // Completion modal state
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [completedSeconds, setCompletedSeconds] = useState<number>(0);
  const [focusRating, setFocusRating] = useState<number>(5);
  const [sessionNotes, setSessionNotes] = useState<string>('');

  const targetSeconds = MODE_PRESETS[mode].minutes * 60;
  const isCountdown = targetSeconds > 0;
  const remainingSeconds = isCountdown ? Math.max(0, targetSeconds - secondsElapsed) : secondsElapsed;

  // Timer Tick Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => {
          const next = prev + 1;
          // If countdown hit zero
          if (isCountdown && next >= targetSeconds) {
            setIsRunning(false);
            playTimerFinishSound(soundEnabled);
            handleFinishSession(next);
            return targetSeconds;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isCountdown, targetSeconds, soundEnabled]);

  const toggleRunning = () => {
    playTactileClick(soundEnabled);
    if (!isRunning && !startTime) {
      setStartTime(new Date().toISOString());
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    playTactileClick(soundEnabled);
    setIsRunning(false);
    setSecondsElapsed(0);
    setStartTime(null);
  };

  const handleFinishSession = (totalSecs?: number) => {
    const secs = totalSecs !== undefined ? totalSecs : secondsElapsed;
    if (secs < 10) {
      // Under 10 seconds, just reset
      handleReset();
      return;
    }
    setIsRunning(false);
    setCompletedSeconds(secs);
    setShowLogModal(true);
    playSuccessChime(soundEnabled);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleConfirmLog = () => {
    playTactileClick(soundEnabled);
    const nowIso = new Date().toISOString();
    const startIso = startTime || new Date(Date.now() - completedSeconds * 1000).toISOString();

    const logEntry: StudySessionLog = {
      id: 'session-' + Date.now(),
      date: nowIso.slice(0, 10),
      startedAt: startIso,
      endedAt: nowIso,
      durationSeconds: completedSeconds,
      examId: currentExam,
      subjectId: selectedTopic ? selectedTopic.subjectId : 'general',
      subjectTitle: selectedTopic ? selectedTopic.subjectTitle : 'General Study Block',
      topicId: selectedTopic ? selectedTopic.id : 'general',
      topicTitle: selectedTopic ? selectedTopic.title : 'Uncategorized Deep Work',
      sessionType: mode,
      notes: sessionNotes,
      focusRating
    };

    onLogSession(logEntry);

    // If attached to a specific topic, increment time and update revision schedule
    if (selectedTopic) {
      const current = topicStates[selectedTopic.id] || {
        topicId: selectedTopic.id,
        status: 'in-progress',
        revisionCount: 0,
        lastRevisedAt: null,
        nextRevisionDue: null,
        confidence: 3,
        notes: '',
        timeSpentSeconds: 0
      };

      const newTime = (current.timeSpentSeconds || 0) + completedSeconds;
      const nextDue = getSpacedRevisionDate(current.revisionCount);

      onUpdateTopicState(selectedTopic.id, {
        ...current,
        timeSpentSeconds: newTime,
        lastRevisedAt: nowIso,
        nextRevisionDue: current.nextRevisionDue || nextDue,
        status: current.status === 'not-started' ? 'in-progress' : current.status
      });
    }

    // Reset timer
    setShowLogModal(false);
    setSecondsElapsed(0);
    setStartTime(null);
    setSessionNotes('');
  };

  // Format time for Apple Watch Display
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // SVG ring stroke progress calculation
  const strokeProgress = isCountdown
    ? ((targetSeconds - remainingSeconds) / targetSeconds) * 100
    : (secondsElapsed % 60) * (100 / 60);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      
      {/* Timer Mode Pills (Apple Segmented Bar) */}
      <div className="flex items-center justify-center">
        <div className="bg-[#151518] p-1 rounded-2xl border border-white/[0.08] shadow-apple-sm flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(['pomodoro', 'deep-work', 'revision', 'stopwatch'] as TimerMode[]).map((m) => {
            const isSelected = mode === m;
            const preset = MODE_PRESETS[m];
            return (
              <button
                key={m}
                onClick={() => {
                  playTactileClick(soundEnabled);
                  if (!isRunning) {
                    setMode(m);
                    setSecondsElapsed(0);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-apple-sm font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {preset.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Apple Watch / iOS Timer Aesthetic Card */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#18181c] to-[#111113] border border-white/[0.1] shadow-apple-dark-md flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Soft Ambient Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: MODE_PRESETS[mode].color }}
        />

        {/* Selected Syllabus Topic Selector Chip */}
        <div className="mb-6 z-10 w-full max-w-md">
          <div className="flex items-center justify-between text-xs text-white/50 mb-1.5 px-1">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-apple-teal" />
              Tagging Study Time To:
            </span>
            {selectedTopic && (
              <button
                onClick={() => onSelectTopic(null)}
                className="text-[11px] text-white/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={selectedTopic ? selectedTopic.id : ''}
            onChange={(e) => {
              playTactileClick(soundEnabled);
              const found = syllabusItems.find((i) => i.id === e.target.value) || null;
              onSelectTopic(found);
            }}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-apple-blue font-medium transition"
          >
            <option value="">🎯 General Study Block (Uncategorized)</option>
            {syllabusItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.code}: {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Circular SVG Ring & Apple SF Typography */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4 z-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              strokeWidth="4.5"
              stroke="rgba(255,255,255,0.08)"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              strokeWidth="4.5"
              stroke={MODE_PRESETS[mode].color}
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * strokeProgress) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {/* Time & State in Center */}
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tighter text-white tabular-nums drop-shadow-md">
              {timeFormatted}
            </span>
            <span className="text-xs sm:text-sm text-white/50 tracking-wide font-medium mt-1 uppercase">
              {isRunning ? 'Focused Block' : secondsElapsed > 0 ? 'Paused' : MODE_PRESETS[mode].title}
            </span>
          </div>
        </div>

        {/* Controls: Play/Pause, Reset, Complete */}
        <div className="flex items-center gap-4 mt-6 z-10">
          <button
            onClick={handleReset}
            className="p-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white border border-white/10 transition active:scale-90"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleRunning}
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 active:scale-95 shadow-apple-lg flex items-center gap-2"
            style={{
              backgroundColor: isRunning ? '#ffffff' : MODE_PRESETS[mode].color,
              color: isRunning ? '#000000' : '#ffffff'
            }}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span>{secondsElapsed > 0 ? 'Resume' : 'Start Focus'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleFinishSession()}
            disabled={secondsElapsed < 10}
            className={`p-3.5 rounded-full border transition active:scale-90 ${
              secondsElapsed >= 10
                ? 'bg-apple-green/20 text-apple-green border-apple-green/30 hover:bg-apple-green/30'
                : 'bg-white/[0.02] text-white/20 border-white/[0.05] cursor-not-allowed'
            }`}
            title="Complete & Log Session"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Session Completion & Timestamp Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c1c20] border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-apple-dark-md space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="text-center space-y-1">
              <span className="text-3xl">🎉</span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Session Logged & Completed!
              </h3>
              <p className="text-xs text-white/50">
                You focused for <span className="text-apple-teal font-semibold">{formatDuration(completedSeconds)}</span>.
              </p>
            </div>

            {/* Topic Studied Tag */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-left">
              <span className="text-[11px] font-medium text-white/50 block">Subject / Topic</span>
              <span className="text-sm font-semibold text-white">
                {selectedTopic ? `${selectedTopic.code} — ${selectedTopic.title}` : 'General Deep Work Session'}
              </span>
            </div>

            {/* Focus Rating Stars */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-2">
                Rate your focus intensity:
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      playTactileClick(soundEnabled);
                      setFocusRating(star);
                    }}
                    className="p-1.5 transition active:scale-90"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= focusRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Timestamped Session Reflection */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Study Reflection / Key Points Covered:
              </label>
              <textarea
                rows={3}
                placeholder="What did you solve or memorize in this session? (e.g. Completed 30 MCQs on Fundamental Rights, revised Article 19 freedoms)"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-apple-blue font-sans"
              />
            </div>

            {/* Confirm & Save Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 text-xs font-medium text-white/60 hover:text-white"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleConfirmLog}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-apple-sm transition active:scale-95"
              >
                Save & Update Spaced Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
