export type ExamId = 'upsc' | 'ssc_cgl' | 'ssc_chsl';

export type TopicStatus = 'not-started' | 'in-progress' | 'mastered' | 'needs-revision';

export type PriorityLevel = 'high' | 'medium' | 'standard';

export interface SyllabusItem {
  id: string;
  code: string;
  title: string;
  examId: ExamId;
  stageId: string;
  stageTitle: string;
  subjectId: string;
  subjectTitle: string;
  moduleTitle: string;
  subtopics: string[];
  priority: PriorityLevel;
  weightage?: string;
  officialRef?: string;
}

export interface UserTopicState {
  topicId: string;
  status: TopicStatus;
  revisionCount: number;
  lastRevisedAt: string | null;
  nextRevisionDue: string | null;
  confidence: number; // 1 to 5
  notes: string;
  timeSpentSeconds: number;
}

export interface StudySessionLog {
  id: string;
  date: string; // ISO date
  startedAt: string; // ISO timestamp
  endedAt: string; // ISO timestamp
  durationSeconds: number;
  examId: ExamId;
  subjectId: string;
  subjectTitle: string;
  topicId: string;
  topicTitle: string;
  sessionType: 'deep-work' | 'pomodoro' | 'revision' | 'stopwatch';
  notes: string;
  focusRating: number; // 1-5
}

export interface ExamCountdown {
  id: string;
  examId: ExamId | 'custom';
  title: string;
  subtitle: string;
  targetDate: string; // YYYY-MM-DD
  color: string;
  iconName: string;
  isOfficialEstimated?: boolean;
}

export interface UserSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  theme: 'dark' | 'light' | 'oled';
  pomodoroWorkMinutes: number;
  pomodoroBreakMinutes: number;
  dailyGoalHours: number;
}

export interface AppState {
  currentExam: ExamId;
  currentStage: string;
  selectedSubject: string | null;
  searchQuery: string;
  activeStatusFilter: TopicStatus | 'all';
  activePriorityFilter: PriorityLevel | 'all';
  topicStates: Record<string, UserTopicState>;
  sessions: StudySessionLog[];
  countdowns: ExamCountdown[];
  settings: UserSettings;
  streakDays: number;
  lastStudiedDate: string | null;
}
