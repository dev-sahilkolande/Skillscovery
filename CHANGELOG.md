# Changelog

All notable changes to the Skillscovery project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.0] - 2026-11-02

### Added
- **Frontend Application Foundation**:
  - Initial single-page application scaffold using React 19, Vite, and Tailwind CSS v4.
  - Deep Midnight dark theme design system built with Material Design 3 surface tokens and custom spectral glow accents.
  - Master layout shell (`MainLayout`) featuring collapsible desktop sidebar, responsive topbar with global Cmd/Ctrl+K shortcut, and mobile bottom navigation dock.
- **Application Workspaces & Pages**:
  - **Dashboard**: Modular command cockpit with `HeroBanner` (streak count, quick action trigger), `MilestonesAnalytics` (timeframe filtering), `DailySchedule` (interactive timeline), `CourseCarousel` (trackable carousel with bookmarking), and `AudioDock` (lo-fi ambient study player).
  - **Learning Hub**: Complete curriculum catalog with search, category filtering, status tabs (`in-progress`, `completed`, `bookmarked`), course preview modal (`CoursePreviewModal`), and dynamic action handlers (`Review Course`, `Continue`, `Start Learning`).
  - **Roadmaps**: Interactive engineering career roadmaps with active milestone progress tracker, node details, recommended career tracks, and verified credential certificates (`CompletedRoadmaps` and `CredentialModal` with `@media print` support).
  - **Planner**: Comprehensive study scheduling workspace with weekly day-selector grid, daily agenda cards, study goal progress metrics, and study session creation modal.
  - **Analytics**: Deep visualizer workspace featuring KPI metric overviews, custom canvas bar chart (`LearningActivityChart` with daily/weekly/monthly filters and milestone reference benchmark lines), course performance breakdown, learning velocity trends, and achievement badges.
  - **Music Library**: Ambient focus audio cockpit featuring playlist collections, track explorer, category pills, favorite track toggling, and dedicated `MusicPlayer` with waveform visualization simulation and progress controls.
  - **Video Library**: Video workshop cockpit with featured hero workshop, category catalog, recently watched queue, watch later list, and simulated playback modal (`VideoPlayerModal`).
  - **Settings**: Complete configuration suite with modular sub-panels for profile details (photo/initials fallback toggle), appearance (theme mode, live accent color switcher, display density), learning preferences (study goal sliders, curriculum categories), notification toggles, storage privacy registry, and version roadmap.
  - **NotFound (404)**: Dedicated dark-themed fallback view with return navigation.
- **State Management & Audio/Timer Engines**:
  - `focusSessionStore`: External timer engine (`useSyncExternalStore`) supporting idle, running, paused, and completed states across 4 standard presets (5m, 15m, 25m, 50m) with zero component re-render tearing.
  - `audioPlayerStore`: Centralized audio dock state managing playback, pause, volume, looping, and playlist queue transitions.
  - `notificationsStore`: In-app notification center managing unread badge counts, category filters, and simulated alert dismissals.
- **Performance & Code Splitting**:
  - Route-level code splitting across all 9 pages using `React.lazy()` and `Suspense`.
  - Accessible, layout-stable `RouteLoadingFallback` component with animated brand ring and ambient lighting.
- **Accessibility & Responsive Foundations**:
  - Centralized focus trapping, keyboard navigation, initial focus, focus return, and Escape key dismissal via `useModalA11y`.
  - Complete multi-viewport audit and responsive hardening across 8 viewports (`320px`, `360px`, `375px`, `390px`, `430px`, `768px`, `1024px`, `1440px`) eliminating horizontal scroll overflows without hiding content.
  - Standardized backdrop dismissal, body scroll locks (`document.body.style.overflow = "hidden"`), and screen reader announcements.
- **Client-Side Persistence**:
  - Structured `localStorage` abstraction layer (`storage.js`) with defensive JSON deserialization, centralized key registry (`STORAGE_KEYS`), and cross-tab reactive synchronization.

### Changed
- Refactored all page containers and sub-components to enforce flex shrinkage (`min-w-0 max-w-full`) and responsive mobile padding (`p-4 sm:p-6 lg:p-8`).
- Upgraded root `.gitignore` to comprehensively exclude dependencies, build artifacts, environment secret patterns (`.env*`), and operating system metadata.
- Resolved Git repository merge conflicts on `README.md` and `LICENSE` while preserving the MIT license.

### Limitations
- **No Backend Infrastructure**: The current version operates entirely client-side without an active backend server, API gateway, or cloud microservices.
- **No Authentication & Identity Provider**: User profile data (`Elena Vance`) and authentication states are local mock demonstrations. Multi-user accounts, OAuth2, and password security are planned for future backend phases.
- **No Cloud Database**: Data persistence relies strictly on the browser's `localStorage` (approx. 5 MB limit per origin). Clearing browser data resets customizations and study logs.
- **Simulated Media Streaming**: Audio and video players simulate playback progression, scrubbers, and timecodes using internal intervals; no external media files, CDN streaming endpoints, or video blobs are currently bundled.
