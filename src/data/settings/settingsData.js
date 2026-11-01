/**
 * Skillscovery - Settings & Preferences Mock Data & Configuration
 * Provides initial states, options, and metadata for Phase 4B.7.
 */

export const defaultProfileData = {
  fullName: "Elena Vance",
  email: "elena.vance@polymath.dev",
  role: "Level 24 Polymath · Systems Engineering",
  bio: "Senior Systems Architect & Polymath Explorer. Focused on distributed consensus algorithms, high-throughput Rust microservices, and AI reasoning pipelines.",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnLN_bRsBc1P2xrhBUK23zfFz9paITDcDSfVTAX2fW1GG-J2RXiq20dWZ2cdrVmj50xnywE0e5_HPqD1fMsOTea93RViyUnuH0oEdNoP5NrKMzP4kFVT6Hd-3nq8NM3XzxIjAhB18R5_lfG2qyBqW44qqNkCTu9dVbsIwfGYmUwkw4DQI_CzkI0deWJcgsyZ4wHwKxhjlBz8141arrIEjx7rTvioGKK-oa1VbccIV3",
  location: "San Francisco, CA",
  timezone: "Pacific Time (PT) - UTC-7",
  joinedDate: "March 2024",
  streakDays: 18,
};

export const accentColorOptions = [
  {
    id: "cosmic-indigo",
    name: "Cosmic Indigo",
    description: "Default spectral purple & indigo blend",
    colorHex: "#c0c1ff",
    containerHex: "#8083ff",
    activeClass: "ring-2 ring-primary border-primary",
  },
  {
    id: "emerald-cyan",
    name: "Emerald Cyan",
    description: "Vibrant mint & cyan glow",
    colorHex: "#4cd7f6",
    containerHex: "#009eb9",
    activeClass: "ring-2 ring-tertiary border-tertiary",
  },
  {
    id: "electric-violet",
    name: "Electric Violet",
    description: "Deep neon purple & ultraviolet",
    colorHex: "#d2bbff",
    containerHex: "#6001d1",
    activeClass: "ring-2 ring-secondary border-secondary",
  },
  {
    id: "cyber-amber",
    name: "Cyber Amber",
    description: "Warm energized gold & amber",
    colorHex: "#fcd34d",
    containerHex: "#d97706",
    activeClass: "ring-2 ring-amber-400 border-amber-400",
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    description: "Modern crimson & pastel rose",
    colorHex: "#fda4af",
    containerHex: "#e11d48",
    activeClass: "ring-2 ring-rose-400 border-rose-400",
  },
];

export const defaultAppearanceData = {
  theme: "dark", // "dark" | "light" | "system"
  accentColor: "cosmic-indigo",
  density: "comfortable", // "comfortable" | "compact"
  reducedMotion: false,
  highContrast: false,
};

export const learningCategoriesList = [
  "System Design",
  "Distributed Systems",
  "Web Development",
  "Machine Learning & AI",
  "DevOps & Cloud",
  "Rust & Systems",
  "Algorithm Engineering",
  "Database Internals",
];

export const difficultyOptions = [
  { id: "all", label: "All Levels" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const studyTimeOptions = [
  { id: "morning", label: "Early Morning (06:00 - 10:00)" },
  { id: "afternoon", label: "Afternoon Focus (12:00 - 16:00)" },
  { id: "evening", label: "Prime Evening (18:00 - 22:00)" },
  { id: "night", label: "Late Night Coding (22:00 - 02:00)" },
];

export const reminderOptions = [
  { id: "start", label: "At session start" },
  { id: "10m", label: "10 minutes before" },
  { id: "30m", label: "30 minutes before" },
  { id: "1h", label: "1 hour before" },
];

export const defaultLearningPreferences = {
  dailyGoalMinutes: 90,
  weeklyGoalHours: 12,
  preferredCategories: [
    "System Design",
    "Distributed Systems",
    "Rust & Systems",
    "Machine Learning & AI",
  ],
  difficultyPreference: "advanced",
  preferredStudyTime: "night",
  reminderTiming: "10m",
  autoStartNextLesson: true,
  codeEditorTheme: "github-dark",
};

export const defaultNotificationSettings = {
  dailyReminders: true,
  weeklySummaries: true,
  milestoneAlerts: true,
  courseRecommendations: false,
  streakProtection: true,
  audioPlaybackEvents: false,
};

export const aboutInfo = {
  appName: "Skillscovery",
  version: "0.0.0",
  buildChannel: "Alpha Phase 4B.7",
  releaseDate: "2025 / 2026",
  description:
    "Skillscovery is a personal learning management platform and developer cockpit designed for technical polymaths. It integrates structured curriculums, interactive roadmaps, dynamic weekly study planning, comprehensive performance analytics, ambient focus audio docks, and workshop video streaming into a unified workspace.",
  stack: [
    { name: "React", version: "19.3.1" },
    { name: "Vite", version: "8.3.5" },
    { name: "Tailwind CSS", version: "4.3.3" },
    { name: "React Router DOM", version: "7.18.5" },
    { name: "Framer Motion", version: "14.9.0" },
    { name: "Lucide React", version: "1.66.0" },
  ],
  phases: [
    { name: "Phase 1: Layout Unification", status: "Completed" },
    { name: "Phase 2: Dashboard Modularization", status: "Completed" },
    { name: "Phase 3: Dashboard Data Extraction", status: "Completed" },
    { name: "Phase 4A: Routing Foundation", status: "Completed" },
    { name: "Phase 4B.1: Learning Hub", status: "Completed" },
    { name: "Phase 4B.2: Roadmaps Hub", status: "Completed" },
    { name: "Phase 4B.3: Study Planner", status: "Completed" },
    { name: "Phase 4B.4: Analytics Dashboard", status: "Completed" },
    { name: "Phase 4B.5: Music Library", status: "Completed" },
    { name: "Phase 4B.6: Video Library", status: "Completed" },
    { name: "Phase 4B.7: Settings & Preferences", status: "Active Implementation" },
  ],
};
