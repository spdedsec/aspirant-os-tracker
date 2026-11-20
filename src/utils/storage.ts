import { AppState, SyllabusItem, UserTopicState, StudySessionLog, UserSettings, ExamCountdown } from '../types';
import { defaultCountdowns } from '../data/defaultCountdowns';

const STORAGE_KEY = 'aspirantos_state_v1';

export const defaultSettings: UserSettings = {
  soundEnabled: true,
  hapticsEnabled: true,
  theme: 'dark',
  pomodoroWorkMinutes: 25,
  pomodoroBreakMinutes: 5,
  dailyGoalHours: 6
};

export function loadStoredState(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load local state:', e);
    return {};
  }
}

export function saveStoredState(state: Partial<AppState>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save local state:', e);
  }
}

export function exportAppState(state: AppState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `aspirant_os_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function getSpacedRevisionDate(revisionCount: number, baseDate: Date = new Date()): string {
  // Spaced Repetition Intervals:
  // R1: 1 day later
  // R2: 3 days later
  // R3: 7 days later
  // R4: 21 days later
  // R5+: 60 days later
  const daysToAdd = revisionCount === 0 ? 1 :
                    revisionCount === 1 ? 3 :
                    revisionCount === 2 ? 7 :
                    revisionCount === 3 ? 21 : 60;
  
  const nextDate = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return nextDate.toISOString().slice(0, 10);
}

export function calculateStreak(sessions: StudySessionLog[]): number {
  if (!sessions.length) return 0;

  // Extract unique study dates formatted YYYY-MM-DD in descending order
  const dateSet = new Set<string>();
  sessions.forEach(s => {
    if (s.date) dateSet.add(s.date.slice(0, 10));
  });

  const sortedDates = Array.from(dateSet).sort().reverse();
  if (!sortedDates.length) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // If didn't study today or yesterday, streak is broken
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let checkDate = new Date(sortedDates[0]);

  for (const dStr of sortedDates) {
    const d = new Date(dStr);
    const diffDays = Math.round((checkDate.getTime() - d.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 0) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs === 0) return `${mins}m`;
  return `${hrs}h ${mins}m`;
}

export function getDaysLeft(targetDateStr: string): { days: number; isPast: boolean } {
  const target = new Date(targetDateStr + 'T00:00:00');
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    days: Math.abs(diffDays),
    isPast: diffDays < 0
  };
}
