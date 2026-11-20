import React from 'react';
import { ExamId, UserSettings } from '../types';
import { examMeta } from '../data';
import { Volume2, VolumeX, Download, Upload, Search, Flame, Github } from 'lucide-react';
import { playSwitchTabSound, playTactileClick } from '../utils/sound';

interface HeaderProps {
  currentExam: ExamId;
  onSelectExam: (id: ExamId) => void;
  activeTimer: {
    isRunning: boolean;
    seconds: number;
    topicTitle: string;
    onToggle: () => void;
  } | null;
  settings: UserSettings;
  onToggleSound: () => void;
  onExport: () => void;
  onImport: () => void;
  onOpenSearch: () => void;
  streakDays: number;
  activeTab: 'syllabus' | 'timer' | 'revisions' | 'analytics';
  onSelectTab: (tab: 'syllabus' | 'timer' | 'revisions' | 'analytics') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentExam,
  onSelectExam,
  activeTimer,
  settings,
  onToggleSound,
  onExport,
  onImport,
  onOpenSearch,
  streakDays,
  activeTab,
  onSelectTab
}) => {
  const currentMeta = examMeta[currentExam];

  const handleExamChange = (examId: ExamId) => {
    playSwitchTabSound(settings.soundEnabled);
    onSelectExam(examId);
  };

  const handleTabChange = (tab: 'syllabus' | 'timer' | 'revisions' | 'analytics') => {
    playSwitchTabSound(settings.soundEnabled);
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-apple bg-[#0c0c0e]/80 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-apple-blue to-apple-indigo flex items-center justify-center shadow-apple-dark-sm border border-white/20">
              <span className="text-xl select-none">🎯</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base sm:text-lg tracking-[-0.02em] text-white">
                  Aspirant<span className="text-apple-blue">OS</span>
                </span>
                <span className="hidden md:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.08] text-white/70 border border-white/10 uppercase tracking-wider">
                  Pro Engine
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-white/50 tracking-tight font-normal">
                UPSC CSE • SSC CGL • SSC CHSL Master Syllabus & Engine
              </p>
            </div>
          </div>

          {/* Exam Segmented Control (Apple iOS Style Pill) */}
          <div className="flex items-center bg-white/[0.06] p-1 rounded-2xl border border-white/[0.08] shadow-inner">
            {(['upsc', 'ssc_cgl', 'ssc_chsl'] as ExamId[]).map((examKey) => {
              const isSelected = currentExam === examKey;
              const meta = examMeta[examKey];
              return (
                <button
                  key={examKey}
                  onClick={() => handleExamChange(examKey)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-white text-black shadow-apple-sm font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {meta.shortName}
                </button>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Quick Search Shortcut */}
            <button
              onClick={() => {
                playTactileClick(settings.soundEnabled);
                onOpenSearch();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08] text-xs transition active:scale-95"
              title="Search bit-by-bit syllabus (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-white/60" />
              <span className="hidden lg:inline text-[11px]">Search</span>
              <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 rounded bg-black/40 border border-white/10 font-mono text-white/50">⌘K</kbd>
            </button>

            {/* Streak Counter Chip */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{streakDays}d</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                playTactileClick(!settings.soundEnabled);
              }}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08] transition active:scale-95"
              title={settings.soundEnabled ? 'Mute Audio Clicks' : 'Enable Apple Audio Clicks'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-apple-teal" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/40" />
              )}
            </button>

            {/* Export & Import Data */}
            <button
              onClick={() => {
                playTactileClick(settings.soundEnabled);
                onExport();
              }}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08] transition active:scale-95"
              title="Export Full Progress Backup (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playTactileClick(settings.soundEnabled);
                onImport();
              }}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08] transition active:scale-95"
              title="Import Backup (JSON)"
            >
              <Upload className="w-4 h-4" />
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/spdedsec/aspirant-os-tracker"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08] transition active:scale-95"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Apple Sub-Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 pb-2.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleTabChange('syllabus')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'syllabus'
                ? 'bg-white/15 text-white font-semibold border border-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            📋 Bit-by-Bit Syllabus
          </button>
          <button
            onClick={() => handleTabChange('timer')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'timer'
                ? 'bg-white/15 text-white font-semibold border border-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            ⏱️ Study & Timestamp Timer
          </button>
          <button
            onClick={() => handleTabChange('revisions')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'revisions'
                ? 'bg-white/15 text-white font-semibold border border-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            🔄 Spaced Revisions
          </button>
          <button
            onClick={() => handleTabChange('analytics')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-white/15 text-white font-semibold border border-white/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            📊 Analytics & Logs
          </button>
        </div>
      </div>
    </header>
  );
};
