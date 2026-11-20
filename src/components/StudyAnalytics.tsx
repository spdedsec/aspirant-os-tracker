import React from 'react';
import { StudySessionLog, ExamId } from '../types';
import { formatDuration } from '../utils/storage';
import { Clock, Calendar, Star, BarChart3, Trash2, Award, Zap } from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface StudyAnalyticsProps {
  sessions: StudySessionLog[];
  onClearSessions: () => void;
  soundEnabled: boolean;
}

export const StudyAnalytics: React.FC<StudyAnalyticsProps> = ({
  sessions,
  onClearSessions,
  soundEnabled
}) => {
  // Aggregate metrics
  const totalSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
  const totalSessions = sessions.length;
  const avgFocus = totalSessions
    ? (sessions.reduce((acc, s) => acc + (s.focusRating || 5), 0) / totalSessions).toFixed(1)
    : '5.0';

  // Subject breakdown
  const subjectDistribution: Record<string, number> = {};
  sessions.forEach((s) => {
    const key = s.subjectTitle || 'General Study';
    subjectDistribution[key] = (subjectDistribution[key] || 0) + s.durationSeconds;
  });

  const sortedSubjects = Object.entries(subjectDistribution).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full space-y-6">
      
      {/* Top Cards Grid (Apple Health rings aesthetic) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        {/* Total Hours Studied */}
        <div className="p-5 rounded-3xl bg-[#151518]/90 border border-white/[0.08] shadow-apple-dark-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium uppercase tracking-tight">Total Focus Time</span>
            <Clock className="w-4 h-4 text-apple-teal" />
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">
              {formatDuration(totalSeconds)}
            </div>
            <p className="text-xs text-white/40 mt-1">Logged across all exams</p>
          </div>
        </div>

        {/* Total Sessions Count */}
        <div className="p-5 rounded-3xl bg-[#151518]/90 border border-white/[0.08] shadow-apple-dark-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium uppercase tracking-tight">Completed Blocks</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">
              {totalSessions}
            </div>
            <p className="text-xs text-white/40 mt-1">Deep work & revision sprints</p>
          </div>
        </div>

        {/* Average Focus Rating */}
        <div className="p-5 rounded-3xl bg-[#151518]/90 border border-white/[0.08] shadow-apple-dark-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium uppercase tracking-tight">Avg Focus Intensity</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1">
              {avgFocus} <span className="text-sm font-normal text-white/40">/ 5.0</span>
            </div>
            <p className="text-xs text-white/40 mt-1">Self-rated study discipline</p>
          </div>
        </div>
      </div>

      {/* Subject Distribution Progress */}
      {sortedSubjects.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#151518]/90 border border-white/[0.08] shadow-apple-dark-sm space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-apple-blue" />
            Subject Time Distribution
          </h3>
          <div className="space-y-3">
            {sortedSubjects.map(([subject, duration]) => {
              const pct = totalSeconds ? Math.round((duration / totalSeconds) * 100) : 0;
              return (
                <div key={subject} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80 font-medium truncate max-w-[70%]">{subject}</span>
                    <span className="text-white/50 font-mono">{formatDuration(duration)} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-apple-blue h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timestamped Session History Table */}
      <div className="p-6 rounded-3xl bg-[#151518]/90 border border-white/[0.08] shadow-apple-dark-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Timestamped Session History
            </h3>
            <p className="text-xs text-white/50">
              Precise chronologically logged study sessions and notes.
            </p>
          </div>

          {sessions.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your study session logs?')) {
                  playTactileClick(soundEnabled);
                  onClearSessions();
                }
              }}
              className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <Clock className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-white/70">No study sessions logged yet</h4>
            <p className="text-xs text-white/40 mt-0.5">
              Launch the Study Timer or Pomodoro above to record your first block.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.05] overflow-x-auto">
            {sessions.slice(0, 50).map((s) => (
              <div key={s.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                
                {/* Topic & Subject Info */}
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm truncate">
                      {s.topicTitle}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50 uppercase">
                      {s.sessionType}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50 truncate">
                    {s.subjectTitle}
                  </div>
                  {s.notes && (
                    <p className="text-xs text-amber-300/80 italic mt-1 bg-white/[0.02] p-1.5 rounded-lg border border-white/[0.04]">
                      "{s.notes}"
                    </p>
                  )}
                </div>

                {/* Duration & Timestamp */}
                <div className="flex sm:flex-col sm:items-end justify-between text-right flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-apple-teal">
                    {formatDuration(s.durationSeconds)}
                  </span>
                  <div className="text-[11px] text-white/40 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-white/30" />
                    <span>
                      {new Date(s.endedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
