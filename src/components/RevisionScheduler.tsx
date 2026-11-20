import React, { useState } from 'react';
import { SyllabusItem, UserTopicState, ExamId } from '../types';
import { getSpacedRevisionDate, formatDuration } from '../utils/storage';
import { playTactileClick, playSuccessChime } from '../utils/sound';
import { RotateCw, CheckCircle, Clock, AlertTriangle, Calendar, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RevisionSchedulerProps {
  examId: ExamId;
  syllabusItems: SyllabusItem[];
  topicStates: Record<string, UserTopicState>;
  onUpdateTopicState: (topicId: string, updates: Partial<UserTopicState>) => void;
  onStartRevisionTimer: (topic: SyllabusItem) => void;
  soundEnabled: boolean;
}

export const RevisionScheduler: React.FC<RevisionSchedulerProps> = ({
  examId,
  syllabusItems,
  topicStates,
  onUpdateTopicState,
  onStartRevisionTimer,
  soundEnabled
}) => {
  const [activeFilter, setActiveFilter] = useState<'due' | 'upcoming' | 'all'>('due');
  const todayStr = new Date().toISOString().slice(0, 10);

  // Group topics based on revision status
  const topicsWithSchedule = syllabusItems.map((item) => {
    const state = topicStates[item.id] || {
      topicId: item.id,
      status: 'not-started',
      revisionCount: 0,
      lastRevisedAt: null,
      nextRevisionDue: null,
      confidence: 3,
      notes: '',
      timeSpentSeconds: 0
    };

    const isDue = state.nextRevisionDue && state.nextRevisionDue <= todayStr;
    const isUpcoming = state.nextRevisionDue && state.nextRevisionDue > todayStr;

    return {
      item,
      state,
      isDue,
      isUpcoming
    };
  });

  const dueTopics = topicsWithSchedule.filter((t) => t.isDue || t.state.status === 'needs-revision');
  const upcomingTopics = topicsWithSchedule.filter((t) => t.isUpcoming && t.state.status !== 'needs-revision');
  const activeTopics = topicsWithSchedule.filter((t) => t.state.revisionCount > 0);

  const displayList = activeFilter === 'due' ? dueTopics :
                      activeFilter === 'upcoming' ? upcomingTopics : activeTopics;

  const handleMarkRevised = (topicId: string) => {
    playTactileClick(soundEnabled);
    playSuccessChime(soundEnabled);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 }
    });

    const current = topicStates[topicId] || {
      topicId,
      status: 'in-progress',
      revisionCount: 0,
      lastRevisedAt: null,
      nextRevisionDue: null,
      confidence: 3,
      notes: '',
      timeSpentSeconds: 0
    };

    const nextCount = current.revisionCount + 1;
    const nextDue = getSpacedRevisionDate(nextCount);

    onUpdateTopicState(topicId, {
      ...current,
      revisionCount: nextCount,
      lastRevisedAt: new Date().toISOString(),
      nextRevisionDue: nextDue,
      status: current.status === 'needs-revision' ? 'in-progress' : current.status
    });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-apple-purple/10 via-[#18181c] to-apple-blue/10 border border-white/[0.09] shadow-apple-dark-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-apple-purple/20 text-apple-purple border border-apple-purple/30">
                Spaced Repetition System (SRS)
              </span>
              <span className="text-xs text-white/50">Ebbinghaus Forgetting Curve Shield</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Smart Active Recall Scheduler
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5">
              Revisit concepts at scientific intervals: Day 1, Day 3, Day 7, Day 21, and Day 60.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
              <span className="text-xl font-bold text-amber-400">{dueTopics.length}</span>
              <span className="text-[10px] text-white/50 block font-medium uppercase">Due Today</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
              <span className="text-xl font-bold text-apple-teal">{upcomingTopics.length}</span>
              <span className="text-[10px] text-white/50 block font-medium uppercase">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center bg-white/[0.05] p-1 rounded-2xl border border-white/[0.08] w-fit">
        <button
          onClick={() => {
            playTactileClick(soundEnabled);
            setActiveFilter('due');
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
            activeFilter === 'due'
              ? 'bg-white text-black shadow-apple-sm font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          🚨 Due for Revision ({dueTopics.length})
        </button>
        <button
          onClick={() => {
            playTactileClick(soundEnabled);
            setActiveFilter('upcoming');
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
            activeFilter === 'upcoming'
              ? 'bg-white text-black shadow-apple-sm font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          📅 Next 7 Days ({upcomingTopics.length})
        </button>
        <button
          onClick={() => {
            playTactileClick(soundEnabled);
            setActiveFilter('all');
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
            activeFilter === 'all'
              ? 'bg-white text-black shadow-apple-sm font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          🔄 All Active Revisions ({activeTopics.length})
        </button>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {displayList.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06]">
            <CheckCircle className="w-10 h-10 text-apple-green/60 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-white/80">
              {activeFilter === 'due' ? 'All caught up!' : 'No scheduled revisions found'}
            </h4>
            <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
              {activeFilter === 'due'
                ? 'You have revised all due topics for today. Keep learning new topics or run a timed blitz!'
                : 'Study new topics or mark them in progress to auto-generate spaced intervals.'}
            </p>
          </div>
        ) : (
          displayList.map(({ item, state, isDue }) => (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDue
                  ? 'bg-amber-500/[0.06] border-amber-500/30'
                  : 'bg-[#151518]/90 border-white/[0.07] hover:border-white/15'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-white/60 border border-white/[0.08]">
                    {item.code}
                  </span>
                  <span className="text-[11px] text-white/50">{item.subjectTitle}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-apple-purple/15 text-apple-purple border border-apple-purple/20">
                    Cycle R{state.revisionCount}
                  </span>
                  {isDue && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Revision Due Today
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  {item.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-white/50 pt-1">
                  {state.lastRevisedAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/40" />
                      Last revised: {new Date(state.lastRevisedAt).toLocaleDateString()}
                    </span>
                  )}
                  {state.nextRevisionDue && (
                    <span className="flex items-center gap-1 text-apple-teal">
                      <Calendar className="w-3 h-3" />
                      Due: {state.nextRevisionDue}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    playTactileClick(soundEnabled);
                    onStartRevisionTimer(item);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 transition active:scale-95"
                  title="Start 15m Timed Recall"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Recall Timer</span>
                </button>

                <button
                  onClick={() => handleMarkRevised(item.id)}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-white/90 shadow-apple-sm transition active:scale-95"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Mark Revised (R{state.revisionCount + 1})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
