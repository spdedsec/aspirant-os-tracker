import React, { useState, useMemo } from 'react';
import { SyllabusItem, TopicStatus, UserTopicState, ExamId } from '../types';
import { examMeta } from '../data';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  RotateCw, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Play, 
  Search, 
  Filter, 
  Sparkles,
  BookOpen,
  Bookmark,
  Check
} from 'lucide-react';
import { formatDuration, getSpacedRevisionDate } from '../utils/storage';
import { playTactileClick, playSuccessChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface SyllabusTrackerProps {
  examId: ExamId;
  items: SyllabusItem[];
  topicStates: Record<string, UserTopicState>;
  onUpdateTopicState: (topicId: string, updates: Partial<UserTopicState>) => void;
  onStartStudyTopic: (topic: SyllabusItem) => void;
  soundEnabled: boolean;
}

export const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({
  examId,
  items,
  topicStates,
  onUpdateTopicState,
  onStartStudyTopic,
  soundEnabled
}) => {
  const meta = examMeta[examId];
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TopicStatus | 'all'>('all');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [editingNotesTopicId, setEditingNotesTopicId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');

  // Extract unique subjects
  const subjects = useMemo(() => {
    const map = new Map<string, { id: string; title: string; count: number }>();
    items.forEach((item) => {
      if (selectedStage !== 'all' && item.stageId !== selectedStage) return;
      const existing = map.get(item.subjectId);
      if (existing) {
        existing.count++;
      } else {
        map.set(item.subjectId, { id: item.subjectId, title: item.subjectTitle, count: 1 });
      }
    });
    return Array.from(map.values());
  }, [items, selectedStage]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Stage filter
      if (selectedStage !== 'all' && item.stageId !== selectedStage) return false;
      // Subject filter
      if (selectedSubject !== 'all' && item.subjectId !== selectedSubject) return false;
      // Status filter
      const currentStatus = topicStates[item.id]?.status || 'not-started';
      if (statusFilter !== 'all' && currentStatus !== statusFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesSubject = item.subjectTitle.toLowerCase().includes(q);
        const matchesModule = item.moduleTitle.toLowerCase().includes(q);
        const matchesSubtopics = item.subtopics.some((sub) => sub.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCode && !matchesSubject && !matchesModule && !matchesSubtopics) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedStage, selectedSubject, statusFilter, searchQuery, topicStates]);

  // Calculate Overall Progress
  const totalCount = items.length;
  const masteredCount = items.filter((item) => topicStates[item.id]?.status === 'mastered').length;
  const inProgressCount = items.filter((item) => topicStates[item.id]?.status === 'in-progress').length;
  const revisionCount = items.filter((item) => topicStates[item.id]?.status === 'needs-revision').length;
  const progressPercent = totalCount ? Math.round((masteredCount / totalCount) * 100) : 0;

  const toggleTopicExpand = (id: string) => {
    playTactileClick(soundEnabled);
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStatusChange = (topicId: string, newStatus: TopicStatus) => {
    playTactileClick(soundEnabled);
    if (newStatus === 'mastered') {
      playSuccessChime(soundEnabled);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0071e3', '#34c759', '#ffcc00']
      });
    }
    const current = topicStates[topicId] || {
      topicId,
      status: 'not-started',
      revisionCount: 0,
      lastRevisedAt: null,
      nextRevisionDue: null,
      confidence: 3,
      notes: '',
      timeSpentSeconds: 0
    };

    onUpdateTopicState(topicId, {
      ...current,
      status: newStatus,
      lastRevisedAt: newStatus === 'mastered' ? new Date().toISOString() : current.lastRevisedAt
    });
  };

  const handleIncrementRevision = (topicId: string) => {
    playTactileClick(soundEnabled);
    playSuccessChime(soundEnabled);
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
      status: current.status === 'not-started' ? 'in-progress' : current.status
    });
  };

  const handleOpenNotes = (topicId: string) => {
    playTactileClick(soundEnabled);
    const existingNotes = topicStates[topicId]?.notes || '';
    setNoteDraft(existingNotes);
    setEditingNotesTopicId(topicId);
  };

  const handleSaveNotes = (topicId: string) => {
    playTactileClick(soundEnabled);
    const current = topicStates[topicId] || {
      topicId,
      status: 'not-started',
      revisionCount: 0,
      lastRevisedAt: null,
      nextRevisionDue: null,
      confidence: 3,
      notes: '',
      timeSpentSeconds: 0
    };
    onUpdateTopicState(topicId, { ...current, notes: noteDraft });
    setEditingNotesTopicId(null);
  };

  // Group filtered items by Subject
  const groupedBySubject = useMemo(() => {
    const groups: Record<string, SyllabusItem[]> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.subjectTitle]) {
        groups[item.subjectTitle] = [];
      }
      groups[item.subjectTitle].push(item);
    });
    return groups;
  }, [filteredItems]);

  return (
    <div className="w-full space-y-6">
      
      {/* Overview Progress Card (Apple Health/Fitness aesthetic) */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#18181c] to-[#121214] border border-white/[0.09] shadow-apple-dark-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-apple-blue/15 text-apple-blue border border-apple-blue/20">
                {meta.shortName}
              </span>
              <span className="text-xs text-white/50">{meta.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Syllabus Completion & Mastery
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Track, revise, and conquer every micro-topic with spaced repetition intervals.
            </p>
          </div>

          {/* Progress Metrics & Circular Bar */}
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-apple-blue transition-all duration-700 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-bold text-base text-white">{progressPercent}%</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center sm:text-left">
              <div className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-lg font-bold text-apple-green">{masteredCount}</div>
                <div className="text-[10px] text-white/50 font-medium uppercase">Mastered</div>
              </div>
              <div className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-lg font-bold text-apple-blue">{inProgressCount}</div>
                <div className="text-[10px] text-white/50 font-medium uppercase">In Progress</div>
              </div>
              <div className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-lg font-bold text-amber-400">{revisionCount}</div>
                <div className="text-[10px] text-white/50 font-medium uppercase">To Revise</div>
              </div>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="mt-6 w-full bg-white/[0.08] h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-apple-green h-full transition-all duration-500"
            style={{ width: `${(masteredCount / totalCount) * 100}%` }}
            title="Mastered"
          />
          <div
            className="bg-apple-blue h-full transition-all duration-500"
            style={{ width: `${(inProgressCount / totalCount) * 100}%` }}
            title="In Progress"
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${(revisionCount / totalCount) * 100}%` }}
            title="Needs Revision"
          />
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        
        {/* Stage Tabs (Apple segmented bar) */}
        <div className="flex items-center bg-white/[0.05] p-1 rounded-2xl border border-white/[0.08] overflow-x-auto no-scrollbar">
          {meta.stages.map((st) => (
            <button
              key={st.id}
              onClick={() => {
                playTactileClick(soundEnabled);
                setSelectedStage(st.id);
                setSelectedSubject('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedStage === st.id
                  ? 'bg-white text-black shadow-apple-sm font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {st.title}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Instant Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search topic or concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-white text-xs placeholder-white/40 focus:outline-none focus:border-apple-blue transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Dropdown Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              playTactileClick(soundEnabled);
              setStatusFilter(e.target.value as TopicStatus | 'all');
            }}
            className="px-3 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-apple-blue"
          >
            <option value="all">All Statuses</option>
            <option value="not-started">⚪ Not Started</option>
            <option value="in-progress">🔵 In Progress</option>
            <option value="mastered">🟢 Mastered</option>
            <option value="needs-revision">🟡 Needs Revision</option>
          </select>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => {
            playTactileClick(soundEnabled);
            setSelectedSubject('all');
          }}
          className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition ${
            selectedSubject === 'all'
              ? 'bg-white/20 text-white font-semibold'
              : 'bg-white/[0.04] text-white/60 hover:text-white'
          }`}
        >
          All Subjects ({filteredItems.length})
        </button>
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              playTactileClick(soundEnabled);
              setSelectedSubject(sub.id);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedSubject === sub.id
                ? 'bg-white/20 text-white font-semibold'
                : 'bg-white/[0.04] text-white/60 hover:text-white'
            }`}
          >
            {sub.title} ({sub.count})
          </button>
        ))}
      </div>

      {/* Syllabus Tree by Subject */}
      <div className="space-y-6">
        {Object.keys(groupedBySubject).length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06]">
            <BookOpen className="w-8 h-8 text-white/30 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-white/80">No topics match your filters</h4>
            <p className="text-xs text-white/50 mt-1">Try clearing your search query or status filter.</p>
          </div>
        ) : (
          Object.entries(groupedBySubject).map(([subjectTitle, subjectItems]) => {
            const subjectMastered = subjectItems.filter(
              (i) => topicStates[i.id]?.status === 'mastered'
            ).length;
            const subjectPct = Math.round((subjectMastered / subjectItems.length) * 100);

            return (
              <div
                key={subjectTitle}
                className="rounded-3xl bg-[#141416]/80 border border-white/[0.07] overflow-hidden shadow-apple-dark-sm"
              >
                {/* Subject Header */}
                <div className="px-5 py-4 bg-white/[0.02] border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-apple-blue" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {subjectTitle}
                      </h3>
                      <span className="text-[11px] text-white/50">
                        {subjectMastered} of {subjectItems.length} topics mastered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 sm:w-32 bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-apple-blue h-full transition-all duration-300"
                        style={{ width: `${subjectPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-medium text-white/70">{subjectPct}%</span>
                  </div>
                </div>

                {/* Topics in this Subject */}
                <div className="divide-y divide-white/[0.05]">
                  {subjectItems.map((item) => {
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
                    const isExpanded = !!expandedTopics[item.id];
                    const isEditingNotes = editingNotesTopicId === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 sm:p-5 transition-colors ${
                          state.status === 'mastered'
                            ? 'bg-apple-green/[0.02]'
                            : state.status === 'needs-revision'
                            ? 'bg-amber-500/[0.03]'
                            : ''
                        }`}
                      >
                        {/* Topic Row Top Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                          
                          {/* Title & Info */}
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-white/60 border border-white/[0.08]">
                                {item.code}
                              </span>
                              <span className="text-[11px] font-medium text-white/50">
                                {item.moduleTitle}
                              </span>
                              {item.priority === 'high' && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                                  High Yield
                                </span>
                              )}
                              {item.weightage && (
                                <span className="text-[10px] text-white/40 hidden sm:inline">
                                  • {item.weightage}
                                </span>
                              )}
                            </div>

                            <h4
                              onClick={() => toggleTopicExpand(item.id)}
                              className="text-sm sm:text-base font-semibold text-white tracking-tight cursor-pointer hover:text-apple-blue transition"
                            >
                              {item.title}
                            </h4>
                          </div>

                          {/* Action Bar (Status Pill, Revision Button, Study Timer, Expand) */}
                          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                            
                            {/* Status Selector Pill */}
                            <div className="flex items-center bg-white/[0.06] p-0.5 rounded-xl border border-white/[0.08]">
                              {(['not-started', 'in-progress', 'mastered', 'needs-revision'] as TopicStatus[]).map((st) => {
                                const isCurrent = state.status === st;
                                const label = st === 'not-started' ? '⚪' :
                                              st === 'in-progress' ? '🔵' :
                                              st === 'mastered' ? '🟢' : '🟡';
                                return (
                                  <button
                                    key={st}
                                    onClick={() => handleStatusChange(item.id, st)}
                                    className={`px-2 py-1 rounded-lg text-xs transition active:scale-90 ${
                                      isCurrent
                                        ? 'bg-white/20 text-white font-bold shadow-sm'
                                        : 'text-white/40 hover:text-white/80'
                                    }`}
                                    title={st.replace('-', ' ')}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Revision Counter Chip & Increment */}
                            <button
                              onClick={() => handleIncrementRevision(item.id)}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border transition active:scale-95 ${
                                state.revisionCount > 0
                                  ? 'bg-apple-purple/15 text-apple-purple border-apple-purple/30 hover:bg-apple-purple/25'
                                  : 'bg-white/[0.04] text-white/50 border-white/[0.08] hover:text-white'
                              }`}
                              title="Advance Revision Level"
                            >
                              <RotateCw className="w-3 h-3" />
                              <span>R{state.revisionCount}</span>
                            </button>

                            {/* Study Now Button */}
                            <button
                              onClick={() => {
                                playTactileClick(soundEnabled);
                                onStartStudyTopic(item);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-apple-blue hover:bg-apple-blue/90 text-white shadow-apple-sm transition active:scale-95"
                              title="Start Timed Study Session for this Topic"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span className="hidden sm:inline">Study</span>
                            </button>

                            {/* Notes Button */}
                            <button
                              onClick={() => handleOpenNotes(item.id)}
                              className={`p-1.5 rounded-xl border transition active:scale-95 ${
                                state.notes
                                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                                  : 'bg-white/[0.04] text-white/50 border-white/[0.08] hover:text-white'
                              }`}
                              title="Topic Notes / Formula Sheet"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Expand / Collapse Toggle */}
                            <button
                              onClick={() => toggleTopicExpand(item.id)}
                              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/[0.08] transition"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Bit-by-Bit Subtopics & Notes */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3 animate-in fade-in duration-200">
                            
                            {/* Official Syllabus Reference */}
                            {item.officialRef && (
                              <div className="text-[11px] text-white/40 italic flex items-center gap-1.5">
                                <Bookmark className="w-3 h-3 text-white/30" />
                                <span>Official Reference: {item.officialRef}</span>
                              </div>
                            )}

                            {/* Subtopic Checklist */}
                            <div>
                              <span className="text-xs font-semibold text-white/70 block mb-2">
                                Granular Syllabus Checklist ({item.subtopics.length} bits):
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {item.subtopics.map((sub, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-xs text-white/80"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-apple-teal mt-1.5 flex-shrink-0" />
                                    <span>{sub}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Time Logged & Spaced Repetition Due Date */}
                            <div className="flex items-center gap-4 text-xs text-white/50 pt-2">
                              {state.timeSpentSeconds > 0 && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-white/40" />
                                  <span>Time studied: {formatDuration(state.timeSpentSeconds)}</span>
                                </div>
                              )}
                              {state.nextRevisionDue && (
                                <div className="flex items-center gap-1 text-apple-teal">
                                  <RotateCw className="w-3 h-3" />
                                  <span>Next Revision Due: {state.nextRevisionDue}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Inline Notes Editor */}
                        {isEditingNotes && (
                          <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2 animate-in fade-in duration-150">
                            <div className="flex items-center justify-between text-xs text-white/70 font-medium">
                              <span>Notes & Key Takeaways for {item.title}:</span>
                              <button
                                onClick={() => setEditingNotesTopicId(null)}
                                className="text-white/40 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                            <textarea
                              rows={3}
                              placeholder="Write key concepts, mnemonic tricks, landmark judgments, or formulas..."
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-apple-blue font-sans"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingNotesTopicId(null)}
                                className="px-3 py-1 text-xs text-white/50 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNotes(item.id)}
                                className="px-3 py-1 rounded-xl text-xs font-semibold bg-white text-black hover:bg-white/90"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Display Saved Note if exists and not editing */}
                        {!isEditingNotes && state.notes && (
                          <div className="mt-2 p-2.5 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                            <Edit3 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{state.notes}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
