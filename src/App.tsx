import React, { useState, useEffect, useRef } from 'react';
import { 
  ExamId, 
  SyllabusItem, 
  UserTopicState, 
  StudySessionLog, 
  ExamCountdown, 
  UserSettings 
} from './types';
import { allSyllabusData, examMeta } from './data';
import { defaultCountdowns } from './data/defaultCountdowns';
import { 
  loadStoredState, 
  saveStoredState, 
  exportAppState, 
  calculateStreak, 
  defaultSettings 
} from './utils/storage';
import { Header } from './components/Header';
import { DayCounterWidget } from './components/DayCounterWidget';
import { SyllabusTracker } from './components/SyllabusTracker';
import { SessionTimer } from './components/SessionTimer';
import { RevisionScheduler } from './components/RevisionScheduler';
import { StudyAnalytics } from './components/StudyAnalytics';
import { DynamicIsland } from './components/DynamicIsland';
import { SearchModal } from './components/SearchModal';
import { playTactileClick, playSwitchTabSound } from './utils/sound';

export function App() {
  const [currentExam, setCurrentExam] = useState<ExamId>('upsc');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'timer' | 'revisions' | 'analytics'>('syllabus');
  
  // Persistent state
  const [topicStates, setTopicStates] = useState<Record<string, UserTopicState>>({});
  const [sessions, setSessions] = useState<StudySessionLog[]>([]);
  const [countdowns, setCountdowns] = useState<ExamCountdown[]>(defaultCountdowns);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  
  // Selected topic for active study
  const [selectedTopic, setSelectedTopic] = useState<SyllabusItem | null>(null);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const loaded = loadStoredState();
    if (loaded.currentExam) setCurrentExam(loaded.currentExam);
    if (loaded.topicStates) setTopicStates(loaded.topicStates);
    if (loaded.sessions) setSessions(loaded.sessions);
    if (loaded.countdowns && loaded.countdowns.length > 0) setCountdowns(loaded.countdowns);
    if (loaded.settings) setSettings(loaded.settings);
  }, []);

  // Save to LocalStorage whenever key states update
  useEffect(() => {
    saveStoredState({
      currentExam,
      topicStates,
      sessions,
      countdowns,
      settings
    });
  }, [currentExam, topicStates, sessions, countdowns, settings]);

  // Current exam syllabus items
  const currentSyllabus = allSyllabusData[currentExam] || [];
  
  // Flat list of all items across exams for universal search
  const allItems = [
    ...allSyllabusData.upsc,
    ...allSyllabusData.ssc_cgl,
    ...allSyllabusData.ssc_chsl
  ];

  // Calculated Streak
  const streakDays = calculateStreak(sessions);

  // Handlers
  const handleUpdateTopicState = (topicId: string, updates: Partial<UserTopicState>) => {
    setTopicStates((prev) => {
      const current = prev[topicId] || {
        topicId,
        status: 'not-started',
        revisionCount: 0,
        lastRevisedAt: null,
        nextRevisionDue: null,
        confidence: 3,
        notes: '',
        timeSpentSeconds: 0
      };
      return {
        ...prev,
        [topicId]: { ...current, ...updates }
      };
    });
  };

  const handleLogSession = (session: StudySessionLog) => {
    setSessions((prev) => [session, ...prev]);
  };

  const handleStartStudyTopic = (topic: SyllabusItem) => {
    setSelectedTopic(topic);
    setActiveTab('timer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCountdown = (cd: ExamCountdown) => {
    setCountdowns((prev) => [cd, ...prev]);
  };

  const handleRemoveCountdown = (id: string) => {
    setCountdowns((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleSound = () => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleExport = () => {
    exportAppState({
      currentExam,
      currentStage: 'all',
      selectedSubject: null,
      searchQuery: '',
      activeStatusFilter: 'all',
      activePriorityFilter: 'all',
      topicStates,
      sessions,
      countdowns,
      settings,
      streakDays,
      lastStudiedDate: sessions[0]?.date || null
    });
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.topicStates) setTopicStates(parsed.topicStates);
        if (parsed.sessions) setSessions(parsed.sessions);
        if (parsed.countdowns) setCountdowns(parsed.countdowns);
        if (parsed.settings) setSettings(parsed.settings);
        alert('Progress & settings successfully imported!');
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f5f5f7] flex flex-col font-sans selection:bg-apple-blue selection:text-white">
      {/* Hidden File Input for Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/json"
        className="hidden"
      />

      {/* Top Navigation Bar */}
      <Header
        currentExam={currentExam}
        onSelectExam={setCurrentExam}
        activeTimer={null}
        settings={settings}
        onToggleSound={handleToggleSound}
        onExport={handleExport}
        onImport={handleImport}
        onOpenSearch={() => setIsSearchOpen(true)}
        streakDays={streakDays}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Day Counter & Exam Countdown Widgets */}
        <DayCounterWidget
          countdowns={countdowns}
          currentExam={currentExam}
          onAddCountdown={handleAddCountdown}
          onRemoveCountdown={handleRemoveCountdown}
          soundEnabled={settings.soundEnabled}
        />

        {/* Tab 1: Bit-by-Bit Syllabus Tracker */}
        {activeTab === 'syllabus' && (
          <SyllabusTracker
            examId={currentExam}
            items={currentSyllabus}
            topicStates={topicStates}
            onUpdateTopicState={handleUpdateTopicState}
            onStartStudyTopic={handleStartStudyTopic}
            soundEnabled={settings.soundEnabled}
          />
        )}

        {/* Tab 2: Timestamped Study Timer & Pomodoro */}
        {activeTab === 'timer' && (
          <SessionTimer
            currentExam={currentExam}
            syllabusItems={currentSyllabus}
            selectedTopic={selectedTopic}
            onSelectTopic={setSelectedTopic}
            onLogSession={handleLogSession}
            onUpdateTopicState={handleUpdateTopicState}
            topicStates={topicStates}
            soundEnabled={settings.soundEnabled}
          />
        )}

        {/* Tab 3: Spaced Repetition (SRS) Scheduler */}
        {activeTab === 'revisions' && (
          <RevisionScheduler
            examId={currentExam}
            syllabusItems={currentSyllabus}
            topicStates={topicStates}
            onUpdateTopicState={handleUpdateTopicState}
            onStartRevisionTimer={handleStartStudyTopic}
            soundEnabled={settings.soundEnabled}
          />
        )}

        {/* Tab 4: Study Analytics & Timestamp Logs */}
        {activeTab === 'analytics' && (
          <StudyAnalytics
            sessions={sessions}
            onClearSessions={() => setSessions([])}
            soundEnabled={settings.soundEnabled}
          />
        )}
      </main>

      {/* Global Universal Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={allItems}
        onSelectTopic={(item) => {
          setCurrentExam(item.examId);
          handleStartStudyTopic(item);
        }}
        soundEnabled={settings.soundEnabled}
      />

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.06] py-6 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AspirantOS — High-Yield Master Tracker for UPSC CSE, SSC CGL & CHSL</span>
          <span>Designed with Apple WWDC Fluid Interface principles • Fast & 100% Offline-capable</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
