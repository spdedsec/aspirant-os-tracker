import { ExamCountdown } from '../types';

export const defaultCountdowns: ExamCountdown[] = [
  {
    id: 'cd-upsc-pre',
    examId: 'upsc',
    title: 'UPSC CSE Prelims',
    subtitle: 'General Studies I & CSAT (Paper II)',
    targetDate: '2025-05-25',
    color: '#0071e3', // Apple Blue
    iconName: 'GraduationCap',
    isOfficialEstimated: true
  },
  {
    id: 'cd-upsc-mains',
    examId: 'upsc',
    title: 'UPSC CSE Mains',
    subtitle: 'Essay, GS I-IV & Optionals',
    targetDate: '2025-08-22',
    color: '#5856d6', // Apple Indigo
    iconName: 'Award',
    isOfficialEstimated: true
  },
  {
    id: 'cd-ssc-cgl-t1',
    examId: 'ssc_cgl',
    title: 'SSC CGL Tier 1',
    subtitle: 'CBT Screening Exam',
    targetDate: '2025-09-12',
    color: '#34c759', // Apple Green
    iconName: 'Compass',
    isOfficialEstimated: true
  },
  {
    id: 'cd-ssc-cgl-t2',
    examId: 'ssc_cgl',
    title: 'SSC CGL Tier 2',
    subtitle: 'Mains & DEST Skill Test',
    targetDate: '2025-12-18',
    color: '#ff9500', // Apple Orange
    iconName: 'CheckCircle2',
    isOfficialEstimated: true
  },
  {
    id: 'cd-ssc-chsl-t1',
    examId: 'ssc_chsl',
    title: 'SSC CHSL Tier 1',
    subtitle: 'Computer Based Test (10+2)',
    targetDate: '2025-07-01',
    color: '#af52de', // Apple Purple
    iconName: 'BookOpen',
    isOfficialEstimated: true
  },
  {
    id: 'cd-ssc-chsl-t2',
    examId: 'ssc_chsl',
    title: 'SSC CHSL Tier 2',
    subtitle: 'Session I & Typing/DEST',
    targetDate: '2025-11-15',
    color: '#ff2d55', // Apple Pink
    iconName: 'Flame',
    isOfficialEstimated: true
  }
];
