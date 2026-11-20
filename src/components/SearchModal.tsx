import React, { useState, useEffect } from 'react';
import { SyllabusItem } from '../types';
import { Search, BookOpen, Play, ChevronRight, X } from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SyllabusItem[];
  onSelectTopic: (topic: SyllabusItem) => void;
  soundEnabled: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectTopic,
  soundEnabled
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.subjectTitle.toLowerCase().includes(q) ||
          item.subtopics.some((s) => s.toLowerCase().includes(q))
        );
      }).slice(0, 20)
    : items.slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#1c1c20] border border-white/20 rounded-3xl w-full max-w-xl shadow-apple-dark-md overflow-hidden flex flex-col max-h-[70vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search thousands of micro-topics across UPSC, CGL & CHSL..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder-white/40 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/40">
              No matching topics found for "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  playTactileClick(soundEnabled);
                  onSelectTopic(item);
                  onClose();
                }}
                className="p-3 rounded-2xl hover:bg-white/[0.06] cursor-pointer flex items-center justify-between gap-3 group transition"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] text-white/50">
                      {item.code}
                    </span>
                    <span className="text-[10px] text-apple-blue font-medium">
                      {item.examId.toUpperCase().replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-white/40 truncate">
                      • {item.subjectTitle}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-apple-blue transition truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/40 truncate">
                    {item.subtopics.slice(0, 3).join(', ')}...
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition flex-shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut hint */}
        <div className="p-3 bg-white/[0.02] border-t border-white/[0.06] text-[11px] text-white/40 flex items-center justify-between px-4">
          <span>Navigate with mouse or tap to view / study</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10px]">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
