# AspirantOS 🎯
### Ultra-Fast, Apple-Inspired Master Syllabus Tracker, Day Counter & Study Engine for UPSC CSE, SSC CGL & SSC CHSL

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built With React & Vite](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Vite%20%7C%20TailwindCSS-0071e3)](https://vitejs.dev/)
[![Apple Design](https://img.shields.io/badge/Design-Apple%20WWDC%20HIG-black)](https://developer.apple.com/design/)

**AspirantOS** is an ultra-fast, offline-capable study operating system built specifically for government examination aspirants in India. It converts the vast, intimidating official syllabi of **UPSC Civil Services Examination (CSE)**, **SSC Combined Graduate Level (CGL)**, and **SSC Combined Higher Secondary Level (CHSL)** into an interactive, granular, bit-by-bit checklist powered by an Apple-grade fluid interface, day countdown engine, and automated spaced repetition scheduler.

---

## 🌟 Core Features

### 1. Bit-by-Bit Official Syllabus Breakdown
- **UPSC Civil Services Examination**:
  - **Prelims Paper I (General Studies)**: Ancient, Medieval & Modern Indian History, Indian National Movement, Art & Culture, Physical & World Geography, Indian Geography, Indian Polity & Governance (Constitution, Executive, Parliament, Judiciary, Panchayats), Macroeconomics & Social Development, Ecology, Biodiversity & Climate Change, and General Science & Frontier Tech.
  - **Prelims Paper II (CSAT)**: Reading Comprehension, Critical Reasoning, Basic Numeracy, Mental Ability, and Data Interpretation.
  - **Mains Descriptive**: Essay Paper, GS I (Heritage, History, Geography, Society), GS II (Polity, Governance, Social Justice, IR), GS III (Economy, Agriculture, S&T, Environment, Internal Security), GS IV (Ethics, Attitude, Emotional Intelligence, Probity, and Case Studies).
- **SSC CGL (Tier 1 & Tier 2)**:
  - Mathematical Abilities / Quantitative Aptitude (Number Systems, Arithmetic, Advanced Algebra, Geometry, 2D/3D Mensuration, Trigonometry, and Tier 2 Statistics & Probability).
  - Reasoning & General Intelligence (Verbal, Non-Verbal, Critical Thinking, Emotional & Social Intelligence).
  - English Language & Comprehension (Grammar, Active/Passive Voice, Narration, Vocabulary, Cloze, Reading Comprehension).
  - General Awareness (Science, History, Geography, Polity, Economy, Current Affairs, Static GK).
  - Computer Knowledge Module (Hardware, Memory, OS, MS Office, Internet, Networking & Cyber Security).
  - Data Entry Speed Test (DEST - 2000 key depressions / 15 mins).
- **SSC CHSL (Tier 1 & Tier 2)**:
  - English Language, General Intelligence, Basic Quantitative Aptitude, General Awareness, Computer Module, and Typing / DEST Test (35 WPM English / 30 WPM Hindi).

### 2. Apple Design Language & Micro-Interactions
- **WWDC Fluid Interface Principles**: Natural spring physics, zero-latency feedback on pointer-down (`active:scale-[0.97]`), and smooth transitions.
- **Translucent Frosted Materials**: `backdrop-filter: blur(24px) saturate(180%)` with subtle 1px border lighting.
- **SF Pro Typography**: Optical tracking (-0.02em to -0.03em on headings) and clean typography hierarchies.
- **Synthesized Web Audio Haptics**: Built-in Web Audio API oscillator synthesis generating authentic Apple tactile click, completion chime, and timer chime with zero audio file downloads.
- **Floating Dynamic Island**: Pill notification tracking live study sessions, timer ticks, and active subjects.

### 3. Apple-Style Day Counter & Milestone Countdown Widgets
- Countdown cards with days left, weeks left, and target dates for:
  - UPSC CSE Prelims & Mains
  - SSC CGL Tier 1 & Tier 2
  - SSC CHSL Tier 1 & Tier 2
- Custom Target Milestone creator for test series, full-length mocks, or personal revision deadlines.
- Study Streak Tracker with flaming badge to maintain daily study discipline.

### 4. Timestamped Study Session Engine & Pomodoro
- Presets: **Deep Work (50m/10m)**, **Pomodoro (25m/5m)**, **Revision Blitz (15m)**, or **Open Stopwatch**.
- Direct topic association: Link study hours to exact micro-topics in UPSC or SSC.
- End-of-session reflection: 1-5 star focus intensity rating, notes logging, and celebration confetti.
- Automatic Spaced Repetition (SRS) scheduling based on Ebbinghaus intervals (R1 @ 1 day, R2 @ 3 days, R3 @ 7 days, R4 @ 21 days, R5 @ 60 days).

### 5. Study Analytics & Timestamp Logs
- Chronological session logs with exact start and end timestamps.
- Subject time distribution graphs and total hours studied.
- Daily and weekly focus trends.

### 6. Universal Command Search (Cmd+K)
- Instant keyboard search across thousands of concepts, articles, formulas, and subtopics.

### 7. 100% Offline & Private (Zero Backend Dependency)
- Auto-saves continuously to browser `localStorage`.
- Full backup export (`.json`) and one-click import to sync across laptops and devices.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/spdedsec/aspirant-os-tracker.git
cd aspirant-os-tracker

# Install dependencies
npm install

# Run the local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

The production assets in `dist/` are 100% static and self-contained with relative paths (`./`), ready to deploy to GitHub Pages, Vercel, Netlify, Cloudflare Pages, or run locally by opening `index.html`.

---

## 🛠️ Tech Stack
- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: CSS Transitions, [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio Feedback**: Native Web Audio API (zero asset latency)

---

## 📄 License
MIT License. Created for serious civil service and government examination aspirants.
