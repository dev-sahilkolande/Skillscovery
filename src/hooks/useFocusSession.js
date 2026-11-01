import { useSyncExternalStore } from "react";
import {
  focusSessionStore,
  formatTimerTime,
  TIMER_PRESETS,
} from "../utils/focusSessionStore";

/**
 * useFocusSession - React hook for subscribing to the centralized focus session store.
 *
 * Uses useSyncExternalStore to subscribe with zero tearing.
 * Multiple components can mount this hook simultaneously without spawning duplicate timers.
 */
export function useFocusSession() {
  const state = useSyncExternalStore(
    focusSessionStore.subscribe,
    focusSessionStore.getSnapshot
  );

  const totalDurationSeconds = (state.durationMinutes || 25) * 60;
  const progressPercent =
    totalDurationSeconds > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((totalDurationSeconds - state.remainingSeconds) /
                totalDurationSeconds) *
                100
            )
          )
        )
      : 0;

  return {
    mode: state.mode,
    durationMinutes: state.durationMinutes,
    remainingSeconds: state.remainingSeconds,
    sessionTitle: state.sessionTitle,
    targetEndTime: state.targetEndTime,
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    formattedTime: formatTimerTime(state.remainingSeconds),
    progressPercent,
    presets: TIMER_PRESETS,
    isModalOpen: state.isModalOpen,
    openModal: focusSessionStore.openModal,
    closeModal: focusSessionStore.closeModal,
    startSession: focusSessionStore.startSession,
    pauseSession: focusSessionStore.pauseSession,
    resumeSession: focusSessionStore.resumeSession,
    resetSession: focusSessionStore.resetSession,
    stopSession: focusSessionStore.stopSession,
    getRemainingSeconds: focusSessionStore.getRemainingSeconds,
  };
}
