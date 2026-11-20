import React, { useState } from 'react';
import { ExamCountdown, ExamId } from '../types';
import { getDaysLeft } from '../utils/storage';
import { Calendar, Clock, Plus, Trash2, Sparkles, Award } from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface DayCounterWidgetProps {
  countdowns: ExamCountdown[];
  currentExam: ExamId;
  onAddCountdown: (cd: ExamCountdown) => void;
  onRemoveCountdown: (id: string) => void;
  soundEnabled: boolean;
}

export const DayCounterWidget: React.FC<DayCounterWidgetProps> = ({
  countdowns,
  currentExam,
  onAddCountdown,
  onRemoveCountdown,
  soundEnabled
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newColor, setNewColor] = useState('#0071e3');

  // Filter countdowns relevant to current exam or custom
  const relevantCountdowns = countdowns.filter(
    (c) => c.examId === currentExam || c.examId === 'custom'
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    onAddCountdown({
      id: 'custom-' + Date.now(),
      examId: 'custom',
      title: newTitle,
      subtitle: newSubtitle || 'Custom Target Milestone',
      targetDate: newDate,
      color: newColor,
      iconName: 'Flag',
      isOfficialEstimated: false
    });

    setNewTitle('');
    setNewSubtitle('');
    setNewDate('');
    setShowAddModal(false);
    playTactileClick(soundEnabled);
  };

  return (
    <div className="w-full mb-8">
      {/* Widget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {relevantCountdowns.map((cd) => {
          const { days, isPast } = getDaysLeft(cd.targetDate);
          const weeksLeft = Math.floor(days / 7);

          return (
            <div
              key={cd.id}
              className="group relative p-4 rounded-3xl bg-[#151518]/90 hover:bg-[#1c1c20] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-apple-dark-sm hover:shadow-apple-dark-md flex flex-col justify-between"
            >
              {/* Top Accent & Subtitle */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cd.color }}
                  />
                  <span className="text-[11px] font-medium tracking-tight text-white/50 uppercase">
                    {cd.isOfficialEstimated ? 'Target Date' : 'Milestone'}
                  </span>
                </div>
                {cd.examId === 'custom' && (
                  <button
                    onClick={() => {
                      playTactileClick(soundEnabled);
                      onRemoveCountdown(cd.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-white/30 hover:text-red-400 transition"
                    title="Remove milestone"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Title & Info */}
              <div className="mb-4">
                <h3 className="text-base font-semibold text-white tracking-[-0.01em] line-clamp-1">
                  {cd.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                  {cd.subtitle}
                </p>
              </div>

              {/* Days Counter Display (Apple Typography) */}
              <div className="flex items-baseline justify-between pt-2 border-t border-white/[0.06]">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-[-0.03em]">
                      {days}
                    </span>
                    <span className="text-xs font-medium text-white/60 tracking-normal">
                      {isPast ? 'days ago' : 'days left'}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/40 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span>~{weeksLeft} weeks</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-white/50 font-mono">
                    <Calendar className="w-3 h-3 text-white/30" />
                    {new Date(cd.targetDate + 'T00:00:00').toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Milestone Card */}
        <button
          onClick={() => {
            playTactileClick(soundEnabled);
            setShowAddModal(true);
          }}
          className="p-4 rounded-3xl border border-dashed border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 group min-h-[140px] active:scale-95"
        >
          <div className="w-8 h-8 rounded-2xl bg-white/[0.08] group-hover:bg-white/[0.15] flex items-center justify-center transition">
            <Plus className="w-4 h-4 text-white/70 group-hover:text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white/80 group-hover:text-white">
              Add Target Countdown
            </span>
            <p className="text-[11px] text-white/40">Mock Test / Revision D-Day</p>
          </div>
        </button>
      </div>

      {/* Add Countdown Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1c1c20] border border-white/15 rounded-3xl p-6 w-full max-w-md shadow-apple-dark-md animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Create Target Milestone</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Milestone Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UPSC Prelims Mock #5 / GS Revision D-Day"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-apple-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Description / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Complete Modern History & Economy test series"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-apple-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm focus:outline-none focus:border-apple-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  {['#0071e3', '#34c759', '#ff9500', '#af52de', '#ff2d55', '#5ac8fa'].map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setNewColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition ${
                        newColor === c ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-apple-sm transition active:scale-95"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
