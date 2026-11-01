# Skillscovery System Architecture

This document describes the technical architecture, component design, state management patterns, and system boundaries of **Skillscovery**.

---

## 1. Technology Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Engine & Bundler**: Vite 8
- **Routing**: React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`, `useNavigate`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom Material Design 3 surface color tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Client Persistence**: Browser `localStorage` with typed abstraction layer
- **Linting & Code Quality**: ESLint 10 (Flat Config)

---

## 2. Frontend Architectural Structure

The application is structured as a modular Single-Page Application (SPA) prioritizing performance, clean separation of concerns, and accessible design:

```text
src/
├── assets/                  # Brand assets, static SVGs, and images
├── components/              # Domain-specific and shared UI components
│   ├── analytics/           # Analytics charts, trends, and KPI cards
│   ├── dashboard/           # Home cockpit modules (Hero, Milestones, Schedule, Carousel, AudioDock)
│   ├── focus/               # Focus session timer modal
│   ├── learning/            # Course catalog, continue learning, and preview modal
│   ├── music/               # Audio player, playlist collections, track cards
│   ├── planner/             # Weekly calendar, agenda timeline, study goal tracking
│   ├── roadmaps/            # Roadmap progress tracker, nodes, credentials modal
│   ├── settings/            # Modular settings sub-panels (Profile, Theme, Learning, etc.)
│   ├── topbar/              # Notification popover, profile dropdown, logout dialog
│   ├── RouteLoadingFallback.jsx # Accessible dynamic chunk loading indicator
│   ├── Sidebar.jsx          # Desktop navigation drawer
│   └── Topbar.jsx           # Global search, notifications, focus status, and profile header
├── data/                    # Initial static mock datasets and configuration models
├── hooks/                   # Custom reusable React hooks
│   ├── useAudioPlayer.js    # Hook subscribing to audioPlayerStore
│   ├── useFocusSession.js   # Hook subscribing to focusSessionStore via useSyncExternalStore
│   ├── useModalA11y.js      # Focus trap, Escape key, and keyboard accessibility hook
│   └── useNotifications.js  # Hook subscribing to notificationsStore
├── layouts/
│   └── MainLayout.jsx       # Global application shell and responsive viewport scaffolding
├── pages/                   # Route-level page components (lazily loaded)
│   ├── Analytics.jsx
│   ├── Dashboard.jsx
│   ├── Learning.jsx
│   ├── Music.jsx
│   ├── NotFound.jsx
│   ├── Planner.jsx
│   ├── Roadmaps.jsx
│   ├── Settings.jsx
│   └── Videos.jsx
├── utils/                   # Centralized external stores and helper utilities
│   ├── audioPlayerStore.js  # Pure JS external store for audio dock
│   ├── dateUtils.js         # Date formatting utilities
│   ├── focusSessionStore.js # Pure JS external store for Pomodoro/study timer
│   ├── notificationsStore.js# Pure JS external store for notification queue
│   ├── storage.js           # Defensive localStorage wrapper with STORAGE_KEYS
│   └── theme.js             # Theme and CSS custom property helpers
├── App.jsx                  # Route definitions and code-splitting boundaries
├── index.css                # Tailwind imports, M3 theme tokens, print styles
└── main.jsx                 # Application entrypoint
```

---

## 3. Core Architectural Patterns

### A. Route-Level Code Splitting
- All application page components are loaded asynchronously using `React.lazy()`:
  ```jsx
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Learning = lazy(() => import("./pages/Learning"));
  // ...
  ```
- Wrapped inside `<Suspense fallback={<RouteLoadingFallback />}>` inside `App.jsx`, ensuring minimal initial JavaScript bundle sizes and zero layout shifts during page transitions.

### B. Centralized External Store Pattern (`useSyncExternalStore`)
- Background processes and shared global state engines—namely the **Focus Session Timer** (`focusSessionStore.js`), **Audio Dock** (`audioPlayerStore.js`), and **In-App Notifications** (`notificationsStore.js`)—are authored as pure JavaScript store modules independent of the React component lifecycle.
- Components subscribe to store snapshots using React’s `useSyncExternalStore` hook. This guarantees:
  1. Complete elimination of duplicate timer or playback processes.
  2. Zero re-render tearing or concurrent mode state inconsistencies.
  3. Clean access from outside components (e.g., custom event handlers or routing side effects).

### C. Client-Side Persistence Layer (`storage.js`)
- All user modifications, bookmark queues, track favorites, and configuration preferences are persisted client-side in browser `localStorage`.
- The storage layer provides:
  - Centralized key registry (`STORAGE_KEYS`) preventing collisions.
  - Type-safe default fallbacks and validator functions.
  - Safe error-handling wrapping `JSON.parse` and `JSON.stringify` to withstand storage corruption or private browsing quota limits.
  - Cross-tab synchronization via `window.addEventListener("storage", ...)`.

### D. Accessible Modal Architecture (`useModalA11y.js`)
- Reusable modal hook providing:
  - Focus trapping inside dialog boundaries using standard focusable selectors.
  - Initial focus auto-placement on mount.
  - Focus restoration returning focus to the triggering element upon dialog close.
  - Global `Escape` key dismissal.
  - Body scroll locking (`overflow: hidden` on `document.body`) while dialogs are mounted.
  - Strict backdrop click dismissal with `e.stopPropagation()` on dialog content.

---

## 4. Current State: Implemented vs. Planned Backend Functionality

To maintain architectural transparency, the table below delineates what is currently functional on the client versus what is planned for future backend phases:

| Feature Domain | Current Implementation (v0.9.0) | Planned Backend Implementation (v1.0.0+) |
| :--- | :--- | :--- |
| **Authentication & Users** | Mock single-user profile (`Elena Vance`) stored in `localStorage`; simulated logout dialog. | Multi-user authentication (Supabase Auth / OAuth2), JWT token sessions, password recovery, and role-based access. |
| **Data Persistence** | Browser `localStorage` (scoped to browser origin, ~5MB limit). | Cloud relational database (Supabase / PostgreSQL) with Row-Level Security (RLS) and real-time syncing. |
| **Learning Tracks & Courses** | Static catalog models (`learningData.js`) with client-side status and bookmark toggling. | Dynamic course content APIs, server-side progress tracking, quizzes, and automated completion verification. |
| **Roadmaps & Milestones** | Static roadmaps with interactive milestone nodes; client-side printable credential modal via `@media print`. | Dynamically generated career roadmaps, cryptographically signed credentials, and public verification URLs. |
| **Study Planner** | Client-managed study sessions and goal progress saved to `localStorage`. | Multi-device calendar sync, backend cron reminders, and external calendar integrations (Google Calendar, iCal). |
| **Analytics & Telemetry** | Purely mathematical and client-rendered charts based on mock stats and local logs; zero external telemetry. | Aggregated backend study analytics, automated weekly digest generation, and cross-platform activity sync. |
| **Audio & Video Media** | Simulated playback timers, scrubbers, and waveforms; no external streaming binaries bundled. | Cloud object storage (Supabase Storage / AWS S3) with adaptive bitrate audio and video streaming. |
| **Notifications** | Local mock notification store with reactive unread badge counting. | Server-sent events (SSE) or WebSockets for real-time alerts, push notifications, and email updates. |
