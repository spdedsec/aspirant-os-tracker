import { SyllabusItem, ExamId } from '../types';
import { upscSyllabus } from './upscData';
import { sscCglSyllabus } from './sscCglData';
import { sscChslSyllabus } from './sscChslData';

export const allSyllabusData: Record<ExamId, SyllabusItem[]> = {
  upsc: upscSyllabus,
  ssc_cgl: sscCglSyllabus,
  ssc_chsl: sscChslSyllabus
};

export const examMeta = {
  upsc: {
    name: 'UPSC Civil Services Examination',
    shortName: 'UPSC CSE',
    badge: 'IAS / IPS / IFS',
    color: '#0071e3', // Apple Blue
    stages: [
      { id: 'all', title: 'Entire Syllabus' },
      { id: 'prelims', title: 'Prelims (Paper I & II)' },
      { id: 'mains', title: 'Mains (Essay & GS I-IV)' }
    ]
  },
  ssc_cgl: {
    name: 'SSC Combined Graduate Level',
    shortName: 'SSC CGL',
    badge: 'Group B & C Gazetted/Non-Gazetted',
    color: '#34c759', // Apple Green
    stages: [
      { id: 'all', title: 'All Tiers' },
      { id: 'tier1', title: 'Tier 1 Screening' },
      { id: 'tier2', title: 'Tier 2 Merit & Skill' }
    ]
  },
  ssc_chsl: {
    name: 'SSC Combined Higher Secondary (10+2)',
    shortName: 'SSC CHSL',
    badge: 'DEO / LDC / JSA',
    color: '#af52de', // Apple Purple
    stages: [
      { id: 'all', title: 'All Tiers' },
      { id: 'tier1', title: 'Tier 1 Objective' },
      { id: 'tier2', title: 'Tier 2 CBT & Typing' }
    ]
  }
};
