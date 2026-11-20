import React from 'react';
import { Play, Pause, Square, BookOpen } from 'lucide-react';
import { formatDuration } from '../utils/storage';
import { playTactileClick } from '../utils/sound';

interface DynamicIslandProps {
  isRunning: boolean;
  secondsElapsed: number;
  totalDurationSeconds?: number;
  topicTitle: string;
  subjectTitle: string;
  onTogglePlay: () => void;
  onStop: () => void;
  soundEnabled: boolean;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  isRunning,
  secondsElapsed,
  totalDurationSeconds,
  topicTitle,
  subjectTitle,
  onTogglePlay,
  onStop,
  soundEnabled
}) => {
  const displayTime = totalDurationSeconds 
    ? formatDuration(Math.max(0, totalDurationSeconds - secondsElapsed))
    : formatDuration(secondsElapsed);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md">
      <div className="bg-[#1c1c1e]/95 backdrop-blur-apple-heavy text-white px-4 py-3 rounded-3xl shadow-apple-dark-md border border-white/20 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Left Pulse & Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <span className={`flex h-3 w-3 ${isRunning ? 'animate-ping' : ''} rounded-full bg-apple-green opacity-75`} />
            <span className={`absolute top-0 inline-flex rounded-full h-3 w-3 ${isRunning ? 'bg-apple-green' : 'bg-amber-500'}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-white/50 truncate">
              <BookOpen className="w-3 h-3 flex-shrink-0 text-apple-teal" />
              <span className="truncate">{subjectTitle || 'Study Session'}</span>
            </div>
            <h4 className="text-sm font-semibold text-white truncate max-w-[200px]">
              {topicTitle || 'Deep Work Focus'}
            </h4>
          </div>
        </div>

        {/* Right Timer & Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="px-2.5 py-1 rounded-xl bg-white/[0.08] font-mono text-xs font-semibold text-apple-teal tracking-wider">
            {displayTime}
          </div>

          <button
            onClick={() => {
              playTactileClick(soundEnabled);
              onTogglePlay();
            }}
            className="p-2 rounded-2xl bg-white text-black hover:bg-white/90 transition active:scale-90"
            title={isRunning ? 'Pause Timer' : 'Resume Timer'}
          >
            {isRunning ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>

          <button
            onClick={() => {
              playTactileClick(soundEnabled);
              onStop();
            }}
            className="p-2 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition active:scale-90"
            title="Complete & Log Session"
          >
            <Square className="w-4 h-4 fill-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
