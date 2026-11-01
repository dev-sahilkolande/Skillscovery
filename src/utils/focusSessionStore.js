import { STORAGE_KEYS, getStoredItem, setStoredItem } from "./storage.js";

/**
 * Skillscovery - Focus Session & Pomodoro Store
 * Provides a high-precision, drift-free, centralized reactive timer store
 * following the architecture of audioPlayerStore.js.
 */

// Format seconds into MM:SS string
export function formatTimerTime(seconds) {
  if (typeof seconds !== "number" || isNaN(seconds) || seconds <= 0) {
    return "00:00";
  }
  const clamped = Math.floor(seconds);
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Timer Presets
export const TIMER_PRESETS = [
  {
    id: "short-break",
    label: "Short Break",
    minutes: 5,
    description: "5-minute rest & recharge",
  },
  {
    id: "quick-focus",
    label: "Quick Focus",
    minutes: 15,
    description: "15-minute fast revision session",
  },
  {
    id: "pomodoro",
    label: "Classic Pomodoro",
    minutes: 25,
    description: "25-minute standard focus block",
  },
  {
    id: "deep-study",
    label: "Deep Study",
    minutes: 45,
    description: "45-minute deep architectural flow",
  },
];

const DEFAULT_DURATION_MINUTES = 25;
const DEFAULT_TITLE = "Distributed Systems Focus";

const defaultState = {
  mode: "idle", // 'idle' | 'running' | 'paused' | 'completed'
  durationMinutes: DEFAULT_DURATION_MINUTES,
  remainingSeconds: DEFAULT_DURATION_MINUTES * 60,
  targetEndTime: null,
  sessionTitle: DEFAULT_TITLE,
  startedAt: null,
  completedAt: null,
  isModalOpen: false,
};

// Safe persistence helper
function persistSession(currState) {
  setStoredItem(STORAGE_KEYS.FOCUS_SESSION, {
    mode: currState.mode,
    durationMinutes: currState.durationMinutes,
    remainingSeconds: currState.remainingSeconds,
    targetEndTime: currState.targetEndTime,
    sessionTitle: currState.sessionTitle,
    startedAt: currState.startedAt,
    completedAt: currState.completedAt,
  });
}

// Startup recovery & state loader
function loadInitialState() {
  const stored = getStoredItem(
    STORAGE_KEYS.FOCUS_SESSION,
    null,
    (val) => typeof val === "object" && val !== null
  );

  if (!stored) {
    return { ...defaultState };
  }

  const durationMinutes =
    typeof stored.durationMinutes === "number" && stored.durationMinutes > 0
      ? stored.durationMinutes
      : DEFAULT_DURATION_MINUTES;

  const sessionTitle =
    typeof stored.sessionTitle === "string" && stored.sessionTitle.trim().length > 0
      ? stored.sessionTitle
      : DEFAULT_TITLE;

  const startedAt = typeof stored.startedAt === "number" ? stored.startedAt : null;
  const completedAt = typeof stored.completedAt === "number" ? stored.completedAt : null;

  // Case 1: Session was completed
  if (stored.mode === "completed") {
    return {
      mode: "completed",
      durationMinutes,
      remainingSeconds: 0,
      targetEndTime: null,
      sessionTitle,
      startedAt,
      completedAt: completedAt || Date.now(),
    };
  }

  // Case 2: Session was running when closed/refreshed
  // Note: A previously running session must NOT automatically resume on load.
  if (stored.mode === "running") {
    const targetEndTime =
      typeof stored.targetEndTime === "number" ? stored.targetEndTime : null;

    if (targetEndTime) {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((targetEndTime - now) / 1000));

      if (remaining <= 0) {
        // Target end time has passed -> restore as completed
        return {
          mode: "completed",
          durationMinutes,
          remainingSeconds: 0,
          targetEndTime: null,
          sessionTitle,
          startedAt,
          completedAt: targetEndTime,
        };
      }

      // Time remaining > 0 -> restore as paused with accurately recalculated remaining time
      return {
        mode: "paused",
        durationMinutes,
        remainingSeconds: remaining,
        targetEndTime: null,
        sessionTitle,
        startedAt,
        completedAt: null,
      };
    }
  }

  // Case 3: Session was paused
  if (stored.mode === "paused") {
    const remainingSeconds =
      typeof stored.remainingSeconds === "number" && stored.remainingSeconds > 0
        ? Math.min(stored.remainingSeconds, durationMinutes * 60)
        : durationMinutes * 60;

    return {
      mode: "paused",
      durationMinutes,
      remainingSeconds,
      targetEndTime: null,
      sessionTitle,
      startedAt,
      completedAt: null,
    };
  }

  // Case 4: Default / idle
  return {
    mode: "idle",
    durationMinutes,
    remainingSeconds: durationMinutes * 60,
    targetEndTime: null,
    sessionTitle,
    startedAt: null,
    completedAt: null,
  };
}

let state = loadInitialState();
const listeners = new Set();
let timerInterval = null;

function notify() {
  listeners.forEach((listener) => listener());
}

function startTicker() {
  if (timerInterval) return;
  // Tick every 250ms for low-latency second transitions without tearing
  timerInterval = setInterval(() => {
    focusSessionStore.tick();
  }, 250);
}

function stopTicker() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Visibility change listener to handle tab sleep/resume without drift
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && state.mode === "running") {
      focusSessionStore.tick();
    }
  });
}

export const focusSessionStore = {
  getState: () => state,
  getSnapshot: () => state,

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  openModal: () => {
    if (!state.isModalOpen) {
      state = { ...state, isModalOpen: true };
      notify();
    }
  },

  closeModal: () => {
    if (state.isModalOpen) {
      state = { ...state, isModalOpen: false };
      notify();
    }
  },

  startSession: (durationMinutes, sessionTitle) => {
    const mins =
      typeof durationMinutes === "number" && !isNaN(durationMinutes) && durationMinutes > 0
        ? Math.round(durationMinutes)
        : state.durationMinutes || DEFAULT_DURATION_MINUTES;

    const title =
      typeof sessionTitle === "string" && sessionTitle.trim().length > 0
        ? sessionTitle.trim()
        : state.sessionTitle || DEFAULT_TITLE;

    const now = Date.now();
    const totalSeconds = mins * 60;
    const targetEndTime = now + totalSeconds * 1000;

    stopTicker();

    state = {
      ...state,
      mode: "running",
      durationMinutes: mins,
      remainingSeconds: totalSeconds,
      targetEndTime,
      sessionTitle: title,
      startedAt: now,
      completedAt: null,
    };

    persistSession(state);
    startTicker();
    notify();
  },

  pauseSession: () => {
    if (state.mode !== "running") return;

    const now = Date.now();
    const remaining = state.targetEndTime
      ? Math.max(0, Math.ceil((state.targetEndTime - now) / 1000))
      : state.remainingSeconds;

    stopTicker();

    if (remaining <= 0) {
      state = {
        ...state,
        mode: "completed",
        remainingSeconds: 0,
        targetEndTime: null,
        completedAt: now,
      };
    } else {
      state = {
        ...state,
        mode: "paused",
        remainingSeconds: remaining,
        targetEndTime: null,
      };
    }

    persistSession(state);
    notify();
  },

  resumeSession: () => {
    if (state.mode !== "paused") return;

    if (state.remainingSeconds <= 0) {
      state = {
        ...state,
        mode: "completed",
        remainingSeconds: 0,
        targetEndTime: null,
        completedAt: Date.now(),
      };
      persistSession(state);
      notify();
      return;
    }

    const now = Date.now();
    const targetEndTime = now + state.remainingSeconds * 1000;

    stopTicker();

    state = {
      ...state,
      mode: "running",
      targetEndTime,
      startedAt: state.startedAt || now,
      completedAt: null,
    };

    persistSession(state);
    startTicker();
    notify();
  },

  resetSession: () => {
    stopTicker();

    const totalSeconds = (state.durationMinutes || DEFAULT_DURATION_MINUTES) * 60;

    state = {
      ...state,
      mode: "idle",
      remainingSeconds: totalSeconds,
      targetEndTime: null,
      startedAt: null,
      completedAt: null,
    };

    persistSession(state);
    notify();
  },

  stopSession: () => {
    stopTicker();

    const totalSeconds = (state.durationMinutes || DEFAULT_DURATION_MINUTES) * 60;

    state = {
      ...state,
      mode: "idle",
      remainingSeconds: totalSeconds,
      targetEndTime: null,
      startedAt: null,
      completedAt: null,
    };

    persistSession(state);
    notify();
  },

  tick: () => {
    if (state.mode !== "running" || !state.targetEndTime) {
      stopTicker();
      return;
    }

    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((state.targetEndTime - now) / 1000));

    if (remaining <= 0) {
      stopTicker();
      state = {
        ...state,
        mode: "completed",
        remainingSeconds: 0,
        targetEndTime: null,
        completedAt: now,
      };
      persistSession(state);
      notify();
      return;
    }

    // Only update and notify when integer remainingSeconds changes
    if (remaining !== state.remainingSeconds) {
      state = {
        ...state,
        remainingSeconds: remaining,
      };
      notify();
    }
  },

  getRemainingSeconds: () => {
    if (state.mode === "running" && state.targetEndTime) {
      return Math.max(0, Math.ceil((state.targetEndTime - Date.now()) / 1000));
    }
    return state.remainingSeconds;
  },
};
